import GradientButton from "@/components/GradientButton";
import { archivo, inter, poppins } from "@/fonts/fonts";
import { pages } from "next/dist/build/templates/app-page";
import Image from "next/image";


export default function Home() {
  return (
    // container for home pages
    <main className={`px-6 pt-8 pb-[120px] flex flex-wrap justify-between items-center gap-y-8 md:py-12 lg:px-[120px] lg:flex-nowrap ${archivo.className}`}>
      {/* container for title and buttons */}
      <div className="basis-full text-center lg:basis-[37.86%] lg:text-left">
        {/* subtitle */}
          <h3 className="mb-4 text-[#B4A1FF] text-sm leading-[1.36vw] font-bold md:text-[1.25vw] md:text-sm">WELCOME TO FUNROUND BETA</h3>
        {/* title */}
        <h1 className="relative font-black text-[32px] md:text-[3.6vw] md:leading-[4.03vw] md:tracking-[0.04em]">
          PLAY, WIN, TAKE PROFIT.
          {/* container for crown image */}
          <div className="w-[60px] h-[58px] absolute -top-[25px] left-[25%]">
            <Image src="/crown-icon.svg" width="100" height="100"  alt="icon" />
          </div>
        </h1>
        {/* decription */}
        <p className="mt-3 mx-auto w-full text-lg md:w-[79%] md:text-[1.6vw] md:leading-[1.8vw] lg:mx-0">
          Here you can play mini-games agains players around the world, bet on
          crypto, and win the pot.
        </p>
        {/* container for buttons */}
        <div className="mt-12 flex items-center text-center gap-8 text-2xl leading-[26.54px] flex-col md:flex-row lg:items-start">
          {/* play button */}
          <GradientButton className="min-w-[181px] w-[48%] px-[51px] py-[26px] text-sm rounded-2xl font-bold tracking-[0.04em] md:text-[1.25vw] md:max-w-none md:px-[3.8vw] md:py-[1.9vw]">
            LET'S PLAY
          </GradientButton>
          {/* learn more button */}
          <button className="min-w-[181px] w-[48%] px-[51px] py-[26px]  rounded-2xl text-sm tracking-[0.04em] whitespace-nowrap bg-[#353535]/[40%] hover:bg-[#717171]/[66%] md:px-[2.5vw] md:py-[1.9vw] md:text-[1.25vw] md:max-w-none">
            LEARN MORE
          </button>
        </div>
      </div>
      {/* Container for cover image and text */}
      <div className="basis-full md:basis-[46.73%]">
        {/* container for cover image */}
        <div className="relative w-full aspect-[1.4]">
          {/* cover image */}
          <Image  src="/cover-img.png" fill alt="cover"/>
          {/* container of image caption */}
          <div className={`absolute top-[46.42%] left-[8.2%] flex flex-col justify-start ${inter.className}`}>
            {/* Beta badge */}
            <div className="pt-[6px] px-2 py-1 w-[49px] flex justify-center items-center font-medium text-[13px] leading-[18px] rounded-lg bg-[#FF754C]">
                BETA
            </div>
            {/* container for caption text */}
            <div className={`${poppins.className} my-[5px] w-[80%] text-[20px] leading-[30px] sm:w-[57%] sm:text-[1.6vw] sm:leading-[2.6vw]`}>
              {/* caption title */}
              <h2 className="font-black">Crypto roads</h2>
              {/* caption description */}
              <p>
                Go fast, go long, you only have 60 seconds!
              </p>
            </div>
            {/* caption button */}
            <button className="max-w-[137px] px-8 py-4 bg-[#6C5DD3] whitespace-nowrap rounded-2xl">
              Play Demo
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
