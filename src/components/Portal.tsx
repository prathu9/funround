'use client';
import { ReactNode } from "react";
import { createPortal } from "react-dom";

// Portal component to render element as child of body
const Portal = ({children}:{children: ReactNode}) => {
    return(
        <>
            {
                createPortal(
                    children,
                    document.body
                )
            }
        </>
    )
}

export default Portal;