"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

const HOLD_MS = 900; // symbol sits alone before handing over
const FADE_MS = 700;

/**
 * App-symbol splash, same beat as the Rally app: the symbol lands on black,
 * holds, then the whole layer lifts to reveal the page. Runs on every load.
 */
export default function SplashScreen() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    if (phase === "gone") return;

    // Dev-only QA hook: /?at= jumps into the scrub, so the splash would fight it.
    if (
      process.env.NODE_ENV !== "production" &&
      new URLSearchParams(window.location.search).has("at")
    ) {
      setPhase("gone");
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Hold the page still underneath so the reveal starts from the top.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const hold = reduceMotion ? 200 : HOLD_MS;
    const outTimer = window.setTimeout(() => setPhase("out"), hold);
    const goneTimer = window.setTimeout(
      () => setPhase("gone"),
      hold + (reduceMotion ? 120 : FADE_MS),
    );

    return () => {
      window.clearTimeout(outTimer);
      window.clearTimeout(goneTimer);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase === "gone") document.body.style.overflow = "";
  }, [phase]);

  if (phase === "gone") return null;

  const leaving = phase === "out";

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-canvas"
      style={{
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms var(--ease-standard)`,
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/media/rally-logo.svg")}
        alt="RALLY"
        className="w-[200px] md:w-[280px] object-contain"
        style={{
          animation: "symbol-in 900ms var(--ease-standard) both",
          transform: leaving ? "scale(1.06)" : undefined,
          transition: `transform ${FADE_MS}ms var(--ease-standard)`,
        }}
      />
      <span
        className="type-eyebrow absolute bottom-10 text-white/35"
        style={{ animation: "symbol-meta-in 900ms 260ms var(--ease-standard) both" }}
      >
        XR Rhythm Sports Platform
      </span>
    </div>
  );
}
