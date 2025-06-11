"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Trophy,
  ExternalLink,
  PlayCircle,
  Target,
  AlertCircle,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PrimaryCTA, SecondaryCTA } from "@/components/ui/CTAButton";
import { Project, ProjectLink } from "../../../../config/projects";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Gallery functionality
  const currentImageIndex = selectedImage ?? 0;

  const getLinkIcon = (type: ProjectLink["type"]) => {
    switch (type) {
      case "demo":
        return <ExternalLink className="w-4 h-4" />;
      case "github":
        return <ExternalLink className="w-4 h-4" />;
      case "case-study":
        return <ExternalLink className="w-4 h-4" />;
      case "documentation":
        return <ExternalLink className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "text-success border-success/20 bg-success/10";
      case "in-progress":
        return "text-info border-info/20 bg-info/10";
      case "planned":
        return "text-warning border-warning/20 bg-warning/10";
      case "archived":
        return "text-muted border-muted/20 bg-muted/10";
      default:
        return "text-muted border-muted/20 bg-muted/10";
    }
  };

  const openGallery = (imageIndex: number) => {
    setSelectedImage(imageIndex);
  };

  const closeGallery = () => {
    setSelectedImage(null);
  };

  const navigateGallery = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    if (direction === "prev") {
      setSelectedImage(
        selectedImage === 0 ? project.screenshots.length - 1 : selectedImage - 1
      );
    } else {
      setSelectedImage(
        selectedImage === project.screenshots.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  // Get category info
  const categoryInfo = {
    displayName: project.category.replace("-", " ").toUpperCase(),
  };

  // Animation variants
  const galleryItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Back to Projects Button - sticky for easier navigation */}
      <div className="sticky top-[72px] flex justify-end z-30 px-4 md:px-8">
        <SecondaryCTA to="/projects" icon={<ArrowLeft className="w-4 h-4" />}>
          All Projects
        </SecondaryCTA>
      </div>

      {/* Hero Section - Conditional and uses project.thumbnail */}
      <section className="py-20 lg:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Hero Image/Video Preview - Conditional */}
            {project.thumbnail && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 aspect-video rounded-2xl overflow-hidden bg-muted/20 relative group cursor-pointer"
                onClick={() =>
                  project.screenshots && project.screenshots.length > 0
                    ? openGallery(0)
                    : undefined
                }
              >
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} thumbnail`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Hide the image on error and show a placeholder instead
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {project.screenshots && project.screenshots.length > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform" />
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <Badge
                    variant="outline"
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    {categoryInfo.displayName}
                  </Badge>
                </div>
                <div className="absolute top-6 right-6 flex gap-2">
                  <Badge
                    variant="outline"
                    className={`bg-background/80 backdrop-blur-sm ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status.replace("-", " ").toUpperCase()}
                  </Badge>
                  {project.featured && (
                    <Badge
                      variant="outline"
                      className="bg-warning/20 text-warning backdrop-blur-sm"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
              </motion.div>
            )}

            {/* Project Title and Description */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-muted leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              {/* Project Meta */}
              <div className="flex flex-wrap gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(project.startDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                    {project.endDate &&
                      ` - ${new Date(project.endDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Team of {project.teamSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>{project.role}</span>
                </div>
              </div>

              {/* Project Links */}
              <div className="flex flex-col md:flex-row w-full gap-3">
                {project.links.map((link, index) => {
                  const CtaComponent = index === 0 ? PrimaryCTA : SecondaryCTA;
                  return (
                    <CtaComponent
                      key={index}
                      href={link.url}
                      icon={getLinkIcon(link.type)}
                      size="lg"
                      className="w-full md:w-auto"
                      aria-label={link.label}
                    >
                      {link.label}
                    </CtaComponent>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Project Overview and Objectives */}
      <section className="py-16 lg:py-20">
        <Container>
          <StaggerContainer>
            <StaggerItem>
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                  Project Overview
                </h2>
                <div className="prose prose-lg max-w-none text-muted">
                  <p className="text-lg leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Project Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <StaggerItem>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Key Metrics & Achievements
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {project.metrics.map((metric, index) => (
                      <Card key={index} className="p-6 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted">{metric.label}</div>
                      </Card>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            )}
          </StaggerContainer>
        </Container>
      </section>

      {/* Technology Stack - Simplified without Bubble UI */}
      <section className="py-16 lg:py-20 bg-card/30">
        <Container>
          <AnimatedContainer variant="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Technology Stack
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                Technologies and tools used to bring this project to life
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.technologies.map((tech, index) => (
                  <Card
                    key={index}
                    className="p-4 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="font-semibold text-foreground mb-1">
                      {tech.name}
                    </div>
                    <div className="text-xs text-muted capitalize">
                      {tech.category.replace("-", " ")}
                    </div>
                    {tech.proficiency && (
                      <div className="mt-2">
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${tech.proficiency * 10}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedContainer>
        </Container>
      </section>

      {/* Key Features */}
      <section className="py-16 lg:py-20">
        <Container>
          <StaggerContainer>
            <StaggerItem className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center">
                Key Features
              </h2>
            </StaggerItem>

            <div className="grid md:grid-cols-2 gap-8">
              {project.features.map((feature, index) => (
                <StaggerItem key={index}>
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-muted leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* Screenshot Gallery - Conditionally rendered */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="py-16 lg:py-20 bg-card/30">
          <Container>
            <AnimatedContainer variant="fade">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Project Gallery
                </h2>
                <p className="text-lg text-muted">
                  Screenshots and visuals from the project
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.screenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    variants={galleryItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 cursor-pointer group"
                    onClick={() => openGallery(index)}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <PlayCircle className="w-12 h-12 text-primary/60" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedContainer>
          </Container>
        </section>
      )}

      {/* Challenges and Solutions */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <StaggerContainer>
              <StaggerItem className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center">
                  Challenges & Solutions
                </h2>
              </StaggerItem>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Challenges */}
                <StaggerItem>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-warning" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Challenges
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {project.challenges.map((challenge, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                          <p className="text-muted leading-relaxed">
                            {challenge}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>

                {/* Solutions */}
                <StaggerItem>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Solutions
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {project.solutions.map((solution, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                          <p className="text-muted leading-relaxed">
                            {solution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateGallery("prev");
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateGallery("next");
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-8 text-center text-white/60">
                <PlayCircle className="w-24 h-24 mx-auto mb-4" />
                <p className="text-lg">Screenshot Preview</p>
                <p className="text-sm opacity-60 mt-2">
                  {currentImageIndex + 1} of {project.screenshots.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
