"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Damped scroll layer, the thing that makes scroll-linked motion on sites like
 * antigravity.google read as one continuous move instead of per-notch jumps.
 * Lenis drives the real window scroll, so plain `scroll` listeners elsewhere in
 * the app keep working — they just receive an eased position.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // ~1.2s to settle: long enough to feel weighted, short enough to stay responsive
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // touch devices already have native inertia; smoothing it again feels laggy
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors should ride the same easing as the wheel.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
