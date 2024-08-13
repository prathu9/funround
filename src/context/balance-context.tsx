import walletBalanceData from "@/data/walletBalanceData";

import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// type for wallet balance data
export interface WalletBalanceType {
  name: string;
  amount: string;
  valueInDollars: string;
}

// type for balance context
interface BalanceContextType {
  walletBalance: WalletBalanceType[];
  setWalletBalance: Dispatch<SetStateAction<WalletBalanceType[]>>;
  isBalanceAvailable: boolean;
}

// Balance context to keep track of wallet balance
export const BalanceContext = createContext<BalanceContextType>({
  walletBalance: [],
  setWalletBalance: () => {},
  isBalanceAvailable: false,
});

// prop type of balance provider
interface BalanceProviderProps {
  children: ReactNode;
}

// balance context provider component
const BalanceProvider = ({ children }: BalanceProviderProps) => {
  const [walletBalance, setWalletBalance] =
    useState<WalletBalanceType[]>(walletBalanceData); // state to store wallet balance data
  const [isBalanceAvailable, setIsBalanceAvailable] = useState(false); // state for balance availability

  useEffect(() => {
    // set wallet balance in localstorage, can be removed after backend is added
    localStorage.setItem("wallet-balance", JSON.stringify(walletBalance));

    // get array of amount from wallet balance
    const amountList = walletBalance.map((wallet) => +wallet.amount);

    // checks if amount list have amount greater than zero and set true if any amount is greater than zero
    setIsBalanceAvailable(amountList.some((amount) => amount > 0));
  }, [walletBalance]);

  return (
    <BalanceContext.Provider
      value={{ walletBalance, setWalletBalance, isBalanceAvailable}}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
