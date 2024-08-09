import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import EyeOffIcon from "/public/eye-off-icon.svg";

const OTPField = () => {
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement | null>(null);
  const [OTP, setOTP] = useState("");
  const [type, setType] = useState<"password"|"text">("password");

  const toggleType = () => {
    setType(type === "password" ? "text" : "password");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.addEventListener("input", (e: Event) => {
        const value = (e.target as HTMLInputElement).value;
        // if(value && OTP.length <= 4){
        //     setOTP(OTP+value);
        //     console.log(e.target.nextSibling)
        //     if()
        //     inputRef.current = e.target.nextSibling;
        //     inputRef.current.focus();
        // }
      });
    }
  }, [OTP, inputRef]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    inputRef.current = event.currentTarget as HTMLInputElement;
    if (inputRef.current) {
      inputRef.current!.focus();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 flex justify-between bg-[#35353E] rounded-lg"
    >
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="password"
          maxLength={1}
          className="inline-block w-3 bg-transparent border-b-2 border-white outline-none text-center"
        />
        <input
          type="password"
          maxLength={1}
          className="inline-block w-3 bg-transparent border-b-2 border-white outline-none text-center"
        />
        <input
          type="password"
          maxLength={1}
          className="inline-block w-3 bg-transparent border-b-2 border-white outline-none text-center"
        />
        <input
          type="password"
          maxLength={1}
          className="inline-block w-3 bg-transparent border-b-2 border-white outline-none text-center"
        />
      </div>
      <button type="button" onClick={toggleType} className="w-6 h-6 cursor-pointer">
        {type === "password" ? <EyeOffIcon /> : <FaRegEye size={24} />}
      </button>
    </div>
  );
};

export default OTPField;
