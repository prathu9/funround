import { WalletBalanceType } from "@/context/balance-context";
import CryptoOptions from "@/data/cryptoOptions";

// function to add crypto icon and symbol in wallet balance data
export const getWalletBalanceWithIcon = (walletBalanceData: WalletBalanceType) => {
    const matchedCrypto = CryptoOptions.find((d) => d.name === walletBalanceData.name)!;

    return { ...walletBalanceData, icon: matchedCrypto.icon, symbol: matchedCrypto.symbol };
}   