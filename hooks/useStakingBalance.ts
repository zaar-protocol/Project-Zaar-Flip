import { useContractRead, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { StakingAbi } from '../abis/Staking-abi';
import { formatEther, parseEther } from 'viem';
import { initiaTokenAddress, stakingAddress } from '@/generated';
import { erc20Abi } from 'viem';
import { useState, useEffect } from 'react';
import { getFutureTimestamp } from '@/utils/timestamps';
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { config } from '@/config';
import { toast } from 'react-hot-toast';

export function useStakingBalance(address: string) {
  const [stakeRequest, setStakeRequest] = useState<{ amount: bigint; timestamp: number } | null>(null);
  const [isStaking, setIsStaking] = useState(false);
  const [stakeError, setStakeError] = useState<string | null>(null);

  const { data: stakedBalance, isLoading: isStakedLoading, refetch: refetchStakedBalance } = useContractRead({
    address: stakingAddress,
    abi: StakingAbi,
    functionName: 'shareBalances',
    args: [initiaTokenAddress, address],
  });

  const { data: tokenInfo, isLoading: isTokenInfoLoading, refetch: refetchTokenInfo } = useContractRead({
    address: stakingAddress,
    abi: StakingAbi,
    functionName: 'tokenInfo',
    args: [initiaTokenAddress],
  });

  const { data: totalOwed, isLoading: isTotalOwedLoading, refetch: refetchTotalOwed } = useContractRead({
    address: stakingAddress,
    abi: StakingAbi,
    functionName: 'totalOwed',
    args: [address, initiaTokenAddress],
  });

  const { data: pendingStake, isLoading: isPendingStakeLoading, refetch: refetchPendingStake } = useContractRead({
    address: stakingAddress,
    abi: StakingAbi,
    functionName: 'stakeRequests',
    args: [initiaTokenAddress, address],
  });
  console.log('pendingStake', pendingStake);

  const { data: unstakeRequests, isLoading: isUnstakeRequestsLoading, refetch: refetchUnstakeRequests } = useContractRead({
    address: stakingAddress,
    abi: StakingAbi,
    functionName: 'unstakeRequests',
    args: [initiaTokenAddress, address],
  });
  console.log('unstakeRequests', unstakeRequests);

  //pendingPayouts
  const { data: pendingPayouts, isLoading: isPendingPayoutsLoading } = useContractRead({
    address: stakingAddress,
    abi: StakingAbi,
    functionName: 'pendingPayouts',
    args: [initiaTokenAddress, address],
  });

  const { data: walletBalance, isLoading: isWalletLoading } = useBalance({
    address: address as `0x${string}`,
    token: initiaTokenAddress,
  });

  const { data: allowance, isLoading: isAllowanceLoading, refetch: refetchAllowance } = useContractRead({
    address: initiaTokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, stakingAddress],
  });

  const { data: availableBalance, isLoading: isAvailableBalanceLoading, refetch: refetchAvailableBalance } = useContractRead({
    address: stakingAddress,
    abi: StakingAbi,
    functionName: 'getAvailableBalance',
    args: [initiaTokenAddress],
  });
  
  console.log('allowance', allowance);

  const approveStaking = async (amount: bigint) => {
    setIsStaking(true);
    try {
      const { request } = await simulateContract(config, {
        abi: erc20Abi,
        address: initiaTokenAddress,
        functionName: 'approve',
        args: [stakingAddress, amount],
    });
    const hash = await writeContract(config, request);
    const receipt = await waitForTransactionReceipt(config, { hash });
    console.log("Approve Staking Receipt: ", receipt);
    if (receipt.status === 'reverted') {
        toast.error('Error approving stake. Transaction failed.');
      }
      toast.success('Funds approved! You can now stake.');
      setIsStaking(false);
      refetchAllowance();
    } catch (error) {
      console.log('Error in approveStaking:', error);
      toast.error('Error approving stake. Transaction failed.');
      setIsStaking(false);
    }
  };

  const requestStake = async (amount: bigint) => {
    console.log('requesting stake for amount: ', amount);
    if (amount <= BigInt(0)) {
      toast.error('Cannot stake 0 amount');
      return;
    }

    setIsStaking(true);
    setStakeError(null);

    await refetchTokenInfo();
    await refetchAvailableBalance();

    if(!tokenInfo || !availableBalance) {
      toast.error('Error fetching token info or available balance');
      return;
    }

    const expectedShares = amount * tokenInfo?.[0] / availableBalance;
    const minSharesOut = expectedShares * BigInt(99) / BigInt(100);

    try {
      const { request } = await simulateContract(config, {
        abi: StakingAbi,
        address: stakingAddress,
        functionName: 'requestStake',
        args: [initiaTokenAddress, amount, minSharesOut, BigInt(Math.floor(Date.now() / 1000) + 300)],
      });
      const hash = await writeContract(config, request);
      const receipt = await waitForTransactionReceipt(config, { hash });
      setIsStaking(false);
      console.log("Request Stake Receipt: ", receipt);
      if (receipt.status === 'reverted') {
        console.log('Failed to request stake:', receipt);
        toast.error('Error requesting stake. Transaction failed.');
        return;
      }
      toast.success('Stake requested successfully!');
      refetchPendingStake();
    } catch (error) {
      console.log('Error in requestStake:', error);
      toast.error('Error requesting stake. Transaction failed.');
      setIsStaking(false);
    }
  };

  const cancelStake = async () => {
    setIsStaking(true);
    try {
        const { request } = await simulateContract(config, {
          abi: StakingAbi,
          address: stakingAddress,
          functionName: 'cancelExpiredStakeRequest',
          args: [initiaTokenAddress],
        });
        const hash = await writeContract(config, request);
        const receipt = await waitForTransactionReceipt(config, { hash });
        setIsStaking(false);
        console.log("Cancel Stake Receipt: ", receipt);
        if (receipt.status === 'reverted') {
          console.log('Failed to cancel existing stake:', receipt);
          toast.error('Error cancelling current stake. Transaction failed.');
        }
        toast.success('Stake cancelled successfully!');
        refetchPendingStake();
    } catch (error) {
      console.log('Error in cancelling stake:', error);
      toast.error('Error cancelling stake. Transaction failed.');
      setIsStaking(false);
    }
  };

  const finalizeStake = async () => {
    setIsStaking(true);
    try {
      const { request } = await simulateContract(config, {
        abi: StakingAbi,
        address: stakingAddress,
        functionName: 'finalizeStake',
        args: [initiaTokenAddress, address],
      });
      const hash = await writeContract(config, request);
      const receipt = await waitForTransactionReceipt(config, { hash });
      setIsStaking(false);
      console.log("Finalize Stake Receipt: ", receipt);
      if (receipt.status === 'reverted') {
        console.log('Failed to finalize stake:', receipt);
        toast.error('Error finalizing stake. Transaction failed.');
        return;
      }
      toast.success('Stake finalized successfully!');
      refetchStakedBalance();
      refetchTotalOwed();
      refetchPendingStake();
    } catch (error) {
    console.log("Error in finalizeStake:", error);
    toast.error("Error finalizing stake. Transaction failed.");
    setIsStaking(false);
  }
}

  const requestUnstake = async (amount: bigint) => {
    setIsStaking(true);

    if (amount <= BigInt(0)) {
      toast.error('Cannot unstake 0 amount');
      return;
    }

    const scaledAmount = (amount * BigInt(99)) / BigInt(100);
    console.log('scaledAmount: ', scaledAmount);

    await refetchAvailableBalance();
    await refetchTokenInfo();

    if(!tokenInfo || !availableBalance) {
      toast.error('Error fetching token info or available balance');
      return;
    }

    const withdrawShares = tokenInfo[0] * amount / availableBalance;

    try{
      const { request } = await simulateContract(config, {
        abi: StakingAbi,
        address: stakingAddress,
        functionName: 'requestUnstake',
        args: [initiaTokenAddress, withdrawShares, scaledAmount, BigInt(Math.floor(Date.now() / 1000) + 300)],
      });
      const hash = await writeContract(config, request);
      const receipt = await waitForTransactionReceipt(config, { hash });
      console.log("Request Unstake Receipt: ", receipt);
      setIsStaking(false);
      if (receipt.status === 'reverted') {
        console.log('Failed to request unstake:', receipt);
        toast.error('Error requesting unstake. Transaction failed.');
      }
      toast.success('Unstake request sent successfully!');
      refetchUnstakeRequests();
    } catch (error) {
      console.log('Error in requestUnstake:', error);
      toast.error('Error requesting unstake. Transaction failed.');
      setIsStaking(false);
    }
  };

  const cancelUnstake = async () => {
    setIsStaking(true);
    try{
      const { request } = await simulateContract(config, {
        abi: StakingAbi,
        address: stakingAddress,
        functionName: 'cancelExpiredUnstakeRequest',
        args: [initiaTokenAddress],
      });
      const hash = await writeContract(config, request);
      const receipt = await waitForTransactionReceipt(config, { hash });
      console.log("Cancel Unstake Receipt: ", receipt);
      setIsStaking(false);
      if (receipt.status === 'reverted') {
        console.log('Failed to cancel unstake:', receipt);
        toast.error('Error cancelling unstake. Transaction failed.');
      }
      toast.success('Unstake request cancelled successfully!');
      refetchUnstakeRequests();
    } catch (error) {
      console.log('Error in cancelUnstake:', error);
      toast.error('Error cancelling unstake. Transaction failed.');
      setIsStaking(false);
    }
  };

  const finalizeUnstake = async (amount: bigint) => {
    setIsStaking(true);
    console.log('finalizing unstake for amount: ', amount);
    await refetchUnstakeRequests();
    console.log('unstakeRequests: ', unstakeRequests);
    try{
      const { request } = await simulateContract(config, {
        abi: StakingAbi,
        address: stakingAddress,
        functionName: 'finalizeUnstake',
        args: [initiaTokenAddress, address, unstakeRequests?.[2] || BigInt(0)],
      });
      const hash = await writeContract(config, request);
      const receipt = await waitForTransactionReceipt(config, { hash });
      console.log("Finalize Unstake Receipt: ", receipt);
      setIsStaking(false);
      if (receipt.status === 'reverted') {
        console.log('Failed to finalize unstake:', receipt);
        toast.error('Error finalizing unstake. Transaction failed.');
      }
      toast.success('Unstake finalized successfully!');
      refetchStakedBalance();
      refetchTotalOwed();
      refetchUnstakeRequests();
    } catch (error) {
      console.log('Error in finalizeUnstake:', error);
      toast.error('Error finalizing unstake. Transaction failed.');
      setIsStaking(false);
    }
  };

  const calculatePercentage = () => {
    if (!stakedBalance || !tokenInfo || tokenInfo[0] === BigInt(0)) return '0';
    const percentage = (Number(stakedBalance) / Number(tokenInfo[0])) * 100;
    return percentage.toFixed(2);
  };

  return {
    allowance: allowance || BigInt(0),
    stakedBalance: stakedBalance ? stakedBalance : '0',
    pendingStake: pendingStake || [BigInt(0), BigInt(0), BigInt(0), BigInt(0)],
    refetchPendingStake,
    unstakeRequests: unstakeRequests || [BigInt(0), BigInt(0), BigInt(0), BigInt(0)],
    totalOwed: totalOwed ? totalOwed : '0',
    walletBalance: walletBalance ? formatEther(walletBalance.value) : '0',
    poolPercentage: calculatePercentage(),
    approveStaking,
    requestStake,
    cancelStake,
    finalizeStake,
    requestUnstake,
    cancelUnstake,
    finalizeUnstake,
    pendingPayouts,
    isStaking,
    stakeError,
    isLoading: isStakedLoading || isWalletLoading || isTokenInfoLoading || isTotalOwedLoading || isAllowanceLoading || isPendingStakeLoading,
    totalStaked: availableBalance ? formatEther(availableBalance) : '0',
  };
} 