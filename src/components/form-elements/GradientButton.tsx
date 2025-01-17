"use client";
import Link from "next/link";
import { ReactNode } from "react";

// gradient button props type
type GradientButtonProps = {
  children: ReactNode; // children of gradirnt button
  as?: "link" | "button"; // use nextjs link or html button
  link?: string; // link for nextjs Link
  handleClick?: () => void; // click function for button
  className?: string; // className for link and button
  type?: "button" | "submit" | "reset" | undefined; // button type
  isDisabled?: boolean;
};

// button with gradieny background
const GradientButton = ({
  children,
  as = "button",
  handleClick,
  link,
  className,
  type,
  isDisabled,
}: GradientButtonProps) => {
  return (
    <>
      {/* check if it needs to render link or button */}
      {as === "link" && link ? (
        // link component
        <Link
          className={`bg-btn-gradient-1 hover:bg-btn-gradient-hover-1 ${className} ${
            isDisabled ? "pointer-events-none":""
          }`}
          href={link}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : undefined}
        >
          {children}
        </Link>
      ) : (
        // button component
        <button
          type={type}
          className={`bg-btn-gradient-1 whitespace-nowrap hover:bg-btn-gradient-hover-1 ${className}`}
          onClick={handleClick}
          disabled={isDisabled}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default GradientButton;
