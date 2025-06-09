"use client";

import React, { useState } from "react";
import {
  TechStackBubble,
  type TechStackBubbleProps,
} from "@/components/ui/BubbleUI";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CTAButton, PrimaryCTA, SecondaryCTA } from "@/components/ui/CTAButton";
import { Download, Mail, Star, ExternalLink } from "lucide-react";
import { skills } from "../../../config/skills";

export default function DemoPage() {
  const [interactionLog, setInteractionLog] = useState<string[]>([]);
  const [compactMode, setCompactMode] = useState(false);
  const [showIcons, setShowIcons] = useState(true);
  const [responsiveMode, setResponsiveMode] = useState(false);

  const allSkills = Object.values(skills).flat();

  const bubbleProps: TechStackBubbleProps = {
    technologies: allSkills,
    title: "Interactive Tech Stack Demo",
    description: "Hover, click, and drag to explore technologies",
    compact: compactMode,
    showIcons,
    responsive: responsiveMode,
  };

  return (
    <Container className="py-12">
      <div className="space-y-16">
        {/* CTA Button Tests */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            CTA Button Component Tests
          </h2>
          <div className="space-y-8">
            {/* Main CTAButton with variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Main CTAButton Component
              </h3>
              <div className="flex flex-wrap gap-4">
                <CTAButton
                  variant="primary"
                  icon={<Download className="h-4 w-4" />}
                >
                  Primary Button
                </CTAButton>
                <CTAButton
                  variant="secondary"
                  icon={<Mail className="h-4 w-4" />}
                >
                  Secondary Button
                </CTAButton>
              </div>
            </div>

            {/* Size variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
              <div className="flex flex-wrap items-center gap-4">
                <CTAButton variant="primary" size="sm">
                  Small Primary
                </CTAButton>
                <CTAButton variant="primary" size="default">
                  Default Primary
                </CTAButton>
                <CTAButton variant="primary" size="lg">
                  Large Primary
                </CTAButton>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <CTAButton variant="secondary" size="sm">
                  Small Secondary
                </CTAButton>
                <CTAButton variant="secondary" size="default">
                  Default Secondary
                </CTAButton>
                <CTAButton variant="secondary" size="lg">
                  Large Secondary
                </CTAButton>
              </div>
            </div>

            {/* Convenience components */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Convenience Components
              </h3>
              <div className="flex flex-wrap gap-4">
                <PrimaryCTA icon={<Star className="h-4 w-4" />}>
                  PrimaryCTA
                </PrimaryCTA>
                <SecondaryCTA rightIcon={<ExternalLink className="h-4 w-4" />}>
                  SecondaryCTA
                </SecondaryCTA>
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Button States</h3>
              <div className="flex flex-wrap gap-4">
                <CTAButton
                  variant="primary"
                  loading
                  loadingText="Downloading..."
                >
                  Loading Button
                </CTAButton>
                <CTAButton variant="secondary" disabled>
                  Disabled Button
                </CTAButton>
                <CTAButton variant="primary" fullWidth>
                  Full Width Button
                </CTAButton>
              </div>
            </div>

            {/* With links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Link Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <CTAButton
                  variant="primary"
                  href="https://example.com"
                  icon={<ExternalLink className="h-4 w-4" />}
                >
                  External Link
                </CTAButton>
                <CTAButton
                  variant="secondary"
                  to="/about"
                  icon={<Mail className="h-4 w-4" />}
                >
                  Internal Link
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* Bubble UI Demo */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Bubble UI Component Demo</h2>

          {/* Controls */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Interactive Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={compactMode}
                    onChange={(e) => setCompactMode(e.target.checked)}
                    className="rounded"
                  />
                  <span>Compact Mode</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showIcons}
                    onChange={(e) => setShowIcons(e.target.checked)}
                    className="rounded"
                  />
                  <span>Show Icons</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={responsiveMode}
                    onChange={(e) => setResponsiveMode(e.target.checked)}
                    className="rounded"
                  />
                  <span>Responsive Mode</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Bubble Visualization */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TechStackBubble {...bubbleProps} />
            </div>

            {/* Interaction Log */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Interaction Log</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInteractionLog([])}
                  >
                    Clear
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {interactionLog.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      Interact with the bubbles to see logs here
                    </p>
                  ) : (
                    interactionLog.map((log, index) => (
                      <div
                        key={index}
                        className="text-sm p-2 bg-muted/50 rounded border-l-2 border-primary"
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Demo */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Features Demonstration</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Task 4.3.1: Tech Icons</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Technology-specific icons within bubbles using emoji/Unicode
                  representations
                </p>
                <div className="flex flex-wrap gap-2">
                  {allSkills.slice(0, 6).map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <span>{skill.icon || "💻"}</span>
                      <span>{skill.name}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task 4.3.2: Proficiency Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Visual proficiency rings and color-coded levels
                </p>
                <div className="space-y-2">
                  {[
                    { level: 1, label: "Beginner", color: "bg-red-500" },
                    { level: 5, label: "Intermediate", color: "bg-yellow-500" },
                    { level: 8, label: "Advanced", color: "bg-green-500" },
                    { level: 10, label: "Expert", color: "bg-purple-500" },
                  ].map(({ level, label, color }) => (
                    <div key={level} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${color}`} />
                      <span className="text-sm">
                        {label} (Level {level})
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task 4.3.3: Experience Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive tooltip overlays with backdrop blur effects
                </p>
                <p className="text-xs text-muted-foreground">
                  Hover over bubbles to see detailed information with progress
                  indicators
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task 4.3.4: Category Grouping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Visual category group indicators with interactive selection
                </p>
                <p className="text-xs text-muted-foreground">
                  Enable &quot;Group by Category&quot; to see category-based
                  visualization
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task 4.3.5: Responsive Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Adaptive layouts for mobile, tablet, and desktop breakpoints
                </p>
                <p className="text-xs text-muted-foreground">
                  Enable &quot;Responsive Mode&quot; and resize window to see
                  adaptive behavior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task 4.3.6: Accessibility Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Full keyboard navigation and screen reader support
                </p>
                <p className="text-xs text-muted-foreground">
                  Enable &quot;Accessibility Mode&quot; and use Tab/Arrow keys
                  for navigation
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Container>
  );
}
