import Image from "next/image";
import Link from "next/link";
import { Archivo } from "next/font/google";

const archivo = Archivo({subsets: ['latin']});

const Footer = () => {
    return(
        // Footer container
        <div className="px-[120px] py-[20.52px] flex justify-between border-t border-white">
            {/* Container for footer logo */}
            <div className="w-[91px] h-[38.95px]">
                <Image src="/logo.svg" width="100" height="100" className="object-cover" alt="logo" />
            </div>
            {/* Container for footer right content */}
            <div className={`flex gap-12 text-lg tracking-[0.04em] ${archivo.className}`}>
                {/* Container for footer nav */}
                <ul className="flex gap-8">
                    <li className="flex gap-8">
                        <Link href="/">
                            About FunRound
                        </Link>
                    </li>
                    <li className="flex gap-8">
                        <Link href="/">
                            Privacy policy
                        </Link>
                    </li>
                    <li className="flex gap-8">
                        <Link href="/">
                            Terms of use
                        </Link>
                    </li>
                </ul>
                {/* Container for footer copyright text */}
                <div className="text-[#545867]">
                    FunRound ©2024 All rights reserved
                </div>
            </div>
        </div>
    )
}

export default Footer;