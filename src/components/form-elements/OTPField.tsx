import Image from "next/image";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaRegEye } from "react-icons/fa";
import EyeOffIcon from "/public/eye-off-icon.svg";
import { FieldErrors, useFormContext } from "react-hook-form";

// otp field input type
interface OTPFieldInput {
  firstDigit: string;
  secondDigit: string;
  thirdDigit: string;
  fourthDigit: string;
}

// digit names array
const digitNames: (keyof OTPFieldInput)[] = [
  "firstDigit",
  "secondDigit",
  "thirdDigit",
  "fourthDigit",
];

// otp field props type
interface OTPFieldPropsType {
  errorMessages?: FieldErrors;
}

// otp field component
const OTPField = ({ errorMessages }: OTPFieldPropsType) => {
  // const [type, setType] = useState<"password" | "text">("password");
  const { register, setFocus, setValue } = useFormContext<OTPFieldInput>(); // use form context from react hook form
  const otpContainerRef = useRef(null); // otp container element ref
  const errorMessage =
    errorMessages &&
    (errorMessages[Object.keys(errorMessages as {})[0]]?.message as string); // error message for first digit but keeps track of error in all fields since error is set manually using setError

  // const toggleType = () => {
  //   setType(type === "password" ? "text" : "password");
  // };

  // function call after input change
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;

    // check if entered value is number if not then keep field empty
    if(isNaN(+value)){
      setValue(digitNames[index], "");
      return;
    }

    // If input is already present then replace it with latest value
    const lastDigit = value.slice(-1);
    setValue(digitNames[index], lastDigit);

    // focus to other field
    if (value && index < digitNames.length - 1) {
      setFocus(digitNames[index + 1]);
    }
  };

  // function call on keypress
  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const key = event.key;
    const value = event.currentTarget?.value;

    // check backspace key and delete value if present
    if (key === "Backspace" && !value && index > 0) {
      setFocus(digitNames[index - 1]);
    }
  };

  // focus on first field when container is clicked
  const handleParentClick = (event: MouseEvent) => {
    const target = event.target;
    if (otpContainerRef.current && otpContainerRef.current === target) {
      setFocus(digitNames[0]);
    }
  };

  return (
    <>
    {/* container for otp field label */}
      <h5 className="mb-2 flex justify-between text-xs font-medium text-[#808191]">
        {/* input label */}
        <label>4 digitas code</label>
        {/* error message */}
        {errorMessages && (
          <span className="text-[#F24D4D]">{errorMessage}</span>
        )}
      </h5>
      {/* container for otp field */}
      <div
        ref={otpContainerRef}
        onClick={handleParentClick}
        className="p-4 flex justify-between bg-[#35353E] rounded-lg"
      >
        {/* container for otp field input */}
        <div className="flex gap-2">
          {/* otp field input */}
          {digitNames.map((digit, index) => (
            <input
              key={digit}
              type="text"
              className="inline-block w-3 bg-transparent border-b-2 border-white outline-none text-center"
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              {...register(digit, {
                required: "Please enter 4 digits",
                maxLength: 1,
                onChange: (e) => handleInputChange(e, index),
              })}
            />
          ))}
        </div>
        {/* <button
          type="button"
          onClick={toggleType}
          className="w-6 h-6 cursor-pointer"
        >
          {type === "password" ? <EyeOffIcon /> : <FaRegEye size={24} />}
        </button> */}
      </div>
    </>
  );
};

export default OTPField;
