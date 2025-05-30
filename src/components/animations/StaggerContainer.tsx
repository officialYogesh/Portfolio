"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  useScrollAnimation,
  useReducedMotion,
} from "../../lib/animations/hooks";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "../../lib/animations/variants";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Stagger container component for animating multiple children with delays
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0.1,
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const { ref, controls } = useScrollAnimation(threshold, triggerOnce);
  const { prefersReducedMotion } = useReducedMotion();

  // Create custom variants with provided delays
  const containerVariants = {
    ...staggerContainerVariants,
    visible: {
      ...staggerContainerVariants.visible,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : initialDelay,
      },
    },
  };

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Individual item component for use within StaggerContainer
 */
export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = "",
  as: Component = "div",
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const MotionComponent = motion(Component);

  return (
    <MotionComponent className={className} variants={staggerItemVariants}>
      {children}
    </MotionComponent>
  );
};

export default StaggerContainer;
