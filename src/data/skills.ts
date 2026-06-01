export interface SkillItem {
  name: string;
  level: number; // Percentage out of 100 for visual depth
  icon: string;
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Website Development",
    items: [
      { name: "WordPress Development", level: 95, icon: "Globe" },
      { name: "Custom Theme / Plugin", level: 88, icon: "Code" },
      { name: "Elementor / ACF / WooCommerce", level: 90, icon: "Layers" },
      { name: "HTML / CSS / JavaScript", level: 92, icon: "FileCode" },
      { name: "React / Next.js", level: 85, icon: "React" },
      { name: "Responsive UI", level: 94, icon: "MonitorSmartphone" }
    ]
  },
  {
    title: "Automation & Workflow",
    items: [
      { name: "n8n Workflow Automation", level: 92, icon: "Workflow" },
      { name: "API Integration", level: 88, icon: "Network" },
      { name: "Webhook / Cron Job", level: 85, icon: "RefreshCw" },
      { name: "Google Sheets / CRM Integration", level: 86, icon: "Table" },
      { name: "Form Automation", level: 90, icon: "FileInput" },
      { name: "Data Processing Flow", level: 82, icon: "Database" }
    ]
  },
  {
    title: "Tools & Deployment",
    items: [
      { name: "Git & GitHub Workflows", level: 88, icon: "GitBranch" },
      { name: "Hosting / Domain / DNS", level: 86, icon: "Server" },
      { name: "Website Migration", level: 84, icon: "MoveRight" },
      { name: "Performance Optimization", level: 85, icon: "Gauge" },
      { name: "Basic Server Management", level: 78, icon: "Terminal" },
      { name: "SEO Technical Setup", level: 82, icon: "Search" }
    ]
  },
  {
    title: "Agency Workflow & Product Thinking",
    items: [
      { name: "Client Requirement Analysis", level: 90, icon: "ClipboardList" },
      { name: "UI Implementation from Figma", level: 88, icon: "PenTool" },
      { name: "Website Structure Planning", level: 86, icon: "Map" },
      { name: "Landing Page Optimization", level: 88, icon: "MousePointerClick" },
      { name: "Problem Solving", level: 90, icon: "Lightbulb" },
      { name: "Maintenance & Support", level: 92, icon: "Wrench" }
    ]
  }
];
