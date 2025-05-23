"use client";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef, use } from "react";
import {
  updateCoinsDisplay,
  updateWinChance,
  updatePotentialWin,
  flipCoins,
  WinChanceType,
  randomFlip,
} from "../../components/zaarFlipUtils";
import toast, { Toaster } from "react-hot-toast";
import { StarField } from "@/components/star-field";
import { Header } from "@/components/header"; // Fixed casing issue
import { config, initia } from "@/config";
import { getAccount, getBalance, watchContractEvent } from "@wagmi/core";
import { createConfetti } from "@/components/confetti";
import { Tooltip } from "@/components/tooltip";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import {
  useSimulateZaarflipFlip,
  useReadInitiaTokenAllowance,
} from "@/generated";
import { writeContract, readContract } from "@wagmi/core";
import { waitForTransactionReceipt } from "@wagmi/core";
import { formatEther, Log, parseEventLogs } from "viem";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import ApproveModal from "@/components/approveModal";
import LoadingModal from "@/components/loadingModal";
import { initiaTokenAddress } from "@/generated";
import { zaarflipAddress } from "@/generated";
import { MuteButton } from "@/components/MuteButton";
import { useMuteState } from "@/components/MuteContext";
import { useWatchContractEvent } from "wagmi";

// import useSound from "use-sound";
import Footer from "@/components/Footer";
import { FlipAbi } from "@/abis/Flip-abi";
import { ManualFlipAbi } from "@/abis/ManualFlip-abi";
import { useBalanceContext } from "@/contexts/BalanceContext";
import { getFutureTimestamp } from "@/utils/timestamps";
import { publicClient } from "@/client";
import { manualRandomness } from "@/lib/constants/manualRandomness";

interface GameResultEvent {
  eventName: "GameResult";
  args: {
    player: `0x${string}`;
    won: boolean;
    payout: bigint;
  };
}

interface GameResult {
  gameId: string;
  won: boolean;
  payout: bigint;
}

export default function Home() {
  const [currentSide, setCurrentSide] = useState("heads");
  const [coinsAmount, setCoinsAmount] = useState(1);
  const [minHeadsTails, setMinHeadsTails] = useState(1);
  const [wager, setWager] = useState(1.0);
  const [potentialWin, setPotentialWin] = useState(2);
  const [winChance, setWinChance] = useState<WinChanceType>({
    toWin: 1,
    chance: 50.0,
  });
  const coinsDisplayRef = useRef(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const inputRefMobile = useRef<HTMLDivElement>(null);
  const presetRef1 = useRef<HTMLDivElement>(null);
  const presetRef2 = useRef<HTMLDivElement>(null);
  const [wagerDropdown, setWagerDropdown] = useState(false);
  const [presetDropdown, setPresetDropdown] = useState(false);
  const [presetSelection, setPresetSelection] = useState("1 : 1 (x1.96)");
  const [approveModalIsOpen, setApproveModalIsOpen] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const winaudio = new Audio("/sounds/yeahboi.mp3");
  const winaudio2 = new Audio("/sounds/cena.mp3");
  const flipaudio = new Audio("/sounds/money.mp3");
  const erroraudio = new Audio("/sounds/error.mp3");
  const loseaudio = new Audio("/sounds/lose.mp3");
  const loseAudio2 = new Audio("/sounds/lose2.mp3");
  const [audioCount, setAudioCount] = useState(1);
  const { isMuted, toggleMute } = useMuteState();
  const wagerInputRef = useRef<HTMLInputElement>(null);
  const { chainId } = useAccount();

  const { data: flip, refetch: refetchFlip }: { data: any; refetch: any } =
    useSimulateZaarflipFlip({
      args: [
        parseEther(BigInt(wager ? wager : 0).toString()),
        // BigInt(1),
        BigInt(coinsAmount),
        BigInt(minHeadsTails),
        initiaTokenAddress,
        getFutureTimestamp(15),
      ],
      chainId: initia.id,
    });
  console.log(parseEther(BigInt(wager ? wager : 0).toString()));
  console.log(coinsAmount);
  console.log(minHeadsTails);
  console.log(initiaTokenAddress);
  console.log(getFutureTimestamp(15));
  console.log("flip", flip);
  const testFlipper = useSimulateZaarflipFlip({
    args: [
      BigInt(1),
      BigInt(1),
      BigInt(1),
      initiaTokenAddress,
      getFutureTimestamp(15),
    ],
    chainId: initia.id,
  });
  console.log("testFlipper", testFlipper);

  //console.log("testFlipper", testFlipper);
  //for regular wallets
  const { address: addr } = useAccount();
  const { refetchBalance } = useBalanceContext();

  const { data: allowance, refetch: refetchAllowance } =
    useReadInitiaTokenAllowance({
      args: [
        addr ? addr : "0x0000000000000000000000000000000000000000",
        zaarflipAddress,
      ],
    });

  console.log("allowance", allowance);

  const wagerPresets = [10, 50, 100, 500, 1000, 5000];

  useEffect(() => {
    updateAll();
  }, [coinsAmount, minHeadsTails, wager]);

  function updateAll() {
    if (coinsDisplayRef.current) {
      updateCoinsDisplay(
        coinsDisplayRef.current,
        coinsAmount,
        minHeadsTails,
        currentSide
      );
    }
    setWinChance(updateWinChance(coinsAmount, minHeadsTails));
    setPotentialWin(
      Number(updatePotentialWin(coinsAmount, minHeadsTails, wager))
    );
  }

  function handlePresetChange(input: string) {
    const [coins, minHeadsTails] = input.split(":");
    setCoinsAmount(parseInt(coins));
    setMinHeadsTails(parseInt(minHeadsTails));
    if (parseInt(minHeadsTails) > parseInt(coins)) {
      setCoinsAmount(parseInt(minHeadsTails));
    }
  }

  useEffect(() => {
    if (wagerInputRef.current) {
      wagerInputRef.current.style.width = "3ch";
      wagerInputRef.current.style.width = `${wagerInputRef.current.scrollWidth + 8}px`;
    }
  }, [wager]);

  function handleWagerChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/[^0-9]/g, "");

    // Allow empty string (for deletion)
    if (value === "") {
      setWager(0);
      return;
    }

    let parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setWager(parsedValue);
    } else {
      setWager(0);
    }
  }

  function handleHalfWager() {
    setWager((prevWager) => parseFloat((prevWager / 2).toFixed(0)));
  }

  function handleDoubleWager() {
    setWager((prevWager) => parseFloat((prevWager * 2).toFixed(0)));
  }

  function handleSideChange(side: string) {
    if (currentSide !== side && coinsDisplayRef.current) {
      setCurrentSide(side);
      flipCoins(coinsDisplayRef.current, minHeadsTails, side);
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setWagerDropdown(false);
    }
  };
  const handleClickOutsidePreset = (e: MouseEvent) => {
    if (
      presetRef1.current &&
      !presetRef1.current.contains(e.target as Node) &&
      presetRef2.current &&
      !presetRef2.current.contains(e.target as Node)
    ) {
      setPresetDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutsidePreset);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsidePreset);
    };
  }, []);

  useEffect(() => {
    if (minHeadsTails > coinsAmount) {
      setCoinsAmount(minHeadsTails);
    }
  }, [minHeadsTails]);

  // Ensure minHeadsTails is always <= coinsAmount
  useEffect(() => {
    if (coinsAmount < minHeadsTails) {
      setMinHeadsTails(coinsAmount);
    }
  }, [coinsAmount]);

  async function flipContract() {
    if (!flip || !flip.request) {
      console.error("Error, flip contract is null.");
      return false;
    }
    try {
      let myhash = await writeContract(config, flip!.request);

      let receipt = await waitForTransactionReceipt(config, { hash: myhash });

      console.log("receipt", receipt);

      type RandomnessRequestedEvent = Log & {
        args: {
          gameId?: string;
        };
      };

      const resultLogs = parseEventLogs({
        abi: ManualFlipAbi,
        eventName: "RandomnessRequested",
        logs: receipt.logs,
      }) as unknown as RandomnessRequestedEvent[];

      console.log("resultLogs", resultLogs);

      const gameId = String(resultLogs[0].args.gameId);

      if (manualRandomness) {
        fetch(
          `./api/addCoinEvent?ownerAddress=${addr}&wager=${wager}&winnings=${0}&outcome=${false}&side=${currentSide}&gameId=${gameId}`
        );
      }

      const result: GameResult = await new Promise((resolve) => {
        let lastCheckedBlock = receipt.blockNumber;
        let isPolling = true;

        async function pollForEvents() {
          if (!isPolling) return;

          try {
            const currentBlock = await publicClient.getBlockNumber();

            if (currentBlock > lastCheckedBlock) {
              console.log(
                `Polling blocks ${lastCheckedBlock} to ${currentBlock}`
              );

              const logs = await publicClient.getLogs({
                address: zaarflipAddress,
                fromBlock: lastCheckedBlock + BigInt(1),
                toBlock: currentBlock,
              });

              if (logs.length > 0) {
                console.log("Found events:", logs);

                for (const log of logs) {
                  try {
                    const decodedLog = await publicClient.getContractEvents({
                      address: zaarflipAddress,
                      abi: ManualFlipAbi,
                      fromBlock: log.blockNumber,
                      toBlock: log.blockNumber,
                    });

                    for (const event of decodedLog) {
                      if (event.eventName === "GameResult") {
                        const gameResult = event as unknown as GameResultEvent;
                        if (
                          gameResult.args.player.toLowerCase() ===
                          addr?.toLowerCase()
                        ) {
                          console.log("Found game result:", gameResult);
                          isPolling = false;
                          resolve({
                            gameId: gameId,
                            won: gameResult.args.won,
                            payout: gameResult.args.payout,
                          });
                          return;
                        }
                      }
                    }
                  } catch (error) {
                    console.error("Error decoding log:", error);
                  }
                }
              }

              lastCheckedBlock = currentBlock;
            }
          } catch (error) {
            console.error("Polling error:", error);
          }

          if (isPolling) {
            setTimeout(pollForEvents, 1000);
          }
        }

        pollForEvents();
      });

      // const result: GameResult = await new Promise((resolve) => {
      //   const unwatch = watchContractEvent(config, {
      //     address: zaarflipAddress,
      //     abi: ManualFlipAbi,
      //     eventName: "GameResult",
      //     onLogs: (logs: Array<Log>) => {
      //       const gameLogs = logs as unknown as GameResultEvent[];
      //       console.log("Game Logs: ", gameLogs);
      //       for (const log of gameLogs) {
      //         if (log.args.player.toLowerCase() === addr?.toLowerCase()) {
      //           unwatch();
      //           console.log("Logs: ", logs);
      //           resolve({
      //             won: gameLogs[0]?.args.won,
      //             payout: gameLogs[0]?.args.payout,
      //           });
      //         }
      //       }
      //     },
      //     poll: true,
      //   });
      // });

      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function flipCoin() {
    if (wager === 0) {
      toast.error("Please enter a wager.");
      if (!isMuted) {
        erroraudio.play();
      }
      return;
    }

    if (chainId !== initia.id) {
      toast.error("Unsupported network. Please switch to zaar-test-5.");
      if (!isMuted) {
        erroraudio.play();
      }
      return;
    }

    if (wager > wagerPresets[wagerPresets.length - 1]) {
      toast.error(
        `The current max wager is ${wagerPresets[wagerPresets.length - 1]} INIT.`
      );
      if (!isMuted) {
        erroraudio.play();
      }
      return;
    }

    const addr = getAccount(config).address;
    if (addr) {
      const walletBalanceUnformatted = await getBalance(config, {
        address: addr,
        token: initiaTokenAddress,
      });
      console.log(walletBalanceUnformatted, initiaTokenAddress);
      const walletBalance = Number(walletBalanceUnformatted.value);

      if (walletBalance <= wager) {
        toast.error("Insufficient funds. Please add Init to your wallet.");
        if (!isMuted) {
          erroraudio.play();
        }
        return;
      }
      if (!isMuted) {
        flipaudio.play();
      }
      const { data: newAllowance } = await refetchAllowance();

      if (
        !newAllowance ||
        newAllowance < BigInt(parseEther(wager.toString()))
      ) {
        setApproveModalIsOpen(true);
        // Modal Pop up
        return;
      }

      setLoadingModalIsOpen(true);

      const result = await flipContract();

      setLoadingModalIsOpen(false);

      if (result) {
        const outcome = result.won;

        const postWalletBalanceUnformatted = await getBalance(config, {
          address: addr || "0x0000000000000000000000000000000000000000",
          token: initiaTokenAddress,
        });

        if (!manualRandomness) {
          const winnings = Number(formatEther(result.payout));

          fetch(
            `./api/addCoinEvent?ownerAddress=${addr}&wager=${wager}&winnings=${winnings}&outcome=${outcome}&side=${currentSide}&gameId=${result.gameId}`
          );
        }

        setTimeout(async () => {
          if (outcome) {
            toast.success("Congratulations, you won!");
            if (!isMuted) {
              if (audioCount % 2 == 1) {
                winaudio.play();
              } else if (audioCount === 2) {
                winaudio2.play();
              }
              await refetchBalance();
            }
            createConfetti();
          } else {
            if (!isMuted) {
              if (audioCount === 1) {
                loseaudio.play();
                setAudioCount(2);
              } else if (audioCount === 2) {
                setAudioCount(3);
              } else if (audioCount === 3) {
                setAudioCount(4);
              } else if (audioCount === 4) {
                loseAudio2.play();
                setAudioCount(5);
              } else if (audioCount === 5) {
                setAudioCount(6);
              } else if (audioCount === 6) {
                setAudioCount(1);
              }
            }
            toast.error("You lost.");
            await refetchBalance();
          }
        }, 150 * coinsAmount);

        if (coinsDisplayRef.current) {
          randomFlip(
            coinsDisplayRef.current,
            minHeadsTails,
            currentSide,
            outcome
          );
        }
      } else {
        toast.error("Error with flip. Transaction did not complete.");
      }
    } else {
      if (!isMuted) {
        erroraudio.play();
      }
      toast.error("Please connect your wallet first");
      return;
    }
  }

  return (
    <div className=" h-screen w-screen overflow-x-hidden no-scrollbar relative flex flex-col items-center justify-start pb-10 ">
      <Head>
        <title>Zaar Flip</title>
        <meta
          name="description"
          content="A first-in-class NFT trading platform for traders of every caliber."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <div className="-mr-8">
        <Header />
      </div>
      <StarField />

      <ApproveModal
        isOpen={approveModalIsOpen}
        onClose={() => {
          setApproveModalIsOpen(false);
        }}
        allowance={allowance ? Number(formatEther(allowance)) : 0}
        wager={wager}
        refetchFlip={refetchFlip}
      />

      <LoadingModal
        isOpen={loadingModalIsOpen}
        onClose={() => {
          setLoadingModalIsOpen(false);
        }}
      />

      <div
        id="planet"
        className="hidden absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yellow-300 opacity-20"
      ></div>
      <div className="hidden absolute bottom-0 left-0 w-64 h-64 flex items-center justify-center">
        <Image
          src="/logo-3d.png"
          alt="Logo"
          width={160}
          height={160}
          className="w-[100px] h-[100px]  object-contain z-50 opacity-40 bg-red-400"
        />
      </div>
      <div className="container container-fluid  w-screen h-[800px] items-center justify-center relative z-10">
        <main className="contiainer w-full  h-full flex flex-col justify-center relative z-20">
          <div className="  flex flex-col h-[300px] items-center justify-center">
            <div
              id="coins-display"
              ref={coinsDisplayRef}
              className="bg-white absolute top-200 bg-whitish w-full h-[360px] flex items-center justify-center mb-2"
            >
              {/* Coins will be dynamically added here */}
            </div>

            <div className="text-yellow mb-2 mt-4">
              <span className="text-md mr-2">
                {winChance.toWin} OR MORE TO WIN
              </span>
              <span className="text-light-gray">
                {winChance.chance}% CHANCE
              </span>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden space-y-3 w-full px-4">
            <div className="flex items-center justify-between">
              <div className="w-1/2 pr-2">
                <div className="text-light-green mb-1 text-sm">PICK SIDE:</div>
                <div className="flex items-center space-x-4">
                  <div
                    onClick={() => handleSideChange("heads")}
                    className={`coin-side ${currentSide === "heads" ? "selected" : ""}`}
                  >
                    <Image
                      src="/zaar-flip-heads.png"
                      alt="Heads"
                      width={48}
                      height={48}
                      className="cursor-pointer"
                    />
                  </div>
                  <div
                    onClick={() => handleSideChange("tails")}
                    className={`coin-side ${currentSide === "tails" ? "selected" : ""}`}
                  >
                    <Image
                      src="/zaar-flip-tails.png"
                      alt="Tails"
                      width={48}
                      height={48}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <button
                  onClick={() => {
                    if (coinsDisplayRef.current) {
                      flipCoin();
                      //testFlipCoin();
                    }
                  }}
                  className="gradient-button text-black px-6 py-2  hover:-translate-y-1 transition duration-700 ease-in-out rounded-sm font-bold mt-3 mx-auto block text-sm uppercase transition duration-700 ease-in-out"
                >
                  FLIP COIN - {wager} INIT
                </button>
              </div>
            </div>
            <div>
              <div className="text-light-green mb-1 text-sm  flex items-center ">
                PRESETS
              </div>

              <div
                ref={presetRef1}
                className="z-40 relative flex flex-col flex-grow text-light-green rounded-sm w-full h-10 text-sm focus:outline-none focus:border focus:border-yellow-400"
              >
                <div
                  className={`${presetDropdown ? "border-light-gray-all" : " "} flex flex-row justify-between bg-dark-gray items-center w-full text-light-green h-10 px-2`}
                  onClick={() => {
                    setPresetDropdown(!presetDropdown);
                  }}
                >
                  {presetSelection}
                  {presetDropdown ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                <div className="absolute flex flex-col w-full mt-10 flex flex-grow">
                  <div
                    onClick={() => {
                      handlePresetChange("10:5:1.57");
                      setPresetSelection("10 : 5 (x1.57)");
                      setPresetDropdown(false);
                    }}
                    className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "10 : 5 (x1.57)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                  >
                    10 : 5 (x1.57)
                  </div>
                  <div
                    onClick={() => {
                      handlePresetChange("4:3:3.14");
                      setPresetSelection("4 : 3 (x3.14)");
                      setPresetDropdown(false);
                    }}
                    className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "4 : 3 (x3.14)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                  >
                    4 : 3 (x3.14)
                  </div>
                  <div
                    onClick={() => {
                      handlePresetChange("6:5:8.96");
                      setPresetSelection("6 : 5 (x8.96)");
                      setPresetDropdown(false);
                    }}
                    className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "6 : 5 (x8.96)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                  >
                    6 : 5 (x8.96)
                  </div>
                  <div
                    onClick={() => {
                      handlePresetChange("9:8:50.8");
                      setPresetSelection("9 : 8 (x50.8)");
                      setPresetDropdown(false);
                    }}
                    className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "9 : 8 (x50.8)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                  >
                    9 : 8 (x50.8)
                  </div>
                  <div
                    onClick={() => {
                      handlePresetChange("10:10:1003.52");
                      setPresetSelection("10 : 10 (x1003.52)");
                      setPresetDropdown(false);
                    }}
                    className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "10 : 10 (x1003.52)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                  >
                    10 : 10 (x1003.52)
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-light-green mb-1 text-sm">WAGER</div>
              <div className="wager-container bg-dark-gray text-light-green rounded-sm p-2 flex items-center justify-between h-10 focus-within:ring-1 focus-within:ring-yellow-400">
                <div className="flex items-center">
                  <Image
                    src="/zaar-flip-heads.png"
                    alt="Coin"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <div className="" ref={inputRefMobile}>
                    <input
                      type="text"
                      value={wager === 0 ? "" : `${wager} INIT`}
                      className="wager-input bg-transparent w-24 text-left pl-2 h-8 text-sm focus:outline-none"
                      onChange={handleWagerChange}
                      onFocus={() => setWagerDropdown(true)}
                    />
                    {/*wagerDropdown && (
                          <div className="absolute z-10 w-36 shadow-lg mt-1">
                            {wagerPresets.map((value) => (
                              <div
                                key={value}
                                className="cursor-default w-[175px] px-2 hover:bg-gray h-8 flex items-center  bg-dark-gray flex flex-row items-center"
                                onClick={() => {
                                  setWager(value);
                                  setWagerDropdown(false);
                                }}
                              >
                                <Image
                                  src="/zaar-flip-heads.png"
                                  alt="Coin"
                                  width={15}
                                  height={15}
                                  className="mr-2"
                                />
                                ${value.toFixed(2)} INIT
                              </div>
                            ))}
                      </div>
                    )}*/}
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={handleHalfWager}
                    className="gradient-button text-black px-2 py-1 rounded-sm h-7 text-sm mr-3 transition duration-300 ease-in-out opacity-85 hover:opacity-100"
                  >
                    1/2
                  </button>
                  <button
                    onClick={handleDoubleWager}
                    className="gradient-button text-black px-[12px] py-1 rounded-sm h-7 text-sm transition duration-300 ease-in-out opacity-85 hover:opacity-100"
                  >
                    x2
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="text-light-green mb-1 text-sm">
                POTENTIAL TO WIN
              </div>
              <div className="bg-gray rounded-sm p-2 text-lime-green h-10 flex items-center text-sm">
                {potentialWin} {" INIT"}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-1/2 pr-2">
                <div className="text-light-green mb-1 text-sm">
                  COINS AMOUNT
                </div>
                <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                  <div className="text-light-green text-center mr-2 text-sm">
                    x
                  </div>
                  <div className="text-light-green text-center mr-5 text-sm">
                    {coinsAmount}
                  </div>
                  <input
                    id="coinsAmount"
                    type="range"
                    min="1"
                    max="10"
                    value={coinsAmount}
                    className="slider coins-amount w-full h-4"
                    onChange={(e) => {
                      setCoinsAmount(parseInt(e.target.value));
                    }}
                    style={{
                      background: `linear-gradient(to right, green, yellow, orange, red)`,
                    }}
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="text-light-green mb-1 text-sm flex items-center">
                  MIN HEADS / TAILS
                </div>
                <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                  <div className="text-light-green text-center mr-2 text-sm">
                    x
                  </div>
                  <div className="text-light-green text-center mr-5 text-sm">
                    {minHeadsTails}
                  </div>
                  <input
                    id="minHeadsTails"
                    type="range"
                    min="1"
                    max="10"
                    value={minHeadsTails}
                    className="slider min-heads-tails w-full h-4"
                    onChange={(e) => {
                      setMinHeadsTails(parseInt(e.target.value));
                    }}
                    style={{
                      background: `linear-gradient(to right, green, yellow, orange, red)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:grid grid-cols-3 gap-4 w-full max-w-4xl mx-auto mb-4 h-50">
            <div className="space-y-3">
              <div>
                <div className="text-light-green mb-1 text-sm flex items-center">
                  COINS AMOUNT
                  <Tooltip
                    text={
                      "This determines how many virtual coins you are flipping in one game. You can choose from 1 to 10 coins."
                    }
                  />
                </div>
                <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                  <div className="text-light-green text-center mr-2 text-sm">
                    x
                  </div>
                  <div className="text-light-green text-center mr-5 text-sm">
                    {coinsAmount}
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={coinsAmount}
                    className="slider coins-amount w-full h-4"
                    onChange={(e) => setCoinsAmount(parseInt(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, green, yellow, orange, red)`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="text-light-green mb-1 text-sm mt-6">
                  MIN HEADS / TAILS
                  <Tooltip
                    text={
                      "This sets the minimum number of heads (or tails, depending on your chosen side) you need to win. For example, if you set this to 3 with 5 coins, you'd need at least 3 out of 5 coins to land on your chosen side to win."
                    }
                  />
                </div>

                <div className="bg-dark-gray rounded-sm p-2 flex items-center h-10">
                  <div className="text-light-green text-center mr-2 text-sm">
                    x
                  </div>
                  <div className="text-light-green text-center mr-5 text-sm">
                    {minHeadsTails}
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={minHeadsTails}
                    className="slider min-heads-tails w-full h-4"
                    onChange={(e) => setMinHeadsTails(parseInt(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, green, yellow, orange, red)`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-light-green mb-0 h-6 text-sm">WAGER</div>
                <div>
                  <div className="wager-container bg-dark-gray text-light-green rounded-sm p-2 flex items-center justify-between h-10 focus-within:ring-1 focus-within:ring-yellow">
                    <div className="flex items-center">
                      <Image
                        src="/zaar-flip-heads.png"
                        alt="Coin"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      <div ref={inputRef}>
                        <div className="flex items-center">
                          <input
                            ref={wagerInputRef}
                            type="text"
                            value={wager === 0 ? "" : `${wager}`}
                            className="wager-input bg-transparent max-w-30 text-left pl-2 h-8 text-sm focus:outline-none"
                            style={{ minWidth: "3ch" }}
                            onChange={handleWagerChange}
                            onFocus={() => setWagerDropdown(true)}
                          />
                          <span>INIT</span>
                        </div>

                        {wagerDropdown && (
                          <div className="absolute z-10 w-36 shadow-lg mt-1">
                            {wagerPresets.map((value) => (
                              <div
                                key={value}
                                className="cursor-default w-[175px] px-2 hover:bg-gray h-8 flex items-center  bg-dark-gray flex flex-row items-center"
                                onClick={() => {
                                  setWager(value);
                                  setWagerDropdown(false);
                                }}
                              >
                                <Image
                                  src="/zaar-flip-heads.png"
                                  alt="Coin"
                                  width={15}
                                  height={15}
                                  className="mr-2"
                                />
                                {value} INIT
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={handleHalfWager}
                        className="gradient-button text-black px-2 py-1 rounded-sm h-7 text-sm mr-3 transition duration-300 ease-in-out opacity-85 hover:opacity-100"
                      >
                        1/2
                      </button>
                      <button
                        onClick={handleDoubleWager}
                        className="gradient-button text-black px-[12px] py-1 rounded-sm h-7 text-sm transition duration-300 ease-in-out opacity-85 hover:opacity-100"
                      >
                        x2
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-light-green mb-1 text-sm mt-7">
                  POTENTIAL TO WIN
                </div>
                <div className="bg-gray rounded-sm p-2 pl-4 text-lime-green h-10 flex items-center text-lg">
                  {potentialWin} {" INIT"}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-light-green mb-1 text-sm">
                  PRESETS
                  <Tooltip
                    text={
                      "Presets offer quick selections of coin amounts and minimum wins. Each option shows the number of coins, required wins, and potential payout multiplier. Choose a preset to instantly set up your game configuration."
                    }
                  />
                </div>
                {/*<select className="bg-dark-gray text-light-green rounded-sm p-2 w-full h-10 text-sm focus:outline-none focus:border focus:border-yellow-400" onChange={()=>{handlePresetChange("")}}>
                <option className="hover:bg-gray" value="1:1:1.96">1 : 1 (x1.96)</option>
                <option value="10:5:1.57">10 : 5 (x1.57)</option>
                <option value="4:3:3.14">4 : 3 (x3.14)</option>
                <option value="6:5:8.96">6 : 5 (x8.96)</option>
                <option value="9:8:50.8">9 : 8 (x50.8)</option>
                <option value="10:10:1003.52">10 : 10 (x1003.52)</option>
              </select>*/}
                <div
                  ref={presetRef2}
                  className="z-40 relative flex flex-col flex-grow text-light-green rounded-sm w-full h-10 text-sm focus:outline-none focus:border focus:border-yellow-400 cursor-pointer"
                >
                  <div
                    className={`${presetDropdown ? "border-light-gray-all" : " "} flex flex-row justify-between bg-dark-gray items-center w-full text-light-green h-10 px-2`}
                    onClick={() => {
                      setPresetDropdown(!presetDropdown);
                    }}
                  >
                    {presetSelection}
                    {presetDropdown ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  <div className="absolute flex flex-col w-full mt-10 flex flex-grow">
                    <div
                      onClick={() => {
                        handlePresetChange("10:5:1.57");
                        setPresetSelection("10 : 5 (x1.57)");
                        setPresetDropdown(false);
                      }}
                      className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "10 : 5 (x1.57)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                    >
                      10 : 5 (x1.57)
                    </div>
                    <div
                      onClick={() => {
                        handlePresetChange("4:3:3.14");
                        setPresetSelection("4 : 3 (x3.14)");
                        setPresetDropdown(false);
                      }}
                      className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "4 : 3 (x3.14)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                    >
                      4 : 3 (x3.14)
                    </div>
                    <div
                      onClick={() => {
                        handlePresetChange("6:5:8.96");
                        setPresetSelection("6 : 5 (x8.96)");
                        setPresetDropdown(false);
                      }}
                      className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "6 : 5 (x8.96)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                    >
                      6 : 5 (x8.96)
                    </div>
                    <div
                      onClick={() => {
                        handlePresetChange("9:8:50.8");
                        setPresetSelection("9 : 8 (x50.8)");
                        setPresetDropdown(false);
                      }}
                      className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "9 : 8 (x50.8)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                    >
                      9 : 8 (x50.8)
                    </div>
                    <div
                      onClick={() => {
                        handlePresetChange("10:10:1003.52");
                        setPresetSelection("10 : 10 (x1003.52)");
                        setPresetDropdown(false);
                      }}
                      className={` w-full px-2 hover:bg-gray h-7 flex items-center  bg-dark-gray  ${presetSelection == "10 : 10 (x1003.52)" ? "text-white" : ""} ${presetDropdown ? "block" : "hidden"}`}
                    >
                      10 : 10 (x1003.52)
                    </div>
                  </div>
                  {/*<div onClick={()=>{handlePresetChange("10:5:1.57"); setPresetSelection("10 : 5 (x1.57)");}} className={`${presetDropdown? "block" : "hidden"} bg-dark-gray absolute w-full`}>
                  <div onClick={()=>{handlePresetChange("10:5:1.57"); setPresetSelection("10 : 5 (x1.57)");}}>10 : 5 (x1.57)</div>
                  <div className={`text-center hover:bg-gray w-full ${presetSelection=="10 : 5 (x1.57)"? " text-white " : "text-light-gray"}`} onClick={()=>{handlePresetChange("10:5:1.57"); setPresetSelection("10 : 5 (x1.57)");}}>4 : 3 (x3.14)</div>
                </div>*/}
                </div>
              </div>
              <div>
                <div className="text-light-green mb-1 text-sm mt-6">
                  PICK SIDE:
                  <Tooltip
                    text={
                      "This lets you choose which side of the coin you're betting on - heads or tails. The side you pick becomes your `winning` side for that game. In essence, you're betting on getting at least a certain number of your chosen side (heads or tails) when flipping a set number of coins. The more challenging your bet, the higher your potential winnings."
                    }
                  />
                </div>
                <div className="flex space-x-4">
                  <div
                    onClick={() => handleSideChange("heads")}
                    className={`coin-side ${currentSide === "heads" ? "selected" : ""}`}
                  >
                    <Image
                      src="/zaar-flip-heads.png"
                      alt="Heads"
                      width={48}
                      height={48}
                      className="cursor-pointer"
                    />
                  </div>
                  <div
                    onClick={() => handleSideChange("tails")}
                    className={`coin-side ${currentSide === "tails" ? "selected" : ""}`}
                  >
                    <Image
                      src="/zaar-flip-tails.png"
                      alt="Tails"
                      width={48}
                      height={48}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (coinsDisplayRef.current) {
                flipCoin();
                //testFlipCoin();
              }
            }}
            className="hidden md:block gradient-button hover:-translate-y-1 transition duration-700 ease-in-out text-black px-6 py-2 rounded-sm font-bold mt-3 mx-auto block text-sm uppercase"
          >
            FLIP COIN - {wager} {"INIT"}
          </button>
        </main>
      </div>
      <MuteButton />
      {/* <Footer /> */}
    </div>
  );
}
