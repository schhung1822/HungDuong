import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Github, Linkedin } from "lucide-react";
import DotGridIcon from "./icons/DotGridIcon";
import DotMenuIcon from "./icons/DotMenuIcon";
import { pill, surface } from "./surface";
import { pageContainer } from "./layout";
import { profileData } from "../data/profile";
import { useLanguage } from "../i18n";

export default function Header() {
  const { language, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false, animate: false });
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const menuItems = [
    { label: t("nav.about"), href: "#about", id: "about" },
    { label: t("nav.services"), href: "#services", id: "services" },
    { label: t("nav.projects"), href: "#projects", id: "projects" },
    { label: t("nav.experience"), href: "#experience", id: "experience" },
    { label: t("nav.contact"), href: "#contact", id: "contact" }
  ];

  // The pill follows the hovered item and rests on the current section otherwise
  const indicatorTarget = hoveredId ?? (menuItems.some((item) => item.id === activeSection) ? activeSection : null);

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

  useLayoutEffect(() => {
    const update = () => {
      const el = indicatorTarget ? linkRefs.current[indicatorTarget] : null;
      setIndicator((prev) =>
        el
          ? // Only slide when the pill was already visible, so it never sweeps in from the left edge
            { left: el.offsetLeft, width: el.offsetWidth, visible: true, animate: prev.visible }
          : { ...prev, visible: false, animate: true }
      );
    };

    update();
    // Label widths change once the web font finishes loading
    document.fonts?.ready.then(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [indicatorTarget, language]);

  // Close the menu panel on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
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
    <header
      id="main-header"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-linear-to-b from-neutral-950/90 to-transparent py-3" : "py-3 sm:py-5"
      }`}
    >
      <div ref={menuRef} className={`relative ${pageContainer}`}>
        {/* Mobile bar: menu toggle · logo · contact */}
        <div className={`flex h-14 items-center justify-between rounded-2xl px-1.5 lg:hidden ${surface}`}>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="header-menu-panel"
            id="mobile-menu-toggle"
            className="grid h-11 w-11 place-items-center rounded-xl text-white transition-colors duration-200 hover:bg-white/[0.06]"
          >
            <DotMenuIcon open={menuOpen} className="block h-5 w-5" />
          </button>

          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, "#hero")}
            className="grid h-11 w-11 place-items-center"
            aria-label="HungDuong - về đầu trang"
          >
            <img src="/logo-MH.webp" alt="HungDuong" className="h-7 w-7 object-contain brightness-0 invert" />
          </a>

          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="grid h-11 w-11 place-items-center rounded-xl text-white transition-colors duration-200 hover:bg-white/[0.06]"
            aria-label={t("header.contact")}
            title={t("header.contact")}
          >
            <DotGridIcon className="block h-5 w-5" />
          </a>
        </div>

        {/* Desktop: logo tile · nav bar · contact tile */}
        <div className="hidden items-center justify-between gap-4 lg:flex">
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, "#hero")}
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-colors duration-200 hover:border-white/20 ${surface}`}
            aria-label="HungDuong - về đầu trang"
          >
            <img src="/logo-MH.webp" alt="HungDuong" className="h-6 w-6 object-contain brightness-0 invert" />
          </a>

          <nav
            className={`relative flex h-[52px] items-center rounded-2xl px-1.5 ${surface}`}
            onMouseLeave={() => setHoveredId(null)}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute left-0 top-1.5 bottom-1.5 rounded-xl ease-out ${pill} ${
                indicator.animate ? "transition-[transform,width,opacity] duration-300" : "transition-opacity duration-200"
              }`}
              style={{
                width: indicator.width,
                transform: `translateX(${indicator.left}px)`,
                opacity: indicator.visible ? 1 : 0
              }}
            />
            {menuItems.map((item) => (
              <a
                key={item.href}
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                onMouseEnter={() => setHoveredId(item.id)}
                onFocus={() => setHoveredId(item.id)}
                onBlur={() => setHoveredId(null)}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`relative z-10 flex h-10 items-center rounded-xl px-5 font-sans text-sm font-semibold whitespace-nowrap outline-none transition-colors duration-200 xl:px-8 2xl:px-10 ${
                  indicatorTarget === item.id ? "text-white" : "text-neutral-400"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white transition-colors duration-200 hover:border-white/20 ${surface}`}
            aria-label={t("header.contact")}
            title={t("header.contact")}
          >
            <DotGridIcon className="block h-5 w-5" />
          </a>
        </div>

        {/* Mobile menu panel, full bar width */}
        {menuOpen && (
          <div
            id="header-menu-panel"
            className="absolute inset-x-4 top-full mt-2 rounded-2xl border border-white/10 bg-neutral-950/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl animate-[fadeIn_160ms_ease-out] sm:inset-x-8 lg:hidden"
          >
            <nav className="flex flex-col">
              {menuItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 font-sans text-sm font-semibold transition-colors duration-200 ${
                    activeSection === item.id
                      ? "bg-white/[0.06] text-white"
                      : "text-neutral-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] text-neutral-600">{`0${index + 1}`}</span>
                </a>
              ))}
            </nav>

            <div className="mx-2 my-2 h-px bg-white/10" />

            <div className="grid grid-cols-2 gap-2 px-2 pb-2 pt-1">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 font-sans text-xs font-semibold text-neutral-400 transition-colors duration-200 hover:border-white/20 hover:text-white"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 font-sans text-xs font-semibold text-neutral-400 transition-colors duration-200 hover:border-white/20 hover:text-white"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
