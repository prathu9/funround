import GradientButton from "@/components/GradientButton";
import { archivo, inter, poppins } from "@/fonts/fonts";
import { pages } from "next/dist/build/templates/app-page";
import Image from "next/image";


export default function Home() {
  return (
    // container for home pages
    <main className={`pt-[155px] px-[120px] pb-[139px] flex justify-between items-center ${archivo.className}`}>
      {/* container for title and buttons */}
      <div className="basis-[37.86%]">
        {/* subtitle */}
          <h3 className="mb-4 text-[#B4A1FF] text-2xl font-bold">WELCOME TO FUNROUND BETA</h3>
        {/* title */}
        <h1 className="relative font-black text-[70px] leading-[77.42px] tracking-[0.04em]">
          PLAY, WIN, TAKE PROFIT.
          {/* container for crown image */}
          <div className="w-[60px] h-[58px] absolute -top-[25px] right-[34%]">
            <Image src="/crown-icon.svg" width="100" height="100"  alt="icon" />
          </div>
        </h1>
        {/* decription */}
        <p className="mt-3 w-[79%] text-[32px] leading-[34.82px]">
          Here you can play mini-games agains players around the world, bet on
          crypto, and win the pot.
        </p>
        {/* container for buttons */}
        <div className="mt-12 flex gap-8 text-2xl leading-[26.54px] ">
          {/* play button */}
          <GradientButton className="px-[72.5px] py-[36.5px] rounded-2xl font-bold tracking-[0.04em]">
            LET'S PLAY
          </GradientButton>
          {/* learn more button */}
          <button className="px-12 py-[36.5px] rounded-2xl tracking-[0.04em] bg-[#353535]/[40%] hover:bg-[#717171]/[66%]">
            LEARN MORE
          </button>
        </div>
      </div>
      {/* Container for cover image and text */}
      <div className="basis-[46.73%]">
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
            <div className={`${poppins.className} my-[5px] w-[53%] text-[32px] leading-[48px]`}>
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
