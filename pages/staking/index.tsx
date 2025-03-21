// import Footer from "@/components/Footer";
// import { Header } from "@/components/header";
// import Link from "next/link";
// import { FaArrowLeft, FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
// //import {approveInitiaToken, initiaTokenAddress, } from  "@/generated";
// import Image from "next/image";
// import { useState } from "react";
// import { useAccount } from "wagmi";
// import { useContractRead } from "wagmi";
// //import { zaarStakingAbi } from '../../abis/abi';
// import { formatEther } from "viem";
// import { stakingAddress } from "@/generated";
// import { useStakingBalance } from "../../hooks/useStakingBalance";

// export default function Staking() {
//   const [currentTab, setCurrentTab] = useState("deposit");
//   const { address } = useAccount();
//   const {
//     stakedBalance,
//     earnedBalance,
//     poolPercentage,
//     walletBalance,
//     isLoading,
//     cooldownProgress,
//     timeRemaining,
//   } = useStakingBalance(
//     address || "0x0000000000000000000000000000000000000000"
//   );

//   return (
//     <div className="w-screen min-h-screen ">
//       <Header />
//       {/* Updated background div */}
//       <div
//         style={{ backgroundImage: "url('/StakingHero.png')" }}
//         className="fixed right-0 top-0 w-full h-full bg-cover bg-center -z-10 bg-black"
//       ></div>

//       <div className="flex flex-col items-center justify-center h-screen gap-6">
//         {/*Back to home button*/}
//         <Link href="/">
//           <Link
//             href="/"
//             className="hover:text-white text-gray px-4 py-2 flex flex-row items-center justify-center gap-2 transition-all duration-300"
//           >
//             <FaArrowLeft />
//             Back to Home
//           </Link>
//         </Link>
//         <div className="flex flex-row items-center justify-center gap-4">
//           {/*Initia Logo Coin*/}
//           <Image
//             src="/zaar-flip-tails.png"
//             alt="Initia Logo Coin"
//             width={50}
//             height={50}
//             className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
//           />
//           <h1 className="text-4xl text-white uppercase">Be The House</h1>
//         </div>
//         <div className=" flex flex-row items-center justify-center gap-4 bg-black bg-opacity-50 p-6 gap-4">
//           <div className="flex text-sm flex-col items-start text-hoverGray justify-center gap-2">
//             Total Initia Staked
//             <h1 className="text-3xl text-yellow">
//               {stakedBalance ? formatEther(BigInt(stakedBalance)) : "0"}
//             </h1>
//           </div>
//           <div className="flex text-sm flex-col items-start text-hoverGray justify-center gap-2">
//             Your Percentage of the Pool
//             <h1 className="text-3xl text-yellow">{poolPercentage}%</h1>
//           </div>
//           <div className="flex text-sm flex-col items-start text-hoverGray justify-center gap-2">
//             Your Total Rewards Earned
//             <h1 className="text-3xl text-yellow">
//               {earnedBalance ? formatEther(BigInt(earnedBalance)) : "0"}
//             </h1>
//           </div>
//         </div>
//         <div className="flex flex-col md:flex-row w-full md:w-[60%] items-center justify-center gap-4">
//           <div className="flex flex-col items-start justify-center w-[50%] h-full">
//             <p className="text-3xl text-white">DEPOSIT INIT</p>
//             <p className="text-3xl text-white"> BE THE HOUSE </p>
//             <p className="text-3xl text-white">
//               {" "}
//               EARN <span className="text-yellow">REWARDS</span>
//             </p>
//             <p className="pt-6 text-white">
//               Be the house! Take the other side of the wager by depositing INIT
//               into the pool. Your deposit may accrue rewards generated by
//               protocol revenues. But be aware!{" "}
//               <span className="text-yellow">
//                 Deposits may also lose value, if and when there are a lare
//                 amount of user payouts.
//               </span>{" "}
//             </p>
//             <div className="text-white flex flex-row items-start justify-center gap-2">
//               <span className="">For more information, refer to the</span>
//               <Link
//                 className="flex flex-row hover:underline hover:text-white items-center justify-center gap-2"
//                 href="https://gitbook.zaar.market/"
//               >
//                 Docs
//                 <FaExternalLinkAlt />
//               </Link>
//             </div>
//           </div>
//           <div className="flex flex-col items-center justify-center w-[50%] h-full ">
//             <div className="bg-black text-white flex flex-row items-center justify-center w-full">
//               <div className="flex flex-col ">
//                 <button
//                   onClick={() => setCurrentTab("deposit")}
//                   className={`${currentTab === "deposit" ? "text-yellow " : "text-white hover:text-hoveryellow"} px-4 py-2 rounded-md`}
//                 >
//                   Deposit
//                 </button>
//                 <div
//                   className={`${currentTab === "deposit" ? "h-[2px] w-full bg-yellow" : "h-[2px] w-full bg-white"}`}
//                 ></div>
//               </div>

//               <div className="flex flex-col ">
//                 <button
//                   onClick={() => setCurrentTab("withdraw")}
//                   className={`${currentTab === "withdraw" ? "text-yellow" : "text-white hover:text-hoveryellow"} px-4 py-2 rounded-md`}
//                 >
//                   Withdraw
//                 </button>
//                 <div
//                   className={`${currentTab === "withdraw" ? "h-[2px] w-full bg-yellow" : "h-[2px] w-full bg-white"}`}
//                 ></div>
//               </div>
//             </div>
//             {currentTab === "deposit" && (
//               <div className="flex flex-col bg-white bg-opacity-5 w-full items-center justify-center p-6 gap-6">
//                 <div className="flex flex-row w-full items-center justify-center">
//                   <div className="flex flex-col items-start justify-center w-1/2 gap-2">
//                     <p className="text-white">From Wallet</p>
//                     <div className="flex flex-row items-center justify-between gap-2 bg-black border-2 border-white p-2 w-[70%]">
//                       <div className="flex flex-row items-center justify-center gap-2">
//                         <Image
//                           src="/zaar-flip-tails.png"
//                           alt="Initia Logo Coin"
//                           width={20}
//                           height={20}
//                         />
//                         <p className="text-white">INIT</p>
//                       </div>
//                       <FaChevronDown />
//                     </div>
//                     <p className="text-white">
//                       You have {Number(walletBalance).toFixed(2)} INIT
//                     </p>
//                   </div>

//                   <div className="flex flex-col items-start justify-center w-1/2 gap-2">
//                     <p className="text-white">Amount</p>
//                     <div className="flex flex-row items-center justify-between gap-2 bg-black border-2 border-white p-2">
//                       <input
//                         className="flex flex-row items-center justify-center gap-2 bg-black w-[70%] text-white focus:outline-none"
//                         placeholder="0.00"
//                       />
//                       <button
//                         className="text-black bg-white p-1 px-2 text-xs rounded-md hover:bg-gray-200 transition-colors"
//                         onClick={() => {
//                           // Add logic to set max amount
//                         }}
//                       >
//                         Max
//                       </button>
//                     </div>
//                     <p className="text-white">
//                       ≈ ${Number(walletBalance).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//                 <button className="bg-light-gray hover:bg-white transition duration-300 text-black w-full h-10">
//                   {Number(walletBalance) === 0
//                     ? "Insufficient Balance"
//                     : "Approve"}
//                 </button>
//               </div>
//             )}
//             {currentTab === "withdraw" && (
//               <div className="flex flex-col bg-white bg-opacity-5 w-full items-center justify-center p-6 gap-6">
//                 <div className="flex flex-row w-full items-center justify-center">
//                   <div className="flex flex-col items-start justify-center w-1/2 gap-2">
//                     <p className="text-white">From Staking</p>
//                     <div className="flex flex-row items-center justify-between gap-2 bg-black border-2 border-white p-2 w-[70%]">
//                       <div className="flex flex-row items-center justify-center gap-2">
//                         <Image
//                           src="/zaar-flip-tails.png"
//                           alt="Initia Logo Coin"
//                           width={20}
//                           height={20}
//                         />
//                         <p className="text-white">INIT</p>
//                       </div>
//                       <FaChevronDown />
//                     </div>
//                     <p className="text-white">
//                       You have {Number(stakedBalance).toFixed(2)} INIT staked
//                     </p>
//                   </div>

//                   <div className="flex flex-col items-start justify-center w-1/2 gap-2">
//                     <p className="text-white">Amount</p>
//                     <div className="flex flex-row items-center justify-between gap-2 bg-black border-2 border-white p-2">
//                       <input
//                         className="flex flex-row items-center justify-center gap-2 bg-black w-[70%] text-white focus:outline-none"
//                         placeholder="0.00"
//                       />
//                       <button
//                         className="text-black bg-white p-1 px-2 text-xs rounded-md hover:bg-gray-200 transition-colors"
//                         onClick={() => {
//                           // Add logic to set max amount
//                         }}
//                       >
//                         Max
//                       </button>
//                     </div>
//                     <p className="text-white">
//                       ≈ ${Number(stakedBalance).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col w-full gap-2">
//                   <div className="flex flex-row items-center justify-between w-full text-white text-sm">
//                     <span>Cooldown Period</span>
//                     <span>48 hours</span>
//                   </div>
//                   <div className="w-full bg-gray-700 h-2 rounded-full">
//                     <div
//                       className="bg-yellow h-full rounded-full"
//                       style={{ width: `${cooldownProgress}%` }}
//                     ></div>
//                   </div>
//                   <div className="flex flex-row items-center justify-between w-full text-white text-sm">
//                     <span>Time Remaining</span>
//                     <span>{timeRemaining}</span>
//                   </div>
//                 </div>
//                 <button
//                   className="bg-light-gray hover:bg-white transition duration-300 text-black w-full h-10"
//                   disabled={Number(stakedBalance) === 0}
//                 >
//                   {Number(stakedBalance) === 0
//                     ? "No Staked Balance"
//                     : "Withdraw"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// }

export default function Staking() {
  return <div>Staking Coming Soon...</div>;
}
