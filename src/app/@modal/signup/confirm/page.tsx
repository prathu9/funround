"use client";
import ConfirmEmail from "@/components/ConfirmEmail";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import { UserContext } from "@/context/user-context";
import { useVerifyEmail } from "@/hooks/queries/useAuth";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

// confirm login page
const Page = () => {
  const router = useRouter(); // router hook from nextjs
  const [errorMessage, setErrorMessage] = useState(""); // state for error message
  const {
    userDetail: { email },
  } = useContext(UserContext);

  const verifyRegistrationEmail = useVerifyEmail(setErrorMessage);

  // submit function
  const submitHandler = (otp: string) => {
    verifyRegistrationEmail.mutate({
      email,
      verificationCode: otp,
    });
  };

  return (
    // Portal for modal
    <Portal>
      {/* Modal for confirm email */}
      <ModalOverlay>
        {/* confirm email component */}
        <ConfirmEmail
          isPending={verifyRegistrationEmail.isPending}
          errorMessage={errorMessage}
          submitHandler={submitHandler}
          backLink="/signup"
        />
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
