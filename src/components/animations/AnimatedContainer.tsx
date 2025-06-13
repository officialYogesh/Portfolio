"use client";

import { motion, Variants, Transition } from "framer-motion";
import React, { useMemo } from "react";

import {
  useScrollAnimation,
  useReducedMotion,
} from "../../lib/animations/hooks";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade" | "slide" | "scale";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  as?: React.ElementType; // This will determine the inner element type
}

/**
 * Optimized animated container component with scroll-triggered animations
 * Automatically handles reduced motion preferences and performance optimization
 */
export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className = "",
  variant = "fade",
  direction = "up",
  delay = 0,
  duration = 0.6, // Unified duration across Home page for consistent feel
  threshold = 0.1,
  triggerOnce = true,
  as: InnerComponent = "div",
}) => {
  const { ref, controls } = useScrollAnimation(threshold, triggerOnce);
  const { prefersReducedMotion, getDuration } = useReducedMotion();

  // Memoize animation variants to prevent unnecessary recalculations
  const animationVariants = useMemo((): Variants => {
    const baseDuration = getDuration(duration);

    // Optimized transition with better performance settings
    const baseTransition: Transition = {
      type: "tween", // Use tween instead of spring for better performance
      duration: baseDuration,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94], // Optimized easing curve
    };

    // Reduced movement for better performance
    const optimizedMovement = 10; // Reduced from default values

    switch (variant) {
      case "slide":
        return {
          hidden: {
            opacity: 0,
            y:
              direction === "up"
                ? optimizedMovement
                : direction === "down"
                ? -optimizedMovement
                : 0,
            x:
              direction === "left"
                ? optimizedMovement
                : direction === "right"
                ? -optimizedMovement
                : 0,
          },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: baseTransition,
          },
        };
      case "scale":
        return {
          hidden: {
            opacity: 0,
            scale: 0.95, // Minimal scale change for performance
          },
          visible: {
            opacity: 1,
            scale: 1,
            transition: baseTransition,
          },
        };
      case "fade":
      default:
        return {
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: baseTransition,
          },
        };
    }
  }, [variant, direction, getDuration, duration, delay]);

  // Early return for reduced motion
  if (prefersReducedMotion) {
    return (
      <InnerComponent ref={ref} className={className}>
        {children}
      </InnerComponent>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={animationVariants}
      // Performance optimizations
      style={{ willChange: "transform, opacity" }}
    >
      <InnerComponent>{children}</InnerComponent>
    </motion.div>
  );
};

export default AnimatedContainer;
