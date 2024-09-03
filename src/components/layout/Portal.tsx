'use client';
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Portal component to render element as child of body
const Portal = ({children}:{children: ReactNode}) => {
    const [mounted, setMounted] = useState(false);

    // set mounted to true after portal components loads
    useEffect(() => {
        setMounted(true);
    },[])

    return(
        <>
            {/* when mounted render react portal with children */}
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