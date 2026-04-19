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
        className="flex h-10 w-10 cursor-pointer items-center justify-center sm:h-12 sm:w-12"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <motion.div
        className="mt-2 max-w-[4.5rem] text-center text-[11px] text-black dark:text-white sm:mt-3 sm:max-w-none sm:text-sm"
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
