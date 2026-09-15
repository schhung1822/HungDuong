import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, ExternalLink, Zap, Server, Shield, Eye } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ScrollReveal from "./reactbits/ScrollReveal";
import SpotlightCard from "./reactbits/SpotlightCard";
import { profileData } from "../data/profile";
import { useLanguage } from "../i18n";

export default function FeaturedProduct() {
  const { language, t } = useLanguage();
  const sourceProducts = profileData.featuredAssets?.length ? profileData.featuredAssets : [profileData.featuredAsset];
  const englishFeaturedProducts = [
    {
      ...sourceProducts[0],
      title: "SRX Website & CRM",
      subtitle: "E-commerce website & customer management system",
      description:
        "An e-commerce website combined with an internal CRM, supporting product display, customer information, contact data processing, and optimized shopping experiences across devices.",
      problemSolved:
        "Solves the need for a professional sales platform that is easy to manage and supports operations teams in tracking customers, products, orders, and business data in one place.",
      impact:
        "Helps the business operate with a modern, scalable website while improving customer management, user experience, and brand credibility."
    },
    {
      ...sourceProducts[1],
      title: "Mini App Beauty Summit",
      subtitle: "Event mini app for Beauty Summit",
      description:
        "A mini app built to support Beauty Summit attendees with event interactions, quick information access, user data handling, and operational support during the program.",
      problemSolved:
        "Digitizes part of the event operation flow so attendees can interact and retrieve information easily while organizers collect and manage data more efficiently.",
      impact:
        "Improves attendee experience, reduces operational workload, and centralizes event data processing throughout Beauty Summit."
    }
  ];
  const products = language === "en" ? englishFeaturedProducts : sourceProducts;
  const [activeIndex, setActiveIndex] = useState(0);
  const product = products[activeIndex];
  const hasMultipleProducts = products.length > 1;

  const showPreviousProduct = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + products.length) % products.length);
  };

  const showNextProduct = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % products.length);
  };

  return (
    <section id="featured" className="py-20 bg-neutral-950 px-6 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          number="03"
          title={t("featured.title")}
          subtitle="masterpiece_flagship"
        />

        <ScrollReveal origin="bottom">
          {hasMultipleProducts && (
            <div className="mb-5 flex items-center justify-center sm:justify-end gap-3">
              <button
                type="button"
                onClick={showPreviousProduct}
                aria-label="Sản phẩm trước"
                className="grid h-10 w-10 place-items-center rounded-full border border-neutral-800 text-neutral-400 transition-colors duration-200 hover:border-neutral-500 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                {products.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Xem ${item.title}`}
                    aria-current={activeIndex === index}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      activeIndex === index
                        ? "w-8 bg-white"
                        : "w-2 bg-neutral-700 hover:bg-neutral-500"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={showNextProduct}
                aria-label="Sản phẩm tiếp theo"
                className="grid h-10 w-10 place-items-center rounded-full border border-neutral-800 text-neutral-400 transition-colors duration-200 hover:border-neutral-500 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
          <SpotlightCard className="py-8 px-6 md:p-12">
            <div key={product.title} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-[fadeIn_240ms_ease-out]">
              {/* Product metadata specs - Left side */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest bg-white text-black">
                    <Star className="w-3 h-3 fill-black" /> FLAGSHIP PRODUCT
                  </span>
                  <span className="text-neutral-600 font-mono text-xs">
                    // nextgency.v{String(activeIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
                    {product.title}
                  </h3>
                  <p className="text-base sm:text-lg text-neutral-400 font-sans font-medium">
                    {product.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
                  {product.description}
                </p>

                {/* Analytical bullets of core impact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-neutral-800/70">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-neutral-100 font-sans font-semibold text-sm">
                      <Shield className="w-4 h-4 text-neutral-400" /> {t("featured.problem")}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {product.problemSolved}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-neutral-100 font-sans font-semibold text-sm">
                      <Zap className="w-4 h-4 text-neutral-400" /> {t("featured.impact")}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {product.impact}
                    </p>
                  </div>
                </div>

                {/* Technologies used with badges */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {product.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded border border-neutral-800 text-neutral-400 font-mono text-[10px] sm:text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions button strip */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <a
                    href={product.demoUrl}
                    target={product.demoUrl.startsWith("http") ? "_blank" : undefined}
                    rel={product.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-1.5 bg-white hover:bg-neutral-200 text-black font-sans font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-200"
                  >
                    {t("featured.demo")}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 border border-neutral-800 hover:border-neutral-500 text-neutral-300 hover:text-white font-sans text-sm px-5 py-3 rounded-full transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    {t("featured.detail")}
                  </a>
                </div>
              </div>

              {/* Live telemetry interactive mockup specs - Right side */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="w-full bg-neutral-950 p-6 rounded-2xl border border-neutral-800/70 space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-neutral-800/70">
                    <div className="flex items-center gap-2 text-neutral-300 font-mono text-[10px] tracking-wider uppercase font-semibold">
                      <Server className="w-4 h-4 text-neutral-500" /> server telemetry
                    </div>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-300 px-2 py-0.5 rounded border border-neutral-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> ONLINE
                    </span>
                  </div>

                  {/* Latency counter visual widget */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-800/70 text-left">
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">
                        {language === "vi" ? "TỐC ĐỘ TẢI TRANG" : "PAGE LOAD SPEED"}
                      </div>
                      <div className="text-2xl font-bold font-mono text-white mt-1">0.58s</div>
                      <div className="text-[9px] font-mono text-neutral-400 mt-1">
                        {language === "vi" ? "✔ Nhanh hơn 94%" : "✔ 94% faster"}
                      </div>
                    </div>
                    <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-800/70 text-left">
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">
                        {language === "vi" ? "TỐC ĐỘ BIÊN SOẠN" : "EDITOR SPEED"}
                      </div>
                      <div className="text-2xl font-bold font-mono text-white mt-1">+140%</div>
                      <div className="text-[9px] font-mono text-neutral-400 mt-1">
                        {language === "vi" ? "✔ Tăng tốc bởi AI" : "✔ AI accelerated"}
                      </div>
                    </div>
                  </div>

                  {/* Core metric lists */}
                  <div className="space-y-3.5 text-xs font-mono text-neutral-500">
                    <div className="flex justify-between">
                      <span>Server Engine</span>
                      <span className="text-neutral-200">Express / Bun v1.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Database Gateway</span>
                      <span className="text-neutral-200">Postgres Pools (Pooled)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SSL Grade</span>
                      <span className="text-neutral-200">A+ Dynamic Cert</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === "vi" ? "Vận hành chuẩn SEO" : "SEO Operation"}</span>
                      <span className="text-neutral-200">{language === "vi" ? "Tối ưu 100/100" : "Optimized 100/100"}</span>
                    </div>
                  </div>

                  {/* Interactive speed slider mockup */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-neutral-500">Node API Request Overhead</span>
                      <span className="text-white font-bold">12ms</span>
                    </div>
                    <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[15%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
