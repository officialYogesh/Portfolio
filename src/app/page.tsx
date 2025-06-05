"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Container } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  AnimatedContainer,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { personalInfo } from "../../config/personal-info";
import { getFeaturedProjects } from "../../config/projects";

// Typing animation hook
const useTypingAnimation = (texts: string[], speed = 150, delay = 2000) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      const fullText = texts[currentTextIndex];
      if (currentText.length < fullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, speed);
      } else {
        setTimeout(() => setIsTyping(false), delay);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, speed / 2);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isTyping, texts, speed, delay]);

  return currentText;
};

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 6);

  // Typing animation for the tagline
  const taglines = [
    "I build scalable web applications.",
    "I develop GenAI solutions.",
    "I create innovative software.",
    "I architect cloud systems.",
  ];
  const currentTagline = useTypingAnimation(taglines, 80, 3000);

  return (
    <>
      {/* Minimal Background */}
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-accent/3" />
      </div>

      <Container className="relative">
        {/* Hero Section - Simplified */}
        <section className="py-20 md:py-32">
          <div className="max-w-4xl">
            <AnimatedContainer variant="fade" delay={0.2}>
              <div className="mb-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-primary text-sm md:text-base font-medium tracking-wider uppercase mb-4"
                >
                  Hello, my name is {personalInfo.name.split(" ")[0]}
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
                >
                  {currentTagline}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="text-accent"
                  >
                    |
                  </motion.span>
                </motion.h1>
              </div>
            </AnimatedContainer>

            <AnimatedContainer variant="slide" direction="up" delay={0.6}>
              <div className="max-w-2xl mb-12">
                <p className="text-lg md:text-xl text-muted leading-relaxed mb-12">
                  I&apos;m a{" "}
                  <span className="text-primary font-semibold">
                    Software Development Engineer
                  </span>{" "}
                  with{" "}
                  <span className="text-accent font-semibold">4+ years</span> of
                  experience. I specialize in building modern web applications
                  and AI-powered solutions using{" "}
                  <span className="text-secondary font-semibold">
                    React, Python, and AWS
                  </span>
                  .
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  <motion.button
                    onClick={() =>
                      window.open(
                        "/documents/Yogesh-Patil-Resume.pdf",
                        "_blank"
                      )
                    }
                    className="group inline-flex items-center gap-3 border border-border hover:border-primary text-foreground hover:text-primary font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-primary/5"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Resume
                  </motion.button>

                  <motion.button
                    onClick={() =>
                      (window.location.href = `mailto:${personalInfo.email}`)
                    }
                    className="group inline-flex items-center gap-3 border border-border hover:border-primary text-foreground hover:text-primary font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-primary/5"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="h-5 w-5" />
                    Contact Me
                  </motion.button>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-16">
          <AnimatedContainer variant="fade">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-muted max-w-2xl">
                A selection of recent work showcasing AI-powered applications,
                scalable web platforms, and innovative solutions.
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <StaggerItem key={project.id}>
                  <div className="h-full group">
                    <Card className="h-full bg-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Project Image Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs bg-background/80 backdrop-blur-sm"
                          >
                            {project.category.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-3">
                          {project.shortDescription}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge
                                key={tech.name}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech.name}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.technologies.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Project Links */}
                          <div className="flex gap-2 pt-2">
                            {project.links.map((link) => (
                              <motion.button
                                key={link.type}
                                onClick={() => window.open(link.url, "_blank")}
                                className="flex-1 text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {link.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* View All Projects Link */}
            <div className="text-center mt-12">
              <motion.button
                onClick={() => (window.location.href = "/projects")}
                className="text-primary hover:text-accent group font-medium"
              >
                See All Projects
                <motion.span
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  initial={false}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </AnimatedContainer>
        </section>

        {/* 
        Temporarily removed sections - available for future use:
        
        Quick About Section - Building the Future with AI & Cloud
        <section className="py-16 bg-card/30 rounded-3xl my-16">
          <AnimatedContainer variant="fade">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Building the Future with AI & Cloud
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">
                Currently pursuing my{" "}
                <span className="text-primary font-semibold">
                  Master&apos;s in Computer Science at Syracuse University
                </span>{" "}
                while working on cutting-edge GenAI solutions. I&apos;ve helped
                companies achieve{" "}
                <span className="text-accent font-semibold">
                  70% automation improvements
                </span>{" "}
                and{" "}
                <span className="text-secondary font-semibold">
                  $100K+ revenue growth
                </span>{" "}
                through innovative software solutions.
              </p>

              <div className="flex justify-center gap-4">
                <AccentButton
                  size="lg"
                  onClick={() => (window.location.href = "/about")}
                >
                  Learn More About Me
                </AccentButton>
              </div>
            </div>
          </AnimatedContainer>
        </section>

        Connect Section - Let's Work Together
        <section className="py-16">
          <AnimatedContainer variant="fade">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Let&apos;s Work Together
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
                I&apos;m always interested in new opportunities and exciting
                projects. Whether you&apos;re looking for a full-time developer
                or need help with a specific project, let&apos;s connect.
              </p>

              <StaggerContainer className="flex flex-wrap justify-center gap-4">
                <StaggerItem>
                  <PrimaryButton
                    size="lg"
                    onClick={() =>
                      (window.location.href = `mailto:${personalInfo.email}`)
                    }
                    icon={<Mail className="h-5 w-5" />}
                  >
                    Get In Touch
                  </PrimaryButton>
                </StaggerItem>

                <StaggerItem>
                  <motion.button
                    onClick={() =>
                      window.open(personalInfo.socialLinks[1].url, "_blank")
                    }
                    className="group inline-flex items-center gap-3 border border-border hover:border-primary text-foreground hover:text-primary font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-primary/5"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    LinkedIn Profile
                  </motion.button>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </AnimatedContainer>
        </section>
        */}
      </Container>
    </>
  );
}
