import { useState } from "react";
import { parseEther } from "viem";
import toast, { Toaster } from "react-hot-toast";
import { Header } from "@/components/header";
import { StarField } from "@/components/star-field";
import { initiaTokenAddress, initiaTokenAbi } from "@/generated";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { getContract } from "viem";
import { publicClient } from "@/client";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { initia } from "@/config";

const Faucet = () => {
  const [address, setAddress] = useState("");

  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const checkRecentTransfer = async (address: string) => {
    const contract = getContract({
      address: initiaTokenAddress,
      abi: initiaTokenAbi,
      client: publicClient,
    });

    const events = await contract.getEvents.Transfer({
      from: process.env.NEXT_PUBLIC_FAUCET_ADDRESS as `0x${string}`,
      to: address as `0x${string}`,
    });

    if (events.length === 0) return true;

    const latestEvent = events[events.length - 1];
    const block = await publicClient.getBlock({
      blockNumber: latestEvent.blockNumber,
    });
    const hoursSinceLastTransfer =
      (Date.now() / 1000 - Number(block.timestamp)) / 3600;

    return hoursSinceLastTransfer >= 24;
  };

  const dispenseFunds = async () => {
    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast.error("Invalid Ethereum address");
      return;
    }

    try {
      const response = await fetch(`/api/dispenseFunds?address=${address}`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to dispense funds");
        return;
      }

      toast.success("Funds dispensed! Transaction: " + data.hash);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to dispense funds"
      );
    }
  };

  const loading = isPending || isConfirming;

  return (
    <div className="relative w-screen h-screen no-scrollbar">
      <Toaster />
      <Header />
      <StarField />

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md p-6 space-y-4">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Initia Faucet
          </h1>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address"
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"
            disabled={loading}
          />
          <button
            onClick={dispenseFunds}
            disabled={loading}
            className="text-black flex flex-row items-center justify-center space-x-2 px-4 py-2 text-sm rounded-sm font-bold uppercase gradient-button transition duration-500 w-full"
          >
            {loading ? "Dispensing..." : "Get 100 INIT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faucet;
