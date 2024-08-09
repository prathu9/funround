"use client";
import { archivo } from "@/fonts/fonts";
import InputWrapper from "../form-elements/InputWrapper";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import GradientButton from "../form-elements/GradientButton";
import { useRouter } from "next/navigation";
import InputFileWrapper from "../form-elements/InputFileWrapper";
import { useContext, useState } from "react";
import Spinner from "../layout/Spinner";
import CalendarIcon from "/public/calendar-icon.svg";
import InputDateWrapper from "../form-elements/InputDateWrapper";
import CountrySelector from "../form-elements/CountrySelector";
import { UserContext } from "@/context/user-context";
import { WalletContext } from "@/context/wallet-context";

// set up wallet form input type
interface WalletSetUpInput {
  firstname: string;
  lastname: string;
  password: string;
  birthDate: string;
  country: string;
  postalCode: string;
  residentialAddress: string;
  occupation: string;
  documentType: string;
  documentFrontSide: File;
  documentBackSide: File;
}

// wallet setup form component
const WalletSetUp = () => {
  const methods = useForm<WalletSetUpInput>(); // react hook useForm with wallet setup type
  const {
    formState: { errors },
  } = methods;
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  const {userDetail} = useContext(UserContext);
  const {setWalletDetail} = useContext(WalletContext);

  const onSubmit = (data: WalletSetUpInput) => {
    console.log("wallet setup", data);
    localStorage.setItem("wallet-detail", JSON.stringify({
      email: userDetail.email,
      firstname: data.firstname,
      lastname: data.lastname
    }))

    setWalletDetail({
      email: userDetail.email,
      firstname: data.firstname,
      lastname: data.lastname
    })

    setShowLoader(true);
    setTimeout(() => {
      router.push("/wallet-setup/top-up");
    }, 1000);
  };

  if (showLoader) {
    return (
      // container for confirm identity
      <div
        className={`w-full max-w-[696px] px-12 pt-[47px] pb-[69px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:border sm:border-white ${archivo.className}`}
      >
        {/* title */}
        <h1 className="mb-8 text-[28px] leading-[30.87px] text-center font-black sm:mb-[69.5px] sm:text-5xl">
          CONFIRMING IDENTITY
        </h1>
        {/* Loader */}
        <Spinner />
      </div>
    );
  }

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for Wallet setup email confirmation */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`w-full max-w-[696px] px-6 py-[47px] absolute top-0 left-1/2 -translate-x-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white sm:top-[6vw] sm:translate-y-0 ${archivo.className}`}
      >
        {/* Title of form */}
        <h1 className="mb-6 text-5xl text-center font-black">WALLET SET UP</h1>
        {/* progress bar indicator of form */}
        <div className="mb-6 flex gap-[10px]">
          <div className="basis-[49%] h-1 bg-[#7C5AE4] rounded-full" />
          <div className="basis-[49%] h-1 bg-white rounded-full" />
        </div>
        {/* Container for firstname and lastname */}
        <div className="flex gap-x-6 flex-wrap lg:flex-nowrap">
          {/* container for email */}
          <div className="mb-6 basis-full lg:basis-[48%]">
            {/* input wrapper for firstname */}
            <InputWrapper
              leftIcon="/email-icon.svg"
              type="text"
              placeholder="First name"
              label="First name"
              name="firstname"
              registerOptions={{
                required: "Please enter firstname",
                validate: validateName,
              }}
            />
          </div>
          {/* container for lastname */}
          <div className="mb-6 basis-full lg:basis-[48%]">
            {/* input wrapper for lastname */}
            <InputWrapper
              leftIcon="/user-icon.svg"
              type="text"
              placeholder="Last name"
              label="Last name"
              name="lastname"
              registerOptions={{
                required: "Please enter lastname",
                validate: validateName,
              }}
            />
          </div>
        </div>
        {/* container for birthdate */}
        <div className="mb-6">
          <InputDateWrapper
            id="birthdate"
            leftIcon={<CalendarIcon />}
            placeholder="DD/MM/YYYY"
            label="Date of birth"
            name="birthDate"
            errorMessage={errors.birthDate?.message}
            validateDate={validateDate}
          />
        </div>
        {/* container for country, postal code, address */}
        <div className="mb-6 flex gap-6">
          {/* container for country */}
          <div className="basis-full sm:basis-[33%]">
            {/* selector for country */}
            {/* <InputWrapper
              type="text"
              placeholder="Country"
              label="Country"
              name="country"
            /> */}
            <CountrySelector/>
          </div>
          {/* container for postal code */}
          <div className="basis-full sm:basis-[33%]">
            {/* input wrapper for postal code */}
            <InputWrapper
              type="text"
              placeholder="Postal code"
              label="Postal code"
              name="postal-code"
            />
          </div>
          {/* container for address */}
          <div className="hidden basis-full sm:block sm:basis-[33%]">
            {/* input wrapper for residential address */}
            <InputWrapper
              type="text"
              placeholder="address"
              label="Residential address"
              name="residential-address"
            />
          </div>
        </div>
        {/* container for occupation and document type */}
        <div className="mb-6 flex gap-6">
          {/* container for occupation */}
          <div className="mb-6 basis-full lg:basis-[48%]">
            {/* input wrapper for occupation */}
            <InputWrapper
              type="text"
              placeholder="Occupation"
              label="Occupation"
              name="occupation"
            />
          </div>
          {/* container for document type */}
          <div className="mb-6 basis-full lg:basis-[48%]">
            {/* selector for document type */}
            <InputWrapper
              type="text"
              placeholder="Drivers license"
              label="Choose document type"
              name="driver-license"
            />
          </div>
        </div>
        {/* container for front and back side of document upload */}
        <div className="flex gap-6 flex-wrap sm:flex-nowrap">
          {/* container for front side of document upload */}
          <div className="mb-6 basis-full lg:basis-[48%]">
            {/* file input wrapper for front side */}
            <InputFileWrapper
              leftIcon="/upload-icon.svg"
              label="Upload document front-side"
              name="document-front"
            />
          </div>
          {/* container for backside of document upload */}
          <div className="mb-6 basis-full lg:basis-[48%]">
            {/* file input wrapper for back side */}
            <InputFileWrapper
              leftIcon="/upload-icon.svg"
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

const validateName = (value: string) => {
  const nameRegex = /^[a-z ,.'-]+$/i;

  if (!nameRegex.test(value)) {
    return "Invalid name";
  }
};

const validateDate = (value: Date) => {
  const today = new Date();
  const age = today.getFullYear() - value.getFullYear();
  const monthDifference = today.getMonth() - value.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < value.getDate())
  ) {
    return age - 1 >= 18 ? true : "Players must be over 18";
  }
  return age >= 18 ? true : "Players must be over 18";
};

export default WalletSetUp;
