// Personal Information Configuration
// This file contains all personal and professional information

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  experience: string;
  availability: string;
  tagline: string;
  bio: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
}

export const personalInfo: PersonalInfo = {
  name: "Yogesh Patil",
  title: "Software Development Engineer",
  email: "officialyogeshp@gmail.com",
  location: "New York, USA",
  experience: "4+ years",
  availability: "Open to opportunities",
  tagline: "Building scalable applications with AI/LLM integration",
  bio: `Passionate Software Development Engineer with 4+ years of experience building scalable web applications and GenAI solutions. Currently working at Impel AI, specializing in LangChain-powered GenAI pipelines, microservices architecture, and cloud infrastructure. Proven track record of improving system performance by 66%+, automating 70% of workflows, and enabling significant revenue growth through innovative technical solutions.`,
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/officialYogesh",
      username: "@officialYogesh",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/yogeshpatil28/",
      username: "Yogesh Patil",
    },
    {
      platform: "Website",
      url: "https://iamyogesh.com",
      username: "iamyogesh.com",
    },
    {
      platform: "Email",
      url: "mailto:officialyogeshp@gmail.com",
      username: "officialyogeshp@gmail.com",
    },
  ],
};

export default personalInfo;
