import React from "react";
import { ArrowUp, Facebook, Github, Linkedin, Mail, Send } from "lucide-react";
import ZaloIcon from "./icons/ZaloIcon";
import { profileData } from "../data/profile";
import { useLanguage } from "../i18n";
import { pageContainer } from "./layout";

const socialLinks = [
  { label: "GitHub", href: profileData.contact.github, icon: Github },
  { label: "LinkedIn", href: profileData.contact.linkedin, icon: Linkedin },
  { label: "Facebook", href: profileData.contact.facebook, icon: Facebook },
  { label: "Zalo", href: profileData.contact.zalo, icon: ZaloIcon },
  { label: "Telegram", href: profileData.contact.telegram, icon: Send },
  { label: "Email", href: `mailto:${profileData.contact.email}`, icon: Mail }
];

const languages = ["vi", "en"] as const;

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();
  const footerLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.contact"), href: "#contact" }
  ];
  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-neutral-950">
      <div className={pageContainer}>
        {/* Brand + socials */}
        <div className="flex flex-col gap-8 pb-10 pt-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#hero" className="inline-flex items-center gap-3" aria-label="HungDuong">
              <img src="/logo-MH.webp" alt="" className="h-8 w-8 object-contain brightness-0 invert" />
              <span className="flex flex-col leading-none">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Portfolio
                </span>
                <span className="mt-1 font-sans text-sm font-extrabold uppercase tracking-wide text-white">
                  {profileData.name}
                </span>
              </span>
            </a>

            <p className="mt-5 font-sans text-sm leading-6 text-neutral-400">
              {t("footer.description")}
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3 md:max-w-md md:justify-end">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 font-sans text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <nav aria-label={t("footer.nav")} className="border-t border-white/[0.06] py-8">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-10">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse items-start gap-4 border-t border-white/[0.06] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-neutral-500">
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <div
              role="group"
              aria-label="Language"
              className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-0.5"
            >
              {languages.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  aria-pressed={language === code}
                  className={`h-7 rounded-full px-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                    language === code ? "bg-white text-black" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleScrollToTop}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 transition-colors duration-200 hover:border-white/20 hover:text-white"
              title={t("footer.top")}
              aria-label={t("footer.top")}
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Oversized wordmark — SVG textLength keeps it exactly container-wide at every screen size */}
      <div aria-hidden="true" className={`${pageContainer} select-none pb-10 pt-16 sm:pt-24`}>
        <svg viewBox="0 0 1000 132" className="block w-full overflow-visible">
          <defs>
            <linearGradient id="footer-wordmark-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="124"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#footer-wordmark-fade)"
            fontFamily="Manrope, ui-sans-serif, system-ui, sans-serif"
            fontWeight="800"
            fontSize="160"
          >
            HUNGDUONG
          </text>
        </svg>
      </div>
    </footer>
  );
}
