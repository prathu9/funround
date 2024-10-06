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
      className="min-h-screen flex flex-wrap items-stretch lg:flex-nowrap"
    >
      {/* container for title and buttons */}
      <div className="relative pt-[50px] basis-full flex justify-center flex-col text-center lg:basis-[50%] lg:pl-8 lg:text-left lg:py-0 xl:pl-[120px]">
        {/* subtitle */}
        <h3 className="mb-2 text-[#B4A1FF] text-xs font-bold md:text-[1.25vw] md:text-2xl customlg:text-sm">
          WELCOME TO FUNROUND BETA
        </h3>
        {/* title */}
        <h1 className="mx-auto max-w-[90%] font-black text-[21px] leading-[23.23px] lg:mx-0 md:text-[32px] md:leading-[34px] lg:text-[2.5vw] lg:leading-[2.76vw] md:tracking-[0.04em] customlg:text-xl">
          Play mini-games against real players,{" "}
          <span className="relative">
            win
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
           {" "}crypto.
        </h1>
        {/* decription */}
        <p className="mt-[34px] mx-auto w-[90%] text-lg md:w-[69%] lg:text-[1.25vw] lg:leading-[1.35vw] lg:mx-0 customlg:text-lg">
          We’ve created the ultimate competition - 60 seconds race between you and real players around the world. the winner takes the bet!
        </p>
        {/* container for buttons */}
        <div className="my-12 customlg:my-5 flex items-center text-center gap-8 text-2xl leading-[26.54px] flex-col flex-wrap xl:flex-row lg:items-start lg:mb-0 customlg:flex-row">
          {/* play button */}
          <Link href="/play-live" className="relative px-[65px] py-[24px] border-4 border-white outline outline-[#AB97FF] text-[32px]  font-black rounded-full z-[1] duration-500 bg-btn-gradient-2 hover:bg-btn-gradient-hover-2 text-shadow-btn-text hover:text-shadow-btn-text-hover hover:text-[#503CC6] customlg:px-[40px] customlg:py-[14px] customlg:text-[24px]">
            Let's Play
          </Link>
          {/* learn more button */}
          <Link href="/learn-more" className="relative px-[90px] py-[28px] bg-white text-[#503CC6] text-[24px] leading-[26.44px]  rounded-full z-[1] duration-500 hover:bg-gray-400 xl:px-12 customlg:px-[40px] customlg:py-[18px]">
            Learn More
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/cover-bg-pattern.png')] bg-cover -z-[1]"/>
      </div>
      {/* Container for cover image and text */}
      <div className="relative flex justify-center items-center basis-full aspect-[0.67] overflow-hidden rounded-t-3xl md:h-auto lg:rounded-none lg:basis-[50%] lg:h-screen">
            <div className="relative w-[80%] aspect-square -translate-y-28 lg:translate-y-0 md:w-[65.6%]">
              <Image src="/cover-img.png" fill className="object-cover" alt="cover"/>
            </div>
            <div className="absolute aspect-[0.67] z-[-1]">
              <video className="w-full h-full" autoPlay muted loop playsInline>
                <source src="/bg-vid.mov" type="video/mp4"/>
              </video>
            </div>
      </div>
    </main>
  );
}
