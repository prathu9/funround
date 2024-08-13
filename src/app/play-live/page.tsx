"use client";
import Spinner from "@/components/layout/Spinner";
import { BalanceContext } from "@/context/balance-context";
import { RouterContext } from "@/context/router-context";
import { UserContext } from "@/context/user-context";
import { WalletContext } from "@/context/wallet-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { isBalanceAvailable } = useContext(BalanceContext); // get wallet balance
  const {
    userDetail: { isLoggedIn },
  } = useContext(UserContext); // get user login status
  const { setParentRoute } = useContext(RouterContext);

  useEffect(() => {
    setParentRoute("/play-live"); // setting parent route to current route
  }, []);

  useEffect(() => {
    console.log(isLoggedIn);
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
      <div className="w-full min-h-[calc(100vh_-_180px)] flex justify-center items-center">
        <div className="text-2xl">
          <span>Please </span>
          <span>
            {!isLoggedIn ? (
              <Link href="/signup" className="text-[#AB97FF] rounded-lg">Signup</Link>
            ) : !isBalanceAvailable ? (
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
