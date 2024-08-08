import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ChallengeWinner } from "@prisma/client";

export default function ClaimRewardsBox() {
  const { address, isConnected } = useAccount();
  const [challengeWins, setChallengeWins] = useState<ChallengeWinner[] | null>(
    null
  );

  useEffect(() => {
    if (isConnected && address) {
      fetch(`/api/getProfile?ownerAddress=${address}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data == null) {
            fetch(`/api/updateProfile?ownerAddress=${address}`);
          } else {
            // Get challenges won
            console.log(data);
            setChallengeWins(data.challengeWins);
          }
        });
    }
  }, [address, isConnected]);

  const claimReward = async (challengeWin: ChallengeWinner) => {
    try {
      await fetch(`/api/claimReward?id=${challengeWin.id}`);
    } catch (error) {
      console.error("Failed to claim reward: ", error);
    }
    console.log("Reward has been claimed for ", challengeWin);
  };

  return (
    <div className="w-full bg-dark-gray rounded-sm p-6 shadow-xl">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-xl font-semibold text-light-green uppercase">
          Claim Rewards!
        </h2>
      </div>
      {challengeWins && (
        <div>
          {challengeWins.map((challengeWin) => (
            <div
              key={challengeWin.createdAt.toString()}
              className="w-full py-5 flex flex-col justify-center"
            >
              <div className="w-full flex justify-between">
                <div>
                  {new Date(challengeWin.createdAt).toLocaleDateString()}
                </div>
                <div>{challengeWin.challengeId}</div>
              </div>
              <div className="w-full flex justify-between">
                <div></div>
                <button
                  onClick={() => claimReward(challengeWin)}
                  className="gradient-button text-black px-6 py-2  hover:-translate-y-1 transition duration-700 ease-in-out rounded-sm font-bold mt-3 mx-auto block text-sm uppercase transition duration-700 ease-in-out"
                >
                  Claim Reward
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
