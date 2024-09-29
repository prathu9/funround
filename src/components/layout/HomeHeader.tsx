import Image from "next/image";
import Link from "next/link";
import MobileHeader from "./MobileHeader";


const HomeHeader = () => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader/>
    </>
  );
};

const DesktopHeader = () => {
  return (
    // container for header
    <div className="hidden px-8 py-[30px] w-full h-[136px]  justify-between items-center z-10 lg:absolute sm:flex xl:px-[120px]">
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
      {/* container for login and signup button */}
      <div>
        {/* login button */}
        <Link
          href="/signup"
          className="px-12 p-[25px] bg-[white] text-[#503CC6] rounded-full text-2xl font-bold"
        >
          Login | Register
        </Link>
      </div>
    </div>
  );
};


export default HomeHeader;
