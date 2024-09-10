"use client";
import GradientButton from "@/components/form-elements/GradientButton";
import { archivo } from "@/fonts/fonts";
import React, { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

// bet amount form type
interface BetAmountInput {
  betAmount: string;
}

const ChooseAmountPage = () => {
  const methods = useForm<BetAmountInput>({
    defaultValues: {
        betAmount: "1"
    }
  });

  return (
    <div
      className={`my-[40px] min-h-[calc(100vh_-_216px)] flex flex-col justify-center items-center lg:mt-[20px] ${archivo.className}`}
    >
      <h1 className="mb-[23px] text-[70px] leading-[77.47px] font-black">
        LET'S PLAY!
      </h1>
      <h3 className="mb-[23px] font-normal text-[32px] leading-[35.59px]">
        Choose amount to bet on
      </h3>
      <p className="font-extrabold leading-[22.12px] text-[#5F5A72]">
        *FOR YOUR CONVENIENCE, ALL BET'S ARE MADE WITH USDT.
      </p>
      <FormProvider {...methods}>
        <BetAmountOptions />
      </FormProvider>
    </div>
  );
};

const BetAmountOptions = () => {
  const { register, handleSubmit } = useFormContext<BetAmountInput>();
  const [highlightIndex, setHighlightIndex] = useState(0);

  const onSubmit = (data: BetAmountInput) => {
    console.log(data)
  }

  const handleChange = (index: number) => {
    setHighlightIndex(index)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* container for radio input */}
      <div className="my-[71px] p-3 relative flex gap-[12px] flex-col rounded-[40px] bg-gradient-to-r from-[#FA8305] to-[#FB9E3C] md:flex-row">
        <div className={`w-[327px] h-[42px] absolute top-3 left-3 bg-[#000] rounded-[40px] md:w-[159px] md:h-[42px] translate-x-[0%] translate-y-[calc(${highlightIndex*100}%_+_${highlightIndex*12}px)] md:translate-x-[calc(${highlightIndex*100}%_+_${highlightIndex*12}px)] md:translate-y-[0%] transition-all duration-300`}/>
        <div className="w-[327px] h-[42px] relative z-10 md:w-[159px] md:h-[42px]">
          <input
            id="1usdt"
            {...register("betAmount")}
            type="radio"
            value="1"
            className="hidden peer"
            onChange={() => handleChange(0)}
          />
          <label
            htmlFor="1usdt"
            className="w-full h-full flex justify-center items-center text-[20px] leading-[23.1px] cursor-pointer select-none rounded-full"
          >
            1 USDT
          </label>
        </div>
        <div className="w-[327px] h-[42px] relative z-10 md:w-[159px] md:h-[42px]">
          <input
            id="2usdt"
            {...register("betAmount")}
            type="radio"
            value="2"
            className="hidden peer"
            onChange={() => handleChange(1)}
          />
          <label
            htmlFor="2usdt"
             className="w-full h-full flex justify-center items-center text-[20px] leading-[23.1px] cursor-pointer select-none rounded-full"
          >
            2 USDT
          </label>
        </div>
        <div className="w-[327px] h-[42px] relative z-10 md:w-[159px] md:h-[42px]">
          <input
            id="5usdt"
            {...register("betAmount")}
            type="radio"
            value="5"
            className="hidden peer"
            onChange={() => handleChange(2)}
          />
          <label
            htmlFor="5usdt"
             className="w-full h-full flex justify-center items-center text-[20px] leading-[23.1px] cursor-pointer select-none rounded-full"
          >
            5 USDT
          </label>
        </div>
        <div className="w-[327px] h-[42px] relative z-10 md:w-[159px] md:h-[42px]">
          <input
            id="10usdt"
            {...register("betAmount")}
            type="radio"
            value="10"
            className="hidden peer"
            onChange={() => handleChange(3)}
          />
          <label
            htmlFor="10usdt"
             className="w-full h-full flex justify-center items-center text-[20px] leading-[23.1px] cursor-pointer select-none rounded-full"
          >
            10 USDT
          </label>
        </div>
      </div>
      <GradientButton type="submit"
          className="w-full py-6 text-lg text-center rounded-2xl">
        Play over 1 USDT
      </GradientButton>
    </form>
  );
};

export default ChooseAmountPage;
