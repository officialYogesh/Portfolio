"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  TrendingUp,
  Zap,
  Users,
  Download,
  Briefcase,
  MapPin,
  Clock,
} from "lucide-react";
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

// Typing animation hook - focused on recruiter pain points
const useTypingAnimation = (texts: string[], speed = 80, delay = 4000) => {
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
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  // Recruiter-focused pain point statements
  const recruiterHooks = [
    "Looking for a Senior SDE who can actually deliver on AI promises?",
    "Need a developer who ships production-ready systems, not just demos?",
    "Want an engineer who's proven they can scale systems under pressure?",
  ];
  const currentHook = useTypingAnimation(recruiterHooks, 60, 5000);

  return (
    <>
      {/* Minimal Background */}
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-accent/3" />
      </div>

      <Container className="relative">
        {/* Hero Section - Recruiter-Focused */}
        <section className="py-20 md:py-32">
          <div className="max-w-5xl">
            {/* Recruiter Hook */}
            <AnimatedContainer variant="fade" delay={0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <p className="text-lg md:text-xl text-foreground/80 font-medium">
                  {currentHook}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="text-accent ml-1"
                  >
                    |
                  </motion.span>
                </p>
              </motion.div>
            </AnimatedContainer>

            {/* Professional Identity Statement */}
            <AnimatedContainer variant="fade" delay={0.3} className="!mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
              >
                <span className="text-primary font-extrabold">Senior SDE</span>{" "}
                specializing in{" "}
                <span className="text-accent font-extrabold">
                  Production AI Systems
                </span>
              </motion.h1>
            </AnimatedContainer>

            {/* Quick Stats for Recruiters */}
            <AnimatedContainer variant="slide" direction="up" delay={0.5}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-foreground/70">
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Briefcase className="h-5 w-5 text-blue-500" />
                    <span>
                      <strong className="text-foreground">4+ years</strong>{" "}
                      experience
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span>
                      <strong className="text-foreground">$500K+</strong>{" "}
                      business impact
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span>
                      <strong className="text-foreground">70%</strong>{" "}
                      automation delivered
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatedContainer>

            {/* Availability & Location Status */}
            <AnimatedContainer
              variant="slide"
              direction="up"
              delay={0.6}
              className="!mb-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="text-green-500 font-semibold">
                      ACTIVELY LOOKING
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-foreground/70">New York, USA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-foreground/70">
                      Available: Immediate start
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatedContainer>

            {/* Core Tech Stack & CTAs */}
            <AnimatedContainer variant="slide" direction="up" delay={0.7}>
              <div className="mb-8">
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
                  <strong className="text-foreground">
                    Master&apos;s in Computer Science (Syracuse University)
                  </strong>{" "}
                  + proven track record building scalable{" "}
                  <span className="text-primary font-semibold">
                    GenAI applications
                  </span>
                  ,{" "}
                  <span className="text-accent font-semibold">
                    cloud microservices
                  </span>
                  , and{" "}
                  <span className="text-secondary font-semibold">
                    high-performance APIs
                  </span>{" "}
                  that real users depend on.
                </p>

                {/* Key Technologies */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    "Python",
                    "TypeScript",
                    "React",
                    "AWS",
                    "Node.js",
                    "PostgreSQL",
                    "Docker",
                    "LangChain",
                    "FastAPI",
                    "GraphQL",
                  ].map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="px-3 py-1 text-sm font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Primary CTAs for Recruiters */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <motion.button
                    onClick={() =>
                      window.open(
                        "/documents/Yogesh-Patil-Resume.pdf",
                        "_blank"
                      )
                    }
                    className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden w-full md:w-auto"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Download className="h-5 w-5 relative z-10 shrink-0" />
                    <span className="relative z-10">Download Resume</span>
                  </motion.button>

                  <motion.button
                    onClick={() => (window.location.href = "/contact")}
                    className="group inline-flex items-center justify-center gap-3 border border-border hover:border-primary text-foreground hover:text-primary font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-primary/5 w-full md:w-auto"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="h-5 w-5 shrink-0" />
                    Contact Me
                  </motion.button>
                </div>

                {/* Response Time Promise */}
                <p className="text-sm text-foreground/60 mt-4">
                  📞 Available for calls • ⚡ Responds within 4 hours • 🚀 Can
                  start immediately
                </p>
              </div>
            </AnimatedContainer>
          </div>
        </section>

        {/* Recent Achievement - Technical Credibility */}
        <section className="py-12">
          <AnimatedContainer variant="fade">
            <motion.div
              className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 md:p-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-sm font-medium text-primary">
                    LATEST WIN
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-foreground">
                    🏆 Our team was{" "}
                    <strong className="text-accent">
                      top performers at IBM TechXchange Hackathon
                    </strong>{" "}
                    building AI compliance system that{" "}
                    <span className="text-green-500 font-bold">
                      reduced manual review by 70%
                    </span>{" "}
                    for financial services
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">
                    December 2024 • Used IBM Granite models + custom RAG
                    pipeline • Production-ready code
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatedContainer>
        </section>

        {/* Technical Projects - Proof of Delivery */}
        <section className="py-16">
          <AnimatedContainer variant="fade">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Production Systems I&apos;ve Built
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl">
                Real applications serving real users. Not side projects or
                tutorials—actual systems that companies depend on.
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <StaggerItem key={project.id}>
                  <div className="h-full group">
                    <Card className="h-full bg-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Technical Impact Header */}
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                        {/* Technical Metrics */}
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-green-500/90 text-white text-xs font-semibold backdrop-blur-sm">
                            {index === 0
                              ? "PRODUCTION SCALE"
                              : index === 1
                              ? "REVENUE IMPACT"
                              : "USER GROWTH"}
                          </Badge>
                        </div>

                        <div className="absolute top-4 right-4">
                          <Badge
                            variant="outline"
                            className="text-xs bg-background/80 backdrop-blur-sm"
                          >
                            {project.category.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>

                        {/* Technical Achievement */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-sm font-bold">
                            {index === 0
                              ? "Automated 3 FTE worth of manual work"
                              : index === 1
                              ? "Enabled $100K+ ARR for startup"
                              : "4x user adoption in first month"}
                          </p>
                          <p className="text-white/80 text-xs mt-1">
                            {index === 0
                              ? "Handles 1000+ documents/day"
                              : index === 1
                              ? "99.9% uptime, <100ms response"
                              : "Scales to 400+ concurrent users"}
                          </p>
                        </div>
                      </div>

                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                          {/* Technical titles */}
                          {index === 0
                            ? "AI Document Processing Pipeline"
                            : index === 1
                            ? "Real-time Analytics Platform"
                            : project.title}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-3">
                          {project.shortDescription}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {/* Core Technologies */}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <Badge
                                key={tech.name}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech.name}
                              </Badge>
                            ))}
                          </div>

                          {/* Technical Details CTA */}
                          <motion.button
                            onClick={() =>
                              window.open(
                                project.links[0]?.url || "#",
                                "_blank"
                              )
                            }
                            className="w-full text-sm px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            View Technical Details →
                          </motion.button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Portfolio Link */}
            <div className="text-center mt-12">
              <motion.button
                onClick={() => (window.location.href = "/projects")}
                className="text-primary hover:text-accent group font-semibold text-lg"
                whileHover={{ scale: 1.02 }}
              >
                See Full Technical Portfolio
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

        {/* Recruiter-Focused Contact Section */}
        <section className="py-16">
          <AnimatedContainer variant="fade">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to schedule a technical interview?
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
                I&apos;m actively interviewing for{" "}
                <strong className="text-foreground">Senior SDE</strong>{" "}
                positions. Available for technical screens, system design
                discussions, or quick culture fit calls.
              </p>

              {/* Enhanced CTA Layout - Single Row on Desktop */}
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
                <motion.button
                  onClick={() =>
                    window.open("/documents/Yogesh-Patil-Resume.pdf", "_blank")
                  }
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden w-full md:w-auto md:flex-1 md:max-w-xs"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Download className="h-5 w-5 relative z-10 shrink-0" />
                  <span className="relative z-10">Download Resume</span>
                </motion.button>

                <motion.button
                  onClick={() =>
                    window.open(
                      "https://linkedin.com/in/yogeshpatil28",
                      "_blank"
                    )
                  }
                  className="group inline-flex items-center justify-center gap-3 border border-border hover:border-primary text-foreground hover:text-primary font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-primary/5 w-full md:w-auto md:flex-1 md:max-w-xs"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Users className="h-5 w-5 shrink-0" />
                  LinkedIn Profile
                </motion.button>

                <motion.button
                  onClick={() =>
                    (window.location.href = `mailto:${personalInfo.email}`)
                  }
                  className="group inline-flex items-center justify-center gap-3 border border-border hover:border-primary text-foreground hover:text-primary font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-primary/5 w-full md:w-auto md:flex-1 md:max-w-xs"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="h-5 w-5 shrink-0" />
                  Email Direct
                </motion.button>
              </div>

              <p className="text-sm text-foreground/60 mt-6">
                📱 Available for calls • ⚡ Responds within 4 hours • 📄
                References available on request
              </p>
            </div>
          </AnimatedContainer>
        </section>
      </Container>
    </>
  );
}
