import {
  ArrowRight,
  Check,
  Code2,
  Database,
  Globe2,
  LayoutDashboard,
  ShoppingBag,
  Smartphone,
  Workflow,
  Zap
} from "lucide-react";
import ScrollReveal from "./reactbits/ScrollReveal";
import { useLanguage } from "../i18n";
import { pageContainer } from "./layout";

export default function Services() {
  const { language } = useLanguage();
  const copy =
    language === "vi"
      ? {
          eyebrow: "DỊCH VỤ",
          title: "Giải pháp số được xây dựng để vận hành thật",
          description:
            "Từ website giới thiệu đến hệ thống tự động hóa, tôi tập trung vào những sản phẩm rõ ràng, dễ sử dụng và tạo ra giá trị thực tế cho doanh nghiệp.",
          primary: {
            label: "Dành cho doanh nghiệp & thương hiệu",
            title: "Website & eCommerce",
            subtitle: "Nền tảng hiện đại, dễ quản trị và sẵn sàng tăng trưởng",
            description:
              "Thiết kế và phát triển website phù hợp mục tiêu kinh doanh, tối ưu trải nghiệm trên mọi thiết bị và thuận tiện cho đội ngũ vận hành nội dung.",
            action: "Trao đổi dự án",
            items: [
              ["Website doanh nghiệp", "Giao diện rõ ràng, chuẩn responsive"],
              ["WordPress tùy chỉnh", "Theme, plugin, ACF và WooCommerce"],
              ["React / Next.js", "Frontend nhanh và dễ mở rộng"],
              ["Hiệu năng & SEO", "Tối ưu tốc độ và nền tảng kỹ thuật"]
            ]
          },
          secondary: {
            label: "Dành cho sản phẩm & đội ngũ vận hành",
            title: "Web App & Automation",
            subtitle: "Kết nối giao diện, dữ liệu và quy trình trong một hệ thống",
            description:
              "Xây dựng mini app, công cụ nội bộ và workflow tự động giúp giảm thao tác thủ công, đồng bộ dữ liệu và cải thiện hiệu suất vận hành.",
            action: "Bắt đầu trao đổi",
            items: [
              ["Web & Mini App", "Trải nghiệm số theo nhu cầu thực tế"],
              ["UI Implementation", "Chuyển thiết kế thành giao diện hoàn chỉnh"],
              ["n8n Automation", "Workflow, webhook và tác vụ định kỳ"],
              ["API & Data Flow", "CRM, Google Sheets và hệ thống bên thứ ba"]
            ]
          },
          approachLabel: "CÁCH TÔI TẠO RA GIÁ TRỊ",
          approachStrong: "Tôi kết hợp tư duy sản phẩm, thiết kế rõ ràng và công nghệ phù hợp",
          approachMuted: "để tạo ra giải pháp thực tế, dễ vận hành và có thể mở rộng cùng doanh nghiệp."
        }
      : {
          eyebrow: "SERVICES",
          title: "Digital solutions built for real operations",
          description:
            "From business websites to automated systems, I focus on clear, usable products that create practical value for growing teams.",
          primary: {
            label: "For businesses & brands",
            title: "Website & eCommerce",
            subtitle: "Modern platforms that are manageable and ready to grow",
            description:
              "Designing and developing websites around business goals, with responsive experiences and content workflows that teams can manage confidently.",
            action: "Discuss a project",
            items: [
              ["Business websites", "Clear, responsive user experiences"],
              ["Custom WordPress", "Themes, plugins, ACF, and WooCommerce"],
              ["React / Next.js", "Fast, scalable frontend systems"],
              ["Performance & SEO", "Strong technical foundations"]
            ]
          },
          secondary: {
            label: "For products & operations teams",
            title: "Web App & Automation",
            subtitle: "Connecting interfaces, data, and workflows in one system",
            description:
              "Building mini apps, internal tools, and automated workflows that reduce manual work, synchronize data, and improve operational efficiency.",
            action: "Start a conversation",
            items: [
              ["Web & Mini Apps", "Practical digital product experiences"],
              ["UI Implementation", "Turning designs into complete interfaces"],
              ["n8n Automation", "Workflows, webhooks, and scheduled tasks"],
              ["API & Data Flow", "CRM, Google Sheets, and third-party systems"]
            ]
          },
          approachLabel: "HOW I CREATE VALUE",
          approachStrong: "I combine product thinking, clear design, and the right technology",
          approachMuted: "to create practical solutions that are easy to operate and ready to scale with the business."
        };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({ top: contactSection.offsetTop - 80, behavior: "smooth" });
    }
  };

  const renderServiceCard = (service: typeof copy.primary, index: number) => (
    <article className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-neutral-900/75 p-6 sm:p-8 lg:p-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500">
        0{index} / {service.label}
      </p>
      <h3 className="mt-6 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
        {service.title}
      </h3>
      <p className="mt-2 text-lg leading-7 text-neutral-400 sm:text-xl">{service.subtitle}</p>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-500">{service.description}</p>

      <button
        type="button"
        onClick={scrollToContact}
        className="group mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-bold text-black transition-colors hover:bg-neutral-200"
      >
        {service.action}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </button>

      <div className="mt-9 grid gap-x-7 gap-y-6 border-t border-white/10 pt-7 sm:grid-cols-2">
        {service.items.map(([title, description]) => (
          <div key={title} className="flex gap-3">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-black">
              <Check className="h-3 w-3" />
            </span>
            <div>
              <h4 className="text-sm font-semibold text-neutral-100">{title}</h4>
              <p className="mt-1 text-xs leading-5 text-neutral-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );

  return (
    <section id="services" className="scroll-mt-20 bg-neutral-950 py-20 text-white sm:py-28 lg:py-32">
      <div className={pageContainer}>
        <ScrollReveal origin="top" className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500 sm:text-xs">
            02 / {copy.eyebrow}
          </p>
          <h2 className="mt-5 text-balance text-[clamp(2.7rem,5vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white">
            {copy.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-7 text-neutral-500 sm:text-base">
            {copy.description}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2">
          <ScrollReveal origin="left" className="h-full">
            {renderServiceCard(copy.primary, 1)}
          </ScrollReveal>

          <ScrollReveal origin="right" delay={100} className="h-full">
            <div className="selection-on-light relative min-h-[430px] overflow-hidden rounded-[2rem] bg-[#c6b6ff] p-6 text-black sm:min-h-[520px] sm:p-10">
              <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/40 blur-3xl" />
              <div className="relative mx-auto mt-8 max-w-[32rem] rounded-[1.75rem] border border-black/10 bg-[#f7f5ef] p-4 shadow-2xl shadow-violet-950/20 sm:mt-12 sm:p-6">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/40">Production ready</span>
                </div>
                <div className="grid gap-4 pt-5 sm:grid-cols-[0.75fr_1.25fr]">
                  <div className="rounded-2xl bg-black p-5 text-white">
                    <Globe2 className="h-7 w-7" />
                    <p className="mt-12 text-xl font-semibold leading-tight">Modern web experiences</p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-28 rounded-2xl bg-white p-4">
                      <div className="h-3 w-1/2 rounded-full bg-black/80" />
                      <div className="mt-3 h-2 w-full rounded-full bg-black/10" />
                      <div className="mt-2 h-2 w-4/5 rounded-full bg-black/10" />
                      <div className="mt-5 h-6 w-20 rounded-full bg-[#c6b6ff]" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[Code2, ShoppingBag, LayoutDashboard].map((Icon, index) => (
                        <div key={index} className="grid aspect-square place-items-center rounded-xl bg-white/70">
                          <Icon className="h-5 w-5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-7 left-7 rounded-2xl border border-black/10 bg-white/70 px-5 py-4 backdrop-blur sm:bottom-10 sm:left-10">
                <strong className="block text-3xl tracking-[-0.05em]">30+</strong>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/50">delivered projects</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal origin="left" delay={150} className="h-full lg:order-3">
            <div className="selection-on-light relative min-h-[430px] overflow-hidden rounded-[2rem] bg-[#c6f36b] p-6 text-black sm:min-h-[520px] sm:p-10">
              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/45 blur-3xl" />
              <div className="relative mx-auto mt-8 max-w-[31rem] rounded-[1.75rem] border border-black/10 bg-[#f7f5ef]/90 p-6 shadow-2xl shadow-lime-950/15 sm:mt-12 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/40">Automation flow</span>
                    <strong className="mt-2 block text-4xl tracking-[-0.06em]">-60%</strong>
                    <span className="text-xs text-black/50">manual processing</span>
                  </div>
                  <Workflow className="h-10 w-10" />
                </div>

                <div className="mt-8 flex items-center justify-between gap-2">
                  {[Smartphone, Zap, Database].map((Icon, index) => (
                    <div key={index} className="contents">
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white shadow-sm sm:h-20 sm:w-20">
                        <Icon className="h-6 w-6" />
                      </div>
                      {index < 2 && <span className="h-px flex-1 bg-black/20" />}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-3 gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-black/45">
                  <span>Form / App</span>
                  <span className="text-center">n8n / API</span>
                  <span className="text-right">CRM / Data</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal origin="right" delay={200} className="h-full lg:order-4">
            {renderServiceCard(copy.secondary, 2)}
          </ScrollReveal>
        </div>

        <ScrollReveal origin="bottom" className="mt-24 border-t border-white/10 pt-8 sm:mt-32 lg:mt-40">
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500 lg:col-span-3">
              {copy.approachLabel}
            </p>
            <p className="text-pretty text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.94] tracking-[-0.06em] lg:col-span-9">
              <span className="text-white">{copy.approachStrong}</span>{" "}
              <span className="text-neutral-700">{copy.approachMuted}</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
