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
      <h1 className="mb-[23px] text-[32px] leading-[35.39px] text-center font-black sm:text-[70px] sm:leading-[77.47px]">
        LET'S PLAY!
      </h1>
      <h3 className="mb-[23px] font-normal text-[28px] leading-[30.97px] sm:text-[32px] sm:leading-[35.59px]">
        Choose amount to bet on
      </h3>
      <p className="font-extrabold text-[#5F5A72] text-center text-[20px] leading-[22.12px] ">
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
  const [selectedValue, setSelectedValue] = useState(1);

  const onSubmit = (data: BetAmountInput) => {
    console.log(data);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setHighlightIndex(index);
    setSelectedValue(+event.target.value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* container for radio input */}
      <div className="my-[71px] p-3 relative flex gap-[12px] flex-col rounded-[40px] bg-gradient-to-r from-[#FA8305] to-[#FB9E3C] md:flex-row">
        <div className={`w-[90vw] max-w-[327px] h-[42px] absolute top-3 left-3 bg-[#000] rounded-[40px] border-4 border-[#FFC385] md:w-[159px] md:h-[42px] hidden md:block transition-all duration-300`}
        style={{
          transform: `translateX(calc(${highlightIndex*100}% + ${highlightIndex*12}px)) translateY(0%)`
        }}
        />
         <div className={`w-[90vw] max-w-[327px] h-[42px] absolute top-3 left-3 bg-[#000] rounded-[40px] border-4 border-[#FFC385] md:w-[159px] md:h-[42px] block md:hidden transition-all duration-300`}
        style={{
          transform: `translateX(0%) translateY(calc(${highlightIndex*100}% + ${highlightIndex*12}px))`
        }}
        />
        <div className="w-[90vw] max-w-[327px] h-[42px] relative z-10 md:w-[159px] md:h-[42px]">
          <input
            id="1usdt"
            {...register("betAmount")}
            type="radio"
            value="1"
            className="hidden peer"
            onChange={(e) => handleChange(e, 0)}
          />
          <label
            htmlFor="1usdt"
            className="w-full h-full flex justify-center items-center text-[20px] leading-[23.1px] cursor-pointer select-none rounded-full"
          >
            1 USDT
          </label>
        </div>
        <div className="w-[90vw] max-w-[327px] h-[42px] relative z-10 md:w-[159px] md:h-[42px]">
          <input
            id="2usdt"
            {...register("betAmount")}
            type="radio"
            value="2"
            className="hidden peer"
            onChange={(e) => handleChange(e,1)}
          />
          <label
            htmlFor="2usdt"
             className="w-full h-full flex justify-center items-center text-[20px] leading-[23.1px] cursor-pointer select-none rounded-full"
          >
            2 USDT
          </label>
        </div>
        <div className="w-[90vw] max-w-[327px] h-[42px] relative z-10 md:w-[159px] md:h-[42px]">
          <input
            id="5usdt"
            {...register("betAmount")}
            type="radio"
            value="5"
            className="hidden peer"
            onChange={(e) => handleChange(e,2)}
          />
          <label
            htmlFor="5usdt"
             className="w-full h-full flex justify-center items-center text-[20px] leading-[23.1px] cursor-pointer select-none rounded-full"
          >
            5 USDT
          </label>
        </div>
        <div className="w-[90vw] max-w-[327px] h-[42px] relative z-10 md:w-[159px] md:h-[42px]">
          <input
            id="10usdt"
            {...register("betAmount")}
            type="radio"
            value="10"
            className="hidden peer"
            onChange={(e) => handleChange(e,3)}
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
          className="w-full mb-10 py-6 text-lg text-center rounded-2xl">
        Play over {selectedValue} USDT
      </GradientButton>
    </form>
  );
};

export default ChooseAmountPage;
