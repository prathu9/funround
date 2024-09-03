import { archivo } from "@/fonts/fonts";
import Image from "next/image";
import Link from "next/link";

// footer component
const Footer = () => {
    return(
        // Footer container
        <div className="px-8 py-[20.52px] flex justify-between border-t border-white md:px-[40px] xl:px-[120px]">
            {/* Container for footer logo */}
            <div className="w-[91px] h-[38.95px]">
                <Link href="/">
                    <Image src="/logo.svg" width="100" height="100" className="object-cover" alt="logo" />
                </Link>
            </div>
            {/* Container for footer right content */}
            <div className={`flex flex-wrap gap-2 justify-end text-lg tracking-[0.04em] md:flex-nowrap md:gap-12 ${archivo.className}`}>
                {/* Container for footer nav */}
                <ul className="flex gap-[10px] lg:gap-8">
                    <li className="hidden gap-8 lg:flex text-xs sm:text-lg">
                        <Link href="/learn-more">
                            About FunRound
                        </Link>
                    </li>
                    <li className="flex gap-8 text-xs sm:text-lg">
                        <Link href="/">
                            Privacy policy
                        </Link>
                    </li>
                    <li className="flex gap-8 text-xs sm:text-lg">
                        <Link href="/terms-of-use">
                            Terms of use
                        </Link>
                    </li>
                </ul>
                {/* Container for footer copyright text */}
                <div className="text-[#545867] text-xs sm:text-lg">
                    FunRound ©2024 All rights reserved
                </div>
            </div>
        </div>
    )
}

export default Footer;