import Link from "next/link";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import StatementSection from "@/components/StatementSection";
import PainPointSection from "@/components/PainPointSection";
import SceneGrid from "@/components/SceneGrid";
import InteractiveHero from "@/components/InteractiveHero";
import BrandFilmSection from "@/components/BrandFilmSection";

const HARDWARE = [
  {
    name: "Glass",
    tag: "XR Headset",
    specs: [
      { k: "크기", v: "190 × 180 × 110 mm" },
      { k: "무게", v: "450g" },
      { k: "디스플레이", v: "Micro-OLED" },
      { k: "해상도", v: "2160 × 2160 px" },
      { k: "주사율", v: "90 Hz" },
      { k: "시야각", v: "100° FOV" },
      { k: "트래킹", v: "6-DoF Inside-Out" },
      { k: "핸드 트래킹", v: "Optical" },
      { k: "연결 방식", v: "Wi-Fi 6E / Bluetooth 5.3" },
      { k: "충전 타입", v: "USB Type-C" },
      { k: "배터리", v: "3,000 mAh" },
    ],
  },
  {
    name: "Blade",
    tag: "Paddle Controller",
    specs: [
      { k: "크기", v: "260 × 155 × 35 mm" },
      { k: "무게", v: "180g" },
      { k: "배터리", v: "800 mAh" },
      { k: "연결 방식", v: "Bluetooth" },
      { k: "충전 타입", v: "USB Type-C" },
      { k: "모션 센서", v: "9-axis IMU" },
      { k: "햅틱 액추에이터", v: "Dual LRA" },
    ],
  },
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

      <PainPointSection />

      <InteractiveHero />

      <SceneGrid />

      {/* spec table — one hairline list per product */}
      <section className="border-t border-hairline-soft">
        <div className="mx-auto max-w-[1440px] px-6 py-28 md:py-40">
          <SectionLabel index="03" label="Specification" />
          <h2 className="type-display text-[clamp(36px,5.5vw,72px)]">
            Hardware
          </h2>
          <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-x-20">
            {HARDWARE.map((product) => (
              <div key={product.name}>
                <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-hairline-soft pb-4">
                  <h3 className="type-display text-[clamp(28px,3.4vw,42px)]">
                    RALLY {product.name}
                  </h3>
                  <span className="type-eyebrow text-mute">
                    {product.tag}
                  </span>
                </div>
                <ul>
                  {product.specs.map((spec) => (
                    <li
                      key={spec.k}
                      className="flex items-baseline justify-between gap-6 border-b border-hairline-soft py-4"
                    >
                      <span className="text-[14px] text-mute">{spec.k}</span>
                      <span className="tnum text-right text-[14px] text-ink">
                        {spec.v}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrandFilmSection />

      {/* closing */}
      <section className="border-t border-hairline-soft">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center px-6 py-32 text-center md:py-48">
          <h2 className="type-display text-[clamp(44px,10vw,150px)]">
            Keep the rally
          </h2>
          <Link
            href="/app"
            className="hover-grow mt-12 inline-flex h-14 items-center bg-ink px-10 text-[16px] font-semibold text-canvas transition-all"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            Rally 앱 시작하기 →
          </Link>
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
