import SignUp from "@/components/auth/SignUp";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import Spinner from "@/components/layout/Spinner";
import { Suspense } from "react";

// signup page
const Page = () => {
  return (
    // portal for signup page
    <Portal>
      {/* modal for signup */}
      <ModalOverlay>
        {/* show spinner while signup form loads */}
        <Suspense fallback={<Spinner />}>
        {/* signup form */}
          <SignUp />
        </Suspense>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
