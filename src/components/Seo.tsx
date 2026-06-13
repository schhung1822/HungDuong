import { useEffect } from "react";
import { projectCopy, useLanguage } from "../i18n";
import { projectsData } from "../data/projects";

interface SeoProps {
  projectId?: string;
}

const baseCopy = {
  vi: {
    title: "Dương Mạnh Hùng | Web Developer & Automation Builder",
    description:
      "Portfolio của Dương Mạnh Hùng, Web Developer & Automation Builder chuyên phát triển website, Zalo Mini App, CMS tùy chỉnh và workflow automation."
  },
  en: {
    title: "Duong Manh Hung | Web Developer & Automation Builder",
    description:
      "Portfolio of Duong Manh Hung, a Web Developer & Automation Builder focused on websites, Zalo Mini Apps, custom CMS and workflow automation."
  }
};

const defaultPreviewImage = "/seo.webp";
const defaultPreviewAlt = "DÆ°Æ¡ng Máº¡nh HÃ¹ng Portfolio preview";

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(element);
  }

  element.content = content;
}

export default function Seo({ projectId }: SeoProps) {
  const { language } = useLanguage();

  useEffect(() => {
    const base = baseCopy[language];
    const baseProject = projectId ? projectsData.find((project) => project.id === projectId) : null;
    const translatedProject =
      language === "en" && baseProject
        ? projectCopy.en[baseProject.id as keyof typeof projectCopy.en]
        : null;
    const project = baseProject ? { ...baseProject, ...translatedProject } : null;

    const title = project ? `${project.title} | ${base.title}` : base.title;
    const description = project?.description || base.description;
    const image = project?.thumbnail || defaultPreviewImage;
    const imageAlt = project ? `${project.title} preview` : defaultPreviewAlt;

    document.documentElement.lang = language;
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", image, true);
    setMeta("og:image:alt", imageAlt, true);
    setMeta("og:locale", language === "vi" ? "vi_VN" : "en_US", true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    setMeta("twitter:image:alt", imageAlt);
  }, [language, projectId]);

  return null;
}
