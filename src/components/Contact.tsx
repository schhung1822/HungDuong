import { useState, FormEvent, ChangeEvent } from "react";
import { Mail, Github, Send, MessageSquareCode, Facebook, CheckCircle2, Heart } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ZaloIcon from "./icons/ZaloIcon";
import ScrollReveal from "./reactbits/ScrollReveal";
import SpotlightCard from "./reactbits/SpotlightCard";
import { profileData } from "../data/profile";
import { useLanguage } from "../i18n";

export default function Contact() {
  const { language } = useLanguage();
  const copy = {
    vi: {
      title: "Kết nối & Đồng hành",
      heading: "Hãy cùng thảo luận dự án tiếp theo!",
      description: "Tôi luôn sẵn sàng tiếp nhận các cơ hội hợp tác phát triển sản phẩm, website, Zalo Mini App hay workflow automation.",
      emailLabel: "GẮN EMAIL TRỰC TIẾP",
      githubLabel: "MÃ NGUỒN CỘNG ĐỒNG",
      zaloLabel: "KẾT NỐI ZALO",
      facebookLabel: "MẠNG XÃ HỘI CÁ NHÂN",
      successTitle: "Gửi Tin Nhắn Thành Công!",
      successDescription: "Cảm ơn bạn đã kết nối. Tin nhắn của bạn đã được lập chỉ mục an toàn. Dương Mạnh Hùng sẽ phản hồi sớm nhất qua điện thoại ho hòm thư",
      newMessage: "Gửi tin nhắn mới",
      formTitle: "GỬI THƯ LIÊN HỆ",
      name: "Tên của bạn",
      namePlaceholder: "Ví dụ: Nguyễn Văn A",
      email: "Hòm thư Email",
      brand: "Thương hiệu",
      brandPlaceholder: "Ví dụ: FPT software, VNPT...",
      phone: "Số điện thoại",
      phonePlaceholder: "Ví dụ: 09xxxxxxxx",
      subject: "Tiêu đề",
      subjectPlaceholder: "Hợp tác thiết kế Website...",
      message: "Nội dung tin nhắn",
      messagePlaceholder: "Nhập nội dung tin nhắn của bạn ở đây...",
      sending: "Đang lập chỉ mục gửi...",
      submit: "Gửi tin nhắn ngay",
      error: "Không gửi được tin nhắn. Vui lòng thử lại hoặc liên hệ trực tiếp qua email."
    },
    en: {
      title: "Connect & Collaborate",
      heading: "Let’s discuss your next project.",
      description: "I am open to product, website, Zalo Mini App, and workflow automation collaborations.",
      emailLabel: "DIRECT EMAIL",
      githubLabel: "OPEN SOURCE",
      zaloLabel: "ZALO CONTACT",
      facebookLabel: "SOCIAL PROFILE",
      successTitle: "Message Sent Successfully!",
      successDescription: "Thanks for reaching out. Your message has been received safely. Duong Manh Hung will reply as soon as possible via",
      newMessage: "Send another message",
      formTitle: "SEND A MESSAGE",
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
      messagePlaceholder: "Write your message here...",
      sending: "Sending message...",
      submit: "Send message",
      error: "Unable to send your message. Please try again or contact me directly by email."
    }
  }[language];
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
    <section id="contact" className="py-20 bg-neutral-950 px-6 border-t border-neutral-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          number="06" 
          title={copy.title}
          subtitle="keep_in_touch" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
          {/* Social Cards Columns - Left side */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal origin="left" className="space-y-4">
              <h3 className="text-xl font-sans font-bold text-neutral-100 flex items-center gap-2">
                {copy.heading}
              </h3>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
                {copy.description}
              </p>
            </ScrollReveal>

            {/* Direct Coordinates Widget */}
            <ScrollReveal origin="left" delay={150} className="space-y-4">
              <SpotlightCard className="p-6">
                <div className="space-y-4 font-sans text-xs sm:text-sm">
                  <div className="flex items-center gap-4 py-1.5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-neutral-300" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-neutral-500 uppercase">{copy.emailLabel}</p>
                      <a href={`mailto:${profileData.contact.email}`} className="text-neutral-200 hover:text-white font-medium transition-colors">
                        {profileData.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-1.5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                      <Github className="w-5 h-5 text-neutral-300" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-neutral-500 uppercase">{copy.githubLabel}</p>
                      <a href={profileData.contact.github} target="_blank" rel="noreferrer" className="text-neutral-200 hover:text-white font-medium transition-colors">
                        @schhung1822
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-1.5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                      <ZaloIcon className="w-5 h-5 text-neutral-300" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-neutral-500 uppercase">{copy.zaloLabel}</p>
                      <a href={profileData.contact.zalo} target="_blank" rel="noreferrer" className="text-neutral-200 hover:text-white font-medium transition-colors">
                        zalo.me/0379834108
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-1.5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                      <Facebook className="w-5 h-5 text-neutral-300" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-neutral-500 uppercase">{copy.facebookLabel}</p>
                      <a href={profileData.contact.facebook} target="_blank" rel="noreferrer" className="text-neutral-200 hover:text-white font-medium transition-colors">
                        fb.com/duong.manh.hung.635010
                      </a>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>

          {/* High-Fidelity Form - Right side */}
          <div className="lg:col-span-7">
            <ScrollReveal origin="bottom" delay={200} className="h-full">
              <SpotlightCard className="p-8">
                {formStatus === "success" ? (
                  <div className="py-12 flex flex-col items-center text-center gap-4 font-sans">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-neutral-100">{copy.successTitle}</h4>
                    <p className="text-neutral-400 max-w-md text-sm leading-relaxed">
                      {copy.successDescription} <strong className="text-neutral-300">{profileData.contact.email}</strong>.
                    </p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="mt-6 px-6 py-2 rounded-full font-bold text-xs bg-neutral-950 hover:bg-neutral-900 text-neutral-300 border border-neutral-800"
                    >
                      {copy.newMessage}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 text-left font-sans">
                    <div className="flex items-center gap-2 pb-3 border-b border-neutral-900/80 mb-2">
                      <MessageSquareCode className="w-5 h-5 text-neutral-300" />
                      <h4 className="text-base font-bold text-neutral-200 font-mono tracking-wide uppercase">{copy.formTitle}</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-xs font-mono text-neutral-500 uppercase tracking-widest">
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
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="brand" className="block text-xs font-mono text-neutral-500 uppercase tracking-widest">
                          {copy.brand}
                        </label>
                        <input
                          id="brand"
                          type="text"
                          name="brand"
                          value={formData.brand}
                          onChange={handeChange}
                          placeholder={copy.brandPlaceholder}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-colors"
                        />
                      </div>
                    </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-xs font-mono text-neutral-500 uppercase tracking-widest">
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
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-xs font-mono text-neutral-500 uppercase tracking-widest">
                          {copy.phone}
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handeChange}
                          placeholder={copy.phonePlaceholder}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-xs font-mono text-neutral-500 uppercase tracking-widest">
                        {copy.subject}
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handeChange}
                        placeholder={copy.subjectPlaceholder}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-xs font-mono text-neutral-500 uppercase tracking-widest">
                        {copy.message} <span className="text-neutral-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handeChange}
                        placeholder={copy.messagePlaceholder}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-300 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit action */}
                    {formStatus === "error" && (
                      <div className="rounded-xl border border-neutral-600 bg-neutral-900 px-4 py-3 text-xs leading-relaxed text-neutral-100">
                        {copy.error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="group flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black font-bold text-xs px-6 py-3.5 rounded-xl transition-colors duration-200 cursor-pointer w-full disabled:opacity-70"
                    >
                      {formStatus === "submitting" ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {copy.sending}
                        </span>
                      ) : (
                        <>
                          {copy.submit}
                          <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
