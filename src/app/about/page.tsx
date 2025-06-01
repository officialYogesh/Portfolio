"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Linkedin,
  Github,
  Briefcase,
  Pencil,
  Coffee,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout";
import { PrimaryButton, OutlineButton } from "@/components/ui/Button";
import {
  AnimatedContainer,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { personalInfo } from "../../../config/personal-info";

// Animation variants
const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Placeholder for resume download
const handleDownloadResume = () => {
  const resumeContent = `Resume for ${personalInfo.name} - Content to be added.`;
  const blob = new Blob([resumeContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${personalInfo.name.replace(/\s+/g, "_")}_Resume.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const StorySection = () => {
  // This can be expanded in personalInfo.ts or as a dedicated config
  const story = {
    intro: `I'm ${
      personalInfo.name
    }, a ${personalInfo.title.toLowerCase()} based in ${
      personalInfo.location
    }.`,
    journey: personalInfo.bio, // Using existing bio, can be more narrative
    focus:
      "My focus is on creating engaging, accessible & performant interfaces for humans. I enjoy solving complex problems and continuously learning new technologies to build better digital experiences.",
  };

  return (
    <StaggerContainer className="space-y-6 text-lg text-muted leading-relaxed">
      <StaggerItem>
        <motion.p variants={textReveal}>{story.intro}</motion.p>
      </StaggerItem>
      <StaggerItem>
        <motion.p variants={textReveal}>{story.journey}</motion.p>
      </StaggerItem>
      <StaggerItem>
        <motion.p variants={textReveal}>{story.focus}</motion.p>
      </StaggerItem>
    </StaggerContainer>
  );
};

interface InfoBlockProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, icon, children }) => (
  <AnimatedContainer variant="slide" direction="up" className="mb-12">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 text-primary mt-1">{icon}</div>
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-foreground mb-3">{title}</h2>
        <div className="text-muted space-y-4 leading-relaxed">{children}</div>
      </div>
    </div>
  </AnimatedContainer>
);

export default function AboutPage() {
  // Placeholder data, ideally from config
  const workInfo = {
    currentRole:
      "Currently, I work as a Software Development Engineer at Impel AI, focusing on building intelligent and scalable applications.",
    passion:
      "I am passionate about leveraging technology to create innovative solutions that make a tangible impact.",
  };

  const projectsInfo = {
    description:
      "I enjoy working on a variety of projects, from complex web applications to experimental AI prototypes. My goal is always to build something meaningful and well-crafted. You can see some of my work on the projects page.",
    link: "/projects",
  };

  const offlineInfo = {
    interests:
      "When I am not coding or writing about coding, I enjoy exploring new hiking trails, experimenting with photography, and diving into a good science fiction novel. I also have a growing collection of board games.",
  };

  const onlineLinks = personalInfo.socialLinks.filter(
    (link) => link.platform !== "Email" && link.platform !== "Website"
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Container className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <AnimatedContainer variant="fade" className="mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-40 h-40 md:w-48 md:h-48 relative flex-shrink-0">
                {/* Placeholder for actual image */}
                <Image
                  src="/profile-placeholder.png" // You should replace this with an actual image path in /public
                  alt={personalInfo.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
                <div className="absolute inset-0 rounded-full border-2 border-primary/50"></div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
                  Hey there.
                </h1>
                <p className="text-xl text-primary font-medium">
                  I&apos;m {personalInfo.name}.
                </p>
              </div>
            </div>
          </AnimatedContainer>

          {/* Story Section */}
          <AnimatedContainer
            variant="slide"
            direction="up"
            className="mb-16 md:mb-24"
          >
            <StorySection />
          </AnimatedContainer>

          {/* Work Section */}
          <InfoBlock title="Work" icon={<Briefcase size={24} />}>
            <p>{workInfo.currentRole}</p>
            <p>{workInfo.passion}</p>
            {/* You can add a link to your LinkedIn or a more detailed work page if needed */}
          </InfoBlock>

          {/* Projects Section */}
          <InfoBlock title="Projects" icon={<Pencil size={24} />}>
            <p>{projectsInfo.description}</p>
            <a href={projectsInfo.link} className="inline-block mt-4">
              <OutlineButton
                icon={<ChevronRight size={18} />}
                iconPosition="right"
              >
                View My Projects
              </OutlineButton>
            </a>
          </InfoBlock>

          {/* Offline Section */}
          <InfoBlock title="Offline" icon={<Coffee size={24} />}>
            <p>{offlineInfo.interests}</p>
          </InfoBlock>

          {/* Online Section */}
          <InfoBlock title="Online" icon={<Github size={24} />}>
            <ul className="space-y-3">
              {onlineLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline hover:text-accent transition-colors"
                  >
                    {link.platform === "GitHub" && <Github size={20} />}
                    {link.platform === "LinkedIn" && <Linkedin size={20} />}
                    {/* Add other icons as needed */}
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </InfoBlock>

          {/* CTA Buttons at the end */}
          <AnimatedContainer
            variant="fade"
            className="mt-16 md:mt-24 text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton
                onClick={handleDownloadResume}
                icon={<Download className="w-4 h-4" />}
                className="min-w-[180px]"
              >
                Download Resume
              </PrimaryButton>
              <OutlineButton
                icon={<Mail className="w-4 h-4" />}
                onClick={() =>
                  (window.location.href = `mailto:${personalInfo.email}`)
                }
                className="min-w-[180px]"
              >
                Get In Touch
              </OutlineButton>
            </div>
          </AnimatedContainer>
        </div>
      </Container>
    </div>
  );
}
