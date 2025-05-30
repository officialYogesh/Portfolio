import React from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">About Me</h1>
        <div className="space-y-6">
          <p className="text-lg text-foreground leading-relaxed">
            Welcome to my about page. This section will showcase my background,
            skills, and professional journey.
          </p>
          <p className="text-muted leading-relaxed">
            Content will be added as we continue with the development process.
          </p>
        </div>
      </div>
    </div>
  );
}
