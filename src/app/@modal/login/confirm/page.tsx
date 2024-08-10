"use client";
import ConfirmEmail from "@/components/ConfirmEmail";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const submitHandler = (otp: string) => {
    if(otp !== "1234"){
      setErrorMessage("Wrong digits");
    }
    else{
      router.push("/wallet-setup");
    }
  }

  return (
    <Portal>
      <ModalOverlay>
        <ConfirmEmail errorMessage={errorMessage} submitHandler={submitHandler} backLink="/login"/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
