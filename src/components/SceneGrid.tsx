import Image from "next/image";

const SCENES = [
  "/media/scene/scene-01.jpg",
  "/media/scene/scene-02.jpg",
  "/media/scene/scene-03.jpg",
  "/media/scene/scene-04.jpg",
];

function Frame({
  src,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  src: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-surface ${ratio} ${className}`}
      style={{ borderRadius: "var(--radius-card)" }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        quality={100}
        unoptimized
        className="object-cover"
      />
    </div>
  );
}

export default function SceneGrid() {
  return (
    <section id="scene" data-section className="border-t border-hairline-soft">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:py-36">
        <div className="mb-12 flex items-center gap-3">
          <span className="type-eyebrow text-primary">In use</span>
          <span className="h-px w-8 bg-hairline" />
          <span className="type-eyebrow text-mute">User scene</span>
        </div>

        <h2 className="type-display max-w-4xl text-[clamp(36px,7vw,110px)]">
          One rally,
          <br />
          four angles
        </h2>

        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-12">
          <Frame
            src={SCENES[0]}
            className="md:col-span-5"
            ratio="aspect-[3/4] h-full"
          />

          <div className="flex flex-col gap-6 md:col-span-7">
            <Frame src={SCENES[1]} className="flex-1" ratio="h-full min-h-[200px]" />
            <Frame src={SCENES[2]} className="flex-1" ratio="h-full min-h-[200px]" />
          </div>

          <Frame
            src={SCENES[3]}
            className="md:col-span-12"
            ratio="aspect-[16/9] md:aspect-[21/9]"
          />
        </div>
      </div>
    </section>
  );
}
