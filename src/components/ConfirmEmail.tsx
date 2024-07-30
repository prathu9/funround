"use client";
import { archivo } from "@/fonts/fonts";
import InputWrapper from "./form-elements/InputWrapper";
import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "./GradientButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
        className={`w-full max-w-[696px] px-12 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white rounded-2xl bg-black ${archivo.className}`}
      >
        <h1 className="mb-6 text-5xl text-center font-black">CONFIRM EMAIL</h1>
        <p className="mb-12 text-center text-2xl">
          A 4 digit code has been emailed to you.{" "}
          <Link href="./signup" className="text-[#AB97FF]">
            Resend
          </Link>
        </p>
        <div className="mb-6">
          <InputWrapper
            rightIcon="/eye-off-icon.svg"
            type="password"
            placeholder="_ _ _ _"
            label="4 digits code"
            name="password"
          />
        </div>
        <GradientButton
          type="submit"
          className="w-full py-6 text-lg text-center rounded-2xl"
        >
          Confirm email
        </GradientButton>
        <Link href={backLink} className="block w-full py-6 text-lg text-center rounded-2xl">
          Back
        </Link>
      </form>
    </FormProvider>
  );
};

export default ConfirmEmail;
