"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "rally", label: "Concept" },
  { id: "painpoint", label: "Approach" },
  { id: "product-intro", label: "Product" },
  { id: "scene", label: "In use" },
] as const;

export default function SiteIndex() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

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

      {/* section index — the persistent table of contents */}
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
    </>
  );
}
