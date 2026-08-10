"use client";

export default function PainPointSection() {
  return (
    <section
      id="painpoint"
      data-section
      className="w-full bg-black py-24 md:py-36 text-white border-t border-hairline-soft"
    >
      <div className="mx-auto max-w-[1440px] px-6 flex flex-col items-center text-center">
        <span className="type-eyebrow text-primary mb-4 font-semibold tracking-widest">
          THE RALLY APPROACH
        </span>
        <h3 className="type-display text-[clamp(32px,5vw,68px)] max-w-4xl leading-none mb-6">
          “MUSIC HAS RHYTHM, TABLE TENNIS HAS RALLIES.”
        </h3>
        <p className="text-ash max-w-2xl text-[16px] md:text-[19px] leading-relaxed">
          Table tennis requires split-second reactions and intense focus.<br className="hidden md:block" />
          By infusing musical tempo and XR immersion, <strong className="text-white font-medium">focus shifts from a chore to train into an active game to play</strong>.
        </p>
      </div>
    </section>
  );
}
