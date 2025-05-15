import { useContractRead, useBalance, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { StakingAbi } from '../abis/Staking-abi';
import { formatEther, parseEther } from 'viem';
import { initiaTokenAddress, stakingAddress } from '@/generated';
import { erc20Abi } from 'viem';
import { useState, useEffect } from 'react';

export function useStakingBalance(address: string) {
  const [stakeRequest, setStakeRequest] = useState<{ amount: bigint; timestamp: number } | null>(null);
  const [isStaking, setIsStaking] = useState(false);
  const [stakeError, setStakeError] = useState<string | null>(null);

  const { data: stakedBalance, isLoading: isStakedLoading } = useContractRead({
    address: stakingAddress,
    abi: StakingAbi,
    functionName: 'shareBalances',
    args: [initiaTokenAddress, address],
  });

  const { data: tokenInfo, isLoading: isTokenInfoLoading } = useContractRead({
    address: stakingAddress,
    abi: StakingAbi,
    functionName: 'tokenInfo',
    args: [initiaTokenAddress],
  });

  const { data: totalOwed, isLoading: isTotalOwedLoading } = useContractRead({
    address: stakingAddress,
    abi: StakingAbi,
    functionName: 'totalOwed',
    args: [address, initiaTokenAddress],
  });

  const { data: pendingStake, isLoading: isPendingStakeLoading } = useContractRead({
    address: stakingAddress,
    abi: StakingAbi,
    functionName: 'stakeRequests',
    args: [initiaTokenAddress, address],
  });
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

  const { data: allowance, isLoading: isAllowanceLoading } = useContractRead({
    address: initiaTokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, stakingAddress],
  });

  const { writeContract: writeContract, data: txData } = useWriteContract();

  const { isLoading: isTxLoading, isSuccess: isTxSuccess, isError: isTxError } = useWaitForTransactionReceipt({
    hash: txData,
  });

  const approveStaking = (amount: bigint) => {
    writeContract({
      abi: erc20Abi,
      address: initiaTokenAddress,
      functionName: 'approve',
      args: [stakingAddress, amount],
    });
  };

  const requestStake = (amount: bigint) => {
    setIsStaking(true);
    setStakeError(null);

    console.log('pendingStake', pendingStake);
    // If there's a pending stake, cancel it first
    if (pendingStake && pendingStake[0] > BigInt(0)) {
      writeContract({
        abi: StakingAbi,
        address: stakingAddress,
        functionName: 'cancelExpiredStakeRequest',
        args: [initiaTokenAddress],
      });
      console.log('stake cancelled');
    }

    console.log(initiaTokenAddress, amount, BigInt(0), BigInt(Math.floor(Date.now() / 1000) + 300));

    // Request new stake
    writeContract({
      abi: StakingAbi,
      address: stakingAddress,
      functionName: 'requestStake',
      args: [initiaTokenAddress, amount, BigInt(0), BigInt(Math.floor(Date.now() / 1000) + 300)], // 2 minute deadline
    });
    console.log('stake requested');
  };

  // Handle stake request flow
  useEffect(() => {
    if (isTxSuccess && isStaking && !stakeRequest) {
      // Request was successful, start waiting period
      setStakeRequest({ amount: BigInt(0), timestamp: Date.now() });
      console.log('waiting has begun');
    } else if (isTxSuccess && stakeRequest) {
      // Finalize was successful
      setStakeRequest(null);
      setIsStaking(false);
    } else if (isTxError) {
      setStakeError('Transaction failed');
      setIsStaking(false);
      setStakeRequest(null);
    }
  }, [isTxSuccess, isTxError, isStaking, stakeRequest]);

  const calculatePercentage = () => {
    if (!stakedBalance || !tokenInfo || tokenInfo[0] === BigInt(0)) return '0';
    const percentage = (Number(stakedBalance) / Number(tokenInfo[0])) * 100;
    return percentage.toFixed(2);
  };

  return {
    allowance: allowance || BigInt(0),
    stakedBalance: stakedBalance ? stakedBalance : '0',
    earnedBalance: totalOwed ? totalOwed : '0',
    walletBalance: walletBalance ? formatEther(walletBalance.value) : '0',
    poolPercentage: calculatePercentage(),
    cooldownProgress: '0',
    timeRemaining: '0',
    approveStaking,
    requestStake,
    pendingPayouts,
    isStaking,
    stakeError,
    isTxLoading,
    isTxSuccess,
    isTxError,
    isLoading: isStakedLoading || isWalletLoading || isTokenInfoLoading || isTotalOwedLoading || isAllowanceLoading || isPendingStakeLoading
  };
} 