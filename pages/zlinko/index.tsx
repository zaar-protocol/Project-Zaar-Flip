import React from "react";
import { useState, useRef, useEffect } from "react";
import { StarField } from "@/components/star-field";
import { Header } from "@/components/header";
import toast, { Toaster } from "react-hot-toast";
import ControlPanel from "@/components/zlinkoComponents/ControlPanel";
import PlinkoBoard from "@/components/zlinkoComponents/PlinkoBoard";
import { storedMultipliers } from "@/components/zlinkoComponents/multipliers";
import type { Risk } from "@/components/zlinkoComponents/multipliers";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import MuteButton from "@/components/MuteButton";
import Footer from "@/components/Footer";
import { 
  useSimulatePlinkoPlay,
  useReadInitiaTokenAllowance,
  useSimulatePlinkoAddAcceptedToken,
  initiaTokenAddress,
  plinkoAddress,
  plinkoAbi, } from "@/generated";
import { useAccount, useWatchContractEvent } from "wagmi";
import { getBalance, getAccount, waitForTransactionReceipt, writeContract } from "wagmi/actions";
import { useMuteState } from "@/components/MuteContext";
import { parseEther } from "viem";
import { formatEther } from "viem";
import { config } from "@/config";
import ApproveModal from "@/components/approveModal";
import LoadingModal from "@/components/loadingModal";
export default function Zlinko() {
  const [betAmount, setBetAmount] = useState<number>(1);
  const [degenLevel, setDegenLevel] = useState<string>("Normal");
  const [rows, setRows] = useState<number>(8);
  const [riskLevel, setRiskLevel] = useState<string>("Low");
  const [audioOn, setAudioOn] = useState<boolean>(true);
  const [multipliers, setMultipliers] = useState<number[]>([
    4.7, 2.3, 1.2, 1, 0.4, 1, 1.2, 2.3, 4.7,
  ]);
  const [dropBallTrigger, setDropBallTrigger] = useState<boolean>(false);
  const { isMuted, toggleMute } = useMuteState();
  const [approveModalIsOpen, setApproveModalIsOpen] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [endBucket, setEndBucket] = useState<number>(4);
  const [trajectoryArray, setTrajectoryArray] = useState<number[]>(Array(rows).fill(0));
  const [runContractTrigger, setRunContractTrigger] = useState<boolean>(false);

  const fullMultipliers = (halfMultipliers: number[]) => {
    let reversePart = halfMultipliers.slice(0, -1).reverse();
    if (rows % 2 !== 0) {
      reversePart.unshift(halfMultipliers[halfMultipliers.length - 1]);
    }
    return halfMultipliers.concat(reversePart);
  };
  useEffect(() => {
    console.log("working");
    //setEndBucket(2);
    setRunContractTrigger(false);
    setDropBallTrigger(true);
  }, [runContractTrigger]);

  useEffect(() => {
    console.log(degenLevel);
    let halfMultipliers;
    if (degenLevel != "Normal") {
      halfMultipliers = storedMultipliers[degenLevel as Risk][0];
    } else {
      if (riskLevel === "Extreme") {
        return;
      }
      halfMultipliers = storedMultipliers[riskLevel as Risk][rows - 8];
    }
    setMultipliers(fullMultipliers(halfMultipliers));
  }, [rows, riskLevel, degenLevel]);

  const { address: addr } = useAccount();

  const {data: play}: {data: any} = useSimulatePlinkoPlay({
    args: [BigInt(betAmount),
      BigInt(rows),
      initiaTokenAddress,
    ],
  });
  console.log("play: ", play);
  const { data: allowance, refetch: refetchAllowance } =
    useReadInitiaTokenAllowance({
      args: [addr ? addr : "0x00000000000000000", plinkoAddress],
    });
  async function playContract() {
    if (!play || !play.request) {
      console.error("Error, play contract is null.");
      return false;
    }
    console.log(play!.request);
    try {
      let myhash = await writeContract(config, play!.request);
      console.log("myhash: ", myhash);
      let receipt = await waitForTransactionReceipt(config, { hash: myhash });
      console.log("receipt: ", receipt);
      
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  const result = useWatchContractEvent({
    address: plinkoAddress,
    abi: plinkoAbi,
    eventName: 'GameResult',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  }); 

  async function playPlinko() {
    if (betAmount === 0) {
      toast.error("Please enter a wager.");
      return;
    }

    
    const addr = getAccount(config).address;
    if (addr) {
      const walletBalanceUnformatted = await getBalance(config, {
        address: addr,
        token: initiaTokenAddress,
      });
      const walletBalance = Number(walletBalanceUnformatted.value);
      console.log("WalletBalance: ", walletBalance);

      if (walletBalance <= betAmount) {
        toast.error("Insufficient funds. Please add Init to your wallet.");
        
        return;
      }
      
      const { data: newAllowance } = await refetchAllowance();

      console.log("Allowance Page: ", newAllowance);

      console.log("formatEther(newAllowance): ", formatEther(newAllowance!));
      console.log(
        "Number(formatEther(newAllowance)): ",
        Number(formatEther(newAllowance!))
      );
      console.log("betAmount: ", betAmount);
      console.log(
        "Number(formatEther(newAllowance)) < betAmount: ",
        Number(formatEther(newAllowance!)) < betAmount
      );

      if (
        !newAllowance ||
        newAllowance < BigInt(parseEther(betAmount.toString()))
      ) {
        setApproveModalIsOpen(true);
        // Modal Pop up
        return;
      }

      setLoadingModalIsOpen(true);

      const playedSuccessfully = await playContract();

      setLoadingModalIsOpen(false);
      
      if (playedSuccessfully) {
        const postWalletBalanceUnformatted = await getBalance(config, {
          address: addr,
          token: initiaTokenAddress,
        });

        const postWalletBalance = Number(postWalletBalanceUnformatted.value);

        console.log("Initial Wallet Balance: ", walletBalanceUnformatted);
        console.log("Post Wallet Balance: ", postWalletBalanceUnformatted);
        console.log("Bet Amount: ", betAmount);

        const outcome = walletBalance < postWalletBalance;

        const winnings = outcome ? postWalletBalance - walletBalance : 0;

        // fetch(
        //   `./api/addEvent?ownerAddress=${addr}&coins=${betAmount}&winnings=${winnings}&wager=${betAmount}&outcome=${outcome}`
        // )
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log(data);
        //   })
        //   .then(() => {
        //     setTimeout(() => {
        //       if (outcome) {
        //         toast.success("Congratulations you won!");
               
        //       } else {
                
        //         }
        //         toast.error("You lost.");
        //       }
        //     }, 1000);
        //   });

        // if (coinsDisplayRef.current) {
        //   randomFlip(
        //     coinsDisplayRef.current,
        //     minHeadsTails,
        //     currentSide,
        //     outcome
        //   );
        // }
      } else {
        toast.error("Error with flip. Transaction did not complete.");
      }
    } else {
      
      toast.error("Please connect your wallet first");
      return;
    }
  }


  return (
    <div className="relative w-screen h-screen no-scrollbar">
      <Toaster />
      <Header />
      <StarField />
      <ApproveModal
        isOpen={approveModalIsOpen}
        onClose={() => {
          setApproveModalIsOpen(false);
        }}
        allowance={allowance ? Number(formatEther(allowance)) : 0}
        wager={betAmount}
      />

      <LoadingModal
        isOpen={loadingModalIsOpen}
        onClose={() => {
          setLoadingModalIsOpen(false);
        }}
      />
      <MuteButton />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-end gap-4 sm:mt-20">
        <div className="w-full lg:w-auto lg:order-1 order-2">
          <button onClick={playPlinko} className="bg-white text-black px-4 py-2 rounded-md">Play</button>
          <ControlPanel
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            degenLevel={degenLevel}
            setDegenLevel={setDegenLevel}
            rows={rows}
            setRows={setRows}
            riskLevel={riskLevel}
            setRiskLevel={setRiskLevel}
            dropBallTrigger={dropBallTrigger}
            setDropBallTrigger={setDropBallTrigger}
            setRunContractTrigger={setRunContractTrigger}
          />
        </div>
        <div className="w-full lg:w-auto lg:mt-[-65px] lg:order-2 order-1 mb-8 lg:mb-0">
          <PlinkoBoard
            rows={rows}
            multipliers={multipliers}
            dropBallTrigger={dropBallTrigger}
            setDropBallTrigger={setDropBallTrigger}
            trajectory={trajectoryArray}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
