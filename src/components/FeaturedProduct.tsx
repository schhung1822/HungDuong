import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Github, ExternalLink, Zap, Server, Shield, Eye } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ScrollReveal from "./reactbits/ScrollReveal";
import SpotlightCard from "./reactbits/SpotlightCard";
import ShinyText from "./reactbits/ShinyText";
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
    <section id="featured" className="py-20 bg-slate-950 px-6 scroll-mt-20 relative">
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
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-800 bg-slate-950/80 text-slate-400 transition-all duration-200 hover:border-cyan-400/40 hover:text-cyan-300"
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
                    className={`h-2.5 rounded-full transition-all duration-200 ${
                      activeIndex === index
                        ? "w-8 bg-cyan-400"
                        : "w-2.5 bg-slate-800 hover:bg-slate-600"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={showNextProduct}
                aria-label="Sản phẩm tiếp theo"
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-800 bg-slate-950/80 text-slate-400 transition-all duration-200 hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
          <SpotlightCard 
            className="py-8 px-6 md:p-12 bg-slate-900/[0.15] border-purple-500/10 hover:border-purple-500/20 backdrop-blur-xl"
            spotlightColor="rgba(139, 92, 246, 0.15)"
            borderColor="rgba(139, 92, 246, 0.3)"
          >
            <div key={product.title} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-[fadeIn_240ms_ease-out]">
              {/* Product metadata specs - Left side */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest bg-purple-500/15 text-purple-400 border border-purple-500/20">
                    <Star className="w-3.5 h-3.5 fill-purple-400" /> FLAGSHIP PRODUCT
                  </span>
                  <span className="text-slate-500 font-mono text-xs">
                    // nextgency.v{String(activeIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-sans font-bold text-slate-100 tracking-tight">
                    {product.title}
                  </h3>
                  <p className="text-base sm:text-lg text-cyan-400 font-sans font-medium">
                    {product.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
                  {product.description}
                </p>

                {/* Analytical bullets of core impact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-900">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-sans font-semibold text-sm">
                      <Shield className="w-4 h-4 text-cyan-400" /> {t("featured.problem")}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {product.problemSolved}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-purple-400 font-sans font-semibold text-sm">
                      <Zap className="w-4 h-4 text-purple-400" /> {t("featured.impact")}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {product.impact}
                    </p>
                  </div>
                </div>

                {/* Technologies used with badges */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {product.tech.map((t) => (
                    <span 
                      key={t}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-slate-900 text-slate-400 font-mono text-[10px] sm:text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions button strip */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href={product.demoUrl}
                    target={product.demoUrl.startsWith("http") ? "_blank" : undefined}
                    rel={product.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-sans font-bold text-sm px-6 py-3 rounded-full transition-all duration-200"
                  >
                    {t("featured.demo")}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 border border-slate-800 bg-slate-950 text-slate-400 hover:text-white font-sans text-sm px-5 py-3 rounded-full transition-all duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    {t("featured.detail")}
                  </a>
                </div>
              </div>

              {/* Live telemetry interactive mockup specs - Right side */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="w-full bg-slate-950 p-6 rounded-2xl border border-slate-900 space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-900/80">
                    <div className="flex items-center gap-2 text-slate-300 font-mono text-[10px] tracking-wider uppercase font-semibold">
                      <Server className="w-4 h-4 text-cyan-400" /> server telemetry
                    </div>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-950/25 px-2 py-0.5 rounded border border-emerald-500/20 animate-pulse">
                      ● ONLINE
                    </span>
                  </div>

                  {/* Latency counter visual widget */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/25 p-4 rounded-xl border border-slate-900 text-left">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">
                        {language === "vi" ? "TỐC ĐỘ TẢI TRANG" : "PAGE LOAD SPEED"}
                      </div>
                      <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                        <ShinyText text="0.58s" className="font-bold text-2xl" />
                      </div>
                      <div className="text-[9px] font-mono text-emerald-400 mt-1">
                        {language === "vi" ? "✔ Nhanh hơn 94%" : "✔ 94% faster"}
                      </div>
                    </div>
                    <div className="bg-slate-900/25 p-4 rounded-xl border border-slate-900 text-left">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">
                        {language === "vi" ? "TỐC ĐỘ BIÊN SOẠN" : "EDITOR SPEED"}
                      </div>
                      <div className="text-2xl font-bold font-mono text-purple-400 mt-1">+140%</div>
                      <div className="text-[9px] font-mono text-emerald-400 mt-1">
                        {language === "vi" ? "✔ Tăng tốc bởi AI" : "✔ AI accelerated"}
                      </div>
                    </div>
                  </div>

                  {/* Core metric lists */}
                  <div className="space-y-3.5 text-xs font-mono text-slate-400">
                    <div className="flex justify-between">
                      <span>Server Engine</span>
                      <span className="text-slate-200">Express / Bun v1.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Database Gateway</span>
                      <span className="text-slate-200">Postgres Pools (Pooled)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SSL Grade</span>
                      <span className="text-emerald-400">A+ Dynamic Cert</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === "vi" ? "Vận hành chuẩn SEO" : "SEO Operation"}</span>
                      <span className="text-emerald-400">{language === "vi" ? "Tối ưu 100/100" : "Optimized 100/100"}</span>
                    </div>
                  </div>

                  {/* Interactive speed slider mockup */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-500">Node API Request Overhead</span>
                      <span className="text-cyan-400 font-bold">12ms</span>
                    </div>
                    <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 w-[15%]" />
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
