"use client";
import { UserContext } from "@/context/user-context";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import WalletBalance from "../wallet-setup/wallet-balance/WalletBalance";
import { archivo } from "@/fonts/fonts";

// header for mobile screen
export const MobileHeader = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false); // state to toggle mobile nav

  const {
    userDetail: { email, emailVerified },
  } = useContext(UserContext);

  // hide overflow when mobile menu open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showMobileMenu]);

  // toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // hide mobile menu
  const hideMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    // container for mobile header
    <div className="p-8 flex items-center justify-between shadow-[inset_0_-1px_0_0_rgba(228,228,228,0.1)] bg-[#242731] sm:hidden">
      {email && emailVerified ? (
        // Header Mobile view when logged in
        <>
          <WalletBalance />
          <Link href="/profile" className="w-10 h-10">
            <Image src="/avatar.svg" width="100" height="100" alt="avatar" />
          </Link>
        </>
      ) : (
        // Header Mobile view when logged out
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
            {/* container for login link */}
            <li>
              {/* login link */}
              <Link href="/login" onClick={hideMenu}>
                Login
              </Link>
            </li>
            {/* container for register link */}
            <li>
              {/* register link */}
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
          <Link href="/" className="w-[72px] h-[29px]">
            {/* logo */}
            <Image
              src="/logo.svg"
              width={100}
              height={100}
              className="object-cover"
              alt="logo"
              priority
            />
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileHeader;
