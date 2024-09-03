import { ReactNode } from "react";

// props type for spinner
interface SpinnerPropType{
  children?: ReactNode,
  bgColor?: string
}

// spinner component
const Spinner = ({children, bgColor="bg-black"}:SpinnerPropType) => {
  return (
    // container for spinner
    <div className="relative flex items-center justify-center w-full h-full">
      {/* spinner */}
      <div className="animate-spin w-[189px] h-[189px] flex justify-center items-center loader rounded-full overflow-hidden bg-gradient-to-r from-[#6337FF] to-[#B4A1FF] bg-clip-content">
        <div className={`w-[90%] h-[90%] rounded-full ${bgColor}`}/>
      </div>
      {/* inner content of spinner */}
      <div className="w-1/2 flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
};

export default Spinner;
