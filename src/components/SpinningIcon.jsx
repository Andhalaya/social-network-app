
import { motion } from "framer-motion";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

function SpinningIcon() {
  return (
    <motion.div
      className="showMore-btn"
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.5 }}
    >
      <CachedOutlinedIcon />
    </motion.div>
  );
}

export default SpinningIcon;
