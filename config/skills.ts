// Skills and Technology Configuration
// This file contains all technology skills with proficiency levels

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: number; // 1-10 scale
  experience: string; // Years of experience
  icon?: string; // Icon name or path
  color?: string; // Theme color for bubble UI
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "tools"
  | "cloud"
  | "testing"
  | "mobile";

export interface SkillCategoryInfo {
  name: string;
  displayName: string;
  description: string;
  color: string;
}

export const skillCategories: Record<SkillCategory, SkillCategoryInfo> = {
  frontend: {
    name: "frontend",
    displayName: "Frontend",
    description: "User interface and client-side technologies",
    color: "#61dafb",
  },
  backend: {
    name: "backend",
    displayName: "Backend",
    description: "Server-side development and APIs",
    color: "#68d391",
  },
  database: {
    name: "database",
    displayName: "Database",
    description: "Data storage and management systems",
    color: "#fbb6ce",
  },
  tools: {
    name: "tools",
    displayName: "Tools",
    description: "Development tools and utilities",
    color: "#a78bfa",
  },
  cloud: {
    name: "cloud",
    displayName: "Cloud",
    description: "Cloud platforms and deployment",
    color: "#f6ad55",
  },
  testing: {
    name: "testing",
    displayName: "Testing",
    description: "Testing frameworks and methodologies",
    color: "#fc8181",
  },
  mobile: {
    name: "mobile",
    displayName: "Mobile",
    description: "Mobile app development",
    color: "#4fd1c7",
  },
};

export const skills: Skill[] = [
  // Frontend
  {
    name: "React",
    category: "frontend",
    proficiency: 9,
    experience: "4+ years",
  },
  {
    name: "Next.js",
    category: "frontend",
    proficiency: 8,
    experience: "3+ years",
  },
  {
    name: "TypeScript",
    category: "frontend",
    proficiency: 8,
    experience: "3+ years",
  },
  {
    name: "JavaScript",
    category: "frontend",
    proficiency: 9,
    experience: "5+ years",
  },
  {
    name: "HTML5",
    category: "frontend",
    proficiency: 9,
    experience: "5+ years",
  },
  {
    name: "CSS3",
    category: "frontend",
    proficiency: 8,
    experience: "5+ years",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    proficiency: 8,
    experience: "2+ years",
  },
  {
    name: "Sass/SCSS",
    category: "frontend",
    proficiency: 7,
    experience: "3+ years",
  },
  {
    name: "Vue.js",
    category: "frontend",
    proficiency: 6,
    experience: "1+ years",
  },
  {
    name: "Angular",
    category: "frontend",
    proficiency: 5,
    experience: "1+ years",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    proficiency: 8,
    experience: "4+ years",
  },
  {
    name: "Express.js",
    category: "backend",
    proficiency: 8,
    experience: "4+ years",
  },
  {
    name: "Nest.js",
    category: "backend",
    proficiency: 7,
    experience: "2+ years",
  },
  {
    name: "Python",
    category: "backend",
    proficiency: 6,
    experience: "2+ years",
  },
  {
    name: "Django",
    category: "backend",
    proficiency: 5,
    experience: "1+ years",
  },
  {
    name: "FastAPI",
    category: "backend",
    proficiency: 5,
    experience: "1+ years",
  },

  // Database
  {
    name: "MongoDB",
    category: "database",
    proficiency: 8,
    experience: "3+ years",
  },
  {
    name: "PostgreSQL",
    category: "database",
    proficiency: 7,
    experience: "2+ years",
  },
  {
    name: "MySQL",
    category: "database",
    proficiency: 6,
    experience: "2+ years",
  },
  {
    name: "Redis",
    category: "database",
    proficiency: 6,
    experience: "1+ years",
  },

  // Tools
  { name: "Git", category: "tools", proficiency: 9, experience: "5+ years" },
  { name: "Docker", category: "tools", proficiency: 7, experience: "2+ years" },
  {
    name: "Webpack",
    category: "tools",
    proficiency: 6,
    experience: "2+ years",
  },
  { name: "Vite", category: "tools", proficiency: 7, experience: "1+ years" },

  // Cloud
  { name: "AWS", category: "cloud", proficiency: 6, experience: "2+ years" },
  { name: "Vercel", category: "cloud", proficiency: 8, experience: "2+ years" },
  {
    name: "Netlify",
    category: "cloud",
    proficiency: 7,
    experience: "2+ years",
  },

  // Testing
  { name: "Jest", category: "testing", proficiency: 7, experience: "2+ years" },
  {
    name: "Cypress",
    category: "testing",
    proficiency: 6,
    experience: "1+ years",
  },
  {
    name: "React Testing Library",
    category: "testing",
    proficiency: 7,
    experience: "2+ years",
  },

  // Mobile
  {
    name: "React Native",
    category: "mobile",
    proficiency: 5,
    experience: "1+ years",
  },
];

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((skill) => skill.category === category);
}

export function getAllCategories(): SkillCategory[] {
  return Object.keys(skillCategories) as SkillCategory[];
}

export default skills;
