import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Language = "vi" | "en";

type TranslationKey =
  | "nav.about"
  | "nav.skills"
  | "nav.featured"
  | "nav.projects"
  | "nav.experience"
  | "nav.contact"
  | "header.contact"
  | "header.directContact"
  | "hero.badge"
  | "hero.greeting"
  | "hero.explore"
  | "hero.contact"
  | "about.title"
  | "about.intro"
  | "about.philosophy"
  | "about.years"
  | "about.projects"
  | "about.satisfaction"
  | "skills.title"
  | "skills.all"
  | "featured.title"
  | "featured.problem"
  | "featured.impact"
  | "featured.demo"
  | "featured.detail"
  | "projects.title"
  | "projects.detail"
  | "experience.title"
  | "experience.achievements"
  | "footer.description"
  | "footer.cta"
  | "footer.nav"
  | "footer.connect"
  | "footer.top"
  | "project.back"
  | "project.notFound"
  | "project.date"
  | "project.category"
  | "project.client"
  | "project.tech"
  | "project.metrics"
  | "project.prev"
  | "project.next"
  | "project.demo"
  | "project.source";

const dictionaries: Record<Language, Record<TranslationKey, string>> = {
  vi: {
    "nav.about": "Về tôi",
    "nav.skills": "Kỹ năng",
    "nav.featured": "Sản phẩm nổi bật",
    "nav.projects": "Dự án",
    "nav.experience": "Kinh nghiệm",
    "nav.contact": "Liên hệ",
    "header.contact": "Liên hệ ngay",
    "header.directContact": "Liên hệ trực tiếp",
    "hero.badge": "SẴN SÀNG CHO CÁC SẢN PHẨM KHỔNG LỒ",
    "hero.greeting": "Xin chào, Tôi là",
    "hero.explore": "Khám phá sản phẩm",
    "hero.contact": "Liên hệ trực tiếp",
    "about.title": "Chào mừng đến với thế giới của tôi",
    "about.intro": "Tôi là một <highlight>Developer</highlight> cho một agency.",
    "about.philosophy":
      'Trong suốt quá trình làm việc, tôi đúc rút được triết lý: "Mã nguồn tối giản mang lại hiệu quả vận hành tối đa". Tôi không chỉ hoàn thiện các dòng code sạch mà luôn song hành cùng khách hàng để định vị vấn đề cốt lõi, từ đó đưa ra thiết kế giải pháp thích ứng nhanh chóng và mang lại giá trị thực tế tốt nhất.',
    "about.years": "Năm Kinh Nghiệm",
    "about.projects": "Dự Án Hoàn Thành",
    "about.satisfaction": "Khách Hài Lòng",
    "skills.title": "Kỹ năng & Chuyên môn",
    "skills.all": "[Tất cả]",
    "featured.title": "Sản phẩm nổi bật",
    "featured.problem": "Vấn đề giải quyết:",
    "featured.impact": "Tác động / Kết quả:",
    "featured.demo": "Trải nghiệm Demo",
    "featured.detail": "Xem chi tiết",
    "projects.title": "Dự án khác đã triển khai",
    "projects.detail": "Xem chi tiết",
    "experience.title": "Lịch sử Thực chiến",
    "experience.achievements": "THÀNH TỰU HOÀN THÀNH:",
    "footer.description":
      "Tôi luôn sẵn sàng tiếp nhận các cơ hội hợp tác phát triển sản phẩm, website, Zalo Mini App hoặc workflow automation có định hướng thực tế.",
    "footer.cta": "Bắt đầu trao đổi",
    "footer.nav": "Điều hướng",
    "footer.connect": "Kết nối",
    "footer.top": "Đầu trang",
    "project.back": "Quay lại Projects",
    "project.notFound": "Không tìm thấy dự án",
    "project.date": "Ngày thực hiện",
    "project.category": "Danh mục",
    "project.client": "Đối tác / Thương hiệu",
    "project.tech": "Công nghệ sử dụng",
    "project.metrics": "Kết quả & số liệu",
    "project.prev": "Trước",
    "project.next": "Sau",
    "project.demo": "Demo",
    "project.source": "Mã nguồn"
  },
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.featured": "Featured",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "header.contact": "Contact now",
    "header.directContact": "Direct contact",
    "hero.badge": "READY FOR AMBITIOUS DIGITAL PRODUCTS",
    "hero.greeting": "Hello, I am",
    "hero.explore": "Explore products",
    "hero.contact": "Direct contact",
    "about.title": "Welcome to my world",
    "about.intro": "I am a <highlight>Developer</highlight> for an agency.",
    "about.philosophy":
      'Throughout my work, I follow one principle: "Minimal source code should create maximum operational value." I do not only write clean code; I work with clients to identify the core problem and design practical solutions that adapt quickly.',
    "about.years": "Years Experience",
    "about.projects": "Projects Completed",
    "about.satisfaction": "Client Satisfaction",
    "skills.title": "Skills & Expertise",
    "skills.all": "[All]",
    "featured.title": "Featured Products",
    "featured.problem": "Problem solved:",
    "featured.impact": "Impact / Result:",
    "featured.demo": "View Demo",
    "featured.detail": "View details",
    "projects.title": "Other Delivered Projects",
    "projects.detail": "View details",
    "experience.title": "Practical Experience",
    "experience.achievements": "KEY ACHIEVEMENTS:",
    "footer.description":
      "I am open to product, website, Zalo Mini App, and workflow automation collaborations with practical business goals.",
    "footer.cta": "Start a conversation",
    "footer.nav": "Navigation",
    "footer.connect": "Connect",
    "footer.top": "Back to top",
    "project.back": "Back to Projects",
    "project.notFound": "Project not found",
    "project.date": "Timeline",
    "project.category": "Category",
    "project.client": "Partner / Brand",
    "project.tech": "Technology stack",
    "project.metrics": "Results & metrics",
    "project.prev": "Prev",
    "project.next": "Next",
    "project.demo": "Demo",
    "project.source": "Source code"
  }
};

const profileCopy = {
  vi: {
    role: "Web Developer & Automation builder",
    shortDescription:
      "Tôi xây dựng các ứng dụng web hiện đại, tối ưu trải nghiệm người dùng bằng cách áp dụng thiết kế tinh tế kết hợp hiệu năng vượt trội và tư duy phát triển sản phẩm thực tế.",
    detailedAbout:
      "Tôi là một nhà phát triển phần mềm và nhà tạo lập sản phẩm nhiệt huyết. Tôi luôn giữ tư duy đặt người dùng làm trung tâm, từ khâu lên ý tưởng, thiết kế hệ thống tối ưu và lập trình giải pháp toàn diện. Với thế mạnh cả về Frontend, tôi chú trọng tối ưu trải nghiệm người dùng bằng cách áp dụng thiết kế tinh tế kết hợp hiệu năng vượt trội và giải quyết vấn đề của doanh nghiệp/cá nhân."
  },
  en: {
    role: "Web Developer & Automation Builder",
    shortDescription:
      "I build modern web applications with polished interfaces, strong performance, and practical product thinking focused on real user needs.",
    detailedAbout:
      "I am a software developer and product-minded builder. I keep users at the center of the process, from ideation and system design to implementation. With a strong frontend foundation, I focus on user experience, performance, and solving practical problems for businesses and individuals."
  }
};

export const projectCopy = {
  en: {
    "aistudio-maker": {
      title: "AI Studio Custom Component Builder",
      description:
        "A visual tool that helps developers build and test custom widgets quickly with live preview and AI-assisted coding.",
      role: "Full-stack Developer (Solo)",
      category: "Developer Tool & AI Assistant",
      client: "Nextgency Lab",
      overview: [
        "The project shortens the component-building loop through a focused workspace where users can write code, preview results, and refine UI in one flow.",
        "The workflow is optimized for rapid experimentation: users describe requirements, receive AI suggestions, fix syntax issues, and export clean code for React/Vite projects.",
        "Its value comes from responsive testing, reusable component standards, and fewer repetitive steps when creating UI."
      ],
      features: [
        "Live source editor with instant preview",
        "AI suggestions for syntax fixes and performance improvements",
        "Clean source export compatible with React/Vite",
        "Responsive simulator for multi-device checks"
      ],
      metrics: [
        { label: "Prototype speed", value: "+70%" },
        { label: "Syntax issues reduced", value: "-45%" },
        { label: "Code export time", value: "< 1 min" }
      ],
      badge: "New Product"
    },
    fintrack: {
      title: "FinTrack - Smart Expense Management",
      description:
        "A self-contained personal finance system with visual charts to help users track spending and optimize cash flow.",
      role: "Lead Frontend Developer",
      category: "Finance Dashboard",
      client: "Personal Product",
      overview: [
        "FinTrack turns scattered income and expense records into a clear dashboard suitable for daily financial tracking.",
        "The interface prioritizes quick scanning: period charts, spending categories, and saving-plan status are organized into one consistent view.",
        "The project also focuses on local data privacy, allowing users to store records on device and export reports when needed."
      ],
      features: [
        "Visual income and expense analytics by period",
        "Saving-plan features based on spending habits",
        "Accurate PDF and Excel financial reports",
        "Local client-side data protection"
      ],
      metrics: [
        { label: "Input speed", value: "+55%" },
        { label: "Report cycle", value: "Monthly" },
        { label: "Local data", value: "100%" }
      ],
      badge: "Popular"
    },
    socialhub: {
      title: "SocialHub Live Collaboration",
      description:
        "A community feed and realtime collaboration workspace for developers to share and discuss ideas.",
      role: "Full-stack Developer",
      category: "Realtime Collaboration",
      client: "Open Source Community",
      overview: [
        "SocialHub is a realtime collaboration space where users can exchange ideas, drag content, and discuss directly in one workflow.",
        "The project focuses on low-latency group interaction while keeping the interface minimal enough for content-first collaboration.",
        "The infrastructure is packaged for simple deployment, making it suitable for small teams that need a flexible private workspace."
      ],
      features: [
        "Drag-and-drop shared workspace with latency under 50ms",
        "Audio chat and direct file sharing",
        "Docker packaging for easier infrastructure deployment",
        "Dark theme designed for developer workflows"
      ],
      metrics: [
        { label: "Interaction latency", value: "< 50ms" },
        { label: "Workspace", value: "Realtime" },
        { label: "Deployment", value: "Docker" }
      ],
      badge: "Open Source"
    },
    "speedrun-code": {
      title: "SpeedRun Code Platform",
      description:
        "A live coding challenge platform that helps developers improve algorithm skills through fast competitive matches.",
      role: "Product Creator & Backend Dev",
      category: "Coding Challenge Platform",
      client: "Developer Community",
      overview: [
        "SpeedRun Code Platform creates a fast competitive programming experience where users solve problems, run test cases, and compare results in realtime.",
        "The project encourages algorithm practice through matches, leaderboards, and immediate feedback after submissions.",
        "The backend centers around an isolated runner sandbox to reduce execution risk when supporting multiple programming languages."
      ],
      features: [
        "Safe source execution through sandboxing",
        "Realtime leaderboard updates",
        "Automated multi-context test case generation",
        "Integrated algorithm discussion under each challenge"
      ],
      metrics: [
        { label: "Leaderboard update", value: "Realtime" },
        { label: "Runner sandbox", value: "Isolated" },
        { label: "Test cases", value: "Automated" }
      ],
      badge: "Challenge"
    }
  }
} as const;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  profile: typeof profileCopy.vi;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("portfolio-language");
    return stored === "en" || stored === "vi" ? stored : "vi";
  });

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    localStorage.setItem("portfolio-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "vi" ? "en" : "vi"),
      t: (key) => dictionaries[language][key],
      profile: profileCopy[language]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
