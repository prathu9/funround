"use client";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useEffect, useRef } from "react";

const ModalOverlay = ({children}:{children: ReactNode}) => {
    const router = useRouter();
    const modalRef = useRef(null);

    useEffect(() => {
        document.body.style.overflowY = "hidden";

        return () => {
            document.body.style.overflowY = "scroll";
        }
    },[])

    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        if(e.target === modalRef.current){
            router.push("/");
        }
    }


    return(
        // Modal overlay
        <div ref={modalRef} onClick={handleClose} className="absolute top-0 left-0 w-screen h-screen bg-black overflow-auto sm:bg-[#000]/[80%]">
            {children}
        </div>
    )
}

export default ModalOverlay;