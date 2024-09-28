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
      <div className="pt-[50px] basis-full text-center lg:basis-[50%] lg:pl-8 lg:text-left lg:pt-[240px] xl:pl-[120px]">
        {/* subtitle */}
        <h3 className="mb-2 text-[#B4A1FF] text-xs font-bold md:text-[1.25vw] md:text-2xl">
          WELCOME TO FUNROUND BETA
        </h3>
        {/* title */}
        <h1 className="font-black text-[21px] leading-[23.23px] md:text-[32px] md:leading-[34px] lg:text-[2.5vw] lg:leading-[2.76vw] md:tracking-[0.04em]">
          Play mini-games against<br/> real players,{" "}
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
        <p className="mt-[34px] mx-auto w-full text-lg md:w-[69%] md:text-[1.25vw] md:leading-[1.35vw] lg:mx-0">
          We’ve created the ultimate competition - 60 seconds race between you and real players around the world. the winner takes the bet!
        </p>
        {/* container for buttons */}
        <div className="my-12 flex items-center text-center gap-8 text-2xl leading-[26.54px] flex-col flex-wrap xl:flex-row lg:items-start lg:mb-0">
          {/* play button */}
          {/* <GradientButton as="link" link="/play-live" className="min-w-[181px] w-[48%] px-[51px] py-[26px] text-sm rounded-2xl font-bold tracking-[0.04em] whitespace-nowrap md:text-[1.25vw] md:max-w-none md:px-[3.8vw] md:py-[1.9vw]">
            LET'S PLAY
          </GradientButton> */}
          <Link href="/play-live" className="grad px-[65px] py-[24px] border-4 border-white outline outline-[#AB97FF] text-[32px] font-black rounded-full drop-shadow-lg duration-500 hover:text-[#503CC6]">
            Let's Play
          </Link>
          {/* learn more button */}
          <Link href="/learn-more" className="px-[90px] py-[28px] bg-white text-[#503CC6] rounded-full duration-500 hover:bg-gray-400 xl:px-12">
            Learn More
          </Link>
        </div>
      </div>
      {/* Container for cover image and text */}
      <div className="relative flex justify-center items-center bg-[rgba(255,255,255)]/[0.6] basis-full overflow-hidden rounded-t-3xl lg:rounded-none lg:basis-[50%]">
            <div className="relative w-[65.6%] aspect-square">
              <Image src="/cover-img.png" fill className="object-cover" alt="cover"/>
            </div>
            <div className="absolute w-full aspect-[1.79] z-[-1] lg:h-full lg:w-auto">
              <video className="w-full h-full" autoPlay muted loop>
                <source src="/bg-vid.mov" type="video/mp4"/>
              </video>
            </div>
      </div>
    </main>
  );
}
