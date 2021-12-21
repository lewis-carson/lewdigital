import { motion } from "framer-motion";
import animate from "../utils/animate";

export default function Layout({ children }) {
  return (
    <motion.div
      {...animate}
    >
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="my-16 lg:my-32">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}