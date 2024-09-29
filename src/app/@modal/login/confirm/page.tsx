"use client";
import ConfirmEmail from "@/components/ConfirmEmail";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import { UserContext } from "@/context/user-context";
import { useVerifyEmail } from "@/hooks/queries/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

// confirm login page
const Page = () => {
  const router = useRouter(); // router hook from nextjs
  const [errorMessage, setErrorMessage] = useState(""); // state for error message
  const {
    userDetail: { email },
  } = useContext(UserContext);

  const verifyRegistrationEmail = useVerifyEmail();

  // submit function
  const submitHandler = (otp: string) => {
    verifyRegistrationEmail.mutate(
      {
        email,
        verificationCode: otp,
      },
      {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setErrorMessage(error.response?.data.message);
          }
        },
      }
    );
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
          backLink="/login"
        />
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
