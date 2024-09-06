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
  const {walletBalance} = useContext(BalanceContext); // get list of wallet ba;ance for balance context

  const walletBalanceDataWithIcon = walletBalance.map(getWalletBalanceWithIcon); // add crypto icon to list of wallet balance

  return (
    <>
      {/* wallet balance shown on desktop */}
      <DesktopWallet data={walletBalanceDataWithIcon} />
      {/* wallet balance shown on mobile */}
      <MobileWallet data={walletBalanceDataWithIcon} />
    </>
  );
};

export default WalletBalance;
