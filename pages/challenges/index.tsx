// import Head from "next/head";
// import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
// import { StarField } from "@/components/star-field";
// import { Header } from "@/components/header";
// import Link from "next/link";
// import React from "react";
// import { useAccount, useDisconnect, useBalance } from "wagmi";
// import { FaChevronDown, FaChevronUp, FaBook } from "react-icons/fa";
// import useXP from "@/hooks/xpcalcs";
// import { config } from "./../../config";
// import { FaEthereum } from "react-icons/fa";
// import { encode } from "base64-arraybuffer";
// import { EventBox } from "@/components/profileComponents/event-box";
// import { Metadata } from "next";
// import ChallengeBox from "@/components/challengeComponents/challengeBox";
// import ClaimRewardsBox from "@/components/challengeComponents/claimRewardsBox";
// import { challenge, userChallenge } from "@/types/challenge";
// import toast, { Toaster } from "react-hot-toast";
// import { getAccount } from "@wagmi/core";
// import { Event } from "@prisma/client";
// import { checkProgressFunctions } from "../../components/challengeComponents/checkProgressFunctions";
// import { dailyChallenges } from "@/components/challengeComponents/dailyChallenges";

// export const metadata: Metadata = {
//   title: "Challenges",
// };

// const calculateTimeRemaining = () => {
//   const now = new Date();
//   const midnight = new Date(now);
//   midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day

//   const difference = Number(midnight) - Number(now);

//   const hours = Math.floor(
//     (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//   return { hours, minutes, seconds };
// };

// export default function Challenges() {
//   const [timeRemaining, setTimeRemaining] = useState<{
//     hours: number;
//     minutes: number;
//     seconds: number;
//   } | null>(null);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeRemaining(calculateTimeRemaining());
//     }, 1000);

//     // Clean up interval on component unmount
//     return () => clearInterval(timer);
//   }, []);

//   const today = new Date();
//   const dayOfMonth = today.getDate();
//   // const todaysChallenge = dailyChallenges[dayOfMonth % dailyChallenges.length];
//   const todaysChallenge = dailyChallenges[2];

//   return (
//     <div className="relative w-screen h-screen overflow-auto no-scrollbar">
//       <Toaster />
//       <Header />
//       <StarField />
//       <div className="absolute inset-0 flex flex-col items-center overflow-auto">
//         <div className="container mx-auto mt-32 pt-0 w-full max-w-screen-xl flex flex-col items-center">
//           <main className="flex flex-col items-center relative w-[50%]">
//             <div className="w-full max-w-5xl mb-12">
//               <h1 className="text-3xl font-bold text-light-green mb-4">
//                 Daily Challenges
//               </h1>
//               <div className="flex items-center">
//                 <svg
//                   className="w-6 h-6 text-yellow mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <p className="text-gray text-lg">
//                   New challenges in:{" "}
//                   {timeRemaining ? (
//                     <span className="text-light-green font-semibold">
//                       {timeRemaining.hours.toString().padStart(2, "0") +
//                         ":" +
//                         timeRemaining.minutes.toString().padStart(2, "0") +
//                         ":" +
//                         timeRemaining.seconds.toString().padStart(2, "0")}
//                     </span>
//                   ) : (
//                     <span className="text-light-green font-semibold">
//                       Loading...
//                     </span>
//                   )}
//                 </p>
//               </div>
//             </div>

//             <div className="w-full">
//               {todaysChallenge && <ChallengeBox challenge={todaysChallenge} />}
//             </div>
//             <div className="w-full mt-[50px]">
//               <ClaimRewardsBox />
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Challenges() {
  return <div>Challenges Coming Soon...</div>;
}
