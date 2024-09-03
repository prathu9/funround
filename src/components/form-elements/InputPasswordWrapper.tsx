import { inter } from "@/fonts/fonts";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import EyeOffIcon from "/public/eye-off-icon.svg";

// passwod input wrapper props type
type InputPasswordWrapperPropsType = {
  label: string;
  name: string;
  placeholder: string;
  errorMessage?: string;
  registerOptions?: RegisterOptions;
};

// password input wrapper
const InputPasswordWrapper = ({
  label,
  name,
  placeholder,
  registerOptions,
  errorMessage,
}: InputPasswordWrapperPropsType) => {
  const [type, setType] = useState("password");
  const { register } = useFormContext();

  // toggle password field type to display password in text
  const toggleType = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    // container for input and label
    <div>
      {/* input Label */}
      <label
        className={`mb-2 flex justify-between text-xs font-medium text-[#808191] ${inter.className}`}
      >
        <span>{label}</span>
        {errorMessage && <span className="text-[#F24D4D]">{errorMessage}</span>}
      </label>
      {/* container for input */}
      <div className="relative">
        {/* container for icon */}
        {/* checking if icon exists */}
        <div
          onClick={toggleType}
          className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 cursor-pointer select-none"
        >
          {type === "password" ? <EyeOffIcon /> : <FaRegEye size={24} />}
        </div>
        {/* input */}
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, registerOptions)}
          className={`min-w-full w-full p-4 text-sm placeholder-white bg-[#35353E] rounded-lg outline-none ${errorMessage && "border border-[#F24D4D]"}`}
        />
      </div>
    </div>
  );
};

export default InputPasswordWrapper;
