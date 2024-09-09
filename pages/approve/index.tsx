import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import toast, { Toaster } from "react-hot-toast";
import {
  useSimulateZaarflipFlip,
  useSimulateZaarflipAddAcceptedToken,
  useSimulateInitiaTokenApprove,
} from "@/generated";
import { writeContract } from "@wagmi/core";
import { config } from "@/config";
import { abi } from "@/abis/abi";
import { Header } from "@/components/header";
import { zaarflipAddress } from "@/generated";

const Test: React.FC = () => {
  //   const tokenAddress = "0xd5dedc655a3000df6318151940b3311f7a4cc931";

  const approveAmount = BigInt(2);

  const { data: approve }: { data: any } = useSimulateInitiaTokenApprove({
    args: [zaarflipAddress, approveAmount],
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

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center space-y-10">
        <button
          onClick={() => {
            approver();
          }}
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default Test;
