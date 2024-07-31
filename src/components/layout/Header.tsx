"use client";
import Image from "next/image";
import GradientButton from "../form-elements/GradientButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import { archivo } from "@/fonts/fonts";

const Header = () => {
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
  }

  return (
    // header
    <div className="p-8 flex justify-between items-center shadow-[inset_0_-1px_0_0_rgba(228,228,228,0.1)] md:px-[40px] xl:px-[120px]">
      {/* container for header left content */}
      <div className="basis-full flex justify-between items-center flex-row-reverse gap-4 sm: sm:flex-row sm:basis-auto">
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
        {/* Beta badge */}
        <div className="px-2 py-1 flex justify-center items-center font-medium text-[13px] leading-[18px] rounded-lg bg-[#FF754C]">
          BETA
        </div>
        {/* Menu container */}
        <div
          onClick={toggleMobileMenu}
          className="w-8 h-[10px] block cursor-pointer sm:hidden"
        >
          <Image src="/menu-icon.svg" width="100" height="100" alt="menu" />
        </div>
        <ul
          className={`mt-[92.98px] p-8 flex gap-6 flex-col absolute top-0 left-0 w-screen h-[calc(100vh_-_92.98px)] bg-[#242731] z-10 transition-all ${
            showMobileMenu ? "-translate-x-0" : "-translate-x-full"
          }  sm:hidden ${archivo.className}`}
        >
          <li>
            <Link href="/" onClick={hideMenu}>Login</Link>
          </li>
          <li>
            <Link href="/signup" onClick={hideMenu}>Register</Link>
          </li>
        </ul>
      </div>
      {/* container for header right content */}
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
    </div>
  );
};

export default Header;
