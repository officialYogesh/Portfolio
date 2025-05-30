import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://github.com/yogeshpatil", icon: Github, label: "GitHub" },
    {
      href: "https://linkedin.com/in/yogeshpatil",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "https://twitter.com/yogeshpatil",
      icon: Twitter,
      label: "Twitter",
    },
    { href: "mailto:yogesh.patil@example.com", icon: Mail, label: "Email" },
  ];

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-background font-bold">
                YP
              </div>
              <span className="text-xl font-bold text-foreground">
                Yogesh Patil
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Full Stack Developer passionate about building scalable web
              applications with modern technologies and best practices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Quick Links
            </h3>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Connect
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/20 text-muted hover:bg-primary hover:text-background transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            © {currentYear} Yogesh Patil. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>Built with</span>
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Next.js
            </Link>
            <span>•</span>
            <Link
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Tailwind CSS
            </Link>
            <span>•</span>
            <Link
              href="https://www.framer.com/motion/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Framer Motion
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
