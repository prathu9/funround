"use client";
import Image from "next/image";
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import { useContext } from "react";
import { UserContext } from "@/context/user-context";
import WalletBalance from "../wallet-setup/wallet-balance/WalletBalance";

const HomeHeader = () => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
};

const DesktopHeader = () => {
  const {
    userDetail: { email, emailVerified },
  } = useContext(UserContext);

  return (
    // container for header
    <div className="hidden px-8 pt-[30px] w-full h-[86px]  justify-between items-end z-10 lg:absolute sm:flex xl:px-[120px] customlg:pt-[20px] customlg:h-[50px]">
      {/* container for logo and meta tag */}
      <div className="flex items-center gap-8">
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
        <div className="px-4 py-[8px] flex justify-center items-center font-medium text-[11px] leading-[18px] rounded-lg bg-[#FF754C] rotate-[10deg]">
          BETA
        </div>
      </div>
      {email && emailVerified ? (
        // container for header right content when logged in
        <>
          {/* wallet balance component */}
          <WalletBalance />
          {/* profile image with link */}
          <Link href="/profile" className="w-12 h-12">
            <Image src="/avatar.svg" width="100" height="100" alt="avatar" />
          </Link>
        </>
      ) : (
        // container for login and signup button
        <div>
          {/* login button */}
          <Link
            href="/signup"
            className="px-12 p-[25px] bg-[white] text-[#503CC6] rounded-full text-2xl font-bold duration-500 hover:bg-gray-400 customlg:p-[18px] customlg:px-8"
          >
            Login | Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeHeader;
