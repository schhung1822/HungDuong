import ScrollReveal from "./reactbits/ScrollReveal";

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionTitle({ number, title, subtitle, id }: SectionTitleProps) {
  return (
    <ScrollReveal origin="left" className="mb-12 md:mb-16">
      <div id={id} className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-cyan-400 text-sm tracking-widest font-semibold md:text-base">
            [{number}]
          </span>
          <div className="h-px bg-gradient-to-r from-slate-800 to-transparent flex-1" />
        </div>
        <div className="flex flex-col gap-1 md:flex-row md:items-end md:gap-4 md:justify-between">
          <h2 className="text-3xl font-sans tracking-tight font-bold text-slate-100 md:text-4xl bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
      </div>
    </ScrollReveal>
  );
}
