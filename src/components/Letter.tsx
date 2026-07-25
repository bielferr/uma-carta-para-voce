"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "./Typewriter";

const DEFAULT_PARAGRAPHS = [
  "Se você está lendo isso, é porque encontrou o pequeno segredo que eu deixei aqui só para você.",
  "Hoje eu queria fazer diferente. Queria te dar algo que parecesse mágico, do jeito que você faz eu me sentir todos os dias.",
  "Cada momento ao seu lado parece uma dessas noites de céu cheio de luzes — leve, quente e cheio de esperança.",
  "Obrigado por existir, por sonhar comigo e por tornar tudo mais bonito só por estar perto.",
  "Feliz aniversário, meu amor. Que este novo ano seja tão brilhante quanto você é.",
];

export default function Letter({
  paragraphs = DEFAULT_PARAGRAPHS,
  onComplete,
}: {
  paragraphs?: string[];
  onComplete: () => void;
}) {
  const [titleDone, setTitleDone] = useState(false);
  const [step, setStep] = useState(0);

  const handleParagraphDone = (index: number) => {
    if (index === paragraphs.length - 1) {
      setTimeout(onComplete, 1200);
    } else {
      setTimeout(() => setStep(index + 1), 550);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-xl px-8 py-12 sm:px-12 sm:py-14"
      style={{
        background:
          "linear-gradient(180deg, #FFFBF0 0%, #FFF8EA 55%, #F7ECD2 100%)",
        borderRadius: "18px",
        boxShadow:
          "0 30px 80px rgba(15, 7, 26, 0.55), 0 0 0 1px rgba(199,171,110,0.25) inset",
      }}
    >
      {/* subtle paper fiber texture */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[18px] opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #47381D 0px, transparent 1px, transparent 3px)",
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4 }}
        onAnimationComplete={() => setTitleDone(true)}
        className="font-display text-5xl sm:text-6xl text-purple-main text-center mb-8"
      >
        Minha princesa 💜
      </motion.h1>

      <div className="space-y-5 min-h-[10rem]">
        {titleDone &&
          paragraphs.slice(0, step + 1).map((p, i) => (
            <Typewriter
              key={i}
              text={p}
              startDelay={i === step ? 200 : 0}
              onDone={i === step ? () => handleParagraphDone(i) : undefined}
              className="font-serif text-lg sm:text-xl leading-relaxed text-paper-ink text-center"
            />
          ))}
      </div>
    </motion.div>
  );
}
