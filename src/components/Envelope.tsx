"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Give the lid time to swing open before we tell the parent the
    // letter should start rising and the music should begin.
    setTimeout(onOpen, 900);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.button
        aria-label="Abrir carta"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative outline-none"
        style={{ perspective: 900 }}
        animate={
          !isOpening
            ? { scale: isHovered ? 1.045 : 1 }
            : { scale: 1, opacity: 0, y: -10 }
        }
        transition={{ duration: isOpening ? 0.6 : 0.5, ease: "easeInOut" }}
      >
        {/* Ambient glow behind the envelope */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: isHovered
              ? "0 0 70px 18px rgba(255,215,107,0.35)"
              : "0 0 40px 8px rgba(255,215,107,0.18)",
          }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          className="relative animate-breathe"
          style={{ transformStyle: "preserve-3d" }}
        >
          <svg
            width="220"
            height="160"
            viewBox="0 0 220 160"
            className="drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
          >
            <defs>
              <linearGradient id="envelopeBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF8EA" />
                <stop offset="100%" stopColor="#F3E6C8" />
              </linearGradient>
              <linearGradient id="envelopeFlap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A675FF" />
                <stop offset="100%" stopColor="#6E41C8" />
              </linearGradient>
            </defs>

            {/* body */}
            <rect x="6" y="30" width="208" height="124" rx="10" fill="url(#envelopeBody)" />
            {/* inner fold shadows */}
            <path d="M6 40 L110 118 L214 40" stroke="#C9AE7B" strokeWidth="1.5" fill="none" opacity="0.6" />

            {/* wax seal */}
            <circle cx="110" cy="94" r="15" fill="#A675FF" opacity="0.95" />
            <circle cx="110" cy="94" r="15" fill="none" stroke="#FFD76B" strokeWidth="1" opacity="0.8" />
            <path
              d="M110 86 L113 92 L119.5 93 L114.8 97.5 L116 104 L110 100.8 L104 104 L105.2 97.5 L100.5 93 L107 92 Z"
              fill="#FFD76B"
              opacity="0.9"
            />
          </svg>

          {/* Flap — hinges open from the top */}
          <motion.svg
            width="220"
            height="90"
            viewBox="0 0 220 90"
            className="absolute top-0 left-0"
            style={{ transformOrigin: "50% 0%", transformStyle: "preserve-3d" }}
            animate={{ rotateX: isOpening ? -165 : 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <path
              d="M6 8 C6 6, 8 4, 10 4 L210 4 C212 4, 214 6, 214 8 L110 78 Z"
              fill="url(#envelopeFlap)"
              stroke="#FFD76B"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          </motion.svg>
        </motion.div>
      </motion.button>

      {!isOpening && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <p className="font-serif text-lg text-paper/90 tracking-wide">
            Você recebeu uma carta.
          </p>
          <p className="font-serif text-sm text-paper/60 tracking-widest uppercase">
            Clique para abrir.
          </p>
        </motion.div>
      )}
    </div>
  );
}
