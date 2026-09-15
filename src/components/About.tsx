import { Lightbulb, Zap, Palette, Cpu, CheckCircle } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ScrollReveal from "./reactbits/ScrollReveal";
import SpotlightCard from "./reactbits/SpotlightCard";
import { profileData } from "../data/profile";
import { useLanguage } from "../i18n";

export default function About() {
  const { language, t, profile } = useLanguage();
  const strengths =
    language === "en"
      ? [
          {
            title: "Website Development",
            description:
              "Building modern WordPress, React, and Next.js websites that are easy to manage and aligned with practical client needs.",
            icon: "Cpu"
          },
          {
            title: "n8n Automation",
            description:
              "Designing automation workflows that reduce manual work and connect data across multiple platforms.",
            icon: "Zap"
          },
          {
            title: "User Experience Optimization",
            description:
              "Improving layout, loading speed, and usability so websites are not only polished but effective in operation.",
            icon: "Palette"
          },
          {
            title: "Solution Thinking",
            description:
              "Understanding business needs, identifying core problems, and proposing clear, practical technical directions.",
            icon: "Lightbulb"
          }
        ]
      : profileData.strengths;
  // Map icons dynamically
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Lightbulb":
        return <Lightbulb className="w-5 h-5 text-neutral-200" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-neutral-200" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-neutral-200" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-neutral-200" />;
      default:
        return <CheckCircle className="w-5 h-5 text-neutral-200" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-neutral-950 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          number="01" 
          title={t("about.title")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
          {/* Detailed Biography - Left Side */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal origin="left" className="space-y-4">
              <h3 className="text-xl font-sans font-bold text-neutral-100 flex items-center gap-2">
                {t("about.intro").split("<highlight>")[0]}
                <span className="text-white underline decoration-neutral-600 underline-offset-4">Developer</span>
                {t("about.intro").split("</highlight>")[1]}
              </h3>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
                {profile.detailedAbout}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                {t("about.philosophy")}
              </p>
            </ScrollReveal>

            {/* Micro counters for tech creds */}
            <ScrollReveal origin="left" delay={200} className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-900">
              <div className="text-left">
                <div className="font-sans font-extrabold text-2xl sm:text-3xl text-white leading-none">2+</div>
                <div className="font-mono text-[10px] sm:text-xs text-neutral-500 mt-2 uppercase tracking-wider">{t("about.years")}</div>
              </div>
              <div className="text-left">
                <div className="font-sans font-extrabold text-2xl sm:text-3xl text-white leading-none">30+</div>
                <div className="font-mono text-[10px] sm:text-xs text-neutral-500 mt-2 uppercase tracking-wider">{t("about.projects")}</div>
              </div>
              <div className="text-left">
                <div className="font-sans font-extrabold text-2xl sm:text-3xl text-white leading-none">100%</div>
                <div className="font-mono text-[10px] sm:text-xs text-neutral-500 mt-2 uppercase tracking-wider">{t("about.satisfaction")}</div>
              </div>
            </ScrollReveal>
          </div>

          {/* Strengths 2x2 Grid - Right Side */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {strengths.map((strength, index) => (
              <ScrollReveal 
                key={strength.title} 
                origin="bottom" 
                delay={index * 100}
                className="h-full"
              >
                <SpotlightCard className="h-full p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Icon container */}
                    <div className="w-11 h-11 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                      {getIcon(strength.icon)}
                    </div>
                    {/* Title */}
                    <h4 className="font-sans text-base sm:text-lg font-bold text-neutral-200 leading-snug">
                      {strength.title}
                    </h4>
                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {strength.description}
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
