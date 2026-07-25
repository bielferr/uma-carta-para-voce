"use client";

import { motion } from "framer-motion";

export default function FinalMessage() {
  return (
    <div className="flex flex-col items-center gap-16 py-24 text-center px-6">
      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="font-serif text-2xl sm:text-3xl text-gold text-shadow-glow"
      >
        ✨ Ainda existe uma última surpresa...
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: "easeOut", delay: 2.4 }}
        className="font-display text-6xl sm:text-7xl text-pure text-shadow-glow"
      >
        Olhe para trás ❤️
      </motion.p>
    </div>
  );
}
