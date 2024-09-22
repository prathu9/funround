"use client";
import SignUp from "@/components/auth/SignUp";
import ModalOverlay from "@/components/layout/ModalOverlay";
import Portal from "@/components/layout/Portal";
import Spinner from "@/components/layout/Spinner";
import { RouterContext } from "@/context/router-context";
import { UserContext } from "@/context/user-context";
import { redirect, useRouter } from "next/navigation";
import { Suspense, useContext, useEffect, useLayoutEffect } from "react";

// signup page
const Page = () => {
  const {userDetail, isFetchingUser} = useContext(UserContext);
  const {parentRoute} = useContext(RouterContext);

  // useLayoutEffect(() => {
  //   console.log(userDetail.email)
  //   if(userDetail.email){
  //     router.push(parentRoute);
  //   }
  // },[parentRoute, router, userDetail])

  if(userDetail.email || isFetchingUser){
    return redirect(parentRoute)
  }

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
