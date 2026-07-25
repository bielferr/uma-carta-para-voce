"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

export default function MusicPlayer({
  visible,
  isMuted,
  onToggle,
}: {
  visible: boolean;
  isMuted: boolean;
  onToggle: () => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          onClick={onToggle}
          aria-label={isMuted ? "Ativar música" : "Silenciar música"}
          className="fixed top-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-night-deep/40 text-gold backdrop-blur-sm transition hover:border-gold/60 hover:bg-night-deep/60"
        >
          {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
