"use client";
import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "../../form-elements/GradientButton";
import { CustomOption, CustomSelect } from "../../form-elements/CustomSelect";
import InputWrapper from "../../form-elements/InputWrapper";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { BalanceContext } from "@/context/balance-context";
import { getWalletBalanceWithIcon } from "@/utils/getWalletBalanceWithIcon";
import { RouterContext } from "@/context/router-context";

// input type for withdraw form
interface WithdrawInput {
  currency: string;
  amount: string;
  network: string;
}

// network data options
const networkData = [
  {
    name: "ERC20",
    value: "ERC20",
  },
];

// Withdraw components to withdraw currency
const Withdraw = () => {
  const methods = useForm<WithdrawInput>(); // useform with withdraw input
  const { walletBalance } = useContext(BalanceContext); // get wallet balance list from balance context
  const {parentRoute} = useContext(RouterContext);

  const walletBalanceDataWithIcon = walletBalance.map(getWalletBalanceWithIcon); // add crypto icon to wallet balance list

  // handle withdraw form submission
  const onSubmit = (data: WithdrawInput) => {
    console.log("withdraw", data);
  };

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* withdraw form */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-[696px] px-6 py-[47px] absolute top-[6vw] left-1/2 -translate-x-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white"
      >
        {/* title for withdraw form */}
        <h1 className="mb-12 text-[28px] leading-[30.97px] text-center font-black sm:text-5xl">
          WITHDRAW
        </h1>
        {/* container for currency options selector */}
        <div className="mb-6">
          {/* label for currency option selector */}
          <h4 className="mb-2 text-xs font-medium text-[#808191]">
            Choose Currency
          </h4>
          {/* custom selector for currency options */}
          <CustomSelect defaultValue="USDT" name="postalCode">
            {/* render all currency option with icon */}
            {walletBalanceDataWithIcon.map((crypto) => (
              <CustomOption value={crypto.symbol} key={crypto.symbol}>
                <div className="p-4 flex gap-[10px] items-center h-[49px] bg-[#35353E]">
                  <span>{crypto.icon}</span>
                  <span className="text-sm">{crypto.symbol}</span>
                  <span className="capitalize text-white/[32%]">
                    {crypto.name}
                  </span>
                </div>
              </CustomOption>
            ))}
          </CustomSelect>
        </div>
        {/* container for amount to withdraw input wrapper */}
        <div className="relative mb-6">
          {/* input wrapper for amount withdraw */}
          <InputWrapper
            type="text"
            placeholder="Choose Amount"
            label="Choose Amount"
            name="amount"
            rightIcon="Max"
          />
        </div>
        {/* container for choosing network */}
        <div className="mb-6">
          {/* label for choosing network */}
          <h4 className="mb-2 text-xs font-medium text-[#808191]">
            Choose Network
          </h4>
          {/* custom selector for choosing network */}
          <CustomSelect defaultValue="ERC20" name="network">
            {networkData.map((network) => (
              <CustomOption value={network.name} key={network.name}>
                <div className="py-4 pl-4 text-left">ERC20</div>
              </CustomOption>
            ))}
          </CustomSelect>
        </div>
        {/* container for form buttons */}
        <div className="mb-6 flex gap-3 flex-wrap justify-between sm:flex-nowrap">
          {/* button to generate address */}
          <GradientButton className="basis-full py-[26px] rounded-2xl sm:basis-[48%]">
            Generate Address
          </GradientButton>
          {/* link button to cancel - close the modal */}
          <Link
            href={parentRoute}
            className="basis-full py-[26px] rounded-2xl text-center bg-[#1B1F26] sm:basis-[48%]"
          >
            Cancel
          </Link>
        </div>
        {/* container to copy code */}
        <div className="px-6 py-4 flex justify-between bg-[#35353E] rounded-lg">
          {/* code to copy */}
          <span className="basis-[60%] text-[11px] leading-[16px] overflow-hidden text-ellipsis">
            0xec7842178520bb71f30523bcce4c10adc7e1cec4
          </span>
          {/* container copy icon */}
          <span className="flex items-center gap-2">
            <span className="text-[12.8px]">Copy</span>
            {/* copy icon */}
            <span className="w-4 h-[20px] relative">
              <Image
                src="/copy-icon.svg"
                className="object-contain"
                fill
                alt="copy"
              />
            </span>
          </span>
        </div>
      </form>
    </FormProvider>
  );
};

export default Withdraw;
