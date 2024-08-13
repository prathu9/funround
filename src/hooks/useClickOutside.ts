import { RefObject, useEffect } from "react";

const useClickOutside = (parentElem: RefObject<HTMLElement>, onOutsideClick: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (parentElem.current && !parentElem.current.contains(e.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [parentElem, onOutsideClick]);
};

export default useClickOutside;