import { useEffect, useRef, useState } from "react";
import { ArrowRight, Calendar, Check, GraduationCap, MapPin, Rocket, Workflow } from "lucide-react";
import ScrollReveal from "./reactbits/ScrollReveal";
import SpotlightCard from "./reactbits/SpotlightCard";
import { experienceData } from "../data/experience";
import { useLanguage } from "../i18n";
import { pageContainer } from "./layout";
import { pill, surface } from "./surface";

const stageIcons = [Rocket, Workflow, GraduationCap];

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

  const copy =
    language === "vi"
      ? {
          eyebrow: "KINH NGHIỆM / LỘ TRÌNH",
          heading: "Từ website đầu tiên đến hệ thống vận hành thật.",
          headingMuted: "Ba giai đoạn, mỗi năm một lớp năng lực mới.",
          description:
            "Mỗi mốc là một bước mở rộng: bắt đầu từ website giới thiệu, rồi đến workflow automation, CMS tùy chỉnh và mini app phục vụ sự kiện quy mô lớn.",
          cta: "Bắt đầu dự án",
          navLabel: "Chọn giai đoạn",
          stages: ["HIỆN TẠI", "MỞ RỘNG", "KHỞI ĐẦU"]
        }
      : {
          eyebrow: "EXPERIENCE / TIMELINE",
          heading: "From a first website to systems that run real operations.",
          headingMuted: "Three stages, one new capability layer each year.",
          description:
            "Every milestone added a layer: business websites first, then automation workflows, custom CMS platforms, and mini apps built for large-scale events.",
          cta: "Start a project",
          navLabel: "Pick a stage",
          stages: ["NOW", "SCALE", "START"]
        };

  const [activeId, setActiveId] = useState(experiences[0].id);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  // Keeps the sticky year switcher in sync with the milestone currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const id = visible[0]?.target.getAttribute("data-exp-id");
        if (id) setActiveId(id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );

    Object.values(itemRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [language]);

  const scrollToId = (id: string) => {
    const target = itemRefs.current[id];
    if (target) {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({ top: contactSection.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-white/10 bg-neutral-950 py-20 text-white sm:py-28 lg:py-32"
    >
      <div className={pageContainer}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          {/* Sticky intro rail */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <ScrollReveal origin="left">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.28em] text-neutral-500 sm:text-xs">
                    04 / {copy.eyebrow}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                {/* Year switcher, mirrors the section scroll position */}
                <nav
                  aria-label={copy.navLabel}
                  className={`mt-8 inline-flex rounded-full p-1 ${surface}`}
                >
                  {experiences.map((exp) => {
                    const isActive = exp.id === activeId;

                    return (
                      <button
                        key={exp.id}
                        type="button"
                        aria-current={isActive}
                        onClick={() => scrollToId(exp.id)}
                        className={`rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.12em] transition-colors sm:px-5 sm:text-xs ${
                          isActive ? `text-white ${pill}` : "text-neutral-500 hover:text-neutral-200"
                        }`}
                      >
                        {exp.period.slice(0, 4)}
                      </button>
                    );
                  })}
                </nav>

                <h2 className="mt-8 text-balance font-sans text-[clamp(2.4rem,3.6vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-white">
                  {copy.heading}
                  <span className="mt-3 block text-neutral-700">{copy.headingMuted}</span>
                </h2>

                <p className="mt-7 max-w-md text-pretty text-sm leading-7 text-neutral-500 sm:text-base">
                  {copy.description}
                </p>

                <button
                  type="button"
                  onClick={scrollToContact}
                  className="group mt-9 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-bold text-black transition-colors hover:bg-neutral-200"
                >
                  {copy.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </ScrollReveal>
            </div>
          </div>

          {/* Milestone timeline */}
          <div className="relative lg:col-span-7 xl:col-span-8">
            {/* Timeline spine */}
            <span
              aria-hidden="true"
              className="absolute bottom-10 left-[19px] top-3 w-px bg-linear-to-b from-white/20 via-white/10 to-transparent sm:left-[23px]"
            />

            <div className="space-y-16 sm:space-y-20">
              {experiences.map((exp, index) => {
                const StageIcon = stageIcons[index] ?? Rocket;
                const isActive = exp.id === activeId;

                return (
                  <article
                    key={exp.id}
                    data-exp-id={exp.id}
                    ref={(el) => {
                      itemRefs.current[exp.id] = el;
                    }}
                    className="relative pl-14 sm:pl-[72px]"
                  >
                    {/* Timeline node */}
                    <div className="absolute left-0 top-0 flex w-10 flex-col items-center sm:w-12">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 sm:h-12 sm:w-12 ${
                          isActive
                            ? "border-white bg-white text-black"
                            : "border-white/10 bg-neutral-900 text-neutral-400"
                        }`}
                      >
                        <StageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <span className="mt-2.5 font-mono text-[10px] text-neutral-600">
                        0{index + 1}
                      </span>
                    </div>

                    <ScrollReveal origin="bottom" delay={index * 80}>
                      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                        {copy.stages[index]}
                      </span>

                      <h3 className="mt-4 text-pretty text-2xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-3xl">
                        {exp.role}
                      </h3>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-neutral-500 sm:text-xs">
                        <span className="text-neutral-300">@{exp.company}</span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {exp.location}
                        </span>
                      </div>

                      <p className="mt-5 max-w-3xl text-pretty text-sm leading-7 text-neutral-500">
                        {exp.description}
                      </p>

                      {/* Padding only: SpotlightCard owns its radius, border and background */}
                      <SpotlightCard className="mt-6 p-5 sm:p-7">
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                          {t("experience.achievements")}
                        </p>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          {exp.highlights.map((highlight) => (
                            <div key={highlight} className="flex gap-3">
                              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-black">
                                <Check className="h-3 w-3" />
                              </span>
                              <p className="text-xs leading-6 text-neutral-400">{highlight}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-7 flex flex-wrap gap-1.5 border-t border-white/10 pt-6">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-neutral-400"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </SpotlightCard>
                    </ScrollReveal>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
