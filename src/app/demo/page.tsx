"use client";

import { Container } from "@/components/layout";
import { TechStackBubble } from "@/components/ui/BubbleUI";
import { skills } from "../../../config/skills";

export default function DemoPage() {
  return (
    <Container className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          🎯 Bubble UI Demo
        </h1>
        <p className="text-xl text-muted max-w-3xl mx-auto">
          Experience the simplified, modern bubble UI showcasing technology
          skills with clean animations and beautiful design.
        </p>
      </div>

      {/* Main Demo */}
      <section className="py-8">
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">
            🚀 Complete Tech Stack
          </h2>
          <TechStackBubble
            technologies={skills}
            title="Full Stack Development"
            description="Complete technology expertise visualization"
            compact={false}
            showIcons={true}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Category Demos */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
          Category-Specific Demos
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              🎨 Frontend Technologies
            </h3>
            <TechStackBubble
              technologies={skills.filter(
                (skill) => skill.category === "frontend"
              )}
              title="Frontend Stack"
              description="UI/UX Development"
              compact={true}
              showIcons={true}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              ⚙️ Backend Technologies
            </h3>
            <TechStackBubble
              technologies={skills.filter(
                (skill) => skill.category === "backend"
              )}
              title="Backend Stack"
              description="Server-side Development"
              compact={true}
              showIcons={true}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              🗄️ Database Technologies
            </h3>
            <TechStackBubble
              technologies={skills.filter(
                (skill) => skill.category === "database"
              )}
              title="Database Stack"
              description="Data Management"
              compact={true}
              showIcons={true}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              🛠️ Tools & DevOps
            </h3>
            <TechStackBubble
              technologies={skills.filter(
                (skill) => skill.category === "tools"
              )}
              title="Tools Stack"
              description="Development Tools"
              compact={true}
              showIcons={true}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8">
        <div className="bg-success/10 border border-success/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            ✨ Bubble UI Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
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
    </Container>
  );
}
