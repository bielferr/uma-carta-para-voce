"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient: deep night purple, top to bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0F071A 0%, #1B0F30 48%, #2B124F 100%)",
        }}
      />

      {/* Soft purple glow, upper left */}
      <div
        className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(110,65,200,0.55) 0%, rgba(110,65,200,0) 70%)",
        }}
      />

      {/* Golden glow, center-bottom — where the lanterns will rise from */}
      <div
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,215,107,0.35) 0%, rgba(255,215,107,0) 70%)",
        }}
      />

      {/* Secondary purple glow, upper right, for depth */}
      <div
        className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(166,117,255,0.4) 0%, rgba(166,117,255,0) 70%)",
        }}
      />

      {/* Fine vignette for cinematic depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(6,3,12,0.55) 100%)",
        }}
      />

      {/* Subtle grain-like texture via layered gradients, very low opacity */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 2px)",
        }}
      />
    </div>
  );
}
