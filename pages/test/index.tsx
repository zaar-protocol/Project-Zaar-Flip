/*
This file displays the migration component. 
It allows users to migrate their PRTC tokens to Zaar tokens.
*/
"use client";

import Image from "next/image";
import Link from "next/link";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import toast, { Toaster } from "react-hot-toast";
import { formatEther } from "viem";
import React, { useEffect, useState } from "react";
import { useSimulateZaarflipFlip, useSimulateZaarflipAddAcceptedToken, useSimulateInitiaTokenApprove } from "@/generated";
import { writeContract } from '@wagmi/core'
import { useWriteZaarflipFlip } from "@/generated";
import { config } from "@/config";
import { abi } from "@/abis/abi";
import { Header } from "@/components/header";
import { parse } from "path";
import { ethers } from "ethers"; // Add this line

const Test: React.FC = () => {
  const contractAddress = "0x19b95Ef8a6B4C4CcbdEaa76Fe03eB86C89b6AB6C";
  const tokenAddress = "0xd5dedc655a3000df6318151940b3311f7a4cc931";
  const approveAmount = parseEther("5");

  const { data: approve }: {data: any} = useSimulateInitiaTokenApprove({
    args: [contractAddress, approveAmount],
  });

  const {data: flip }: {data: any} = useSimulateZaarflipFlip({
    args: [BigInt(50), BigInt(1), BigInt(1), tokenAddress],
  });

  const {data: addToken }: {data: any} = useSimulateZaarflipAddAcceptedToken({
    args: [tokenAddress],
  });


  /*const mint = async () => {
    try{
    const signer = new ethers.providers.useWeb3Provider(window.ethereum).getSigner
     const contract = new ethers.Contract(cttAddress, cttABI, signer)
     const tx = await contract.mint(address, amount)
     tx.wait()
     const hash = tx.hash
     return hash
    }catch(error){
     return error.message
    }
    }*/
    async function approver() {
      const toastId = toast.loading("Waiting on confirmation from your wallet.");
      try{
        console.log(approve);
        let myhash = await writeContract(config, approve!.request);
        toast.dismiss(toastId);
        toast.loading("Transaction Processing");
        let receipt = await waitForTransactionReceipt(config, { hash: myhash });
        toast.dismiss();
        }
      catch (error){
        console.log(error);
        toast.dismiss();
        }
      return;
    }

  async function flipper() { 
    try {
      //console.log("flipping");
      //console.log(flip);
      let myhash = await writeContract(config, flip!.request);
      let receipt = await waitForTransactionReceipt(config, { hash: myhash });
      console.log("Receipt: ", receipt);
    } catch (error) {
      console.error("Error executing write:", error);
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center space-y-10">
        <button onClick={()=>{flipper();}}>Flip</button>
        <button onClick={()=>{addToken();}}>Add Token</button>
        <button onClick={()=>{approver();}}>Approve</button>
      </div>
    </div>
  );
};

export default Test;
