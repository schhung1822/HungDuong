import React from "react";
import { ArrowRight, Circle } from "lucide-react";
import LiquidEther from "./reactbits/LiquidEther";
import GradientText from "./reactbits/GradientText";
import ProfileCard from "./reactbits/ProfileCard";
import ShinyText from "./reactbits/ShinyText";
import ScrollReveal from "./reactbits/ScrollReveal";
import { profileData } from "../data/profile";
import { useLanguage } from "../i18n";

export default function Hero() {
  const { language, t, profile } = useLanguage();
  const handleViewProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById("featured");
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToContact();
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={["#22d3ee", "#a855f7", "#14b8a6", "#ec4899"]}
          mouseForce={18}
          cursorSize={90}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.48}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.45}
          autoIntensity={2.1}
          takeoverDuration={0.25}
          autoResumeDelay={2500}
          autoRampDuration={0.6}
        />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(2,6,23,0.24)_45%,rgba(2,6,23,0.86)_100%)]" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950" />

      <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-12 px-4 pt-8 md:pt-16 lg:grid-cols-12">
        <div className="flex h-full flex-col justify-center gap-6 text-left lg:col-span-7">
          <ScrollReveal origin="top" delay={100} className="inline-flex">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/25 backdrop-blur-md text-cyan-400 font-mono text-xs font-medium tracking-wider shadow-inner shadow-cyan-500/5">
              <Circle className="w-3.5 h-3.5" />
              <ShinyText text={t("hero.badge")} className="text-xs font-semibold" />
            </span>
          </ScrollReveal>

          <div className="flex flex-col gap-1.5">
            <ScrollReveal origin="left" delay={200}>
              <span className="font-mono text-sm uppercase tracking-widest text-slate-400 block mb-1">
                {t("hero.greeting")}
              </span>
              <h1 className="text-4xl leading-[1.35] sm:text-5xl md:text-6xl font-sans tracking-tight font-extrabold text-slate-100 uppercase">
                <GradientText
                  className="font-sans normal-case tracking-tight mr-1"
                  colors={["#22d3ee", "#5eead4", "#a855f7", "#ec4899", "#22d3ee"]}
                  animationSpeed={7}
                >
                  {profileData.fullName}
                </GradientText>
              </h1>
            </ScrollReveal>

            <ScrollReveal origin="left" delay={300}>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-300">
                {profile.role}
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal origin="left" delay={400}>
            <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-xl leading-relaxed font-sans">
              {profile.shortDescription}
            </p>
          </ScrollReveal>

          <ScrollReveal origin="bottom" delay={500} className="flex flex-wrap items-center gap-4 mt-2">
            <button
              onClick={handleViewProjects}
              className="group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-sans font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-300 shadow-md shadow-cyan-500/10 hover:shadow-cyan-400/25 hover:-translate-y-0.5"
              id="hero-cta-projects"
            >
              {t("hero.explore")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <a
              href="#contact"
              onClick={handleContact}
              className="flex items-center gap-1.5 border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-white font-sans font-medium text-sm px-6 py-3.5 rounded-full transition-all duration-300 hover:border-slate-700 hover:-translate-y-0.5"
              id="hero-cta-contact"
            >
              {t("hero.contact")}
            </a>
          </ScrollReveal>
        </div>

        <div className="relative flex-col justify-center lg:col-span-5 lg:flex">
          <ScrollReveal origin="right" delay={300} className="flex w-full justify-center">
            <ProfileCard
              name='Dương Mạnh Hùng'
              title={profile.role}
              handle="nextgency-dev"
              status="Available"
              contactText={language === "vi" ? "Hợp tác" : "Collaborate"}
              avatarUrl="/avatar.webp"
              miniAvatarUrl="/avatar.webp"
              iconUrl="/iconpattern.webp"
              showUserInfo={true}
              enableTilt={true}
              behindGlowEnabled={true}
              behindGlowColor="rgba(34, 211, 238, 0.55)"
              innerGradient="linear-gradient(145deg,rgba(96,73,110,0.55) 0%,rgba(34,211,238,0.20) 48%,rgba(168,85,247,0.30) 100%)"
              className="w-full max-w-[360px]"
              onContactClick={scrollToContact}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
