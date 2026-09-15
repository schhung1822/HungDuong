import { Languages } from "lucide-react";
import { useLanguage } from "../i18n";
import { pill, surface } from "./surface";

const options = [
  { code: "vi", label: "VI", name: "Tiếng Việt" },
  { code: "en", label: "EN", name: "English" }
] as const;

// Floating language toggle pinned to the bottom-left corner of the viewport
export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label={language === "vi" ? "Chọn ngôn ngữ" : "Choose language"}
      className={`fixed bottom-4 left-4 z-40 flex items-center gap-1 rounded-full p-1 sm:bottom-6 sm:left-8 ${surface}`}
    >
      <Languages className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />

      <div className="relative flex">
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-10 rounded-full transition-transform duration-300 ease-out ${pill} ${
            language === "en" ? "translate-x-10" : "translate-x-0"
          }`}
        />
        {options.map((option) => (
          <button
            key={option.code}
            type="button"
            lang={option.code}
            title={option.name}
            onClick={() => setLanguage(option.code)}
            aria-pressed={language === option.code}
            className={`relative z-10 h-8 w-10 rounded-full font-mono text-[11px] font-bold tracking-wider transition-colors duration-200 ${
              language === option.code ? "text-white" : "text-neutral-500 hover:text-neutral-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
