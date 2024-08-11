import walletBalanceData from "@/data/walletBalanceData";
import { createContext, ReactNode, useEffect, useState, Dispatch, SetStateAction } from "react";

interface WalletBalanceType{
    name: string,
    amount: string,
    valueInDollars: string
}

interface BalanceContextType {
    walletBalance: WalletBalanceType[],
    setWalletBalance:  Dispatch<SetStateAction<WalletBalanceType[]>>,
    isBalanceAvailable: boolean
}


export const BalanceContext = createContext<BalanceContextType>({
    walletBalance: [],
    setWalletBalance:() => {},
    isBalanceAvailable: false
});

interface BalanceProviderProps {
    children: ReactNode
}

const BalanceProvider = ({children}:BalanceProviderProps) => {
    const [walletBalance, setWalletBalance] = useState<WalletBalanceType[]>(walletBalanceData);
    const [isBalanceAvailable, setIsBalanceAvailable] = useState(false);

    useEffect(() => {
        console.log("w", walletBalance)
        localStorage.setItem("wallet-balance", JSON.stringify(walletBalance));
        const amountList = walletBalance.map((wallet) => +wallet.amount);
        setIsBalanceAvailable(amountList.some(amount => amount > 0));
        
    },[walletBalance])

    return(
        <BalanceContext.Provider value={{walletBalance, setWalletBalance, isBalanceAvailable}}>
            {children}
        </BalanceContext.Provider>
    )
}

export default BalanceProvider;