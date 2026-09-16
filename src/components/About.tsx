import { Brain, Code2, Laptop, Server, Workflow } from "lucide-react";
import ScrollReveal from "./reactbits/ScrollReveal";
import ProfileCard from "./reactbits/ProfileCard";
import { profileData } from "../data/profile";
import { skillsData } from "../data/skills";
import { useLanguage } from "../i18n";
import { pageContainer } from "./layout";

const categoryIcons = [Laptop, Workflow, Server, Brain];

export default function About() {
  const { language, profile, t } = useLanguage();
  const copy =
    language === "vi"
      ? {
          eyebrow: "GIỚI THIỆU / NĂNG LỰC",
          heading: "Tôi là Dương Mạnh Hùng, Web Developer tạo ra những sản phẩm web sẵn sàng vận hành thực tế",
          continuation:
            "với hơn 2 năm kinh nghiệm qua website doanh nghiệp, thương mại điện tử, mini app, CMS tùy chỉnh và workflow automation.",
          summary:
            "Tôi làm việc xuyên suốt từ giao diện, cấu trúc website đến tích hợp dữ liệu và triển khai. Mục tiêu của tôi là tạo ra trải nghiệm rõ ràng, hệ thống ổn định và giải pháp dễ duy trì trong quá trình vận hành.",
          skillsEyebrow: "CHUYÊN MÔN / SKILL SET",
          skillsTitle: "Năng lực kỹ thuật & quy trình",
          skillsDescription:
            "Các công nghệ và kỹ năng tôi sử dụng để đưa một yêu cầu kinh doanh thành sản phẩm hoàn chỉnh.",
          categories: [
            "Phát triển Website",
            "Automation & Workflow",
            "Công cụ & Triển khai",
            "Agency & Tư duy sản phẩm"
          ]
        }
      : {
          eyebrow: "ABOUT / EXPERTISE",
          heading: "I’m Duong Manh Hung, a Web Developer building production-ready digital products",
          continuation:
            "with 2+ years of experience across business websites, e-commerce, mini apps, custom CMS platforms, and workflow automation.",
          summary:
            "I work across interface development, website architecture, data integration, and deployment. My focus is clear experiences, dependable systems, and maintainable solutions that hold up in real operations.",
          skillsEyebrow: "EXPERTISE / SKILL SET",
          skillsTitle: "Technical skills & workflow",
          skillsDescription:
            "The technologies and practical capabilities I use to turn business requirements into complete products.",
          categories: skillsData.map((category) => category.title)
        };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({ top: contactSection.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="selection-on-light scroll-mt-20 bg-[#f0eee8] py-20 text-neutral-950 sm:py-28 lg:py-32"
    >
      <div className={pageContainer}>
        <ScrollReveal origin="left">
          <div className="mb-12 flex items-center gap-4 border-b border-black/10 pb-4 sm:mb-16">
            <span className="font-mono text-[10px] font-semibold tracking-[0.28em] text-neutral-500 sm:text-xs">
              01 / {copy.eyebrow}
            </span>
            <span className="h-px flex-1 bg-black/10" />
          </div>
        </ScrollReveal>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <ScrollReveal origin="left" className="lg:col-span-8">
            <h2 className="max-w-5xl text-pretty font-sans text-[clamp(2.8rem,4.4vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-black">
              {copy.heading}
              <span className="block text-[#c4c1bb]">{copy.continuation}</span>
            </h2>

            <div className="mt-12 grid max-w-4xl grid-cols-3 border-y border-black/10 py-6 sm:mt-16">
              <div>
                <strong className="block text-2xl font-bold tracking-tight sm:text-4xl">2+</strong>
                <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500 sm:text-[11px]">
                  {t("about.years")}
                </span>
              </div>
              <div className="border-l border-black/10 pl-5 sm:pl-8">
                <strong className="block text-2xl font-bold tracking-tight sm:text-4xl">40+</strong>
                <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500 sm:text-[11px]">
                  {t("about.projects")}
                </span>
              </div>
              <div className="border-l border-black/10 pl-5 sm:pl-8">
                <strong className="block text-2xl font-bold tracking-tight sm:text-4xl">96%</strong>
                <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500 sm:text-[11px]">
                  {t("about.satisfaction")}
                </span>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-9 lg:col-span-4">
            <ScrollReveal origin="right">
              <p className="text-pretty text-lg leading-8 text-neutral-600 sm:text-xl sm:leading-9">
                {copy.summary}
              </p>
              <p className="mt-5 text-sm leading-7 text-neutral-500 sm:text-base">
                {profile.detailedAbout}
              </p>
            </ScrollReveal>

            <ScrollReveal origin="right" delay={150} className="flex justify-center lg:justify-start">
              <ProfileCard
                name={profileData.fullName}
                title={profile.role}
                avatarUrl="/avatar.webp"
                iconUrl="/iconpattern.webp"
                enableTilt={true}
                behindGlowEnabled={true}
                behindGlowColor="rgba(23, 23, 23, 0.16)"
                innerGradient="linear-gradient(145deg,rgba(64,64,64,0.62) 0%,rgba(23,23,23,0.44) 55%,rgba(115,115,115,0.28) 100%)"
                className="selection-on-dark w-full max-w-[360px]"
                onContactClick={scrollToContact}
              />
            </ScrollReveal>
          </div>
        </div>

        <div id="skills" className="scroll-mt-24 pt-24 sm:pt-32">
          <ScrollReveal origin="left">
            <div className="grid gap-6 border-t border-black/10 pt-5 md:grid-cols-2 md:items-end">
              <div>
                <p className="font-mono text-[10px] font-semibold tracking-[0.28em] text-neutral-500 sm:text-xs">
                  {copy.skillsEyebrow}
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-black sm:text-5xl">
                  {copy.skillsTitle}
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-7 text-neutral-500 md:justify-self-end sm:text-base text-left sm:text-right">
                {copy.skillsDescription}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {skillsData.map((category, categoryIndex) => {
              const CategoryIcon = categoryIcons[categoryIndex] ?? Code2;

              return (
                <ScrollReveal
                  key={category.title}
                  origin="bottom"
                  delay={categoryIndex * 90}
                  className="h-full"
                >
                  <article className="h-full overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/55 p-5 sm:p-6">
                    <div className="flex items-center gap-3 min-h-[56px]">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-black/10 bg-white/70">
                        <CategoryIcon className="h-5 w-5 text-neutral-700" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-lg font-semibold leading-tight tracking-[-0.035em] text-black sm:text-xl">
                          {copy.categories[categoryIndex]}
                        </h4>
                      </div>
                    </div>

                    <ul className="mt-5 divide-y divide-black/[0.07] border-t border-black/[0.07]">
                      {category.items.map((skill) => (
                        <li key={skill.name} className="group py-3">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="flex items-start gap-2 leading-5 text-neutral-700">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400 transition-colors group-hover:bg-black" />
                              {skill.name}
                            </span>
                            <span className="shrink-0 font-mono text-[9px] text-neutral-400">{skill.level}%</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
