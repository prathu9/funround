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

interface ProfileInput {
  email: string;
  password: string;
}

const Profile = () => {
  const methods = useForm<ProfileInput>();
  const [showLoader, setShowLoader] = useState(true);
  const router = useRouter();
  const {
    userDetail,
    setUserDetail
  } = useContext(UserContext);

  useEffect(() => {
    if(userDetail && userDetail.isLoggedIn){
      setShowLoader(false);
    }
    else{
      setShowLoader(true);
      router.push("/");
    }
  },[router, userDetail])

  const onSubmit = (data: ProfileInput) => {
    console.log(data);
    router.push("/login/confirm");
  };

  const handleLogout = () => {
    localStorage.setItem("user-detail", JSON.stringify({}));
    setUserDetail({
      ...userDetail,
      isLoggedIn: false
    });
    router.push("/");
  }

  if(showLoader){
    return(
       // container for showing loading spinner 
       <div
       className="w-full max-w-[696px] h-[450px] px-12 pt-[47px] pb-[69px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:border sm:border-white ${archivo.className"
     >
       {/* Loader */}
       <Spinner />
     </div>
    )
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
          PROFILE
        </h1>
        <div className="mb-6">
          <InputWrapper
            leftIcon={<EmailIcon/>}
            type="email"
            placeholder={userDetail.email}
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
            leftIcon={<UserIcon/>}
            type="text"
            placeholder={userDetail.username}
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
        <div className="mt-8">
          <button onClick={handleLogout} type="button" className="w-full p-4 font-semibold bg-[#F24D4D] hover:bg-[#F24D4D]/[80%] rounded-2xl">
            LOGOUT
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Profile;
