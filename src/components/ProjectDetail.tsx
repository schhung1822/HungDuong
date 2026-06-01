import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projectsData } from "../data/projects";
import { projectCopy, useLanguage } from "../i18n";

interface ProjectDetailProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const { language, t } = useLanguage();
  const baseProject = projectsData.find((item) => item.id === projectId);
  const project = baseProject
    ? {
        ...baseProject,
        ...(language === "en" ? projectCopy.en[baseProject.id as keyof typeof projectCopy.en] : {})
      }
    : undefined;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [projectId]);

  const handleBack = () => {
    window.location.hash = "#projects";
  };

  if (!project) {
    return (
      <section className="min-h-screen bg-slate-950 px-6 pb-20 pt-32">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-900 bg-slate-900/[0.14] p-8 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">project_not_found</p>
          <h1 className="mt-4 font-sans text-3xl font-bold text-slate-100">{t("project.notFound")}</h1>
          <button
            type="button"
            onClick={handleBack}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-5 py-3 font-sans text-sm font-bold text-slate-300 transition-colors hover:border-cyan-400/35 hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("project.back")}
          </button>
        </div>
      </section>
    );
  }

  const gallery = project.gallery.length ? project.gallery : [project.thumbnail];
  const activeImage = gallery[activeImageIndex];

  const showPreviousImage = () => {
    setActiveImageIndex((current) => (current - 1 + gallery.length) % gallery.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % gallery.length);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-6 pb-20 pt-28 text-slate-100">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-28 h-96 w-96 rounded-full bg-cyan-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-72 h-96 w-96 rounded-full bg-purple-500/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center gap-1 font-sans text-sm text-slate-400 transition-colors hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("project.back")}
        </button>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-cyan-500/20 bg-cyan-950/40 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-300">
            {project.badge}
          </span>
          <span className="font-mono text-xs text-slate-500">// project_{project.id}</span>
        </div>

        <h1 className="max-w-5xl font-sans text-4xl font-black leading-tight tracking-tight text-slate-100 sm:text-5xl">
          {project.title}
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/[0.12] shadow-2xl shadow-cyan-950/20">
              <img
                src={activeImage}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                className="aspect-[16/9] w-full object-cover"
              />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="absolute bottom-5 left-5 rounded-full border border-slate-700 bg-slate-950/75 px-4 py-2 font-sans text-sm font-bold text-slate-200 backdrop-blur transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    {t("project.prev")}
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute bottom-5 right-5 rounded-full border border-slate-700 bg-slate-950/75 px-4 py-2 font-sans text-sm font-bold text-slate-200 backdrop-blur transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    {t("project.next")}
                  </button>
                </>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-16 w-28 shrink-0 overflow-hidden rounded-2xl border bg-slate-900/[0.18] transition-all duration-200 sm:h-20 sm:w-36 ${
                      activeImageIndex === index
                        ? "border-cyan-400 ring-2 ring-cyan-400/20"
                        : "border-slate-800 opacity-70 hover:border-purple-400/40 hover:opacity-100"
                    }`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-7 max-w-4xl space-y-5 font-sans text-base leading-8 text-slate-400">
              <p className="text-lg leading-8 text-slate-200">{project.description}</p>
              {project.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/[0.12] p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
              <div className="space-y-6">
                <div>
                  <p className="font-sans text-sm text-slate-400">{t("project.date")}</p>
                  <p className="mt-2 font-sans text-xl font-bold text-slate-100">{project.date}</p>
                </div>
                <div>
                  <p className="font-sans text-sm text-slate-400">{t("project.category")}</p>
                  <p className="mt-2 font-sans text-lg font-bold text-slate-100">{project.category}</p>
                </div>
                <div>
                  <p className="font-sans text-sm text-slate-400">{t("project.client")}</p>
                  <p className="mt-2 font-sans text-lg font-bold text-slate-100">{project.client}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/[0.12] p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
              <p className="font-sans text-sm text-slate-400">{t("project.tech")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 font-sans text-sm text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/[0.12] p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
              <p className="font-sans text-sm text-slate-400">{t("project.metrics")}</p>
              <div className="mt-5 space-y-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between gap-4">
                    <span className="font-sans text-sm text-slate-300">{metric.label}</span>
                    <span className="font-sans text-lg font-black text-cyan-300">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.demoUrl !== "#" && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-cyan-400 px-5 font-sans text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/15 transition-colors hover:bg-cyan-300"
                >
                  {t("project.demo")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-5 font-sans text-sm font-bold text-slate-300 transition-colors hover:border-cyan-400/35 hover:text-cyan-300"
              >
                <Github className="h-4 w-4" />
                {t("project.source")}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
