import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RALLY App — 시작하기",
  description: "Rally 앱으로 이동하여 나만의 XR 리듬 랠리를 시작해 보세요.",
};

export default function AppLaunchPage() {
  return (
    <main className="min-h-screen w-full bg-[#0a0a0c] text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Header link back to home */}
      <nav className="absolute top-8 left-8">
        <a href="/" className="type-eyebrow text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
          ← 랜딩 페이지로 돌아가기
        </a>
      </nav>

      {/* Main launch card */}
      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center py-12 px-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
        
        {/* RALLY Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/hero-brand-logo.png"
          alt="RALLY"
          className="h-16 md:h-20 w-auto object-contain mb-8 rounded-sm filter drop-shadow-md"
        />

        <h1 className="type-display text-[clamp(32px,5vw,56px)] leading-tight text-white mb-4">
          오늘의 랠리를<br />시작해 볼까요?
        </h1>

        <p className="text-neutral-400 text-[15px] md:text-[16px] leading-relaxed max-w-md mb-10">
          Spotify를 연동하고 기기를 연결하여 나만의 음악 리듬 탁구 세션에 빠져들어 보세요.
        </p>

        {/* Primary CTA Button to RALLY App */}
        <a
          href="https://m1nseokshin.github.io/rally/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-grow inline-flex items-center justify-center h-14 px-10 bg-primary hover:bg-primary/90 text-white font-semibold text-[16px] rounded-2xl shadow-lg shadow-primary/30 transition-all gap-3 group"
        >
          <span>Rally 웹 앱 실행하기</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>

        {/* Feature badge list */}
        <div className="mt-12 pt-8 border-t border-white/10 w-full grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="type-eyebrow text-primary mb-1">Spotify</p>
            <p className="text-[13px] text-neutral-300">음원 자동 연동</p>
          </div>
          <div>
            <p className="type-eyebrow text-primary mb-1">240Hz</p>
            <p className="text-[13px] text-neutral-300">초정밀 트래킹</p>
          </div>
          <div>
            <p className="type-eyebrow text-primary mb-1">XR Sync</p>
            <p className="text-[13px] text-neutral-300">실시간 통합 관리</p>
          </div>
        </div>

      </div>

      <footer className="absolute bottom-8 text-neutral-500 type-eyebrow text-center">
        2026 — Rally Platform
      </footer>

    </main>
  );
}
