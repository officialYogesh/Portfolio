"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

const buttonVariants = {
  primary:
    "bg-primary text-background hover:bg-opacity-90 focus:ring-primary/50",
  secondary:
    "bg-secondary text-background hover:bg-opacity-90 focus:ring-secondary/50",
  accent: "bg-accent text-background hover:bg-opacity-90 focus:ring-accent/50",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-background focus:ring-primary/50",
  ghost:
    "text-foreground hover:bg-muted hover:text-foreground focus:ring-muted/50",
  destructive:
    "bg-destructive text-background hover:bg-opacity-90 focus:ring-destructive/50",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
};

const buttonAnimations = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15, ease: "easeInOut" },
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  className = "",
  children,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const buttonClasses = cn(
    // Base styles
    "relative inline-flex items-center justify-center",
    "font-medium rounded-lg transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "active:scale-95 transform-gpu",

    // Variant styles
    buttonVariants[variant],

    // Size styles
    buttonSizes[size],

    // State styles
    fullWidth ? "w-full" : "",
    isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",

    className
  );

  const iconClasses = cn(
    "flex-shrink-0",
    iconPosition === "left" && children ? "mr-2" : "",
    iconPosition === "right" && children ? "ml-2" : ""
  );

  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <motion.button
      className={buttonClasses}
      disabled={isDisabled}
      {...buttonAnimations}
      {...props}
    >
      {loading && <LoadingSpinner />}

      <span className={cn("flex items-center", loading ? "opacity-0" : "")}>
        {icon && iconPosition === "left" && (
          <span className={iconClasses}>{icon}</span>
        )}

        {children}

        {icon && iconPosition === "right" && (
          <span className={iconClasses}>{icon}</span>
        )}
      </span>
    </motion.button>
  );
};

// Button variants for common use cases
export const PrimaryButton: React.FC<Omit<ButtonProps, "variant">> = (
  props
) => <Button variant="primary" {...props} />;

export const SecondaryButton: React.FC<Omit<ButtonProps, "variant">> = (
  props
) => <Button variant="secondary" {...props} />;

export const AccentButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
  <Button variant="accent" {...props} />
);

export const OutlineButton: React.FC<Omit<ButtonProps, "variant">> = (
  props
) => <Button variant="outline" {...props} />;

export const GhostButton: React.FC<Omit<ButtonProps, "variant">> = (props) => (
  <Button variant="ghost" {...props} />
);

export const DestructiveButton: React.FC<Omit<ButtonProps, "variant">> = (
  props
) => <Button variant="destructive" {...props} />;

export default Button;
