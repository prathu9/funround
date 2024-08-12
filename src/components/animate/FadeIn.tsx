import { motion, AnimatePresence } from "framer-motion";
import { ForwardedRef, forwardRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay: number;
  className: React.ComponentProps<"div">["className"];
}

const FadeIn = forwardRef(function FadeIn({children, className, delay, ...props }: FadeInProps, ref:ForwardedRef<HTMLDivElement>) {

  return (
      <motion.div ref={ref}
        {...props}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition:{delay: (9*0.1-(delay/0.1))} }}
        transition={{ delay: delay, duration: 0.5 }}
        className={className}
      >
        {children}
      </motion.div>
  );
});

export default FadeIn;
