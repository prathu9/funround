const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin w-[189px] h-[189px] flex justify-center items-center loader rounded-full bg-gradient-to-r from-[#6337FF] to-[#B4A1FF] bg-clip-content">
        <div className="w-[90%] h-[90%] bg-black rounded-full"/>
      </div>
    </div>
  );
};

export default Spinner;
