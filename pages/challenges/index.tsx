import Head from "next/head";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { StarField } from "@/components/star-field";
import { Header } from "@/components/header";
import Link from "next/link";
import React from "react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { FaChevronDown, FaChevronUp, FaBook } from "react-icons/fa";
import useXP from "@/hooks/xpcalcs";
import { config } from "./../../config";
import { FaEthereum } from "react-icons/fa";
import { encode } from "base64-arraybuffer";
import { EventBox } from "@/components/profileComponents/event-box";
import { Metadata } from "next";
import ChallengeBox from "@/components/challengeComponents/challengeBox";
import { challenge, userChallenge } from "@/types/challenge";
import toast, {Toaster} from "react-hot-toast";
import { getAccount } from "@wagmi/core";

export const metadata: Metadata = {
  title: "Challenges",
};

const calculateTimeRemaining = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day

  const difference = Number(midnight) - Number(now);

  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};


export default function Profile() {
  const [dailyChallenges, setDailyChallenges] = useState<challenge[]>([
    {
      id: 1,
      title: "Seed to Whale",
      description: "Achieve 2,000x account growth starting from a minimum $1 bet",
      reward: "$1,000 in stablecoins",
      difficulty: "Hard",
      steps: 1,
    },
    {
      id: 2,
      title: "Lucky 7",
      description: "Win 7 consecutive coin flips with a minimum $1 bet each flip",
      reward: "$500 in stablecoins",
      difficulty: "Hard",
      steps: 7,
    },
    {
      id: 3,
      title: "Whale’s Paradise",
      description: "Win 5 consecutive coin flips with a minimum $1,000 bet each",
      reward: "$5,000 in stablecoins",
      difficulty: "Expert",
      steps: 5,
    },
    {
      id: 4,
      title: "Make It All Back In One Trade",
      description: "Recover from a 90% account loss to double your initial balance, minimum $500 within 24 hours",
      reward: "$1,000 in stablecoins",
      difficulty: "Medium",
      steps: 5,
    },
    {
      id: 5,
      title: "Speed Demon",
      description: "Complete 1,000 coin flips within 1 hour (minimum $100 bet each)",
      reward: " $1,000 in stablecoins",
      difficulty: "Expert",
      steps: 5,
    },
    {
      id: 6,
      title: "Noob City",
      description: "Complete 500 coin flips within 1 hour (minimum $50 bet each)",
      reward: "$500 in stablecoins",
      difficulty: "Easy",
      steps: 5,
    },
  ]);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const today = new Date();
  const dayOfMonth = today.getDate();
  const todaysChallenge = dailyChallenges[dayOfMonth % dailyChallenges.length];

  return (
    <div className="pl-4 h-screen w-full max-w-screen max-h-screen overflow-y-hidden overflow-x-hidden z-20 no-scrollbar">
      <Toaster/>
      <Header />
      <StarField />
      <div className=" container container-fluid mt-[60px] container-fluid mx-auto py-6 pt-0 w-[50%] min-w-[350px] ">
        <div className="bg-transparent text-white h-screen max-h-full w-full">
          <div className="container mx-auto p-4 w-full">
            <main className="flex-grow flex flex-col items-center relative w-full  overflow-hidden">
              <div className="w-full max-w-5xl mb-12">
                <h1 className="text-3xl font-bold text-light-green mb-4">
                  Daily Challenges
                </h1>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-yellow mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray text-lg">
                    New challenges in:{" "}
                    <span className="text-light-green font-semibold">
                      {timeRemaining.hours.toString() +":"+ timeRemaining.minutes.toString() +":"+ timeRemaining.seconds.toString()}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full ">
                {todaysChallenge && (
                  <ChallengeBox challenge={todaysChallenge} />
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
