import WalletBalance from "@/components/wallet-setup/wallet-balance/WalletBalance"
import { BalanceContext } from "@/context/balance-context";
import { useContext } from "react"

export const useResetWalletBalance = () => {
    const {setWalletBalance} = useContext(BalanceContext);

    return [];
}