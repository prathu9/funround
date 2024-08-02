import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "../form-elements/GradientButton";
import InputWrapper from "../form-elements/InputWrapper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { archivo } from "@/fonts/fonts";
import { CustomOption, CustomSelect } from "../form-elements/CustomSelect";
import Image from "next/image";

interface BuyCryptoInput {
  postalCode: string;
}

const BuyCryptoForm = () => {
  const methods = useForm<BuyCryptoInput>();
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const onSubmit = (data: BuyCryptoInput) => {
    console.log(data);
    setShowLoader(true);
  };

  return (
      // context provider for input wrapper
      <FormProvider {...methods}>
      {/* Container for depositing crypto */}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="py-6">
          <div className="mb-6">
            <h4 className="mb-2 text-xs font-medium text-[#808191]">Postal code</h4>
            <CustomSelect defaultValue="USDT" name="postalCode">
              <CustomOption value="USDT">
                <div className="p-4 flex h-[49px] bg-[#35353E]">
                  Tether
                </div>
              </CustomOption>
              <CustomOption value="ETH">
                <div className="p-4 flex h-[49px] bg-[#35353E]">
                  ETHEREUM
                </div>
              </CustomOption>
            </CustomSelect>
          </div>
          <div>
            <InputWrapper
              type="text"
              placeholder="100.00 USDT"
              label="Choose Amount"
              name="amount"
            />
          </div>
        </div>
        <div className="flex gap-6 flex-col">
          <button className="w-full py-6 border-2 border-white text-lg text-center rounded-2xl">
            3RD Party widget
          </button>
          <button className="w-full py-6 border-2 border-white text-lg text-center rounded-2xl">
            3RD Party widget 2
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default BuyCryptoForm;
