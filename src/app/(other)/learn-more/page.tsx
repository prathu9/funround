"use client";
import { RouterContext } from "@/context/router-context";
import Image from "next/image";
import { useContext, useEffect } from "react";

// learn more page
const LearnMorePage = () => {
  const {setParentRoute} = useContext(RouterContext); // parent route context to set parent route of current open modal

  useEffect(() => {
    setParentRoute("/learn-more"); // set learn-more as parent route when page loads
  },[setParentRoute])


  return (
    // container for Learn more page
    <div className="mt-[62px] px-6 h-full sm:px-10 lg:px-[99px]">
      {/* container for title, description and image */}
      <div className="mb-16 flex flex-wrap gap-8 sm:gap-[8.7%] sm:flex-nowrap">
        {/* container for title description */}
        <div className="basis-full sm:basis-[57.9%]">
          {/* title */}
          <h3 className="mb-4 text-[20px] leading-[22.12px] font-extrabold text-[#B4A1FF] sm:text-[1vw] sm:leading-[1.2vw] sm:mb-0">
            WELCOME TO FUNROUND
          </h3>
          {/* subtitle */}
          <h1 className="mb-8 text-[32px] leading-[35.39px] font-black sm:text-[3.6vw] sm:leading-[4vw] ">
            THE ULTIMATE CRYPTO GAMING EXPERIENCE
          </h1>
          {/* description */}
          <p>
            Dive into the thrilling world of FunRound, where gaming meets
            cryptocurrency. Challenge real players in fast-paced 60-second
            minigames, bet with your favorite cryptocurrencies, and win big.
            With our first game, Blockchain Roads, you’ll navigate through
            obstacles and compete for the highest score to claim the pot. Join
            now and experience a new way to play and earn in the crypto space!
          </p>
        </div>
        {/* container for image */}
        <div className="relative basis-full aspect-[1.85] rounded-2xl overflow-hidden sm:basis-[33%]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgb(47, 48, 49)] to-transparent z-10"/>
          <Image
            src="/learn-more-cover.png"
            className="object-cover object-[0%_20%]"
            fill
            alt="cover"
          />
        </div>
      </div>
      {/* container for feature information */}
      <div className="my-12 flex gap-[10px] flex-wrap lg:flex-nowrap">
        {/* container for feature instant bets */}
        <div className="basis-full p-12 bg-[#333642] rounded-2xl lg:basis-[35%]">
          {/* title of instant bets */}
          <h2 className="mb-[10px] text-2xl font-semibold lg:text-[1.25vw] lg:leading-[1.38vw]">Instant Bets</h2>
          {/* description for instant bets */}
          <p className="text-2xl lg:text-[1.25vw] lg:leading-[1.38vw]">
            Place your bets in real-time with our seamless betting system.
            Choose from fixed amounts and compete in quick, exciting matches.
          </p>
        </div>
        {/* container for feature secret wallets */}
        <div className="basis-full p-12 bg-[#333642] rounded-2xl lg:basis-[35%]">
          {/* title for secure wallets */}
          <h2 className="mb-[10px] text-2xl font-semibold lg:text-[1.25vw] lg:leading-[1.38vw]">Secure Wallets</h2>
          {/* description for secure wallets */}
          <p className="text-2xl lg:text-[1.25vw] lg:leading-[1.38vw]">
            Enjoy peace of mind with secure, automated wallet creation. Deposit,
            manage, and withdraw your funds easily within the platform.
          </p>
        </div>
        {/* container for feature top currency */}
        <div className="basis-full p-12 bg-[#333642] rounded-2xl lg:basis-[35%]">
          {/* title for top currency */}
          <h2 className="mb-[10px] text-2xl font-semibold lg:text-[1.25vw] lg:leading-[1.38vw]">Top Currency</h2>
          {/* description for top currency */}
          <p className="text-2xl lg:text-[1.25vw] lg:leading-[1.38vw]">
            Bet and win with the most popular cryptocurrencies, including
            Bitcoin, Ethereum, Solana, and more. Expand your crypto portfolio
            while having fun.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnMorePage;
