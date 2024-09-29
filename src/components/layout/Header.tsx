"use client";
import Image from "next/image";
import GradientButton from "../form-elements/GradientButton";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { archivo } from "@/fonts/fonts";
import { UserContext } from "@/context/user-context";
import WalletBalance from "../wallet-setup/wallet-balance/WalletBalance";
import MobileHeader from "./MobileHeader";


// header component
const Header = () => {


  return (
    <>
      {/* header for desktop screen */}
      <DesktopHeader  />
      {/* header for mobile screen */}
      <MobileHeader />
    </>
  );
};

// header for desktop screen
const DesktopHeader = () => {
  const {
    userDetail: { email, emailVerified },
  } = useContext(UserContext);

  return (
    // container for desktop header
    <div className="hidden px-[40px] py-4 justify-between items-center shadow-[inset_0_-1px_0_0_rgba(228,228,228,0.1)] bg-[#242731] xl:px-[120px] sm:flex">
      {/* container for logo and meta tag */}
      <div className="flex items-center gap-4">
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
        {/* container for beta tag */}
        <div className="px-2 py-1 flex justify-center items-center font-medium text-[13px] leading-[18px] rounded-lg bg-[#FF754C]">
          BETA
        </div>
      </div>
     
      {email && emailVerified ? (
         // container for header right content when logged in
        <>
          {/* wallet balance component */}
          <WalletBalance/>
          {/* profile image with link */}
          <Link href="/profile" className="w-12 h-12">
            <Image src="/avatar.svg" width="100" height="100" alt="avatar" />
          </Link>
        </>
      ) : (
        // container for header right content when logged out
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

export default Header;
