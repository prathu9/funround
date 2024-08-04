"use client";
import { archivo } from "@/fonts/fonts";
import InputWrapper from "./form-elements/InputWrapper";
import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "./form-elements/GradientButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OTPField from "./form-elements/OTPField";

interface ConfirmEmailInput {
  password: string;
}

type ConfirmEmailProps = {
  forwardLink: string,
  backLink: string
}

const ConfirmEmail = ({backLink, forwardLink}: ConfirmEmailProps) => {
  const methods = useForm<ConfirmEmailInput>();
  const router = useRouter();

  const onSubmit = (data: ConfirmEmailInput) => {
    console.log(data);
    router.push(forwardLink);
  };

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white sm:top-[6vw] sm:translate-y-0 ${archivo.className}`}
      >
        <h1 className="mb-3 text-[28px] leading-[30.97px] text-center font-black sm:mb-6 sm:text-5xl">CONFIRM EMAIL</h1>
        <p className="mb-6 text-center text-[15px] leading-[20px] sm:mb-12 sm:text-2xl">
          A 4 digit code has been emailed to you.{" "}
          <Link href="./signup" className="text-[#AB97FF]">
            Resend
          </Link>
        </p>
        <div className="mb-6">
          <OTPField/>
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
