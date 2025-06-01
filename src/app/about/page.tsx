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
  ArrowDown,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout";
import { PrimaryButton, OutlineButton } from "@/components/ui/Button";
import { AnimatedContainer } from "@/components/animations";
import {
  ReadingProgress,
  StorySection,
  JourneyTimeline,
  PhilosophyCards,
  NarrativeCTA,
  SectionDivider,
} from "@/components/ui/ScrollytellComponents";
import { personalInfo } from "../../../config/personal-info";
import { aboutPageContent } from "../../../config/about-content";

// Animation variants for enhanced storytelling
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const heroImageVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

// Enhanced resume download with better UX
const handleDownloadResume = () => {
  // Create a more comprehensive resume content
  const resumeContent = `
${personalInfo.name}
${personalInfo.title}
${personalInfo.email} | ${personalInfo.location}

PROFESSIONAL SUMMARY
${aboutPageContent.hero.introduction}

TECHNICAL EXPERTISE
${aboutPageContent.workInfo.highlights.join("\n")}

WORK PHILOSOPHY
${aboutPageContent.workPhilosophy
  .map((p) => `${p.principle}: ${p.description}`)
  .join("\n\n")}

PROFESSIONAL JOURNEY
${aboutPageContent.personalJourney
  .map(
    (j) =>
      `${j.title} (${j.period})\n${j.description}\nKey Achievement: ${
        j.keyMoment || j.growth
      }`
  )
  .join("\n\n")}

APPROACH
${aboutPageContent.workInfo.approach}
  `.trim();

  const blob = new Blob([resumeContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${personalInfo.name.replace(" ", "_")}_Resume.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Smooth scroll utility for enhanced navigation
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export default function AboutPage() {
  const {
    hero,
    storyArc,
    personalJourney,
    workPhilosophy,
    workInfo,
    projectsInfo,
    offlineInfo,
    connectInfo,
  } = aboutPageContent;

  return (
    <>
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <main className="min-h-screen">
        {/* Hero Section with Narrative Introduction */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(var(--primary),0.1),transparent_50%)]" />

          <Container size="xl" className="relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20"
            >
              {/* Content */}
              <div className="space-y-8 lg:order-1">
                <motion.div variants={fadeInUp} className="space-y-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {hero.greeting.split(" ")[0]}
                    </span>
                    <br />
                    <span className="text-foreground">
                      {hero.greeting.split(" ").slice(1).join(" ")}
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-primary font-medium">
                    {hero.tagline}
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-6">
                  <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                    {hero.introduction}
                  </p>

                  <p className="text-base text-foreground/80 leading-relaxed">
                    {hero.personalTouch}
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <PrimaryButton
                    onClick={handleDownloadResume}
                    icon={<Download size={18} />}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Download Resume
                  </PrimaryButton>

                  <OutlineButton
                    onClick={() => scrollToSection("story")}
                    icon={<BookOpen size={18} />}
                    size="lg"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    Read My Story
                  </OutlineButton>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center space-x-2 text-muted animate-bounce"
                >
                  <ArrowDown size={16} />
                  <span className="text-sm">Scroll to explore</span>
                </motion.div>
              </div>

              {/* Enhanced Image Section */}
              <motion.div
                variants={heroImageVariants}
                className="lg:order-2 flex justify-center"
              >
                <div className="relative">
                  {/* Profile Image with Enhanced Styling */}
                  <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                    <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <Image
                        src="/api/placeholder/400/400" // Placeholder - replace with actual image
                        alt={`${personalInfo.name} - ${personalInfo.title}`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover rounded-3xl"
                        priority
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-60 animate-pulse" />
                  <div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full opacity-40 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                  <div
                    className="absolute top-1/2 -right-8 w-4 h-4 bg-secondary rounded-full opacity-50 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Story Arc Section */}
        <section id="story" className="py-20 bg-background/50">
          <Container size="xl">
            {/* Introduction */}
            <StorySection
              {...storyArc.introduction}
              delay={0}
              className="mb-20"
            />

            <SectionDivider />

            {/* Journey Sections */}
            <div className="space-y-20">
              {storyArc.journey.map((section, index) => (
                <StorySection key={section.id} {...section} delay={index + 1} />
              ))}
            </div>

            <SectionDivider />

            {/* Current State */}
            <StorySection
              {...storyArc.currentState}
              delay={storyArc.journey.length + 1}
              className="mb-20"
            />

            <SectionDivider />

            {/* Future Aspirations */}
            <StorySection
              {...storyArc.futureAspirations}
              delay={storyArc.journey.length + 2}
            />
          </Container>
        </section>

        {/* Journey Timeline Section */}
        <section className="py-20 bg-card/30">
          <Container size="xl">
            <AnimatedContainer className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                My Professional Journey
              </h2>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                From curious beginner to experienced developer, here&apos;s how
                my career has evolved through different phases of growth and
                learning.
              </p>
            </AnimatedContainer>

            <JourneyTimeline phases={personalJourney} />
          </Container>
        </section>

        {/* Work Philosophy Section */}
        <section className="py-20">
          <Container size="xl">
            <AnimatedContainer className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                How I Work
              </h2>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                These principles guide my approach to development and
                collaboration, shaping how I build solutions and work with
                teams.
              </p>
            </AnimatedContainer>

            <PhilosophyCards philosophies={workPhilosophy} />
          </Container>
        </section>

        {/* Work, Projects, and Life Sections */}
        <section className="py-20 bg-card/20">
          <Container size="xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Work */}
              <AnimatedContainer delay={0.1}>
                <NarrativeCTA
                  title={workInfo.title}
                  description={workInfo.description}
                  href={workInfo.link || "/resume"}
                  icon={<Briefcase className="w-5 h-5" />}
                  variant="primary"
                  className="h-full"
                />
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold text-foreground">Key Areas:</h4>
                  <ul className="space-y-2">
                    {workInfo.highlights.slice(0, 3).map((highlight, index) => (
                      <li
                        key={index}
                        className="text-sm text-foreground/80 flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-foreground/70 italic mt-4">
                    {workInfo.approach}
                  </p>
                </div>
              </AnimatedContainer>

              {/* Projects */}
              <AnimatedContainer delay={0.2}>
                <NarrativeCTA
                  title={projectsInfo.title}
                  description={projectsInfo.description}
                  href={projectsInfo.link}
                  icon={<Pencil className="w-5 h-5" />}
                  variant="secondary"
                  className="h-full"
                />
                <div className="mt-6">
                  <p className="text-sm text-foreground/70 italic">
                    {projectsInfo.passion}
                  </p>
                </div>
              </AnimatedContainer>

              {/* Beyond Code */}
              <AnimatedContainer delay={0.3}>
                <NarrativeCTA
                  title={offlineInfo.title}
                  description={offlineInfo.description}
                  href="#interests"
                  icon={<Coffee className="w-5 h-5" />}
                  variant="accent"
                  className="h-full"
                />
                <div className="mt-6 space-y-3">
                  {offlineInfo.interests.slice(0, 2).map((interest, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium text-foreground">
                        {interest.activity}:
                      </span>
                      <p className="text-foreground/70 text-xs mt-1">
                        {interest.description}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedContainer>
            </div>
          </Container>
        </section>

        {/* Detailed Interests Section */}
        <section id="interests" className="py-20">
          <Container size="xl">
            <AnimatedContainer className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Beyond the Code
              </h2>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                My interests outside of work often inform and inspire my
                professional approach.
              </p>
            </AnimatedContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offlineInfo.interests.map((interest, index) => (
                <AnimatedContainer key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 bg-card/50 rounded-xl border border-border/50 h-full"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {interest.activity}
                    </h3>
                    <p className="text-foreground/80 mb-4">
                      {interest.description}
                    </p>
                    {interest.connection && (
                      <div className="pt-4 border-t border-border/30">
                        <p className="text-sm text-foreground/60 italic">
                          <strong>How it connects:</strong>{" "}
                          {interest.connection}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatedContainer>
              ))}
            </div>
          </Container>
        </section>

        {/* Connect Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <Container size="xl">
            <AnimatedContainer className="text-center space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  {connectInfo.title}
                </h2>
                <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                  {connectInfo.description}
                </p>
                <p className="text-base text-foreground/70 max-w-2xl mx-auto">
                  {connectInfo.invitation}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href={`mailto:${personalInfo.email}`}>
                  <PrimaryButton icon={<Mail size={18} />} size="lg">
                    Send Email
                  </PrimaryButton>
                </a>

                <a
                  href={
                    personalInfo.socialLinks.find(
                      (link) => link.platform === "LinkedIn"
                    )?.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <OutlineButton icon={<Linkedin size={18} />} size="lg">
                    Connect on LinkedIn
                  </OutlineButton>
                </a>

                <a
                  href={
                    personalInfo.socialLinks.find(
                      (link) => link.platform === "GitHub"
                    )?.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <OutlineButton icon={<Github size={18} />} size="lg">
                    View GitHub
                  </OutlineButton>
                </a>
              </div>

              <div className="pt-8">
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  Preferred Communication Channels
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {connectInfo.preferredChannels.map((channel, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedContainer>
          </Container>
        </section>
      </main>
    </>
  );
}
