import Image from "next/image";

/** Shared full-bleed visual layer for program and location landing pages. */
export default function LandingHeroBackdrop() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_50%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,18,0.98)_0%,rgba(8,35,58,0.94)_42%,rgba(8,35,58,0.64)_68%,rgba(6,10,18,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,10,18,0.74)_0%,transparent_50%,rgba(6,10,18,0.28)_100%)]" />
      <div className="absolute inset-0 bg-ink-950/35 sm:bg-transparent" />
      <div className="hero-grain absolute inset-0 opacity-[0.05]" />
      <div className="hero-vignette absolute inset-0" />
    </div>
  );
}
