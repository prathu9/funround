"use client";
import { FormProvider, useForm } from "react-hook-form";
import InputWrapper from "../form-elements/InputWrapper";
import GradientButton from "../form-elements/GradientButton";
import { useState } from "react";
import ConfirmEmail from "../ConfirmEmail";
import ChangePassword from "./ChangePassword";
import EmailIcon from "/public/email-icon.svg";

interface ResetPasswordInput {
  email: string;
}

const ResetPassword = () => {
  const methods = useForm<ResetPasswordInput>();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const onSubmit = (data: ResetPasswordInput) => {
    console.log(data);
    setIsEmailSent(true);
  };

  const confirmEmailHandler = (otp: string) => {
    console.log(otp)
    setIsEmailSent(false);
    setIsVerified(true);
  }

  if(isEmailSent){
    return <ConfirmEmail backLink="/login" submitHandler={confirmEmailHandler}/>
  }

  if(isVerified){
    return <ChangePassword />
  }

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white"
      >
        <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
          RESET PASSWORD
        </h1>
        <div className="mb-12">
        <InputWrapper
          leftIcon={<EmailIcon/>}
          label="Email Address"
          name="email"
          type="email"
          placeholder="Email Address"
        />
        </div>
        <GradientButton className="w-full py-[26px] rounded-2xl">
            Send Email
        </GradientButton>
      </form>
    </FormProvider>
  );
};

export default ResetPassword;
