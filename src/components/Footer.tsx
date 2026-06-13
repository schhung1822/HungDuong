import React from "react";
import { ArrowUp, ArrowUpRight, Facebook, Github, Linkedin, Mail, Send } from "lucide-react";
import { profileData } from "../data/profile";
import { useLanguage } from "../i18n";

const socialLinks = [
  { label: "GitHub", href: profileData.contact.github, icon: Github },
  { label: "Zalo", href: profileData.contact.linkedin, icon: Linkedin },
  { label: "Facebook", href: profileData.contact.facebook, icon: Facebook },
  { label: "Telegram", href: profileData.contact.telegram, icon: Send }
];

export default function Footer() {
  const { t } = useLanguage();
  const footerLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.featured"), href: "#featured" },
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
    <footer className="relative overflow-hidden border-t border-slate-900/70 bg-slate-950 px-6 py-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/45 to-transparent" />
      <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 py-6 backdrop-blur-xl md:grid-cols-12 md:py-8">
          <div className="md:col-span-5">
            <a href="#hero" className="inline-flex items-center gap-3 group">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-950/25 font-mono text-sm font-bold text-cyan-300 shadow-lg shadow-cyan-950/20 transition-transform duration-200 group-hover:scale-105">
                {"</>"}
              </span>
              <span>
                <span className="block font-sans text-lg font-bold text-slate-100">
                  {profileData.name}
                </span>
              </span>
            </a>

            <p className="mt-5 max-w-xl font-sans text-sm leading-7 text-slate-400">
              {t("footer.description")}
            </p>

            <a
              href="#contact"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400 px-5 font-sans text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/15 transition-all duration-200 hover:bg-cyan-300"
            >
              {t("footer.cta")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <nav className="md:col-span-3">
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 text-center sm:text-left">
              {t("footer.nav")}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:max-w-sm md:grid-cols-1">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-2 font-sans text-sm text-slate-400 transition-all duration-200 hover:border-slate-800 hover:bg-slate-950/60 hover:text-cyan-300"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </nav>

          <div className="md:col-span-4">
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 text-center sm:text-left">
              {t("footer.connect")}
            </p>

            <a
              href={`mailto:${profileData.contact.email}`}
              className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 transition-all duration-200 hover:border-cyan-400/30 hover:bg-slate-950"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-cyan-300">
                <Mail className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Email
                </span>
                <span className="block truncate font-sans text-sm font-semibold text-slate-200 ">
                  {profileData.contact.email}
                </span>
              </span>
            </a>

            <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/70 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/35 hover:text-cyan-300"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-900/80 pt-6 md:flex-row">
          <p className="font-sans text-xs text-slate-500">
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </p>

          <button
            onClick={handleScrollToTop}
            className="group inline-flex h-10 items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 transition-all duration-200 hover:border-cyan-400/35 hover:text-cyan-300"
            title="Scroll back to top"
            aria-label="Back to top"
          >
            {t("footer.top")}
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
