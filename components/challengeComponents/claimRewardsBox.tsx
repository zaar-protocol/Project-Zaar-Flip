import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ChallengeWinner } from "@prisma/client";
import toast from "react-hot-toast";
import { dailyChallenges } from "./dailyChallenges";
import { ChallengeKey } from "./checkProgressFunctions";

export default function ClaimRewardsBox() {
  const { address, isConnected } = useAccount();
  const [challengeWins, setChallengeWins] = useState<
    (ChallengeWinner & { timeRemaining: number; claiming: boolean })[] | null
  >(null);

  useEffect(() => {
    if (isConnected && address) {
      fetch(`/api/getProfile?ownerAddress=${address}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data == null) {
            fetch(`/api/updateProfile?ownerAddress=${address}`);
          } else {
            const sortedWins = data.challengeWins.sort(
              (a: ChallengeWinner, b: ChallengeWinner) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

            const winsWithTimeRemaining = sortedWins.map(
              (challengeWin: ChallengeWinner) => {
                const timeDifference =
                  new Date().getTime() -
                  new Date(challengeWin.createdAt).getTime();
                const timeRemaining = Math.max(
                  24 * 60 * 60 * 1000 - timeDifference,
                  0
                );
                return { ...challengeWin, timeRemaining, claiming: false };
              }
            );

            setChallengeWins(winsWithTimeRemaining);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch profile:", error);
        });
    }
  }, [address, isConnected]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (challengeWins) {
        setChallengeWins(
          (prevWins) =>
            prevWins?.map((win) => {
              const newTimeRemaining = Math.max(win.timeRemaining - 1000, 0);
              return { ...win, timeRemaining: newTimeRemaining };
            }) ?? null
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [challengeWins]);

  const claimReward = async (challengeWin: ChallengeWinner) => {
    setChallengeWins(
      (prevWins) =>
        prevWins?.map((win) =>
          win.id === challengeWin.id ? { ...win, claiming: true } : win
        ) ?? null
    );

    try {
      const response = await fetch(`/api/claimReward?id=${challengeWin.id}`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to claim reward");
      }

      const updatedWin = await response.json();

      setChallengeWins(
        (prevWins) =>
          prevWins?.filter((win) => win.id !== updatedWin.id) ?? null
      );

      toast.success("Reward Claimed! Expect your prize via Airdrop.", {
        duration: 5000,
      });
    } catch (error) {
      console.error("Failed to claim reward: ", error);
      setChallengeWins(
        (prevWins) =>
          prevWins?.map((win) =>
            win.id === challengeWin.id ? { ...win, claiming: false } : win
          ) ?? null
      );
      toast.error("Failed to claim reward. Please try again.");
    }
  };

  const formatTimeRemaining = (timeRemaining: number) => {
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}H ${formattedMinutes}M ${formattedSeconds}S `;
  };

  const hasRewardsToClaim = challengeWins?.some((win) => !win.rewardClaimed);

  // Render nothing if there are no rewards to claim
  if (!hasRewardsToClaim) {
    return null;
  }

  return (
    <div className="w-full bg-dark-gray rounded-sm p-6 shadow-xl mb-20">
      <div className="flex justify-center items-center">
        <h2 className="text-xl font-semibold text-light-green uppercase">
          Claim Rewards!
        </h2>
      </div>
      {challengeWins && (
        <div>
          {challengeWins
            .filter((challengeWin) => !challengeWin.rewardClaimed)
            .map((challengeWin) => (
              <div
                key={challengeWin.id}
                className="w-full py-5 flex flex-col justify-center gap-3 mb-5"
              >
                <div className="w-full flex justify-between">
                  <div>
                    {new Date(challengeWin.createdAt).toLocaleDateString()}
                  </div>
                  <div>{challengeWin.challengeId}</div>
                </div>
                <div className={`w-full flex justify-center items-center`}>
                  {
                    <button
                      onClick={() => claimReward(challengeWin)}
                      disabled={
                        challengeWin.timeRemaining > 0 || challengeWin.claiming
                      }
                      className={`gradient-button text-black px-6 py-2 ${
                        challengeWin.timeRemaining > 0 || challengeWin.claiming
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:-translate-y-1"
                      } flex justify-center gap-3 transition duration-700 ease-in-out rounded-sm font-bold block text-sm uppercase w-[90%]`}
                    >
                      <div className="min-w-[100px] text-center">
                        {challengeWin.claiming
                          ? "Claiming reward..."
                          : challengeWin.timeRemaining > 0
                            ? formatTimeRemaining(challengeWin.timeRemaining)
                            : "Claim Reward"}
                      </div>
                      <div>
                        {`(${
                          dailyChallenges.find(
                            (challenge) =>
                              challenge.title === challengeWin.challengeId
                          )?.reward || "No reward"
                        })`}
                      </div>
                    </button>
                  }
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
