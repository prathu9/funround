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

const ChangePassword = () => {
  const methods = useForm<ChangePasswordInput>();
  const [isUpdated, setIsUpdated] = useState(false);

  const onSubmit = (data: ChangePasswordInput) => {
    console.log(data);
    setIsUpdated(true);
  };

  if (isUpdated) {
    return <SuccessMessage />;
  }

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for signup form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white"
      >
        <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
          Choose new password
        </h1>
        <div className="mb-6">
          <InputPasswordWrapper
            placeholder="Password"
            label="Password"
            name="password"
          />
        </div>
        <div className="mb-6">
          <InputPasswordWrapper
            placeholder="Password"
            label="Password"
            name="confirmPassword"
          />
        </div>
        <GradientButton className="w-full py-[26px] rounded-2xl">
          Reset Password
        </GradientButton>
      </form>
    </FormProvider>
  );
};

const SuccessMessage = () => {
  return (
    <div className="w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white">
      <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
        PASSWORD HAS BEEN RESETTED
      </h1>
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

export default ChangePassword;
