import { inter } from "@/fonts/fonts";
import Image from "next/image";
import { ReactElement, ReactNode } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

//  input wrapper props type
type InputWrapperPropsType = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  leftIcon?: string | ReactElement;
  rightIcon?: string | ReactElement;
  errorMessage?: string;
  registerOptions?: RegisterOptions;
  defaultValue?: string|number;
};

// input wrapper
const InputWrapper = ({
  label,
  name,
  type,
  placeholder,
  registerOptions,
  leftIcon,
  rightIcon,
  errorMessage,
  defaultValue
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
        {/* display error message */}
        {errorMessage && <span className="text-[#F24D4D]">{errorMessage}</span>}
      </label>
      {/* container for input */}
      <div className="relative">
        {/* checking if left icon exists */}
        {leftIcon && (
          //  container for left icon 
          <div className="absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
            {leftIcon}
          </div>
        )}
         {/* checking if right icon exists */}
        {rightIcon && (
          // container for right icon
          <div className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 cursor-pointer flex items-center justify-center">
            {rightIcon}
          </div>
        )}
        {/* input */}
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(name, registerOptions)}
          className={`min-w-full min-h-[53.93x] w-full p-4 text-sm placeholder-white bg-[#35353E] rounded-lg outline-none sm:min-h-[51.96px] ${
            errorMessage && "border border-[#F24D4D]"
          }
          ${leftIcon && "pl-[50px]"}`}
        />
      </div>
    </div>
  );
};

export default InputWrapper;
