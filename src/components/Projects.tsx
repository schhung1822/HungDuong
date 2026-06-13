import { useMemo } from "react";
import { ExternalLink, Github, Cpu, ShieldCheck } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ScrollReveal from "./reactbits/ScrollReveal";
import SpotlightCard from "./reactbits/SpotlightCard";
import InfiniteMenu from "./reactbits/InfiniteMenu";
import { projectsData } from "../data/projects";
import { projectCopy, useLanguage } from "../i18n";

function getRandomProjects<T>(items: T[], count: number) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, count)
    .map(({ item }) => item);
}

export default function Projects() {
  const { language, t } = useLanguage();
  const randomProjectIds = useMemo(
    () => getRandomProjects(projectsData, 4).map((project) => project.id),
    []
  );
  const projects = projectsData.map((project) => ({
    ...project,
    ...(language === "en" ? projectCopy.en[project.id as keyof typeof projectCopy.en] : {})
  }));
  const displayedProjects = randomProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project));
  const infiniteMenuItems = projects.map((project) => ({
    image: project.thumbnail,
    link: `#project/${project.id}`,
    title: project.title,
    description: project.description,
    badge: project.badge
  }));

  return (
    <section id="projects" className="py-20 bg-slate-950 px-6 border-t border-slate-900/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          number="04"
          title={t("projects.title")}
          subtitle="engineering_experiments"
        />

        <ScrollReveal origin="bottom" className="mt-6">
          <div className="relative h-[520px] overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950 shadow-2xl shadow-cyan-950/10 md:h-[640px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12),transparent_56%)]" />
            <InfiniteMenu items={infiniteMenuItems} scale={0.92} />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 mt-8 md:grid-cols-2">
          {displayedProjects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              origin="bottom"
              delay={index * 100}
              className="h-full"
            >
              <SpotlightCard
                className="p-6 h-full bg-slate-900/[0.1] border-slate-800/80"
                spotlightColor="rgba(6, 182, 212, 0.08)"
                borderColor="rgba(6, 182, 212, 0.2)"
                id={project.id}
              >
                <div className="flex h-full flex-col justify-between gap-6">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-900 pb-3">
                      <span className="font-mono text-xs text-slate-500">// project_{project.id}</span>
                      <span className="rounded-full border border-cyan-500/20 bg-cyan-950/40 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-cyan-400">
                        {project.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-sans text-xl font-bold text-slate-100">
                        {project.title}
                      </h4>
                      <p className="flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-purple-400">
                        <Cpu className="h-3.5 w-3.5" /> Core Role: {project.role}
                      </p>
                    </div>

                    <p className="font-sans text-sm leading-relaxed text-slate-400">
                      {project.description}
                    </p>

                    <ul className="space-y-2 border-t border-slate-900/80 pt-4">
                      {project.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 font-sans text-xs leading-relaxed text-slate-400">
                          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/80" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-slate-900 bg-slate-950 px-2.5 py-0.5 font-mono text-[10px] text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t border-slate-900/50 pt-4">
                    <a
                      href={`#project/${project.id}`}
                      className="flex items-center gap-1.5 rounded-lg border border-cyan-500/10 bg-cyan-950/20 px-4 py-2 font-sans text-xs font-bold text-cyan-400 transition-colors hover:bg-cyan-950/40 hover:text-cyan-300"
                    >
                      {t("projects.detail")} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-2 font-sans text-xs font-semibold text-slate-400 transition-colors hover:text-white"
                    >
                      <Github className="h-4 w-4" /> {t("project.source")}
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
