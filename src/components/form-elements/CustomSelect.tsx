"use client";

import React, {
  ReactElement,
  ReactNode,
  useContext,
  useState,
  createContext,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { useFormContext } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// custom select props
interface CustomSelectProp {
  children: ReactNode;
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

// const options = [
//   { label: "USDT", value: "tether" },
//   { label: "ETH", value: "etherium" },
// ];

// custom select context type
interface SelectContextType {
  name: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// custom select context
const SelectContext = createContext({
  name: "", //name of select
  selectedValue: "", // selected value
  setSelectedValue: () => {}, // setting selected value
  setIsOpen: () => {}, // open select options
} as SelectContextType);

// Custom select component
export const CustomSelect = ({
  placeholder,
  children,
  name,
  defaultValue,
}: CustomSelectProp) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || ""); // state for selected value
  const [isOpen, setIsOpen] = useState(false); // set to toggle options

  // get selected label from options using value props of option
  // this label will be displayed, useful for options with icons
  const selectedLabel = React.Children.toArray(children).find(
    (child) => (child as ReactElement)!.props.value === selectedValue
  );

  // function to toggle option
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    // select provider
    <SelectContext.Provider value={{ name, selectedValue, setSelectedValue, setIsOpen }}>
      {/* container for select button and options */}
      <div className="relative">
        {/* button to toggle select options */}
        <button
          type="button"
          className={`pr-4 w-full flex justify-between items-center overflow-hidden bg-[#35353E] ${isOpen? "rounded-t-lg":"rounded-lg"}`}
          onClick={toggleOpen}
        >
          {/* display selected option as button child if selected label is available */}
          {selectedLabel ? (
            <div className="max-w-[80%] basis-[80%] whitespace-nowrap overflow-hidden text-ellipsis">
              {(selectedLabel as ReactElement).props.children}
            </div>
          ) : (
            // display placeholder value if nothing selected
            <div className="p-4">{placeholder}</div>
          )}
          {/* up and down icon of select */}
          <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
        </button>
        {/* toggle options */}
        {isOpen && children && (
          // container for options
          <ul className="pb-4 w-full max-h-[220px] absolute bg-[#35353E] z-10 overflow-auto">
            {/* render options */}
            {React.Children.map(children, (child, index) => {
              return (
                <li className="w-full h-fit" key={index}>
                  {child}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </SelectContext.Provider>
  );
};

// custom select options prop
interface CustomOptionProp {
  children: ReactNode;
  value: string;
  id?: string;
}

// Custom option component
export const CustomOption = ({ children, value, id }: CustomOptionProp) => {
  const { name, setSelectedValue, selectedValue, setIsOpen } = useContext(SelectContext); // get values from select context
  const { register, setValue } = useFormContext(); // useFormContext from react hook form

  // function to call when option is selected
  const changeSelectedValue = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    setValue(name, value);
  };

  return (
    <>
    {/* using input with radio type for options, it is hidden*/}
      <input
        id={id}
        {...register(name)}
        type="radio"
        value={value}
        className="hidden peer"
        checked={value===selectedValue}
      />
      {/* label is displayed with value bound to input */}
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:bg-slate-500"
        onClick={() => changeSelectedValue(value)}
      >
        {children}
      </label>
    </>
  );
};
