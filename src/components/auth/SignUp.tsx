"use client";
import { archivo } from "@/fonts/fonts";
import InputWrapper from "../form-elements/InputWrapper";
import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "../form-elements/GradientButton";
import Link from "next/link";
import InputPasswordWrapper from "../form-elements/InputPasswordWrapper";

interface SignUpInput {
  email: string;
  username: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const methods = useForm<SignUpInput>();

  const onSubmit = (data: SignUpInput) => {
    console.log(data)
    localStorage.setItem("user-detail", JSON.stringify(data));
  }

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form onSubmit={methods.handleSubmit(onSubmit)} className={`w-full max-w-[696px] px-6 py-[47px] absolute top-[6vw] left-1/2 -translate-x-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white ${archivo.className}`}>
        <h1 className={`mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl ${archivo.className}`}>
          CREATE ACCOUNT
        </h1>
        {/* container for email and username */}
        <div className="mb-6 flex gap-6 flex-wrap sm:flex-nowrap">
          {/* container for input wrapper */}
          <div className="basis-full sm:basis-[48%]">
            <InputWrapper
              leftIcon="/email-icon.svg"
              type="email"
              placeholder="Email address"
              label="Email address"
              name="email"
            />
          </div>
          {/* container for input wrapper */}
          <div className="basis-full sm:basis-[48%]">
            <InputWrapper
              leftIcon="/user-icon.svg"
              type="text"
              placeholder="Username"
              label="Username"
              name="username"
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
        <div className="mb-6">
          <InputPasswordWrapper
            rightIcon="/eye-off-icon.svg"
            placeholder="Password"
            label="Password"
            name="password"
          />
        </div>
        <div className="mb-6">
          <InputPasswordWrapper
            rightIcon="/eye-off-icon.svg"
            placeholder="Password"
            label="Confirm password"
            name="confirmPassword"
          />
        </div>
        {/* Agreement text */}
        <p className="py-6 text-lg text-[#8996A9]">
            By creating an account, you agree to the <Link href="/terms-of-use" className="text-white">Terms of Use.</Link> 
        </p>
        <GradientButton type="submit" className="mb-2 w-full py-6 text-lg text-center rounded-2xl">
            Sign up
        </GradientButton>
        <Link href="/" className="block w-full py-6 text-lg text-center rounded-2xl hover:bg-[#717171]/[66%] sm:hidden">
          Close
        </Link>
        <p className="mt-12 text-center text-lg">
            Already have an account? <Link href="./login" className="text-[#AB97FF]">Login</Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default SignUp;
