import Image from "next/image";
import { challenge, userChallenge } from "@/types/challenge";
import { Event, Profile } from "@prisma/client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getAccount } from "@wagmi/core";
import { config } from "./../../config";

export default function ChallengeBox({ challenge }: { challenge: challenge }) {
  const [progress, setProgress] = useState(-1);
  const [dailyWinners, setDailyWinners] = useState<number>(0);
  const stepsArray = Array.from(
    { length: challenge.steps },
    (_, index) => index + 1
  );

  const loadProgress = (events: Event[], challenge: challenge) => {
    if (!events) {
      return -1;
    }
    const challengeAccepted = events.some(
      (event) =>
        event.coins === 0 &&
        event.winnings === 0 &&
        event.wager === 0 &&
        event.outcome === false
    );

    if (!challengeAccepted) {
      return -1;
    }

    return challenge.checkProgress(events);
  };

  const address = getAccount(config).address;
  useEffect(() => {
    if (address) {
      fetch(`/api/getProfile?ownerAddress=${address}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data == null) {
            fetch(`/api/updateProfile?ownerAddress=${address}`);
          } else {
            console.log("Data object:");
            console.log(data);
            setProgress(loadProgress(data.events, challenge));
          }
        });
    }
  }, [address]);

  const fetchDailyWinners = async () => {
    try {
      const response = await fetch(`/api/getDailyWinners`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const winners = await response.json();
      setDailyWinners(winners.length);
    } catch (error) {
      console.error("Error fetching daily winners:", error);
    }
  };

  useEffect(() => {
    fetchDailyWinners();
  }, []);

  function acceptChallenge() {
    const addr = getAccount(config).address;
    if (!addr) {
      toast.error("Please connect your wallet first");
      return;
    } else {
      fetch(
        `/api/addEvent?ownerAddress=${addr}&coins=0&winnings=0&wager=0&outcome=false`
      );
      // We create an event for the user with all null values to represent that they have accepted the challenge
      // This should not affect statistics
      fetch(`/api/getProfile?ownerAddress=${address}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data == null) {
            fetch(`/api/updateProfile?ownerAddress=${address}`);
          } else {
            setProgress(0);
          }
        });
      toast.success("Challenge accepted!");

      return;
    }
  }
  function claimReward() {
    const addr = getAccount(config).address;
    fetchDailyWinners();
    if (dailyWinners >= 3) {
      toast.error("Sorry, there are already 3 winners for today.");
      return;
    }
    if (!addr) {
      toast.error("Please connect your wallet first");
      return;
    } else {
      fetch(
        `/api/addWinner?ownerAddress=${addr}&challengeId=${challenge.title}`
      );
      toast.success("Challenge completion recorded");
      return;
    }
  }
  return (
    <div className="w-full bg-dark-gray rounded-sm p-6 shadow-xl">
      <div className="flex items-center mb-4">
        <Image
          src="/zaar-flip-tails.png"
          alt={challenge.title}
          width={38}
          height={38}
          className="mr-4"
        />
        <h2 className="text-xl font-semibold text-light-green uppercase">
          {challenge.title}
        </h2>
      </div>
      <p className="text-light-gray mb-4 h-16">{challenge.description}</p>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-light-gray mb-1 uppercase">Reward:</p>
          <p className="text-lime-green font-semibold">{challenge.reward}</p>
        </div>
        <div className="text-light-green font-semibold">
          Winners: {dailyWinners}/3
        </div>
        {/* <span
          className={`px-3 md:px-[30px] py-1 rounded-sm text-sm uppercase font-medium ${
            challenge.difficulty === "Medium"
              ? "bg-yellow text-black"
              : challenge.difficulty === "Hard"
                ? "bg-purple text-black"
                : "bg-red text-black"
          }`}
        >
          {challenge.difficulty}
        </span> */}
      </div>
      {progress == -1 ? (
        <button
          onClick={() => {
            acceptChallenge();
          }}
          className="w-full bg-yellow text-black px-4 py-2 rounded-sm font-bold hover:bg-gray-900 hover:text-black transition-colors duration-300 uppercase tracking-wide"
        >
          Accept Challenge
        </button>
      ) : progress == challenge.steps ? (
        <button
          onClick={() => {
            claimReward();
          }}
          className="w-full bg-lime-green text-black px-4 py-2 rounded-sm font-bold hover:bg-gray-900 hover:text-black transition-colors duration-300 uppercase tracking-wide"
        >
          Claim Reward
        </button>
      ) : (
        <div className="w-full text-light-gray py-2 rounded-sm font-bold uppercase tracking-wide flex flex-col md:flex-row justify-between">
          <p className="mr-4">
            {progress}/{challenge.steps} Steps Completed
          </p>
          <div className="flex flex-row">
            {stepsArray.map((step) => (
              <div
                key={step}
                className={`mr-4 w-6 h-6 bg-gray rounded-full flex flex-shrink ${step <= progress ? "bg-lime-green" : "bg-dark-gray"}`}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
