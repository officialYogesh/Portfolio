"use client";

import { useState, useEffect, useCallback } from "react";

// Hook for tracking scroll progress
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY;
      const progress = (currentProgress / totalHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollProgress;
};

// Hook for parallax effects
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offset;
};

// Hook for section tracking
export const useSectionTracking = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState("");
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;

        if (entry.isIntersecting) {
          setActiveSection(sectionId);
        }

        // Mark section as completed when user scrolls past it
        if (
          entry.boundingClientRect.top < 0 &&
          entry.boundingClientRect.bottom < window.innerHeight / 2
        ) {
          setCompletedSections((prev) => new Set(prev).add(sectionId));
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds]);

  return { activeSection, completedSections };
};

// Hook for smooth scrolling
export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Adjust based on your header height
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return { scrollToSection };
};

// Hook for touch gestures (mobile interactions)
export const useTouchGestures = () => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Return gesture information for handling in components
    return { isLeftSwipe, isRightSwipe, distance };
  }, [touchStart, touchEnd]);

  return { onTouchStart, onTouchMove, onTouchEnd };
};

// Hook for theme-aware animations
export const useThemeAwareAnimations = () => {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    // Get current theme from DOM with memoization
    const getTheme = () => {
      const themeAttribute =
        document.documentElement.getAttribute("data-theme");
      return themeAttribute || "dracula";
    };

    setTheme(getTheme());

    // Debounced theme change handler to prevent excessive updates
    let timeoutId: NodeJS.Timeout;

    // Watch for theme changes with optimized observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          // Debounce theme updates to prevent animation jank
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setTheme(getTheme());
          }, 50);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // Memoized theme-specific animation variants to prevent recalculation
  const getThemeAnimations = useCallback(() => {
    const baseAnimations = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    };

    // Optimize transition configurations for smoother performance
    switch (theme) {
      case "nord":
        return {
          ...baseAnimations,
          transition: {
            type: "spring",
            stiffness: 120,
            damping: 15,
            mass: 0.8,
          },
        };
      case "gruvbox":
        return {
          ...baseAnimations,
          transition: {
            type: "tween",
            duration: 0.3,
            ease: "easeOut",
          },
        };
      case "solarized-dark":
        return {
          ...baseAnimations,
          transition: {
            type: "spring",
            stiffness: 140,
            damping: 12,
            mass: 0.7,
          },
        };
      default:
        return {
          ...baseAnimations,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 0.9,
          },
        };
    }
  }, [theme]);

  return { theme, getThemeAnimations };
};

// Hook for reading time calculation
export const useReadingTime = (content: string) => {
  const [readingTime, setReadingTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = content.split(/\s+/).filter((word) => word.length > 0);
    const wpm = 200; // Average reading speed
    const time = Math.ceil(words.length / wpm);

    setWordCount(words.length);
    setReadingTime(time);
  }, [content]);

  return { readingTime, wordCount };
};

// Hook for performance monitoring
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState({
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
  });

  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined" && "web-vitals" in window) {
      // This would require the web-vitals library
      // For now, we'll simulate metrics
      const mockMetrics = {
        lcp: Math.random() * 2000 + 1000, // 1-3 seconds
        fid: Math.random() * 50 + 10, // 10-60ms
        cls: Math.random() * 0.1, // 0-0.1
        fcp: Math.random() * 1500 + 500, // 0.5-2 seconds
      };
      setMetrics(mockMetrics);
    }
  }, []);

  return metrics;
};

// Hook for error handling
export const useErrorHandling = () => {
  const [errors, setErrors] = useState<Error[]>([]);

  const handleError = useCallback((error: Error) => {
    console.error("Application Error:", error);
    setErrors((prev) => [...prev, error]);

    // Report to error tracking service (e.g., Sentry)
    // errorTrackingService.captureException(error);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return { errors, handleError, clearErrors };
};
