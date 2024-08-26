/*
This file displays the migration component. 
It allows users to migrate their PRTC tokens to Zaar tokens.
*/
import Image from "next/image";
import Link from "next/link";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import toast, { Toaster } from "react-hot-toast";
import { formatEther } from "viem";
import React, { useEffect, useState } from "react";
import {
  useSimulateZaarflipFlip,
  useSimulateZaarflipAddAcceptedToken,
} from "@/generated";
import { writeContract } from "@wagmi/core";
import { useWriteZaarflipFlip } from "@/generated";
import { config } from "@/config";
import { abi } from "@/abis/abi";
import { Header } from "@/components/header";

const Test: React.FC = () => {
  const contractAddress = "0xE161Ff5fDC157fb69B1c6459c9aac7E6CcCdbfCA";
  const tokenAddress = "0xd5dedc655a3000df6318151940b3311f7a4cc931";

  const { data: flip }: { data: any } = useSimulateZaarflipFlip({
    args: [parseEther("1"), BigInt(1), BigInt(1), tokenAddress],
  });

  const { data: addToken }: { data: any } = useSimulateZaarflipAddAcceptedToken(
    {
      args: [tokenAddress],
    }
  );

  async function flipper() {
    try {
      console.log(flip!.request);
      let myhash = await writeContract(config, flip!.request);
      let receipt = await waitForTransactionReceipt(config, { hash: myhash });
      console.log("Receipt: ", receipt);
    } catch (error) {
      console.error("Error executing write:", error);
    }
  }

  async function addTokener() {
    try {
      console.log(addToken!.request);
      let myhash = await writeContract(config, addToken!.request);
      let receipt = await waitForTransactionReceipt(config, { hash: myhash });
      console.log("Receipt: ", receipt);
    } catch (error) {
      console.error("Error executing write:", error);
    }
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center space-y-10">
        <button
          onClick={() => {
            flipper();
          }}
        >
          Flip
        </button>
        <button
          onClick={() => {
            addTokener();
          }}
        >
          Add Token
        </button>
      </div>
    </div>
  );
};

export default Test;
