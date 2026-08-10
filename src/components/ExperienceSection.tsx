const STEPS = [
  { n: "01", t: "XR 세상으로 빠져들어보세요" },
  { n: "02", t: "좋아하는 음악을 선택하세요" },
  { n: "03", t: "오늘의 플레이를 확인하세요" },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      data-section
      className="border-t border-hairline-soft"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-28 md:py-40">
        <div className="mb-10 flex items-center gap-3">
          <span className="type-eyebrow tnum text-primary">02</span>
          <span className="h-px w-8 bg-hairline" />
          <span className="type-eyebrow text-mute">Experience</span>
        </div>
        <h2 className="type-headline max-w-3xl text-[clamp(28px,4.4vw,56px)]">
          세 단계로 이어지는 하나의 랠리
        </h2>
        <ul className="mt-16 border-t border-hairline-soft">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="flex items-baseline gap-6 border-b border-hairline-soft py-8"
            >
              <span className="type-eyebrow tnum text-stone">{step.n}</span>
              <h3 className="type-headline text-[clamp(20px,2.6vw,32px)]">
                {step.t}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
