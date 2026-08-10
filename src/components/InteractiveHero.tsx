"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/**
 * Interactive Hero section:
 * 1. Background smoothly fades from dark canvas (black) to crisp white as user scrolls in.
 * 2. Goggle slides in from Right (larger size)
 * 3. Paddle slides in from Left (larger size)
 * 4. Both meeting naturally in a balanced, beautiful composition.
 * 5. Logo & Brand headline smoothly emerge.
 */
export default function InteractiveHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Exit shrink transition: card recedes toward the canvas edges as the user
  // scrolls out (80% ~ 100%). The background itself stays solid white
  // throughout — it no longer fades in from black.
  const exitProgress = Math.max(0, Math.min(1, (progress - 0.8) / 0.2));
  
  // Scale: 0.88 -> 1.0 -> 0.88
  const containerScale =
    progress < 0.2
      ? 0.88 + (progress / 0.2) * 0.12
      : progress > 0.8
      ? 1.0 - exitProgress * 0.12
      : 1.0;

  const cardRadius =
    progress < 0.2
      ? (1 - progress / 0.2) * 36
      : progress > 0.8
      ? exitProgress * 36
      : 0;

  // Sliding progress for objects (15% ~ 65% scroll)
  const slideProgress = Math.max(0, Math.min(1, (progress - 0.15) / 0.5));
  const slideEased = 1 - Math.pow(1 - slideProgress, 3);

  // Position deltas
  const goggleX = (1 - slideEased) * 140;
  const goggleY = (1 - slideEased) * -20;
  
  const paddleX = (1 - slideEased) * -140;
  const paddleY = (1 - slideEased) * 20;

  const objectOpacity = Math.min(1, Math.max(0, (progress - 0.05) / 0.2));

  // Logo phase — starts the instant the objects finish converging (slide
  // phase ends at 0.15 + 0.5 = 0.65), with a quick pop-in rather than a slow
  // fade that used to start before the merge actually finished.
  const MERGE_END = 0.65;
  const logoProgress = Math.max(0, Math.min(1, (progress - MERGE_END) / 0.08));
  const logoEased = 1 - Math.pow(1 - logoProgress, 3);
  const logoOpacity = logoEased * (1 - exitProgress);
  const logoY = (1 - logoEased) * 30;

  return (
    <section
      ref={sectionRef}
      id="product-intro"
      data-section
      className="relative h-[450vh] bg-canvas border-t border-hairline-soft"
    >
      <div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-6 text-[#0f172a]"
        style={{
          transform: `scale(${containerScale})`,
          borderRadius: `${cardRadius}px`,
        }}
      >

        {/* Logo — centered over the stage, right where the two halves meet */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center"
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoY}px)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/media/rally-wordmark-black.svg")}
            alt="RALLY"
            className="h-14 md:h-24 w-auto object-contain"
            /* The ® mark sits high and to the right of the wordmark, so the
               viewBox's true center reads left of the wordmark's own visual
               center. A small rightward nudge corrects it optically. */
            style={{ transform: "translateX(1.5%)" }}
          />
        </div>

        {/* Product Meeting Stage (Larger sizes, direct meeting) */}
        <div className="relative w-full max-w-[1100px] aspect-[16/10] max-h-[75vh] flex items-center justify-center">
          
          {/* Goggle Image (Top Right position) */}
          <div
            className="absolute w-[64%] md:w-[60%] right-[2%] top-[5%] z-10 transition-transform duration-75"
            style={{
              transform: `translate(${goggleX}%, ${goggleY}px) rotate(${goggleX * 0.05}deg)`,
              opacity: objectOpacity,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/media/product/goggle-cutout.png")}
              alt="Rally Goggle"
              className="w-full object-contain filter drop-shadow-2xl"
              style={{ imageRendering: "crisp-edges" }}
            />
          </div>

          {/* Paddle Image (Bottom Left position) */}
          <div
            className="absolute w-[64%] md:w-[60%] left-[2%] bottom-[5%] z-10 transition-transform duration-75"
            style={{
              transform: `translate(${paddleX}%, ${paddleY}px) rotate(${paddleX * 0.05}deg)`,
              opacity: objectOpacity,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/media/product/paddle-cutout.png")}
              alt="Rally Paddle"
              className="w-full object-contain filter drop-shadow-2xl"
              style={{ imageRendering: "crisp-edges" }}
            />
          </div>

        </div>

        {/* Scroll hint */}
        <div
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: progress < 0.08 ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <span className="type-eyebrow text-slate-500">Scroll to reveal</span>
          <div className="h-5 w-px bg-slate-400 animate-bounce" />
        </div>

      </div>
    </section>
  );
}
