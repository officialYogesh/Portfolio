"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  MapPin,
  Mail,
  Award,
  GraduationCap,
  Code,
  Database,
  Cloud,
  Container as ContainerIcon,
  Cpu,
  Globe,
  Brain,
  Terminal,
  Settings,
  Layers,
  Server,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { personalInfo } from "../../../config/personal-info";
import { education, achievements } from "../../../config/education";
import { PrimaryCTA } from "@/components/ui/CTAButton";

// Download functionality
const downloadResumePDF = () => {
  try {
    const link = document.createElement("a");
    link.href = "/documents/Yogesh-Patil-Resume.pdf";
    link.download = "Yogesh-Patil-Resume.pdf";
    link.target = "_blank";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading resume:", error);
    window.open("/documents/Yogesh-Patil-Resume.pdf", "_blank");
  }
};

// Key metrics for impact storytelling
const impactMetrics = [
  {
    metric: "70%",
    description: "Workflow Automation Improvement",
    story: "Transformed manual processes into intelligent systems",
  },
  {
    metric: "4x",
    description: "Platform Adoption Growth",
    story: "Built solutions people actually want to use",
  },
  {
    metric: "$100K+",
    description: "Revenue Impact Enabled",
    story: "Code that directly drives business results",
  },
  {
    metric: "42%",
    description: "API Performance Enhancement",
    story: "Obsessed with making things faster and better",
  },
];

// Enhanced skills with icons and proper categorization
const technicalSkills = [
  // Frontend Technologies
  {
    name: "React/Next.js",
    icon: Code,
    level: 9,
    context: "5+ projects, production scale",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    icon: Terminal,
    level: 9,
    context: "Type-safe development advocate",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    icon: Globe,
    level: 9,
    context: "Modern ES6+ development",
    category: "Frontend",
  },

  // Backend Technologies
  {
    name: "Python/FastAPI",
    icon: Server,
    level: 9,
    context: "AI/ML and API development",
    category: "Backend",
  },
  {
    name: "Node.js/Express",
    icon: Settings,
    level: 9,
    context: "Backend architecture expert",
    category: "Backend",
  },
  {
    name: "GraphQL",
    icon: Layers,
    level: 8,
    context: "Modern API development",
    category: "Backend",
  },

  // Cloud & DevOps
  {
    name: "AWS/Cloud",
    icon: Cloud,
    level: 8,
    context: "Certified, production deployments",
    category: "Cloud",
  },
  {
    name: "Docker",
    icon: ContainerIcon,
    level: 8,
    context: "Containerization expert",
    category: "DevOps",
  },
  {
    name: "Kubernetes",
    icon: Workflow,
    level: 7,
    context: "Container orchestration",
    category: "DevOps",
  },

  // Database
  {
    name: "PostgreSQL/MongoDB",
    icon: Database,
    level: 8,
    context: "Database design & optimization",
    category: "Database",
  },
  {
    name: "Redis",
    icon: Cpu,
    level: 7,
    context: "Caching and session management",
    category: "Database",
  },

  // AI/LLM
  {
    name: "LangChain/RAG",
    icon: Brain,
    level: 8,
    context: "LLM integration specialist",
    category: "AI/ML",
  },
];

// What makes me unique - Human-centered approach
const coreStrengths = [
  {
    icon: "🧠",
    title: "Problem Solver",
    description:
      "I see complex challenges as puzzles to solve. Whether it's a 20-hour manual process or a slow API, I find the elegant solution.",
  },
  {
    icon: "🤝",
    title: "Bridge Builder",
    description:
      "I translate between business needs and technical reality. My code doesn't just work—it solves real human problems.",
  },
  {
    icon: "📈",
    title: "Growth Driver",
    description:
      "My solutions don't just meet requirements—they enable 4x growth, $100K+ revenue, and transform how teams work.",
  },
  {
    icon: "🎯",
    title: "Impact Focused",
    description:
      "Every line of code serves a purpose. If it doesn't make someone's life better or business more successful, I question it.",
  },
];

export default function ResumePage() {
  return (
    <>
      <Container className="py-8 md:py-16">
        {/* Hero Section - The "6-Second Hook" */}
        <AnimatedContainer delay={0.1} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {personalInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-4">
              AI Solutions Engineer & Full Stack Developer
            </p>

            {/* Quick Contact & Download */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 justify-center items-center my-8">
              <PrimaryCTA
                onClick={downloadResumePDF}
                icon={<Download className="h-5 w-5" />}
                size="lg"
                fullWidth
                className="md:w-auto"
              >
                Download Resume
              </PrimaryCTA>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>New York, USA</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-primary transition-colors break-all !min-h-0 leading-none"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatedContainer>

        {/* Technical Expertise - Moved to top */}
        <AnimatedContainer delay={0.2} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Technical Expertise
            </h2>
            <p className="text-muted-foreground">
              Technologies I use to build solutions that matter
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {technicalSkills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <StaggerItem key={index}>
                    <motion.div
                      className="p-4 md:p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base md:text-lg font-semibold text-foreground truncate">
                            {skill.name}
                          </h3>
                          <p className="text-xs text-primary font-medium">
                            {skill.category}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {skill.context}
                      </p>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </AnimatedContainer>

        {/* What I Do Best - Human Connection */}
        <AnimatedContainer delay={0.3} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              What I Do Best
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Beyond the code—the mindset and approach that drives results
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreStrengths.map((strength, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 h-full"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{strength.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {strength.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {strength.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedContainer>

        {/* Impact Metrics - Social Proof */}
        <AnimatedContainer delay={0.4} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Measurable Impact
            </h2>
            <p className="text-muted-foreground">
              Real results from real projects
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {item.metric}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-2">
                    {item.description}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.story}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedContainer>

        {/* Education & Credentials - Trust Builders */}
        <AnimatedContainer delay={0.5} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Foundation & Growth
            </h2>
            <p className="text-muted-foreground">Continuous learning journey</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Education */}
              <StaggerItem>
                <div className="p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Education
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary/20 pl-4"
                      >
                        <h4 className="font-semibold text-foreground text-sm md:text-base">
                          {edu.degree} in {edu.field}
                        </h4>
                        <p className="text-primary text-sm md:text-base">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {edu.startDate.split("-")[0]} -{" "}
                          {edu.endDate.split("-")[0]}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-muted-foreground">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              {/* Key Achievements */}
              <StaggerItem>
                <div className="p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Recognition
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {achievements.slice(0, 3).map((achievement, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary/20 pl-4"
                      >
                        <h4 className="font-semibold text-foreground text-sm md:text-base">
                          {achievement.title}
                        </h4>
                        <p className="text-primary text-sm md:text-base">
                          {achievement.organization || achievement.category}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {achievement.date.split("-")[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </AnimatedContainer>
      </Container>
    </>
  );
}
