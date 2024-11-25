import { config } from "@/config";
import { useSimulateInitiaTokenApprove } from "@/generated";
import toast, { Toaster } from "react-hot-toast";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { parseEther } from "viem";
import { plinkoAddress } from "@/generated";

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  allowance: number;
  wager: number;
}

const ApproveModal: React.FC<ApproveModalProps> = ({
  isOpen,
  onClose,
  allowance,
  wager,
}) => {
  const [approveAmount, setApproveAmount] = useState<bigint>(
    BigInt(wager ? wager : 0)
  );

  useEffect(() => {
    setApproveAmount(BigInt(wager ? wager : 0));
    console.log("Allowance Modal: ", allowance);
    console.log("Wager: ", wager);
  }, [wager, allowance, isOpen]);

  const { data: approve }: { data: any } = useSimulateInitiaTokenApprove({
    args: [plinkoAddress, parseEther(approveAmount.toString())],
  });

  async function approver() {
    const toastId = toast.loading("Waiting on confirmation from your wallet.");
    try {
      console.log("Approve: ", approve);
      let myhash = await writeContract(config, approve!.request);
      toast.dismiss(toastId);
      toast.loading("Transaction Processing.");
      let receipt = await waitForTransactionReceipt(config, { hash: myhash });
      console.log("Receipt: ", receipt);
      toast.dismiss();
    } catch (error) {
      console.log(error);
      toast.dismiss();
    }
    return;
  }

  const handleApproveClick = async () => {
    if (approve) {
      console.log(approveAmount);
      await approver();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-dark-gray rounded-lg p-6 w-full max-w-[525px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="mt-4">
          <p className="text-white font-bold text-lg">
            Please approve more funds.
          </p>
        </div>
        <br />
        <div>
          Allowance needed: <span className="text-lime-green">{wager}</span>
        </div>
        <div>
          Current allowance: <span className="text-red">{allowance}</span>
        </div>
        {/* <div
          Funds needing approval:{" "}
          <span className="text-red">{wager - allowance}</span>
        </div> */}

        {/* Input field for approveAmount */}
        <div className="mt-4">
          <label
            htmlFor="approveAmount"
            className="block mb-2 text-sm font-medium"
          >
            Set Allowance:
          </label>
          <div className="flex items-center">
            <Image
              src="/zaar-flip-heads.png"
              alt="Coin"
              width={15}
              height={15}
              className="mr-4 h-[30px] w-[30px]"
            />
            <input
              type="number"
              id="approveAmount"
              value={
                approveAmount === BigInt(0) ? "" : approveAmount.toString()
              }
              onChange={(e) => setApproveAmount(BigInt(e.target.value))}
              className={`w-full rounded-md bg-gray rounded-sm p-2 pl-4 h-10 flex items-center text-lg ${approveAmount >= wager ? "text-lime-green" : "text-red"}`}
              min="0"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleApproveClick}
            className="mt-4 gradient-button text-black px-4 py-2 rounded"
            disabled={!approveAmount || approveAmount <= 0}
          >
            Approve Funds
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;
