import ScrollVideoHero from "@/components/ScrollVideoHero";
import StatementSection from "@/components/StatementSection";
import ExperienceSection from "@/components/ExperienceSection";
import PainPointSection from "@/components/PainPointSection";
import SceneGrid from "@/components/SceneGrid";
import InteractiveHero from "@/components/InteractiveHero";

const SPECS = [
  { k: "Tracking", v: "240 Hz" },
  { k: "Latency", v: "12 ms" },
  { k: "Display", v: "듀얼 마이크로 OLED · 90 Hz" },
  { k: "Controller", v: "패들형 · 6DoF" },
  { k: "Session", v: "2.4 h" },
];


function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <span className="type-eyebrow tnum text-primary">{index}</span>
      <span className="h-px w-8 bg-hairline" />
      <span className="type-eyebrow text-mute">{label}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full bg-canvas">
      <ScrollVideoHero />

      <StatementSection />

      <ExperienceSection />

      <PainPointSection />

      <InteractiveHero />

      <SceneGrid />

      {/* spec table */}
      <section className="border-t border-hairline-soft">
        <div className="mx-auto max-w-[1440px] px-6 py-28 md:py-40">
          <SectionLabel index="03" label="Specification" />
          <div className="grid gap-10 md:grid-cols-12">
            <h2 className="type-display text-[clamp(36px,5.5vw,72px)] md:col-span-5">
              Hardware
            </h2>
            <ul className="border-t border-hairline-soft md:col-span-7">
              {SPECS.map((spec) => (
                <li
                  key={spec.k}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline-soft py-5"
                >
                  <span className="text-[15px] text-mute">{spec.k}</span>
                  <span className="tnum text-right text-[15px] text-ink">
                    {spec.v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* closing */}
      <section className="border-t border-hairline-soft">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center px-6 py-32 text-center md:py-48">
          <h2 className="type-display text-[clamp(44px,10vw,150px)]">
            Keep the rally
          </h2>
          <a
            href="/app"
            className="hover-grow mt-12 inline-flex h-14 items-center bg-ink px-10 text-[16px] font-semibold text-canvas transition-all"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            Rally 앱 시작하기 →
          </a>
        </div>
      </section>

      <footer className="border-t border-hairline-soft">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="type-eyebrow text-stone">2026 — Rally</p>
          <p className="type-eyebrow text-stone">Music · Rhythm · Rally</p>
        </div>
      </footer>
    </main>
  );
}
