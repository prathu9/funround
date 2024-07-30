"use client";
import { archivo } from "@/fonts/fonts";
import InputWrapper from "./form-elements/InputWrapper";
import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "./GradientButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputFileWrapper from "./form-elements/InputFileWrapper";

interface SetUpWalletInput {
  password: string;
}

const WalletSetUp = () => {
  const methods = useForm<SetUpWalletInput>();
  const router = useRouter();

  const onSubmit = (data: SetUpWalletInput) => {
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
        <h1 className="mb-6 text-5xl text-center font-black">WALLET SET UP</h1>
        {/* Container for firstname and lastname */}
        <div className="flex gap-6 flex-wrap lg:flex-nowrap">
          <div className="mb-6 basis-full lg:basis-[48%]">
            <InputWrapper
              leftIcon="/email-icon.svg"
              type="text"
              placeholder="First name"
              label="First name"
              name="email"
            />
          </div>
          <div className="mb-6 basis-full lg:basis-[48%]">
            <InputWrapper
              leftIcon="/user-icon.svg"
              type="text"
              placeholder="Last name"
              label="Last name"
              name="email"
            />
          </div>
        </div>
        <div className="mb-6">
          <InputWrapper
            leftIcon="/calendar-icon.svg"
            type="date"
            placeholder="DD/MM/YYYY"
            label="Date of birth"
            name="birthdate"
          />
        </div>
        {/* container for country, postal code, address */}
        <div className="mb-6 flex gap-6">
          <div>
            <InputWrapper
              type="text"
              placeholder="Country"
              label="Country"
              name="country"
            />
          </div>
          <div>
            <InputWrapper
              type="text"
              placeholder="Postal code"
              label="Postal code"
              name="postal-code"
            />
          </div>
          <div>
            <InputWrapper
              type="text"
              placeholder="address"
              label="Residential address"
              name="residential-address"
            />
          </div>
        </div>
        <div className="mb-6 flex gap-6">
          <div className="mb-6 basis-full lg:basis-[48%]">
            <InputWrapper
              type="text"
              placeholder="Occupation"
              label="Occupation"
              name="occupation"
            />
          </div>
          <div className="mb-6 basis-full lg:basis-[48%]">
            <InputWrapper
              type="text"
              placeholder="Drivers license"
              label="Choose document type"
              name="driver-license"
            />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="mb-6 basis-full lg:basis-[48%]">
            <InputFileWrapper
              leftIcon="/upload-icon.svg"
              type="file"
              label="Upload document front-side"
              name="document-front"
            />
          </div>
          <div className="mb-6 basis-full lg:basis-[48%]">
            <InputFileWrapper
              leftIcon="/upload-icon.svg"
              type="file"
              label="Upload document back-side"
              name="document-front"
            />
          </div>
        </div>
        {/* Confirm button */}
        <GradientButton
          type="submit"
          className="w-full py-6 text-lg text-center rounded-2xl"
        >
          Finish
        </GradientButton>
      </form>
    </FormProvider>
  );
};

export default WalletSetUp;
