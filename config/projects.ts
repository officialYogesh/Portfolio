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
    id: "upside-down-game",
    title: "Upside Down",
    shortDescription:
      "Award-winning endless runner game inspired by Stranger Things with dual-world gameplay mechanics",
    fullDescription:
      "An innovative endless runner game inspired by Netflix's Stranger Things where players can swipe to switch between two parallel worlds - the normal world and the Upside Down. Players collect coins while dodging unique enemies in each dimension, creating an engaging dual-reality gaming experience that captivated over 1,000 players.",
    status: "completed",
    category: "mobile-app",
    featured: true,
    thumbnail: "/images/projects/upside-down-thumbnail.jpg",
    screenshots: [
      "/images/projects/upside-down-gameplay-1.jpg",
      "/images/projects/upside-down-gameplay-2.jpg",
      "/images/projects/upside-down-menu.jpg",
    ],
    technologies: [
      { name: "Unity", category: "tools", proficiency: 8 },
      { name: "C#", category: "backend", proficiency: 7 },
      { name: "Android", category: "mobile", proficiency: 7 },
      { name: "iOS", category: "mobile", proficiency: 7 },
      { name: "Game Design", category: "frontend", proficiency: 8 },
    ],
    features: [
      {
        title: "Dual World Mechanics",
        description:
          "Innovative swipe-to-switch gameplay between normal world and Upside Down dimensions",
        icon: "layers",
      },
      {
        title: "Endless Runner Gameplay",
        description:
          "Fast-paced infinite runner with progressively challenging obstacles and enemies",
        icon: "zap",
      },
      {
        title: "Stranger Things Theme",
        description:
          "Authentic visual design and atmosphere inspired by the popular Netflix series",
        icon: "film",
      },
      {
        title: "Cross-Platform Release",
        description:
          "Deployed on both Google Play Store and Apple App Store with optimized performance",
        icon: "smartphone",
      },
    ],
    challenges: [
      "Creating smooth world-switching animations without performance drops",
      "Balancing difficulty progression across two different game dimensions",
      "Optimizing graphics and physics for mobile devices with varying specs",
      "Implementing engaging gameplay mechanics that felt intuitive to players",
    ],
    solutions: [
      "Developed efficient rendering system that pre-loads both worlds for seamless transitions",
      "Created adaptive difficulty algorithm that adjusts based on player performance and world switching frequency",
      "Implemented LOD (Level of Detail) system and optimized assets for different device capabilities",
      "Conducted extensive user testing to refine swipe gestures and game feedback systems",
    ],
    links: [
      {
        type: "case-study",
        url: "https://teknack.in/hall-of-fame/",
        label: "Teknack Hall of Fame",
      },
      {
        type: "documentation",
        url: "https://teknack.in/about/",
        label: "ACM DBIT Gaming Studio",
      },
    ],
    startDate: "2018-10-01",
    endDate: "2019-03-01",
    teamSize: 2,
    role: "Co-Developer & Game Designer",
    metrics: [
      { label: "Downloads", value: "1,000+" },
      { label: "Award", value: "1st Place" },
      { label: "Platforms", value: "2" },
      { label: "Development Time", value: "5 months" },
    ],
  },
  {
    id: "jobfit-ai",
    title: "JobFit AI",
    shortDescription:
      "LangChain-powered career platform that matches job seekers with opportunities using advanced AI",
    fullDescription:
      "An intelligent career platform that leverages LangChain and advanced language models to analyze resumes, job descriptions, and career goals to provide personalized job recommendations. The system uses RAG (Retrieval-Augmented Generation) to match candidates with opportunities based on skills, experience, and career aspirations, while providing actionable feedback for improving job application success rates.",
    status: "completed",
    category: "web-app",
    featured: true,
    thumbnail: "/images/projects/jobfit-ai-thumbnail.jpg",
    screenshots: [
      "/images/projects/jobfit-ai-dashboard.jpg",
      "/images/projects/jobfit-ai-matching.jpg",
      "/images/projects/jobfit-ai-analytics.jpg",
    ],
    technologies: [
      { name: "LangChain", category: "backend", proficiency: 9 },
      { name: "Python", category: "backend", proficiency: 9 },
      { name: "FastAPI", category: "backend", proficiency: 8 },
      { name: "React", category: "frontend", proficiency: 9 },
      { name: "TypeScript", category: "frontend", proficiency: 9 },
      { name: "PostgreSQL", category: "database", proficiency: 8 },
      { name: "Redis", category: "database", proficiency: 8 },
      { name: "AWS Lambda", category: "cloud", proficiency: 8 },
      { name: "OpenAI GPT", category: "backend", proficiency: 8 },
    ],
    features: [
      {
        title: "AI-Powered Job Matching",
        description:
          "Uses LangChain and vector embeddings to match candidates with relevant job opportunities",
        icon: "target",
      },
      {
        title: "Resume Analysis & Optimization",
        description:
          "Provides detailed feedback and suggestions for improving resume effectiveness",
        icon: "file-text",
      },
      {
        title: "Career Path Recommendations",
        description:
          "Suggests career progression paths based on skills and market demand",
        icon: "trending-up",
      },
      {
        title: "Real-time Market Insights",
        description:
          "Delivers up-to-date salary data and skill demand analytics",
        icon: "bar-chart",
      },
    ],
    challenges: [
      "Ensuring accurate job-candidate matching with complex skill requirements",
      "Processing and analyzing large volumes of job posting data in real-time",
      "Creating interpretable AI recommendations that users can understand and act upon",
      "Maintaining data privacy while providing personalized recommendations",
    ],
    solutions: [
      "Implemented semantic search using vector embeddings and cosine similarity for nuanced matching",
      "Built efficient data pipeline with Redis caching and background job processing",
      "Developed explainable AI features that show reasoning behind recommendations",
      "Implemented privacy-first architecture with data anonymization and user consent management",
    ],
    links: [
      {
        type: "demo",
        url: "https://jobfit-ai-demo.vercel.app",
        label: "Live Demo",
      },
      {
        type: "github",
        url: "https://github.com/officialYogesh/jobfit-ai",
        label: "Source Code",
      },
      {
        type: "case-study",
        url: "https://iamyogesh.com/projects/jobfit-ai",
        label: "Case Study",
      },
    ],
    startDate: "2024-01-15",
    endDate: "2024-05-30",
    teamSize: 1,
    role: "Full-Stack Developer & AI Engineer",
    metrics: [
      { label: "Accuracy", value: "87%" },
      { label: "User Satisfaction", value: "4.6/5" },
      { label: "Job Matches", value: "10K+" },
      { label: "Processing Speed", value: "<3s" },
    ],
  },
  {
    id: "dealership-automation-platform",
    title: "GenAI Dealership Automation Platform",
    shortDescription:
      "LangChain-powered automation system for automotive service workflows",
    fullDescription:
      "Enterprise-grade conversational AI platform that automates dealership service appointment workflows using advanced LLM integration, reducing manual processes by 70% and improving customer experience.",
    status: "completed",
    category: "web-app",
    featured: true,
    thumbnail: "/projects/dealership-automation-thumbnail.jpg",
    screenshots: [
      "/projects/dealership-automation-1.jpg",
      "/projects/dealership-automation-2.jpg",
    ],
    technologies: [
      { name: "LangChain", category: "backend", proficiency: 9 },
      { name: "Python", category: "backend", proficiency: 9 },
      { name: "AWS SQS", category: "cloud", proficiency: 8 },
      { name: "AWS Lambda", category: "cloud", proficiency: 8 },
      { name: "Docker", category: "tools", proficiency: 8 },
      { name: "PostgreSQL", category: "database", proficiency: 8 },
    ],
    features: [
      {
        title: "Automated Workflow Management",
        description:
          "Intelligent automation of 70% of dealership service appointment processes",
      },
      {
        title: "Real-time Messaging",
        description:
          "Asynchronous messaging system with 66% latency improvement",
      },
      {
        title: "Multi-channel Communication",
        description:
          "Integrated SMS and email channels with dead-letter queue handling",
      },
      {
        title: "LLM-based Validation",
        description:
          "Entity extraction and intent classification with 32% accuracy improvement",
      },
    ],
    challenges: [
      "Integrating with legacy dealership management systems",
      "Ensuring real-time performance across multiple communication channels",
      "Building reliable LLM-based validation middleware",
      "Handling high-concurrency scenarios with message queues",
    ],
    solutions: [
      "Developed robust API adapters for DMS integration",
      "Implemented asynchronous messaging with AWS SQS and DLQ",
      "Created custom LLM validation pipeline with error handling",
      "Designed event-driven architecture for scalable message processing",
    ],
    links: [
      {
        type: "case-study",
        url: "https://impel.ai/case-studies/dealership-automation",
        label: "View Case Study",
      },
    ],
    startDate: "2024-05-01",
    endDate: "2025-05-01",
    teamSize: 4,
    role: "Senior Software Engineer - GenAI",
    metrics: [
      {
        label: "Workflow Automation",
        value: "70% automated",
      },
      {
        label: "Scheduling Time Reduction",
        value: "80% faster",
      },
      {
        label: "Communication Latency",
        value: "66% improvement",
      },
      {
        label: "Appointment Confirmations",
        value: "19% increase",
      },
    ],
  },
  {
    id: "vonage-enterprise-portal",
    title: "Vonage Enterprise Admin Console",
    shortDescription: "Role-based access control system with Okta integration",
    fullDescription:
      "Scalable RBAC admin console built with React/TypeScript and Okta integration, enabling secure multi-tenant user provisioning for enterprise communications platform with 4x adoption growth.",
    status: "completed",
    category: "web-app",
    featured: true,
    thumbnail: "/projects/vonage-portal-thumbnail.jpg",
    screenshots: [
      "/projects/vonage-portal-1.jpg",
      "/projects/vonage-portal-2.jpg",
    ],
    technologies: [
      { name: "React", category: "frontend", proficiency: 9 },
      { name: "TypeScript", category: "frontend", proficiency: 9 },
      { name: "Node.js", category: "backend", proficiency: 9 },
      { name: "AWS", category: "cloud", proficiency: 8 },
      { name: "PostgreSQL", category: "database", proficiency: 8 },
    ],
    features: [
      {
        title: "Role-Based Access Control",
        description:
          "Comprehensive RBAC system with granular permissions and role hierarchies",
      },
      {
        title: "Okta Integration",
        description:
          "Seamless SSO and identity management with Okta authentication",
      },
      {
        title: "Multi-tenant Architecture",
        description:
          "Secure isolation and data segregation for enterprise clients",
      },
      {
        title: "Real-time Monitoring",
        description: "Live user activity tracking and audit logging",
      },
    ],
    challenges: [
      "Designing secure multi-tenant architecture",
      "Integrating complex Okta authentication flows",
      "Building scalable RBAC with performance optimization",
      "Ensuring enterprise-grade security compliance",
    ],
    solutions: [
      "Implemented tenant isolation at database and application layers",
      "Built robust Okta SDK integration with error handling",
      "Optimized role queries with caching and indexing strategies",
      "Applied security best practices and compliance frameworks",
    ],
    links: [
      {
        type: "case-study",
        url: "https://techprescient.com/case-studies/vonage-enterprise-portal",
        label: "View Case Study",
      },
    ],
    startDate: "2022-03-01",
    endDate: "2023-07-01",
    teamSize: 6,
    role: "Lead Frontend Developer",
    metrics: [
      {
        label: "Platform Adoption",
        value: "4x growth",
      },
      {
        label: "User Onboarding",
        value: "60% faster",
      },
      {
        label: "Security Incidents",
        value: "Zero breaches",
      },
    ],
  },
  {
    id: "maritime-data-platform",
    title: "Maritime Analytics Microservice",
    shortDescription:
      "Oceanographic data unification platform for vessel tracking",
    fullDescription:
      "Greenfield microservice that unifies 100+ oceanographic data sources for Maxar, enabling advanced vessel tracking and maritime analytics across 5K+ data points with projected $100K+ revenue impact.",
    status: "completed",
    category: "api",
    featured: true,
    thumbnail: "/projects/maritime-platform-thumbnail.jpg",
    screenshots: ["/projects/maritime-platform-1.jpg"],
    technologies: [
      { name: "Python", category: "backend", proficiency: 9 },
      { name: "FastAPI", category: "backend", proficiency: 8 },
      { name: "PostgreSQL", category: "database", proficiency: 8 },
      { name: "Redis", category: "database", proficiency: 8 },
      { name: "Docker", category: "tools", proficiency: 8 },
      { name: "AWS", category: "cloud", proficiency: 8 },
    ],
    features: [
      {
        title: "Data Source Integration",
        description:
          "Unified access to 100+ disparate oceanographic data sources",
      },
      {
        title: "Real-time Analytics",
        description: "Live vessel tracking and maritime pattern analysis",
      },
      {
        title: "Scalable Architecture",
        description:
          "Microservice design supporting 5K+ concurrent data points",
      },
      {
        title: "API Gateway",
        description:
          "High-performance REST API with rate limiting and authentication",
      },
    ],
    challenges: [
      "Integrating heterogeneous data sources with varying formats",
      "Ensuring real-time performance at scale",
      "Building reliable data validation and quality checks",
      "Designing fault-tolerant distributed architecture",
    ],
    solutions: [
      "Developed standardized ETL pipelines with data transformation",
      "Implemented Redis caching and database optimization",
      "Created comprehensive data validation framework",
      "Built circuit breaker patterns and health monitoring",
    ],
    links: [
      {
        type: "case-study",
        url: "https://techprescient.com/case-studies/maritime-analytics-platform",
        label: "View Case Study",
      },
    ],
    startDate: "2022-08-01",
    endDate: "2023-05-01",
    teamSize: 3,
    role: "Backend Developer",
    metrics: [
      {
        label: "Data Sources Unified",
        value: "100+ sources",
      },
      {
        label: "Data Points Processed",
        value: "5K+ concurrent",
      },
      {
        label: "Revenue Impact",
        value: "$100K+ projected",
      },
    ],
  },
  {
    id: "hr-management-system",
    title: "Enterprise HR Management System",
    shortDescription:
      "Comprehensive payroll and leave management for 3000+ employees",
    fullDescription:
      "Full-stack HR management platform built with Node.js and React, featuring automated payroll processing, leave management, and employee self-service portal, saving 20+ engineering hours per week.",
    status: "completed",
    category: "web-app",
    featured: false,
    thumbnail: "/projects/hr-system-thumbnail.jpg",
    screenshots: ["/projects/hr-system-1.jpg", "/projects/hr-system-2.jpg"],
    technologies: [
      { name: "Node.js", category: "backend", proficiency: 9 },
      { name: "React", category: "frontend", proficiency: 9 },
      { name: "MongoDB", category: "database", proficiency: 8 },
      { name: "Redis", category: "database", proficiency: 8 },
      { name: "Express.js", category: "backend", proficiency: 8 },
    ],
    features: [
      {
        title: "Automated Payroll Processing",
        description:
          "Intelligent payroll calculation with tax compliance and reporting",
      },
      {
        title: "Leave Management System",
        description: "Comprehensive leave tracking with approval workflows",
      },
      {
        title: "Employee Self-Service",
        description:
          "Portal for employees to manage personal information and requests",
      },
      {
        title: "Analytics Dashboard",
        description: "HR metrics and reporting with data visualization",
      },
    ],
    challenges: [
      "Handling complex payroll calculations and compliance",
      "Building scalable system for 3000+ users",
      "Ensuring data security and privacy",
      "Integrating with existing HR systems",
    ],
    solutions: [
      "Implemented modular payroll engine with validation rules",
      "Designed efficient database schema with proper indexing",
      "Applied security best practices and encryption",
      "Built flexible API adapters for system integration",
    ],
    links: [
      {
        type: "case-study",
        url: "https://xoriant.com/case-studies/hr-management-system",
        label: "View Case Study",
      },
    ],
    startDate: "2020-11-01",
    endDate: "2022-03-01",
    teamSize: 5,
    role: "Full-Stack Developer",
    metrics: [
      {
        label: "Users Supported",
        value: "3000+ employees",
      },
      {
        label: "Time Saved",
        value: "20+ hours/week",
      },
      {
        label: "Process Automation",
        value: "85% automated",
      },
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
