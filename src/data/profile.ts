export interface FeaturedAsset {
  title: string;
  subtitle: string;
  description: string;
  problemSolved: string;
  impact: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
}

export interface Profile {
  name: string;
  fullName: string;
  role: string;
  shortDescription: string;
  detailedAbout: string;
  strengths: {
    title: string;
    description: string;
    icon: string;
  }[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    zalo: string;
    facebook: string;
    telegram: string;
  };
  featuredAsset: FeaturedAsset;
  featuredAssets: FeaturedAsset[];
}

export const profileData: Profile = {
  name: "HungDuong",
  fullName: "Dương Mạnh Hùng",
  role: "Web Developer & Automation builder",
  shortDescription: "Tôi xây dựng các ứng dụng web hiện đại, tối ưu trải nghiệm người dùng bằng cách áp dụng thiết kế tinh tế kết hợp hiệu năng vượt trội và tư duy phát triển sản phẩm thực tế.",
  detailedAbout: "Tôi là một nhà phát triển phần mềm và nhà tạo lập sản phẩm nhiệt huyết. Tôi luôn giữ tư duy đặt người dùng làm trung tâm, từ khâu lên ý tưởng, thiết kế hệ thống tối ưu và lập trình giải pháp toàn diện. Với thế mạnh cả về Frontend, tôi chú trọng tối ưu trải nghiệm người dùng bằng cách áp dụng thiết kế tinh tế kết hợp hiệu năng vượt trội và giải quyết vấn đề của doanh nghiệp/cá nhân.",
  strengths: [
    {
      title: "Phát triển Website",
      description: "Xây dựng website bằng WordPress, React và Next.js với giao diện hiện đại, dễ quản trị và phù hợp với nhu cầu thực tế của khách hàng.",
      icon: "Cpu"
    },
    {
      title: "n8n Automation",
      description: "Thiết kế các workflow tự động hóa giúp tối ưu quy trình làm việc, giảm thao tác thủ công và kết nối dữ liệu giữa nhiều nền tảng.",
      icon: "Zap"
    },
    {
      title: "Tối ưu trải nghiệm người dùng",
      description: "Chú trọng bố cục, tốc độ tải trang và trải nghiệm sử dụng để website không chỉ đẹp mà còn hiệu quả trong vận hành.",
      icon: "Palette"
    },
    {
      title: "Tư duy giải pháp",
      description: "Hiểu yêu cầu kinh doanh, phân tích vấn đề cốt lõi và đề xuất hướng triển khai kỹ thuật rõ ràng, thực tế và dễ mở rộng.",
      icon: "Lightbulb"
    }
  ],
  contact: {
    email: "schhung2143@gmail.com",
    github: "https://github.com/schhung1822",
    linkedin: "https://linkedin.com/in/hungduongmanh",
    zalo: "https://zalo.me/0379834108/",
    facebook: "https://www.facebook.com/duong.manh.hung.635010",
    telegram: "https://t.me/Leohunq"
  },
  featuredAsset: {
    title: "SRX Website & CRM",
    subtitle: "Dự án Nổi bật Hàng đầu",
    description: "Một website thương mại điện tử hiện đại hỗ trợ đã ngôn ngữa và nền tảng quản trị nội dung thông minh siêu tốc được thiết kế tối giản, phân quyền tự động.",
    problemSolved: "Khắc phục sự chậm trễ và cấu trúc rườm rà của các CMS truyền thống. Giúp các doanh nghiệp vừa và nhỏ triển khai trang web tin tức hoặc blog chuẩn SEO chỉ trong 5 phút với chi phí vận hành gần bằng không.",
    impact: "Giảm thời gian tải trang trung bình từ 3.2s xuống 0.6s. Tăng 140% hiệu suất biên tập viên nhờ bộ soạn thảo Rich Content thông minh và gợi ý tiêu đề tự động bằng AI.",
    tech: ["Nextjs", "Vite", "Node.js", "Express", "Gemini API", "Tailwind CSS v4", "Docker"],
    demoUrl: "http://srx.vn/",
    githubUrl: "http://srx.vn/"
  },
  
  featuredAssets: [
    {
      title: "SRX Website & CRM",
      subtitle: "Website thương mại điện tử & hệ thống quản trị khách hàng",
      description:
        "Dự án website thương mại điện tử kết hợp hệ thống CRM nội bộ, hỗ trợ hiển thị sản phẩm, quản lý thông tin khách hàng, xử lý dữ liệu liên hệ và tối ưu trải nghiệm mua hàng trên nhiều thiết bị.",
      problemSolved:
        "Giải quyết nhu cầu xây dựng một nền tảng bán hàng chuyên nghiệp, dễ quản trị và có khả năng hỗ trợ đội ngũ vận hành trong việc theo dõi khách hàng, sản phẩm, đơn hàng và dữ liệu kinh doanh tập trung.",
      impact:
        "Giúp doanh nghiệp có một hệ thống website hiện đại, rõ ràng, dễ mở rộng và hỗ trợ quy trình chăm sóc khách hàng hiệu quả hơn. Tối ưu trải nghiệm người dùng, cải thiện khả năng quản lý dữ liệu và tăng tính chuyên nghiệp cho thương hiệu.",
      tech: ["Next.js", "React", "Node.js", "Express", "CRM", "Tailwind CSS", "API Integration"],
      demoUrl: "http://srx.vn/",
      githubUrl: "http://srx.vn/"
    },
    {
      title: "Mini App Beauty Summit",
      subtitle: "Mini app phục vụ sự kiện Beauty Summit",
      description:
        "Mini app được phát triển nhằm hỗ trợ trải nghiệm người tham dự Beauty Summit, bao gồm các tính năng phục vụ tương tác sự kiện, truy cập thông tin nhanh, xử lý dữ liệu người dùng và hỗ trợ đội ngũ vận hành trong quá trình diễn ra chương trình.",
      problemSolved:
        "Giải quyết nhu cầu số hóa một phần quy trình vận hành sự kiện, giúp người tham dự dễ dàng tương tác và tra cứu thông tin, đồng thời hỗ trợ ban tổ chức thu thập, quản lý và xử lý dữ liệu hiệu quả hơn thay vì phụ thuộc hoàn toàn vào thao tác thủ công.",
      impact:
        "Góp phần nâng cao trải nghiệm người tham dự, giảm tải cho đội ngũ vận hành và giúp dữ liệu sự kiện được xử lý tập trung, nhanh chóng, chính xác hơn trong suốt quá trình tổ chức Beauty Summit.",
      tech: ["React", "Next.js", "JavaScript", "Tailwind CSS", "n8n", "Webhook", "API Integration"],
      demoUrl: "#",
      githubUrl: "#"
    }
  ]
};
