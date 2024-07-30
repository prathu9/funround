'use client';
import ModalOverlay from "@/components/ModalOverlay";
import Portal from "@/components/Portal";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const Page = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push("/")
  },[router])

  return (
    <Portal>
      <ModalOverlay>
        <Spinner/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
