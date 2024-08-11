import { ReactNode } from "react";

interface SpinnerPropType{
  children?: ReactNode,
  bgColor?: string
}

const Spinner = ({children, bgColor="bg-black"}:SpinnerPropType) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="animate-spin w-[189px] h-[189px] flex justify-center items-center loader rounded-full overflow-hidden bg-gradient-to-r from-[#6337FF] to-[#B4A1FF] bg-clip-content">
        <div className={`w-[90%] h-[90%] rounded-full ${bgColor}`}/>
      </div>
      <div className="w-1/2 flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
};

export default Spinner;
