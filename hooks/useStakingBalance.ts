import { useContractRead, useBalance } from 'wagmi';
import { zaarStakingAbi } from '../abis/abi';
import { formatEther } from 'viem';
import { initiaTokenAddress, stakingAddress } from '@/generated';

export function useStakingBalance(address: string) {
  const { data: stakedBalance, isLoading: isStakedLoading } = useContractRead({
    address: stakingAddress,
    abi: zaarStakingAbi,
    functionName: 'stakedBalances',
    args: [initiaTokenAddress, address],
  });

  const { data: totalStaked, isLoading: isTotalStakedLoading } = useContractRead({
    address: stakingAddress,
    abi: zaarStakingAbi,
    functionName: 'totalStaked',
    args: [initiaTokenAddress],
  });

  const { data: earnedBalance, isLoading: isEarnedLoading } = useContractRead({
    address: stakingAddress,
    abi: zaarStakingAbi,
    functionName: 'earned',
    args: [address, initiaTokenAddress],
  });

  const { data: walletBalance, isLoading: isWalletLoading } = useBalance({
    address: address as `0x${string}`,
    token: initiaTokenAddress,
  });

  const { data: cooldownTime, isLoading: isCooldownLoading } = useContractRead({
    address: stakingAddress,
    abi: zaarStakingAbi,
    functionName: 'timeUntilUnstake',
    args: [address, initiaTokenAddress],
  });

  const calculatePercentage = () => {
    if (!stakedBalance || !totalStaked || totalStaked === BigInt(0)) return '0';
    const percentage = (Number(stakedBalance) / Number(totalStaked)) * 100;
    return percentage.toFixed(2);
  };

  const calculateCooldownProgress = () => {
    if (!cooldownTime) return 0;
    const COOLDOWN_PERIOD = 48 * 60 * 60; // 48 hours in seconds
    const progress = ((COOLDOWN_PERIOD - Number(cooldownTime)) / COOLDOWN_PERIOD) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  const formatTimeRemaining = () => {
    if (!cooldownTime) return '0 hours';
    const hours = Math.ceil(Number(cooldownTime) / 3600);
    return `${hours} hours`;
  };

  return {
    stakedBalance: stakedBalance ? formatEther(stakedBalance) : '0',
    earnedBalance: earnedBalance ? formatEther(earnedBalance) : '0',
    walletBalance: walletBalance ? formatEther(walletBalance.value) : '0',
    poolPercentage: calculatePercentage(),
    cooldownProgress: calculateCooldownProgress(),
    timeRemaining: formatTimeRemaining(),
    isLoading: isStakedLoading || isEarnedLoading || isTotalStakedLoading || isWalletLoading || isCooldownLoading
  };
} 