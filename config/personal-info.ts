// Personal Information Configuration
// This file contains personal details used throughout the portfolio

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
  location: "Remote, New York, USA",
  experience: "4+ years",
  availability: "Open to opportunities",
  tagline:
    "Building scalable AI-powered solutions with modern web technologies",
  bio: "Passionate Software Development Engineer specializing in GenAI solutions, cloud architecture, and full-stack development. With 4+ years of experience building scalable systems at companies like Impel AI and Tech Prescient, I focus on creating intelligent automation that drives real business impact. Expert in LangChain, AWS, and modern JavaScript/TypeScript ecosystems.",
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yogeshpatil28",
      username: "yogeshpatil28",
    },
    {
      platform: "GitHub",
      url: "https://github.com/officialYogesh",
      username: "officialYogesh",
    },
    {
      platform: "Portfolio",
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
