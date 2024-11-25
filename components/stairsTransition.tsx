"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import * as React from "react";

import Stairs from "./stairs";

const StairsTransition = () => {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <div
        key={pathname}
        className="w-screen h-screen flex fixed top-0 left-0 right-0 pointer-events-none z-40"
      >
        <Stairs />
      </div>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: 0,
          transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
        }}
        className="w-screen h-screen fixed top-0 pointer-events-none bg-primary"
      />
    </AnimatePresence>
  );
};

export default StairsTransition;
