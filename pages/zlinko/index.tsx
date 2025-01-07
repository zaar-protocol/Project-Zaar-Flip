// import React from "react";
// import { useState, useRef, useEffect } from "react";
// import { StarField } from "@/components/star-field";
// import { Header } from "@/components/header";
// import toast, { Toaster } from "react-hot-toast";
// import ControlPanel from "@/components/zlinkoComponents/ControlPanel";
// import PlinkoBoard from "@/components/zlinkoComponents/PlinkoBoard";
// import { storedMultipliers } from "@/components/zlinkoComponents/multipliers";
// import type { Risk } from "@/components/zlinkoComponents/multipliers";
// import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
// import MuteButton from "@/components/MuteButton";
// import Footer from "@/components/Footer";
// import {
//   useSimulatePlinkoPlay,
//   useReadInitiaTokenAllowance,
//   useSimulatePlinkoAddAcceptedToken,
//   initiaTokenAddress,
//   plinkoAddress,
//   plinkoAbi,
// } from "@/generated";
// import { useAccount, useWatchContractEvent } from "wagmi";
// import {
//   getBalance,
//   getAccount,
//   waitForTransactionReceipt,
//   writeContract,
// } from "wagmi/actions";
// import { useMuteState } from "@/components/MuteContext";
// import { parseEther, parseUnits } from "viem";
// import { formatEther } from "viem";
// import { config } from "@/config";
// import ApproveModal from "@/components/zlinkoApproveModal";
// import LoadingModal from "@/components/loadingModal";
// import { getContract, prepareEvent, watchContractEvents } from "thirdweb";
// import { client } from "@/client";
// import { thirdwebInitiaChain } from "@/thirdweb.config";

// export default function Zlinko() {
//   const [betAmount, setBetAmount] = useState<number>(1);
//   const [degenLevel, setDegenLevel] = useState<string>("Normal");
//   const [rows, setRows] = useState<number>(8);
//   const [riskLevel, setRiskLevel] = useState<string>("Low");
//   const [audioOn, setAudioOn] = useState<boolean>(true);
//   const [multipliers, setMultipliers] = useState<number[]>([
//     4.7, 2.3, 1.2, 1, 0.4, 1, 1.2, 2.3, 4.7,
//   ]);
//   const [dropBallTrigger, setDropBallTrigger] = useState<boolean>(false);
//   const { isMuted, toggleMute } = useMuteState();
//   const [approveModalIsOpen, setApproveModalIsOpen] = useState(false);
//   const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
//   const [endBucket, setEndBucket] = useState<number>(4);
//   const [trajectoryArray, setTrajectoryArray] = useState<number[]>(
//     Array(rows).fill(0)
//   );
//   const [runContractTrigger, setRunContractTrigger] = useState<boolean>(false);
//   const [gameResultPromise, setGameResultPromise] = useState<{
//     resolve: (value: number) => void;
//     reject: (reason?: any) => void;
//   } | null>(null);

//   const fullMultipliers = (halfMultipliers: number[]) => {
//     let reversePart = halfMultipliers.slice(0, -1).reverse();
//     if (rows % 2 !== 0) {
//       reversePart.unshift(halfMultipliers[halfMultipliers.length - 1]);
//     }
//     return halfMultipliers.concat(reversePart);
//   };
//   useEffect(() => {
//     //setEndBucket(2);
//     if (runContractTrigger) {
//       playPlinko();
//     }
//     setRunContractTrigger(false);
//   }, [runContractTrigger]);

//   useEffect(() => {
//     let halfMultipliers;
//     if (degenLevel != "Normal") {
//       halfMultipliers = storedMultipliers[degenLevel as Risk][0];
//     } else {
//       if (riskLevel === "Extreme") {
//         return;
//       }
//       halfMultipliers = storedMultipliers[riskLevel as Risk][rows - 8];
//     }
//     setMultipliers(fullMultipliers(halfMultipliers));
//   }, [rows, riskLevel, degenLevel]);

//   const { address: addr } = useAccount();

//   const { data: play }: { data: any } = useSimulatePlinkoPlay({
//     args: [BigInt(betAmount), BigInt(rows), initiaTokenAddress],
//   });
//   // console.log("play: ", play);

//   // const playPlaceholder = useSimulatePlinkoPlay({
//   //   args: [BigInt(betAmount), BigInt(rows), initiaTokenAddress],
//   // });
//   // console.log("playPlaceholder: ", playPlaceholder);

//   const { data: allowance, refetch: refetchAllowance } =
//     useReadInitiaTokenAllowance({
//       args: [addr ? addr : "0x00000000000000000", plinkoAddress],
//     });

//   async function playContract() {
//     if (!play || !play.request) {
//       console.error("Error, play contract is null.");
//       return false;
//     }
//     console.log(play!.request);
//     try {
//       let myhash = await writeContract(config, play!.request);
//       console.log("myhash: ", myhash);
//       let receipt = await waitForTransactionReceipt(config, { hash: myhash });
//       console.log("receipt: ", receipt);

//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   }

//   // event GameResult(address indexed player, bool won, uint256 payout, uint256 multiplier, uint256 landingPosition);
//   // emit GameResult(game.player, true, netPayout, multiplier, landingPosition);

//   const plinkoContract = getContract({
//     address: plinkoAddress,
//     abi: plinkoAbi,
//     client: client,
//     chain: thirdwebInitiaChain,
//   });

//   const events = watchContractEvents({
//     contract: plinkoContract,
//     onEvents: (events) => {
//       try {
//         if (events[0].eventName === "GameResult") {
//           const args = events[0].args as { landingPosition?: BigInt };
//           if (args.landingPosition) {
//             const landingPosition = Number(args.landingPosition);
//             console.log("Landing Position: ", landingPosition);

//             setEndBucket(landingPosition);
//             calculateRandomTrajectory(landingPosition);
//             setDropBallTrigger(true);

//             if (gameResultPromise) {
//               gameResultPromise.resolve(landingPosition);
//               setGameResultPromise(null);
//             }
//           }
//         }
//       } catch (error) {
//         if (gameResultPromise) {
//           gameResultPromise.reject(error);
//           setGameResultPromise(null);
//         }
//         console.error("Error in event handler:", error);
//       }
//     },
//   });

//   useEffect(() => {
//     console.log("endBucket updated to: ", endBucket);
//   }, [endBucket]);

//   function calculateRandomTrajectory(endBucket: number) {
//     const newTrajectory = Array(rows).fill(0);
//     newTrajectory.fill(1, 0, endBucket);
//     for (let i = 0; i < rows; i++) {
//       const j = Math.floor(Math.random() * rows);
//       [newTrajectory[i], newTrajectory[j]] = [
//         newTrajectory[j],
//         newTrajectory[i],
//       ];
//     }
//     setTrajectoryArray(newTrajectory);

//     //calculate random trajectory based on result
//     //set trajectory array
//   }

//   async function playPlinko() {
//     if (betAmount === 0) {
//       toast.error("Please enter a wager.");
//       return;
//     }

//     const addr = getAccount(config).address;
//     if (addr) {
//       const walletBalanceUnformatted = await getBalance(config, {
//         address: addr,
//         token: initiaTokenAddress,
//       });
//       const walletBalance = Number(walletBalanceUnformatted.value);

//       if (walletBalance <= betAmount) {
//         toast.error("Insufficient funds. Please add Init to your wallet.");

//         return;
//       }

//       const { data: newAllowance } = await refetchAllowance();

//       if (
//         !newAllowance ||
//         newAllowance < BigInt(parseEther(betAmount.toString()))
//       ) {
//         setApproveModalIsOpen(true);
//         // Modal Pop up
//         return;
//       }

//       setLoadingModalIsOpen(true);

//       const eventPromise = new Promise<number>((resolve, reject) => {
//         setGameResultPromise({ resolve, reject });
//       });

//       const playedSuccessfully = await playContract();

//       setLoadingModalIsOpen(false);

//       if (playedSuccessfully) {
//         const landingPosition = await eventPromise;
//         const postWalletBalanceUnformatted = await getBalance(config, {
//           address: addr,
//           token: initiaTokenAddress,
//         });

//         const postWalletBalance = Number(postWalletBalanceUnformatted.value);
//         const outcome = walletBalance < postWalletBalance;
//         const winnings = outcome ? postWalletBalance - walletBalance : 0;

//         await recordGameResult(
//           addr,
//           betAmount,
//           winnings,
//           outcome,
//           riskLevel,
//           landingPosition
//         );
//       } else {
//         toast.error("Error with drop. Transaction did not complete.");
//       }
//     } else {
//       toast.error("Please connect your wallet first");
//       return;
//     }
//   }

//   async function recordGameResult(
//     addr: string,
//     betAmount: number,
//     winnings: number,
//     outcome: boolean,
//     riskLevel: string,
//     landingPosition: number
//   ) {
//     try {
//       await fetch(
//         `./api/addZlinkoEvent?ownerAddress=${addr}&wager=${betAmount}&winnings=${winnings}&outcome=${outcome}&risk=${riskLevel}&multiplier=${multipliers[landingPosition]}`
//       );
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   }

//   return (
//     <div className="relative w-screen h-screen no-scrollbar">
//       <Toaster />
//       <Header />
//       <StarField />
//       <ApproveModal
//         isOpen={approveModalIsOpen}
//         onClose={() => {
//           setApproveModalIsOpen(false);
//         }}
//         allowance={allowance ? Number(formatEther(allowance)) : 0}
//         wager={betAmount}
//       />

//       <LoadingModal
//         isOpen={loadingModalIsOpen}
//         onClose={() => {
//           setLoadingModalIsOpen(false);
//         }}
//       />
//       <MuteButton />

//       <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-end gap-4 sm:mt-20">
//         <div className="w-full lg:w-auto lg:order-1 order-2">
//           <ControlPanel
//             betAmount={betAmount}
//             setBetAmount={setBetAmount}
//             degenLevel={degenLevel}
//             setDegenLevel={setDegenLevel}
//             rows={rows}
//             setRows={setRows}
//             riskLevel={riskLevel}
//             setRiskLevel={setRiskLevel}
//             dropBallTrigger={dropBallTrigger}
//             setDropBallTrigger={setDropBallTrigger}
//             setRunContractTrigger={setRunContractTrigger}
//           />
//         </div>
//         <div className="w-full lg:w-auto lg:mt-[-65px] lg:order-2 order-1 mb-8 lg:mb-0">
//           <PlinkoBoard
//             rows={rows}
//             multipliers={multipliers}
//             dropBallTrigger={dropBallTrigger}
//             setDropBallTrigger={setDropBallTrigger}
//             trajectory={trajectoryArray}
//           />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
