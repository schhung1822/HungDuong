import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./reactbits/ScrollReveal";
import ProjectThumbnailBackdrop from "./ProjectThumbnailBackdrop";
import { projectsData } from "../data/projects";
import { projectCopy, useLanguage } from "../i18n";
import { pageContainer } from "./layout";

const featuredProjectConfig = [
  {
    id: "miniapp-beautysummit-2026",
    label: "Beauty Summit",
    logo: "https://nextgency.vn/assets/images/partner/partner25.png"
  },
  {
    id: "srxvietnam",
    label: "SRX Việt Nam",
    logo: "https://nextgency.vn/assets/images/partner/partner34.webp"
  },
  {
    id: "topmus",
    label: "Topmus",
    logo: "https://nextgency.vn/assets/images/partner/partner32.webp"
  },
  { 
    id: "eac-group", 
    label: "EAC Group", 
    logo: "/eac-logo.webp" }
] as const;

export default function Projects() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const featuredProjects = useMemo(
    () =>
      featuredProjectConfig
        .map((config) => {
          const project = projectsData.find((item) => item.id === config.id);
          if (!project) return null;

          // English visitors read the translated copy; other fields fall back to the source data
          const translated =
            language === "en" ? projectCopy.en[project.id as keyof typeof projectCopy.en] : undefined;

          return { ...config, project: { ...project, ...translated } };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [language]
  );

  const copy =
    language === "vi"
      ? {
          badge: "PROJECTS",
          title: "Dự án nổi bật của Dương Mạnh Hùng",
          description:
            "Khám phá những website, nền tảng và giải pháp số tôi đã cùng đội ngũ triển khai từ yêu cầu thực tế đến sản phẩm hoàn chỉnh.",
          detail: "Xem case study",
          contact: "Hợp tác ngay",
          services: "Xem dịch vụ",
          previous: "Dự án trước",
          next: "Dự án tiếp theo"
        }
      : {
          badge: "PROJECTS",
          title: "Featured work by Duong Manh Hung",
          description:
            "Explore selected websites, platforms, and digital solutions I helped take from real business requirements to finished products.",
          detail: "View case study",
          contact: "Work together",
          services: "View services",
          previous: "Previous project",
          next: "Next project"
        };

  if (!featuredProjects.length) return null;

  const activeItem = featuredProjects[activeIndex] ?? featuredProjects[0];
  const activeProject = activeItem.project;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % featuredProjects.length);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (activeIndex + step + featuredProjects.length) % featuredProjects.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      id="projects"
      className="selection-on-light relative isolate scroll-mt-20 overflow-hidden border-y border-black/[0.06] bg-[#f0eee8] py-[72px] text-neutral-950 sm:py-24 lg:py-28"
    >
      <span id="featured" className="absolute top-0 scroll-mt-20" aria-hidden="true" />
      <ProjectThumbnailBackdrop />

      <div className={`relative z-10 ${pageContainer}`}>
        <ScrollReveal origin="bottom">
          <header className="mx-auto mb-10 max-w-4xl text-center sm:mb-14">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500 sm:text-xs">
              03 / {copy.badge}
            </p>
            <h2 className="mt-5 text-balance text-[clamp(2.7rem,5vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-black">
              {copy.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-7 text-neutral-500 sm:text-base">
              {copy.description}
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal origin="bottom" delay={100} className="mx-auto max-w-[1240px]">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/95 p-2 shadow-[0_28px_80px_-42px_rgba(17,12,24,0.4)] backdrop-blur-xl sm:p-4">
              <div
                className="grid grid-cols-2 gap-1.5 rounded-2xl sm:gap-2 lg:grid-cols-4"
                role="tablist"
                aria-label={copy.title}
                onKeyDown={handleTabKeyDown}
              >
                {featuredProjects.map((item, index) => {
                  const selected = index === activeIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      ref={(element) => {
                        tabRefs.current[index] = element;
                      }}
                      aria-selected={selected}
                      aria-controls="featured-project-panel"
                      id={`featured-project-tab-${item.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveIndex(index)}
                      className={`group flex min-h-16 items-center justify-center rounded-xl border px-4 py-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 ${
                        selected
                          ? "border-transparent bg-neutral-950 text-white shadow-lg shadow-black/10"
                          : "border-black/10 bg-black/[0.02] text-black/45 hover:bg-black/[0.05] hover:text-black/75"
                      }`}
                    >
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.label}
                          loading="lazy"
                          decoding="async"
                          className={`max-h-9 w-auto max-w-[150px] object-contain transition duration-300 ${
                            selected
                              ? "brightness-0 invert"
                              : "opacity-55 grayscale group-hover:opacity-95 group-hover:grayscale-0"
                          }`}
                        />
                      ) : (
                        <span className="text-center text-sm font-bold sm:text-base">{item.label}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div
                id="featured-project-panel"
                role="tabpanel"
                aria-labelledby={`featured-project-tab-${activeItem.id}`}
                className="relative mt-2 grid min-h-[520px] overflow-hidden rounded-2xl bg-[#f7f7f8] p-4 sm:mt-4 md:grid-cols-2"
              >
                {/*
                  Every project's copy is stacked in the same grid cell with only the
                  active one visible, so the panel always reserves the height of the
                  longest project and never resizes when tabs change.
                */}
                <div className="grid min-w-0 p-1 sm:p-7 lg:p-10">
                  {featuredProjects.map((item, itemIndex) => {
                    const project = item.project;
                    const isActive = itemIndex === activeIndex;
                    const projectCategories = project.category
                      .split("/")
                      .map((category) => category.trim());
                    const projectCaseStudyUrl = project.demoUrl.trim();

                    return (
                      <div
                        key={item.id}
                        aria-hidden={!isActive}
                        className={`col-start-1 row-start-1 flex min-w-0 flex-col ${
                          isActive ? "project-content-swap" : "invisible"
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-black/45 sm:text-xs">
                          <span>{project.client}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.date}</span>
                        </div>

                        <h3 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.04em] text-black sm:text-3xl lg:text-4xl">
                          {project.title}
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-black/60 sm:text-base">
                          {project.description}
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                          {project.metrics.slice(0, 3).map((metric, index) => {
                            const highlighted = index === 1;
                            return (
                              <div
                                key={metric.label}
                                className={`flex min-h-[104px] flex-col justify-between rounded-lg p-4 sm:min-h-[112px] ${
                                  highlighted
                                    ? "bg-neutral-950 text-white"
                                    : "border border-black/[0.06] bg-white text-black"
                                } ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                              >
                                <span
                                  className={`text-[10px] leading-4 ${highlighted ? "text-white/75" : "text-black/50"}`}
                                >
                                  {metric.label}
                                </span>
                                <strong className="text-xl tracking-[-0.04em] sm:text-2xl lg:text-3xl">
                                  {metric.value}
                                </strong>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {[...projectCategories, ...project.tech].slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] text-black/55 sm:text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {projectCaseStudyUrl && (
                          <a
                            href={projectCaseStudyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={isActive ? 0 : -1}
                            className="group mt-7 flex w-fit items-center gap-3 rounded-full bg-black py-1 pl-5 pr-1 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
                          >
                            <span>{copy.detail}</span>
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-white">
                              <ArrowUpRight className="h-4 w-4 text-black transition-transform duration-300 group-hover:rotate-12" />
                            </span>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div
                  key={`image-${activeProject.id}`}
                  className="project-image-swap relative mt-5 min-h-[300px] overflow-hidden rounded-2xl bg-[#eceaf0] md:mt-0 md:min-h-full"
                >
                  <img
                    src={activeProject.thumbnail}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
                  />
                  <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-6">
                    <img
                      src={activeProject.thumbnail}
                      alt={activeProject.title}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full rounded-xl object-contain shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-1 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 sm:flex lg:-left-4"
              aria-label={`${copy.previous}: ${featuredProjects[(activeIndex - 1 + featuredProjects.length) % featuredProjects.length].project.title}`}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-1 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 sm:flex lg:-right-4"
              aria-label={`${copy.next}: ${featuredProjects[(activeIndex + 1) % featuredProjects.length].project.title}`}
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
              <button
                type="button"
                onClick={showPrevious}
                aria-label={copy.previous}
                className="grid h-10 w-10 place-items-center rounded-full bg-black text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span className="font-mono text-[10px] tracking-[0.18em] text-neutral-500">
                0{activeIndex + 1} / 0{featuredProjects.length}
              </span>
              <button
                type="button"
                onClick={showNext}
                aria-label={copy.next}
                className="grid h-10 w-10 place-items-center rounded-full bg-black text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal origin="bottom" delay={180}>
          <div className="relative z-10 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group flex items-center gap-3 rounded-full border border-black/10 bg-white/80 py-1.5 pl-5 pr-1.5 text-sm font-semibold text-black shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03]"
            >
              <span>{copy.contact}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-black text-white">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              </span>
            </a>
            <a
              href="#services"
              className="group flex items-center gap-3 rounded-full bg-black py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              <span>{copy.services}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-35deg]" />
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
