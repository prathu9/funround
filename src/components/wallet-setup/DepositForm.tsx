import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "../form-elements/GradientButton";
import InputWrapper from "../form-elements/InputWrapper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { archivo } from "@/fonts/fonts";
import Image from "next/image";

interface DepositCryptoInput {
  postalCode: string;
}

const DepositCryptoForm = () => {
  const methods = useForm<DepositCryptoInput>();
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const onSubmit = (data: DepositCryptoInput) => {
    console.log(data);
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      router.push("/wallet-setup/confirm");
    }, 2000);
  };

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for depositing crypto */}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="py-6">
          <div>
            <InputWrapper
              type="text"
              placeholder="USDT"
              label="Postal code"
              name="country"
            />
          </div>
          <div className="py-[19px] h-[223px] flex gap-6 justify-center items-center text-[12.8px] leading-[13.93px]">
            <div className="relative basis-[29.8%] aspect-[0.96]">
                <Image src="/barcode.jpg" fill alt="barcode" />
            </div>
            <div className="basis-[34%]">
              <p className="mb-3">
                Send only USDT to this address. Ensure the network is{" "}
                <span className="text-[#516AE4]">
                  Binance Smart Chain (BEP20).
                </span>
              </p>
              <div className="mb-3">
                <h3 className="font-bold">Minimum Deposit</h3>
                <span>10.00 USDT</span>
              </div>
              <div className="mb-3">
                <h3 className="font-bold">Expected arrival & unlock</h3>
                <span>15 Network Confirmations</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-between bg-[#35353E] rounded-lg">
            <span>0xec7842178520bb71f30523bcce4c10adc7e1cec4</span>
            <span className="flex items-center gap-2">
              <span>Copy</span>
              <span className="w-4 h-[25px] relative">
                <Image
                  src="/copy-icon.svg"
                  className="object-contain"
                  fill
                  alt="copy"
                />
              </span>
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          {/* Done button */}
          <GradientButton
            type="submit"
            className="w-full py-6 text-lg text-center rounded-2xl"
          >
            Done
          </GradientButton>
          <button className="w-full py-6 text-lg text-center rounded-2xl">
            Later
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default DepositCryptoForm;
