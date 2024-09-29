"use client";
import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "./form-elements/GradientButton";
import Link from "next/link";
import OTPField from "./form-elements/OTPField";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./layout/Spinner";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useResendOTP } from "@/hooks/queries/useAuth";
import axios from "axios";

interface ConfirmEmailInput {
  firstDigit: string;
  secondDigit: string;
  thirdDigit: string;
  fourthDigit: string;
}

type ConfirmEmailProps = {
  email?: string | null;
  isPending?: boolean;
  errorMessage?: string | undefined;
  backLink: string;
  submitHandler?: (otp: string) => void;
};

const ConfirmEmail = ({
  email,
  errorMessage,
  isPending,
  backLink,
  submitHandler,
}: ConfirmEmailProps) => {
  const methods = useForm<ConfirmEmailInput>();
  const {
    formState: { errors },
    setError,
  } = methods;
  const searchParams = useSearchParams();
  const resendOTP = useResendOTP();

  const emailToVerify = email || searchParams.get("email");


  useEffect(() => {
    if (errorMessage && !isPending) {
      setError("firstDigit", { type:"server", message: errorMessage });
    }
  }, [errorMessage, setError, isPending]);

  const onSubmit = (data: ConfirmEmailInput) => {
    const { firstDigit, secondDigit, thirdDigit, fourthDigit } = data;
    const concateDigit = firstDigit + secondDigit + thirdDigit + fourthDigit;
    if (submitHandler) {
      submitHandler(concateDigit);
    }
  };

  const resendOtpHandler = () => {
    console.log("check",  emailToVerify);
    if (emailToVerify) {
      resendOTP.mutate({
        email:  emailToVerify,
      },{
        onError: (error) => {
          if(axios.isAxiosError(error)){
            setError("firstDigit", {type:"server",message: error.response?.data.message})
          }
        }
      });
    }
  };

  if (!emailToVerify) {
    redirect("/");
  }

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white"
      >
        <h1 className="mb-3 text-[28px] leading-[30.97px] text-center font-black sm:mb-6 sm:text-5xl">
          CONFIRM EMAIL
        </h1>
        <p className="mb-6 text-center text-[15px] leading-[20px] sm:mb-12 sm:text-2xl">
          A 4 digit code has been emailed to you.{" "}
          <button
            type="button"
            onClick={resendOtpHandler}
            className="text-[#AB97FF]"
          >
            Resend
          </button>
        </p>
        <div className="mb-6">
          <OTPField errorMessages={errors}/>
        </div>
        <GradientButton
          type="submit"
          className="relative mb-3 w-full py-6 text-lg text-center rounded-2xl"
          isDisabled={isPending}
        >
          {/* show loading spinner while signup in progress */}
          {isPending && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <LoadingSpinner />
            </span>
          )}
          Confirm email
        </GradientButton>
        <Link
          href={backLink}
          className="block w-full py-6 text-lg text-center rounded-2xl hover:bg-[#717171]/[66%]"
        >
          Back
        </Link>
      </form>
    </FormProvider>
  );
};

export default ConfirmEmail;
