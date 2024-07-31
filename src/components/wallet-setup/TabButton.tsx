type TabButtonProps = {
  id: string;
  name: string;
  value: string;
  children: React.ReactNode;
  onClick: () => void;
  defaultChecked?: boolean;
};

const TabButton = ({ id, name, value, children, onClick, defaultChecked }: TabButtonProps) => {
  return (
    <div className="basis-[48%] h-full">
      <input
        id={id}
        className="hidden peer"
        type="radio"
        value={value}
        name={name}
        onClick={onClick}
        defaultChecked={defaultChecked}
      />
      <label
        htmlFor={id}
        className="w-full h-full py-[18px] flex justify-center items-center rounded-full text-2xl bg-transparent cursor-pointer peer-checked:bg-black"
      >
        {children}
      </label>
    </div>
  );
};

export default TabButton;
