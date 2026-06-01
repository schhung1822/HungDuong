import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Github, Linkedin, Languages } from "lucide-react";
import { profileData } from "../data/profile";
import { useLanguage } from "../i18n";

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const menuItems = [
    { label: t("nav.about"), href: "#about", id: "about" },
    { label: t("nav.skills"), href: "#skills", id: "skills" },
    { label: t("nav.featured"), href: "#featured", id: "featured" },
    { label: t("nav.projects"), href: "#projects", id: "projects" },
    { label: t("nav.experience"), href: "#experience", id: "experience" },
    { label: t("nav.contact"), href: "#contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section highlights
      const scrollPosition = window.scrollY + 100;
      for (const item of menuItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: "smooth"
      });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <>
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md py-4 shadow-[0_12px_34px_rgba(2,6,23,0.34)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleSmoothScroll(e, "#hero")}
          className="flex items-center gap-2 group"
          aria-label="Dev Nextgency logo"
        >
          <div className="relative w-10 h-10 rounded-[8px] bg-[#081f24] flex items-center justify-center text-[#00e5ff] border border-[#064650] font-mono font-bold text-sm tracking-tighter shadow-md shadow-cyan-400/10 group-hover:scale-105 transition-transform duration-200">
            {"</>"}
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-slate-100 tracking-tight leading-none group-hover:text-cyan-400 transition-colors">
              HungDuong
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1 rounded-full border border-slate-800/50 backdrop-blur-sm">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 font-semibold shadow-inner border border-cyan-500/15"
                  : "text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Socials / CTA */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex h-10 items-center gap-2 px-2 font-mono text-xm font-bold uppercase tracking-widest text-slate-300 transition-colors hover:border-cyan-400/40 hover:cursor-pointer hover:text-cyan-300"
            aria-label="Change language"
          >
            {language === "vi" ? "EN" : "VI"}
          </button>
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="group relative isolate flex h-12 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#6f43b6] via-[#b778ff] to-[#8f64df] pl-6 pr-1.5 text-sm font-bold text-white shadow-[0_10px_26px_rgba(137,92,246,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(167,139,250,0.34)]"
          >
            <span className="cta-shine absolute inset-y-0 -left-16 z-0 w-14 skew-x-[-18deg] bg-white/55 blur-md" />
            <span className="relative z-10 whitespace-nowrap">{t("header.contact")}</span>
            <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#09090b] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),0_5px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105">
              <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-400 hover:text-slate-200 p-1.5 rounded-lg border border-slate-800 bg-slate-900/50"
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

    </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[70] bg-slate-950/98 backdrop-blur-xl md:hidden">
          <div className="flex h-full flex-col justify-between overflow-y-auto px-6 py-7">
            <div className="flex items-center justify-between border-b border-slate-900 pb-5">
              <a
                href="#hero"
                onClick={(e) => handleSmoothScroll(e, "#hero")}
                className="flex items-center gap-3"
                aria-label="Dev Nextgency logo"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-950/25 font-mono text-sm font-bold text-cyan-300 shadow-lg shadow-cyan-950/20">
                  {"</>"}
                </div>
                <span className="font-sans text-base font-bold text-slate-100">
                  HungDuong
                </span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-xl border border-slate-700 bg-slate-900/70 text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

          <nav className="mt-8 flex flex-col gap-2">
            {menuItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`group flex items-center justify-between rounded-2xl border px-4 py-4 text-lg font-semibold tracking-tight transition-all duration-200 ${
                  activeSection === item.id
                    ? "border-cyan-500/20 bg-cyan-950/25 text-cyan-300"
                    : "border-slate-900 bg-slate-900/30 text-slate-200 hover:border-slate-800 hover:bg-slate-900/60"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span>{item.label}</span>
                <span className={activeSection === item.id ? "font-mono text-xs text-cyan-400" : "font-mono text-xs text-slate-600"}>
                  {`0${index + 1}`}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-6 border-t border-slate-900 pt-6">
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                aria-label="Change language"
              >
                <Languages className="h-4 w-4" />
                {language === "vi" ? "English" : "Tiếng Việt"}
              </button>
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <Github className="w-5 h-5" /> GitHub
              </a>
              <div className="w-px h-4 bg-slate-800" />
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors text-sm"
              >
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-4 text-center font-sans text-sm font-bold text-slate-950 shadow-lg shadow-cyan-950/20 transition-all"
            >
              {t("header.directContact")}
            </a>
          </div>
          </div>
        </div>
      )}
    </>
  );
}
