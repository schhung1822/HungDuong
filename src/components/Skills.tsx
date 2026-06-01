import { useState } from "react";
import { Laptop, Database, Wrench, Brain, Code2 } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ScrollReveal from "./reactbits/ScrollReveal";
import SpotlightCard from "./reactbits/SpotlightCard";
import { skillsData } from "../data/skills";
import { useLanguage } from "../i18n";

export default function Skills() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // Map category icons
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Laptop className="w-5 h-5 text-cyan-400" />;
      case 1:
        return <Database className="w-5 h-5 text-purple-400" />;
      case 2:
        return <Wrench className="w-5 h-5 text-emerald-400" />;
      case 3:
      default:
        return <Brain className="w-5 h-5 text-pink-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-950 px-6 border-t border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          number="02" 
          title={t("skills.title")}
          subtitle="technical_weapons" 
        />

        {/* Categories selector triggers (Filters for fun/interaction) */}
        <ScrollReveal origin="bottom" className="flex flex-wrap items-center gap-3 mb-12 justify-start">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
              activeCategory === null
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/10"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {t("skills.all")}
          </button>
          
          {skillsData.map((cat, index) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(index)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider flex items-center gap-2 transition-all duration-200 ${
                activeCategory === index
                  ? "bg-purple-600 text-slate-50 font-bold shadow-md shadow-purple-600/10"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {getCategoryIcon(index)}
              {cat.title.split(" ").slice(1).join(" ")}
            </button>
          ))}
        </ScrollReveal>

        {/* Skills Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {skillsData
            .map((cat, index) => ({ ...cat, originalIndex: index }))
            .filter((cat) => activeCategory === null || activeCategory === cat.originalIndex)
            .map((category, catIdx) => (
              <ScrollReveal 
                key={category.title} 
                origin="bottom" 
                delay={catIdx * 100}
                className="w-full"
              >
                <SpotlightCard 
                  className="p-8 h-full bg-slate-900/[0.25] backdrop-blur-md"
                  spotlightColor="rgba(139, 92, 246, 0.08)"
                  borderColor="rgba(139, 92, 246, 0.15)"
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 border-b border-slate-900/80 pb-4">
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                        {getCategoryIcon(category.originalIndex)}
                      </div>
                      <h3 className="font-sans text-base sm:text-lg font-bold text-slate-200">
                        {category.title}
                      </h3>
                    </div>

                    {/* Skill items slider rows */}
                    <div className="space-y-5">
                      {category.items.map((skill) => (
                        <div key={skill.name} className="group space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-mono text-slate-300 group-hover:text-cyan-400 font-medium transition-colors flex items-center gap-1.5">
                              <Code2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400/80" />
                              {skill.name}
                            </span>
                            <span className="font-mono text-slate-500">{skill.level}%</span>
                          </div>
                          
                          {/* Visual progress bar bar design */}
                          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900/50">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 group-hover:from-cyan-400 group-hover:to-purple-500 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
        </div>
      </div>
    </section>
  );
}
