"use client";

import { useEffect, useRef, useState } from "react";

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

  // Background fade transition: Black -> White (0% ~ 25% scroll)
  const bgFade = Math.min(1, progress / 0.25);

  // Exit shrink transition: White -> Black/Canvas as user scrolls out (80% ~ 100%)
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

  // Logo & Title phase (55% ~ 90% scroll)
  const logoProgress = Math.max(0, Math.min(1, (progress - 0.55) / 0.35));
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
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden transition-colors duration-200 px-6"
        style={{
          backgroundColor: `rgb(${Math.round((1 - exitProgress) * (11 + bgFade * (255 - 11)))}, ${Math.round((1 - exitProgress) * (11 + bgFade * (255 - 11)))}, ${Math.round((1 - exitProgress) * (11 + bgFade * (255 - 11)))})`,
          color: bgFade > 0.5 && exitProgress < 0.5 ? "#0f172a" : "#f8fafc",
          transform: `scale(${containerScale})`,
          borderRadius: `${cardRadius}px`,
        }}
      >
        
        {/* Top Header / Custom RALLY Logo */}
        <div
          className="pointer-events-none absolute top-12 md:top-20 z-20 flex flex-col items-center text-center"
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoY}px)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/hero-brand-logo.png"
            alt="RALLY"
            className="h-14 md:h-24 w-auto object-contain rounded-sm"
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
              src="/media/product/goggle-cutout.png"
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
              src="/media/product/paddle-cutout.png"
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
          <span className="type-eyebrow text-slate-400">Scroll to reveal</span>
          <div className="h-5 w-px bg-slate-400 animate-bounce" />
        </div>

        {/* Bottom progress bar */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-slate-200/20">
          <div
            className="h-full bg-primary"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

      </div>
    </section>
  );
}
