import { motion, AnimatePresence } from "framer-motion";

interface AnimateHeightProps {
  children: React.ReactNode;
  className: React.ComponentProps<"div">["className"];
}

const AnimateHeight = ({ children, className }: AnimateHeightProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      layout
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateHeight;
