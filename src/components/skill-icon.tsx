"use client";

import { motion } from "framer-motion";

interface SkillIconProps {
  icon: any;
  text: any;
}

export default function SkillIcon({ icon, text }: SkillIconProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        className="h-12 w-12 flex items-center justify-center cursor-pointer"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <motion.div
        className="mt-3 text-center text-sm text-black dark:text-white"
        variants={{
            rest: { opacity: 0, y: 10, textShadow: "none" },
            hover: {
              opacity: 1,
              y: 0,
              textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
            },
          }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.div>
    </motion.div>
  );
}
