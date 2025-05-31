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
  title: "Full Stack Developer",
  email: "officialyogeshp@gmail.com",
  location: "New York, USA",
  experience: "4+ years",
  availability: "Open to opportunities",
  tagline: "Passionate developer building scalable web applications",
  bio: `Passionate full-stack developer with 5+ years of experience building scalable 
        web applications. Specialized in React, Node.js, and modern JavaScript technologies. 
        Frequently praised as detail-oriented by peers, I can be relied upon to help your 
        company achieve its goals by providing sustainable and scalable solutions.`,
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
      platform: "Email",
      url: "mailto:officialyogeshp@gmail.com",
      username: "officialyogeshp@gmail.com",
    },
  ],
};

export default personalInfo;
