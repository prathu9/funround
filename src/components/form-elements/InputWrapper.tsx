import { inter } from "@/fonts/fonts";
import Image from "next/image";
import { ReactNode } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

type InputWrapperPropsType = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
leftIcon?: string;
rightIcon?: string;
errorMessage? :string;
  registerOptions?: RegisterOptions;
};

const InputWrapper = ({
  label,
  name,
  type,
  placeholder,
  registerOptions,
  leftIcon,
  rightIcon,
  errorMessage
}: InputWrapperPropsType) => {
  const { register } = useFormContext();

  return (
    // container for input and label
    <div>
      {/* input Label */}
      <label
        className={`mb-2 flex justify-between text-xs font-medium text-[#808191] ${inter.className}`}
      >
        <span>{label}</span>
        <span className="text-[#F24D4D]">{errorMessage}</span>
      </label>
      {/* container for input */}
      <div className="relative">
        {/* container for icon */}
        {/* checking if icon exists */}
        {leftIcon && (
          <div className="absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6">
            <Image src={leftIcon} width="100" height="100" alt="icon" />
          </div>
        )}
        {rightIcon && (
          <div className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 cursor-pointer">
            <Image src={rightIcon} width="100" height="100" alt="icon" />
          </div>
        )}
        {/* input */}
        <input type={type} placeholder={placeholder} {...register(name, registerOptions)} className={`min-w-full min-h-[53.93x] w-full p-4 text-sm placeholder-white bg-[#35353E] rounded-lg sm:min-h-[51.96px]
          ${leftIcon && "pl-[50px]"}`} />
      </div>
    </div>
  );
};

export default InputWrapper;
