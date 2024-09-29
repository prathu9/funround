"use client";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import WalletSetUp from "@/components/wallet-setup/WalletSetUpForm";
import { RouterContext } from "@/context/router-context";
import { UserContext } from "@/context/user-context";
import { redirect } from "next/navigation";
import { useContext, useLayoutEffect } from "react";

// setup email confirmation page
const Page = () => {

  const {userDetail, isFetchingUser} = useContext(UserContext);
  const {parentRoute} = useContext(RouterContext);

   // check if user is already logged in or if user is getting fetched
   if((!userDetail.email && !userDetail.emailVerified) || isFetchingUser){
    return redirect(parentRoute)
  }

  return (
    // portal for set up email confirmation
    <Portal>
      {/* modal for set up email confirmation*/}
      <ModalOverlay>
         {/* wallet set up form */}
         <WalletSetUp/>
      </ModalOverlay>
    </Portal>
  );
};

export default Page;
