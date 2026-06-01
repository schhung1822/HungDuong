import { Calendar, Briefcase, MapPin, CheckCircle, GraduationCap } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ScrollReveal from "./reactbits/ScrollReveal";
import SpotlightCard from "./reactbits/SpotlightCard";
import { experienceData } from "../data/experience";
import { useLanguage } from "../i18n";

export default function Experience() {
  const { language, t } = useLanguage();
  const experiences =
    language === "en"
      ? [
          {
            ...experienceData[0],
            period: "2026 - Present",
            location: "Hanoi",
            description:
              "Continuing to deliver larger website projects while building custom CMS, mini apps, and technology solutions for business, event, and personal product operations.",
            highlights: [
              "Delivered representative projects such as SRX, Topmus, QC House, FPT Telecom branches, Fobtrans Logistic, and multiple business websites",
              "Built a mini app for Beauty Summit 2026 to support attendee experience, event interaction, and technical operations",
              "Continued supporting technology operations, workflow automation, and data workflows for Beauty Summit 2026",
              "Built custom CMS solutions for more flexible content, data, and website structure management",
              "Developed personal product experiments to improve system thinking and custom-code capability"
            ]
          },
          {
            ...experienceData[1],
            location: "Hanoi",
            description:
              "Delivered multiple website and automation projects, growing stronger in custom UI, data integration, and workflow automation for organizations, events, and businesses.",
            highlights: [
              "Built around 20 websites and automation workflows for projects including Aloha Villa, Usobebe, Beauty Summit, Nextgency, Beauty Awards, LMS, and more",
              "Developed brand websites, landing pages, service websites, content systems, and campaign pages across several industries",
              "Designed automation flows connecting forms, email, Google Sheets, CRM, and webhooks to reduce manual processing",
              "Handled workflow automation and event data operations for Beauty Summit 2025"
            ]
          },
          {
            ...experienceData[2],
            location: "Hanoi",
            description:
              "Started with internship and small business projects, focusing on company websites, basic e-commerce experiences, and real-world web delivery workflows.",
            highlights: [
              "Joined internship work and delivered small business websites for brand, service, and product presentation",
              "Built basic e-commerce websites with product display, contact forms, ordering information, and sales content",
              "Practiced translating real client requirements into responsive and manageable website interfaces",
              "Supported behind-the-scenes technology, data, and automation operations for Beauty Summit 2024"
            ]
          }
        ]
      : experienceData;
  return (
    <section id="experience" className="py-20 bg-slate-950 px-6 border-t border-slate-900 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          number="05" 
          title={t("experience.title")}
          subtitle="career_pathweight" 
        />

        {/* Timeline container */}
        <div className="relative border-l border-slate-900 ml-4 md:ml-8 mt-12 space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 md:pl-12 group">
              {/* Connected glowing circle node */}
              <span className="absolute left-0 top-1.5 -translate-x-[9px] w-4.5 h-4.5 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:scale-110">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-850 group-hover:bg-cyan-400 transitions-colors" />
              </span>

              {/* Timing label on floating style or inline for mobile layouts */}
              <ScrollReveal origin="left" delay={50}>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="flex items-center gap-1.5 font-mono text-xs text-cyan-400 bg-cyan-950/25 px-2.5 py-1 rounded border border-cyan-500/10">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  
                  <span className="flex items-center gap-1 font-sans text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>
              </ScrollReveal>

              {/* Item main description wrapper */}
              <ScrollReveal origin="bottom" delay={index * 100}>
                <SpotlightCard
                  className="p-6 md:p-8 bg-slate-900/[0.1] hover:bg-slate-900/[0.25] transition-all"
                  spotlightColor="rgba(139, 92, 246, 0.08)"
                  borderColor="rgba(139, 92, 246, 0.15)"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        {index === 3 ? (
                          <GraduationCap className="w-5 h-5 text-purple-400" />
                        ) : (
                          <Briefcase className="w-5 h-5 text-purple-400" />
                        )}
                        <h4 className="font-sans text-lg sm:text-xl font-bold text-slate-100 leading-tight">
                          {exp.role}
                        </h4>
                      </div>
                      <p className="font-mono text-xs sm:text-sm text-slate-400 font-semibold tracking-wide">
                        @{exp.company}
                      </p>
                    </div>

                    {/* Summary bio paragraph */}
                    <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed italic border-l-2 border-slate-800 pl-3">
                      {exp.description}
                    </p>

                    {/* Accomplishments checklist */}
                    <div className="space-y-2.5 pt-2">
                      <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{t("experience.achievements")}</p>
                      {exp.highlights.map((hl, hlIdx) => (
                        <div key={hlIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-cyan-500/80 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skills list tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {exp.skills.map((t) => (
                        <span 
                          key={t}
                          className="px-2.5 py-0.5 rounded bg-slate-950 border border-slate-900 text-slate-400 font-mono text-[10px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
