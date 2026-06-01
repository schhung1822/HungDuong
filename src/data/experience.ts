export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2026 - Hiện tại",
    role: "Web Developer & CMS Builder",
    company: "Agency / Freelance Projects",
    location: "Hà Nội",
    description: "Tiếp tục tham gia và triển khai các dự án website có quy mô lớn hơn, đồng thời phát triển CMS tùy chỉnh, mini app và các giải pháp công nghệ phục vụ nhu cầu vận hành thực tế cho doanh nghiệp, sự kiện và dự án cá nhân.",
    highlights: [
      "Tham gia triển khai các dự án tiêu biểu như SRX, Topmus, QC House, chi nhánh FPT Telecom, Fobtrans Logistic và nhiều website doanh nghiệp khác",
      "Phát triển mini app cho Beauty Summit 2026, hỗ trợ trải nghiệm người dùng, tương tác sự kiện và các nhu cầu vận hành công nghệ trong chương trình",
      "Tiếp tục được tin tưởng tham gia vận hành công nghệ, workflow automation và dữ liệu cho Beauty Summit 2026",
      "Xây dựng CMS tùy chỉnh phục vụ việc quản trị nội dung, dữ liệu và cấu trúc website linh hoạt hơn so với các nền tảng có sẵn",
      "Phát triển một số dự án cá nhân nhằm thử nghiệm ý tưởng sản phẩm, cải thiện tư duy hệ thống và nâng cao khả năng custom code"
    ],
    skills: ["WordPress", "React", "Next.js", "Mini App", "CMS", "Automation", "API Integration"]
  },
  {
    id: "exp-2",
    period: "2025",
    role: "Web Developer & Automation Developer",
    company: "Agency",
    location: "Hà Nội",
    description: "Bắt đầu nhận và triển khai nhiều dự án lớn nhỏ, dần thành thạo hơn trong việc xây dựng website, custom giao diện, tích hợp dữ liệu và vận hành workflow automation cho các tổ chức, sự kiện và doanh nghiệp.",
    highlights: [
      "Tham gia hoặc solo xây dựng khoảng 20 website và workflow automation cho các dự án như Aloha Villa, Usobebe, Thanh Thiếu Niên Bắc Ninh, Nghề Content, Beauty Summit, Nextgency, Beauty Awards, EAC, Coaching, Mewart, LMS và nhiều dự án khác",
      "Phát triển website giới thiệu, landing page, website dịch vụ, hệ thống nội dung và các trang phục vụ chiến dịch truyền thông cho nhiều lĩnh vực khác nhau",
      "Thiết kế và vận hành workflow automation kết nối form, dữ liệu, email, Google Sheets, CRM và webhook nhằm giảm thao tác thủ công trong quá trình xử lý thông tin",
      "Phụ trách vận hành workflow automation và dữ liệu cho Beauty Summit 2025, hỗ trợ quá trình thu thập, quản lý và xử lý dữ liệu sự kiện"
    ],
    skills: ["WordPress", "n8n", "Automation", "Google Sheets", "Webhook", "API Integration"]
  },
  {
    id: "exp-3",
    period: "2024",
    role: "Web Developer Intern & Junior Project Developer",
    company: "Internship / Small Business Projects",
    location: "Hà Nội",
    description: "Bắt đầu thực tập và nhận các dự án nhỏ, tập trung xây dựng website giới thiệu doanh nghiệp, website thương mại điện tử cơ bản và làm quen với quy trình triển khai sản phẩm web thực tế.",
    highlights: [
      "Tham gia thực tập và thực hiện các dự án website nhỏ cho doanh nghiệp, bao gồm website giới thiệu thương hiệu, dịch vụ và sản phẩm",
      "Xây dựng các website thương mại điện tử cơ bản cho doanh nghiệp, hỗ trợ hiển thị sản phẩm, form liên hệ, thông tin đặt hàng và nội dung bán hàng",
      "Rèn luyện kỹ năng chuyển đổi yêu cầu thực tế thành giao diện website hoàn chỉnh, responsive và dễ quản trị",
      "Cuối năm tham gia hỗ trợ phía sau trong việc vận hành công nghệ, dữ liệu và automation cho Beauty Summit 2024"
    ],
    skills: ["WordPress", "HTML", "CSS", "JavaScript", "E-commerce", "Basic Automation"]
  }

];
