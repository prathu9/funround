import GreenCheckIcon from "/public/green-check-icon.svg";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { RouterContext } from "@/context/router-context";

// All set component to display when currency amount is added in wallet
const AllSet = () => {
  const router = useRouter(); // router hook from nextjs
  const {parentRoute} = useContext(RouterContext); // get parentRoute from router context

  // close all set modal after 2 seconds
  useEffect(() => {
    setTimeout(() => {
      router.push(parentRoute);
    }, 2000);
  },[router, parentRoute])

  return (
    // container to display all set message
    <div
      className="w-full max-w-[696px] min-h-[516px] px-12 pt-[47px] pb-[69px] flex flex-col justify-center items-center rounded-2xl bg-black sm:px-12 sm:border sm:border-white"
    >
      {/* green check mark icon */}
      <GreenCheckIcon />

      {/* success message */}
      <h1 className="mt-7 text-5xl text-center font-black">All set!</h1>
    </div>
  );
};

export default AllSet;
