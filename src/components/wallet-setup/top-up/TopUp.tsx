"use client";
import { useContext, useEffect, useState } from "react";

import DepositCryptoForm from "./DepositForm";

import Spinner from "../../layout/Spinner";
import TabButton from "./TabButton";
import BuyCryptoForm from "./BuyForm";
import AllSet from "../AllSet";
import { useSearchParams } from "next/navigation";
import { WalletContext } from "@/context/wallet-context";
import { useRouter } from "next/navigation";

// Top up component
const TopUp = () => {
  const router = useRouter(); // router hook from nextjs
  const searchParams = useSearchParams(); // search params from nextjs
  const selectedCrypto = searchParams.get("selectedcrypto"); // selected crypto params used to select default crypto option
  const {walletDetail} = useContext(WalletContext); // get wallet detail from wallet context

  const [topUpOption, setTopUpOption] = useState<"buy"|"deposit">("deposit"); // state to toggle between buy or deposit form
  const [showLoader, setShowLoader] = useState(false); // state to display loader
  const [isDepositing, setIsDepositing] = useState(false); // state to show depositing message while deposit in progress
  const [isDone, setIsDone] = useState(false); // state to show deposit is done

  // toggle between buy and deposit form
  const toggleTab = (option: "buy" | "deposit") => {
    setTopUpOption(option);
  }

  // check if wallet setup is done before topup
  useEffect(() => {

    if(walletDetail && walletDetail.email){
      setShowLoader(false);
    }
    else{
      setShowLoader(true);
      console.log(walletDetail, walletDetail.email)
      router.push("/wallet-setup");
    }
  },[router, walletDetail])

  // show loader component if true
  if(showLoader){
    return(
       // container for showing loading spinner 
       <div
       className="w-full max-w-[696px] h-[450px] px-12 pt-[47px] pb-[69px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black sm:border sm:border-white ${archivo.className"
     >
       {/* Loader */}
       <Spinner />
     </div>
    )
  }

  // show done component if top up done
  if(isDone){
    return(
        <AllSet/>
    ) 
  }

  // show depositing message with loader while deposit is getting done
  if (isDepositing) {
    return (
      // container for depositing ui
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
    // container for top up
    <div
      className="w-full max-w-[696px] px-6 py-[47px] absolute top-[2vw] left-1/2 -translate-x-1/2  rounded-2xl bg-black sm:px-12 sm:border sm:border-white 2xl:top-1/2 2xl:-translate-y-1/2"
    >
      {/* Title for top up*/}
      <h1 className="mb-6 text-5xl text-center font-black">LET'S TOP-UP</h1>
      {/* container to indicate progress */}
      <div className="mb-6 flex gap-[10px]">
        <div className="basis-[49%] h-1 bg-[#7C5AE4] rounded-full"/>
        <div className="basis-[49%] h-1 bg-[#7C5AE4] rounded-full"/>
      </div>
      {/* container for tabs */}
      <div className="p-2 flex gap-6 h-[71px] bg-[#7C5AE4] rounded-full">
        {/* tab for deposit crypto */}
        <TabButton id="deposit-crypto-topup" name="top-up-option" value={topUpOption} onClick={() => toggleTab("deposit")} defaultChecked>
          Deposit Crypto
        </TabButton>
        {/* tab for buy crypto */}
        <TabButton id="buy-crypto-topup" name="top-up-option" value={topUpOption} onClick={() => toggleTab("buy")}>
          Buy Crypto
        </TabButton>
      </div>
      {/* container for deposit and buy crypto form */}
      <div>
        {
          topUpOption === "deposit"?
          // deposit form
          <DepositCryptoForm defaultCryptoOption={selectedCrypto} setIsDepositing={setIsDepositing} setIsDone={setIsDone}/>:
          topUpOption === "buy"?
          // buy form
          <BuyCryptoForm/>:null
        }
      </div>
    </div>
  );
};

export default TopUp;
