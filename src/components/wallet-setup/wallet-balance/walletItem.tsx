import FadeIn from "@/components/animate/FadeIn";

interface WalletItemProps {
  cryptoData: {
    icon: JSX.Element;
    name: string;
    amount: string;
    valueInDollars: string;
  };
  index: number
}

const WalletItem = ({ cryptoData, index }: WalletItemProps) => {
  return (
    <FadeIn delay={index*0.05} className="flex gap-[9px] items-center">
      {/* crypto icon */}
      {cryptoData.icon}
      {/* crypto balance amount */}
      <span>{cryptoData.amount}</span>
      {/* cryptoData balance in dollars */}
      <span className="text-[#5F5A72]">${cryptoData.valueInDollars}</span>
    </FadeIn>
  );
};

export default WalletItem;
