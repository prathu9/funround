"use client";
import ConfirmEmail from "@/components/ConfirmEmail";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import { useRouter } from "next/navigation";
import { useState } from "react";

// confirm login page
const Page = () => {
  const router = useRouter(); // router hook from nextjs
  const [errorMessage, setErrorMessage] = useState(""); // state for error message

  // submit function
  const submitHandler = (otp: string) => {
    // check OTP
    if(otp !== "1234"){
      setErrorMessage("Wrong digits");
    }
    else{
      // redirect to wallet setup if OTP is confirmed and login is complete
      // add check for if wallet is setup already
      router.push("/wallet-setup");
    }
  }

  return (
    // Portal for modal
    <Portal>
      {/* Modal for confirm email */}
      <ModalOverlay>
        {/* confirm email component */}
        <ConfirmEmail errorMessage={errorMessage} submitHandler={submitHandler} backLink="/login"/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
