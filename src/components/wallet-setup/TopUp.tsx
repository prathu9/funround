"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputWrapper from "../form-elements/InputWrapper";
import GradientButton from "../form-elements/GradientButton";
import { archivo } from "@/fonts/fonts";
import TabButton from "./TabButton";
import DepositCryptoForm from "./DepositForm";
import BuyCryptoForm from "./CryptoForm";

const TopUp = () => {
  const [topUpOption, setTopUpOption] = useState<"buy"|"deposit">("deposit");

  const toggleTab = (option: "buy" | "deposit") => {
    setTopUpOption(option);
  }

  return (
    <div
      className={`w-full max-w-[696px] px-12 py-[47px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white rounded-2xl bg-black ${archivo.className}`}
    >
      {/* Title */}
      <h1 className="mb-6 text-5xl text-center font-black">LET'S TOP-UP</h1>
      {/* container for tabs */}
      <div className="p-2 flex gap-6 h-[71px] bg-[#7C5AE4] rounded-full">
        <TabButton id="deposit-crypto-topup" name="top-up-option" value={topUpOption} onClick={() => toggleTab("deposit")} defaultChecked>
          Deposit Crypto
        </TabButton>
        <TabButton id="buy-crypto-topup" name="top-up-option" value={topUpOption} onClick={() => toggleTab("buy")}>
          Buy Crypto
        </TabButton>
      </div>
      <div>
        {
          topUpOption === "deposit"?
          <DepositCryptoForm/>:
          topUpOption === "buy"?
          <BuyCryptoForm/>:null
        }
      </div>
    </div>
  );
};

export default TopUp;
