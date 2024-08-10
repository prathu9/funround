import DatePicker from "react-datepicker";
import { Controller, FieldValues, RegisterOptions, useFormContext, Validate } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, subMonths } from "date-fns";

// Type for InputDateWrapper props
type InputDateWrapperProps = {
  id: string; // input id
  label: string; // input label
  name: string; // input name
  leftIcon?: JSX.Element; // icon
  placeholder: string; // input placeholder
  registerOptions?: RegisterOptions; // react hook form register options
  errorMessage?: string; // error message
  validateDate: Validate<any, FieldValues> | Record<string, Validate<any, FieldValues>> | undefined
};


// InputDateWrapper component for date input
const InputDateWrapper = ({
  id,
  label,
  name,
  leftIcon,
  placeholder,
  errorMessage,
  validateDate
}: InputDateWrapperProps) => {
  const { control } = useFormContext();
console.log(errorMessage)
  return (
    // container for input date wrapper
    <div className="flex flex-col gap-1">
      {/* container for input label with error message */}
      <h5 className="mb-2 flex justify-between text-xs font-medium text-[#808191]">
        {/* input label */}
        <label>{label}</label>
        {/* error message */}
        {errorMessage && <span className="text-[#F24D4D]">{errorMessage}</span>}
      </h5>
      {/* container for date input */}
      <div className="relative flex flex-col w-full">
        {/* react hook form controller to control react date picker */}
        <Controller
          name={name}
          control={control}
          rules={{
            required: "Please select date of birth",
            validate: validateDate
          }}
          render={({field: {onChange, value}}) => (
            // react date picker
            <DatePicker
              selected={value}
              dateFormat="dd/MM/yyyy"
              placeholderText={placeholder}
              onChange={onChange}
              showYearDropdown
              showMonthDropdown
              className={`flex w-full p-4 pl-[50px] text-sm placeholder-white bg-[#35353E] rounded-lg ${errorMessage && "border border-[#F24D4D]"}`}
            />
          )}
        />
        {/* calendar icon */}
         <div className="absolute top-[14.5px] left-[19px] w-[22px] aspect-[0.8] z-[2]">{leftIcon}</div>
      </div>
    </div>
  );
};

export default InputDateWrapper;
