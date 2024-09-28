import Image from "next/image";
import Link from "next/link";

const HomeFooter = () => {
  return (
    // container for footer
    <div className="w-full px-8 py-[20px] bottom-0 flex border-t border-white justify-between gap-10 md:justify-normal lg:absolute xl:px-[120px] lg:gap-10 xl:gap-[99px]">
      {/* Container for footer logo */}
      <div className="w-[91px] h-[38.95px]">
        <Link href="/">
          <Image
            src="/logo.svg"
            width="100"
            height="100"
            className="object-cover"
            alt="logo"
          />
        </Link>
      </div>
      {/* Container for footer right content */}
      <div className="flex flex-wrap justify-end gap-2 items-center text-lg tracking-[0.04em] md:justify-start md:flex-nowrap md:gap-5 lg:gap-10 xl:gap-[99px]">
        {/* Container for footer nav */}
        <ul className="flex gap-10 xl:gap-[99px]">
          <li className="hidden gap-8 lg:flex text-xs sm:text-lg">
            <Link href="/learn-more">About FunRound</Link>
          </li>
          <li className="flex gap-8 text-xs sm:text-lg">
            <Link href="/">Privacy policy</Link>
          </li>
          <li className="flex gap-8 text-xs sm:text-lg">
            <Link href="/terms-of-use">Terms of use</Link>
          </li>
        </ul>
        {/* Container for footer copyright text */}
        <div className="text-[#545867] text-xs sm:text-lg">
          FunRound ©2024 All rights reserved
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
