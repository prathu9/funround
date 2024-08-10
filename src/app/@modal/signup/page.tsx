import SignUp from "@/components/auth/SignUp";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import Spinner from "@/components/layout/Spinner";
import { Suspense } from "react";

const Page = () => {
  return (
    <Portal>
      <ModalOverlay>
        <Suspense fallback={<Spinner />}>
          <SignUp />
        </Suspense>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
