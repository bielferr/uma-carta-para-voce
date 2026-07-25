"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  life: number;
  maxLife: number;
  isSparkle: boolean;
};

/**
 * Two layers in one canvas:
 * 1. Ambient gold dust — slow, discreet, always present.
 * 2. Cursor sparkles — small bright flecks that trail the mouse and fade out.
 */
export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const ambientCount = width < 768 ? 22 : 40;
    const ambient: Particle[] = Array.from({ length: ambientCount }).map(
      () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.05,
        vy: -Math.random() * 0.08 - 0.02,
        opacity: Math.random() * 0.35 + 0.1,
        life: 0,
        maxLife: Infinity,
        isSparkle: false,
      })
    );

    let sparkles: Particle[] = [];
    let rafId = 0;
    let lastSparkleTime = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) mouseRef.current = { x: t.clientX, y: t.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Ambient dust
      for (const p of ambient) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 107, ${p.opacity})`;
        ctx.shadowColor = "rgba(255, 215, 107, 0.6)";
        ctx.shadowBlur = 4;
        ctx.fill();
      }

      // Spawn cursor sparkles sparingly
      if (mouseRef.current.active && time - lastSparkleTime > 55) {
        lastSparkleTime = time;
        sparkles.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 10,
          y: mouseRef.current.y + (Math.random() - 0.5) * 10,
          r: Math.random() * 1.8 + 0.6,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.4 - 0.1,
          opacity: 0.8,
          life: 0,
          maxLife: 60 + Math.random() * 30,
          isSparkle: true,
        });
      }

      sparkles.forEach((p) => {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        const t = p.life / p.maxLife;
        p.opacity = Math.max(0, 0.85 * (1 - t));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 235, 180, ${p.opacity})`;
        ctx.shadowColor = "rgba(255, 215, 107, 0.9)";
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      sparkles = sparkles.filter((p) => p.life < p.maxLife);

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
    />
  );
}
