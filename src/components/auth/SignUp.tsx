"use client";
import InputWrapper from "../form-elements/InputWrapper";
import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "../form-elements/GradientButton";
import Link from "next/link";
import InputPasswordWrapper from "../form-elements/InputPasswordWrapper";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/context/user-context";
import InputDateWrapper from "../form-elements/InputDateWrapper";
import CalendarIcon from "/public/calendar-icon.svg";
import Terms from "./terms";
import EmailIcon from "/public/email-icon.svg";
import UserIcon from "/public/user-icon.svg";


// type for signup input form
interface SignUpInput {
  email: string;
  username: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

//  signup component
const SignUp = () => {
  const methods = useForm<SignUpInput>(); // useform with signup input
  const {
    formState: { errors },
    watch,
  } = methods;
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserContext); // getting user detail from user context
  const [showTerms, setShowTerms] = useState(false); // state to show terms of condition

  // function to run after sign up form submission
  const onSubmit = (data: SignUpInput) => {
    console.log("signup", data);

    // save user filled data in user context
    setUserDetail({
      ...userDetail,
      ...{
        email: data.email,
        username: data.username,
        password: data.password,
        isLoggedIn: userDetail.termsOfUse,
      },
    });

    // navigate to terms page after sign up
    if (!userDetail.termsOfUse) {
      setShowTerms(true);
    } else {
      // storing data in local storage for testing
      localStorage.setItem(
        "user-detail",
        JSON.stringify({ ...data, isLoggedIn: true, termsOfUse: true })
      );
      router.push("/");
    }
  };

  // show terms and condition when terms of use link is clicked
  const handleShowTerms = () => {
    setShowTerms(true);
  };

  // render terms and condition
  if (showTerms) {
    return <Terms setShowTerms={setShowTerms} />;
  }

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full h-full max-w-[696px] py-[47px] absolute top-[1.2vw] left-1/2 -translate-x-1/2 scale-90 rounded-2xl bg-black sm:h-fit sm:px-12 sm:border sm:border-white"
      >
        {/* container for sign up form title */}
        <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
          CREATE ACCOUNT
        </h1>
        {/* container for email and username */}
        <div className="mb-6 flex gap-6 flex-wrap sm:flex-nowrap">
          {/* container for input wrapper */}
          <div className="basis-full sm:basis-[48%]">
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
                validate: validateEmail,
              }}
            />
          </div>
          {/* container for input wrapper */}
          <div className="basis-full sm:basis-[48%]">
            {/* input wrapper for username */}
            <InputWrapper
              leftIcon={<UserIcon/>}
              type="text"
              placeholder="Username"
              label="Username"
              name="username"
              errorMessage={errors.username?.message}
              registerOptions={{
                required: "Please enter username",
              }}
            />
          </div>
        </div>
        {/* container for date input wrapper */}
        <div className="mb-6">
          {/* input wrapper for date */}
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
        {/* container for password input wrapper */}
        <div className="mb-6">
          {/* input wrapper for password */}
          <InputPasswordWrapper
            placeholder="Password"
            label="Password"
            name="password"
            errorMessage={errors.password?.message}
            registerOptions={{
              required: "Please enter password",
              validate: validatePassword,
            }}
          />
        </div>
        {/* container confirm password wrapper */}
        <div className="mb-6">
          {/* input wrapper for confirm password */}
          <InputPasswordWrapper
            placeholder="Password"
            label="Confirm password"
            name="confirmPassword"
            errorMessage={errors.confirmPassword?.message}
            registerOptions={{
              required: "Please enter password",
              validate: (value) =>
                validateConfirmPassword(value, watch("password")), //watch used to check password matching in real time
            }}
          />
        </div>
        {/* Agreement text */}
        <p className="py-6 text-lg text-[#8996A9]">
          By creating an account, you agree to the{" "}
          {/* button to access terms and condition */}
          <Link href="/terms-of-use" className="text-white">
            Terms of Use.
          </Link>
        </p>
        {/* button for signing up */}
        <GradientButton
          type="submit"
          className="mb-2 w-full py-6 text-lg text-center rounded-2xl"
        >
          Sign up
        </GradientButton>
        {/* button to close signup form */}
        <Link
          href="/"
          className="block w-full py-6 text-lg text-center rounded-2xl hover:bg-[#717171]/[66%] sm:hidden"
        >
          Close
        </Link>
        {/* container for link to switch to login page */}
        <p className="mt-12 text-center text-lg">
          Already have an account?{" "}
          <Link href="./login" className="text-[#AB97FF]">
            Login
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

// validate function for email
const validateEmail = (value: string) => {
  const emailRegex = /[^@\s]+@[^@\s]+/; // regex pattern for email

  // checking if value provided matches with regex pattern
  if (!emailRegex.test(value)) {
    return "Invalid email format";
  }
};

// valiadate function for password
const validatePassword = (value: string) => {
  // checking length of password
  if (value.length < 8) {
    return "Must be at least 8 characters";
  }

  // checking if password contains uppercase
  if (!/[A-Z]/.test(value)) {
    return "Must have one uppercase letter";
  }

  // checking id password have number
  if (!/\d/.test(value)) {
    return "Must have one number";
  }
};

// validate confirm password
const validateConfirmPassword = (value: string, password: string | null) => {
  // checking if confirm password matches with password
  if (value !== password) {
    return "Passwords do not match";
  }
};

// validate function for date
const validateDate = (value: Date) => {
  const today = new Date(); // current time
  const age = today.getFullYear() - value.getFullYear(); //calculating age
  const monthDifference = today.getMonth() - value.getMonth();

  // checking if user is older than 18
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < value.getDate())
  ) {
    return age - 1 >= 18 ? true : "Players must be over 18";
  }
  return age >= 18 ? true : "Players must be over 18";
};

export default SignUp;
