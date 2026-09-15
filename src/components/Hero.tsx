import React from "react";
import { ArrowRight } from "lucide-react";
import LiquidEther from "./reactbits/LiquidEther";
import ProfileCard from "./reactbits/ProfileCard";
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
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 z-0 opacity-50">
        <LiquidEther
          colors={["#ffffff", "#a3a3a3", "#404040"]}
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

      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(10,10,10,0.35)_45%,rgba(10,10,10,0.9)_100%)]" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950" />

      <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-12 px-4 pt-8 md:pt-16 lg:grid-cols-12">
        <div className="flex h-full flex-col justify-center gap-6 text-left lg:col-span-7">
          <ScrollReveal origin="top" delay={100} className="inline-flex">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md text-neutral-300 font-mono text-xs font-medium tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {t("hero.badge")}
            </span>
          </ScrollReveal>

          <div className="flex flex-col gap-1.5">
            <ScrollReveal origin="left" delay={200}>
              <span className="font-mono text-sm uppercase tracking-widest text-neutral-500 block mb-1">
                {t("hero.greeting")}
              </span>
              <h1 className="text-4xl leading-[1.2] sm:text-5xl md:text-6xl font-sans tracking-tight font-extrabold text-white">
                {profileData.fullName}
              </h1>
            </ScrollReveal>

            <ScrollReveal origin="left" delay={300}>
              <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-neutral-400">
                {profile.role}
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal origin="left" delay={400}>
            <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-xl leading-relaxed font-sans">
              {profile.shortDescription}
            </p>
          </ScrollReveal>

          <ScrollReveal origin="bottom" delay={500} className="flex flex-wrap items-center gap-3 mt-2">
            <button
              onClick={handleViewProjects}
              className="group flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-sans font-semibold text-sm px-6 py-3.5 rounded-full transition-colors duration-200"
              id="hero-cta-projects"
            >
              {t("hero.explore")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#contact"
              onClick={handleContact}
              className="flex items-center gap-1.5 border border-neutral-800 hover:border-neutral-500 text-neutral-300 hover:text-white font-sans font-medium text-sm px-6 py-3.5 rounded-full transition-colors duration-200"
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
              behindGlowColor="rgba(255, 255, 255, 0.18)"
              innerGradient="linear-gradient(145deg,rgba(64,64,64,0.55) 0%,rgba(23,23,23,0.35) 55%,rgba(115,115,115,0.25) 100%)"
              className="w-full max-w-[360px]"
              onContactClick={scrollToContact}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
