import Image from "next/image";


const Header = () => {
    return(
        // header
        <div className="px-[120px] py-8 flex justify-between items-center">
            {/* container for header left content */}
            <div className="flex gap-4">
                {/* logo container */}
                <div className="w-[72px] h-[29px]">
                    {/* logo */}
                    <Image src="/logo.svg" width={100} height={100} className="object-cover"  alt="logo" priority />
                </div>
                {/* Beta badge */}
                <div className="px-2 py-1 flex justify-center items-center font-medium text-[13px] leading-[18px] rounded-lg bg-[#FF754C]">
                    BETA
                </div>
            </div>
            {/* container for header right content */}
            <div className="flex items-center gap-8  text-sm">
                {/* header right text */}
                <div className="font-semibold">
                    We Are FunRound
                </div>
                {/* login button */}
                <button className="p-6 flex gap-[7px] rounded-2xl bg-btn-gradient-1">
                    {/* container for login button icon */}
                    <div className="w-5 h-5">
                        {/* login button icon */}
                        <Image src="/account-icon.svg" width="100" height="100" className="object-cover" alt="icon" />
                    </div>
                    {/* login button text */}
                    <div className="font-bold">
                     Login / Sign up 
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Header;