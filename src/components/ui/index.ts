// Basic UI Components
export {
  Button,
  PrimaryButton,
  SecondaryButton,
  AccentButton,
  OutlineButton,
  GhostButton,
  DestructiveButton,
} from "./Button";
export type { ButtonProps } from "./Button";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  ProjectCard,
} from "./Card";
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  ProjectCardProps,
} from "./Card";

export { Badge, TechBadge, StatusBadge } from "./Badge";
export type { BadgeProps, TechBadgeProps, StatusBadgeProps } from "./Badge";

export {
  Skeleton,
  TextSkeleton,
  CardSkeleton,
  ProjectCardSkeleton,
  ProfileSkeleton,
  ListSkeleton,
  TableSkeleton,
  PageSkeleton,
} from "./Skeleton";
export type {
  SkeletonProps,
  TextSkeletonProps,
  CardSkeletonProps,
  ProfileSkeletonProps,
  ListSkeletonProps,
  TableSkeletonProps,
} from "./Skeleton";

export { Modal, Lightbox, ConfirmationModal } from "./Modal";
export type {
  ModalProps,
  LightboxProps,
  ConfirmationModalProps,
} from "./Modal";

export { Input, Textarea, Select } from "./Input";
export type { InputProps, TextareaProps, SelectProps } from "./Input";

// Existing components (default exports)
export { default as LoadingSpinner } from "./LoadingSpinner";

export { default as ErrorBoundary } from "./ErrorBoundary";

export { SkipLink } from "./SkipLink";

export { ThemeSelector } from "./ThemeSelector";
