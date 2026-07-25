"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Background from "@/components/Background";
import Particles from "@/components/Particles";
import FloatingLanterns from "@/components/FloatingLanterns";
import Envelope from "@/components/Envelope";
import Letter from "@/components/Letter";
import FinalMessage from "@/components/FinalMessage";
import MusicPlayer from "@/components/MusicPlayer";
import { useMusic } from "@/hooks/useMusic";

type Stage = "closed" | "letter" | "final";

export default function Home() {
  const [stage, setStage] = useState<Stage>("closed");
  const [lanternsActive, setLanternsActive] = useState(false);
  const music = useMusic();

  const handleEnvelopeOpen = () => {
    music.play();
    setLanternsActive(true);
    setStage("letter");
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden">
      <Background />
      <Particles />
      <FloatingLanterns active={lanternsActive} />
      <MusicPlayer
        visible={stage !== "closed"}
        isMuted={music.isMuted}
        onToggle={music.toggleMute}
      />

      <div className="relative z-30 w-full flex items-center justify-center min-h-screen px-4 py-16">
        <AnimatePresence mode="wait">
          {stage === "closed" && (
            <motion.div
              key="envelope"
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
              <Envelope onOpen={handleEnvelopeOpen} />
            </motion.div>
          )}

          {stage === "letter" && (
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center"
            >
              <Letter onComplete={() => setStage("final")} />
            </motion.div>
          )}

          {stage === "final" && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full flex flex-col items-center"
            >
              <FinalMessage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
