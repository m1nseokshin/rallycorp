"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/** 0 before `at`, ramping to 1 over `span`, then held. */
function reveal(p: number, at: number, span = 0.35) {
  return Math.min(1, Math.max(0, (p - at) / span));
}

export default function BrandFilmSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const read = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top is a screen below, 1 once it's a third up —
      // a plain "has it entered" reveal, not a scroll-scrub.
      const p = 1 - Math.min(1, Math.max(0, (rect.top - vh * 0.2) / (vh * 0.6)));
      setProgress(p);
    };

    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    read();
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  // Pause the film once it scrolls out of view.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playing) return;
    if (progress < 0.15) {
      video.pause();
      setPlaying(false);
    }
  }, [progress, playing]);

  const in1 = reveal(progress, 0.02, 0.3);
  const in2 = reveal(progress, 0.18, 0.3);

  const lift = (k: number) => ({
    opacity: k,
    transform: `translateY(${(1 - k) * 24}px)`,
  });

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="film"
      data-section
      className="border-t border-hairline-soft"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center px-6 py-28 text-center md:py-40">
        <div className="mb-6 flex items-center gap-3" style={lift(in1)}>
          <span className="type-eyebrow text-primary">04</span>
          <span className="h-px w-8 bg-hairline" />
          <span className="type-eyebrow text-mute">Film</span>
        </div>

        <h2
          className="type-display text-[clamp(40px,7vw,100px)]"
          style={lift(in1)}
        >
          Brand Film
        </h2>

        <p
          className="mt-6 max-w-lg text-[15px] leading-relaxed text-ash md:text-base"
          style={lift(in1)}
        >
          음악과 움직임으로 집중을 되찾는 순간. 랠리 한 편에 담았습니다.
        </p>

        <div
          className="relative mt-14 w-full overflow-hidden bg-surface"
          style={{
            ...lift(in2),
            borderRadius: "var(--radius-card)",
            aspectRatio: "16 / 9",
          }}
        >
          <video
            ref={videoRef}
            src={asset("/media/brand-film.mp4")}
            poster={asset("/media/brand-film-poster.jpg")}
            playsInline
            preload="metadata"
            controls={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {!playing && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="브랜드 필름 재생"
              className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
            >
              <span
                className="hover-grow flex h-16 w-16 items-center justify-center bg-white md:h-20 md:w-20"
                style={{ borderRadius: "var(--radius-lg)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-6 w-6 text-ink md:h-7 md:w-7"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
