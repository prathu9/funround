import { inter } from "@/fonts/fonts";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

type InputPasswordWrapperPropsType = {
  label: string;
  name: string;
  placeholder: string;
rightIcon?: string;
  registerOptions?: RegisterOptions;
};

const InputPasswordWrapper = ({
  label,
  name,
  placeholder,
  registerOptions,
  rightIcon,
}: InputPasswordWrapperPropsType) => {
    const [type, setType] = useState("password");
  const { register } = useFormContext();

  const toggleType = () => {
    if(type === "password"){
        setType("text");
    }
    else{
        setType("password");
    }
  }

  return (
    // container for input and label
    <div>
      {/* input Label */}
      <label
        className={`mb-2 inline-block text-xs font-medium text-[#808191] ${inter.className}`}
      >
        {label}
      </label>
      {/* container for input */}
      <div className="relative">
        {/* container for icon */}
        {/* checking if icon exists */}
        {rightIcon && (
          <div onClick={toggleType} className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 cursor-pointer">
            <Image src={rightIcon} width="100" height="100" alt="icon" />
          </div>
        )}
        {/* input */}
        <input type={type} placeholder={placeholder} {...register(name, registerOptions)} className={`min-w-full w-full p-4 text-sm placeholder-white bg-[#35353E] rounded-lg`} />
      </div>
    </div>
  );
};

export default InputPasswordWrapper;
