"use client";

import { Container } from "@/components/layout";
import { skills } from "../../config/skills";
import { TechStackBubble } from "@/components/ui/BubbleUI";

export default function Home() {
  return (
    <Container className="py-8">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
          Yogesh Patil
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-secondary">
          Full Stack Developer
        </p>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-foreground text-center leading-relaxed px-6 sm:px-8">
          Passionate developer with 5+ years of experience building scalable web
          applications. Specialized in React, Node.js, and modern JavaScript
          technologies.
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

      {/* Tech Stack Visualization */}
      <section className="py-16 bg-card/30 rounded-xl mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            🎯 Tech Stack Visualization
          </h2>
          <p className="text-muted max-w-4xl mx-auto mb-6">
            Modern bubble visualization showcasing my technology skills with
            clean animations and beautiful design.
          </p>
        </div>

        {/* Main Tech Stack Demo */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <TechStackBubble
            technologies={skills}
            title="Complete Tech Stack"
            description="My technology expertise with modern visualization"
            compact={false}
            className="w-full"
            showIcons={true}
          />
        </div>

        {/* Simplified Demos */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Frontend Technologies */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              🎨 Frontend Technologies
            </h3>
            <TechStackBubble
              technologies={skills
                .filter((skill) => skill.category === "frontend")
                .slice(0, 8)}
              title="Frontend Stack"
              description="UI/UX focused technologies"
              compact={true}
              showIcons={true}
            />
          </div>

          {/* Backend Technologies */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              ⚙️ Backend Technologies
            </h3>
            <TechStackBubble
              technologies={skills
                .filter((skill) => skill.category === "backend")
                .slice(0, 8)}
              title="Backend Stack"
              description="Server-side technologies"
              compact={true}
              showIcons={true}
            />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 p-4 bg-success/10 border border-success/20 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">
            ✨ Bubble UI Features
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span>🎨</span> <strong>Tech Icons:</strong> Visual technology
              representations
            </div>
            <div className="flex items-center gap-2">
              <span>📊</span> <strong>Proficiency Sizing:</strong> Bubble size
              reflects skill level
            </div>
            <div className="flex items-center gap-2">
              <span>🎭</span> <strong>Category Colors:</strong> Color-coded by
              technology type
            </div>
            <div className="flex items-center gap-2">
              <span>✨</span> <strong>Smooth Animations:</strong> Spring-based
              entrance animations
            </div>
            <div className="flex items-center gap-2">
              <span>📱</span> <strong>Responsive:</strong> Adapts to all screen
              sizes
            </div>
            <div className="flex items-center gap-2">
              <span>♿</span> <strong>Accessible:</strong> Screen reader
              friendly
            </div>
          </div>
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
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Component Testing
            </h3>
            <p className="text-muted mb-4">
              Testing theme consistency across all UI components with proper
              color inheritance and contrast ratios.
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors">
              Learn More
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Typography Scale
            </h3>
            <p className="text-muted mb-4">
              Ensuring readable typography with proper spacing, line heights,
              and font weights across all themes.
            </p>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/90 transition-colors">
              Explore
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Accessibility Features
            </h3>
            <p className="text-muted mb-4">
              All themes maintain WCAG 2.1 AA compliance with proper contrast
              ratios and focus indicators.
            </p>
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded hover:bg-accent/90 transition-colors">
              Test
            </button>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
          Skills Overview
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl mb-3">⚛️</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Frontend
            </h3>
            <p className="text-muted text-sm">
              React, Next.js, TypeScript, Tailwind CSS
            </p>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Backend
            </h3>
            <p className="text-muted text-sm">
              Node.js, Express, Python, MongoDB
            </p>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl mb-3">☁️</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Cloud
            </h3>
            <p className="text-muted text-sm">AWS, Docker, Vercel, Firebase</p>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl mb-3">🛠️</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Tools
            </h3>
            <p className="text-muted text-sm">Git, Webpack, Jest, Cypress</p>
          </div>
        </div>
      </section>
    </Container>
  );
}
