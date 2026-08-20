"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "rally", label: "Concept" },
  { id: "painpoint", label: "Approach" },
  { id: "product-intro", label: "Product" },
  { id: "scene", label: "In use" },
  { id: "film", label: "Film" },
] as const;

export default function SiteIndex() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock page scroll while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      {/* Content scrolls under the fixed chrome, so a short scrim keeps whatever
          passes behind it from colliding with the labels. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-32 bg-gradient-to-b from-black/70 to-transparent" />

      {/* Brand logo link to top */}
      <a href="#intro" className="fixed left-6 top-6 z-50" aria-label="RALLY">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/media/rally-logo.svg")}
          alt="RALLY"
          className="h-[22px] w-auto object-contain"
          style={{ filter: "drop-shadow(0 1px 6px rgba(0,0,0,.6))" }}
        />
      </a>

      {/* section index — the persistent table of contents, desktop/tablet only */}
      <nav className="fixed right-6 top-6 z-50 hidden md:block">
        <ul className="flex flex-col items-end gap-2">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="type-eyebrow block text-white transition-opacity duration-300"
                style={{
                  opacity: active === section.id ? 1 : 0.45,
                  textShadow: "0 1px 6px rgba(0,0,0,.6)",
                }}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* hamburger toggle — mobile only */}
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={menuOpen}
        className="fixed right-6 top-6 z-[60] flex h-9 w-9 items-center justify-center md:hidden"
      >
        <span className="relative block h-[14px] w-5">
          <span
            className="absolute left-0 top-0 h-[1.5px] w-full bg-white transition-transform duration-300"
            style={{
              transform: menuOpen
                ? "translateY(6px) rotate(45deg)"
                : "translateY(0) rotate(0)",
            }}
          />
          <span
            className="absolute left-0 bottom-0 h-[1.5px] w-full bg-white transition-transform duration-300"
            style={{
              transform: menuOpen
                ? "translateY(-6px) rotate(-45deg)"
                : "translateY(0) rotate(0)",
            }}
          />
        </span>
      </button>

      {/* mobile drawer — the same section list, full-screen */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas md:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 300ms var(--ease-standard)",
        }}
      >
        <ul className="flex flex-col items-center gap-7">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setMenuOpen(false)}
                className="type-display text-[clamp(28px,8vw,44px)]"
                style={{ opacity: active === section.id ? 1 : 0.4 }}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
