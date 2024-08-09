import Link from "next/link";
import BitcoinIcon from "/public/crypto-brand/bitcoin-icon.svg";
import { FaChevronDown } from "react-icons/fa";
import TetherIcon from "/public/crypto-brand/tether-icon.svg";
import EtheriumIcon from "/public/crypto-brand/etherium-icon.svg";
import SolanaIcon from "/public/crypto-brand/solana-icon.svg";
import PepeIcon from "/public/crypto-brand/pepe-icon.svg";
import DogeIcon from "/public/crypto-brand/dogecoin-icon.svg";
import ShibaInuIcon from "/public/crypto-brand/shiba-inu-icon.svg";
import BNBIcon from "/public/crypto-brand/bnb-icon.svg";
import XRPIcon from "/public/crypto-brand/xrp-icon.svg";
import { useContext, useState } from "react";
import WalletIcon from "/public/wallet-icon.svg";
import { WalletContext } from "@/context/wallet-context";
import { UserContext } from "@/context/user-context";

const data = [
  {
    icon: <BitcoinIcon />,
    name: "bitcoin",
    amount: "0.1293129BTC",
    valueInDollars: "235.12",
  },
  {
    icon: <TetherIcon />,
    name: "tether",
    amount: "13.40",
    valueInDollars: "13.40",
  },
  {
    icon: <EtheriumIcon />,
    name: "etherium",
    amount: "00.00",
    valueInDollars: "00",
  },
  {
    icon: <SolanaIcon />,
    name: "solana",
    amount: "00.00",
    valueInDollars: "00",
  },
  {
    icon: <PepeIcon />,
    name: "pepe",
    amount: "00.00",
    valueInDollars: "00",
  },
  {
    icon: <DogeIcon />,
    name: "doge",
    amount: "00.00",
    valueInDollars: "00",
  },
  {
    icon: <ShibaInuIcon />,
    name: "shiba inu",
    amount: "00.00",
    valueInDollars: "00",
  },
  {
    icon: <BNBIcon />,
    name: "bnb",
    amount: "00.00",
    valueInDollars: "00",
  },
  {
    icon: <XRPIcon />,
    name: "xrp",
    amount: "00.00",
    valueInDollars: "00",
  },
];

interface WalletPropType {
  walletBalanceData: {
    name: string;
    amount: string;
    valueInDollars: string;
  }[];
}

// Wallet for mobile and desktop
const Wallet = ({ walletBalanceData }: WalletPropType) => {
  const walletBalanceDataWithIcon = walletBalanceData.map((walletData) => {
    const matchedCrypto = data.find((d) => d.name === walletData.name)!;

    return { ...walletData, icon: matchedCrypto.icon };
  });

  return (
    <>
      <WalletDesktop data={data} />
      <WalletMobile data={data} />
    </>
  );
};

// wallet item type
interface WalletItemType {
  data: {
    icon: JSX.Element;
    name: string;
    amount: string;
    valueInDollars: string;
  }[];
}

// wallet component for desktop
export const WalletDesktop = ({ data }: WalletItemType) => {
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
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

// wallet component for mobile
export const WalletMobile = ({ data }: WalletItemType) => {
  const [showWallets, setShowWallets] = useState(false);

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
                  {data[0].icon}
                  <span>{data[0].amount}BTC</span>
                  <span className="text-[#5F5A72]">
                    ${data[0].valueInDollars}
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
                {data.slice(1).map((crypto) => (
                  <li key={crypto.name} className="flex gap-[9px] items-center">
                    {crypto.icon}
                    <span>{crypto.amount}</span>
                    <span className="text-[#5F5A72]">
                      ${crypto.valueInDollars}
                    </span>
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

export default Wallet;
