"use client";
import GradientButton from "@/components/form-elements/GradientButton";
import { RouterContext } from "@/context/router-context";

import Image from "next/image";
import { useContext, useEffect } from "react";

const page = () => {
  const {setParentRoute} = useContext(RouterContext);

  useEffect(() => {
    setParentRoute("/demo-play");
  },[])

  return (
    <div className="flex justify-center items-center flex-col pt-[64px] sm:pt-[57px]">
      <div className="relative aspect-[0.515] overflow-hidden bg-gradient-to-b from-[rgba(58,62,69,0.0001)] to-[rgba(27,29,33,0.900787)]
      w-[100%] sm:aspect-[2.38] sm:w-[90%] sm:rounded-3xl lg:w-[66%] 2xl:w-[50%]">
        <Image
          src="/cover-img.png"
          fill
          className="object-cover sm:object-[0%_30%]"
          alt="thumbnail"
        />
      </div>
      <GradientButton as="link" link="/play-live" className="mt-[30px] mb-[63.31px] p-6 rounded-2xl sm:mt-[100px]">
        Im Ready to play live
      </GradientButton>
    </div>
  );
};

export default page;
