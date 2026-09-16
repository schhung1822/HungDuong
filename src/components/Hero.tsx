import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import LiquidEther from "./reactbits/LiquidEther";
import ScrollReveal from "./reactbits/ScrollReveal";
import StrokeText from "./reactbits/StrokeText";
import { pageContainer } from "./layout";
import { profileData } from "../data/profile";
import { useLanguage } from "../i18n";

export default function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-neutral-950 pb-7 pt-24 sm:pb-9 sm:pt-28"
    >
      <div className="absolute inset-0 z-0 opacity-[0.18]">
        <LiquidEther
          colors={["#ffffff", "#a3a3a3", "#404040"]}
          mouseForce={14}
          cursorSize={110}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.4}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.5}
          takeoverDuration={0.25}
          autoResumeDelay={2500}
          autoRampDuration={0.6}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_38%,transparent_0%,rgba(10,10,10,0.28)_46%,rgba(10,10,10,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-b from-neutral-950/25 via-transparent to-neutral-950" />

      <div className={`${pageContainer} relative z-10 flex min-h-[calc(100svh-8.25rem)] flex-col`}>
        <div className="flex flex-1 items-center justify-center py-14 sm:py-20 lg:py-24">
          <ScrollReveal origin="top" delay={100} className="w-full">
            <h1 className="w-full font-sans">
              <StrokeText
                text={profileData.fullName}
                strokeColor="#d4d4d4"
                fillColor="#ffffff"
                strokeWidth={1.1}
                drawDuration={1.35}
                fillDelay={0.12}
                stagger={0.035}
                ease="power3.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={152}
                fontWeight={600}
                letterSpacing={-8}
              />
            </h1>
          </ScrollReveal>
        </div>

        <div className="grid items-end gap-9 pb-12 lg:grid-cols-12 lg:gap-8 lg:pb-8">
          <div className="lg:col-span-8 xl:col-span-7">
            <ScrollReveal origin="left" delay={200}>
              <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500 sm:text-xs">
                {t("hero.badge")}
              </p>
              <h2 className="max-w-4xl text-pretty font-sans text-[clamp(2rem,3.2vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
                {t("hero.headline")}
              </h2>
              <p className="mt-5 max-w-2xl font-sans text-sm leading-7 text-neutral-500 sm:text-base">
                {t("hero.description")}
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal
            origin="right"
            delay={350}
            className="flex lg:col-span-4 lg:justify-end xl:col-span-5"
          >
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="group inline-flex min-h-14 items-center justify-center gap-5 rounded-xl bg-neutral-200 px-6 font-sans text-sm font-bold text-neutral-950 transition-colors duration-200 hover:bg-white sm:min-w-52"
              id="hero-cta-contact"
            >
              {t("hero.explore")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </ScrollReveal>
        </div>

        <a
          href="#about"
          onClick={(e) => handleAnchorClick(e, "about")}
          className="group mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-neutral-950/60 px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-neutral-600 backdrop-blur-md transition-colors duration-200 hover:border-white/20 hover:text-neutral-300 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2"
          aria-label={t("hero.scroll")}
        >
          {t("hero.scroll")}
          <ArrowDown className="h-3 w-3 transition-transform duration-200 group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
