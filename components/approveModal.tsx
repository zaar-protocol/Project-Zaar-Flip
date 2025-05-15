import { config } from "@/config";
import { useSimulateInitiaTokenApprove } from "@/generated";
import toast, { Toaster } from "react-hot-toast";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { erc20Abi, parseEther } from "viem";
import { zaarflipAddress } from "@/generated";
import { useAccount, useBalance } from "wagmi";
import { useAddress, useWallet } from "@initia/react-wallet-widget/ssr";
import { useBalanceContext } from "@/contexts/BalanceContext";

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  allowance: number;
  wager: number;
  refetchFlip: () => void;
}

const ApproveModal: React.FC<ApproveModalProps> = ({
  isOpen,
  onClose,
  allowance,
  wager,
  refetchFlip,
}) => {
  const [approveAmount, setApproveAmount] = useState<bigint>(
    BigInt(wager ? wager : 0)
  );
  const { address: wagmiAddress } = useAccount();
  const { requestEthereumTx } = useWallet();
  const initiaAddress = useAddress();

  const { balance } = useBalanceContext();

  const presetAmounts = [10, 50, 100, 1000, 10000, 100000] as const;
  type PresetAmount = (typeof presetAmounts)[number];

  useEffect(() => {
    setApproveAmount(BigInt(wager ? wager : 0));
  }, [wager, allowance, isOpen]);

  const { data: approve }: { data: any } = useSimulateInitiaTokenApprove({
    args: [zaarflipAddress, parseEther(approveAmount.toString())],
  });

  async function approver() {
    const toastId = toast.loading("Waiting on confirmation from your wallet.");

    try {
      let myhash = await writeContract(config, approve!.request);
      toast.dismiss(toastId);
      toast.loading("Transaction Processing.");
      let receipt = await waitForTransactionReceipt(config, { hash: myhash });
      await refetchFlip();
      toast.dismiss();
    } catch (error) {
      console.log(error);
      toast.dismiss();
    }
  }

  const handleApproveClick = async () => {
    if (approve || initiaAddress?.startsWith("init")) {
      if (approveAmount > balance) {
        toast.error("Insufficient balance.");
        return;
      }
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

        {/* Input field for approveAmount */}
        <div className="mt-4">
          <label
            htmlFor="approveAmount"
            className="block mb-2 text-sm font-medium"
          >
            Set Allowance:
          </label>
          <div className="mt-4 mb-6 grid grid-cols-3 gap-3">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setApproveAmount(BigInt(amount))}
                className={`
                  bg-gray-800 hover:bg-gray-700 
                  font-medium py-2 px-4 rounded-md 
                  transition-colors duration-200 
                  text-gray-300 hover:text-white
                  border border-gray-700 hover:border-gray-600
                `}
              >
                {`${amount} INIT`}
              </button>
            ))}
          </div>
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