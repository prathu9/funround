import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "../../form-elements/GradientButton";
import { Dispatch, SetStateAction, useContext } from "react";
import Image from "next/image";
import { CustomOption, CustomSelect } from "../../form-elements/CustomSelect";

import Link from "next/link";
import { BalanceContext } from "@/context/balance-context";
import CryptoOptions from "@/data/cryptoOptions";

interface DepositCryptoInput {
  postalCode: string;
}

type DepositCryptoFormProps = {
  defaultCryptoOption?: string | null;
  setIsDepositing: Dispatch<SetStateAction<boolean>>;
  setIsDone: Dispatch<SetStateAction<boolean>>;
};

const DepositCryptoForm = ({
  defaultCryptoOption,
  setIsDepositing,
  setIsDone,
}: DepositCryptoFormProps) => {
  const { walletBalance, setWalletBalance } = useContext(BalanceContext);
  const methods = useForm<DepositCryptoInput>({
    defaultValues: {
      postalCode: defaultCryptoOption || CryptoOptions[0].name
    }
  });
 

  const onSubmit = (data: DepositCryptoInput) => {
    console.log(data);
     setIsDepositing(true);
    setTimeout(() => {
      setIsDone(true);
       setIsDepositing(false);
      const updatedWalletBalance = walletBalance.map((walletCrypto, index) => {
        if (walletCrypto.name === data.postalCode) {
          const currentValue = JSON.parse(localStorage.getItem("wallet-balance") || '{}')[index];
          const depositedAmount = +currentValue.amount + 10;
          return {
            ...walletCrypto,
            amount: `${depositedAmount}`,
            valueInDollars: `${depositedAmount + depositedAmount*0.1}`,
          };
        }
        return walletCrypto;
      });
      setWalletBalance([...updatedWalletBalance]);
    }, 2000);
  };

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for depositing crypto */}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="py-6">
          <div>
            <h4 className="mb-2 text-xs font-medium text-[#808191]">
              Postal code
            </h4>
            <CustomSelect
              defaultValue={defaultCryptoOption || CryptoOptions[0].name}
              name="postalCode"
            >
              {CryptoOptions.map((crypto) => (
                <CustomOption value={crypto.name} key={crypto.symbol}>
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
          <div className="py-[19px] h-[223px] flex gap-6 justify-center items-center text-[12.8px] leading-[13.93px]">
            <div className="relative basis-[48%] aspect-[0.96] sm:basis-[29.8%]">
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
            <span className="basis-[60%] text-[11px] leading-[16px] overflow-hidden text-ellipsis">
              0xec7842178520bb71f30523bcce4c10adc7e1cec4
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[12.8px]">Copy</span>
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
        </div>
        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          {/* Done button */}
          <GradientButton
            type="submit"
            className="w-full py-6 text-lg text-center rounded-2xl"
          >
            Done
          </GradientButton>
          <Link
            href="/"
            className="w-full py-6 text-lg text-center rounded-2xl hover:bg-[#717171]/[66%]"
          >
            Later
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default DepositCryptoForm;
