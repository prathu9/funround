"use client";
import { RouterContext } from "@/context/router-context";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useContext, useEffect, useRef, useState } from "react";

const ModalOverlay = ({children}:{children: ReactNode}) => {
    const router = useRouter();
    const modalRef = useRef(null);
    const {parentRoute} = useContext(RouterContext);

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        document.documentElement.style.overflowY ="hidden";

        return () => {
            document.body.style.overflowY = "auto";
            document.documentElement.style.overflowY = "auto";
        }
    },[])

    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        if(e.target === modalRef.current){
            router.replace(parentRoute);
        }
    }


    return(
        // Modal overlay
            <div ref={modalRef} onClick={handleClose} className="absolute top-0 left-0 w-screen min-h-screen flex justify-center items-center bg-black overflow-auto z-20 sm:bg-[#000]/[80%]">
                {children}
            </div>
    )
}

export default ModalOverlay;