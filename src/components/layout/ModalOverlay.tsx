"use client";
import { RouterContext } from "@/context/router-context";
import { useRouter } from "next/navigation";
import {
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";

// Modal overlay component
const ModalOverlay = ({ children }: { children: ReactNode }) => {
  const router = useRouter(); //router hook from nextjs
  const modalRef = useRef(null); // modal container ref
  const { parentRoute } = useContext(RouterContext); // router context to get parent route

  // hide body overflow scroll on modal open
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflowY = "auto";
    };
  }, []);

  // call function when clicked on overlay and go to parent route page
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      router.replace(parentRoute);
    }
  };

  return (
    // container for Modal overlay
    <div
      ref={modalRef}
      onClick={handleClose}
      className="absolute top-0 left-0 w-screen min-h-screen flex justify-center items-center bg-black overflow-auto z-20 sm:bg-[#000]/[80%]"
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
