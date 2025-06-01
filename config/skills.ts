// Skills Configuration
// This file contains all technical skills and expertise

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
  | "mobile"
  | "ai";

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
    color: "#3b82f6",
  },
  backend: {
    name: "backend",
    displayName: "Backend",
    description: "Server-side technologies and APIs",
    color: "#10b981",
  },
  database: {
    name: "database",
    displayName: "Database",
    description: "Data storage and management systems",
    color: "#8b5cf6",
  },
  cloud: {
    name: "cloud",
    displayName: "Cloud & DevOps",
    description: "Cloud platforms and deployment technologies",
    color: "#f59e0b",
  },
  tools: {
    name: "tools",
    displayName: "Tools & Utilities",
    description: "Development tools and productivity software",
    color: "#ef4444",
  },
  testing: {
    name: "testing",
    displayName: "Testing",
    description: "Testing frameworks and quality assurance",
    color: "#06b6d4",
  },
  mobile: {
    name: "mobile",
    displayName: "Mobile",
    description: "Mobile application development",
    color: "#8b5cf6",
  },
  ai: {
    name: "ai",
    displayName: "AI/LLM",
    description: "Artificial Intelligence and Large Language Models",
    color: "#ec4899",
  },
};

export const skills: Skill[] = [
  // AI/LLM Technologies
  {
    name: "LangChain",
    category: "ai",
    proficiency: 9,
    experience: "2+ years",
    icon: "🦜",
  },
  {
    name: "RAG",
    category: "ai",
    proficiency: 8,
    experience: "1+ years",
    icon: "🔍",
  },
  {
    name: "Prompt Engineering",
    category: "ai",
    proficiency: 8,
    experience: "2+ years",
    icon: "✨",
  },
  {
    name: "A/B Testing",
    category: "ai",
    proficiency: 7,
    experience: "1+ years",
    icon: "📊",
  },

  // Backend Technologies
  {
    name: "Python",
    category: "backend",
    proficiency: 9,
    experience: "4+ years",
    icon: "🐍",
  },
  {
    name: "Node.js",
    category: "backend",
    proficiency: 9,
    experience: "4+ years",
    icon: "🟢",
  },
  {
    name: "FastAPI",
    category: "backend",
    proficiency: 8,
    experience: "2+ years",
    icon: "⚡",
  },
  {
    name: "GraphQL",
    category: "backend",
    proficiency: 7,
    experience: "2+ years",
    icon: "◉",
  },
  {
    name: "Express.js",
    category: "backend",
    proficiency: 8,
    experience: "3+ years",
    icon: "📦",
  },
  {
    name: "Microservices",
    category: "backend",
    proficiency: 8,
    experience: "3+ years",
    icon: "🏗️",
  },
  {
    name: "REST APIs",
    category: "backend",
    proficiency: 9,
    experience: "4+ years",
    icon: "🔗",
  },
  {
    name: "Event-Driven Architecture",
    category: "backend",
    proficiency: 8,
    experience: "2+ years",
    icon: "⚡",
  },

  // Frontend Technologies
  {
    name: "React",
    category: "frontend",
    proficiency: 9,
    experience: "4+ years",
    icon: "⚛️",
  },
  {
    name: "TypeScript",
    category: "frontend",
    proficiency: 9,
    experience: "3+ years",
    icon: "📘",
  },
  {
    name: "JavaScript",
    category: "frontend",
    proficiency: 9,
    experience: "4+ years",
    icon: "📜",
  },
  {
    name: "Next.js",
    category: "frontend",
    proficiency: 8,
    experience: "2+ years",
    icon: "▲",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    proficiency: 8,
    experience: "2+ years",
    icon: "🎨",
  },

  // Cloud & DevOps
  {
    name: "AWS Lambda",
    category: "cloud",
    proficiency: 8,
    experience: "3+ years",
    icon: "λ",
  },
  {
    name: "AWS API Gateway",
    category: "cloud",
    proficiency: 8,
    experience: "3+ years",
    icon: "🚪",
  },
  {
    name: "AWS S3",
    category: "cloud",
    proficiency: 8,
    experience: "3+ years",
    icon: "🪣",
  },
  {
    name: "AWS CloudWatch",
    category: "cloud",
    proficiency: 7,
    experience: "2+ years",
    icon: "👁️",
  },
  {
    name: "AWS SNS/SQS",
    category: "cloud",
    proficiency: 8,
    experience: "2+ years",
    icon: "📨",
  },
  {
    name: "GCP Cloud Functions",
    category: "cloud",
    proficiency: 7,
    experience: "2+ years",
    icon: "⚡",
  },
  {
    name: "Firebase",
    category: "cloud",
    proficiency: 7,
    experience: "2+ years",
    icon: "🔥",
  },
  {
    name: "Docker",
    category: "cloud",
    proficiency: 8,
    experience: "3+ years",
    icon: "🐳",
  },
  {
    name: "Kubernetes",
    category: "cloud",
    proficiency: 7,
    experience: "2+ years",
    icon: "☸️",
  },
  {
    name: "GitHub Actions",
    category: "cloud",
    proficiency: 8,
    experience: "3+ years",
    icon: "⚙️",
  },
  {
    name: "CI/CD Pipelines",
    category: "cloud",
    proficiency: 8,
    experience: "3+ years",
    icon: "🔄",
  },

  // Databases
  {
    name: "PostgreSQL",
    category: "database",
    proficiency: 8,
    experience: "3+ years",
    icon: "🐘",
  },
  {
    name: "MongoDB",
    category: "database",
    proficiency: 8,
    experience: "4+ years",
    icon: "🍃",
  },
  {
    name: "Redis",
    category: "database",
    proficiency: 7,
    experience: "2+ years",
    icon: "🔴",
  },
  {
    name: "DynamoDB",
    category: "database",
    proficiency: 7,
    experience: "2+ years",
    icon: "💾",
  },
  {
    name: "SQL",
    category: "database",
    proficiency: 8,
    experience: "4+ years",
    icon: "📊",
  },

  // Tools & Development
  {
    name: "Git",
    category: "tools",
    proficiency: 9,
    experience: "4+ years",
    icon: "📝",
  },
  {
    name: "VS Code",
    category: "tools",
    proficiency: 9,
    experience: "4+ years",
    icon: "💻",
  },
  {
    name: "Postman",
    category: "tools",
    proficiency: 8,
    experience: "3+ years",
    icon: "📮",
  },
  {
    name: "Webpack",
    category: "tools",
    proficiency: 7,
    experience: "2+ years",
    icon: "📦",
  },
  {
    name: "npm/yarn",
    category: "tools",
    proficiency: 9,
    experience: "4+ years",
    icon: "📦",
  },

  // Testing
  {
    name: "Jest",
    category: "testing",
    proficiency: 7,
    experience: "2+ years",
    icon: "🃏",
  },
  {
    name: "Cypress",
    category: "testing",
    proficiency: 6,
    experience: "1+ years",
    icon: "🌲",
  },
  {
    name: "Unit Testing",
    category: "testing",
    proficiency: 8,
    experience: "3+ years",
    icon: "🧪",
  },
];

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((skill) => skill.category === category);
}

export function getAllCategories(): SkillCategory[] {
  return Object.keys(skillCategories) as SkillCategory[];
}

export function getSkillByName(name: string): Skill | undefined {
  return skills.find(
    (skill) => skill.name.toLowerCase() === name.toLowerCase()
  );
}

export function getTopSkills(limit: number = 10): Skill[] {
  return skills.sort((a, b) => b.proficiency - a.proficiency).slice(0, limit);
}

export function getSkillsWithMinProficiency(minProficiency: number): Skill[] {
  return skills.filter((skill) => skill.proficiency >= minProficiency);
}

export default skills;
