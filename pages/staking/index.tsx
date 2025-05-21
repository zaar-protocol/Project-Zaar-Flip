import Footer from "@/components/Footer";
import { Header } from "@/components/header";
import Link from "next/link";
import { FaArrowLeft, FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
//import {approveInitiaToken, initiaTokenAddress, } from  "@/generated";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useContractRead } from "wagmi";
//import { zaarStakingAbi } from '../../abis/abi';
import { formatEther, parseEther } from "viem";
import { stakingAddress } from "@/generated";
import { useStakingBalance } from "@/hooks/useStakingBalance";
import { toast, Toaster } from "react-hot-toast";
import LoadingModal from "@/components/loadingModal";
import {
  simulateContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { StakingAbi } from "@/abis/Staking-abi";
import { initiaTokenAddress } from "@/generated";
import { config } from "@/config";
import { useBalanceContext } from "@/contexts/BalanceContext";
export default function Staking() {
  const [currentTab, setCurrentTab] = useState("deposit");
  const { address } = useAccount();
  const { balance } = useBalanceContext();
  const {
    stakedBalance,
    totalOwed,
    unstakeRequests,
    poolPercentage,
    walletBalance,
    isLoading,
    allowance,
    approveStaking,
    requestStake,
    cancelStake,
    finalizeStake,
    requestUnstake,
    cancelUnstake,
    finalizeUnstake,
    isStaking,
    pendingPayouts,
    pendingStake,
    refetchPendingStake,
  } = useStakingBalance(
    address || "0x0000000000000000000000000000000000000000"
  );

  const [stakeDeadlinePassed, setStakeDeadlinePassed] = useState<boolean>(
    pendingStake[3] != BigInt(0) &&
      Number(pendingStake[3]) < Math.floor(Date.now() / 1000)
  );

  const [unstakeDeadlinePassed, setUnstakeDeadlinePassed] = useState<boolean>(
    unstakeRequests[3] != BigInt(0) &&
      Number(unstakeRequests[3]) < Math.floor(Date.now() / 1000)
  );

  const [stakeCooldown, setStakeCooldown] = useState<number>(
    60 - (Math.floor(Date.now() / 1000) - Number(pendingStake[1]))
  );

  const [unstakeCooldown, setUnstakeCooldown] = useState<number>(
    60 - (Math.floor(Date.now() / 1000) - Number(unstakeRequests[1]))
  );

  const [stakeTimeRemaining, setStakeTimeRemaining] = useState<number>(
    stakeDeadlinePassed
      ? 0
      : Number(pendingStake[3] - BigInt(Math.floor(Date.now() / 1000)))
  );

  const [unstakeTimeRemaining, setUnstakeTimeRemaining] = useState<number>(
    unstakeDeadlinePassed
      ? 0
      : Number(unstakeRequests[3] - BigInt(Math.floor(Date.now() / 1000)))
  );

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (pendingStake[3] !== BigInt(0)) {
        const newStakeDeadlinePassed =
          Number(pendingStake[3]) < Math.floor(Date.now() / 1000);
        setStakeDeadlinePassed(newStakeDeadlinePassed);
        const newStakeTime = newStakeDeadlinePassed
          ? 0
          : Number(pendingStake[3] - BigInt(Math.floor(Date.now() / 1000)));
        setStakeTimeRemaining(newStakeTime > 0 ? newStakeTime : 0);

        const newStakeCooldown =
          60 - (Math.floor(Date.now() / 1000) - Number(pendingStake[1]));
        setStakeCooldown(newStakeCooldown > 0 ? newStakeCooldown : 0);
      }

      if (unstakeRequests[3] !== BigInt(0)) {
        const newUnstakeDeadlinePassed =
          Number(unstakeRequests[3]) < Math.floor(Date.now() / 1000);
        setUnstakeDeadlinePassed(newUnstakeDeadlinePassed);
        const newUnstakeTime = newUnstakeDeadlinePassed
          ? 0
          : Number(unstakeRequests[3] - BigInt(Math.floor(Date.now() / 1000)));
        setUnstakeTimeRemaining(newUnstakeTime > 0 ? newUnstakeTime : 0);

        const newUnstakeCooldown =
          60 - (Math.floor(Date.now() / 1000) - Number(unstakeRequests[1]));
        setUnstakeCooldown(newUnstakeCooldown > 0 ? newUnstakeCooldown : 0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingStake, unstakeRequests]);

  useEffect(() => {
    console.log("balance", balance);
  }, [balance]);

  return (
    <div className="w-screen min-h-screen ">
      <Header />
      <Toaster />
      <LoadingModal isOpen={isStaking} onClose={() => {}} />
      {/* Updated background div */}
      <div
        style={{ backgroundImage: "url('/StakingHero.png')" }}
        className="fixed left-0 top-0 w-full h-full bg-cover opacity-50 lg:opacity-100 -z-10 "
      ></div>

      <div className="flex flex-col items-center justify-center min-h-screen gap-6 pb-10">
        {/*Back to home button*/}
        <Link
          href="/"
          className="hover:text-white text-gray px-4 py-2 flex flex-row items-center justify-center gap-2 transition-all duration-300"
        >
          <FaArrowLeft />
          Back to Home
        </Link>
        <div className="flex flex-row items-center justify-center gap-4">
          {/*Initia Logo Coin*/}
          <Image
            src="/zaar-flip-tails.png"
            alt="Initia Logo Coin"
            width={50}
            height={50}
            className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
          />
          <h1 className="text-4xl text-white uppercase">Be The House</h1>
        </div>
        <div className=" flex flex-col md:flex-row items-center justify-center gap-4 bg-black bg-opacity-50 p-6 gap-4">
          <div className="flex text-sm flex-col items-center md:items-start text-hoverGray justify-center gap-2">
            Your Shares
            <h1 className="text-3xl text-yellow">
              {stakedBalance
                ? parseFloat(formatEther(BigInt(stakedBalance))).toFixed(2)
                : "0"}
            </h1>
          </div>
          <div className="flex text-sm flex-col items-center md:items-start text-hoverGray justify-center text-center gap-2">
            Your Percentage of the Pool
            <h1 className="text-3xl text-yellow">{poolPercentage}%</h1>
          </div>
          <div className="flex text-sm flex-col items-center md:items-start text-hoverGray justify-center text-center gap-2">
            Total INIT Staked
            <h1 className="text-3xl text-yellow">
              {totalOwed
                ? parseFloat(formatEther(BigInt(totalOwed))).toFixed(2)
                : "0"}
            </h1>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full w-[350px] sm:w-[750px] lg:w-[1000px] items-center justify-center gap-4">
          <div className="flex flex-col items-start justify-center w-[300px] sm:w-[50%] h-full">
            <p className="text-3xl text-white">DEPOSIT INIT</p>
            <p className="text-3xl text-white"> BE THE HOUSE </p>
            <p className="text-3xl text-white">
              {" "}
              EARN <span className="text-yellow">REWARDS </span>
            </p>
            <p className="pt-6 text-white">
              Be the house! Take the other side of the wager by depositing INIT
              into the pool. Your deposit may accrue rewards generated by
              protocol revenues. But be aware!{" "}
              <span className="text-yellow">
                Deposits may also lose value, if and when there are a large
                amount of user payouts.
              </span>{" "}
            </p>
            <div className="text-white flex flex-row items-start justify-center gap-2">
              <span className="">For more information, refer to the</span>
              <Link
                className="flex flex-row hover:underline hover:text-white items-center justify-center gap-2"
                href="https://gitbook.zaar.market/"
              >
                Docs
                <FaExternalLinkAlt />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-[300px] sm:w-[50%] h-full ">
            <div className="bg-black text-white flex flex-row items-center justify-center w-full gap-4">
              <div className="flex flex-col ">
                <button
                  onClick={() => setCurrentTab("deposit")}
                  className={`${currentTab === "deposit" ? "text-yellow " : "text-white hover:text-hoveryellow"} px-4 py-2 rounded-md`}
                >
                  Deposit
                </button>
                <div
                  className={`${currentTab === "deposit" ? "h-[2px] w-full bg-yellow" : "h-[0px]"}`}
                ></div>
              </div>

              <div className="flex flex-col ">
                <button
                  onClick={() => setCurrentTab("withdraw")}
                  className={`${currentTab === "withdraw" ? "text-yellow" : "text-white hover:text-hoveryellow"} px-4 py-2 rounded-md`}
                >
                  Withdraw
                </button>
                <div
                  className={`${currentTab === "withdraw" ? "h-[2px] w-full bg-yellow" : "h-[0px]"}`}
                ></div>
              </div>
            </div>
            {currentTab === "deposit" && (
              <div className="flex flex-col bg-white bg-opacity-5 w-full items-center justify-center p-6 gap-6">
                <div className="flex flex-col md:flex-row w-full items-start justify-center gap-4">
                  <div className="flex flex-col items-start justify-center w-full gap-2">
                    <p className="text-white">From Wallet</p>
                    <div className="flex flex-row items-center justify-between gap-2 bg-black border-[1px] border-grey p-2 w-full">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Image
                          src="/zaar-flip-tails.png"
                          alt="Initia Logo Coin"
                          width={20}
                          height={20}
                        />
                        <p className="text-white">INIT</p>
                      </div>
                      <FaChevronDown />
                    </div>
                    <p className="text-white">
                      You have {Number(walletBalance).toFixed(2)} INIT
                    </p>
                  </div>

                  <div className="flex flex-col items-start justify-center w-full gap-2">
                    <p className="text-white">Amount</p>
                    <div className="flex flex-row items-center justify-between gap-2 bg-black border border-grey p-2 w-full">
                      <input
                        className="flex flex-row items-center justify-center gap-2 bg-black w-full text-white focus:outline-none"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                      />
                      <button
                        className="text-black bg-white p-1 px-2 text-xs rounded-md hover:bg-gray-200 transition-colors"
                        onClick={() => {
                          // Add logic to set max amount
                          setAmount(Number(walletBalance));
                        }}
                      >
                        Max
                      </button>
                    </div>
                    <p className="text-white">
                      ≈ ${Number(walletBalance).toFixed(2)}
                    </p>
                  </div>
                </div>
                {amount > Number(walletBalance) ? (
                  <button
                    disabled={true}
                    className="bg-light-gray transition duration-300 text-black w-full h-10"
                  >
                    Insufficient Balance
                  </button>
                ) : allowance < parseEther(amount.toString()) ? (
                  <button
                    className="bg-light-gray hover:bg-white transition duration-300 text-black w-full h-10"
                    onClick={async () => {
                      try {
                        await approveStaking(parseEther(amount.toString()));
                      } catch (error) {
                        console.error("Error in approveStaking:", error);
                      }

                      while (isLoading) {
                        toast.loading("approving");
                      }
                      toast.dismiss();
                      toast.success("Approved!");
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Approving..." : "Approve"}
                  </button>
                ) : pendingStake[3] === BigInt(0) ? (
                  <button
                    className="bg-light-gray hover:bg-white transition duration-300 text-black w-full h-10"
                    onClick={async () => {
                      await requestStake(parseEther(amount.toString()));
                    }}
                    disabled={isStaking}
                  >
                    {isStaking ? "Processing..." : "Deposit"}
                  </button>
                ) : stakeDeadlinePassed ? (
                  <>
                    <span>Stake Request Expired</span>
                    <button
                      className="bg-light-gray hover:bg-white transition duration-300 text-black w-full h-10"
                      onClick={async () => {
                        await cancelStake();
                      }}
                      disabled={isStaking}
                    >
                      Cancel Stake
                    </button>
                  </>
                ) : stakeCooldown > 0 ? (
                  <>
                    <span>Stake Requested</span>
                    <div className="bg-light-gray transition duration-300 text-black w-full h-10 text-center flex items-center justify-center">
                      Finalize Stake in {stakeCooldown} seconds
                    </div>
                  </>
                ) : (
                  <>
                    <span>
                      Stake Request Expires in {stakeTimeRemaining} seconds
                    </span>
                    <button
                      className="bg-light-gray hover:bg-white transition duration-300 text-black w-full h-10"
                      onClick={async () => {
                        await finalizeStake();
                      }}
                    >
                      Finalize Stake
                    </button>
                  </>
                )}
              </div>
            )}
            {currentTab === "withdraw" && (
              <div className="flex flex-col bg-white bg-opacity-5 w-full items-center justify-center p-6 gap-6">
                <div className="flex flex-col md:flex-row w-full items-start justify-center gap-4">
                  <div className="flex flex-col items-start justify-center w-full md:w-1/2 gap-2">
                    <p className="text-white">From Staking</p>
                    <div className="flex flex-row items-center justify-between gap-2 bg-black border border-grey p-2 w-full">
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Image
                          src="/zaar-flip-tails.png"
                          alt="Initia Logo Coin"
                          width={20}
                          height={20}
                        />
                        <p className="text-white">INIT</p>
                      </div>
                      <FaChevronDown />
                    </div>
                    <p className="text-white">
                      You have{" "}
                      {Number(formatEther(BigInt(stakedBalance))).toFixed(2)}{" "}
                      INIT staked
                    </p>
                  </div>

                  <div className="flex flex-col items-start justify-center w-full md:w-1/2 gap-2">
                    <p className="text-white">Amount</p>
                    <div className="flex flex-row items-center justify-between gap-2 bg-black border border-grey p-2 w-full">
                      <input
                        className="flex flex-row items-center justify-center gap-2 bg-black w-full text-white focus:outline-none"
                        placeholder="0.00"
                        value={amount}
                      />
                      <button
                        className="text-black bg-light-gray p-1 px-2 text-xs hover:bg-gray-200 transition-colors"
                        onClick={() => {
                          // Add logic to set max amount
                          setAmount(Number(formatEther(BigInt(stakedBalance))));
                        }}
                      >
                        Max
                      </button>
                    </div>
                    <p className="text-white">
                      ≈ ${Number(formatEther(BigInt(stakedBalance))).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-row items-center justify-between w-full text-white text-sm">
                    <span>Cooldown Period</span>
                    <span>5 minutes</span>
                  </div>
                </div> */}
                {unstakeRequests[3] === BigInt(0) ? (
                  <button
                    className="bg-light-gray hover:bg-white transition duration-300 text-black w-full h-10"
                    onClick={async () => {
                      if (amount === 0) {
                        toast.error("Amount cannot be 0");
                        return;
                      }
                      if (
                        parseEther(amount.toString()) > BigInt(stakedBalance)
                      ) {
                        toast.error(
                          "Amount cannot be greater than staked balance"
                        );
                        return;
                      }
                      try {
                        await requestUnstake(parseEther(amount.toString()));
                      } catch (error) {
                        console.error("Error in requestUnstake:", error);
                      }
                    }}
                    disabled={Number(stakedBalance) === 0}
                  >
                    {Number(stakedBalance) === 0
                      ? "No Staked Balance"
                      : "Withdraw"}
                  </button>
                ) : unstakeCooldown > 0 ? (
                  <>
                    <span>Unstake Requested</span>
                    <button className="bg-light-gray hover:bg-white transition duration-300 text-black w-full h-10">
                      Finalize Unstake in {unstakeCooldown} seconds
                    </button>
                  </>
                ) : unstakeDeadlinePassed ? (
                  <>
                    <span>Unstake Request Expired</span>
                    <button
                      onClick={async () => {
                        try {
                          await cancelUnstake();
                        } catch (error) {
                          console.error("Error in cancelUnstake:", error);
                        }
                      }}
                      className="bg-light-gray hover:bg-white transition duration-300 text-black w-full h-10"
                    >
                      Cancel Unstake
                    </button>
                  </>
                ) : (
                  <>
                    <span>
                      Unstake Request Expires in {unstakeTimeRemaining} seconds
                    </span>
                    <button
                      onClick={async () => {
                        try {
                          await finalizeUnstake(parseEther(amount.toString()));
                        } catch (error) {
                          console.error("Error in finalizeUnstake:", error);
                        }
                      }}
                      className="bg-light-gray hover:bg-white transition duration-300 text-black w-full h-10"
                    >
                      Finalize Unstake
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
