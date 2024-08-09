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

interface SignUpInput {
  email: string;
  username: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const methods = useForm<SignUpInput>();
  const {
    formState: { errors },
    watch,
  } = methods;
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserContext);
  const [showTerms, setShowTerms] = useState(false);

  const onSubmit = (data: SignUpInput) => {
    console.log("signup", data);

    // save user filled data in user context
    setUserDetail({
      ...userDetail,
      ...{
        email: data.email,
        username: data.username,
        password: data.password,
        isLoggedIn: true,
      },
    });

    // navigate to terms page after sign up
    if (!userDetail.termsOfUse) {
      setShowTerms(true);
    } else {
      // storing data in local storage for testing
      localStorage.setItem(
        "user-detail",
        JSON.stringify({ ...data, isLoggedIn: true, termsOfUse: false })
      );
      router.push("/");
    }
  };

  const handleShowTerms = () => {
    setShowTerms(true);
  };

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
        <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl ${archivo.className}">
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
              errorMessage={errors.email?.message}
              registerOptions={{
                required: "Please enter email",
                validate: validateEmail,
              }}
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
              errorMessage={errors.username?.message}
              registerOptions={{
                required: "Please enter username",
              }}
            />
          </div>
        </div>
        <div className="mb-6">
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
        <div className="mb-6">
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
        <div className="mb-6">
          <InputPasswordWrapper
            placeholder="Password"
            label="Confirm password"
            name="confirmPassword"
            errorMessage={errors.confirmPassword?.message}
            registerOptions={{
              required: "Please enter password",
              validate: (value) =>
                validateConfirmPassword(value, watch("password")),
            }}
          />
        </div>
        {/* Agreement text */}
        <p className="py-6 text-lg text-[#8996A9]">
          By creating an account, you agree to the{" "}
          <button onClick={handleShowTerms} className="text-white">
            Terms of Use.
          </button>
        </p>
        <GradientButton
          type="submit"
          className="mb-2 w-full py-6 text-lg text-center rounded-2xl"
        >
          Sign up
        </GradientButton>
        <Link
          href="/"
          className="block w-full py-6 text-lg text-center rounded-2xl hover:bg-[#717171]/[66%] sm:hidden"
        >
          Close
        </Link>
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

const validateEmail = (value: string) => {
  const emailRegex = /[^@\s]+@[^@\s]+/;

  if (!emailRegex.test(value)) {
    return "Invalid email format";
  }
};

const validatePassword = (value: string) => {
  if (value.length < 8) {
    return "Must be at least 8 characters";
  }

  if (!/[A-Z]/.test(value)) {
    return "Must have one uppercase letter";
  }

  if (!/\d/.test(value)) {
    return "Must have one number";
  }
};

const validateConfirmPassword = (value: string, password: string | null) => {
  if (value !== password) {
    return "Passwords do not match";
  }
};

const validateDate = (value: Date) => {
  const today = new Date();
  const age = today.getFullYear() - value.getFullYear();
  const monthDifference = today.getMonth() - value.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < value.getDate())
  ) {
    return age - 1 >= 18 ? true : "Players must be over 18";
  }
  return age >= 18 ? true : "Players must be over 18";
};

export default SignUp;
