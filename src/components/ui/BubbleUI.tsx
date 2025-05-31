"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useReducedMotion } from "../../lib/animations/hooks";
import { cn } from "../../lib/utils";
import { Skill, SkillCategory } from "../../../config/skills";

// Bubble data structure and TypeScript interfaces
export interface BubbleData {
  id: string;
  name: string;
  proficiency: number; // 1-10 scale
  category: SkillCategory;
  x: number;
  y: number;
  vx: number; // velocity x
  vy: number; // velocity y
  radius: number;
  color: string;
  icon?: string;
  experience: string;
  description?: string;
  isDragging?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
  relatedTechnologies?: string[]; // For connections
}

export interface BubbleConnection {
  from: string;
  to: string;
  strength: number; // 0-1, affects line opacity/thickness
  category: "similar" | "complementary" | "framework" | "tool";
}

export interface BubblePosition {
  x: number;
  y: number;
}

export interface BubblePhysics {
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
  mass: number;
  damping: number;
}

export interface DetailedBubbleInfo {
  bubble: BubbleData;
  position: { x: number; y: number };
  showConnections: boolean;
}

export interface BubbleUIProps {
  skills: Skill[];
  width?: number;
  height?: number;
  className?: string;
  enablePhysics?: boolean;
  enableMouse?: boolean;
  enableCollisions?: boolean;
  enableDrag?: boolean;
  enableConnections?: boolean;
  showDetailedTooltips?: boolean;
  onBubbleHover?: (bubble: BubbleData | null) => void;
  onBubbleClick?: (bubble: BubbleData) => void;
  onBubbleDoubleClick?: (bubble: BubbleData) => void;
  onBubbleDrag?: (
    bubble: BubbleData,
    position: { x: number; y: number }
  ) => void;
  showTooltips?: boolean;
  theme?: "light" | "dark" | "auto";
  performanceMode?: "high" | "medium" | "low";
}

// Color coding system for technology categories
const CATEGORY_COLORS: Record<SkillCategory, string> = {
  frontend: "#61dafb", // Cyan
  backend: "#68d391", // Green
  database: "#ed8936", // Orange
  tools: "#9f7aea", // Purple
  cloud: "#4fd1c7", // Teal
  testing: "#f56565", // Red
  mobile: "#4299e1", // Blue
};

const CATEGORY_LIGHT_COLORS: Record<SkillCategory, string> = {
  frontend: "#3182ce",
  backend: "#38a169",
  database: "#dd6b20",
  tools: "#805ad5",
  cloud: "#319795",
  testing: "#e53e3e",
  mobile: "#2b77cb",
};

// Enhanced physics constants with performance optimization
const PHYSICS_CONFIG = {
  friction: 0.95,
  mouseInfluence: 0.02,
  collisionDamping: 0.8,
  minVelocity: 0.1,
  maxVelocity: 2,
  repelForce: 0.3,
  attractForce: 0.1,
  gravityStrength: 0.1,
  dragDamping: 0.1,
  connectionForce: 0.05,
} as const;

// Connection definitions for related technologies
const TECHNOLOGY_CONNECTIONS: Record<string, string[]> = {
  React: ["Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  "Next.js": ["React", "TypeScript", "Vercel"],
  TypeScript: ["JavaScript", "React", "Next.js", "Node.js"],
  "Node.js": ["Express.js", "JavaScript", "TypeScript", "MongoDB"],
  "Express.js": ["Node.js", "MongoDB", "PostgreSQL"],
  MongoDB: ["Node.js", "Express.js"],
  PostgreSQL: ["Node.js", "Express.js"],
  "Tailwind CSS": ["CSS3", "React", "Next.js"],
  "Framer Motion": ["React", "TypeScript"],
  Docker: ["AWS", "Node.js"],
  AWS: ["Docker", "Node.js"],
};

/**
 * Enhanced Bubble UI Core Implementation Component with Task 4.2 Features
 */
export const BubbleUI: React.FC<BubbleUIProps> = ({
  skills,
  width = 800,
  height = 600,
  className = "",
  enablePhysics = true,
  enableMouse = true,
  enableCollisions = true,
  enableDrag = true,
  enableConnections = true,
  showDetailedTooltips = true,
  onBubbleHover,
  onBubbleClick,
  onBubbleDoubleClick,
  onBubbleDrag,
  showTooltips = true,
  theme = "auto",
  performanceMode = "high",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastFrameTime = useRef<number>(0);

  // Enhanced state management
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [hoveredBubble, setHoveredBubble] = useState<BubbleData | null>(null);
  const [detailedBubbleInfo, setDetailedBubbleInfo] =
    useState<DetailedBubbleInfo | null>(null);
  const [connections, setConnections] = useState<BubbleConnection[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [draggedBubble, setDraggedBubble] = useState<string | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    frameTime: 16,
  });

  const { prefersReducedMotion } = useReducedMotion();

  // Performance optimization: frame rate limiting
  const targetFPS =
    performanceMode === "high" ? 60 : performanceMode === "medium" ? 30 : 15;
  const frameInterval = 1000 / targetFPS;

  // Calculate bubble radius based on proficiency (responsive sizing)
  const calculateRadius = useCallback(
    (proficiency: number, baseSize = 40): number => {
      const minRadius = 25;
      const maxRadius = baseSize;
      return minRadius + (proficiency / 10) * (maxRadius - minRadius);
    },
    []
  );

  // Get theme-appropriate colors
  const getCategoryColor = useCallback(
    (category: SkillCategory): string => {
      if (theme === "light") return CATEGORY_LIGHT_COLORS[category];
      return CATEGORY_COLORS[category];
    },
    [theme]
  );

  // Generate connections between related technologies
  const generateConnections = useCallback(
    (bubbles: BubbleData[]): BubbleConnection[] => {
      if (!enableConnections) return [];

      const connections: BubbleConnection[] = [];

      bubbles.forEach((bubble) => {
        const relatedTechs = TECHNOLOGY_CONNECTIONS[bubble.name] || [];
        relatedTechs.forEach((relatedTech) => {
          const relatedBubble = bubbles.find((b) => b.name === relatedTech);
          if (relatedBubble && bubble.id !== relatedBubble.id) {
            // Avoid duplicate connections
            const existingConnection = connections.find(
              (c) =>
                (c.from === bubble.id && c.to === relatedBubble.id) ||
                (c.from === relatedBubble.id && c.to === bubble.id)
            );

            if (!existingConnection) {
              connections.push({
                from: bubble.id,
                to: relatedBubble.id,
                strength:
                  bubble.category === relatedBubble.category ? 0.8 : 0.4,
                category:
                  bubble.category === relatedBubble.category
                    ? "similar"
                    : "complementary",
              });
            }
          }
        });
      });

      return connections;
    },
    [enableConnections]
  );

  // Initialize bubbles with enhanced properties
  const initializeBubbles = useCallback(() => {
    const newBubbles: BubbleData[] = skills.map((skill, index) => {
      const radius = calculateRadius(skill.proficiency);
      const angle = (index / skills.length) * 2 * Math.PI;
      const centerX = width / 2;
      const centerY = height / 2;
      const initialDistance = Math.min(width, height) * 0.2;

      return {
        id: skill.name,
        name: skill.name,
        proficiency: skill.proficiency,
        category: skill.category,
        x: centerX + Math.cos(angle) * initialDistance,
        y: centerY + Math.sin(angle) * initialDistance,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius,
        color: getCategoryColor(skill.category),
        icon: skill.icon,
        experience: skill.experience,
        description: `${skill.proficiency}/10 proficiency with ${skill.experience} experience`,
        isDragging: false,
        isSelected: false,
        isHighlighted: false,
        relatedTechnologies: TECHNOLOGY_CONNECTIONS[skill.name] || [],
      };
    });

    setBubbles(newBubbles);
    setConnections(generateConnections(newBubbles));
    setIsInitialized(true);
  }, [
    skills,
    width,
    height,
    calculateRadius,
    getCategoryColor,
    generateConnections,
  ]);

  // Enhanced physics system with connection forces
  const updatePhysics = useCallback(
    (bubbles: BubbleData[]): BubbleData[] => {
      if (!enablePhysics || prefersReducedMotion) return bubbles;

      return bubbles.map((bubble, i) => {
        // Skip physics for dragged bubbles
        if (bubble.isDragging) return bubble;

        let newVx = bubble.vx;
        let newVy = bubble.vy;
        let newX = bubble.x;
        let newY = bubble.y;

        // Mouse influence with enhanced interaction
        if (enableMouse) {
          const dx = mouseRef.current.x - bubble.x;
          const dy = mouseRef.current.y - bubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150 && distance > 0) {
            const force =
              ((150 - distance) / 150) * PHYSICS_CONFIG.mouseInfluence;
            const normalizedDx = dx / distance;
            const normalizedDy = dy / distance;

            // Stronger attraction when hovered
            const multiplier = hoveredBubble?.id === bubble.id ? 2 : 1;
            newVx += normalizedDx * force * multiplier;
            newVy += normalizedDy * force * multiplier;
          }
        }

        // Connection forces between related technologies
        if (enableConnections) {
          connections.forEach((connection) => {
            if (connection.from === bubble.id || connection.to === bubble.id) {
              const otherId =
                connection.from === bubble.id ? connection.to : connection.from;
              const otherBubble = bubbles.find((b) => b.id === otherId);

              if (otherBubble && !otherBubble.isDragging) {
                const dx = otherBubble.x - bubble.x;
                const dy = otherBubble.y - bubble.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const idealDistance =
                  (bubble.radius + otherBubble.radius) * 2.5;

                if (distance > idealDistance) {
                  const force =
                    (distance - idealDistance) *
                    PHYSICS_CONFIG.connectionForce *
                    connection.strength;
                  const normalizedDx = dx / distance;
                  const normalizedDy = dy / distance;

                  newVx += normalizedDx * force;
                  newVy += normalizedDy * force;
                }
              }
            }
          });
        }

        // Enhanced collision detection
        if (enableCollisions) {
          for (let j = 0; j < bubbles.length; j++) {
            if (i !== j) {
              const other = bubbles[j];
              const dx = other.x - bubble.x;
              const dy = other.y - bubble.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = bubble.radius + other.radius;

              if (distance < minDistance && distance > 0) {
                // Enhanced collision response
                const overlap = minDistance - distance;
                const normalizedDx = dx / distance;
                const normalizedDy = dy / distance;

                // Separate bubbles
                const separationX = normalizedDx * overlap * 0.5;
                const separationY = normalizedDy * overlap * 0.5;

                newX -= separationX;
                newY -= separationY;

                // Enhanced bounce effect with energy conservation
                const relativeVelocity = {
                  x: other.vx - bubble.vx,
                  y: other.vy - bubble.vy,
                };

                const velocityAlongNormal =
                  relativeVelocity.x * normalizedDx +
                  relativeVelocity.y * normalizedDy;

                if (velocityAlongNormal > 0) {
                  const restitution = PHYSICS_CONFIG.collisionDamping;
                  const impulse = velocityAlongNormal * restitution;

                  newVx -= impulse * normalizedDx * 0.5;
                  newVy -= impulse * normalizedDy * 0.5;
                }
              }
            }
          }
        }

        // Enhanced boundary collision with soft bounce
        const padding = bubble.radius;
        if (newX - padding < 0) {
          newX = padding;
          newVx = Math.abs(newVx) * PHYSICS_CONFIG.collisionDamping;
        } else if (newX + padding > width) {
          newX = width - padding;
          newVx = -Math.abs(newVx) * PHYSICS_CONFIG.collisionDamping;
        }

        if (newY - padding < 0) {
          newY = padding;
          newVy = Math.abs(newVy) * PHYSICS_CONFIG.collisionDamping;
        } else if (newY + padding > height) {
          newY = height - padding;
          newVy = -Math.abs(newVy) * PHYSICS_CONFIG.collisionDamping;
        }

        // Apply friction
        newVx *= PHYSICS_CONFIG.friction;
        newVy *= PHYSICS_CONFIG.friction;

        // Limit velocity
        const speed = Math.sqrt(newVx * newVx + newVy * newVy);
        if (speed > PHYSICS_CONFIG.maxVelocity) {
          newVx = (newVx / speed) * PHYSICS_CONFIG.maxVelocity;
          newVy = (newVy / speed) * PHYSICS_CONFIG.maxVelocity;
        }

        // Stop very slow movement
        if (speed < PHYSICS_CONFIG.minVelocity) {
          newVx = 0;
          newVy = 0;
        }

        // Update position
        newX += newVx;
        newY += newVy;

        return {
          ...bubble,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        };
      });
    },
    [
      enablePhysics,
      enableMouse,
      enableCollisions,
      enableConnections,
      width,
      height,
      prefersReducedMotion,
      hoveredBubble,
      connections,
    ]
  );

  // Performance-optimized animation loop
  const animate = useCallback(
    (currentTime: number) => {
      if (currentTime - lastFrameTime.current < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = currentTime - lastFrameTime.current;
      lastFrameTime.current = currentTime;

      // Update performance metrics
      setPerformanceMetrics({
        fps: Math.round(1000 / deltaTime),
        frameTime: deltaTime,
      });

      setBubbles((prevBubbles) => updatePhysics(prevBubbles));
      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [updatePhysics, frameInterval]
  );

  // Enhanced mouse tracking
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  // Enhanced bubble interaction handlers
  const handleBubbleHover = useCallback(
    (bubble: BubbleData | null) => {
      setHoveredBubble(bubble);

      // Highlight connected bubbles
      if (bubble && enableConnections) {
        setBubbles((prev) =>
          prev.map((b) => ({
            ...b,
            isHighlighted:
              b.id === bubble.id ||
              connections.some(
                (c) =>
                  (c.from === bubble.id && c.to === b.id) ||
                  (c.to === bubble.id && c.from === b.id)
              ),
          }))
        );
      } else {
        setBubbles((prev) => prev.map((b) => ({ ...b, isHighlighted: false })));
      }

      onBubbleHover?.(bubble);
    },
    [onBubbleHover, enableConnections, connections]
  );

  const handleBubbleClick = useCallback(
    (bubble: BubbleData) => {
      if (showDetailedTooltips) {
        setDetailedBubbleInfo({
          bubble,
          position: { x: bubble.x, y: bubble.y },
          showConnections: enableConnections,
        });
      }

      onBubbleClick?.(bubble);
    },
    [onBubbleClick, showDetailedTooltips, enableConnections]
  );

  const handleBubbleDoubleClick = useCallback(
    (bubble: BubbleData) => {
      // Center the bubble and highlight connections
      setBubbles((prev) =>
        prev.map((b) =>
          b.id === bubble.id
            ? {
                ...b,
                x: width / 2,
                y: height / 2,
                vx: 0,
                vy: 0,
                isSelected: true,
              }
            : { ...b, isSelected: false }
        )
      );

      onBubbleDoubleClick?.(bubble);
    },
    [onBubbleDoubleClick, width, height]
  );

  // Drag and drop functionality
  const handleDragStart = useCallback((bubble: BubbleData) => {
    setDraggedBubble(bubble.id);
    setBubbles((prev) =>
      prev.map((b) =>
        b.id === bubble.id ? { ...b, isDragging: true, vx: 0, vy: 0 } : b
      )
    );
  }, []);

  const handleDrag = useCallback(
    (bubble: BubbleData, info: PanInfo) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const newX = Math.max(
        bubble.radius,
        Math.min(width - bubble.radius, bubble.x + info.delta.x)
      );
      const newY = Math.max(
        bubble.radius,
        Math.min(height - bubble.radius, bubble.y + info.delta.y)
      );

      setBubbles((prev) =>
        prev.map((b) => (b.id === bubble.id ? { ...b, x: newX, y: newY } : b))
      );

      onBubbleDrag?.(bubble, { x: newX, y: newY });
    },
    [width, height, onBubbleDrag]
  );

  const handleDragEnd = useCallback((bubble: BubbleData, info: PanInfo) => {
    setDraggedBubble(null);

    // Apply velocity based on drag velocity
    const velocityMultiplier = 0.1;
    setBubbles((prev) =>
      prev.map((b) =>
        b.id === bubble.id
          ? {
              ...b,
              isDragging: false,
              vx: info.velocity.x * velocityMultiplier,
              vy: info.velocity.y * velocityMultiplier,
            }
          : b
      )
    );
  }, []);

  // Initialize bubbles on mount or skills change
  useEffect(() => {
    if (skills.length > 0) {
      initializeBubbles();
    }
  }, [skills, initializeBubbles]);

  // Start animation loop with performance optimization
  useEffect(() => {
    if (isInitialized && enablePhysics && !prefersReducedMotion) {
      lastFrameTime.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInitialized, enablePhysics, prefersReducedMotion, animate]);

  // Enhanced bubble variants for smooth animations
  const bubbleVariants = useMemo(
    () => ({
      initial: {
        scale: 0,
        opacity: 0,
        rotate: 180,
      },
      animate: {
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: Math.random() * 0.5,
        },
      },
      hover: {
        scale: 1.2,
        rotate: [0, -5, 5, 0],
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
          rotate: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          },
        },
      },
      selected: {
        scale: 1.3,
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        },
      },
      highlighted: {
        scale: 1.1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 15,
        },
      },
      dimmed: {
        opacity: 0.3,
        scale: 0.9,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 15,
        },
      },
      dragging: {
        scale: 1.4,
        rotate: 5,
        zIndex: 100,
        transition: {
          type: "spring",
          stiffness: 600,
          damping: 15,
        },
      },
    }),
    []
  );

  // Render connections between bubbles
  const renderConnections = () => {
    if (!enableConnections || prefersReducedMotion) return null;

    return (
      <g className="connections-layer">
        {connections.map((connection, index) => {
          const fromBubble = bubbles.find((b) => b.id === connection.from);
          const toBubble = bubbles.find((b) => b.id === connection.to);

          if (!fromBubble || !toBubble) return null;

          const isHighlighted =
            hoveredBubble &&
            (hoveredBubble.id === connection.from ||
              hoveredBubble.id === connection.to);

          return (
            <motion.line
              key={`${connection.from}-${connection.to}`}
              x1={fromBubble.x}
              y1={fromBubble.y}
              x2={toBubble.x}
              y2={toBubble.y}
              stroke={
                connection.category === "similar" ? fromBubble.color : "#666"
              }
              strokeWidth={connection.strength * (isHighlighted ? 3 : 1)}
              opacity={connection.strength * (isHighlighted ? 0.8 : 0.3)}
              strokeDasharray={
                connection.category === "complementary" ? "5,5" : "none"
              }
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: connection.strength * (isHighlighted ? 0.8 : 0.3),
                strokeWidth: connection.strength * (isHighlighted ? 3 : 1),
              }}
              transition={{
                pathLength: { duration: 1, delay: index * 0.1 },
                opacity: { duration: 0.3 },
                strokeWidth: { duration: 0.3 },
              }}
            />
          );
        })}
      </g>
    );
  };

  // Fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
        style={{ width, height }}
      >
        <div className="grid grid-cols-4 gap-4 p-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center p-4 bg-card rounded-lg border border-border cursor-pointer hover:bg-muted transition-colors"
              onClick={() =>
                handleBubbleClick({
                  id: skill.name,
                  name: skill.name,
                  proficiency: skill.proficiency,
                  category: skill.category,
                  x: 0,
                  y: 0,
                  vx: 0,
                  vy: 0,
                  radius: calculateRadius(skill.proficiency),
                  color: getCategoryColor(skill.category),
                  experience: skill.experience,
                  description: `${skill.proficiency}/10 proficiency with ${skill.experience} experience`,
                })
              }
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: getCategoryColor(skill.category) }}
              >
                {skill.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="mt-2 text-sm font-medium text-foreground">
                {skill.name}
              </span>
              <span className="text-xs text-muted">{skill.proficiency}/10</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-pointer", className)}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => handleBubbleHover(null)}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Render connections first (behind bubbles) */}
        {renderConnections()}

        {/* Render bubbles */}
        <AnimatePresence>
          {bubbles.map((bubble) => {
            const isDimmed =
              hoveredBubble &&
              hoveredBubble.id !== bubble.id &&
              !bubble.isHighlighted;

            return (
              <motion.g
                key={bubble.id}
                variants={bubbleVariants}
                initial="initial"
                animate={
                  bubble.isDragging
                    ? "dragging"
                    : bubble.isSelected
                    ? "selected"
                    : bubble.isHighlighted
                    ? "highlighted"
                    : isDimmed
                    ? "dimmed"
                    : hoveredBubble?.id === bubble.id
                    ? "hover"
                    : "animate"
                }
                exit="initial"
                drag={enableDrag}
                onDragStart={() => handleDragStart(bubble)}
                onDrag={(_, info) => handleDrag(bubble, info)}
                onDragEnd={(_, info) => handleDragEnd(bubble, info)}
                onHoverStart={() => handleBubbleHover(bubble)}
                onHoverEnd={() => handleBubbleHover(null)}
                onClick={() => handleBubbleClick(bubble)}
                onDoubleClick={() => handleBubbleDoubleClick(bubble)}
                style={{
                  cursor: enableDrag ? "grab" : "pointer",
                  zIndex: bubble.isDragging ? 100 : bubble.isSelected ? 50 : 1,
                }}
                whileDrag={{ cursor: "grabbing" }}
              >
                {/* Enhanced bubble with glow effect */}
                <motion.circle
                  cx={bubble.x}
                  cy={bubble.y}
                  r={bubble.radius}
                  fill={bubble.color}
                  fillOpacity={0.8}
                  stroke={bubble.color}
                  strokeWidth={
                    bubble.isSelected ? 4 : bubble.isHighlighted ? 3 : 2
                  }
                  strokeOpacity={
                    bubble.isSelected || bubble.isHighlighted ? 1 : 0.6
                  }
                  style={{
                    filter: bubble.isSelected
                      ? `drop-shadow(0 0 20px ${bubble.color}40) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))`
                      : bubble.isHighlighted || hoveredBubble?.id === bubble.id
                      ? `drop-shadow(0 0 10px ${bubble.color}30) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))`
                      : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                  }}
                />

                {/* Pulse ring for selected bubble */}
                {bubble.isSelected && (
                  <motion.circle
                    cx={bubble.x}
                    cy={bubble.y}
                    r={bubble.radius + 10}
                    fill="none"
                    stroke={bubble.color}
                    strokeWidth={2}
                    strokeOpacity={0.4}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Bubble text with enhanced styling */}
                <text
                  x={bubble.x}
                  y={bubble.y - 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize={Math.max(10, bubble.radius / 3)}
                  fontWeight="600"
                  pointerEvents="none"
                  style={{
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
                    filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3))",
                  }}
                >
                  {bubble.name.length > 8
                    ? bubble.name.slice(0, 8) + "..."
                    : bubble.name}
                </text>

                {/* Enhanced proficiency indicator */}
                <text
                  x={bubble.x}
                  y={bubble.y + 8}
                  textAnchor="middle"
                  fill="white"
                  fontSize={Math.max(8, bubble.radius / 4)}
                  fontWeight="400"
                  opacity={0.9}
                  pointerEvents="none"
                  style={{
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {bubble.proficiency}/10
                </text>
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>

      {/* Enhanced Tooltip */}
      <AnimatePresence>
        {showTooltips && hoveredBubble && !draggedBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="absolute pointer-events-none z-20 bg-card border border-border rounded-lg p-4 shadow-xl backdrop-blur-sm"
            style={{
              left: Math.min(
                hoveredBubble.x + hoveredBubble.radius + 15,
                width - 250
              ),
              top: Math.max(hoveredBubble.y - 40, 10),
              maxWidth: 240,
            }}
          >
            <div className="font-semibold text-foreground text-lg">
              {hoveredBubble.name}
            </div>
            <div className="text-sm text-muted mt-1 space-y-1">
              <div>
                Category:{" "}
                <span className="capitalize font-medium">
                  {hoveredBubble.category}
                </span>
              </div>
              <div>
                Experience:{" "}
                <span className="font-medium">{hoveredBubble.experience}</span>
              </div>
              <div>
                Proficiency:{" "}
                <span className="font-medium">
                  {hoveredBubble.proficiency}/10
                </span>
              </div>
              {hoveredBubble.relatedTechnologies &&
                hoveredBubble.relatedTechnologies.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <div className="text-xs font-medium text-muted mb-1">
                      Related Technologies:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {hoveredBubble.relatedTechnologies
                        .slice(0, 3)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-muted rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
            </div>
            {showDetailedTooltips && (
              <div className="text-xs text-muted mt-2 pt-2 border-t border-border">
                Click for details • Double-click to center • Drag to move
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Bubble Information Modal */}
      <AnimatePresence>
        {detailedBubbleInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center"
            onClick={() => setDetailedBubbleInfo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-card border border-border rounded-xl p-6 shadow-2xl max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: detailedBubbleInfo.bubble.color }}
                >
                  {detailedBubbleInfo.bubble.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {detailedBubbleInfo.bubble.name}
                  </h3>
                  <p className="text-muted capitalize">
                    {detailedBubbleInfo.bubble.category}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="font-medium text-foreground">
                    Experience:{" "}
                  </span>
                  <span className="text-muted">
                    {detailedBubbleInfo.bubble.experience}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-foreground">
                    Proficiency:{" "}
                  </span>
                  <span className="text-muted">
                    {detailedBubbleInfo.bubble.proficiency}/10
                  </span>
                </div>
                <div>
                  <span className="font-medium text-foreground">
                    Description:{" "}
                  </span>
                  <span className="text-muted">
                    {detailedBubbleInfo.bubble.description}
                  </span>
                </div>

                {detailedBubbleInfo.bubble.relatedTechnologies &&
                  detailedBubbleInfo.bubble.relatedTechnologies.length > 0 && (
                    <div>
                      <span className="font-medium text-foreground">
                        Related Technologies:{" "}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {detailedBubbleInfo.bubble.relatedTechnologies.map(
                          (tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-muted text-muted rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>

              <button
                onClick={() => setDetailedBubbleInfo(null)}
                className="w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Metrics (debug mode) */}
      {performanceMode === "high" && (
        <div className="absolute top-2 right-2 text-xs text-muted bg-card/80 px-2 py-1 rounded backdrop-blur-sm">
          FPS: {performanceMetrics.fps} | Frame:{" "}
          {performanceMetrics.frameTime.toFixed(1)}ms
        </div>
      )}
    </div>
  );
};

/**
 * Tech Stack Bubble Visualization - Pre-built component for tech stack showcase
 */
export interface TechStackBubbleProps extends Omit<BubbleUIProps, "skills"> {
  technologies: Skill[];
  title?: string;
  description?: string;
  compact?: boolean;
}

export const TechStackBubble: React.FC<TechStackBubbleProps> = ({
  technologies,
  title = "Tech Stack",
  description = "My technology expertise visualized",
  compact = false,
  className = "",
  ...props
}) => {
  const containerWidth = compact ? 400 : 800;
  const containerHeight = compact ? 300 : 600;

  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className="text-center space-y-2">
          {title && (
            <h3 className="text-2xl font-bold text-foreground">{title}</h3>
          )}
          {description && (
            <p className="text-muted max-w-md mx-auto">{description}</p>
          )}
        </div>
      )}

      <BubbleUI
        skills={technologies}
        width={containerWidth}
        height={containerHeight}
        className="mx-auto border border-border rounded-lg bg-card/50"
        {...props}
      />
    </div>
  );
};

/**
 * Skills Category Bubble - Grouped bubble visualization by category
 */
export interface SkillsCategoryBubbleProps {
  skillsByCategory: Record<SkillCategory, Skill[]>;
  className?: string;
  onCategorySelect?: (category: SkillCategory) => void;
}

export const SkillsCategoryBubble: React.FC<SkillsCategoryBubbleProps> = ({
  skillsByCategory,
  className = "",
  onCategorySelect,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory | null>(null);

  const handleCategoryClick = (category: SkillCategory) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    onCategorySelect?.(category);
  };

  const displaySkills = selectedCategory
    ? skillsByCategory[selectedCategory]
    : Object.values(skillsByCategory).flat();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full border transition-colors",
            !selectedCategory
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card border-border hover:bg-muted"
          )}
        >
          All Skills
        </button>
        {Object.keys(skillsByCategory).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category as SkillCategory)}
            className={cn(
              "px-4 py-2 rounded-full border transition-colors capitalize",
              selectedCategory === category
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border hover:bg-muted"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Bubble Visualization */}
      <BubbleUI
        skills={displaySkills}
        width={800}
        height={500}
        className="mx-auto border border-border rounded-lg bg-card/50"
        showTooltips={true}
        enablePhysics={true}
        enableMouse={true}
        enableCollisions={true}
      />
    </div>
  );
};

export default BubbleUI;
