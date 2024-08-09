import Image from "next/image";
import { RegisterOptions, useFormContext } from "react-hook-form";

type InputFileWrapperProps = {
  label: string;
  name: string;
  leftIcon?: string;
  registerOptions?: RegisterOptions;
};

const InputFileWrapper = ({
  label,
  name,
  leftIcon,
  registerOptions,
}: InputFileWrapperProps) => {
  const { register } = useFormContext();

  return (
    <div className="relative flex flex-col gap-1">
      <h5 className="mb-2 inline-block text-xs font-medium text-[#808191]">
        {label}
      </h5>
      <label className="flex gap-4 w-full p-4 text-sm placeholder-white bg-[#35353E] rounded-lg">
        {/* container for icon */}
        {/* checking if icon exists */}
        {leftIcon && (
          <div className="w-6 h-6">
            <Image src={leftIcon} width="100" height="100" alt="icon" />
          </div>
        )}
        <input
          type="file"
          className="hidden"
          {...register(name, registerOptions)}
        />
        {label}
      </label>
    </div>
  );
};

export default InputFileWrapper;
