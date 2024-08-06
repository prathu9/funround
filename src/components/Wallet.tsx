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
import { useState } from "react";
import WalletIcon from "/public/wallet-icon.svg";

const data = [
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

// Wallet for mobile and desktop
const Wallet = () => {
  return (
    <>
      <WalletDesktop />
      <WalletMobile />
    </>
  );
};

export const WalletDesktop = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="relative hidden basis-[405px] h-[65px] bg-[#2C2E37] rounded-2xl sm:block">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#2C2E37] rounded-2xl z-10">
        <button
          onClick={toggleDropDown}
          className="px-[18px] py-[15px] w-full flex gap-[9px] justify-between items-center "
        >
          <span className="flex items-center">
            <span className="pr-[9px] text-[18px] leading-[19.91px] border-r">
              WALLET
            </span>
            <span className="pl-[9px] flex gap-[9px] items-center">
              <BitcoinIcon />
              <span>0.1293129BTC</span>
              <span className="text-[#5F5A72]">$235.12</span>
            </span>
          </span>
          <FaChevronDown />
        </button>
        {showDropDown && (
          <div className="w-full px-[18px] py-[15px] bg-[#2C2E37] z-10 rounded-b-2xl">
            <Link
              href="/"
              className="py-2 inline-block w-full text-[18px] leading-[19.91px] bg-[#1F2128] text-center rounded-lg"
            >
              WITHDRAW
            </Link>
            <ul className="mt-6 pt-6 flex flex-col gap-6 border-t-2 border-[#5F5A72]">
              {data.map((crypto) => (
                <li key="cryto" className="flex gap-[9px] items-center">
                  {crypto.icon}
                  <span>{crypto.amount}</span>
                  <span className="text-[#5F5A72]">
                    {crypto.valueInDollars}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export const WalletMobile = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    if (!showDropDown) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="sm:hidden">
      <button
        onClick={toggleDropDown}
        className="px-6 py-[14px] flex gap-[10px] bg-black rounded-full cursor-pointer"
      >
        <span>
          <WalletIcon />
        </span>
        <span>Wallet</span>
      </button>
      {showDropDown && (
        <div className="absolute h-[calc(100%-115px)] top-[115px] left-0 w-full px-[18px] py-[15px] bg-[#242731] z-10 rounded-b-2xl">
          <div className="py-[15px] w-full flex gap-[9px] items-center">
              <span className="pr-[9px] text-[18px] leading-[19.91px] border-r">
                WALLET
              </span>
              <span className="flex gap-[9px] items-center">
                <BitcoinIcon />
                <span>0.1293129BTC</span>
                <span className="text-[#5F5A72]">$235.12</span>
              </span>
          </div>
          <Link
            href="/"
            className="py-2 inline-block w-full text-[18px] leading-[19.91px] bg-[#1F2128] text-center rounded-lg"
          >
            WITHDRAW
          </Link>
          <ul className="mt-6 pt-6 flex flex-col gap-6 border-t-2 border-[#5F5A72]">
            {data.map((crypto) => (
              <li key="cryto" className="flex gap-[9px] items-center">
                {crypto.icon}
                <span>{crypto.amount}</span>
                <span className="text-[#5F5A72]">{crypto.valueInDollars}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Wallet;
