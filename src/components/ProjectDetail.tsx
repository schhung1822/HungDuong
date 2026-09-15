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
      <section className="min-h-screen bg-neutral-950 px-6 pb-20 pt-32">
        <div className="mx-auto max-w-4xl rounded-2xl border border-neutral-900 bg-neutral-900/[0.14] p-8 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">project_not_found</p>
          <h1 className="mt-4 font-sans text-3xl font-bold text-neutral-100">{t("project.notFound")}</h1>
          <button
            type="button"
            onClick={handleBack}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-5 py-3 font-sans text-sm font-bold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
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
    <section className="relative min-h-screen overflow-hidden bg-neutral-950 px-6 pb-20 pt-28 text-neutral-100">
      <div className="relative mx-auto max-w-7xl">
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center gap-1 font-sans text-sm text-neutral-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("project.back")}
        </button>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-neutral-700 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-300">
            {project.badge}
          </span>
          <span className="font-mono text-xs text-neutral-500">// project_{project.id}</span>
        </div>

        <h1 className="max-w-5xl font-sans text-4xl font-black leading-tight tracking-tight text-neutral-100 sm:text-5xl">
          {project.title}
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/[0.12]">
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
                    className="absolute bottom-5 left-5 rounded-full border border-neutral-700 bg-neutral-950/75 px-4 py-2 font-sans text-sm font-bold text-neutral-200 backdrop-blur transition-colors hover:border-neutral-500 hover:text-white"
                  >
                    {t("project.prev")}
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute bottom-5 right-5 rounded-full border border-neutral-700 bg-neutral-950/75 px-4 py-2 font-sans text-sm font-bold text-neutral-200 backdrop-blur transition-colors hover:border-neutral-500 hover:text-white"
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
                    className={`h-16 w-28 shrink-0 overflow-hidden rounded-2xl border bg-neutral-900/[0.18] transition-all duration-200 sm:h-20 sm:w-36 ${
                      activeImageIndex === index
                        ? "border-white"
                        : "border-neutral-800 opacity-70 hover:border-neutral-500 hover:opacity-100"
                    }`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-7 max-w-4xl space-y-5 font-sans text-base leading-8 text-neutral-400">
              <p className="text-lg leading-8 text-neutral-200">{project.description}</p>
              {project.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/[0.12] p-6">
              <div className="space-y-6">
                <div>
                  <p className="font-sans text-sm text-neutral-400">{t("project.date")}</p>
                  <p className="mt-2 font-sans text-xl font-bold text-neutral-100">{project.date}</p>
                </div>
                <div>
                  <p className="font-sans text-sm text-neutral-400">{t("project.category")}</p>
                  <p className="mt-2 font-sans text-lg font-bold text-neutral-100">{project.category}</p>
                </div>
                <div>
                  <p className="font-sans text-sm text-neutral-400">{t("project.client")}</p>
                  <p className="mt-2 font-sans text-lg font-bold text-neutral-100">{project.client}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/[0.12] p-6">
              <p className="font-sans text-sm text-neutral-400">{t("project.tech")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1.5 font-sans text-sm text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/[0.12] p-6">
              <p className="font-sans text-sm text-neutral-400">{t("project.metrics")}</p>
              <div className="mt-5 space-y-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between gap-4">
                    <span className="font-sans text-sm text-neutral-300">{metric.label}</span>
                    <span className="font-sans text-lg font-black text-white">{metric.value}</span>
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
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 font-sans text-sm font-bold text-black transition-colors hover:bg-neutral-200"
                >
                  {t("project.demo")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-5 font-sans text-sm font-bold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
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
