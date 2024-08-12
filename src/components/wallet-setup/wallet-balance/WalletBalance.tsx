import WalletIcons from "./walletIcons";
import MobileWallet from "./MobileWallet";
import DesktopWallet from "./DesktopWallet";
import { useContext } from "react";
import { BalanceContext } from "@/context/balance-context";

// wallet item type
export interface WalletItemType {
  data: {
    icon: JSX.Element;
    name: string;
    amount: string;
    valueInDollars: string;
  }[];
}

// Wallet for mobile and desktop
const WalletBalance = () => {
  const {walletBalance} = useContext(BalanceContext);

  const walletBalanceDataWithIcon = walletBalance.map((walletData) => {
    const matchedCrypto = WalletIcons.find((d) => d.name === walletData.name)!;

    return { ...walletData, icon: matchedCrypto.icon };
  });

  return (
    <>
      <DesktopWallet data={walletBalanceDataWithIcon} />
      <MobileWallet data={walletBalanceDataWithIcon} />
    </>
  );
};

export default WalletBalance;
