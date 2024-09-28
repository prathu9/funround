"use client";
import { archivo } from "@/fonts/fonts";
import InputWrapper from "../form-elements/InputWrapper";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import GradientButton from "../form-elements/GradientButton";
import { useRouter } from "next/navigation";
import InputFileWrapper from "../form-elements/InputFileWrapper";
import { useContext, useEffect, useState } from "react";
import Spinner, { LoadingSpinner } from "../layout/Spinner";
import CalendarIcon from "/public/calendar-icon.svg";
import InputDateWrapper from "../form-elements/InputDateWrapper";
import CountrySelector from "../form-elements/CountrySelector";
import { UserContext } from "@/context/user-context";
import { WalletContext } from "@/context/wallet-context";
import EmailIcon from "/public/email-icon.svg";
import UserIcon from "/public/user-icon.svg";
import { CustomOption, CustomSelect } from "../form-elements/CustomSelect";
import { useCreateWallet } from "@/hooks/queries/useWallet";
import axios from "axios";



// set up wallet form input type
interface WalletSetUpInput {
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: Date | null;
  country: string;
  postalCode: string;
  residentialAddress: string;
  occupation: string;
  documentType: string;
  documentFrontSide: File[];
  documentBackSide: File[];
}

const DocumentType = [
  {
    id: "driver-license",
    value: "Drivers License"
  },
  {
    id: "passport",
    value: "Passport"
  },
  {
    id: "international-id",
    value: "International ID"
  }
]

// wallet setup form component
const WalletSetUp = () => {
  const {userDetail} = useContext(UserContext);
  const methods = useForm<WalletSetUpInput>({
    defaultValues: {
      dateOfBirth: userDetail.dateOfBirth,
    }
  }); // react hook useForm with wallet setup type
  console.log("date", userDetail)
  const {
    formState: { errors },
  } = methods;
  const router = useRouter();
  const {setWalletDetail} = useContext(WalletContext);

  const createWallet = useCreateWallet();

  useEffect(() => {
    if(userDetail){
      methods.reset((prev) => ({...prev, ...userDetail}))
    }
  },[methods, userDetail])


  const onSubmit = (data: WalletSetUpInput) => {
    console.log("wallet setup", data);

    createWallet.mutate(data);
  };

  if (createWallet.isPending) {
    return (
      // container for confirm identity
      <div
        className="w-full max-w-[696px] px-12 pt-[47px] pb-[69px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:border sm:border-white"
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
        className="w-full max-w-[696px] px-6 py-[47px] absolute top-0 left-1/2 -translate-x-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white sm:top-[4vw] sm:translate-y-0"
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
          {/* container for firstname input wrapper */}
          <div className="mb-6 basis-full lg:basis-[48%]">
            {/* input wrapper for firstname */}
            <InputWrapper
              leftIcon={<EmailIcon/>}
              type="text"
              placeholder="First name"
              label="First name"
              name="firstname"
              errorMessage={errors.firstName?.message}
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
              leftIcon={<UserIcon/>}
              type="text"
              placeholder="Last name"
              label="Last name"
              name="lastname"
              errorMessage={errors.lastName?.message}
              registerOptions={{
                required: "Please enter lastname",
                validate: validateName,
              }}
            />
          </div>
        </div>
        {/* container for dateOfBirth */}
        <div className="mb-6">
          {/* date input wrapper for dateOfBirth */}
          <InputDateWrapper
            id="dateOfBirth"
            leftIcon={<CalendarIcon />}
            placeholder="DD/MM/YYYY"
            label="Date of birth"
            name="dateOfBirth"
            errorMessage={errors.dateOfBirth?.message}
            validateDate={validateDate}
          />
        </div>
        {/* container for country, postal code, address */}
        <div className="mb-6 flex gap-6">
          {/* container for country */}
          <div className="basis-full sm:basis-[33%] sm:max-w-[33%]">
            {/* selector for country */}
            <CountrySelector/>
          </div>
          {/* container for postal code */}
          <div className="basis-full sm:basis-[33%]">
            {/* input wrapper for postal code */}
            <InputWrapper
              type="text"
              placeholder="Postal code"
              label="Postal code"
              name="postalCode"
              errorMessage={errors.postalCode?.message}
              registerOptions={{
                required: "Please enter code"
              }}
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
              errorMessage={errors.occupation?.message}
              registerOptions={{
                required: "Please enter occupation",
              }}
            />
          </div>
          {/* container for document type */}
          <div className="mb-6 basis-full lg:basis-[48%]">
            {/* selector for document type */}
            <h4 className="mb-2 text-xs font-medium text-[#808191]">Choose document type</h4>
              <CustomSelect defaultValue="Drivers License" name="document-type">
          {DocumentType.map((document) => (
            <CustomOption id={document.id} value={document.value} key={document.id}>
              <div className="pl-4 py-4 w-full text-left text-sm overflow-hidden text-ellipsis">{document.value}</div>
            </CustomOption>
          ))}
        </CustomSelect>
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
              name="documentFrontSide"
            />
          </div>
          {/* container for backside of document upload */}
          <div className="mb-6 basis-full lg:basis-[48%]">
            {/* file input wrapper for back side */}
            <InputFileWrapper
              leftIcon="/upload-icon.svg"
              label="Upload document back-side"
              name="documentBackSide"
            />
          </div>
        </div>
        <p className="py-2 text-[#F24D4D] h-8">
         {/* checking for error from server and displaying error */}
         {createWallet.isError && axios.isAxiosError(createWallet.error) && (
          
            <span>{createWallet.error.response?.data.message}</span>
          
        )}
        </p>
        {/* Confirm button */}
        <GradientButton
          type="submit"
          className="relative w-full py-6 text-lg text-center rounded-2xl"
        >
           {/* show loading spinner while signup in progress */}
           {createWallet.isPending && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <LoadingSpinner />
            </span>
          )}
          Finish
        </GradientButton>
      </form>
    </FormProvider>
  );
};

// name validation function
const validateName = (value: string) => {
  const nameRegex = /^[a-z ,.'-]+$/i;

  if (!nameRegex.test(value)) {
    return "Invalid name";
  }
};

// date validation function
const validateDate = (value: Date) => {
  const today = new Date(); // current date
  const dateOfBirth = new Date(value); // birth date

  const age = today.getFullYear() - dateOfBirth.getFullYear(); // calculate age
  const monthDifference = today.getMonth() - dateOfBirth.getMonth(); // calculate month difference

   // Check if the birthday hasn't occurred yet this year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
  ) {
     // If the birthday hasn't occurred this year, reduce the age by 1 and check if it's at least 18
    return age - 1 >= 18 ? true : "Players must be over 18";
  }
   // If the birthday has occurred this year, check if the calculated age is at least 18
  return age >= 18 ? true : "Players must be over 18";
};

export default WalletSetUp;
