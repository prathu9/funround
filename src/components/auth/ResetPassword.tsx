"use client";
import { FormProvider, useForm } from "react-hook-form";
import InputWrapper from "../form-elements/InputWrapper";
import GradientButton from "../form-elements/GradientButton";
import { useContext, useState } from "react";
import ConfirmEmail from "../ConfirmEmail";
import ChangePassword from "./ChangePassword";
import EmailIcon from "/public/email-icon.svg";
import { useForgotPassword, useVerifyEmail } from "@/hooks/queries/useAuth";
import { RouterContext } from "@/context/router-context";
import { useRouter } from "next/navigation";

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
  const [errorMessage, setErrorMessage] = useState(""); // state for error message

  const forgotPassword = useForgotPassword();
  const verifyRegistrationEmail = useVerifyEmail(setErrorMessage);
  const {parentRoute} = useContext(RouterContext);
  const router = useRouter();
  const email = localStorage.getItem("userEmail");

  // submit function for reset password form
  const onSubmit = (data: ResetPasswordInput) => {
    console.log(data);
    localStorage.setItem("userEmail", data.email);
    forgotPassword.mutate({email: data.email})
  };

  // function for email OTP confirmation
  const confirmEmailHandler = (otp: string) => {
    console.log(otp);
    if(email){
      verifyRegistrationEmail.mutate({
        email,
        verificationCode: otp
      });
    }
    else{
      router.push(parentRoute);
    }
  };

    // check if user email is verified and display change password form
    if (verifyRegistrationEmail.isSuccess) {
      return <ChangePassword />;
    }

  // check if otp sent on email and display otp form
  if (forgotPassword.isSuccess) {
    return (
      <ConfirmEmail email={email} backLink="/login" submitHandler={confirmEmailHandler} />
    );
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
