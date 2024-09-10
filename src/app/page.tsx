"use client";
import GradientButton from "@/components/form-elements/GradientButton";
import { RouterContext } from "@/context/router-context";
import { archivo, inter, poppins } from "@/fonts/fonts";
import { pages } from "next/dist/build/templates/app-page";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const {setParentRoute} = useContext(RouterContext); // setParentRoute from router context to update parent route

  useEffect(() => {
    setParentRoute("/"); // setting parent route to current route
  },[setParentRoute])


  return (
    // container for home pages
    <main
      className="min-h-[calc(100vh_-_216px)] px-6 pt-8 pb-[120px] flex flex-wrap justify-center items-center gap-y-8 md:py-12 md:px-[40px] xl:px-[120px] lg:flex-nowrap lg:justify-between"
    >
      {/* container for title and buttons */}
      <div className="basis-full text-center lg:basis-[37.86%] lg:text-left">
        {/* subtitle */}
        <h3 className="mb-4 text-[#B4A1FF] text-sm font-bold md:text-[1.25vw] md:text-sm">
          WELCOME TO FUNROUND BETA
        </h3>
        {/* title */}
        <h1 className="font-black text-[32px] md:text-[3.6vw] md:leading-[4.03vw] md:tracking-[0.04em]">
          PLAY,{" "}
          <span className="relative">
            WIN
            {/* container for crown image */}
            <span className="w-[38%] aspect-[1.034] absolute top-[2px] right-[4px] -translate-y-1/2 translate-x-1/2 lg:top-[5px] lg:right-[8px] ">
              <Image
                src="/crown-icon.svg"
                width="100"
                height="100"
                alt="icon"
              />
            </span>
          </span>
          , TAKE PROFIT.
        </h1>
        {/* decription */}
        <p className="mt-3 mx-auto w-full text-lg md:w-[79%] md:text-[1.6vw] md:leading-[1.8vw] lg:mx-0">
          Here you can play mini-games agains players around the world, bet on
          crypto, and win the pot.
        </p>
        {/* container for buttons */}
        <div className="mt-12 flex items-center text-center gap-8 text-2xl leading-[26.54px] flex-col md:flex-row lg:items-start">
          {/* play button */}
          <GradientButton as="link" link="/play-live" className="min-w-[181px] w-[48%] px-[51px] py-[26px] text-sm rounded-2xl font-bold tracking-[0.04em] whitespace-nowrap md:text-[1.25vw] md:max-w-none md:px-[3.8vw] md:py-[1.9vw]">
            LET'S PLAY
          </GradientButton>
          {/* learn more button */}
          <Link href="/learn-more" className="min-w-[181px] w-[48%] py-[26px]  rounded-2xl text-sm tracking-[0.04em] whitespace-nowrap bg-[#353535]/[40%] hover:bg-[#717171]/[66%] md:px-[2.5vw] md:py-[1.9vw] md:text-[1.25vw] md:max-w-none">
            LEARN MORE
          </Link>
        </div>
      </div>
      {/* Container for cover image and text */}
      <div className="basis-full md:basis-[46.73%]">
        {/* container for cover image */}
        <div className="relative w-full aspect-[1] border-[6px] border-[#FFCF03] rounded-3xl overflow-hidden sm:aspect-[1.4]">
          {/* cover image */}
          <Image src="/cover-img.png" className="object-cover object-[50%_-50%] -z-10" fill alt="cover" />
          {/* container of image caption */}
          <div
            className={`w-full absolute bottom-[10px] left-0 flex flex-col justify-center items-center lg:bottom-[40px] ${inter.className}`}
          >
            {/* container for caption text */}
            <div
              className={`${poppins.className} w-[80%] mb-3 sm:mb-5`}
            >
              {/* caption description */}
              <p className="text-xs text-center sm:text-lg">Go fast, go long, you only have 60 seconds!</p>
            </div>
            {/* caption button */}
            <Link href="/demo-play" className="max-w-[137px] px-8 py-4 text-sm bg-[#6C5DD3] whitespace-nowrap rounded-2xl ">
              Play Demo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
