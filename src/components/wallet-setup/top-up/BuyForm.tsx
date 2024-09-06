import { FormProvider, useForm } from "react-hook-form";

import { CustomOption, CustomSelect } from "../../form-elements/CustomSelect";

import InputWrapper from "@/components/form-elements/InputWrapper";
import CryptoOptions from "@/data/cryptoOptions";

// buy crypto form input type
interface BuyCryptoInput {
  postalCode: string;
}

// buy crypto form
const BuyCryptoForm = () => {
  const methods = useForm<BuyCryptoInput>(); // useform with type of buy crypto input
  
  // handle buy crypto form submission
  const onSubmit = (data: BuyCryptoInput) => {
    console.log(data);
  };

  return (
      // context provider for input wrapper
      <FormProvider {...methods}>
      {/* Container for depositing crypto form */}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* container for form fields */}
        <div className="py-6">
          {/* container for custom crypto select */}
          <div className="mb-6">
            {/* label for selecting crypto */}
            <h4 className="mb-2 text-xs font-medium text-[#808191]">Choose Currency</h4>
            {/* custom selector for crypto */}
            <CustomSelect defaultValue="USDT" name="postalCode">
              {CryptoOptions.map((crypto) => (
                <CustomOption value={crypto.symbol} key={crypto.symbol}>
                  <div className="p-4 flex gap-[10px] items-center h-[49px] bg-[#35353E]">
                    <span>{crypto.icon}</span>
                    <span className="text-sm">{crypto.symbol}</span>
                    <span className="capitalize text-white/[32%]">{crypto.name}</span>
                  </div>
                </CustomOption>
              ))}
            </CustomSelect>
          </div>
          {/* container for amount input wrapper */}
          <div>
            {/* crypto amount input wrapper */}
            <InputWrapper
              type="text"
              placeholder="100.00 USDT"
              label="Choose Amount"
              name="amount"
            />
          </div>
        </div>
        {/* container for 3rd party widgets button */}
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
