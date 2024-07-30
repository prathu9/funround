"use client";
import { archivo } from "@/fonts/fonts";

import { FormProvider, useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import InputWrapper from "../form-elements/InputWrapper";
import GradientButton from "../form-elements/GradientButton";

interface SetUpEmailConfirmationInput {
  password: string;
}

const SetUpEmailConfirmation = () => {
  const methods = useForm<SetUpEmailConfirmationInput>();
  const router = useRouter();

  const onSubmit = (data: SetUpEmailConfirmationInput) => {
    console.log(data);
    router.push("/wallet-setup/confirm");
  };

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for Wallet setup email confirmation */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`w-full max-w-[696px] px-12 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white rounded-2xl bg-black ${archivo.className}`}
      >
        {/* Title of form */}
        <h1 className="mb-6 text-5xl text-center font-black">LET'S GET YOUR WALLET SET UP</h1>
        {/* Description of form */}
        <p className="mb-12 text-center text-2xl">
          Set up your wallet in three steps so you can compete against other players over crypto.
        </p>
        {/* Container for email */}
        <div className="mb-6">
          <InputWrapper
            leftIcon="/email-icon.svg"
            type="email"
            placeholder="johnplayer@gmail.com"
            label="Your email address"
            name="email"
          />
        </div>
        {/* Confirm button */}
        <GradientButton
          type="submit"
          className="w-full py-6 text-lg text-center rounded-2xl"
        >
          Confirm email
        </GradientButton>
        {/* Back button */}
        <Link href="/wallet-setup" className="block w-full py-6 text-lg text-center rounded-2xl">
          Back
        </Link>
      </form>
    </FormProvider>
  );
};

export default SetUpEmailConfirmation;
