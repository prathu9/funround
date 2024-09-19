"use client";

import { FormProvider, useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import GradientButton from "../form-elements/GradientButton";
import InputWrapper from "../form-elements/InputWrapper";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user-context";
import UserIcon from "/public/user-icon.svg";
import EmailIcon from "/public/email-icon.svg";
import Spinner from "../layout/Spinner";
import { inter } from "@/fonts/fonts";
import { WalletContext } from "@/context/wallet-context";
import { BalanceContext } from "@/context/balance-context";
import { RouterContext } from "@/context/router-context";
import { useLogoutUser } from "@/hooks/queries/useAuth";

// type for profile form
interface ProfileInput {
  email: string;
  username: string;
}

// profile form component
const Profile = () => {
  const methods = useForm<ProfileInput>(); // useform with type of profile input
  const {
    formState: { errors },
  } = methods;
  const [showLoader, setShowLoader] = useState(true); // loader state
  const router = useRouter(); // router hook from nextjs
  const { userDetail, setUserDetail } = useContext(UserContext); // user context to get user detail 
  const { setWalletDetail } = useContext(WalletContext); // wallet context to set wallet detail
  const { parentRoute } = useContext(RouterContext); // router context to get parent route

  const { setWalletBalance } = useContext(BalanceContext); // balance context to set wallet balance

  const logoutMutation = useLogoutUser();

  // check if user is logged in, if logged in hide loader and show profile form
  useEffect(() => {
    if (userDetail && userDetail.email) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
      router.push("/");
    }
  }, [router, userDetail]);

  // handle profile form submission
  const onSubmit = (data: ProfileInput) => {
    console.log(data);
    setUserDetail({
      ...userDetail,
      email: data.email,
      username: data.username
    });
    router.push(parentRoute);
  };

  // handle logout button
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // handle cancel button to close profile modal
  const handleCancel = () => {
    router.push(parentRoute);
  }

  // check loader state and display loader
  if (showLoader || logoutMutation.isPending) {
    return (
      // container for showing loading spinner
      <div className="w-full max-w-[696px] h-[450px] px-12 pt-[47px] pb-[69px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:border sm:border-white ${archivo.className">
        {/* Loader */}
        <Spinner />
      </div>
    );
  }

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for profile form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-[696px] px-6 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white"
      >
        {/* title for profile form */}
        <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
          PROFILE
        </h1>
        {/* container for email input wrapper */}
        <div className="mb-6">
          {/* input wrapper for email */}
          <InputWrapper
            leftIcon={<EmailIcon />}
            type="email"
            placeholder=""
            defaultValue={userDetail.email}
            label="Email"
            name="email"
            errorMessage={errors.email?.message}
            registerOptions={{
              required: "Please enter email",
              validate: validateEmail,
            }}
          />
        </div>
        {/* container to display winning rate */}
        <div className="mb-6">
          {/* winning rate label */}
          <div
            className={`mb-2 flex justify-between text-xs font-medium text-[#808191] ${inter.className}`}
          >
            Winning Rate
          </div>
          {/* winning rate */}
          <div className="min-w-full min-h-[53.93x] w-full p-4 text-sm placeholder-white bg-[#35353E] rounded-lg outline-none sm:min-h-[51.96px]">
            54% (23/40 games)
          </div>
        </div>
        {/* container for username input wrapper */}
        <div className="mb-6">
          {/* input wrapper for username */}
          <InputWrapper
            leftIcon={<UserIcon />}
            type="text"
            placeholder=""
            defaultValue={userDetail.username}
            label="Username"
            name="username"
            errorMessage={errors.username?.message}
            registerOptions={{
              required: "Please enter username",
            }}
          />
        </div>
        {/* container for save and cancel button */}
        <div className="mt-12 flex flex-wrap gap-8 sm:flex-nowrap">
          {/* save button */}
          <GradientButton
            type="submit"
            className="basis-full py-4 text-lg text-center rounded-2xl sm:basis-[48%]"
          >
            Save
          </GradientButton>
          {/* cancel button */}
          <button
            onClick={handleCancel}
            className="basis-full py-4 text-lg text-center rounded-2xl hover:bg-[#717171]/[66%] sm:basis-[48%]"
          >
            Cancel
          </button>
        </div>
        {/* container for logout button */}
        <div className="mt-8">
          {/* logout button */}
          <button
            onClick={handleLogout}
            type="button"
            className="w-full p-4 font-semibold bg-[#F24D4D] hover:bg-[#F24D4D]/[80%] rounded-2xl"
          >
            LOGOUT
          </button>
        </div>
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

export default Profile;
