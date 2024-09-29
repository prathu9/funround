import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useController,
  useFormContext,
  Validate,
} from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Type for InputDateWrapper props
type InputDateWrapperProps = {
  id: string; // input id
  label: string; // input label
  name: string; // input name
  leftIcon?: JSX.Element; // icon
  placeholder: string; // input placeholder
  registerOptions?: RegisterOptions; // react hook form register options
  errorMessage?: string; // error message
  validateDate:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>
    | undefined;
  handleChange?: (name: string, value: string | Date | null) => void,
  defaultValue?: Date | null
};

// InputDateWrapper component for date input
const InputDateWrapper = ({
  id,
  label,
  name,
  leftIcon,
  placeholder,
  errorMessage,
  validateDate,
  handleChange,
}: InputDateWrapperProps) => {
  const { control } = useFormContext();

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
            validate: validateDate,
          }}
          render={({ field: { onChange, value } }) => (
            // react date picker
            <DatePicker
              selected={value}
              dateFormat="dd/MM/yyyy"
              placeholderText={placeholder}
              onChange={(date) => {
                onChange(date);
                if(handleChange){
                  handleChange(name, date);
                }
              }}
              renderCustomHeader={CustomHeader}
              className={`flex w-full p-4 pl-[50px] text-sm placeholder-white bg-[#35353E] rounded-lg ${
                errorMessage && "border border-[#F24D4D]"
              }`}
            />
  )}
        />
        {/* calendar icon */}
        <div className="absolute top-[12px] left-[19px] w-[22px] aspect-[0.8] z-[2]">
          {leftIcon}
        </div>
      </div>
    </div>
  );
};

// custom header for calendar
const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => {
  const currentYear = getYear(new Date()); // getting current year
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, index) => 1900 + index
  ); // getting years to display in header
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]; // months to display in header

  return (
    // container for custom header
    <div className="mx-2 my-3 flex justify-between">
      {/* button with left arrow */}
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        <FaChevronLeft />
      </button>
      {/* select for year */}
      <select
        className="p-1 cursor-pointer"
        value={getYear(date)}
        onChange={(e) => changeYear(Number(e.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      {/* select for month */}
      <select
        className="p-1 cursor-pointer"
        value={months[getMonth(date)]}
        onChange={(e) => changeMonth(months.indexOf(e.target.value))}
      >
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
      {/* button with right arrow */}
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default InputDateWrapper;
