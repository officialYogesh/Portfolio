"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeSelector } from "../ui/ThemeSelector";
import { SkipLink } from "../ui/SkipLink";
import { personalInfo } from "../../../config/personal-info";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { href: "/", label: "Home", ariaLabel: "Go to home page" },
    { href: "/about", label: "About", ariaLabel: "Learn more about me" },
    { href: "/projects", label: "Projects", ariaLabel: "View my projects" },
    { href: "/resume", label: "Resume", ariaLabel: "Download my resume" },
    { href: "/contact", label: "Contact", ariaLabel: "Get in touch with me" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Animation variants
  const headerVariants = {
    initial: { y: -100 },
    animate: { y: 0 },
    transition: { duration: 0.3, ease: "easeOut" },
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.05 },
    transition: { duration: 0.3 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const mobileMenuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: {
      opacity: 1,
      x: 0,
    },
  };

  // Generate initials for logo
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <>
      {/* Skip Link for Accessibility */}
      <SkipLink href="#main-content">Skip to main content</SkipLink>

      <motion.header
        {...headerVariants}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          "border-b border-border backdrop-blur supports-[backdrop-filter]:bg-card/80",
          isScrolled ? "bg-card/95 shadow-lg" : "bg-card/90"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div {...logoVariants}>
              <Link
                href="/"
                className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg no-underline"
                aria-label={`${personalInfo.name} - ${personalInfo.title}`}
              >
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-background font-bold text-sm shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getInitials(personalInfo.name)}
                </motion.div>
                <div className="hidden sm:block">
                  <motion.span
                    className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 no-underline"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {personalInfo.name}
                  </motion.span>
                  <div className="text-xs text-muted font-medium">
                    {personalInfo.title}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-lg font-medium transition-all duration-300 no-underline",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      "hover:bg-muted/20 hover:text-foreground",
                      isActiveRoute(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted"
                    )}
                    aria-label={item.ariaLabel}
                    aria-current={isActiveRoute(item.href) ? "page" : undefined}
                  >
                    {item.label}
                    {isActiveRoute(item.href) && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full"
                        layoutId="activeIndicator"
                        initial={false}
                        animate={{ x: "-50%" }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Theme Selector & Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <ThemeSelector />

              {/* Mobile menu button */}
              <motion.button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg text-muted hover:text-foreground hover:bg-muted/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                id="mobile-navigation"
                className="md:hidden overflow-hidden border-t border-border"
                role="navigation"
                aria-label="Mobile navigation"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="py-4 space-y-1">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={mobileMenuItemVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 no-underline",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          "hover:bg-muted/20 hover:text-foreground hover:translate-x-1",
                          isActiveRoute(item.href)
                            ? "text-primary bg-primary/10 border-l-4 border-primary"
                            : "text-muted"
                        )}
                        aria-label={item.ariaLabel}
                        aria-current={
                          isActiveRoute(item.href) ? "page" : undefined
                        }
                      >
                        {item.label}
                        {isActiveRoute(item.href) && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-primary rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
