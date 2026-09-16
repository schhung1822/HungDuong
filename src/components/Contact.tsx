import { useState, FormEvent, ChangeEvent } from "react";
import { ArrowUpRight, Mail, Github, Send, Facebook, CheckCircle2 } from "lucide-react";
import ZaloIcon from "./icons/ZaloIcon";
import ScrollReveal from "./reactbits/ScrollReveal";
import { profileData } from "../data/profile";
import { useLanguage } from "../i18n";
import { pageContainer } from "./layout";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-neutral-200 placeholder:text-neutral-600 transition-colors focus:border-white/30 focus:outline-none";
const labelClass = "block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500";

export default function Contact() {
  const { language } = useLanguage();
  const copy = {
    vi: {
      eyebrow: "LIÊN HỆ / BẮT ĐẦU DỰ ÁN",
      title: "Liên hệ tôi",
      heading: "Sẵn sàng ",
      headingMuted: "bắt đầu chứ?",
      description:
        "Chia sẻ phạm vi công việc, thời gian mong muốn và hình thức hỗ trợ bạn cần. Càng rõ ba điều này, tôi càng phản hồi nhanh và sát với thực tế dự án của bạn.",
      note: "Mỗi tin nhắn đều được tôi đọc và trả lời trực tiếp.",
      status: "Đang nhận dự án mới",
      location: "Hà Nội · GMT+7",
      briefLabel: "NÊN GHI RÕ TRONG TIN NHẮN",
      brief: [
        ["Phạm vi dự án", "Website, mini app, CMS tùy chỉnh hay workflow automation?"],
        ["Thời gian mong muốn", "Mốc ra mắt hoặc deadline bạn đang hướng tới."],
        ["Hình thức hỗ trợ", "Làm trọn gói, tham gia cùng team, hay chỉ phần kỹ thuật."]
      ],
      channelsLabel: "KÊNH LIÊN HỆ TRỰC TIẾP",
      emailLabel: "EMAIL",
      githubLabel: "GITHUB",
      zaloLabel: "ZALO",
      facebookLabel: "FACEBOOK",
      successTitle: "Đã gửi tin nhắn thành công!",
      successDescription:
        "Cảm ơn bạn đã kết nối. Tin nhắn của bạn đã được ghi nhận an toàn. Dương Mạnh Hùng sẽ phản hồi sớm nhất qua điện thoại hoặc hòm thư",
      newMessage: "Gửi tin nhắn mới",
      formTitle: "THÔNG TIN DỰ ÁN",
      formHint: "Trường có dấu * là bắt buộc",
      name: "Tên của bạn",
      namePlaceholder: "Ví dụ: Nguyễn Văn A",
      email: "Hòm thư Email",
      brand: "Thương hiệu",
      brandPlaceholder: "Ví dụ: FPT Software, VNPT...",
      phone: "Số điện thoại",
      phonePlaceholder: "Ví dụ: 09xxxxxxxx",
      subject: "Tiêu đề",
      subjectPlaceholder: "Hợp tác thiết kế Website...",
      message: "Nội dung tin nhắn",
      messagePlaceholder: "Mô tả phạm vi, thời gian và hình thức hỗ trợ bạn cần...",
      sending: "Đang gửi...",
      submit: "Gửi tin nhắn ngay",
      error: "Không gửi được tin nhắn. Vui lòng thử lại hoặc liên hệ trực tiếp qua email."
    },
    en: {
      eyebrow: "CONTACT / START A PROJECT",
      title: "Contact me",
      heading: "Ready to ",
      headingMuted: "get started?",
      description:
        "Share the scope, the timeline, and what kind of build support you need. The clearer those three are, the faster and more concrete my reply will be.",
      note: "Every message is read and answered by me directly.",
      status: "Available for new projects",
      location: "Hanoi · GMT+7",
      briefLabel: "WORTH INCLUDING IN YOUR MESSAGE",
      brief: [
        ["Project scope", "A website, mini app, custom CMS, or automation workflow?"],
        ["Timeline", "The launch date or deadline you are working toward."],
        ["Build support", "End-to-end delivery, joining your team, or the technical part only."]
      ],
      channelsLabel: "DIRECT CHANNELS",
      emailLabel: "EMAIL",
      githubLabel: "GITHUB",
      zaloLabel: "ZALO",
      facebookLabel: "FACEBOOK",
      successTitle: "Message sent successfully!",
      successDescription:
        "Thanks for reaching out. Your message has been received safely. Duong Manh Hung will reply as soon as possible via",
      newMessage: "Send another message",
      formTitle: "PROJECT DETAILS",
      formHint: "Fields marked * are required",
      name: "Your name",
      namePlaceholder: "Example: John Doe",
      email: "Email address",
      brand: "Brand",
      brandPlaceholder: "Example: Google, Facebook...",
      phone: "Phone number",
      phonePlaceholder: "Example: +84 98xxxxxxx",
      subject: "Subject",
      subjectPlaceholder: "Website collaboration...",
      message: "Message",
      messagePlaceholder: "Describe the scope, timeline, and support you need...",
      sending: "Sending message...",
      submit: "Send message",
      error: "Unable to send your message. Please try again or contact me directly by email."
    }
  }[language];

  const channels = [
    {
      label: copy.emailLabel,
      value: profileData.contact.email,
      href: `mailto:${profileData.contact.email}`,
      icon: Mail
    },
    {
      label: copy.zaloLabel,
      value: "zalo.me/0379834108",
      href: profileData.contact.zalo,
      icon: ZaloIcon
    },
    {
      label: copy.githubLabel,
      value: "@schhung1822",
      href: profileData.contact.github,
      icon: Github
    },
    {
      label: copy.facebookLabel,
      value: "fb.com/duong.manh.hung.635010",
      href: profileData.contact.facebook,
      icon: Facebook
    }
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    brand: "",
    phone: ""
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          source: "Portfolio contact form"
        })
      });

      if (!response.ok) {
        throw new Error("Contact API request failed.");
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", brand: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setFormStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-white/10 bg-neutral-950 py-20 text-white sm:py-28 lg:py-32"
    >
      <div className={pageContainer}>
        {/* Section header */}
        <ScrollReveal origin="left">
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            <span className="font-mono text-[10px] font-semibold tracking-[0.28em] text-neutral-500 sm:text-xs">
              05 / {copy.eyebrow}
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-4xl text-balance font-sans text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white">
              {copy.title}
            </h2>

            <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                {copy.status}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600">
                {copy.location}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12">
          {/* Brief + direct channels */}
          <div className="space-y-4 lg:col-span-5">
            <ScrollReveal origin="left">
              <div className="rounded-[2rem] border border-white/10 bg-neutral-900/50 p-6 sm:p-8">
                <h2 className="max-w-4xl text-balance font-sans text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white">
                {copy.heading}
                <span className="block text-neutral-700">{copy.headingMuted}</span>
              </h2>
                <p className="text-pretty mt-8 text-sm leading-7 text-neutral-400 sm:text-base">
                  {copy.description}
                </p>
                <p className="mt-4 text-sm leading-7 text-neutral-600">{copy.note}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal origin="left" delay={120}>
              <div className="rounded-[2rem] border border-white/10 bg-neutral-900/50 p-6 sm:p-8">
                <p className={labelClass}>{copy.channelsLabel}</p>

                <div className="mt-5 divide-y divide-white/[0.07] border-t border-white/[0.07]">
                  {channels.map(({ label, value, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 py-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-neutral-300 transition-colors group-hover:border-white/25 group-hover:bg-white group-hover:text-black">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600">
                          {label}
                        </span>
                        <span className="block truncate text-sm text-neutral-300 transition-colors group-hover:text-white">
                          {value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-700 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Message form */}
          <div className="lg:col-span-7">
            <ScrollReveal origin="right" delay={180} className="h-full">
              <div className="h-full rounded-[2rem] border border-white/10 bg-neutral-900/50 p-6 sm:p-8 lg:p-10">
                {formStatus === "success" ? (
                  <div
                    role="status"
                    className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-black">
                      <CheckCircle2 className="h-8 w-8" />
                    </span>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                      {copy.successTitle}
                    </h3>
                    <p className="max-w-md text-sm leading-7 text-neutral-500">
                      {copy.successDescription}{" "}
                      <strong className="font-medium text-neutral-300">
                        {profileData.contact.email}
                      </strong>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormStatus("idle")}
                      className="mt-4 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-xs font-bold text-neutral-300 transition-colors hover:border-white/25 hover:text-white"
                    >
                      {copy.newMessage}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="text-left">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-neutral-300">
                        {copy.formTitle}
                      </h3>
                      <span className="font-mono text-[10px] text-neutral-600">{copy.formHint}</span>
                    </div>

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2.5">
                        <label htmlFor="name" className={labelClass}>
                          {copy.name} <span className="text-neutral-600">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handeChange}
                          placeholder={copy.namePlaceholder}
                          className={fieldClass}
                        />
                      </div>

                      <div className="space-y-2.5">
                        <label htmlFor="brand" className={labelClass}>
                          {copy.brand}
                        </label>
                        <input
                          id="brand"
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handeChange}
                          placeholder={copy.brandPlaceholder}
                          className={fieldClass}
                        />
                      </div>

                      <div className="space-y-2.5">
                        <label htmlFor="email" className={labelClass}>
                          {copy.email} <span className="text-neutral-600">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handeChange}
                          placeholder="example@gmail.com"
                          className={fieldClass}
                        />
                      </div>

                      <div className="space-y-2.5">
                        <label htmlFor="phone" className={labelClass}>
                          {copy.phone}
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handeChange}
                          placeholder={copy.phonePlaceholder}
                          className={fieldClass}
                        />
                      </div>

                      <div className="space-y-2.5 sm:col-span-2">
                        <label htmlFor="subject" className={labelClass}>
                          {copy.subject}
                        </label>
                        <input
                          id="subject"
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handeChange}
                          placeholder={copy.subjectPlaceholder}
                          className={fieldClass}
                        />
                      </div>

                      <div className="space-y-2.5 sm:col-span-2">
                        <label htmlFor="message" className={labelClass}>
                          {copy.message} <span className="text-neutral-600">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handeChange}
                          placeholder={copy.messagePlaceholder}
                          className={`${fieldClass} resize-none`}
                        />
                      </div>
                    </div>

                    {formStatus === "error" && (
                      <p
                        role="alert"
                        className="mt-6 rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3.5 text-xs leading-6 text-neutral-200"
                      >
                        {copy.error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-xs font-bold text-black transition-colors hover:bg-neutral-200 disabled:opacity-70 sm:w-auto sm:px-8"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <svg className="h-4 w-4 animate-spin text-black" fill="none" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          {copy.sending}
                        </>
                      ) : (
                        <>
                          {copy.submit}
                          <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
