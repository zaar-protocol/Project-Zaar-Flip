import { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";
import { initiaTokenAddress } from "@/generated";

// Define the shape of our context
type BalanceContextType = {
  balance: number;
  formattedBalance: number;
  refetchBalance: () => Promise<any>;
};

// Create context with default values
export const BalanceContext = createContext<BalanceContextType>({
  balance: 0,
  formattedBalance: 0,
  refetchBalance: async () => {
    return null;
  },
});

// Provider component that wraps app and makes balance data available
export const BalanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { address } = useAccount();
  const [balance, setBalance] = useState(0);
  const [formattedBalance, setFormattedBalance] = useState(0);

  // Use Wagmi's useBalance hook directly
  const balanceData = useBalance({
    address,
    token: initiaTokenAddress,
  });

  // Update formatted balance whenever the data changes
  useEffect(() => {
    if (balanceData.data) {
      setTimeout(() => {
        const rawBalance = Number(
          formatEther(balanceData.data.value || BigInt(0))
        );
        setBalance(rawBalance);
        // Store with 2 decimal places precision (but still as a number)
        const balanceWithDecimals = Math.floor(rawBalance * 100) / 100;
        setFormattedBalance(balanceWithDecimals);
      }, 7000);
    }
  }, [balanceData.data]);

  return (
    <BalanceContext.Provider
      value={{
        balance: balance,
        formattedBalance: formattedBalance,
        refetchBalance: balanceData.refetch,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalanceContext = () => useContext(BalanceContext);
