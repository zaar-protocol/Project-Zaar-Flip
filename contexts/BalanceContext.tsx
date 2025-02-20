import { createContext, useContext } from "react";

type BalanceContextType = {
  refetchBalance: () => Promise<any>;
};

export const BalanceContext = createContext<BalanceContextType>({
  refetchBalance: async () => {},
});

export const useBalanceContext = () => useContext(BalanceContext);
