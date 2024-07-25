import { pages } from "next/dist/build/templates/app-page";
import { Archivo } from "next/font/google";
import Image from "next/image";

const archivo = Archivo({subsets: ['latin']});

export default function Home() {
  return (
    // container for home pages
    <main className={`pt-[155px] px-[120px] pb-[139px] flex justify-between ${archivo.className}`}>
      {/* container for title and buttons */}
      <div className="basis-[37.86%]">
        {/* subtitle */}
          <h3 className="mb-4 text-[#B4A1FF] text-2xl font-bold">WELCOME TO FUNROUND BETA</h3>
        {/* title */}
        <h1 className="font-black text-[70px] leading-[77.42px] tracking-[0.04em]">PLAY, WIN, TAKE PROFIT.</h1>
        {/* decription */}
        <p className="mt-3 w-[79%] text-[32px] leading-[34.82px]">
          Here you can play mini-games agains players around the world, bet on
          crypto, and win the pot.
        </p>
        {/* container for buttons */}
        <div className="mt-12 flex gap-8 text-2xl leading-[26.54px] ">
          {/* play button */}
          <button className="px-[72.5px] py-[36.5px] rounded-lg font-bold tracking-[0.04em]">
            LET'S PLAY
          </button>
          {/* learn more button */}
          <button className="px-12 py-[36.5px] rounded-lg tracking-[0.04em] bg-[#353535]/[40%]">
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
        </div>
      </div>
    </main>
  );
}
