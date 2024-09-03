"use client"
import ConfirmEmail from "@/components/ConfirmEmail";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import { useRouter } from "next/navigation";
import { useState } from "react";

// wallet setup confirm page
const Page = () => {
  const router = useRouter(); // router hook from nextjs
  const [errorMessage, setErrorMessage] = useState(""); // state for errorMessage
  const submitHandler = (otp: string) => {
    // check otp
    if(otp !== "1234"){
      setErrorMessage("Wrong digits");
    }
    else{
      // redirect to wallet setup form 
      router.push("/wallet-setup/setup-form");
    }
  }

  return (
    // portal for confirm email
    <Portal>
      {/* modal for confirm email */}
      <ModalOverlay>
        {/* confirm email for wallet setup */}
        <ConfirmEmail errorMessage={errorMessage} submitHandler={submitHandler} backLink="/wallet-setup"/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
