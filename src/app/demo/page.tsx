"use client";

import React from "react";
import {
  BubbleUI,
  TechStackBubble,
  SkillsCategoryBubble,
} from "../../components/ui/BubbleUI";
import {
  skills,
  getSkillsByCategory,
  getAllCategories,
} from "../../../config/skills";
import type { SkillCategory } from "../../../config/skills";
import { Container } from "../../components/layout/Container";

export default function DemoPage() {
  // Create skills grouped by category
  const skillsByCategory = getAllCategories().reduce((acc, category) => {
    acc[category] = getSkillsByCategory(category);
    return acc;
  }, {} as Record<SkillCategory, typeof skills>);

  return (
    <Container className="py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Bubble UI Demo</h1>
        <p className="text-muted max-w-2xl mx-auto">
          Interactive bubble visualization system for showcasing technical
          skills and expertise.
        </p>
      </div>

      {/* Basic Bubble UI */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Basic Bubble UI
          </h2>
          <p className="text-muted">
            Physics-based bubbles with mouse interaction
          </p>
        </div>
        <div className="flex justify-center">
          <BubbleUI
            skills={skills.slice(0, 10)}
            width={600}
            height={400}
            className="border border-border rounded-lg bg-card/50"
            enablePhysics={true}
            enableMouse={true}
            enableCollisions={true}
            showTooltips={true}
          />
        </div>
      </section>

      {/* Tech Stack Bubble */}
      <section className="space-y-6">
        <TechStackBubble
          technologies={skills.filter((skill) =>
            ["frontend", "backend", "database"].includes(skill.category)
          )}
          title="Core Technologies"
          description="Essential skills for full-stack development"
          compact={false}
        />
      </section>

      {/* Skills Category Bubble */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Category-Based Visualization
          </h2>
          <p className="text-muted">Filter skills by technology category</p>
        </div>
        <SkillsCategoryBubble
          skillsByCategory={skillsByCategory}
          onCategorySelect={(category) => {
            console.log(`Selected category: ${category}`);
          }}
        />
      </section>

      {/* Compact Version */}
      <section className="space-y-6">
        <TechStackBubble
          technologies={skills.filter((skill) => skill.category === "frontend")}
          title="Frontend Technologies"
          description="User interface and experience technologies"
          compact={true}
        />
      </section>

      {/* Feature Showcase */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Feature Showcase
          </h2>
          <p className="text-muted">Different configurations and features</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Without Physics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground text-center">
              Static Layout
            </h3>
            <BubbleUI
              skills={skills.slice(0, 8)}
              width={400}
              height={300}
              className="border border-border rounded-lg bg-card/50 mx-auto"
              enablePhysics={false}
              enableMouse={false}
              enableCollisions={false}
              showTooltips={true}
            />
          </div>

          {/* With Physics but no Mouse */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground text-center">
              Physics Only
            </h3>
            <BubbleUI
              skills={skills.slice(0, 8)}
              width={400}
              height={300}
              className="border border-border rounded-lg bg-card/50 mx-auto"
              enablePhysics={true}
              enableMouse={false}
              enableCollisions={true}
              showTooltips={true}
            />
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Implementation Details
          </h2>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Physics Features
              </h3>
              <ul className="text-sm text-muted space-y-1">
                <li>• Collision detection</li>
                <li>• Boundary constraints</li>
                <li>• Velocity damping</li>
                <li>• Mouse influence</li>
                <li>• Friction simulation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Visual Features
              </h3>
              <ul className="text-sm text-muted space-y-1">
                <li>• Responsive sizing</li>
                <li>• Category colors</li>
                <li>• Hover effects</li>
                <li>• Smooth animations</li>
                <li>• Interactive tooltips</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Accessibility
              </h3>
              <ul className="text-sm text-muted space-y-1">
                <li>• Reduced motion support</li>
                <li>• Keyboard navigation</li>
                <li>• Screen reader friendly</li>
                <li>• Fallback layouts</li>
                <li>• WCAG compliant</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
