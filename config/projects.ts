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
  thumbnail?: string; // Optional path to thumbnail image
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
    featured: false,
    thumbnail: "/images/projects/Upside Down.png",
    screenshots: [],
    technologies: [
      { name: "Unity", category: "tools", proficiency: 8 },
      { name: "C#", category: "backend", proficiency: 7 },
      { name: "Android", category: "mobile", proficiency: 9 },
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
    status: "in-progress",
    category: "web-app",
    featured: true,
    thumbnail: "/images/projects/JobFitAI.png",
    screenshots: [],
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
        url: "https://jobfitai.iamyogesh.com/",
        label: "Live Demo",
      },
      {
        type: "github",
        url: "https://github.com/officialYogesh/JobFitAI",
        label: "Source Code",
      },
    ],
    startDate: "2025-01-15",
    endDate: "2025-05-30",
    teamSize: 1,
    role: "Full-Stack Developer & AI Engineer",
    metrics: [
      { label: "Accuracy", value: "87%" },
      { label: "User Satisfaction", value: "4.6/5" },
      { label: "Job Matches", value: "10K+" },
      { label: "Processing Speed", value: "<3s" },
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
  const featuredProjects = projects.filter((project) => project.featured);
  return sortProjects(featuredProjects, {
    option: "newest",
    direction: "desc",
  });
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

// Shared sorting utility for consistent sorting across pages
export type SortOption = "featured" | "newest" | "oldest" | "title" | "status";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  option: SortOption;
  direction: SortDirection;
}

export function sortProjects(
  projects: Project[],
  sortConfig: SortConfig
): Project[] {
  return [...projects].sort((a, b) => {
    const { option, direction } = sortConfig;

    switch (option) {
      case "featured":
        const featuredComparison = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return direction === "desc" ? featuredComparison : -featuredComparison;

      case "newest":
        const newestComparison =
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        return direction === "desc" ? newestComparison : -newestComparison;

      case "oldest":
        const oldestComparison =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        return direction === "asc" ? oldestComparison : -oldestComparison;

      case "title":
        const titleComparison = a.title.localeCompare(b.title);
        return direction === "asc" ? titleComparison : -titleComparison;

      case "status":
        const statusOrder = {
          "in-progress": 0,
          completed: 1,
          planned: 2,
          archived: 3,
        };
        const statusComparison = statusOrder[a.status] - statusOrder[b.status];
        return direction === "asc" ? statusComparison : -statusComparison;

      default:
        return 0;
    }
  });
}

export default projects;
