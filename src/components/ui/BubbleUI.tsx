"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export interface BubbleUIProps {
  skills: Skill[];
  width?: number;
  height?: number;
  className?: string;
  enablePhysics?: boolean;
  enableMouse?: boolean;
  enableCollisions?: boolean;
  onBubbleHover?: (bubble: BubbleData | null) => void;
  onBubbleClick?: (bubble: BubbleData) => void;
  showTooltips?: boolean;
  theme?: "light" | "dark" | "auto";
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

// Physics constants
const PHYSICS_CONFIG = {
  friction: 0.95,
  mouseInfluence: 0.02,
  collisionDamping: 0.8,
  minVelocity: 0.1,
  maxVelocity: 2,
  repelForce: 0.3,
  attractForce: 0.1,
  gravityStrength: 0.1,
} as const;

/**
 * Bubble UI Core Implementation Component
 */
export const BubbleUI: React.FC<BubbleUIProps> = ({
  skills,
  width = 800,
  height = 600,
  className = "",
  enablePhysics = true,
  enableMouse = true,
  enableCollisions = true,
  onBubbleHover,
  onBubbleClick,
  showTooltips = true,
  theme = "auto",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [hoveredBubble, setHoveredBubble] = useState<BubbleData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { prefersReducedMotion } = useReducedMotion();

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

  // Initialize bubbles with physics properties
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
      };
    });

    setBubbles(newBubbles);
    setIsInitialized(true);
  }, [skills, width, height, calculateRadius, getCategoryColor]);

  // Physics-based movement and collision detection
  const updatePhysics = useCallback(
    (bubbles: BubbleData[]): BubbleData[] => {
      if (!enablePhysics || prefersReducedMotion) return bubbles;

      return bubbles.map((bubble, i) => {
        let newVx = bubble.vx;
        let newVy = bubble.vy;
        let newX = bubble.x;
        let newY = bubble.y;

        // Mouse influence
        if (enableMouse) {
          const dx = mouseRef.current.x - bubble.x;
          const dy = mouseRef.current.y - bubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150 && distance > 0) {
            const force =
              ((150 - distance) / 150) * PHYSICS_CONFIG.mouseInfluence;
            const normalizedDx = dx / distance;
            const normalizedDy = dy / distance;

            newVx += normalizedDx * force;
            newVy += normalizedDy * force;
          }
        }

        // Collision detection with other bubbles
        if (enableCollisions) {
          for (let j = 0; j < bubbles.length; j++) {
            if (i !== j) {
              const other = bubbles[j];
              const dx = other.x - bubble.x;
              const dy = other.y - bubble.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = bubble.radius + other.radius;

              if (distance < minDistance && distance > 0) {
                // Collision response
                const overlap = minDistance - distance;
                const normalizedDx = dx / distance;
                const normalizedDy = dy / distance;

                // Separate bubbles
                const separationX = normalizedDx * overlap * 0.5;
                const separationY = normalizedDy * overlap * 0.5;

                newX -= separationX;
                newY -= separationY;

                // Bounce effect
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

        // Boundary collision
        if (newX - bubble.radius < 0) {
          newX = bubble.radius;
          newVx = -newVx * PHYSICS_CONFIG.collisionDamping;
        } else if (newX + bubble.radius > width) {
          newX = width - bubble.radius;
          newVx = -newVx * PHYSICS_CONFIG.collisionDamping;
        }

        if (newY - bubble.radius < 0) {
          newY = bubble.radius;
          newVy = -newVy * PHYSICS_CONFIG.collisionDamping;
        } else if (newY + bubble.radius > height) {
          newY = height - bubble.radius;
          newVy = -newVy * PHYSICS_CONFIG.collisionDamping;
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
      width,
      height,
      prefersReducedMotion,
    ]
  );

  // Animation loop
  const animate = useCallback(() => {
    setBubbles((prevBubbles) => updatePhysics(prevBubbles));
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updatePhysics]);

  // Mouse tracking
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  // Bubble interaction handlers
  const handleBubbleHover = useCallback(
    (bubble: BubbleData | null) => {
      setHoveredBubble(bubble);
      onBubbleHover?.(bubble);
    },
    [onBubbleHover]
  );

  const handleBubbleClick = useCallback(
    (bubble: BubbleData) => {
      onBubbleClick?.(bubble);
    },
    [onBubbleClick]
  );

  // Initialize bubbles on mount or skills change
  useEffect(() => {
    if (skills.length > 0) {
      initializeBubbles();
    }
  }, [skills, initializeBubbles]);

  // Start animation loop
  useEffect(() => {
    if (isInitialized && enablePhysics && !prefersReducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInitialized, enablePhysics, prefersReducedMotion, animate]);

  // Bubble variants for animations
  const bubbleVariants = useMemo(
    () => ({
      initial: {
        scale: 0,
        opacity: 0,
      },
      animate: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: Math.random() * 0.5,
        },
      },
      hover: {
        scale: 1.1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      },
      tap: {
        scale: 0.95,
        transition: {
          type: "spring",
          stiffness: 600,
          damping: 15,
        },
      },
    }),
    []
  );

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
              className="flex flex-col items-center p-4 bg-card rounded-lg border border-border"
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
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.g
              key={bubble.id}
              variants={bubbleVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => handleBubbleHover(bubble)}
              onHoverEnd={() => handleBubbleHover(null)}
              onClick={() => handleBubbleClick(bubble)}
              style={{ cursor: "pointer" }}
            >
              <motion.circle
                cx={bubble.x}
                cy={bubble.y}
                r={bubble.radius}
                fill={bubble.color}
                fillOpacity={0.8}
                stroke={bubble.color}
                strokeWidth={2}
                strokeOpacity={hoveredBubble?.id === bubble.id ? 1 : 0.6}
                style={{
                  filter:
                    hoveredBubble?.id === bubble.id
                      ? "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))"
                      : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                }}
              />

              {/* Bubble text */}
              <text
                x={bubble.x}
                y={bubble.y - 5}
                textAnchor="middle"
                fill="white"
                fontSize={Math.max(10, bubble.radius / 3)}
                fontWeight="600"
                pointerEvents="none"
              >
                {bubble.name.length > 8
                  ? bubble.name.slice(0, 8) + "..."
                  : bubble.name}
              </text>

              {/* Proficiency indicator */}
              <text
                x={bubble.x}
                y={bubble.y + 8}
                textAnchor="middle"
                fill="white"
                fontSize={Math.max(8, bubble.radius / 4)}
                fontWeight="400"
                opacity={0.9}
                pointerEvents="none"
              >
                {bubble.proficiency}/10
              </text>
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltips && hoveredBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute pointer-events-none z-10 bg-card border border-border rounded-lg p-3 shadow-lg"
            style={{
              left: hoveredBubble.x + hoveredBubble.radius + 10,
              top: hoveredBubble.y - 30,
              maxWidth: 200,
            }}
          >
            <div className="font-semibold text-foreground">
              {hoveredBubble.name}
            </div>
            <div className="text-sm text-muted mt-1">
              Category: {hoveredBubble.category}
            </div>
            <div className="text-sm text-muted">
              Experience: {hoveredBubble.experience}
            </div>
            <div className="text-sm text-muted">
              Proficiency: {hoveredBubble.proficiency}/10
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
