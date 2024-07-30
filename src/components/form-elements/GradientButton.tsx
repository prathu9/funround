import Link from "next/link";
import { ReactNode } from "react";

type GradientButtonProps = {
  children: ReactNode;
  as?: "link" | "button";
  link?:string;
  handleClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

// button with gradieny background
const GradientButton = ({
  children,
  as = "button",
  handleClick,
  link,
  className,
  type
}: GradientButtonProps) => {
  return (
    <>
      {as === "link" && link ? (
        // link
        <Link className={`bg-btn-gradient-1 hover:bg-btn-gradient-hover-1 ${className}`} href={link}>
          {children}
        </Link>
      ) : (
        // button
        <button
          type={type}
          className={`bg-btn-gradient-1 whitespace-nowrap hover:bg-btn-gradient-hover-1 ${className}`}
          onClick={handleClick}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default GradientButton;
