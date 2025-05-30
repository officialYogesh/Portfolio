import React from "react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Contact</h1>
        <div className="space-y-6">
          <p className="text-lg text-foreground leading-relaxed">
            Get in touch with me for collaborations, opportunities, or just to
            say hello.
          </p>
          <p className="text-muted leading-relaxed">
            Contact form and interaction features will be implemented in
            upcoming tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
