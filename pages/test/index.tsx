import React, { useEffect, useState } from "react";
import { useSimulateZaarflipFlip } from "@/generated";
import { useWriteZaarflipFlip } from "@/generated";
import { config } from "@/config";
import { abi } from "@/abis/abi";

const Test: React.FC = () => {
  const contractAddress = "0xE161Ff5fDC157fb69B1c6459c9aac7E6CcCdbfCA";
  const tokenAddress = "0xd5dedc655a3000df6318151940b3311f7a4cc931";

  const simulate = useSimulateZaarflipFlip({
    args: [BigInt(100), BigInt(8), BigInt(4), tokenAddress],
  });

  console.log("Simulate", simulate);

  //simulateContract seems to be hanging. isPending property is always true

  const write = useWriteZaarflipFlip();
  console.log("Write: ", write);

  // Missing or invalid parameter error. Also check failureReason property which has a details property which explains: 'reason: arithmetic underflow or overflow, revert: 0x4e487b710000000000000000000000000000000000000000000000000000000000000011: Reverted: EVMCall failed'

  useEffect(() => {
    const executeWrite = async () => {
      try {
        const txHash = await write.writeContract({
          address: contractAddress,
          args: [BigInt(100), BigInt(8), BigInt(4), tokenAddress],
        });
        console.log("Hash: ", txHash);
      } catch (error) {
        console.error("Error executing write:", error);
      }
    };

    executeWrite();
  }, [write.writeContract, simulate.isPending]);
  return <div>Test</div>;
};

export default Test;
