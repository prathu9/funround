"use client";
import Image from "next/image";
import GradientButton from "../form-elements/GradientButton";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { archivo } from "@/fonts/fonts";
import { UserContext } from "@/context/user-context";
import WalletBalance from "../wallet-setup/wallet-balance/WalletBalance";

import { WalletContext } from "@/context/wallet-context";
import walletBalanceData from "@/data/walletBalanceData";

const Header = () => {
  const {
    userDetail: { isLoggedIn },
  } = useContext(UserContext);

  return (
    <>
      <DesktopHeader isLoggedIn={isLoggedIn} />
      <MobileHeader isLoggedIn={isLoggedIn} />
    </>
  );
};

// header for desktop screen
const DesktopHeader = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    // container for desktop header
    <div className="hidden px-[40px] py-4 justify-between items-center shadow-[inset_0_-1px_0_0_rgba(228,228,228,0.1)] bg-[#242731] xl:px-[120px] sm:flex">
      {/* container for logo and meta tag */}
      <div className="flex items-center gap-4">
        {/* logo container */}
        <div className="w-[72px] h-[29px]">
          {/* logo */}
          <Image
            src="/logo.svg"
            width={100}
            height={100}
            className="object-cover"
            alt="logo"
            priority
          />
        </div>
        {/* container for beta tag */}
        <div className="px-2 py-1 flex justify-center items-center font-medium text-[13px] leading-[18px] rounded-lg bg-[#FF754C]">
          BETA
        </div>
      </div>
      {isLoggedIn ? (
        <>
          <WalletBalance walletBalanceData={walletBalanceData} />
          <Link href="/profile" className="w-12 h-12">
            <Image src="/avatar.svg" width="100" height="100" alt="avatar" />
          </Link>
        </>
      ) : (
        // container for header right content logged in
        <div className="hidden items-center gap-8 text-sm sm:flex">
          {/* header right text */}
          <div className="font-semibold">We Are FunRound</div>
          {/* login button */}
          <GradientButton
            as="link"
            link="/signup"
            className="p-6 flex gap-[7px] rounded-2xl"
          >
            {/* container for login button icon */}
            <div className="w-5 h-5">
              {/* login button icon */}
              <Image
                src="/account-icon.svg"
                width="100"
                height="100"
                className="object-cover"
                alt="icon"
              />
            </div>
            {/* login button text */}
            <div className="font-bold">Login / Sign up</div>
          </GradientButton>
        </div>
      )}
    </div>
  );
};

const MobileHeader = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showMobileMenu]);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const hideMenu = () => {
    setShowMobileMenu(false);
  };
  return (
    <div className="px-8 py-4 flex items-center justify-between shadow-[inset_0_-1px_0_0_rgba(228,228,228,0.1)] bg-[#242731] sm:hidden">
      {isLoggedIn ? (
        // Header Mobile view when logged in
        <>
          <WalletBalance walletBalanceData={walletBalanceData} />
          <Link href="/profile" className="w-10 h-10">
            <Image src="/avatar.svg" width="100" height="100" alt="avatar" />
          </Link>
        </>
      ) : (
        // Header Mobile view when logged in
        <>
          {/* hamburger menu button container */}
          <div
            onClick={toggleMobileMenu}
            className="w-8 h-[10px] block cursor-pointer sm:hidden"
          >
            <Image src="/menu-icon.svg" width="100" height="100" alt="menu" />
          </div>
          {/* Mobile navigation */}
          <ul
            className={`mt-[61px] p-8 flex gap-6 flex-col absolute top-0 left-0 w-screen h-[calc(100vh_-_61px)] bg-[#242731] z-10 transition-all ${
              showMobileMenu ? "-translate-x-0" : "-translate-x-full"
            }  sm:hidden ${archivo.className}`}
          >
            <li>
              <Link href="/login" onClick={hideMenu}>
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" onClick={hideMenu}>
                Register
              </Link>
            </li>
          </ul>
          {/* Beta badge */}
          <div className="px-2 py-1 flex justify-center items-center font-medium text-[13px] leading-[18px] rounded-lg bg-[#FF754C]">
            BETA
          </div>
          {/* logo container */}
          <div className="w-[72px] h-[29px]">
            {/* logo */}
            <Image
              src="/logo.svg"
              width={100}
              height={100}
              className="object-cover"
              alt="logo"
              priority
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
