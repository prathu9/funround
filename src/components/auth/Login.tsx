"use client";

import { FormProvider, useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import GradientButton from "../form-elements/GradientButton";
import InputWrapper from "../form-elements/InputWrapper";
import InputPasswordWrapper from "../form-elements/InputPasswordWrapper";
import EmailIcon from "/public/email-icon.svg";
import { useContext } from "react";
import { UserContext } from "@/context/user-context";

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
  const {userDetail, setUserDetail} = useContext(UserContext);

  // function runs on form submission
  const onSubmit = (data: LoginInput) => {
    console.log("login",data);
    localStorage.setItem("user-detail", JSON.stringify({
      ...data,
      isLoggedIn: true,
      termsOfUse: true,
    }));

    setUserDetail({
      ...userDetail,
      email: data.email,
      isLoggedIn: true,
      termsOfUse: true,
    })

    router.push("/login/confirm");
  };

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white sm:top-[4vw] sm:translate-y-0 2xl:top-1/2 2xl:-translate-y-1/2"
      >
        {/* container for form heading */}
        <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
          LOGIN
        </h1>
        {/* container for email input */}
        <div className="mb-6">
          {/* input wrapper for email */}
          <InputWrapper
            leftIcon={<EmailIcon/>}
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
          <Link href="/terms-of-use" className="text-white">Terms of Use.</Link>
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

// validate function for email fields
const validateEmail = (value: string) => {
  const emailRegex = /[^@\s]+@[^@\s]+/; //regex pattern for email

  // checking if email if valid
  if(!emailRegex.test(value)){
    return "Invalid email format";
  }
}

// validate function for password fieldss
const validatePassword = (value: string) => {
  // checking length of password greater than 8
  if(value.length < 8){
    return "Must be at least 8 characters";
  }

  // checking if password has one uppercase
  if(!/[A-Z]/.test(value)){
    return "Must have one uppercase letter";
  }

  // checking if password has one number
  if(!/\d/.test(value)){
    return "Must have one number";
  }
}

export default Login;
