"use client";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "../form-elements/GradientButton";
import { useState } from "react";
import InputPasswordWrapper from "../form-elements/InputPasswordWrapper";

interface ChangePasswordInput {
  password: string;
  confirmPassword: string;
}

// change password form
const ChangePassword = () => {
  const methods = useForm<ChangePasswordInput>(); // useform with type of ChangePasswordInput input
  const {
    formState: { errors },
    watch,
  } = methods; // get erros and watch from useForm hook
  
  const [isUpdated, setIsUpdated] = useState(false); //state for checking if password update is successful

  // run function on submit
  const onSubmit = (data: ChangePasswordInput) => {
    console.log(data);
    setIsUpdated(true);
  };

  // check if password update to display success message
  if (isUpdated) {
    return <SuccessMessage />;
  }

  return (
    // form context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for change password form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white"
      >
        {/* form title */}
        <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
          Choose new password
        </h1>
        {/* input wrapper for password */}
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
        {/* input wrapper for confirm password */}
        <div className="mb-6">
          <InputPasswordWrapper
            placeholder="Password"
            label="Password"
            name="confirmPassword"
            errorMessage={errors.confirmPassword?.message}
            registerOptions={{
              required: "Please enter password",
              validate: (value) =>
                validateConfirmPassword(value, watch("password")), //watch used to check password matching in real time
            }}
          />
        </div>
        {/* reset button to submit form */}
        <GradientButton className="w-full py-[26px] rounded-2xl">
          Reset Password
        </GradientButton>
      </form>
    </FormProvider>
  );
};

// success message component
const SuccessMessage = () => {
  return (
    // container for success message
    <div className="w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white">
      {/* success message */}
      <h2 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
        PASSWORD HAS BEEN RESETTED
      </h2>
      {/* link to login page */}
      <GradientButton
        as="link"
        link="/login"
        className="w-full py-[26px] inline-block text-lg font-semibold text-center rounded-2xl"
      >
        Login
      </GradientButton>
    </div>
  );
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

export default ChangePassword;
