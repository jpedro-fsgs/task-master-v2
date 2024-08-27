"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const upAnimations = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -50, opacity: 0 },
  transition: { duration: 0.25 },
};

const downAnimations = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
  transition: { duration: 0.25 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
      <AnimatePresence >
        <motion.div
          {...(["/todo", "/stopwatch", "/alarm"].includes(path)
            ? upAnimations
            : downAnimations)}
        >
          {children}
        </motion.div>
      </AnimatePresence>
  );
}
