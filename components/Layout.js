import { motion } from "framer-motion";
import animate from "../utils/animate";

export default function Layout({ children }) {
  return (
    <motion.div
      {...animate}
    >
      <div className="flex h-screen">
        <div className="m-auto">
          {children}
        </div>
      </div>
    </motion.div>
  )
}