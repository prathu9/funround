"use client";

import { FormProvider, useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import GradientButton from "../form-elements/GradientButton";
import InputWrapper from "../form-elements/InputWrapper";
import { useContext } from "react";
import { UserContext } from "@/context/user-context";

interface ProfileInput {
  email: string;
  password: string;
}

const Profile = () => {
  const methods = useForm<ProfileInput>();
  const router = useRouter();
  const {
    userDetail: { email, username },
  } = useContext(UserContext);

  const onSubmit = (data: ProfileInput) => {
    console.log(data);
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
        <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
          PROFILE
        </h1>
        <div className="mb-6">
          <InputWrapper
            type="email"
            placeholder={email}
            label="Email"
            name="email"
          />
        </div>
        <div className="mb-6">
          <InputWrapper
            type="text"
            placeholder="54% (23/40 games)"
            label="Winning Rate"
            name="winning-rate"
          />
        </div>
        <div className="mb-6">
          <InputWrapper
            leftIcon="/user-icon.svg"
            type="text"
            placeholder={username}
            label="Username"
            name="username"
          />
        </div>
        <div className="mt-12 flex flex-wrap gap-8 sm:flex-nowrap">
          <GradientButton
            type="submit"
            className="basis-full py-4 text-lg text-center rounded-2xl sm:basis-[48%]"
          >
            Save
          </GradientButton>
          <Link href="/" className="basis-full py-4 text-lg text-center rounded-2xl hover:bg-[#717171]/[66%] sm:basis-[48%]">Cancel</Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default Profile;
