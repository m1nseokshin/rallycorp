"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/**
 * Source clip: 8.926s @ 60fps (535 frames).
 * Beats read off the footage:
 *   0.00 - 1.60s  paddle close-up into the serve
 *   1.60 - 2.75s  ball flies at camera and grows
 *   2.75 - 3.75s  ball parked mid-frame, RALLY mark readable  <- the hold
 *   3.75 - 5.60s  ball leaves, rally resumes
 *   5.60 - 7.60s  full-body rally, impact around 7.3s
 *   7.60 - 8.92s  ball fills the frame -> logo handoff
 */
const CLIP_DURATION = 8.926;

/**
 * The opening slice of the section is a black screen with the symbol alone.
 * Scrolling past it lifts the clip in from below while it scales up to fill,
 * so the imagery arrives on the scroll rather than sitting there from load.
 */
const INTRO_END = 0.1;

/** scroll progress -> video time. A near-flat pair pins the clip while the page keeps moving. */
const TIMELINE: [progress: number, time: number][] = [
  [0.0, 0.0],
  [0.13, 1.6],
  [0.24, 2.75],
  [0.43, 3.05], // the hold: ~19% of the page, video barely creeps
  [0.55, 3.75],
  [0.68, 5.6],
  [0.84, 7.6],
  [0.93, CLIP_DURATION],
  [1.0, CLIP_DURATION],
];

/** Section progress -> clip progress, with the intro slice held at frame zero. */
function clipProgress(p: number) {
  return p <= INTRO_END ? 0 : (p - INTRO_END) / (1 - INTRO_END);
}

function timeAt(progress: number) {
  for (let i = 0; i < TIMELINE.length - 1; i++) {
    const [p0, t0] = TIMELINE[i];
    const [p1, t1] = TIMELINE[i + 1];
    if (progress <= p1) {
      const span = p1 - p0;
      const k = span === 0 ? 0 : (progress - p0) / span;
      return t0 + (t1 - t0) * k;
    }
  }
  return CLIP_DURATION;
}

/** 0 outside [start, end], ramping to 1 across `fade` at each edge. */
function band(p: number, start: number, end: number, fade = 0.035) {
  if (p < start - fade || p > end + fade) return 0;
  if (p < start) return (p - (start - fade)) / fade;
  if (p > end) return 1 - (p - end) / fade;
  return 1;
}

type Caption = {
  id: string;
  start: number;
  end: number;
  lead: string;
  title: string;
  align?: "left" | "center";
};

const CAPTIONS: Caption[] = [
  {
    id: "play",
    start: 0.04,
    end: 0.12,
    lead: "01 / MUSIC INTEGRATION",
    title: "CONNECT YOUR SPOTIFY PLAYLIST\nAND TURN TRACKS INTO RHYTHM COURTS",
  },
  {
    id: "tracking",
    start: 0.28,
    end: 0.4,
    lead: "02 / PHYSICAL MOTION",
    title: "FEEL THE BEAT IN EVERY SWING\nWITH HIGH-PRECISION PADDLE TRACKING",
    align: "center",
  },
  {
    id: "system",
    start: 0.59,
    end: 0.69,
    lead: "03 / IMMERSIVE FOCUS",
    title: "STAY IN THE FLOW ZONE\nAS THE RALLY KEEPS YOUR MIND ENGAGED",
  },
  {
    id: "data",
    start: 0.78,
    end: 0.875,
    lead: "04 / DAILY ANALYTICS",
    title: "TRACK YOUR DAILY FOCUS METRICS\nAND STROKE ACCURACY IN THE RALLY APP",
  },
];

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const rafId = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const read = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p =
        scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
      targetTime.current = timeAt(clipProgress(p));
      // rAF is parked while the tab is hidden, so seek straight away in that case.
      if (document.hidden) video.currentTime = targetTime.current;
    };

    // Ease toward the scroll target so trackpad jitter does not thrash the decoder.
    const tick = () => {
      const current = video.currentTime;
      const next = reduceMotion
        ? targetTime.current
        : current + (targetTime.current - current) * 0.18;
      if (Math.abs(next - current) > 0.002) {
        video.currentTime = Math.min(CLIP_DURATION - 0.01, Math.max(0, next));
      }
      rafId.current = requestAnimationFrame(tick);
    };

    const onLoaded = () => {
      setReady(true);
      read();
    };

    // Dev-only QA hook: /?at=0.33 loads straight into that point of the scrub.
    if (process.env.NODE_ENV !== "production") {
      const at = new URLSearchParams(window.location.search).get("at");
      if (at !== null) {
        const p = Math.min(1, Math.max(0, Number(at)));
        const y =
          section.offsetTop + (section.offsetHeight - window.innerHeight) * p;
        window.scrollTo(0, y);
        video.currentTime = timeAt(clipProgress(p));
        // Keep it pinned while fonts and the poster frame settle in.
        const settle = window.setInterval(() => window.scrollTo(0, y), 60);
        window.setTimeout(() => window.clearInterval(settle), 1200);
      }
    }

    video.addEventListener("loadeddata", onLoaded);
    if (video.readyState >= 2) onLoaded();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    read();
    rafId.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("loadeddata", onLoaded);
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const clipP = clipProgress(progress);
  const logoIn = band(clipP, 0.95, 1.0, 0.05);
  const videoOut = clipP > 0.93 ? 1 - (clipP - 0.93) / 0.04 : 1;

  // 0 while the symbol owns the screen, 1 once the clip has fully arrived.
  const entry = Math.min(1, progress / INTRO_END);
  const eased = 1 - Math.pow(1 - entry, 3);

  return (
    <div
      ref={sectionRef}
      id="intro"
      className="relative h-[900vh] bg-canvas"
      data-section
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-canvas">
        {/* the clip starts fully below the fold and rises into full bleed */}
        <div
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={{
            transform: `translateY(${(1 - eased) * 100}%) scale(${0.82 + eased * 0.18})`,
            borderRadius: `${(1 - eased) * 36}px`,
          }}
        >
          <video
            ref={videoRef}
            src={asset("/media/rally-scrub.mp4")}
            muted
            playsInline
            preload="auto"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: ready ? Math.max(0, videoOut) : 0 }}
          />

          {/* the footage is a bright studio; a dark scrim keeps the page in one tonal world */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        </div>

        {/* opening screen: black, brand logo only — it hands the frame to the clip */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
          style={{
            opacity: 1 - Math.min(1, entry * 1.6),
            transform: `scale(${1 - eased * 0.14})`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/media/rally-logo.svg")}
            alt="RALLY"
            className="w-[320px] sm:w-[420px] md:w-[560px] max-w-[85vw] object-contain"
          />
        </div>

        {CAPTIONS.map((caption) => {
          // Gated on `eased` so the opening screen stays symbol-only.
          const opacity = band(clipP, caption.start, caption.end) * eased;
          if (opacity <= 0.01) return null;
          const centered = caption.align === "center";
          return (
            <div
              key={caption.id}
              id={caption.id}
              data-section
              className={`pointer-events-none absolute inset-0 flex flex-col justify-center px-6 md:px-16 ${
                centered ? "items-center text-center" : "items-start"
              }`}
              style={{
                opacity,
                transform: `translateY(${(1 - opacity) * 20}px)`,
              }}
            >
              <div className={centered ? "max-w-2xl" : "max-w-3xl"}>
                <span className="type-eyebrow mb-6 block text-white/60">
                  {caption.lead}
                </span>
                <h2 className="type-display whitespace-pre-line text-[clamp(36px,6vw,76px)]">
                  {caption.title}
                </h2>
              </div>
            </div>
          );
        })}

        {/* logo takeover — the clip ends on the ball filling frame, so the mark lands on black */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-canvas px-6"
          style={{ opacity: logoIn }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/media/rally-logo.svg")}
            alt="RALLY"
            className="w-[60vw] max-w-4xl object-contain"
            style={{ transform: `scale(${0.92 + logoIn * 0.08})` }}
          />
          <p className="type-eyebrow mt-8 text-white/50">
            XR Rhythm Sports Platform
          </p>
        </div>

        <div
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
          style={{ opacity: progress < INTRO_END * 0.6 ? 1 : 0, transition: "opacity .4s" }}
        >
          <span className="type-eyebrow text-white/60">Scroll</span>
        </div>
      </div>
    </div>
  );
}
