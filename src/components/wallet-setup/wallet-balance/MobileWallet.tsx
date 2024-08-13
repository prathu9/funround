import { useContext, useMemo, useState } from "react";
import { WalletItemType } from "./WalletBalance";
import { UserContext } from "@/context/user-context";
import { WalletContext } from "@/context/wallet-context";
import WalletIcon from "/public/wallet-icon.svg";
import Link from "next/link";
import WalletItem from "./walletItem";
import { getMaxValueCrypto } from "@/utils/getMaxValueCrypto";

interface MobileWalletPropType{
  data: WalletItemType[]
}

// wallet component for mobile
export const MobileWallet = ({ data }: MobileWalletPropType) => {
  const [showWallets, setShowWallets] = useState(false);

  const maxValueCrypto = useMemo(() => getMaxValueCrypto(data),[data]);

  const {
    userDetail: { email },
  } = useContext(UserContext);
  const { walletDetail } = useContext(WalletContext);

  const toggleShowWallets = () => {
    if (!showWallets) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    setShowWallets(!showWallets);
  };

  return (
    <div className="sm:hidden">
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
        <div className="absolute h-[calc(100vh-85px)] top-[85px] left-0 w-full px-[18px] py-[15px] bg-[#242731] z-10 rounded-b-2xl overflow-hidden">
          {walletDetail.email !== email ? (
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
              <Link
                href="/wallet-setup/withdraw"
                className="py-2 inline-block w-full text-[18px] leading-[19.91px] bg-[#1F2128] text-center rounded-lg"
              >
                WITHDRAW
              </Link>
              <ul className="h-[calc(100%-120px)] mt-6 pt-6 flex flex-col gap-6 border-t-2 border-[#5F5A72] overflow-auto">
                {data.map((crypto, index) =>  (
                    <li
                      key={crypto.name}
                      className="flex gap-[9px] items-center"
                    >
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
