"use client";
import Spinner from "@/components/layout/Spinner";
import { BalanceContext } from "@/context/balance-context";
import { RouterContext } from "@/context/router-context";
import { UserContext } from "@/context/user-context";
import { WalletContext } from "@/context/wallet-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

// page for play live
const Page = () => {
  const router = useRouter(); // router hook from nextjs
  const { isBalanceAvailable } = useContext(BalanceContext); // get wallet balance
  const {
    userDetail: { isLoggedIn },
  } = useContext(UserContext); // get user login status
  const { setParentRoute } = useContext(RouterContext); // setParentRoute from router context to update parent route
  useEffect(() => {
    setParentRoute("/play-live"); // setting parent route to current route
  }, [setParentRoute]);

  useEffect(() => {
    console.log(isLoggedIn, isBalanceAvailable);
    // if not logged in take to sign up page
    if (!isLoggedIn) {
      router.replace("/signup");
    }
    // if wallet balance is zero take to top up page
    else if (!isBalanceAvailable) {
      router.replace("/wallet-setup/top-up");
    }
  }, [isBalanceAvailable, router, isLoggedIn]);

  // show loading page if balance is not available or user not logged in
  if (!isBalanceAvailable || !isLoggedIn) {
    return (
      // container to display message if not logged in or balance not available
      <div className="w-full min-h-[calc(100vh_-_180px)] flex justify-center items-center">
        <div className="text-2xl">
          <span>Please </span>
          <span>
            {/* display signup link if not logged in */}
            {!isLoggedIn ? (
              <Link href="/signup" className="text-[#AB97FF] rounded-lg">Signup</Link>
            ) : 
            // display top up link if wallet not top up
            !isBalanceAvailable ? (
              <Link href="/wallet-setup/top-up" className="text-[#AB97FF] rounded-lg">Top up</Link>
            ) : null}
          </span>{" "}
          <span>to play</span>
        </div>
      </div>
    );
  }

  return (
    // container for play live
    <div className="min-h-[calc(100vh_-_180px)] flex justify-center items-center">
      <h1 className="text-5xl">Play Live</h1>
    </div>
  );
};

export default Page;
