export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  gallery: string[];
  description: string;
  overview: string[];
  date: string;
  category: string;
  client: string;
  metrics: {
    label: string;
    value: string;
  }[];
  role: string;
  tech: string[];
  features: string[];
  demoUrl: string;
  githubUrl: string;
  badge: string;
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "aistudio-maker",
    title: "AI Studio Custom Component Builder",
    thumbnail: "/project-thumbnails/aistudio-maker.svg",
    gallery: [
      "/project-thumbnails/aistudio-maker.svg",
      "/project-thumbnails/aistudio-maker-editor.svg",
      "/project-thumbnails/aistudio-maker-preview.svg"
    ],
    description: "Công cụ trực quan hỗ trợ lập trình viên xây dựng và thử nghiệm nhanh các Custom Widget, tích hợp AI tư vấn viết code trực tiếp.",
    overview: [
      "Dự án tập trung vào việc rút ngắn thời gian dựng component bằng một không gian làm việc trực quan, nơi người dùng có thể viết mã, xem kết quả và tinh chỉnh giao diện ngay trong cùng một màn hình.",
      "Luồng làm việc được thiết kế cho tốc độ thử nghiệm cao: người dùng nhập yêu cầu, nhận gợi ý từ AI, sửa lỗi cú pháp và xuất mã sạch để đưa vào dự án React/Vite.",
      "Điểm mạnh của sản phẩm nằm ở khả năng hỗ trợ developer kiểm thử responsive, chuẩn hóa component và giảm các thao tác lặp lại khi xây dựng UI."
    ],
    date: "2026",
    category: "Developer Tool & AI Assistant",
    client: "Nextgency Lab",
    metrics: [
      { label: "Tốc độ prototype", value: "+70%" },
      { label: "Lỗi cú pháp giảm", value: "-45%" },
      { label: "Thời gian xuất mã", value: "< 1 phút" }
    ],
    role: "Full-stack Developer (Solo)",
    tech: ["React", "TypeScript", "Tailwind CSS", "Gemini API", "Vite", "Node.js"],
    features: [
      "Bộ soạn thảo mã nguồn trực tiếp với Live Preview tức thì",
      "Gợi ý sửa lỗi cú pháp và tối ưu hóa hiệu năng bằng AI",
      "Xuất mã nguồn sạch, tương thích hoàn toàn với nền tảng React/Vite",
      "Hỗ trợ chế độ xem trên nhiều thiết bị (Responsive simulator)"
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/nextgency-dev/aistudio-component-builder",
    badge: "Sản phẩm Mới"
  },
  {
    id: "fintrack",
    title: "FinTrack - Quản lý Chi tiêu Thông minh",
    thumbnail: "/project-thumbnails/fintrack.svg",
    gallery: [
      "/project-thumbnails/fintrack.svg",
      "/project-thumbnails/fintrack-dashboard.svg",
      "/project-thumbnails/fintrack-report.svg"
    ],
    description: "Hệ thống quản lý tài chính cá nhân tự cấp nguồn, phân tích biểu đồ trực quan giúp theo dõi và tối ưu dòng tiền thông minh.",
    overview: [
      "FinTrack giúp người dùng gom các khoản thu chi rời rạc thành một dashboard rõ ràng, dễ đọc và phù hợp cho việc theo dõi tài chính hằng ngày.",
      "Giao diện ưu tiên khả năng quan sát nhanh: biểu đồ theo chu kỳ, nhóm danh mục chi tiêu và trạng thái kế hoạch tiết kiệm được đưa về một luồng xem thống nhất.",
      "Dự án cũng tập trung vào trải nghiệm bảo mật cục bộ, cho phép người dùng lưu dữ liệu trên thiết bị và xuất báo cáo khi cần tổng hợp lại dòng tiền."
    ],
    date: "2026",
    category: "Finance Dashboard",
    client: "Personal Product",
    metrics: [
      { label: "Tốc độ nhập liệu", value: "+55%" },
      { label: "Chu kỳ báo cáo", value: "Theo tháng" },
      { label: "Dữ liệu cục bộ", value: "100%" }
    ],
    role: "Lead Frontend Developer",
    tech: ["React 19", "Recharts", "Lucide Icons", "Tailwind CSS", "Local Storage Async"],
    features: [
      "Biểu đồ phân tích luồng thu nhập và chi tiêu trực quan theo chu kỳ",
      "Tính năng lập kế hoạch tiết kiệm dựa trên thói quen chi tiêu",
      "Xuất báo cáo tài chính định dạng PDF và Excel chính xác",
      "Bảo mật cục bộ bằng mật khẩu mã hóa client-side"
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/nextgency-dev/fintrack-personal",
    badge: "Phổ biến"
  },
  {
    id: "socialhub",
    title: "SocialHub Live Collaboration",
    thumbnail: "/project-thumbnails/socialhub.svg",
    gallery: [
      "/project-thumbnails/socialhub.svg",
      "/project-thumbnails/socialhub-board.svg",
      "/project-thumbnails/socialhub-chat.svg"
    ],
    description: "Bảng tin tức cộng đồng và không gian làm việc cộng tác thời gian thực dành cho giới lập trình viên chia sẻ ý tưởng.",
    overview: [
      "SocialHub được xây dựng như một không gian cộng tác thời gian thực, nơi người dùng có thể trao đổi ý tưởng, kéo thả nội dung và thảo luận trực tiếp trong cùng một workflow.",
      "Trọng tâm của dự án là giảm độ trễ trong tương tác nhóm, giữ giao diện đủ tối giản để người dùng tập trung vào nội dung thay vì bị phân tán bởi các thao tác phụ.",
      "Hạ tầng được đóng gói theo hướng dễ triển khai, phù hợp cho các nhóm nhỏ muốn có một không gian làm việc riêng và linh hoạt."
    ],
    date: "2025",
    category: "Realtime Collaboration",
    client: "Open Source Community",
    metrics: [
      { label: "Độ trễ tương tác", value: "< 50ms" },
      { label: "Không gian làm việc", value: "Realtime" },
      { label: "Triển khai", value: "Docker" }
    ],
    role: "Full-stack Developer",
    tech: ["Vite", "Express", "Tailwind CSS", "WebSockets", "CSS Grid Workspace"],
    features: [
      "Bảng làm việc kéo thả chia sẻ ý tưởng với độ trễ dưới 50ms",
      "Kênh chat âm thanh và gửi tệp tin trực tiếp tiện lợi",
      "Đóng gói Docker giúp triển khai hạ tầng dễ dàng",
      "Theme tối đặc biệt được thiết kế thân thiện cho lập trình viên"
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/nextgency-dev/socialhub-live",
    badge: "Mở nguồn"
  },
  {
    id: "speedrun-code",
    title: "SpeedRun Code Platform",
    thumbnail: "/project-thumbnails/speedrun-code.svg",
    gallery: [
      "/project-thumbnails/speedrun-code.svg",
      "/project-thumbnails/speedrun-arena.svg",
      "/project-thumbnails/speedrun-rank.svg"
    ],
    description: "Sân chơi thi đấu code trực tiếp giúp lập trình viên cải thiện kỹ năng giải thuật thông qua các trận đấu đối kháng nhanh.",
    overview: [
      "SpeedRun Code Platform mô phỏng trải nghiệm thi đấu lập trình nhanh, nơi người dùng có thể giải bài, chạy test case và so sánh kết quả theo thời gian thực.",
      "Dự án chú trọng vào việc tạo động lực học thuật toán qua đối kháng, bảng xếp hạng và phản hồi tức thì sau mỗi lần nộp bài.",
      "Phần backend được thiết kế xoay quanh runner sandbox để tách biệt quá trình thực thi mã và giảm rủi ro khi xử lý nhiều ngôn ngữ lập trình."
    ],
    date: "2025",
    category: "Coding Challenge Platform",
    client: "Developer Community",
    metrics: [
      { label: "Cập nhật bảng xếp hạng", value: "Realtime" },
      { label: "Runner sandbox", value: "Isolated" },
      { label: "Test case", value: "Tự động" }
    ],
    role: "Product Creator & Backend dev",
    tech: ["Node.js", "Express", "TypeScript", "Tailwind CSS", "Runner Sandbox"],
    features: [
      "Hệ thống biên dịch mã nguồn an toàn trong Sandbox",
      "Bảng xếp hạng thời gian thực cập nhật từng giây",
      "Hỗ trợ nhiều ngữ cảnh thử nghiệm (Test cases generator) tự động",
      "Cổng thảo luận giải thuật tích hợp dưới mỗi bài thi"
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/nextgency-dev/speedrun-code",
    badge: "Thử Thách"
  }
];
