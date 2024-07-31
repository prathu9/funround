import { FormProvider, useForm } from "react-hook-form";
import GradientButton from "../form-elements/GradientButton";
import InputWrapper from "../form-elements/InputWrapper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { archivo } from "@/fonts/fonts";

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
    setTimeout(() => {
      setShowLoader(false);
      router.push("/wallet-setup/confirm");
    }, 2000);
  };

  return (
    // context provider for input wrapper
    <FormProvider {...methods}>
      {/* Container for depositing crypto */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
      >

        {/* Confirm button */}
        <GradientButton
          type="submit"
          className="w-full py-6 text-lg text-center rounded-2xl"
        >
          Done
        </GradientButton>
      </form>
    </FormProvider>
  );
};

export default BuyCryptoForm;
