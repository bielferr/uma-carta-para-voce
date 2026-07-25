"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type LanternConfig = {
  id: number;
  left: number; // vw
  size: number; // px
  duration: number; // seconds for full rise
  delay: number; // seconds
  opacity: number;
  blur: number; // px
  sway: number; // px
  transitionDelay: number; // seconds
};

function makeLantern(id: number, randomize = false): LanternConfig {
  const base = randomize ? Math.random() : ((id + 1) * 97) % 1000 / 1000;
  const secondary = randomize ? Math.random() : ((id + 3) * 131) % 1000 / 1000;

  return {
    id,
    left: base * 92 + 2,
    size: secondary * 34 + 22, // 22–56px
    duration: base * 10 + 14, // 14–24s
    delay: secondary * 12,
    opacity: secondary * 0.45 + 0.45, // 0.45–0.9
    blur: base < 0.35 ? secondary * 2.5 + 1 : 0, // some distant/blurred
    sway: base * 22 + 8,
    transitionDelay: secondary * 1.5,
  };
}

/** A single original lantern shape — not derived from any copyrighted design. */
function LanternShape({ size, opacity, blur }: { size: number; opacity: number; blur: number }) {
  return (
    <div
      style={{
        width: size,
        opacity,
        filter: blur ? `blur(${blur}px)` : undefined,
      }}
    >
      <svg viewBox="0 0 40 56" width={size} height={size * 1.4} fill="none">
        {/* top cord */}
        <line x1="20" y1="0" x2="20" y2="8" stroke="#FFD76B" strokeWidth="1" opacity="0.6" />
        {/* top cap */}
        <ellipse cx="20" cy="9" rx="9" ry="2.6" fill="#A675FF" opacity="0.85" />
        {/* body */}
        <path
          d="M11 10 C11 30, 11 34, 20 46 C29 34, 29 30, 29 10 Z"
          fill="url(#lanternGradient)"
          stroke="#FFD76B"
          strokeOpacity="0.5"
          strokeWidth="0.6"
        />
        {/* inner glow */}
        <ellipse className="lantern-flame" cx="20" cy="26" rx="5.5" ry="8" fill="#FFF3D0" opacity="0.9" />
        {/* bottom cap */}
        <ellipse cx="20" cy="46" rx="6" ry="2" fill="#A675FF" opacity="0.85" />
        {/* bottom tassel */}
        <line x1="20" y1="46" x2="20" y2="52" stroke="#FFD76B" strokeWidth="1" opacity="0.6" />
        <defs>
          <radialGradient id="lanternGradient" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#FFE9AE" />
            <stop offset="55%" stopColor="#FFD76B" />
            <stop offset="100%" stopColor="#C99A3F" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function FloatingLanterns({ active }: { active: boolean }) {
  const [showAll, setShowAll] = useState(false);
  const [lanterns, setLanterns] = useState<LanternConfig[]>(() =>
    Array.from({ length: 27 }, (_, i) => makeLantern(i, false))
  );

  useEffect(() => {
    if (!active) return;
    setLanterns(Array.from({ length: 27 }, (_, i) => makeLantern(i, true)));

    // First lantern needs to reach roughly 30% of the screen (70% of its journey)
    // before the rest begin to appear — this is the emotional beat.
    const triggerAt = lanterns[0]?.duration ? lanterns[0].duration * 0.62 * 1000 : 0;
    const t = setTimeout(() => setShowAll(true), triggerAt);
    return () => clearTimeout(t);
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {/* The first lantern — rises alone, sets the emotional beat */}
      <motion.div
        key="first-lantern"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute bottom-[-10vh] lantern-rise lantern-sway"
        style={{
          left: `${lanterns[0]?.left ?? 50}%`,
          animationDuration: `${lanterns[0]?.duration ?? 18}s`,
          // @ts-expect-error custom property for sway keyframe
          "--sway": `${lanterns[0]?.sway ?? 12}px`,
        }}
      >
        <div style={{ animationDuration: `${(lanterns[0]?.duration ?? 18) * 0.3}s` }} className="lantern-sway">
          <LanternShape size={lanterns[0]?.size ?? 36} opacity={lanterns[0]?.opacity ?? 0.7} blur={lanterns[0]?.blur ?? 0} />
        </div>
      </motion.div>

      {/* The rest of the sky — arrives once the first lantern is high enough */}
      {showAll &&
        lanterns.slice(1).map((l) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: l.transitionDelay }}
            className="absolute bottom-[-10vh] lantern-rise"
            style={{
              left: `${l.left}%`,
              animationDuration: `${l.duration}s`,
              animationDelay: `${l.delay}s`,
            }}
          >
            <div
              className="lantern-sway"
              style={{
                animationDuration: `${l.duration * 0.3}s`,
                // @ts-expect-error custom property for sway keyframe
                "--sway": `${l.sway}px`,
              }}
            >
              <LanternShape size={l.size} opacity={l.opacity} blur={l.blur} />
            </div>
          </motion.div>
        ))}
    </div>
  );
}
