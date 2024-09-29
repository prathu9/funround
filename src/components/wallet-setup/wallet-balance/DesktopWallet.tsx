import { useContext, useMemo, useRef, useState } from "react";
import { WalletItemType } from "./WalletBalance";
import { UserContext } from "@/context/user-context";
import { WalletContext } from "@/context/wallet-context";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence } from "framer-motion"
import AnimateHeight from "@/components/animate/AnimateHeight";
import WalletItem from "./walletItem";
import { getMaxValueCrypto } from "@/utils/getMaxValueCrypto";
import useClickOutside from "@/hooks/useClickOutside";

interface DesktopWalletPropType{
  data: WalletItemType[]
}

// wallet component for desktop
export const DesktopWallet = ({ data }: DesktopWalletPropType) => {
    const [showDropDown, setShowDropDown] = useState(false); // state for drop down
    const dropdownref = useRef(null);

    useClickOutside(dropdownref, () => {
      setShowDropDown(false);
    })

    const maxValueCrypto = useMemo(() => getMaxValueCrypto(data),[data]); // get crypto with max value
  
    const {
      userDetail: { email },
    } = useContext(UserContext); //get email from user context
    const { walletDetail } = useContext(WalletContext); // get wallet detail from wallet context

  
    // function to toggle drop down
    const toggleDropDown = () => {
      setShowDropDown(!showDropDown);
    };
  
    return (
      // parent of container for wallet desktop component
      <div className="relative hidden basis-[405px] h-[65px] bg-[#2C2E37] rounded-2xl sm:block z-10">
        {/* container for wallet */}
        <div className="h-full flex justify-center bg-[#2C2E37] rounded-2xl z-5">
          {!walletDetail.walletId ? (
            <Link
              href="/wallet-setup"
              className="px-[18px] py-[15px] w-full flex gap-[9px] justify-center items-center"
            >
              <span className="flex items-center">
                {/* text indicating it is wallet */}
                <span className="pr-[9px] text-[18px] leading-[19.91px] border-r">
                  WALLET
                </span>
                <span className="ml-[9px] whitespace-nowrap">SETUP NOW</span>
              </span>
            </Link>
          ) : (
            <div ref={dropdownref} className="flex flex-col w-full">
              {/* button to trigger dropdown */}
              <button
                onClick={toggleDropDown}
                className="px-[18px] py-[15px] w-full flex gap-[9px] justify-between items-center"
              >
                {/* container to display text and bitcoin balance */}
                <span className="flex items-center">
                  {/* text indicating it is wallet */}
                  <span className="pr-[9px] text-[18px] leading-[19.91px] border-r">
                    WALLET
                  </span>
                  {/* container for displaying bitcoin balance */}
                  <span className="pl-[9px] flex gap-[9px] items-center">
                    {/* bitcoin icon */}
                    {maxValueCrypto.icon}
                    {/* bitcoin balance amount */}
                    <span>{maxValueCrypto.amount}{maxValueCrypto.symbol}</span>
                    {/* bitcoin balance in dollars */}
                    <span className="text-[#5F5A72]">
                      ${maxValueCrypto.valueInDollars}
                    </span>
                  </span>
                </span>
                {/* drop down icon */}
                <FaChevronDown />
              </button>
              {/* AnimatePresence for animating component during unmount */}
              <AnimatePresence>
              {showDropDown && (
                // container for dropdown with animate height component for height animation
                <AnimateHeight className="w-full -mt-[10px] px-[18px] py-[15px] bg-[#2C2E37] z-10 rounded-b-2xl">
                  {/* link to withdraw form page */}
                  <Link
                    href="/wallet-setup/withdraw"
                    className="py-2 inline-block w-full text-[18px] leading-[19.91px] bg-[#1F2128] text-center rounded-lg"
                  >
                    WITHDRAW
                  </Link>
                  {/* drop down list */}
                  <ul className="mt-6 pt-6 flex flex-col gap-2 border-t-2 border-[#5F5A72]">
                    {/* rendering from second data item exclude bitcoin */}
                    {data.map((crypto, index) => (
                      <li
                        key={crypto.name}
                      >
                        
                      {/* wallet item with crypto name, balance and option for deposit */}
                        <WalletItem index={index} cryptoData={crypto}/>
                      </li>
                    ))}
                  </ul>
                </AnimateHeight>
              )}
            </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default DesktopWallet;