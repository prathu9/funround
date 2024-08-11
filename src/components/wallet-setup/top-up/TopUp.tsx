"use client";
import { useState } from "react";
import { archivo } from "@/fonts/fonts";

import DepositCryptoForm from "./DepositForm";

import Spinner from "../../layout/Spinner";
import TabButton from "./TabButton";
import BuyCryptoForm from "./CryptoForm";
import AllSet from "../AllSet";

// Top up component
const TopUp = () => {
  const [topUpOption, setTopUpOption] = useState<"buy"|"deposit">("deposit");
  const [showLoader, setShowLoader] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const toggleTab = (option: "buy" | "deposit") => {
    setTopUpOption(option);
  }

  if(isDone){
    return(
        <AllSet/>
    ) 
  }

  if (showLoader) {
    return (
      // container for confirm identity
      <div
        className="w-full max-w-[696px] px-12 pt-[47px] pb-[109px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white"
      >
        {/* title */}
        <h1 className="mb-8 text-[28px] leading-[30.97px] text-center font-black sm:mb-[78.5px] sm:text-5xl">
          DEPOSITING
        </h1>
        {/* Loader */}
        <Spinner>
          <p className="w-[70%] text-center text-[#808191] sm:w-[50%]">
            Receiving Deposit
            details
          </p>
        </Spinner>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-[696px] px-6 py-[47px] absolute top-0 left-1/2 -translate-x-1/2 rounded-2xl bg-black sm:px-12 sm:border sm:border-white sm:top-[6vw] sm:translate-y-0"
    >
      {/* Title */}
      <h1 className="mb-6 text-5xl text-center font-black">LET'S TOP-UP</h1>
      <div className="mb-6 flex gap-[10px]">
        <div className="basis-[49%] h-1 bg-[#7C5AE4] rounded-full"/>
        <div className="basis-[49%] h-1 bg-[#7C5AE4] rounded-full"/>
      </div>
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
          <DepositCryptoForm setShowLoader={setShowLoader} setIsDone={setIsDone}/>:
          topUpOption === "buy"?
          <BuyCryptoForm/>:null
        }
      </div>
    </div>
  );
};

export default TopUp;
