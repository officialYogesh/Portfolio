"use client";

import React from "react";
import { motion, Variants, Transition } from "framer-motion";
import {
  useScrollAnimation,
  useReducedMotion,
} from "../../lib/animations/hooks";
import {
  fadeVariants,
  slideVariants,
  scaleVariants,
} from "../../lib/animations/variants";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade" | "slide" | "scale";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  as?: React.ElementType;
}

/**
 * Animated container component with scroll-triggered animations
 * Automatically handles reduced motion preferences
 */
export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className = "",
  variant = "fade",
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  triggerOnce = true,
  as: Component = "div",
}) => {
  const { ref, controls } = useScrollAnimation(threshold, triggerOnce);
  const { prefersReducedMotion, getDuration } = useReducedMotion();

  // Select animation variant based on props
  const getAnimationVariants = (): Variants => {
    const baseDuration = getDuration(duration);
    const baseTransition: Transition = {
      duration: baseDuration,
      delay,
      ease: [0.4, 0, 0.2, 1],
    };

    switch (variant) {
      case "slide":
        return {
          ...slideVariants,
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: baseTransition,
          },
        };
      case "scale":
        return {
          ...scaleVariants,
          visible: {
            opacity: 1,
            scale: 1,
            transition: baseTransition,
          },
        };
      case "fade":
      default:
        return {
          ...fadeVariants,
          visible: {
            opacity: 1,
            transition: baseTransition,
          },
        };
    }
  };

  // If reduced motion is preferred, use immediate visibility
  if (prefersReducedMotion) {
    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    );
  }

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={getAnimationVariants()}
      custom={direction}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedContainer;
