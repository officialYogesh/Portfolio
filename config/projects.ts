// Projects Configuration
// This file contains all project information with TypeScript interfaces

export interface ProjectLink {
  type: "demo" | "github" | "case-study" | "documentation";
  url: string;
  label: string;
}

export interface ProjectTechnology {
  name: string;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "tools"
    | "cloud"
    | "testing"
    | "mobile";
  proficiency?: number; // Optional: 1-10 scale for project-specific proficiency
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string; // Optional icon name
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  status: "completed" | "in-progress" | "planned" | "archived";
  category:
    | "web-app"
    | "mobile-app"
    | "open-source"
    | "api"
    | "tool"
    | "landing-page";
  featured: boolean;
  thumbnail: string; // Path to thumbnail image
  screenshots: string[]; // Array of screenshot paths
  technologies: ProjectTechnology[];
  features: ProjectFeature[];
  challenges: string[];
  solutions: string[];
  links: ProjectLink[];
  startDate: string; // ISO date string
  endDate?: string; // ISO date string, optional for ongoing projects
  teamSize: number;
  role: string; // Role in the project
  metrics?: {
    label: string;
    value: string;
  }[]; // Optional project metrics/achievements
}

export interface ProjectCategory {
  name: string;
  displayName: string;
  description: string;
  color: string;
  icon: string;
}

export const projectCategories: Record<string, ProjectCategory> = {
  "web-app": {
    name: "web-app",
    displayName: "Web Applications",
    description: "Full-stack web applications and platforms",
    color: "#3b82f6",
    icon: "globe",
  },
  "mobile-app": {
    name: "mobile-app",
    displayName: "Mobile Applications",
    description: "Native and cross-platform mobile apps",
    color: "#8b5cf6",
    icon: "smartphone",
  },
  "open-source": {
    name: "open-source",
    displayName: "Open Source",
    description: "Open source contributions and libraries",
    color: "#10b981",
    icon: "heart",
  },
  api: {
    name: "api",
    displayName: "APIs & Backend",
    description: "Backend services and API development",
    color: "#f59e0b",
    icon: "server",
  },
  tool: {
    name: "tool",
    displayName: "Developer Tools",
    description: "Development tools and utilities",
    color: "#ef4444",
    icon: "wrench",
  },
  "landing-page": {
    name: "landing-page",
    displayName: "Landing Pages",
    description: "Marketing and promotional websites",
    color: "#06b6d4",
    icon: "layout",
  },
};

export const projects: Project[] = [
  {
    id: "covid-19-india-tracker",
    title: "Covid-19 India Tracker",
    shortDescription:
      "A comprehensive React-based dashboard for tracking COVID-19 statistics across India with real-time data visualization and state-wise analysis.",
    fullDescription: `A comprehensive React-based dashboard designed to provide real-time COVID-19 statistics across India. 
    The application features interactive maps, state-wise data analysis, and trend visualization to help users understand 
    the pandemic's impact across different regions. Built with modern web technologies and optimized for performance, 
    the dashboard processes large datasets and presents them in an intuitive, accessible interface.
    
    The project was developed during the peak of the pandemic to provide reliable, up-to-date information to the public, 
    featuring responsive design for mobile users and accessibility compliance for users with disabilities.`,
    status: "completed",
    category: "web-app",
    featured: true,
    thumbnail: "/projects/covid-tracker-thumb.jpg",
    screenshots: [
      "/projects/covid-tracker-1.jpg",
      "/projects/covid-tracker-2.jpg",
      "/projects/covid-tracker-3.jpg",
    ],
    technologies: [
      { name: "React", category: "frontend" },
      { name: "JavaScript", category: "frontend" },
      { name: "Chart.js", category: "frontend" },
      { name: "Material-UI", category: "frontend" },
      { name: "Node.js", category: "backend" },
      { name: "Express.js", category: "backend" },
      { name: "MongoDB", category: "database" },
    ],
    features: [
      {
        title: "Interactive Maps",
        description:
          "State-wise interactive maps showing COVID-19 data distribution",
        icon: "map",
      },
      {
        title: "Real-time Data Updates",
        description: "Automatic data synchronization every 15 minutes",
        icon: "refresh",
      },
      {
        title: "Responsive Design",
        description: "Optimized for all device sizes and screen orientations",
        icon: "smartphone",
      },
      {
        title: "Data Visualization",
        description: "Charts and graphs for trend analysis and historical data",
        icon: "bar-chart",
      },
    ],
    challenges: [
      "Processing large datasets efficiently for real-time updates",
      "Creating accessible charts and maps for users with disabilities",
      "Handling inconsistent data formats from multiple government APIs",
      "Optimizing performance for mobile devices with limited bandwidth",
    ],
    solutions: [
      "Implemented data caching and incremental updates to reduce API calls",
      "Added ARIA labels and keyboard navigation for all interactive elements",
      "Built a data normalization layer to standardize various API responses",
      "Used lazy loading and image optimization for better mobile performance",
    ],
    links: [
      {
        type: "demo",
        url: "https://covid-tracker-demo.vercel.app",
        label: "Live Demo",
      },
      {
        type: "github",
        url: "https://github.com/officialYogesh/covid-tracker",
        label: "Source Code",
      },
    ],
    startDate: "2020-04-01",
    endDate: "2020-08-15",
    teamSize: 1,
    role: "Full Stack Developer",
    metrics: [
      { label: "Daily Active Users", value: "10,000+" },
      { label: "Page Load Time", value: "< 2 seconds" },
      { label: "API Response Time", value: "< 500ms" },
    ],
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    shortDescription:
      "Full-stack e-commerce solution with modern payment integration, inventory management, and customer analytics.",
    fullDescription: `A comprehensive e-commerce platform built with modern web technologies, featuring a complete 
    shopping experience from product browsing to checkout. The platform includes advanced features like inventory 
    management, order tracking, customer analytics, and multi-payment gateway integration.
    
    The system is designed to handle high traffic loads with optimized database queries, caching strategies, 
    and CDN integration. It includes both customer-facing features and a comprehensive admin dashboard for 
    business management.`,
    status: "completed",
    category: "web-app",
    featured: true,
    thumbnail: "/projects/ecommerce-thumb.jpg",
    screenshots: [
      "/projects/ecommerce-1.jpg",
      "/projects/ecommerce-2.jpg",
      "/projects/ecommerce-3.jpg",
      "/projects/ecommerce-4.jpg",
    ],
    technologies: [
      { name: "Next.js", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "PostgreSQL", category: "database" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Node.js", category: "backend" },
      { name: "Express.js", category: "backend" },
      { name: "Redis", category: "database" },
    ],
    features: [
      {
        title: "Payment Processing",
        description: "Secure payment integration with Stripe and PayPal",
        icon: "credit-card",
      },
      {
        title: "Admin Dashboard",
        description:
          "Comprehensive dashboard for inventory and order management",
        icon: "dashboard",
      },
      {
        title: "Customer Analytics",
        description: "Detailed analytics and reporting for business insights",
        icon: "analytics",
      },
      {
        title: "Mobile Optimized",
        description: "Fully responsive design optimized for mobile shopping",
        icon: "smartphone",
      },
    ],
    challenges: [
      "Implementing secure payment processing with multiple gateways",
      "Building a scalable inventory management system",
      "Creating real-time order tracking functionality",
      "Optimizing database performance for large product catalogs",
    ],
    solutions: [
      "Integrated multiple payment providers with fallback mechanisms",
      "Implemented event-driven architecture for inventory updates",
      "Built WebSocket connections for real-time order status updates",
      "Used database indexing and query optimization for better performance",
    ],
    links: [
      {
        type: "demo",
        url: "https://ecommerce-demo.vercel.app",
        label: "Live Demo",
      },
      {
        type: "github",
        url: "https://github.com/officialYogesh/ecommerce-platform",
        label: "Source Code",
      },
    ],
    startDate: "2023-01-15",
    endDate: "2023-06-30",
    teamSize: 3,
    role: "Lead Developer",
    metrics: [
      { label: "Conversion Rate", value: "3.2%" },
      { label: "Page Load Speed", value: "< 1.5s" },
      { label: "Orders Processed", value: "1,500+" },
    ],
  },
  {
    id: "realtime-chat-app",
    title: "Real-Time Chat Application",
    shortDescription:
      "WebSocket-based chat application with room management, file sharing, and real-time notifications.",
    fullDescription: `A modern real-time chat application built with WebSocket technology, supporting multiple chat rooms, 
    private messaging, and file sharing capabilities. The application features real-time notifications, message encryption, 
    and user presence indicators.
    
    The platform supports both one-on-one conversations and group chats, with features like message reactions, 
    typing indicators, and message history. Built with scalability in mind to handle thousands of concurrent users.`,
    status: "in-progress",
    category: "web-app",
    featured: true,
    thumbnail: "/projects/chat-app-thumb.jpg",
    screenshots: [
      "/projects/chat-app-1.jpg",
      "/projects/chat-app-2.jpg",
      "/projects/chat-app-3.jpg",
    ],
    technologies: [
      { name: "React", category: "frontend" },
      { name: "Node.js", category: "backend" },
      { name: "Socket.io", category: "backend" },
      { name: "MongoDB", category: "database" },
      { name: "Express.js", category: "backend" },
      { name: "TypeScript", category: "frontend" },
    ],
    features: [
      {
        title: "Real-time Messaging",
        description: "Instant message delivery using WebSocket connections",
        icon: "message-circle",
      },
      {
        title: "File Uploads",
        description: "Support for image, document, and media file sharing",
        icon: "upload",
      },
      {
        title: "User Authentication",
        description: "Secure user registration and authentication system",
        icon: "shield",
      },
      {
        title: "Group Chats",
        description: "Create and manage group conversations and channels",
        icon: "users",
      },
    ],
    challenges: [
      "Handling high-frequency real-time message updates efficiently",
      "Implementing secure file upload and storage system",
      "Managing user presence and connection states across multiple devices",
      "Building scalable WebSocket infrastructure for concurrent users",
    ],
    solutions: [
      "Implemented message queuing and batching for optimal performance",
      "Built secure file upload with virus scanning and size limitations",
      "Created robust connection management with automatic reconnection",
      "Used horizontal scaling with Socket.io cluster adapter for Redis",
    ],
    links: [
      {
        type: "demo",
        url: "https://chat-app-demo.vercel.app",
        label: "Live Demo",
      },
      {
        type: "github",
        url: "https://github.com/officialYogesh/chat-application",
        label: "Source Code",
      },
    ],
    startDate: "2024-03-01",
    teamSize: 2,
    role: "Full Stack Developer",
    metrics: [
      { label: "Concurrent Users", value: "500+" },
      { label: "Message Latency", value: "< 50ms" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectsByStatus(status: Project["status"]): Project[] {
  return projects.filter((project) => project.status === status);
}

export function getAllCategories(): string[] {
  return Object.keys(projectCategories);
}

export function getProjectTechnologies(): string[] {
  const allTechnologies = new Set<string>();
  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      allTechnologies.add(tech.name);
    });
  });
  return Array.from(allTechnologies).sort();
}

export default projects;
