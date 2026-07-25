"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

const TRACK_SRC = "/audio/lanternas.mp3";
const FADE_MS = 4000;
const TARGET_VOLUME = 0.55;

/**
 * Singleton em nível de módulo. Em dev, o Fast Refresh do Next.js pode
 * re-executar o efeito do hook sem desmontar "de verdade" o componente,
 * o que criava um novo Howl a cada salvamento e esgotava o pool de
 * elementos <audio> do navegador ("HTML5 Audio pool exhausted"). Guardando
 * a instância aqui fora do React, ela é reaproveitada entre re-renders e
 * hot reloads, e só é destruída quando a página é realmente recarregada.
 */
let sharedHowl: Howl | null = null;

function getSharedHowl() {
  if (!sharedHowl) {
    sharedHowl = new Howl({
      src: [TRACK_SRC],
      loop: true,
      volume: 0,
      html5: true,
    });
  }
  return sharedHowl;
}

/**
 * Music never autoplays — browsers block it, and the brief calls for the
 * track to begin only on the envelope click. Call play() from that handler.
 */
export function useMusic() {
  const howlRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    howlRef.current = getSharedHowl();

    // Sem cleanup que descarrega o áudio: a instância é compartilhada e
    // persiste entre montagens/desmontagens em dev. Ela só some quando a
    // aba é fechada ou a página recarregada de fato.
  }, []);

  const play = useCallback(() => {
    const howl = howlRef.current;
    if (!howl) return;
    if (howl.playing()) return;
    howl.play();
    howl.fade(0, TARGET_VOLUME, FADE_MS);
    setIsPlaying(true);
    setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    const howl = howlRef.current;
    if (!howl) return;
    setIsMuted((prev) => {
      const next = !prev;
      howl.volume(next ? 0 : TARGET_VOLUME);
      return next;
    });
  }, []);

  return { play, toggleMute, isPlaying, isMuted };
}
