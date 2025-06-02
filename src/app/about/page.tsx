"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Mail, Linkedin, Github, BookOpen } from "lucide-react";

// Components
import { Container } from "@/components/layout/Container";
import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import {
  ReadingProgress,
  StorySection,
  JourneyTimeline,
  PhilosophyCards,
  SectionDivider,
} from "@/components/ui/ScrollytellComponents";
import {
  ReadingTimeEstimator,
  SectionNavigation,
  ProgressIndicator,
} from "@/components/ui/ReadingTimeEstimator";
import { PrimaryButton, OutlineButton } from "@/components/ui/Button";
import { CitySkylinesIllustration } from "@/components/illustrations/AboutPageIllustrations";

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
  // Hooks
  const scrollProgress = useScrollProgress();
  const { theme, getThemeAnimations } = useThemeAwareAnimations();
  const { scrollToSection } = useSmoothScroll();

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Section tracking
  const sectionIds = [
    "hero",
    "story-introduction",
    "story-journey",
    "story-current",
    "story-future",
    "professional-journey",
    "work-philosophy",
    "offline-info",
    "connect",
  ];

  const { activeSection, completedSections } = useSectionTracking(sectionIds);

  // Content and reading time - memoized for performance
  const fullContent = useMemo(
    () => prepareContentForReading(aboutPageContent),
    []
  );
  useReadingTime(fullContent);

  // Navigation sections - memoized for performance
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
        id: "offline-info",
        title: "Offline Interests",
        completed: completedSections.has("offline-info"),
      },
      {
        id: "connect",
        title: "Let's Connect",
        completed: completedSections.has("connect"),
      },
    ],
    [completedSections]
  );

  // Animation variants - memoized for performance
  const parallaxTextVariants = useMemo(() => {
    if (hasMounted && theme) {
      return getThemeAnimations();
    }
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { type: "spring", stiffness: 200, damping: 20, mass: 0.9 },
    };
  }, [getThemeAnimations, hasMounted, theme]);

  const heroImageVariants = useMemo(
    () => ({
      initial: { scale: 1.1, opacity: 0 },
      animate: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    }),
    []
  );

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

  // Extract content data
  const {
    hero,
    storyArc,
    personalJourney,
    workPhilosophy,
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

        <main className="relative xl:flex">
          {/* Side Navigation (Desktop Only) - Hidden on Mobile & iPad */}
          <aside className="hidden xl:block xl:w-64 xl:flex-shrink-0 xl:ml-8">
            <div className="sticky top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-xl">
              <SectionNavigation
                sections={navigationSections}
                activeSection={activeSection}
                onSectionClick={scrollToSection}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Hero Section */}
            <section
              id="hero"
              className="min-h-screen flex items-center py-16 lg:py-20"
            >
              <Container size="xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
                  {/* Content Column */}
                  <AnimatedContainer
                    className="text-left order-2 md:order-2 xl:order-1"
                    delay={0.2}
                  >
                    <motion.h1
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                      initial={parallaxTextVariants.initial}
                      animate={parallaxTextVariants.animate}
                      transition={parallaxTextVariants.transition}
                    >
                      {hero.greeting}
                    </motion.h1>

                    <motion.p
                      className="text-lg md:text-xl text-foreground/80 mb-6 max-w-2xl"
                      initial={parallaxTextVariants.initial}
                      animate={parallaxTextVariants.animate}
                      transition={{
                        ...parallaxTextVariants.transition,
                        delay: 0.1,
                      }}
                    >
                      {hero.introduction}
                    </motion.p>

                    <motion.p
                      className="text-base md:text-lg text-foreground/70 mb-8 max-w-xl"
                      initial={parallaxTextVariants.initial}
                      animate={parallaxTextVariants.animate}
                      transition={{
                        ...parallaxTextVariants.transition,
                        delay: 0.2,
                      }}
                    >
                      {hero.personalTouch}
                    </motion.p>

                    {/* Mobile & Tablet: Compact stats */}
                    <div className="block lg:hidden mb-8">
                      <div className="flex flex-wrap justify-start gap-4 text-sm">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                          📍 {personalInfo.location}
                        </span>
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full">
                          ⚡ {personalInfo.availability}
                        </span>
                      </div>
                    </div>

                    {/* Reading Time (Mobile & Tablet: smaller) */}
                    <div className="block lg:hidden mb-6">
                      <ReadingTimeEstimator
                        content={fullContent}
                        className="text-sm justify-start"
                      />
                    </div>

                    {/* Desktop: Full reading time */}
                    <div className="hidden lg:block mb-8">
                      <ReadingTimeEstimator content={fullContent} />
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col lg:flex-row gap-4 justify-start">
                      <button
                        onClick={handleDownloadResume}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        <Download size={18} className="inline mr-2" />
                        Download Resume
                      </button>

                      {/* Mobile & Tablet: Read Story button */}
                      <button
                        onClick={() => scrollToSection("story-introduction")}
                        className="block md:hidden px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
                      >
                        <BookOpen size={18} className="inline mr-2" />
                        Read My Story
                      </button>

                      {/* Desktop: Read My Story button */}
                      <button
                        onClick={() => scrollToSection("story-introduction")}
                        className="hidden md:block px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
                      >
                        <BookOpen size={18} className="inline mr-2" />
                        Read My Story
                      </button>
                    </div>
                  </AnimatedContainer>

                  {/* Profile Image Column */}
                  <motion.div
                    className="relative order-1 md:order-1 lg:order-2 flex justify-center lg:justify-end"
                    {...heroImageVariants}
                  >
                    <div className="relative">
                      {/* Mobile & Tablet: Smaller image */}
                      <div className="block lg:hidden">
                        <Image
                          src="/images/profile/profile.jpg"
                          alt="Yogesh Patil - Software Developer"
                          width={200}
                          height={200}
                          className="rounded-full object-cover shadow-2xl"
                          priority
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBobHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkJzgTTLPz0kNB7hc4PB0rXBK7+fWa2yqKSs6v//Z"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                          style={{
                            filter:
                              "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
                          }}
                        />
                      </div>

                      {/* Desktop: Larger image */}
                      <div className="hidden lg:block">
                        <Image
                          src="/images/profile/profile.jpg"
                          alt="Yogesh Patil - Software Developer"
                          width={400}
                          height={400}
                          className="rounded-full object-cover shadow-2xl"
                          priority
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBobHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkJzgTTLPz0kNB7hc4PB0rXBK7+fWa2yqKSs6v//Z"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                          style={{
                            filter:
                              "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
                          }}
                        />
                      </div>

                      {/* Image not found fallback */}
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-full text-primary text-4xl lg:text-6xl font-bold"
                        style={{ display: "none" }}
                        id="profile-fallback"
                      >
                        YP
                      </div>

                      {/* Animated decorative elements */}
                      <motion.div
                        className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"
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
            <section id="story-introduction" className="py-16 md:py-20">
              <Container size="xl">
                <StorySection
                  id="story-introduction"
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
              className="py-16 md:py-20 bg-gradient-to-br from-secondary/5 to-accent/5"
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
                        id={section.id}
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
                            | "innovation"
                            | "confidence"
                            | "vision"
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
            <section id="professional-journey" className="py-16 md:py-20">
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
              className="py-16 md:py-20 bg-gradient-to-br from-primary/5 to-secondary/5"
            >
              <Container size="xl">
                <AnimatedContainer className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    Work Philosophy
                  </h2>
                  <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                    The principles that guide my approach to software
                    development and collaboration
                  </p>
                </AnimatedContainer>

                <PhilosophyCards philosophies={workPhilosophy} />
              </Container>
            </section>

            {/* Current State */}
            <section id="story-current" className="py-16 md:py-20">
              <Container size="xl">
                <StorySection
                  id="story-current"
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
              className="py-16 md:py-20 bg-gradient-to-br from-accent/5 to-primary/5"
            >
              <Container size="xl">
                <StorySection
                  id="story-future"
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

            {/* Offline Interests */}
            <section id="offline-info" className="py-16 md:py-20">
              <Container size="xl">
                {/* Mobile Travel Illustration - Displayed at top on mobile */}
                <div className="block lg:hidden mb-12">
                  <AnimatedContainer delay={0.2}>
                    <div className="flex justify-center">
                      <Image
                        src="/images/illustrations/travel2.png"
                        alt="Travel illustration"
                        width={300}
                        height={300}
                        className="opacity-90 drop-shadow-sm rounded-lg object-contain"
                      />
                    </div>
                  </AnimatedContainer>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                  {/* Content Side */}
                  <div className="flex-1 space-y-8">
                    <AnimatedContainer>
                      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {offlineInfo.title}
                      </h2>
                      <p className="text-lg text-foreground/80 mb-8">
                        {offlineInfo.description}
                      </p>
                    </AnimatedContainer>

                    {offlineInfo.interests.map(
                      (interest: InterestItem, index: number) => (
                        <AnimatedContainer key={index} delay={index * 0.2}>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <span
                                className="text-2xl"
                                role="img"
                                aria-label="Globe"
                              >
                                🌍
                              </span>
                              <h3 className="text-2xl font-semibold text-foreground">
                                {interest.activity}
                              </h3>
                            </div>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                              {interest.description}
                            </p>
                            {interest.connection && (
                              <div className="p-4 rounded-lg bg-primary/10 border-l-4 border-primary/30 backdrop-blur-sm">
                                <p className="text-base text-foreground/70 italic">
                                  {interest.connection}
                                </p>
                              </div>
                            )}
                          </div>
                        </AnimatedContainer>
                      )
                    )}
                  </div>

                  {/* Desktop Illustrations Side - Hidden on mobile */}
                  <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:items-center lg:justify-start pt-8 lg:pt-0 lg:pl-12 lg:sticky lg:top-20 h-full">
                    <AnimatedContainer delay={0.3}>
                      <div className="relative w-full max-w-lg">
                        {/* Background decoration for better theme integration - more subtle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-full blur-2xl scale-90 opacity-70" />
                        <div className="relative flex justify-center items-center">
                          <Image
                            src="/images/illustrations/travel2.png"
                            alt="Yogesh exploring new destinations and technologies"
                            width={450}
                            height={450}
                            className="opacity-90 drop-shadow-lg transition-all duration-500 hover:opacity-100 hover:scale-105 rounded-lg object-contain transform -translate-y-10 lg:translate-x-8"
                            priority
                          />
                        </div>
                      </div>
                    </AnimatedContainer>

                    {/* CitySkylinesIllustration can be a secondary, less prominent element or removed if too cluttered */}
                    <AnimatedContainer
                      delay={0.5}
                      className="mt-8 w-full max-w-md"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-primary/5 rounded-lg blur-xl scale-100 opacity-60" />
                        <div className="relative flex justify-center p-2">
                          <CitySkylinesIllustration
                            size="lg"
                            className="opacity-70 drop-shadow-md transition-all duration-500 hover:opacity-80"
                          />
                        </div>
                      </div>
                    </AnimatedContainer>
                  </div>
                </div>

                {/* Mobile City Illustration - Displayed at bottom on mobile */}
                <div className="block lg:hidden mt-12">
                  <AnimatedContainer delay={0.6}>
                    <div className="flex justify-center">
                      <CitySkylinesIllustration
                        size="lg"
                        className="opacity-80 drop-shadow-sm"
                      />
                    </div>
                  </AnimatedContainer>
                </div>
              </Container>
            </section>

            {/* Connect Section */}
            <section
              id="connect"
              className="py-16 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5"
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

                  <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-10">
                    <a href={`mailto:${personalInfo.email}`}>
                      <PrimaryButton icon={<Mail size={18} />} size="lg">
                        Send Email
                      </PrimaryButton>
                    </a>

                    <a
                      href={
                        personalInfo.socialLinks.find(
                          (link: { platform: string; url: string }) =>
                            link.platform === "LinkedIn"
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
                          (link: { platform: string; url: string }) =>
                            link.platform === "GitHub"
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
                </AnimatedContainer>
              </Container>
            </section>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default AboutPage;
