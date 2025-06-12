import { useMemo } from "react";
import type { Project } from "../../config/projects";

export type SortOption = "newest" | "oldest" | "featured" | "title" | "status";

export interface SortConfig {
  option: SortOption;
  direction: "asc" | "desc";
}

export interface ProjectFilterState {
  selectedCategory: string;
  selectedStatus: string;
  selectedTech: string;
  searchQuery: string;
  sortConfig: SortConfig;
}

export const useProjectFilter = (
  projects: Project[],
  {
    selectedCategory,
    selectedStatus,
    selectedTech,
    searchQuery,
    sortConfig,
  }: ProjectFilterState
) => {
  // Filter + sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    if (selectedTech !== "all") {
      filtered = filtered.filter((p) =>
        p.technologies.some((tech) => tech.name === selectedTech)
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.fullDescription.toLowerCase().includes(query) ||
          p.role.toLowerCase().includes(query) ||
          p.technologies.some((t) => t.name.toLowerCase().includes(query))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      const aDate = new Date(a.endDate || a.startDate).getTime();
      const bDate = new Date(b.endDate || b.startDate).getTime();
      const aStart = new Date(a.startDate).getTime();
      const bStart = new Date(b.startDate).getTime();

      switch (sortConfig.option) {
        case "newest":
          comparison = aDate - bDate;
          break;
        case "oldest":
          comparison = aStart - bStart;
          break;
        case "featured":
          if (a.featured !== b.featured) {
            comparison = (a.featured ? 1 : 0) - (b.featured ? 1 : 0);
          } else {
            comparison = aDate - bDate;
          }
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "status":
          const order = {
            archived: 1,
            planned: 2,
            completed: 3,
            "in-progress": 4,
          } as const;
          comparison = order[a.status] - order[b.status];
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [
    projects,
    selectedCategory,
    selectedStatus,
    selectedTech,
    searchQuery,
    sortConfig,
  ]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: projects.length,
      completed: projects.filter((p) => p.status === "completed").length,
      inProgress: projects.filter((p) => p.status === "in-progress").length,
      featured: projects.filter((p) => p.featured).length,
    };
  }, [projects]);

  return { filteredProjects, stats } as const;
};
