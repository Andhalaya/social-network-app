import { motion } from "framer-motion";
import { useTheme } from "../context/theme";

function AnimatedBox({ children }) {
    const {theme} = useTheme()
  return (
    <motion.div
      className={`box ${theme}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      
    >
      {children}
    </motion.div>
  );
}

export default AnimatedBox;
