'use client';
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Portal component to render element as child of body
const Portal = ({children}:{children: ReactNode}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    },[])

    return(
        <>
            {mounted?
                createPortal(
                    children,
                    document.body
                ):null
            }
        </>
    )
}

export default Portal;