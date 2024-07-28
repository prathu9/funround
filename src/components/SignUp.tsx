"use client";
import { archivo } from "@/fonts/fonts";
import InputWrapper from "./InputWrapper";
import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "./GradientButton";
import Link from "next/link";

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
  }

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full max-w-[696px] px-12 py-[47px] absolute top-[6vw] left-1/2 -translate-x-1/2  border border-white rounded-2xl bg-black">
        <h1 className={`mb-12 text-5xl text-center font-black ${archivo.className}`}>
          CREATE ACCOUNT
        </h1>
        {/* container for email and username */}
        <div className="mb-6 flex gap-6">
          {/* container for input wrapper */}
          <div className="basis-[48%]">
            <InputWrapper
              leftIcon="/email-icon.svg"
              type="email"
              placeholder="Email address"
              label="Email address"
              name="email"
            />
          </div>
          {/* container for input wrapper */}
          <div className="w-[48%]">
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
          <InputWrapper
            rightIcon="/eye-off-icon.svg"
            type="password"
            placeholder="Password"
            label="Password"
            name="password"
          />
        </div>
        <div className="mb-6">
          <InputWrapper
            rightIcon="/eye-off-icon.svg"
            type="password"
            placeholder="Password"
            label="Confirm password"
            name="confirmPassword"
          />
        </div>
        {/* Agreement text */}
        <p className="py-6 text-lg text-[#8996A9]">
            By creating an account, you agree to the <span className="text-white">Terms of Use.</span> 
        </p>
        <GradientButton type="submit" className="w-full py-6 text-lg text-center rounded-2xl">
            Sign up
        </GradientButton>
        <p className="mt-12 text-center text-lg">
            Already have an account? <Link href="./login" className="text-[#AB97FF]">Login</Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default SignUp;
