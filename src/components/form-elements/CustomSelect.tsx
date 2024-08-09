"use client";

import React, {
  ReactElement,
  ReactNode,
  useContext,
  useState,
  createContext,
  useRef,
} from "react";
import { useFormContext } from "react-hook-form";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface CustomSelectProp {
  children: ReactNode;
  defaultValue: string;
  name: string;
}

const options = [
  { label: "USDT", value: "tether" },
  { label: "ETH", value: "etherium" },
];

interface SelectContextType {
  name: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectContext = createContext({
  name: "",
  setSelectedValue: () => {},
  setIsOpen: () => {}
} as SelectContextType);

// Custom select component
export const CustomSelect = ({
  children,
  name,
  defaultValue,
}: CustomSelectProp) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const triggerButtonRef = useRef(null);

  const selectedLabel = React.Children.toArray(children).find(
    (child) => (child as ReactElement)!.props.value === selectedValue
  );

  const toggleOpen = (event:any) => {
    setIsOpen(!isOpen);
  };

  return (
    <SelectContext.Provider value={{ name, setSelectedValue, setIsOpen }}>
      <div className="relative">
        <button
          ref={triggerButtonRef}
          type="button"
          className="pr-4 w-full flex justify-between items-center rounded-lg overflow-hidden bg-[#35353E]"
          onClick={toggleOpen}
        >
          {selectedLabel && (selectedLabel as ReactElement).props.children}
          <span>
            {isOpen? <FaChevronUp/>:<FaChevronDown/>}
          </span>
        </button>
        {isOpen && children && (
          <ul className="pb-4 w-full max-h-[220px] absolute bg-[#35353E] z-10 overflow-auto">
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

interface CustomOptionProp {
  children: ReactNode;
  value: string;
}

// Custom option component
export const CustomOption = ({ children, value }: CustomOptionProp) => {
  const { name, setSelectedValue, setIsOpen } = useContext(SelectContext);
  const { register } = useFormContext();

  const changeSelectedValue = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };
  return (
    <>
      <label htmlFor={value} className="cursor-pointer" onClick={() => changeSelectedValue(value)}>
        {children}
      </label>
      <input id={value} {...register(name)} type="radio" value={value} className="hidden peer" />
    </>
  );
};
