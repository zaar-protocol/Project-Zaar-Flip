import Image from "next/image";
import { challenge, userChallenge } from "@/types/challenge";
import React, { useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import { getAccount } from "@wagmi/core";
import { config } from "./../../config";

export default function ChallengeBox({ challenge }: { challenge: challenge }) {
  const [progress, setProgress] = useState(-1);
  const stepsArray = Array.from({ length: challenge.steps}, (_, index) => index + 1);
  const address = getAccount(config).address;
  useEffect(() => {
    if (address) {
      fetch(`/api/getProfile?ownerAddress=${address}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        if(data==null){
            fetch(`/api/updateProfile?ownerAddress=${address}&challengeId=${challenge.id}&challengeProgress=-1`);
          }
        else{
          setProgress(data.challengeProgress);
        }

        });
    }
  }, [address]);
  function acceptChallenge() {
    const addr = getAccount(config).address;
    if (!addr){
      toast.error("Please connect your wallet first");
      return;
    }
    else{
      fetch(`/api/updateChallengeProgress?ownerAddress=${addr}&challengeId=${challenge.id}&challengeProgress==0`);
      toast.success("Challenge accepted!");
      setProgress(0);
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
        <span
          className={`px-3 md:px-[30px] py-1 rounded-sm text-sm uppercase font-medium ${
            challenge.difficulty === "Medium"
              ? "bg-yellow text-black"
              : challenge.difficulty === "Hard"
                ? "bg-purple text-black"
                : "bg-red text-black"
          }`}
        >
          {challenge.difficulty}
        </span>
      </div>
      {progress==-1 ?
      <button onClick={()=>{acceptChallenge();}} className="w-full bg-yellow text-black px-4 py-2 rounded-sm font-bold hover:bg-gray-900 hover:text-black transition-colors duration-300 uppercase tracking-wide">
        Accept Challenge
      </button>
      : 
      progress==challenge.steps ?
      <button className="w-full bg-lime-green text-black px-4 py-2 rounded-sm font-bold hover:bg-gray-900 hover:text-black transition-colors duration-300 uppercase tracking-wide">
        Claim Reward
      </button>
      :
      <div className="w-full text-light-gray py-2 rounded-sm font-bold uppercase tracking-wide flex flex-col md:flex-row justify-between">
        <p className="mr-4">{progress}/{challenge.steps} Steps Completed</p>
        <div className="flex flex-row">
        {stepsArray.map((step) => (
          <div key={step} className={`mr-4 w-6 h-6 bg-gray rounded-full flex flex-shrink ${step <= progress ? "bg-lime-green" : "bg-dark-gray"}`}></div>
        ))}
        </div>
      </div>}
    </div>
  );
}
