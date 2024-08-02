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
}

const SelectContext = createContext({
  name: "",
  setSelectedValue: () => {},
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
    <SelectContext.Provider value={{ name, setSelectedValue }}>
      <div className="relative">
        <button
          ref={triggerButtonRef}
          type="button"
          className="w-full rounded-lg overflow-hidden bg-[#35353E]"
          onClick={toggleOpen}
        >
          {selectedLabel && (selectedLabel as ReactElement).props.children}
        </button>
        {isOpen && children && (
          <ul className="w-full absolute bg-[#35353E] z-10">
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
  const { name, setSelectedValue } = useContext(SelectContext);
  const { register } = useFormContext();

  const changeSelectedValue = (value: string) => {
    setSelectedValue(value);
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
