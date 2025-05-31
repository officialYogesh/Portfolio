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

// Simplified bubble data structure
export interface BubbleData {
  id: string;
  name: string;
  proficiency: number;
  category: SkillCategory;
  x: number;
  y: number;
  radius: number;
  color: string;
  icon?: string;
  isEmpty?: boolean; // For aesthetic-only bubbles
  sizeVariant?: "small" | "medium" | "large"; // Size variation
}

export interface BubbleUIProps {
  skills: Skill[];
  width?: number | string;
  height?: number | string;
  className?: string;
  showIcons?: boolean;
  responsive?: boolean;
  maxSkills?: number;
  aestheticBubbles?: number; // Number of empty bubbles for aesthetics
  sizeVariation?: boolean; // Enable varied bubble sizes
}

// Theme-aware category colors - updated for a more harmonious, screenshot-like appearance
const getCategoryThemeColor = (category: SkillCategory): string => {
  // Using shades of blues, purples, and a few accents, with varying lightness/saturation
  // to mimic the theme-blending flat look in the screenshot. HSL values.
  const categoryColors: Record<SkillCategory, string> = {
    frontend: "210, 70%, 55%", // Brighter Blue
    backend: "230, 60%, 65%", // Medium Purple-Blue
    database: "250, 65%, 60%", // Vibrant Purple
    tools: "190, 60%, 50%", // Teal/Cyan
    cloud: "220, 50%, 70%", // Lighter, desaturated Blue
    testing: "270, 60%, 70%", // Soft Lavender
    mobile: "200, 75%, 50%", // Stronger Cyan-Blue
  };
  return categoryColors[category] || "240, 50%, 65%"; // Default to a muted purple
};

// Enhanced tech icons
const TECH_ICONS: Record<string, string> = {
  React: "⚛️",
  "Next.js": "▲",
  TypeScript: "TS",
  JavaScript: "JS",
  "Node.js": "🟢",
  Python: "🐍",
  "Express.js": "EX",
  MongoDB: "🍃",
  PostgreSQL: "🐘",
  MySQL: "🐬",
  Docker: "🐳",
  AWS: "☁️",
  "Tailwind CSS": "💨",
  CSS3: "🎨",
  HTML5: "📄",
  Git: "📦",
  GitHub: "🐙",
  Firebase: "🔥",
  Redis: "🔴",
  "React Native": "📱",
  Flutter: "💙",
  Vue: "💚",
  Angular: "🔺",
  Sass: "💗",
  Webpack: "📦",
  Vite: "⚡",
  Jest: "🃏",
  Cypress: "🌲",
  Figma: "🎨",
  Photoshop: "PS",
  Laravel: "🎯",
  Django: "🎸",
  FastAPI: "⚡",
  Spring: "🌱",
  Kubernetes: "☸️",
  GraphQL: "📊",
  REST: "🌐",
  API: "🔌",
};

// Responsive configurations
const getResponsiveConfig = (
  containerPixelWidth: number,
  skillCount: number
) => {
  if (containerPixelWidth < 480) {
    return {
      minRadius: 35,
      maxRadius: 50,
      arrangeInGrid: skillCount > 8,
      fontSize: { icon: 16, text: 10 },
      textLength: 8,
      spacing: 20,
    };
  } else if (containerPixelWidth < 768) {
    return {
      minRadius: 40,
      maxRadius: 60,
      arrangeInGrid: skillCount > 12,
      fontSize: { icon: 20, text: 11 },
      textLength: 10,
      spacing: 25,
    };
  } else if (containerPixelWidth < 1024) {
    return {
      minRadius: 45,
      maxRadius: 70,
      arrangeInGrid: false,
      fontSize: { icon: 24, text: 12 },
      textLength: 12,
      spacing: 30,
    };
  } else {
    return {
      minRadius: 50,
      maxRadius: 80,
      arrangeInGrid: false,
      fontSize: { icon: 28, text: 13 },
      textLength: 15,
      spacing: 35,
    };
  }
};

export const BubbleUI: React.FC<BubbleUIProps> = ({
  skills,
  width: initialWidth = "100%",
  height: initialHeight = 500,
  className = "",
  showIcons = true,
  responsive = true,
  maxSkills = 6,
  aestheticBubbles = 4, // Default 4 empty bubbles
  sizeVariation = true, // Enable size variation by default
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const { prefersReducedMotion } = useReducedMotion();

  const isResponsiveMode = responsive;

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isClient || !isResponsiveMode) return;

    const updateDimensions = () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      if (newWidth > 0 && newHeight > 0) {
        if (
          svgDimensions.width !== newWidth ||
          svgDimensions.height !== newHeight
        ) {
          setSvgDimensions({ width: newWidth, height: newHeight });
        }
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);
    return () => resizeObserver.unobserve(container);
  }, [
    isClient,
    initialWidth,
    initialHeight,
    svgDimensions.width,
    svgDimensions.height,
    isResponsiveMode,
  ]);

  const currentNumConfig = useMemo(() => {
    const baseWidth = svgDimensions.width;
    const baseHeight = svgDimensions.height;

    if (baseWidth === 0 || baseHeight === 0) {
      return {
        containerWidth: typeof initialWidth === "number" ? initialWidth : 800,
        containerHeight:
          typeof initialHeight === "number" ? initialHeight : 500,
        minRadius: 45,
        maxRadius: 70,
        arrangeInGrid: false,
        fontSize: { icon: 24, text: 12 },
        textLength: 12,
        spacing: 30,
      };
    }

    const respSettings = getResponsiveConfig(baseWidth, skills.length);
    return {
      containerWidth: baseWidth,
      containerHeight: baseHeight,
      ...respSettings,
    };
  }, [svgDimensions, skills.length, initialWidth, initialHeight]);

  // Get size multiplier for different variants
  const getSizeMultiplier = (variant: "small" | "medium" | "large"): number => {
    switch (variant) {
      case "small":
        return 0.6;
      case "medium":
        return 1.0;
      case "large":
        return 1.4;
      default:
        return 1.0;
    }
  };

  // Randomly assign size variants
  const getRandomSizeVariant = (): "small" | "medium" | "large" => {
    const rand = Math.random();
    if (rand < 0.3) return "small";
    if (rand < 0.7) return "medium";
    return "large";
  };

  const calculateRadius = useCallback(
    (
      proficiency: number,
      sizeVariant?: "small" | "medium" | "large"
    ): number => {
      const baseRadius =
        currentNumConfig.minRadius +
        (proficiency / 10) *
          (currentNumConfig.maxRadius - currentNumConfig.minRadius);

      if (sizeVariation && sizeVariant) {
        return baseRadius * getSizeMultiplier(sizeVariant);
      }
      return baseRadius;
    },
    [currentNumConfig.minRadius, currentNumConfig.maxRadius, sizeVariation]
  );

  const getCategoryColor = useCallback((category: SkillCategory): string => {
    return getCategoryThemeColor(category);
  }, []);

  const getTechIcon = useCallback((techName: string): string => {
    return TECH_ICONS[techName] || techName.slice(0, 2).toUpperCase();
  }, []);

  // Only show top N skills by proficiency
  const sortedSkills = useMemo(
    () =>
      [...skills]
        .sort((a, b) => b.proficiency - a.proficiency)
        .slice(0, maxSkills),
    [skills, maxSkills]
  );

  // --- Enhanced Bubble Placement with Aesthetics and Edge Clipping ---
  const initializeBubbles = useCallback(() => {
    if (
      !isClient ||
      sortedSkills.length === 0 ||
      svgDimensions.width === 0 ||
      svgDimensions.height === 0
    )
      return;

    const { containerWidth, containerHeight, spacing } = currentNumConfig;
    const allBubbles: BubbleData[] = [];

    // Create skill bubbles
    sortedSkills.forEach((skill) => {
      const sizeVariant = sizeVariation ? getRandomSizeVariant() : "medium";
      const radius = calculateRadius(skill.proficiency, sizeVariant);

      allBubbles.push({
        id: skill.name,
        name: skill.name,
        proficiency: skill.proficiency,
        category: skill.category,
        x: 0, // Will be positioned later
        y: 0,
        radius,
        color: getCategoryColor(skill.category),
        icon: skill.icon,
        isEmpty: false,
        sizeVariant,
      });
    });

    // Create aesthetic bubbles (empty ones)
    for (let i = 0; i < aestheticBubbles; i++) {
      const categories: SkillCategory[] = [
        "frontend",
        "backend",
        "database",
        "tools",
        "cloud",
        "testing",
        "mobile",
      ];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const sizeVariant = sizeVariation ? getRandomSizeVariant() : "medium";
      const radius = calculateRadius(7, sizeVariant); // Use proficiency 7 as baseline

      allBubbles.push({
        id: `aesthetic-${i}`,
        name: "",
        proficiency: 7,
        category: randomCategory,
        x: 0,
        y: 0,
        radius,
        color: getCategoryColor(randomCategory),
        isEmpty: true,
        sizeVariant,
      });
    }

    // Position all bubbles with organic scatter and edge clipping
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    const maxDistance = Math.min(containerWidth, containerHeight) * 0.45;

    allBubbles.forEach((bubble) => {
      // Create more organic positioning
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * maxDistance;

      // Add some clustering around center with organic spread
      const clusterOffset = Math.random() * spacing * 3;
      let x =
        centerX +
        Math.cos(angle) * distance +
        (Math.random() - 0.5) * clusterOffset;
      let y =
        centerY +
        Math.sin(angle) * distance +
        (Math.random() - 0.5) * clusterOffset;

      // Allow edge clipping - extend beyond bounds for some bubbles
      const shouldClip = Math.random() < 0.3; // 30% chance of edge clipping
      if (shouldClip) {
        const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
        switch (edge) {
          case 0: // Top edge
            x = Math.random() * containerWidth;
            y = -bubble.radius * (0.3 + Math.random() * 0.4); // 30-70% clipped
            break;
          case 1: // Right edge
            x = containerWidth + bubble.radius * (0.3 + Math.random() * 0.4);
            y = Math.random() * containerHeight;
            break;
          case 2: // Bottom edge
            x = Math.random() * containerWidth;
            y = containerHeight + bubble.radius * (0.3 + Math.random() * 0.4);
            break;
          case 3: // Left edge
            x = -bubble.radius * (0.3 + Math.random() * 0.4);
            y = Math.random() * containerHeight;
            break;
        }
      }

      bubble.x = x;
      bubble.y = y;
    });

    // Simple collision avoidance for non-clipped bubbles
    for (let i = 0; i < allBubbles.length; i++) {
      for (let j = i + 1; j < allBubbles.length; j++) {
        const a = allBubbles[i];
        const b = allBubbles[j];

        // Skip collision detection for edge-clipped bubbles
        const aInBounds =
          a.x >= 0 &&
          a.x <= containerWidth &&
          a.y >= 0 &&
          a.y <= containerHeight;
        const bInBounds =
          b.x >= 0 &&
          b.x <= containerWidth &&
          b.y >= 0 &&
          b.y <= containerHeight;

        if (!aInBounds || !bInBounds) continue;

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = a.radius + b.radius + spacing * 0.8;

        if (dist < minDist && dist > 0) {
          const overlap = (minDist - dist) / 2;
          const angle = Math.atan2(dy, dx);
          a.x -= Math.cos(angle) * overlap * 0.5;
          a.y -= Math.sin(angle) * overlap * 0.5;
          b.x += Math.cos(angle) * overlap * 0.5;
          b.y += Math.sin(angle) * overlap * 0.5;
        }
      }
    }

    setBubbles(allBubbles);
  }, [
    sortedSkills,
    calculateRadius,
    getCategoryColor,
    currentNumConfig,
    isClient,
    svgDimensions,
    aestheticBubbles,
    sizeVariation,
  ]);

  useEffect(() => {
    if (
      sortedSkills.length > 0 &&
      isClient &&
      svgDimensions.width > 0 &&
      svgDimensions.height > 0
    ) {
      initializeBubbles();
    }
  }, [sortedSkills, initializeBubbles, isClient, svgDimensions]);

  // Clean bubble variants
  const bubbleVariants = useMemo(
    () => ({
      initial: {
        scale: 0,
        opacity: 0,
      },
      animate: (index: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: index * 0.05,
        },
      }),
      hover: {
        scale: 1.1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 17,
        },
      },
    }),
    []
  );

  const outerContainerStyle = {
    width: initialWidth,
    height: initialHeight,
    maxWidth: typeof initialWidth === "number" ? initialWidth : undefined,
  };

  if (!isClient || svgDimensions.width === 0 || svgDimensions.height === 0) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden flex items-center justify-center",
          className
        )}
        style={outerContainerStyle}
      >
        {isClient && (
          <div className="text-muted-foreground text-sm font-medium opacity-50">
            Loading skills...
          </div>
        )}
      </div>
    );
  }

  if (prefersReducedMotion || currentNumConfig.arrangeInGrid) {
    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
        style={outerContainerStyle}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4 h-full">
          {sortedSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: `hsl(${getCategoryColor(skill.category)})`,
                color: "white",
              }}
            >
              <div className="mb-1">
                {showIcons ? (
                  <span
                    className="text-2xl font-bold"
                    role="img"
                    aria-hidden="true"
                  >
                    {getTechIcon(skill.name)}
                  </span>
                ) : (
                  <span className="text-sm font-bold">
                    {skill.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-base font-semibold text-center leading-tight">
                {skill.name.length > 10
                  ? skill.name.slice(0, 10) + "..."
                  : skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Clean floating bubbles like in inspiration - NO container styling
  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={outerContainerStyle}
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        viewBox={`0 0 ${currentNumConfig.containerWidth} ${currentNumConfig.containerHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Ensured no shadow or glow filters here for flat design */}
        </defs>

        <AnimatePresence>
          {bubbles.map((bubble, index) => (
            <motion.g
              key={bubble.id}
              variants={bubbleVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              custom={index}
              whileHover={bubble.isEmpty ? undefined : "hover"} // Only hover on skill bubbles
              style={{ cursor: bubble.isEmpty ? "default" : "default" }}
            >
              {/* Main bubble - flat design, varied sizes */}
              <circle
                cx={bubble.x}
                cy={bubble.y}
                r={bubble.radius}
                fill={`hsl(${bubble.color})`}
                fillOpacity={bubble.isEmpty ? 0.7 : 1} // Slightly transparent for aesthetic bubbles
                stroke={`hsl(${bubble.color})`}
                strokeWidth={0.5}
                strokeOpacity={0.8}
              />

              {/* Only show content for skill bubbles, not aesthetic ones */}
              {!bubble.isEmpty && (
                <>
                  {/* Technology icon - centered */}
                  {showIcons && (
                    <text
                      x={bubble.x}
                      y={bubble.y - bubble.radius * 0.18}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={bubble.radius * 0.7}
                      fontWeight="500"
                      fill="white"
                      pointerEvents="none"
                      role="img"
                      aria-hidden="true"
                    >
                      {getTechIcon(bubble.name)}
                    </text>
                  )}

                  {/* Skill name - centered below icon */}
                  <text
                    x={bubble.x}
                    y={bubble.y + bubble.radius * 0.45}
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    fill="white"
                    fontSize={bubble.radius * 0.22}
                    fontWeight="500"
                    pointerEvents="none"
                  >
                    {bubble.name.length > currentNumConfig.textLength
                      ? bubble.name.slice(0, currentNumConfig.textLength) +
                        "..."
                      : bubble.name}
                  </text>
                </>
              )}
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export interface TechStackBubbleProps extends Omit<BubbleUIProps, "skills"> {
  technologies: Skill[];
  title?: string;
  description?: string;
  compact?: boolean;
  aestheticBubbles?: number;
  sizeVariation?: boolean;
}

export const TechStackBubble: React.FC<TechStackBubbleProps> = ({
  technologies,
  title = "Tech Stack",
  description = "My technology expertise",
  compact = false,
  className = "",
  responsive = true,
  width: explicitWidth,
  height: explicitHeight,
  aestheticBubbles = 4,
  sizeVariation = true,
  ...props
}) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 800
  );

  useEffect(() => {
    if (!responsive || typeof window === "undefined") return;

    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [responsive]);

  const getContainerDimensions = () => {
    if (explicitWidth !== undefined && explicitHeight !== undefined) {
      return { width: explicitWidth, height: explicitHeight };
    }
    if (!responsive) {
      return { width: compact ? 500 : 700, height: compact ? 400 : 500 };
    }
    if (windowWidth < 480) {
      return { width: "100%", height: compact ? 300 : 400 };
    } else if (windowWidth < 768) {
      return { width: "100%", height: compact ? 400 : 500 };
    } else {
      return { width: compact ? 700 : 900, height: compact ? 450 : 600 };
    }
  };

  const { width: bubbleUIWidth, height: bubbleUIHeight } =
    getContainerDimensions();

  return (
    <div className={cn("space-y-6", className)}>
      {(title || description) && (
        <div className="text-center space-y-3 px-4">
          {title && (
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      <BubbleUI
        skills={technologies}
        width={bubbleUIWidth}
        height={bubbleUIHeight}
        className="mx-auto"
        responsive={responsive}
        aestheticBubbles={aestheticBubbles}
        sizeVariation={sizeVariation}
        {...props}
      />
    </div>
  );
};

export default BubbleUI;
