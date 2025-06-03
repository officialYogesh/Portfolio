"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Archive,
  FileImage,
} from "lucide-react";
import { Project, ProjectTechnology } from "../../../config/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  delay?: number;
}

// Technology category color mapping
const getCategoryColor = (category: ProjectTechnology["category"]) => {
  const colors = {
    frontend:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    backend:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    database:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    tools:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    cloud: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    testing: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    mobile:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  };
  return (
    colors[category] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
  );
};

// Status indicator component
const StatusIndicator: React.FC<{ status: Project["status"] }> = ({
  status,
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder or null during SSR to avoid hydration mismatch
    return <div className="h-6 w-20 bg-muted rounded-full animate-pulse"></div>;
  }

  const statusConfig = {
    completed: {
      icon: CheckCircle,
      text: "Completed",
      className:
        "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    },
    "in-progress": {
      icon: Clock,
      text: "In Progress",
      className:
        "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
    },
    planned: {
      icon: AlertCircle,
      text: "Planned",
      className:
        "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    archived: {
      icon: Archive,
      text: "Archived",
      className:
        "text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400",
    },
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      <IconComponent size={12} className="mr-1" />
      {config.text}
    </div>
  );
};

// Fallback placeholder component
const ImagePlaceholder: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
      <div className="text-center">
        <FileImage
          size={48}
          className="text-muted-foreground/50 mx-auto mb-2"
        />
        <p className="text-sm text-muted-foreground/70 font-medium px-4">
          {title}
        </p>
      </div>
    </div>
  );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  delay = 0,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageError = useCallback(() => {
    if (isClient) {
      setImageError(true);
      setImageLoading(false);
    }
  }, [isClient]);

  const handleImageLoad = useCallback(() => {
    if (isClient) {
      setImageLoading(false);
    }
  }, [isClient]);

  const demoLink = project.links.find((link) => link.type === "demo");
  const githubLink = project.links.find((link) => link.type === "github");

  const cardMotionProps = isClient
    ? {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.4,
            delay: delay + index * 0.1,
            ease: [0.4, 0, 0.2, 1],
          },
        },
        whileHover: { y: -5, scale: 1.02, transition: { duration: 0.2 } },
      }
    : {};

  if (!isClient) {
    return (
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-md h-full flex flex-col">
        <div className="aspect-video bg-muted animate-pulse" />
        <div className="p-6 flex flex-col flex-grow space-y-4">
          <div className="h-6 bg-muted rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-muted rounded w-full animate-pulse" />
          <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
          <div className="flex flex-wrap gap-1 mt-auto pt-4 border-t border-border">
            {[...Array(3)].map((_, i) => (
              <div
                key={`skeleton-tech-${i}`}
                className="h-5 w-16 bg-muted rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      {...cardMotionProps}
      className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <div className="w-full h-full">
          {imageError ? (
            <ImagePlaceholder title={project.title} />
          ) : (
            <>
              {imageLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <Image
                src={project.thumbnail}
                alt={`${project.title} thumbnail`}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={handleImageError}
                onLoad={handleImageLoad}
                priority={index < 2} // Prioritize first few images
              />
            </>
          )}
        </div>

        {project.featured && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-md">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3">
          <StatusIndicator status={project.status} />
        </div>

        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {demoLink && (
            <motion.a
              href={demoLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View live demo"
            >
              <ExternalLink size={16} />
            </motion.a>
          )}
          {githubLink && (
            <motion.a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground text-background p-2 rounded-full hover:bg-foreground/90 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View source code"
            >
              <Github size={16} />
            </motion.a>
          )}
          <Link href={`/projects/${project.id}`}>
            <motion.div
              className="bg-accent text-accent-foreground p-2 rounded-full hover:bg-accent/90 transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View project details"
            >
              <ExternalLink size={16} />
            </motion.div>
          </Link>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <Link
            href={`/projects/${project.id}`}
            className="block group-hover:text-primary transition-colors"
          >
            <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
              {project.title}
            </h3>
          </Link>
          <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-relaxed flex-grow">
            {project.shortDescription}
          </p>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 6).map((tech, techIndex) => (
              <span
                key={`tech-${project.id}-${tech.name}-${techIndex}`}
                className={`px-2 py-1 text-xs font-medium rounded-md ${getCategoryColor(
                  tech.category
                )}`}
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="px-2 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground">
                +{project.technologies.length - 6} more
              </span>
            )}
          </div>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {project.metrics.slice(0, 2).map((metric, metricIndex) => (
              <div
                key={`metric-${project.id}-${metric.label}-${metricIndex}`}
                className="text-center p-2 bg-muted/50 rounded-md"
              >
                <div className="text-sm font-bold text-card-foreground">
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{new Date(project.startDate).getFullYear()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>{project.teamSize}</span>
            </div>
          </div>
          <div className="text-primary font-medium">{project.role}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
