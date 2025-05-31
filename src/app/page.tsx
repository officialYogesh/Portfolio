"use client";

import { Container } from "@/components/layout";
import { BubbleUI, TechStackBubble } from "@/components/ui/BubbleUI";
import { skills } from "../../config/skills";
import { useState } from "react";

export default function Home() {
  const [interactionLog, setInteractionLog] = useState<string[]>([]);

  const logInteraction = (message: string) => {
    setInteractionLog((prev) => [
      ...prev.slice(-4),
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

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

      {/* Enhanced Bubble UI Demo Section */}
      <section className="py-16 bg-card/30 rounded-xl mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            🚀 Enhanced Interactive Bubble UI Demo
          </h2>
          <p className="text-muted max-w-3xl mx-auto mb-6">
            Experience the advanced features of Task 4.2: Enhanced hover
            effects, click interactions, drag and drop functionality, technology
            connections, and smooth animations with 60fps performance.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-sm">
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="font-semibold text-foreground">✨ Hover</div>
              <div className="text-muted">Enhanced tooltips</div>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="font-semibold text-foreground">🎯 Click</div>
              <div className="text-muted">Detailed info modal</div>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="font-semibold text-foreground">🖱️ Drag</div>
              <div className="text-muted">Move bubbles around</div>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="font-semibold text-foreground">🔗 Connect</div>
              <div className="text-muted">Technology relations</div>
            </div>
          </div>
        </div>

        {/* Interactive Bubble Visualization */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
            Interactive Tech Stack with Connections & Drag Support
          </h3>
          <div className="flex justify-center">
            <BubbleUI
              skills={skills.slice(0, 12)}
              width={700}
              height={450}
              className="border border-border rounded-lg bg-background/50"
              enablePhysics={true}
              enableMouse={true}
              enableCollisions={true}
              enableDrag={true}
              enableConnections={true}
              showDetailedTooltips={true}
              performanceMode="high"
              onBubbleHover={(bubble) => {
                if (bubble) {
                  logInteraction(
                    `Hovered: ${bubble.name} (${bubble.category})`
                  );
                }
              }}
              onBubbleClick={(bubble) => {
                logInteraction(
                  `Clicked: ${bubble.name} - Opening details modal`
                );
              }}
              onBubbleDoubleClick={(bubble) => {
                logInteraction(
                  `Double-clicked: ${bubble.name} - Centered bubble`
                );
              }}
              onBubbleDrag={(bubble, position) => {
                logInteraction(
                  `Dragged: ${bubble.name} to (${Math.round(
                    position.x
                  )}, ${Math.round(position.y)})`
                );
              }}
            />
          </div>
        </div>

        {/* Interaction Log */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">
            📝 Real-time Interaction Log
          </h4>
          <div className="space-y-1 max-h-32 overflow-y-auto font-mono text-sm">
            {interactionLog.length === 0 ? (
              <div className="text-muted italic">
                Interact with the bubbles above to see logs here...
              </div>
            ) : (
              interactionLog.map((log, index) => (
                <div
                  key={index}
                  className="text-foreground bg-card/50 px-2 py-1 rounded"
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Feature Showcase Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Compact Version with Different Settings */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">
              Compact Mode - Frontend Focus
            </h4>
            <TechStackBubble
              technologies={skills
                .filter((skill) => skill.category === "frontend")
                .slice(0, 6)}
              title=""
              description=""
              compact={true}
              enableDrag={false}
              enableConnections={false}
              performanceMode="medium"
            />
          </div>

          {/* Static Layout for Comparison */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">
              Static Layout - Accessibility Mode
            </h4>
            <BubbleUI
              skills={skills
                .filter((skill) => skill.category === "backend")
                .slice(0, 6)}
              width={350}
              height={250}
              className="border border-border/50 rounded-lg bg-muted/20"
              enablePhysics={false}
              enableMouse={false}
              enableCollisions={false}
              enableDrag={false}
              enableConnections={false}
              showDetailedTooltips={true}
              performanceMode="low"
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">
            💡 Try These Interactions:
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted">
            <div className="space-y-1">
              <div>
                • <strong>Hover</strong> over bubbles to see enhanced tooltips
                with related technologies
              </div>
              <div>
                • <strong>Click</strong> bubbles to open detailed information
                modals
              </div>
              <div>
                • <strong>Double-click</strong> to center a bubble and highlight
                connections
              </div>
            </div>
            <div className="space-y-1">
              <div>
                • <strong>Drag</strong> bubbles around to see physics and
                connection effects
              </div>
              <div>
                • Notice how related technologies connect with animated lines
              </div>
              <div>• Performance metrics shown in top-right corner</div>
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
              ✉️ officialyogeshp@gmail.com
            </div>
            <div className="text-warning mt-2 font-medium">
              📍 New York, USA
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
            <h3 className="text-subtitle text-accent">Subtitle Text (Inter)</h3>
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
    </Container>
  );
}
