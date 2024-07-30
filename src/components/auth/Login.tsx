"use client";
import { archivo } from "@/fonts/fonts";

import { FormProvider, useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import GradientButton from "../form-elements/GradientButton";
import InputWrapper from "../form-elements/InputWrapper";

interface LoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const methods = useForm<LoginInput>();
  const router = useRouter();

  const onSubmit = (data: LoginInput) => {
    console.log(data)
    router.push("/login/confirm")
  }

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form onSubmit={methods.handleSubmit(onSubmit)} className={`w-full max-w-[696px] px-12 py-[47px] absolute top-[6vw] left-1/2 -translate-x-1/2  border border-white rounded-2xl bg-black ${archivo.className}`}>
        <h1 className="mb-12 text-5xl text-center font-black">
          Login
        </h1>
        <div className="mb-6">
            <InputWrapper
              type="email"
              placeholder="Email address"
              label="Email address"
              name="email"
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
        {/* Agreement text */}
        <p className="py-6 text-lg text-[#8996A9]">
            By creating an account, you agree to the <span className="text-white">Terms of Use.</span> 
        </p>
        <GradientButton type="submit" className="w-full py-6 text-lg text-center rounded-2xl">
            Login
        </GradientButton>
        <p className="my-12 text-center text-lg">
            Already have an account? <Link href="./signup" className="text-[#AB97FF]">Sign up</Link>
        </p>
        <p className="text-center cursor-pointer underline">
          Forgot Password?
        </p>
      </form>
    </FormProvider>
  );
};

export default Login;
