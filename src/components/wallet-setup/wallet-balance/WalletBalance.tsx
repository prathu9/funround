import MobileWallet from "./MobileWallet";
import DesktopWallet from "./DesktopWallet";
import { useContext } from "react";
import { BalanceContext } from "@/context/balance-context";
import { getWalletBalanceWithIcon } from "@/utils/getWalletBalanceWithIcon";

// wallet item type
export interface WalletItemType {
    icon: JSX.Element;
    name: string;
    amount: string;
    valueInDollars: string;
    symbol: string;
}

// Wallet for mobile and desktop
const WalletBalance = () => {
  const {walletBalance} = useContext(BalanceContext);

  const walletBalanceDataWithIcon = walletBalance.map(getWalletBalanceWithIcon);

  return (
    <>
      <DesktopWallet data={walletBalanceDataWithIcon} />
      <MobileWallet data={walletBalanceDataWithIcon} />
    </>
  );
};

export default WalletBalance;
