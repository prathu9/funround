"use client";
import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "./form-elements/GradientButton";
import Link from "next/link";
import OTPField from "./form-elements/OTPField";
import { useEffect } from "react";

interface ConfirmEmailInput {
  firstDigit: string,
  secondDigit: string,
  thirdDigit: string,
  fourthDigit: string
}

type ConfirmEmailProps = {
  errorMessage?: string | undefined,
  backLink: string,
  submitHandler?: (otp: string) => void
}

const ConfirmEmail = ({errorMessage, backLink, submitHandler}: ConfirmEmailProps) => {
  const methods = useForm<ConfirmEmailInput>();
  const {formState: {errors}, setError} = methods;

  useEffect(() => {
    if(errorMessage){
      setError("firstDigit", {message: errorMessage})
    }
    
  }, [errorMessage, setError])

  const onSubmit = (data: ConfirmEmailInput) => {
    const {firstDigit, secondDigit, thirdDigit, fourthDigit} = data;
    const concateDigit = firstDigit+ secondDigit+ thirdDigit+ fourthDigit;
    if(submitHandler){
      submitHandler(concateDigit);
    }
  };

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white"
      >
        <h1 className="mb-3 text-[28px] leading-[30.97px] text-center font-black sm:mb-6 sm:text-5xl">CONFIRM EMAIL</h1>
        <p className="mb-6 text-center text-[15px] leading-[20px] sm:mb-12 sm:text-2xl">
          A 4 digit code has been emailed to you.{" "}
          <span className="text-[#AB97FF]">
            Resend
          </span>
        </p>
        <div className="mb-6">
          <OTPField errorMessages={errors}/>
        </div>
        <GradientButton
          type="submit"
          className="mb-3 w-full py-6 text-lg text-center rounded-2xl"
        >
          Confirm email
        </GradientButton>
        <Link href={backLink} className="block w-full py-6 text-lg text-center rounded-2xl hover:bg-[#717171]/[66%]">
          Back
        </Link>
      </form>
    </FormProvider>
  );
};

export default ConfirmEmail;
