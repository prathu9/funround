'use client';
import SignUp from "@/components/auth/SignUp";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import Spinner from "@/components/layout/Spinner";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const Page = () => {
  // const router = useRouter();

  // useLayoutEffect(() => {
  //   console.log("nav")
  //   router.push("/")
  // },[router])

  return (
    <Portal>
      <ModalOverlay>
       <SignUp/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
