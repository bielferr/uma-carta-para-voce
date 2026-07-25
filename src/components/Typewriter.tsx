"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 38,
  startDelay = 0,
  onDone,
  className,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
  className?: string;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <p className={className}>
      {shown}
      {shown.length < text.length && (
        <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-paper/60">
          &nbsp;
        </span>
      )}
    </p>
  );
}
