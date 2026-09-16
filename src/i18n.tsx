import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Language = "vi" | "en";

type TranslationKey =
  | "nav.about"
  | "nav.services"
  | "nav.projects"
  | "nav.experience"
  | "nav.contact"
  | "header.contact"
  | "header.directContact"
  | "hero.badge"
  | "hero.greeting"
  | "hero.headline"
  | "hero.description"
  | "hero.scroll"
  | "hero.explore"
  | "hero.contact"
  | "about.title"
  | "about.intro"
  | "about.philosophy"
  | "about.years"
  | "about.projects"
  | "about.satisfaction"
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
    "nav.services": "Dịch vụ",
    "nav.projects": "Dự án",
    "nav.experience": "Kinh nghiệm",
    "nav.contact": "Liên hệ",
    "header.contact": "Liên hệ ngay",
    "header.directContact": "Liên hệ trực tiếp",
    "hero.badge": "FRONTEND DEVELOPER / AUTOMATION BUILDER",
    "hero.greeting": "Xin chào, Tôi là",
    "hero.headline": "Tôi tạo ra sản phẩm web nhanh, dễ mở rộng với trải nghiệm chỉn chu và giải pháp automation thực tế.",
    "hero.description":
      "Tôi đồng hành từ giao diện, kiến trúc frontend đến tích hợp API và triển khai, tập trung vào những sản phẩm đẹp, hiệu quả và giải quyết đúng nhu cầu vận hành.",
    "hero.scroll": "Cuộn",
    "hero.explore": "Bắt đầu dự án",
    "hero.contact": "Liên hệ trực tiếp",
    "about.title": "Chào mừng đến với thế giới của tôi",
    "about.intro": "Tôi là một <highlight>Developer</highlight> cho một agency.",
    "about.philosophy":
      'Trong suốt quá trình làm việc, tôi đúc rút được triết lý: "Mã nguồn tối giản mang lại hiệu quả vận hành tối đa". Tôi không chỉ hoàn thiện các dòng code sạch mà luôn song hành cùng khách hàng để định vị vấn đề cốt lõi, từ đó đưa ra thiết kế giải pháp thích ứng nhanh chóng và mang lại giá trị thực tế tốt nhất.',
    "about.years": "Năm Kinh Nghiệm",
    "about.projects": "Dự Án Hoàn Thành",
    "about.satisfaction": "Khách Hài Lòng",
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
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "header.contact": "Contact now",
    "header.directContact": "Direct contact",
    "hero.badge": "FRONTEND DEVELOPER / AUTOMATION BUILDER",
    "hero.greeting": "Hello, I am",
    "hero.headline": "I build fast, scalable web products with polished UI and practical automation.",
    "hero.description":
      "I work across product UI, frontend architecture, API integration, and deployment to ship experiences that look sharp, perform well, and solve real operational needs.",
    "hero.scroll": "Scroll",
    "hero.explore": "Start a project",
    "hero.contact": "Direct contact",
    "about.title": "Welcome to my world",
    "about.intro": "I am a <highlight>Developer</highlight> for an agency.",
    "about.philosophy":
      'Throughout my work, I follow one principle: "Minimal source code should create maximum operational value." I do not only write clean code; I work with clients to identify the core problem and design practical solutions that adapt quickly.',
    "about.years": "Years Experience",
    "about.projects": "Projects Completed",
    "about.satisfaction": "Client Satisfaction",
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

// English copy for the featured projects. Any Project field placed here overrides
// the Vietnamese source in data/projects.ts when the language is set to EN.
export const projectCopy = {
  en: {
    "miniapp-beautysummit-2026": {
      title: "Beauty Summit 2026 Mini App",
      description:
        "A Zalo Mini App that brings a new dynamic to the beauty event. Through a quest-based points system where ticket holders collect points and redeem rewards, the app raises on-site engagement while driving revenue from VIP ticket packages. The point system is designed to be self-explanatory, so guests can join and claim rewards inside the Zalo app they already use, with no extra download.",
      overview: [
        "To stay smooth in a crowded venue, the mini app was built mobile-first. We put particular care into a clear user-instruction flow paired with a simple UI, so attendees of any age can follow the steps to take part in the event.",
        "The core loop is real-world gamification: attendees scan QR codes to check in at booths and follow the organiser's Zalo Official Account to collect points. These tasks digitise the whole guest journey, turning every step around the venue into a measurable touchpoint.",
        "Collected points can be redeemed for physical gifts or VIP ticket upgrades. By building on the Zalo ecosystem, the solution both energises the floor during the event and lets the organiser gather a large base of quality user data for remarketing through the Zalo OA once the event is over."
      ],
      client: "Beauty Summit",
      metrics: [
        { label: "Event engagement", value: "+65%" },
        { label: "Zalo OA follows", value: "+500%" },
        { label: "QR check-in scans", value: "> 4,000" }
      ]
    },
    srxvietnam: {
      title: "SRX Vietnam Website",
      description:
        "A complete online cosmetics retail platform that optimises the B2C shopping experience while giving the operations team a capable admin toolset. The system centres on a smooth blend of online store, in-depth beauty blog, and affiliate network, creating multi-channel revenue growth.",
      overview: [
        "On the front end, the UI/UX is tailored to the beauty category, foregrounding product imagery, ingredients, and real reviews, with browsing and checkout streamlined as far as possible. The blog is structured for SEO and acts as a funnel that attracts prospects through skincare guides.",
        "The technical centrepiece is the affiliate marketing system, planned and shipped end to end. The database is optimised to manage a large volume of discount codes, partner ad banners, and collaborator accounts. Account tiering and bulk status updates let the system calculate commission automatically, transparently, and accurately.",
        "On the admin side, a dedicated CRM is integrated deep into the platform. The team can track stock, manage order status, and analyse sales performance per affiliate campaign in real time, so operational decisions rest on accurate data."
      ],
      client: "SRX Vietnam",
      metrics: [
        { label: "New affiliates activated", value: "> 500" },
        { label: "Affiliate revenue growth", value: "+45%" },
        { label: "Cart abandonment rate", value: "-15%" }
      ]
    },
    topmus: {
      title: "Topmus Website",
      description:
        "The project solves high-volume application handling by building a robust middleware layer. We focused on fully automating the data flow from the moment a candidate submits the form on the website until the information appears in the internal CRM, keeping the path seamless, secure, and able to carry complex file attachments.",
      overview: [
        "The main challenge was application forms that must transfer multimedia data accurately. To solve it, we developed and integrated the TOPMUS Middleware V2 solution as a dedicated WordPress plugin.",
        "The system uses Fluent Forms to collect information on the front end. The core technical work is capturing and processing webhook streams, including restructuring payloads as multipart/form-data so CV files upload smoothly to the third-party server.",
        "Once through the middleware layer, all data syncs automatically to the external CRM in real time. This removes manual data entry entirely, streamlines the HR team's workflow, and ensures no promising application is ever lost."
      ],
      client: "TOPMUS Entertainment",
      metrics: [
        { label: "Data flow automation", value: "100%" },
        { label: "CV file sync speed", value: "< 2 seconds" },
        { label: "Processing time saved", value: "+40 hrs/month" }
      ]
    },
    "eac-group": {
      title: "EAC Group Automation & CRM Dashboard",
      description:
        "An automation system and CRM dashboard for EAC Group that brings business, marketing, and operations data together in one place. The dataset-driven solution helps the management team track performance, control the pipeline, and make decisions on real-time data.",
      overview: [
        "The main goal was to standardise and centralise data from several sources — website, marketing, sales — into a single CRM dashboard that leadership can monitor and manage easily.",
        "The dataset layer stores and syncs customer records, leads, sales activity, and marketing performance. Data updates automatically and is presented visually on the dashboard.",
        "The automation layer cuts manual work by handling data updates, reporting, and daily, weekly, and monthly performance tracking on its own."
      ],
      client: "EAC Group",
      metrics: [
        { label: "Report compilation time", value: "-40%" },
        { label: "Data accuracy", value: "+30%" },
        { label: "Data processing efficiency", value: "+25%" }
      ]
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
