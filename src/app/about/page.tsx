"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowDown,
  BookOpen,
  Download,
  Mail,
  Linkedin,
  Github,
} from "lucide-react";

// Components
import { Container } from "@/components/layout/Container";
import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import {
  ReadingProgress,
  StorySection,
  JourneyTimeline,
  PhilosophyCards,
  NarrativeCTA,
  SectionDivider,
} from "@/components/ui/ScrollytellComponents";
import {
  ReadingTimeEstimator,
  SectionNavigation,
  ProgressIndicator,
} from "@/components/ui/ReadingTimeEstimator";
import { PrimaryButton, OutlineButton } from "@/components/ui/Button";

// Data
import { aboutPageContent } from "../../../config/about-content";
import { personalInfo } from "../../../config/personal-info";

// Types
interface StoryItem {
  content: string[];
  anecdote?: string;
  highlight?: string;
}

interface PersonalJourneyItem {
  description: string;
  growth: string;
}

interface WorkPhilosophyItem {
  principle: string;
  description: string;
}

interface InterestItem {
  activity: string;
  description: string;
  connection?: string;
}

// Hooks
import {
  useScrollProgress,
  useParallax,
  useSectionTracking,
  useSmoothScroll,
  useThemeAwareAnimations,
  useReadingTime,
  useErrorHandling,
} from "../../hooks/useScrollEffects";

// Error Boundary Component
const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { errors, handleError } = useErrorHandling();

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      handleError(new Error(event.message));
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, [handleError]);

  if (errors.length > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Something went wrong
          </h2>
          <p className="text-muted">Please refresh the page and try again.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Main content preparation
const prepareContentForReading = (content: typeof aboutPageContent) => {
  const sections = [
    content.storyArc.introduction,
    ...content.storyArc.journey,
    content.storyArc.currentState,
    content.storyArc.futureAspirations,
  ];

  return (
    sections
      .map(
        (section: StoryItem) =>
          section.content.join(" ") +
          (section.anecdote || "") +
          (section.highlight || "")
      )
      .join(" ") +
    content.personalJourney
      .map((phase: PersonalJourneyItem) => phase.description + phase.growth)
      .join(" ") +
    content.workPhilosophy
      .map((phil: WorkPhilosophyItem) => phil.description)
      .join(" ")
  );
};

const AboutPage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Hooks
  const scrollProgress = useScrollProgress();
  const heroParallax = useParallax(-0.3);
  const { getThemeAnimations } = useThemeAwareAnimations();
  const { scrollToSection } = useSmoothScroll();

  // Section tracking
  const sectionIds = [
    "hero",
    "story-introduction",
    "story-journey",
    "story-current",
    "story-future",
    "professional-journey",
    "work-philosophy",
    "work-info",
    "projects-info",
    "offline-info",
    "connect",
  ];

  const { activeSection, completedSections } = useSectionTracking(sectionIds);

  // Content and reading time
  const fullContent = useMemo(
    () => prepareContentForReading(aboutPageContent),
    []
  );
  useReadingTime(fullContent);

  // Navigation sections
  const navigationSections = useMemo(
    () => [
      {
        id: "hero",
        title: "Introduction",
        completed: completedSections.has("hero"),
      },
      {
        id: "story-introduction",
        title: "Story Beginning",
        completed: completedSections.has("story-introduction"),
      },
      {
        id: "story-journey",
        title: "The Journey",
        completed: completedSections.has("story-journey"),
      },
      {
        id: "professional-journey",
        title: "Professional Path",
        completed: completedSections.has("professional-journey"),
      },
      {
        id: "work-philosophy",
        title: "Work Philosophy",
        completed: completedSections.has("work-philosophy"),
      },
      {
        id: "connect",
        title: "Let&apos;s Connect",
        completed: completedSections.has("connect"),
      },
    ],
    [completedSections]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation variants
  const themeAnimations = getThemeAnimations();

  const heroImageVariants = {
    initial: { scale: 1.1, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Handlers
  const handleDownloadResume = () => {
    try {
      const resumeContent = `${personalInfo.name} - Resume
      
${personalInfo.title}
Email: ${personalInfo.email}
Location: ${personalInfo.location}
Experience: ${personalInfo.experience}

${personalInfo.bio}

Professional Summary:
${aboutPageContent.storyArc.currentState.content.join("\n")}

Work Philosophy:
${aboutPageContent.workPhilosophy
  .map((phil: WorkPhilosophyItem) => `${phil.principle}: ${phil.description}`)
  .join("\n")}

Generated on: ${new Date().toLocaleDateString()}`;

      const blob = new Blob([resumeContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${personalInfo.name.replace(/\s+/g, "-")}-Resume.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

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
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Progress Indicator */}
        <ProgressIndicator progress={scrollProgress} />

        {/* Reading Progress */}
        <ReadingProgress className="fixed top-16 left-0 right-0 z-40" />

        {/* Side Navigation (Desktop) */}
        <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-30">
          <SectionNavigation
            sections={navigationSections}
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />
        </div>

        <main className="relative">
          {/* Hero Section */}
          <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden"
          >
            {/* Parallax Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"
              style={{ y: heroParallax }}
            />

            <Container size="xl" className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <motion.div
                  variants={themeAnimations}
                  initial="initial"
                  animate="animate"
                  className="lg:order-1 space-y-8"
                >
                  {/* Reading Time */}
                  <ReadingTimeEstimator
                    content={fullContent}
                    className="flex items-center space-x-2"
                  />

                  <StaggerContainer>
                    <StaggerItem>
                      <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                        {hero.greeting}
                      </h1>
                    </StaggerItem>

                    <StaggerItem>
                      <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
                        {hero.introduction}
                      </p>
                    </StaggerItem>

                    <StaggerItem>
                      <p className="text-lg text-accent font-medium">
                        {hero.tagline}
                      </p>
                    </StaggerItem>

                    <StaggerItem>
                      <p className="text-base text-foreground/70 italic">
                        {hero.personalTouch}
                      </p>
                    </StaggerItem>
                  </StaggerContainer>

                  <motion.div
                    variants={themeAnimations}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <PrimaryButton
                      onClick={handleDownloadResume}
                      icon={<Download size={18} />}
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Download Resume
                    </PrimaryButton>

                    <OutlineButton
                      onClick={() => scrollToSection("story-introduction")}
                      icon={<BookOpen size={18} />}
                      size="lg"
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      Read My Story
                    </OutlineButton>
                  </motion.div>

                  {/* Scroll Indicator */}
                  <motion.div
                    variants={themeAnimations}
                    className="flex items-center space-x-2 text-muted animate-bounce"
                  >
                    <ArrowDown size={16} />
                    <span className="text-sm">Scroll to explore</span>
                  </motion.div>
                </motion.div>

                {/* Enhanced Image Section */}
                <motion.div
                  variants={heroImageVariants}
                  initial="initial"
                  animate="animate"
                  className="lg:order-2 flex justify-center"
                >
                  <div className="relative">
                    {/* Profile Image with Enhanced Styling */}
                    <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                      <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        {!imageError ? (
                          <Image
                            src="/images/profile/profile.jpg"
                            alt={`${personalInfo.name} - ${personalInfo.title}`}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover rounded-3xl"
                            priority
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            onError={() => setImageError(true)}
                            sizes="(max-width: 768px) 320px, 400px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl">
                            <div className="text-center space-y-2">
                              <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-2xl font-bold text-primary">
                                  {personalInfo.name.charAt(0)}
                                </span>
                              </div>
                              <p className="text-sm text-muted">
                                Profile Photo
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-xl"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </Container>
          </section>

          {/* Story Arc Sections */}
          <SectionDivider />

          {/* Story Introduction */}
          <section id="story-introduction" className="py-20">
            <Container size="xl">
              <StorySection
                title={storyArc.introduction.title}
                subtitle={storyArc.introduction.subtitle}
                content={storyArc.introduction.content}
                anecdote={storyArc.introduction.anecdote}
                highlight={storyArc.introduction.highlight}
                emotion={storyArc.introduction.emotion}
                visualCue={storyArc.introduction.visualCue}
              />
            </Container>
          </section>

          <SectionDivider />

          {/* Story Journey */}
          <section
            id="story-journey"
            className="py-20 bg-gradient-to-br from-secondary/5 to-accent/5"
          >
            <Container size="xl">
              <div className="space-y-16">
                {storyArc.journey.map(
                  (
                    section: StoryItem & {
                      id: string;
                      title?: string;
                      subtitle?: string;
                      emotion?: string;
                      visualCue?: string;
                    },
                    index: number
                  ) => (
                    <StorySection
                      key={section.id}
                      title={section.title || ""}
                      subtitle={section.subtitle}
                      content={section.content}
                      anecdote={section.anecdote}
                      highlight={section.highlight}
                      emotion={
                        section.emotion as
                          | "curiosity"
                          | "challenge"
                          | "growth"
                          | "achievement"
                          | "reflection"
                          | undefined
                      }
                      visualCue={section.visualCue}
                      delay={index * 0.2}
                    />
                  )
                )}
              </div>
            </Container>
          </section>

          {/* Professional Journey Timeline */}
          <section id="professional-journey" className="py-20">
            <Container size="xl">
              <AnimatedContainer className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Professional Journey
                </h2>
                <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                  Key phases that shaped my professional development and
                  expertise
                </p>
              </AnimatedContainer>

              <JourneyTimeline phases={personalJourney} />
            </Container>
          </section>

          <SectionDivider />

          {/* Work Philosophy */}
          <section
            id="work-philosophy"
            className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5"
          >
            <Container size="xl">
              <AnimatedContainer className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Work Philosophy
                </h2>
                <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                  The principles that guide my approach to software development
                  and collaboration
                </p>
              </AnimatedContainer>

              <PhilosophyCards philosophies={workPhilosophy} />
            </Container>
          </section>

          {/* Current State */}
          <section id="story-current" className="py-20">
            <Container size="xl">
              <StorySection
                title={storyArc.currentState.title}
                subtitle={storyArc.currentState.subtitle}
                content={storyArc.currentState.content}
                anecdote={storyArc.currentState.anecdote}
                highlight={storyArc.currentState.highlight}
                emotion={storyArc.currentState.emotion}
                visualCue={storyArc.currentState.visualCue}
              />
            </Container>
          </section>

          {/* Future Aspirations */}
          <section
            id="story-future"
            className="py-20 bg-gradient-to-br from-accent/5 to-primary/5"
          >
            <Container size="xl">
              <StorySection
                title={storyArc.futureAspirations.title}
                subtitle={storyArc.futureAspirations.subtitle}
                content={storyArc.futureAspirations.content}
                anecdote={storyArc.futureAspirations.anecdote}
                highlight={storyArc.futureAspirations.highlight}
                emotion={storyArc.futureAspirations.emotion}
                visualCue={storyArc.futureAspirations.visualCue}
              />
            </Container>
          </section>

          <SectionDivider />

          {/* Work Info Section */}
          <section id="work-info" className="py-20">
            <Container size="xl">
              <NarrativeCTA
                title={workInfo.title}
                description={workInfo.description}
                href={workInfo.link || "#"}
                variant="primary"
              />
            </Container>
          </section>

          {/* Projects Info Section */}
          <section
            id="projects-info"
            className="py-20 bg-gradient-to-br from-secondary/5 to-accent/5"
          >
            <Container size="xl">
              <NarrativeCTA
                title={projectsInfo.title}
                description={projectsInfo.description}
                href={projectsInfo.link}
                variant="secondary"
              />
            </Container>
          </section>

          {/* Offline Interests */}
          <section id="offline-info" className="py-20">
            <Container size="xl">
              <AnimatedContainer className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {offlineInfo.title}
                </h2>
                <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-8">
                  {offlineInfo.description}
                </p>
              </AnimatedContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {offlineInfo.interests.map(
                  (interest: InterestItem, index: number) => (
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
                  )
                )}
              </div>
            </Container>
          </section>

          {/* Connect Section */}
          <section
            id="connect"
            className="py-20 bg-gradient-to-br from-primary/5 to-accent/5"
          >
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
                    {connectInfo.preferredChannels.map(
                      (channel: string, index: number) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {channel}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </AnimatedContainer>
            </Container>
          </section>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default AboutPage;
