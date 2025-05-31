// Education Configuration
// This file contains all education, certification, and achievement information

export interface EducationDegree {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  gpa?: string; // Optional GPA
  honors?: string[]; // Optional honors/distinctions
  relevantCourses?: string[]; // Optional relevant courses
  activities?: string[]; // Optional extracurricular activities
  description?: string; // Optional description
  logo?: string; // Optional institution logo path
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string; // ISO date string
  expiryDate?: string; // Optional expiry date
  credentialId?: string; // Optional credential ID
  credentialUrl?: string; // Optional verification URL
  description: string;
  skills: string[]; // Related skills
  logo?: string; // Optional issuer logo path
  badge?: string; // Optional badge image path
  category:
    | "cloud"
    | "development"
    | "database"
    | "security"
    | "project-management"
    | "design"
    | "other";
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  category:
    | "award"
    | "recognition"
    | "competition"
    | "publication"
    | "speaking"
    | "contribution"
    | "other";
  organization?: string; // Optional organization/issuer
  location?: string; // Optional location
  url?: string; // Optional URL for more details
  image?: string; // Optional achievement image/certificate
}

export interface OnlineCourse {
  id: string;
  title: string;
  provider: string;
  instructor?: string;
  completionDate: string; // ISO date string
  certificateUrl?: string; // Optional certificate URL
  skills: string[]; // Skills learned
  duration?: string; // Course duration
  description: string;
  category:
    | "frontend"
    | "backend"
    | "mobile"
    | "devops"
    | "design"
    | "data"
    | "business"
    | "other";
}

export const education: EducationDegree[] = [
  {
    id: "be-computer-science",
    degree: "Bachelor of Engineering",
    field: "Computer Science",
    institution: "University of Mumbai",
    location: "Mumbai, India",
    startDate: "2015-07-01",
    endDate: "2019-06-30",
    gpa: "8.2/10",
    honors: ["First Class with Distinction"],
    relevantCourses: [
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Software Engineering",
      "Computer Networks",
      "Operating Systems",
      "Web Technologies",
      "Mobile Application Development",
      "Artificial Intelligence",
    ],
    activities: [
      "Technical Lead - College Coding Club",
      "Organized Annual Tech Fest",
      "Participated in Inter-college Programming Competitions",
    ],
    description:
      "Comprehensive computer science education with focus on software development, algorithms, and modern web technologies. Graduated with distinction and active participation in technical activities.",
    logo: "/education/university-of-mumbai-logo.png",
  },
];

export const certifications: Certification[] = [
  {
    id: "aws-developer-associate",
    name: "AWS Certified Developer Associate",
    issuer: "Amazon Web Services",
    issueDate: "2023-03-15",
    expiryDate: "2026-03-15",
    credentialId: "AWS-DEV-2023-YP-001",
    credentialUrl: "https://aws.amazon.com/verification/YP123456",
    description:
      "Validates expertise in developing, deploying, and debugging cloud-based applications using AWS services.",
    skills: [
      "AWS Lambda",
      "AWS DynamoDB",
      "AWS S3",
      "AWS API Gateway",
      "AWS CloudFormation",
      "AWS CodeDeploy",
    ],
    logo: "/certifications/aws-logo.png",
    badge: "/certifications/aws-developer-associate-badge.png",
    category: "cloud",
  },
  {
    id: "mongodb-developer",
    name: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    issueDate: "2022-11-20",
    credentialId: "MONGO-DEV-2022-YP-002",
    credentialUrl: "https://university.mongodb.com/verify/YP789012",
    description:
      "Demonstrates proficiency in MongoDB database design, development, and optimization.",
    skills: [
      "MongoDB Atlas",
      "Aggregation Pipeline",
      "Database Design",
      "Performance Optimization",
      "Indexing Strategies",
    ],
    logo: "/certifications/mongodb-logo.png",
    badge: "/certifications/mongodb-developer-badge.png",
    category: "database",
  },
  {
    id: "google-cloud-architect",
    name: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    issueDate: "2023-08-10",
    expiryDate: "2025-08-10",
    credentialId: "GCP-ARCH-2023-YP-003",
    credentialUrl: "https://cloud.google.com/certification/verify/YP345678",
    description:
      "Validates ability to design, develop, and manage robust, secure, scalable, and dynamic solutions on Google Cloud.",
    skills: [
      "Google Kubernetes Engine",
      "Cloud Functions",
      "Cloud Storage",
      "BigQuery",
      "Cloud SQL",
      "Cloud IAM",
    ],
    logo: "/certifications/gcp-logo.png",
    badge: "/certifications/gcp-architect-badge.png",
    category: "cloud",
  },
];

export const achievements: Achievement[] = [
  {
    id: "hackathon-winner-2023",
    title: "First Place - Mumbai Tech Hackathon 2023",
    description:
      "Won first place in a 48-hour hackathon with a team of 4 developers, building a sustainable transportation solution using React Native and AI.",
    date: "2023-09-15",
    category: "competition",
    organization: "Mumbai Tech Community",
    location: "Mumbai, India",
    url: "https://mumbaitechhackathon.com/2023-winners",
    image: "/achievements/hackathon-2023-certificate.jpg",
  },
  {
    id: "open-source-contributor",
    title: "Top Contributor - React Native Community",
    description:
      "Recognized as one of the top 100 contributors to React Native open source projects with over 50 merged pull requests.",
    date: "2023-12-01",
    category: "contribution",
    organization: "React Native Community",
    url: "https://github.com/react-native-community/contributors",
  },
  {
    id: "tech-talk-speaker",
    title: "Guest Speaker - Next.js Conference 2024",
    description:
      "Delivered a technical talk on 'Advanced Performance Optimization in Next.js' to an audience of 500+ developers.",
    date: "2024-01-20",
    category: "speaking",
    organization: "Vercel",
    location: "San Francisco, CA (Virtual)",
    url: "https://nextjs.org/conf/2024/speakers/yogesh-patil",
  },
];

export const onlineCourses: OnlineCourse[] = [
  {
    id: "advanced-react-patterns",
    title: "Advanced React Patterns",
    provider: "Frontend Masters",
    instructor: "Kent C. Dodds",
    completionDate: "2023-05-15",
    certificateUrl:
      "https://frontendmasters.com/certificates/YP-React-Advanced",
    skills: [
      "React Hooks",
      "Context API",
      "Compound Components",
      "Render Props",
    ],
    duration: "8 hours",
    description:
      "Deep dive into advanced React patterns and architectural decisions for building scalable applications.",
    category: "frontend",
  },
  {
    id: "system-design-fundamentals",
    title: "System Design Fundamentals",
    provider: "Educative",
    completionDate: "2023-07-22",
    skills: [
      "System Architecture",
      "Database Design",
      "Scalability",
      "Load Balancing",
    ],
    duration: "12 hours",
    description:
      "Comprehensive course covering system design principles for building large-scale distributed systems.",
    category: "backend",
  },
  {
    id: "typescript-masterclass",
    title: "TypeScript: The Complete Developer's Guide",
    provider: "Udemy",
    instructor: "Stephen Grider",
    completionDate: "2022-09-10",
    certificateUrl: "https://udemy.com/certificate/UC-YP-TypeScript-2022",
    skills: ["TypeScript", "Type Systems", "Generics", "Decorators"],
    duration: "24 hours",
    description:
      "Master TypeScript from basics to advanced topics including generics, decorators, and integration with React.",
    category: "other",
  },
];

// Helper functions for data access
export function getEducationById(id: string): EducationDegree | undefined {
  return education.find((edu) => edu.id === id);
}

export function getCertificationById(id: string): Certification | undefined {
  return certifications.find((cert) => cert.id === id);
}

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((achievement) => achievement.id === id);
}

export function getCertificationsByCategory(
  category: Certification["category"]
): Certification[] {
  return certifications.filter((cert) => cert.category === category);
}

export function getAchievementsByCategory(
  category: Achievement["category"]
): Achievement[] {
  return achievements.filter(
    (achievement) => achievement.category === category
  );
}

export function getActiveCertifications(): Certification[] {
  const now = new Date();
  return certifications.filter((cert) => {
    if (!cert.expiryDate) return true; // No expiry date means always active
    return new Date(cert.expiryDate) > now;
  });
}

export function getRecentAchievements(limit: number = 3): Achievement[] {
  return achievements
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getAllSkillsFromEducation(): string[] {
  const skills = new Set<string>();

  // Add skills from certifications
  certifications.forEach((cert) => {
    cert.skills.forEach((skill) => skills.add(skill));
  });

  // Add skills from online courses
  onlineCourses.forEach((course) => {
    course.skills.forEach((skill) => skills.add(skill));
  });

  return Array.from(skills).sort();
}

export default {
  education,
  certifications,
  achievements,
  onlineCourses,
};
