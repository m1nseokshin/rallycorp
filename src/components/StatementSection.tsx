"use client";

import { useEffect, useRef, useState } from "react";

function reveal(p: number, at: number, span = 0.12) {
  return Math.min(1, Math.max(0, (p - at) / span));
}

const ENTRY_END = 0.14;

function entryEase(progress: number) {
  const entry = Math.min(1, progress / ENTRY_END);
  return 1 - Math.pow(1 - entry, 3);
}

export default function StatementSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const read = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      setProgress(
        scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable)),
      );
    };

    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    read();
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const shouldPlay = progress > 0.01 && progress < 0.99;
    if (shouldPlay && video.paused) void video.play().catch(() => {});
    if (!shouldPlay && !video.paused) video.pause();
  }, [progress]);

  // Entry phase (0 ~ 0.2): scale 0.86 -> 1.0
  // Hold phase (0.2 ~ 0.8): scale 1.0
  // Exit phase (0.8 ~ 1.0): scale 1.0 -> 0.86
  const scale =
    progress < 0.2
      ? 0.86 + (progress / 0.2) * 0.14
      : progress > 0.8
      ? 1.0 - ((progress - 0.8) / 0.2) * 0.14
      : 1.0;

  const borderRadius =
    progress < 0.2
      ? (1 - progress / 0.2) * 36
      : progress > 0.8
      ? ((progress - 0.8) / 0.2) * 36
      : 0;

  const p1 = reveal(progress, ENTRY_END + 0.05);
  const p2 = reveal(progress, ENTRY_END + 0.25);

  const lift = (k: number) => ({
    opacity: k,
    transform: `translateY(${(1 - k) * 24}px)`,
  });

  return (
    <div
      ref={sectionRef}
      id="rally"
      data-section
      className="relative h-[420vh] bg-canvas"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
          }}
        >
          <video
            ref={videoRef}
            src="/media/statement.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/40" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
        </div>

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          {/* Concept Headline */}
          <span className="type-eyebrow text-primary mb-4 block" style={lift(p1)}>
            THE CONCEPT
          </span>
          <h2
            className="type-display text-[clamp(28px,4.5vw,56px)] text-white leading-tight"
            style={lift(p1)}
          >
            RECLAIM YOUR FOCUS THROUGH MUSIC AND MOTION:<br className="hidden md:block" /> AN IMMERSIVE XR LIFESTYLE SPORT
          </h2>

          <div
            className="mt-10 border-t border-white/20 pt-8 flex flex-col items-center"
            style={lift(p2)}
          >
            <p className="max-w-3xl text-[15px] leading-[1.85] text-ash md:text-[17px] font-normal">
              Rally is an XR rhythm table tennis platform born from combining musical beats with table tennis rallies.<br className="hidden md:block" />
              Select your favorite music, and the tempo automatically forms the rhythm of the rally. 
              As you follow and strike the ball, your body naturally synchronizes with the beat—allowing you to track your daily focus state and play data seamlessly once the session ends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
