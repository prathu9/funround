import { useContext, useMemo, useState } from "react";
import { WalletItemType } from "./WalletBalance";
import { UserContext } from "@/context/user-context";
import WalletIcon from "/public/wallet-icon.svg";
import Link from "next/link";
import WalletItem from "./walletItem";
import { getMaxValueCrypto } from "@/utils/getMaxValueCrypto";

// type for mobile wallet props
interface MobileWalletPropType{
  data: WalletItemType[]
}

// wallet component for mobile
export const MobileWallet = ({ data }: MobileWalletPropType) => {
  const [showWallets, setShowWallets] = useState(false); // state to toggle wallet currency and balance

  const maxValueCrypto = useMemo(() => getMaxValueCrypto(data),[data]); // gets currency with max amount

  const { walletDetail: {walletId} } = useContext(UserContext); // get walletId from user context

  // function to toggle wallet currency and balance 
  const toggleShowWallets = () => {
    if (!showWallets) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    setShowWallets(!showWallets);
  };

  return (
    // container for mobile wallet balance navigation
    <div className="sm:hidden">
      {/* button to open wallet balance */}
      <button
        onClick={toggleShowWallets}
        className="px-6 py-[14px] flex gap-[10px] bg-black rounded-full cursor-pointer"
      >
        <span>
          <WalletIcon />
        </span>
        <span>Wallet</span>
      </button>
      {showWallets && (
        // container for wallet balance
        <div className="absolute h-[calc(100vh-85px)] top-[85px] left-0 w-full px-[18px] py-[15px] bg-[#242731] z-10 rounded-b-2xl overflow-hidden">
          {/* check if wallet is setup */}
          {!walletId ? (
            // link to set up wallet
            <Link
              href="/wallet-setup"
              className="px-[18px] py-[15px] w-full flex gap-[9px] justify-center items-center bg-[#1F2128] rounded-2xl"
            >
              <span className="pr-[9px] text-[18px] leading-[19.91px] border-r">
                WALLET
              </span>
              <span className="ml-[9px] whitespace-nowrap">SETUP NOW</span>
            </Link>
          ) : (
            <>
            {/* container for currency with max balance  */}
              <div className="pb-[15px] w-full flex gap-[9px] items-center">
                <span className="pr-[9px] text-[18px] leading-[19.91px] border-r">
                  WALLET
                </span>
                <span className="flex gap-[9px] items-center">
                  {maxValueCrypto.icon}
                  <span>{maxValueCrypto.amount}{maxValueCrypto.symbol}</span>
                  <span className="text-[#5F5A72]">
                    ${maxValueCrypto.valueInDollars}
                  </span>
                </span>
              </div>
              {/* link for wallet balance withdrawal */}
              <Link
                href="/wallet-setup/withdraw"
                className="py-2 inline-block w-full text-[18px] leading-[19.91px] bg-[#1F2128] text-center rounded-lg"
              >
                WITHDRAW
              </Link>
              {/* list of wallet currency with balance */}
              <ul className="h-[calc(100%-120px)] mt-6 pt-6 flex flex-col gap-6 border-t-2 border-[#5F5A72] overflow-auto">
                {data.map((crypto, index) =>  (
                    <li
                      key={crypto.name}
                      className="flex gap-[9px] items-center"
                    >
                      {/* wallet item with crypto name, balance and option for deposit */}
                      <WalletItem index={index} cryptoData={crypto}/>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileWallet;
