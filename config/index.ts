// Configuration Index
// This file exports all configuration files and types for easy importing

// Personal Information
export { personalInfo } from "./personal-info";
export type { PersonalInfo, SocialLink } from "./personal-info";

// Skills and Technologies
export {
  skills,
  skillCategories,
  getSkillsByCategory,
  getAllCategories,
} from "./skills";
export type { Skill, SkillCategory, SkillCategoryInfo } from "./skills";

// Theme System
export {
  themes,
  defaultTheme,
  themeList,
  getTheme,
  applyTheme,
  getStoredTheme,
  initializeTheme,
  themeDescriptions,
  getSystemPreference,
  getThemeForSystemPreference,
  initializeThemeWithSystemPreference,
  setupSystemPreferenceListener,
} from "./themes";
export type { ThemeColors, ThemeName } from "./themes";

// Projects
export {
  projects,
  projectCategories,
  getProjectById,
  getProjectsByCategory,
  getFeaturedProjects,
  getProjectsByStatus,
  getAllCategories as getAllProjectCategories,
  getProjectTechnologies,
} from "./projects";
export type {
  Project,
  ProjectLink,
  ProjectTechnology,
  ProjectFeature,
  ProjectCategory,
} from "./projects";

// Education and Certifications
export {
  education,
  certifications,
  achievements,
  onlineCourses,
  getEducationById,
  getCertificationById,
  getAchievementById,
  getCertificationsByCategory,
  getAchievementsByCategory,
  getActiveCertifications,
  getRecentAchievements,
  getAllSkillsFromEducation,
} from "./education";
export type {
  EducationDegree,
  Certification,
  Achievement,
  OnlineCourse,
} from "./education";

// Validation System
export {
  validateAllConfigurations,
  validateConfigurationsForBuild,
} from "./validation";
export type { ValidationError, ValidationResult } from "./validation";

// Import for default export
import { personalInfo } from "./personal-info";
import { skills, skillCategories } from "./skills";
import { themes } from "./themes";
import { projects, projectCategories } from "./projects";
import {
  education,
  certifications,
  achievements,
  onlineCourses,
} from "./education";

// Re-export default configurations for backwards compatibility
export default {
  personalInfo,
  skills,
  skillCategories,
  themes,
  projects,
  projectCategories,
  education,
  certifications,
  achievements,
  onlineCourses,
};
