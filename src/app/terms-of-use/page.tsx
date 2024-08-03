'use client';
import Terms from "@/components/auth/terms";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import Spinner from "@/components/layout/Spinner";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const Page = () => {
  const router = useRouter();

  // useLayoutEffect(() => {
  //   router.push("/")
  // },[router])

  return (
    <Portal>
      <ModalOverlay>
        <Terms/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;