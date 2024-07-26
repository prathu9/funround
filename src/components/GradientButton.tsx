import Link from "next/link";
import { ReactNode } from "react";

type GradientButtonProps = {
  children: ReactNode;
  as?: "link" | "button";
  handleClick?: () => void;
  className?: string;
};

// button with gradieny background
const GradientButton = ({
  children,
  as = "button",
  handleClick,
  className,
}: GradientButtonProps) => {
  return (
    <>
      {as === "link" ? (
        // link
        <Link className={`bg-btn-gradient-1 hover:bg-btn-gradient-hover-1 ${className}`} href="/">
          {children}
        </Link>
      ) : (
        // button
        <button
          className={`bg-btn-gradient-1 hover:bg-btn-gradient-hover-1 ${className}`}
          onClick={handleClick}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default GradientButton;
