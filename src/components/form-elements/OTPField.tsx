import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const OTPField = () => {
    const inputRef:React.MutableRefObject<HTMLInputElement|null> = useRef<HTMLInputElement|null>(null);
    const [OTP, setOTP] = useState("");

    useEffect(() => {
        if(inputRef.current){
            inputRef.current?.addEventListener("input", (e: Event) => {

                const value = (e.target as HTMLInputElement).value;
                // if(value && OTP.length <= 4){
                //     setOTP(OTP+value);
                //     console.log(e.target.nextSibling)
                //     if()
                //     inputRef.current = e.target.nextSibling;
                //     inputRef.current.focus();
                // }
            })
        }
       
    },[OTP, inputRef])

    const handleClick = () => {
        if(inputRef.current){
        inputRef.current!.focus()
        }
    }

    return(
        <div onClick={handleClick} className="p-4 flex justify-between bg-[#35353E] rounded-lg">
            <div className="flex gap-2">
                <input ref={inputRef} type="password" className="inline-block w-3 bg-transparent border-b-2 border-white outline-none text-center"/>
                <input type="password" className="inline-block w-3 bg-transparent border-b-2 border-white outline-none text-center"/>
                <input type="password" className="inline-block w-3 bg-transparent border-b-2 border-white outline-none text-center"/>
                <input type="password" className="inline-block w-3 bg-transparent border-b-2 border-white outline-none text-center"/>
            </div>
            <div className="w-6 h-6 cursor-pointer">
                <Image src="/eye-off-icon.svg" width="100" height="100" alt="icon" />
            </div>
        </div>
    )
}

export default OTPField;