import { useContext, useState } from "react";
import { WalletItemType } from "./WalletBalance";
import { UserContext } from "@/context/user-context";
import { WalletContext } from "@/context/wallet-context";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

// wallet component for desktop
export const DesktopWallet = ({ data }: WalletItemType) => {
    const [showDropDown, setShowDropDown] = useState(false); // state for drop down
  
    const {
      userDetail: { email },
    } = useContext(UserContext);
    const { walletDetail } = useContext(WalletContext);

  
    // function to toggle drop down
    const toggleDropDown = () => {
      setShowDropDown(!showDropDown);
    };
  
    return (
      // parent of container for wallet desktop component
      <div className="relative hidden basis-[405px] h-[65px] bg-[#2C2E37] rounded-2xl sm:block z-10">
        {/* container for wallet */}
        <div className="h-full flex justify-center bg-[#2C2E37] rounded-2xl z-5">
          {walletDetail.email !== email ? (
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
            <div className="flex flex-col">
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
                    {data[0].icon}
                    {/* bitcoin balance amount */}
                    <span>{data[0].amount}BTC</span>
                    {/* bitcoin balance in dollars */}
                    <span className="text-[#5F5A72]">
                      ${data[0].valueInDollars}
                    </span>
                  </span>
                </span>
                {/* drop down icon */}
                <FaChevronDown />
              </button>
              {showDropDown && (
                // container for dropdown
                <div className="w-full px-[18px] py-[15px] bg-[#2C2E37] z-10 rounded-b-2xl">
                  {/* link to withdraw form page */}
                  <Link
                    href="/wallet-setup/withdraw"
                    className="py-2 inline-block w-full text-[18px] leading-[19.91px] bg-[#1F2128] text-center rounded-lg"
                  >
                    WITHDRAW
                  </Link>
                  {/* drop down list */}
                  <ul className="mt-6 pt-6 flex flex-col gap-6 border-t-2 border-[#5F5A72]">
                    {/* rendering from second data item exclude bitcoin */}
                    {data.slice(1).map((crypto) => (
                      <li
                        key={crypto.name}
                        className="flex gap-[9px] items-center"
                      >
                        {/* crypto icon */}
                        {crypto.icon}
                        {/* crypto balance amount */}
                        <span>{crypto.amount}</span>
                        {/* crypto balance in dollars */}
                        <span className="text-[#5F5A72]">
                          ${crypto.valueInDollars}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default DesktopWallet;