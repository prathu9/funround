"use client";
import { FormProvider, useForm } from "react-hook-form";
import InputWrapper from "../form-elements/InputWrapper";
import GradientButton from "../form-elements/GradientButton";
import { useState } from "react";
import ConfirmEmail from "../ConfirmEmail";
import ChangePassword from "./ChangePassword";
import EmailIcon from "/public/email-icon.svg";

// type reset password input field
interface ResetPasswordInput {
  email: string;
}

// Reset password form
const ResetPassword = () => {
  const methods = useForm<ResetPasswordInput>(); // useform with type of ResetPasswordInput input
  const {
    formState: { errors },
  } = methods;
  const [isEmailSent, setIsEmailSent] = useState(false); // email sent state
  const [isVerified, setIsVerified] = useState(false); // email verification state

  // submit function for reset password form
  const onSubmit = (data: ResetPasswordInput) => {
    console.log(data);
    setIsEmailSent(true);
  };

  // function for email OTP confirmation
  const confirmEmailHandler = (otp: string) => {
    console.log(otp);
    setIsEmailSent(false);
    setIsVerified(true);
  };

  // check if otp sent on email and display otp form
  if (isEmailSent) {
    return (
      <ConfirmEmail backLink="/login" submitHandler={confirmEmailHandler} />
    );
  }

  // check if user email is verified and display change password form
  if (isVerified) {
    return <ChangePassword />;
  }

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white"
      >
        {/* form title */}
        <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
          RESET PASSWORD
        </h1>
        {/* input wrapper for email */}
        <div className="mb-12">
          <InputWrapper
            leftIcon={<EmailIcon />}
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
            errorMessage={errors.email?.message}
            registerOptions={{
              required: "Please enter email",
              validate: validateEmail,
            }}
          />
        </div>
        {/* button to send email */}
        <GradientButton className="w-full py-[26px] rounded-2xl">
          Send Email
        </GradientButton>
      </form>
    </FormProvider>
  );
};

// validate function for email
const validateEmail = (value: string) => {
  const emailRegex = /[^@\s]+@[^@\s]+/; // regex pattern for email

  // test email and check validity
  if (!emailRegex.test(value)) {
    return "Invalid email format";
  }
};

export default ResetPassword;
