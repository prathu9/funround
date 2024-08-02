import { archivo } from "@/fonts/fonts";
import GreenCheckIcon from "/public/green-check-icon.svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AllSet = () => {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  },[router])

  return (
    <div
      className={`w-full max-w-[696px] min-h-[516px] px-12 pt-[47px] pb-[69px] flex flex-col justify-center items-center rounded-2xl bg-black sm:px-12 sm:border sm:border-white ${archivo.className}`}
    >
      <GreenCheckIcon />

      {/* title */}
      <h1 className="mt-7 text-5xl text-center font-black">All set!</h1>
    </div>
  );
};

export default AllSet;
