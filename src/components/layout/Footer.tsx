"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import { Heart, Mail, ArrowUpRight } from "lucide-react";
import { personalInfo } from "../../../config/personal-info";
import { cn } from "@/lib/utils";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className={cn(
        "relative w-full mt-auto border-t border-border/20",
        "bg-background text-foreground"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-8 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-8 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Call to Action Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Ready to build something{" "}
              <span className="text-primary">amazing</span>?
            </h2>
            <p className="text-muted text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Let&apos;s turn your ideas into reality. I&apos;m always excited
              to work on new projects.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-background font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                Get In Touch
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
              </motion.a>

              <motion.a
                href="/resume"
                className="group inline-flex items-center gap-3 border border-border hover:border-primary text-foreground hover:text-primary font-semibold px-8 py-4 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Resume
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
              </motion.a>
            </div>

            {/* Social Links */}
            <motion.div
              className="flex items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {personalInfo.socialLinks.map((social, index) => (
                <motion.div
                  key={social.platform}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="group"
                >
                  <SocialIcon
                    url={social.url}
                    target={
                      social.platform.toLowerCase() === "email"
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      social.platform.toLowerCase() === "email"
                        ? undefined
                        : "noopener noreferrer"
                    }
                    style={{ height: 44, width: 44 }}
                    bgColor="transparent"
                    fgColor="currentColor"
                    className="text-muted hover:text-primary transition-colors duration-300 border border-border/30 hover:border-primary/50 rounded-full"
                    aria-label={`Connect on ${social.platform}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Copyright */}
            <div className="flex items-center gap-2">
              <span>
                © {currentYear} {personalInfo.name}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                Made with
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    repeatDelay: 3,
                  }}
                >
                  <Heart
                    size={14}
                    className="text-red-500 fill-red-500"
                    aria-hidden="true"
                  />
                </motion.div>
                in {personalInfo.location}
              </span>
            </div>

            {/* Footer Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors duration-200"
              >
                Terms
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
