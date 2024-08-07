import Image from "next/image";
import { challenge, userChallenge } from "@/types/challenge";
import { Event, Profile } from "@prisma/client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { config } from "./../../config";
import { Tooltip } from "../tooltip";
import { useAccount } from "wagmi";

export default function ChallengeBox({ challenge }: { challenge: challenge }) {
  const { address, isConnected } = useAccount();
  const [progress, setProgress] = useState(0);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [dailyWinners, setDailyWinners] = useState<number>(0);
  const stepsArray = Array.from(
    { length: challenge.steps },
    (_, index) => index + 1
  );

  const loadProgress = (events: Event[], challenge: challenge) => {
    if (!Array.isArray(events) || events.length == 0) {
      return 0;
    }
    // ******** Legacy "Accept Challenge" functionality *********

    // const challengeAccepted = events.some(
    //   (event) =>
    //     event.coins === 0 &&
    //     event.winnings === 0 &&
    //     event.wager === 0 &&
    //     event.outcome === false
    // );

    // if (!challengeAccepted) {
    //   return -1;
    // }

    return challenge.checkProgress(events);
  };

  const checkRewardClaimed = (challengeWins: any[]) => {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );
    if (!challengeWins) {
      return false;
    }
    return challengeWins.some((win) => {
      const winDate = new Date(win.createdAt);
      return winDate >= startOfDay && winDate <= endOfDay;
    });
  };

  useEffect(() => {
    if (isConnected && address) {
      fetch(`/api/getProfile?ownerAddress=${address}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data == null) {
            fetch(`/api/updateProfile?ownerAddress=${address}`);
          } else {
            // find challengeWin for today
            setProgress(loadProgress(data.events, challenge));
            setRewardClaimed(checkRewardClaimed(data.challengeWins));
          }
        });
    }
  }, [address, isConnected, challenge]);

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
  }, [rewardClaimed, address, isConnected]);

  // Legacy Accept Challenge functinoality

  // async function acceptChallenge() {
  //   if (!isConnected || !address) {
  //     toast.error("Please connect your wallet first");
  //     return;
  //   } else {
  //     try {
  //       const response = await fetch(
  //         `/api/addEvent?ownerAddress=${address}&coins=0&winnings=0&wager=0&outcome=false`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to accept challenge");
  //       }

  //       const profileResponse = await fetch(
  //         `/api/getProfile?ownerAddress=${address}`
  //       );
  //       const data = await profileResponse.json();
  //       if (data === null) {
  //         await fetch(`/api/updateProfile?ownerAddress=${address}`);
  //       } else {
  //         setProgress(0);
  //       }
  //       toast.success("Challenge accepted!");
  //     } catch (error) {
  //       console.error("Error accepting challenge:", error);
  //       toast.error("An error occurred while accepting the challenge.");
  //     }
  //     return;
  //   }
  // }

  async function claimReward() {
    await fetchDailyWinners();
    if (dailyWinners >= 3) {
      toast.error("Sorry, there are already 3 winners for today.");
      return;
    }
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    } else {
      try {
        const response = await fetch(
          `/api/addWinner?ownerAddress=${address}&challengeId=${challenge.title}&steps=${challenge.steps}`
        );
        if (response.ok) {
          const result = await response.json();
          if (result) {
            setRewardClaimed(true);
            toast.success("Challenge completion recorded");
          } else {
            toast.error("Failed to record challenge completion");
          }
        } else {
          toast.error("Failed to record challenge completion");
        }
      } catch (error) {
        console.error("Error claiming reward:", error);
        toast.error("An error occured while claiming the reward.");
      }
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
          Daily Winners:{" "}
          <span className={`${dailyWinners >= 3 ? "text-red" : ""}`}>
            {dailyWinners}/3
          </span>
          <Tooltip text='The first three users to complete the daily challenge and click "Claim Reward" will receive the prize!' />
        </div>
      </div>
      {progress == -2 ? (
        <div className="w-full text-light-gray py-2 rounded-sm font-bold text-center">
          Loading...
        </div>
      ) : rewardClaimed ? (
        <div className="w-full text-light-gray py-2 rounded-sm font-bold text-center">
          Congratulations! You have claimed your reward!
        </div>
      ) : dailyWinners >= 3 ? (
        <div className="w-full text-light-gray py-2 rounded-sm font-bold text-center">
          All prizes for today&apos;s challenge have been claimed.
        </div>
      ) : // ************ Legacy Accept Challenge functionality **************
      // : progress == -1 ? (
      //   <button
      //     onClick={() => {
      //       acceptChallenge();
      //     }}
      //     className="w-full bg-yellow text-black px-4 py-2 rounded-sm font-bold hover:bg-gray-900 hover:text-black transition-colors duration-300 uppercase tracking-wide"
      //   >
      //     Accept Challenge
      //   </button>
      // )
      progress == challenge.steps ? (
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
