import FadeIn from "@/components/animate/FadeIn";
import { FloatingFocusManager, useRole } from "@floating-ui/react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import Link from "next/link";
import { useState } from "react";
import BankNote from "/public/bank-note-icon.svg";
import ConvertIcon from "/public/convert-icon.svg";

interface WalletItemProps {
  cryptoData: {
    icon: JSX.Element;
    name: string;
    amount: string;
    valueInDollars: string;
  };
  index: number;
}

const WalletItem = ({ cryptoData, index }: WalletItemProps) => {
  const [isOpen, setIsOpen] = useState(false); // toggle wallet deposit option

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(2), flip(), shift()],
    whileElementsMounted: autoUpdate,
  }); // use float for floating options

  const click = useClick(context); // Define interaction for clicking the floating element
  const dismiss = useDismiss(context); // Define interaction to dismiss the floating element (e.g., clicking outside)
  const role = useRole(context); // Define role-related interaction, like applying appropriate ARIA roles

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role
  ]);

  return (
    <>
    {/* FadeIn component to smoothly animate the appearance of the crypto item */}
      <FadeIn
        ref={refs.setReference}
        {...getReferenceProps()}
        delay={index * 0.05}
        className="w-full p-2 flex gap-[9px] items-center cursor-pointer rounded-lg hover:bg-[#1F2128] select-none"
      >
        {/* crypto icon */}
        {cryptoData.icon}
        {/* crypto balance amount */}
        <span>{cryptoData.amount}</span>
        {/* cryptoData balance in dollars */}
        <span className="text-[#5F5A72]">${cryptoData.valueInDollars}</span>
      </FadeIn>
      {/* open or close floating item depending on isOpen state */}
      {isOpen && (
          // FloatingFocusManager ensures keyboard accessibility and focus handling inside the floating element
        <FloatingFocusManager context={context} modal={false}>
          {/* floating container for displaying options for deposit and convert crypto */}
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {/* container for deposit and convert crypto*/}
            <div className="p-6 flex flex-col gap-[10px] rounded-lg bg-[#1F2128] select-none">
              {/* name of crypto */}
              <h2 className="text-lg uppercase">{cryptoData.name}</h2>
              {/* link to deposit or buying crypto */}
              <Link href={`/wallet-setup/top-up?selectedcrypto=${cryptoData.name}`} className="px-5 py-[10px] flex items-center gap-3 bg-[#2C2E37] rounded-lg">
                <span><BankNote/></span>
                <span>BUY/DEPOSIT</span>  
              </Link>
              {/* link to convert currency */}
              <span className="px-5 py-[10px] flex items-center gap-3 bg-[#2C2E37] rounded-lg">
                <span><ConvertIcon/></span>
                <span>Convert</span>
              </span>
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};

export default WalletItem;
