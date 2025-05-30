"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState("dracula");

  const themes = [
    { id: "dracula", name: "Dracula" },
    { id: "one-dark", name: "One Dark" },
    { id: "nord", name: "Nord" },
    { id: "gruvbox", name: "Gruvbox" },
    { id: "solarized-dark", name: "Solarized Dark" },
    { id: "horizon", name: "Horizon" },
    { id: "palenight", name: "Palenight" },
  ];

  useEffect(() => {
    // Apply theme on load
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("portfolio-theme", currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme Switcher */}
      <div className="bg-card border-b border-border p-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-foreground font-medium">Choose Theme:</span>
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  currentTheme === theme.id
                    ? "bg-primary text-background"
                    : "bg-muted text-foreground hover:bg-border"
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            Yogesh Patil
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-secondary">
            Full Stack Developer
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-foreground text-center leading-relaxed px-6 sm:px-8">
            Passionate developer with 5+ years of experience building scalable
            web applications. Specialized in React, Node.js, and modern
            JavaScript technologies.
          </p>

          {/* Theme Test Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="bg-primary text-background px-6 py-3 rounded-lg hover:opacity-80 transition-opacity">
              Primary Button
            </button>
            <button className="bg-secondary text-background px-6 py-3 rounded-lg hover:opacity-80 transition-opacity">
              Secondary Button
            </button>
            <button className="bg-accent text-background px-6 py-3 rounded-lg hover:opacity-80 transition-opacity">
              Accent Button
            </button>
          </div>
        </section>

        {/* Theme Preview Cards */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Theme System Test
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary card-title">
                Project Card
              </h3>
              <p className="card-text-muted mb-4">
                This is a sample project card to test our theme system
                implementation.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-accent text-background px-2 py-1 rounded text-sm font-medium">
                  React
                </span>
                <span className="bg-secondary text-background px-2 py-1 rounded text-sm font-medium">
                  TypeScript
                </span>
                <span className="bg-primary text-background px-2 py-1 rounded text-sm font-medium">
                  Next.js
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-muted border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-secondary card-title">
                Skills Overview
              </h3>
              <p className="card-text mb-4">
                Testing different color combinations across our theme system.
              </p>
              <div className="space-y-2">
                <div
                  className="bg-primary h-2 rounded"
                  style={{ width: "90%" }}
                ></div>
                <div
                  className="bg-secondary h-2 rounded"
                  style={{ width: "85%" }}
                ></div>
                <div
                  className="bg-accent h-2 rounded"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-background border border-primary rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-accent card-title">
                Contact Info
              </h3>
              <p className="card-text mb-4">
                All theme colors working harmoniously together.
              </p>
              <div className="text-info font-medium">
                ✉️ yogesh.patil@example.com
              </div>
              <div className="text-warning mt-2 font-medium">
                📍 Mumbai, India
              </div>
            </div>
          </div>
        </section>

        {/* Typography Test */}
        <section className="py-12">
          <h2 className="text-title text-center mb-8 text-foreground">
            Typography System Showcase
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-hero text-primary">Hero Text (Inter)</h1>
              <h2 className="text-title text-secondary">Title Text (Inter)</h2>
              <h3 className="text-subtitle text-accent">
                Subtitle Text (Inter)
              </h3>
              <p className="text-body-large text-foreground">
                This is large body text using the system font stack. It
                demonstrates excellent readability and proper line spacing for
                enhanced user experience.
              </p>
              <p className="text-body text-foreground">
                This is regular body text showcasing our typography system. The
                text should be perfectly readable with optimal spacing and line
                heights across all themes and devices.
              </p>
              <p className="text-caption">
                This is caption text with muted color for less important
                information.
              </p>
              <code className="text-code bg-muted text-accent px-3 py-2 rounded-md block">
                {"// JetBrains Mono for code elements\n"}
                {'const portfolio = "Modern Typography System";\n'}
                {"console.log(`${portfolio} with Inter & JetBrains Mono`);"}
              </code>
            </div>

            {/* Font Family Examples */}
            <div className="border-t border-border pt-6 space-y-4">
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                Font Family Examples
              </h3>
              <div className="grid gap-4">
                <div className="p-4 bg-card rounded-lg">
                  <h4 className="font-heading text-lg font-medium text-primary mb-2">
                    Inter (Headings)
                  </h4>
                  <p className="font-heading text-base">
                    The quick brown fox jumps over the lazy dog. 1234567890
                  </p>
                </div>
                <div className="p-4 bg-card rounded-lg">
                  <h4 className="font-sans text-lg font-medium text-secondary mb-2">
                    System Font (Body)
                  </h4>
                  <p className="font-sans text-base">
                    The quick brown fox jumps over the lazy dog. 1234567890
                  </p>
                </div>
                <div className="p-4 bg-card rounded-lg">
                  <h4 className="font-mono text-lg font-medium text-accent mb-2">
                    JetBrains Mono (Code)
                  </h4>
                  <p className="font-mono text-base">
                    The quick brown fox jumps over the lazy dog. 1234567890
                  </p>
                </div>
              </div>
            </div>

            {/* Responsive Typography */}
            <div className="border-t border-border pt-6 space-y-4">
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                Responsive Typography
              </h3>
              <div className="space-y-2">
                <h1 className="text-responsive-6xl font-bold text-primary">
                  Responsive H1
                </h1>
                <h2 className="text-responsive-4xl font-semibold text-secondary">
                  Responsive H2
                </h2>
                <h3 className="text-responsive-3xl font-medium text-accent">
                  Responsive H3
                </h3>
                <p className="text-responsive-lg text-foreground">
                  This paragraph uses responsive typography that scales smoothly
                  across devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border mt-12">
          <p className="text-muted">
            © 2025 Yogesh Patil. Built with Next.js 15 & Tailwind CSS 4.x
          </p>
          <p className="text-sm text-muted mt-2">
            Theme System: ✅ All 7 themes configured and ready
          </p>
        </footer>
      </main>
    </div>
  );
}
