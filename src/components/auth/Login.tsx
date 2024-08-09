"use client";

import { FormProvider, useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import GradientButton from "../form-elements/GradientButton";
import InputWrapper from "../form-elements/InputWrapper";
import InputPasswordWrapper from "../form-elements/InputPasswordWrapper";

// type for login form
interface LoginInput {
  email: string;
  password: string;
}

// login form component
const Login = () => {
  const methods = useForm<LoginInput>(); // useform with type of login input
  const {formState: {errors}} = methods;
  const router = useRouter(); // nextjs router 

  // function runs on form submission
  const onSubmit = (data: LoginInput) => {
    console.log("login",data);
    localStorage.setItem("userDetail", JSON.stringify({
      ...data,
      otp: "12345"
    }));
    router.push("/login/confirm");
  };

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white sm:top-[6vw] sm:translate-y-0"
      >
        {/* container for form heading */}
        <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
          LOGIN
        </h1>
        {/* container for email input */}
        <div className="mb-6">
          {/* input wrapper for email */}
          <InputWrapper
            leftIcon="/email-icon.svg"
            type="email"
            placeholder="Email address"
            label="Email address"
            name="email"
            errorMessage={errors.email?.message}
            registerOptions={{
              required: "Please enter email",
              validate: validateEmail
            }}
          />
        </div>
        {/* container for password input */}
        <div className="mb-6">
          {/* input wrapper for password */}
          <InputPasswordWrapper
            placeholder="Password"
            label="Password"
            name="password"
            errorMessage={errors.password?.message}
            registerOptions={{
              required: "Please enter password",
              validate: validatePassword
            }}
          />
        </div>
        {/* Agreement text */}
        <p className="py-6 text-lg text-[#8996A9]">
          By creating an account, you agree to the{" "}
          <span className="text-white">Terms of Use.</span>
        </p>
        {/* button fro login */}
        <GradientButton
          type="submit"
          className="w-full py-6 text-lg text-center rounded-2xl"
        >
          Login
        </GradientButton>
        {/* container for signup option */}
        <p className="my-12 text-center text-lg">
          Already have an account?{" "}
          <Link href="./signup" className="text-[#AB97FF]">
            Sign up
          </Link>
        </p>
        {/* link to reset password page */}
        <Link
          href="/login/reset-password"
          className="w-full inline-block text-center cursor-pointer underline"
        >
          Forgot Password?
        </Link>
      </form>
    </FormProvider>
  );
};

const validateEmail = (value: string) => {
  const emailRegex = /[^@\s]+@[^@\s]+/;

  if(!emailRegex.test(value)){
    return "Invalid email format";
  }
}

const validatePassword = (value: string) => {
  if(value.length < 8){
    return "Must be at least 8 characters";
  }

  if(!/[A-Z]/.test(value)){
    return "Must have one uppercase letter";
  }

  if(!/\d/.test(value)){
    return "Must have one number";
  }
}

export default Login;
