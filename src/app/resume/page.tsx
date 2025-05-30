import React from "react";

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Resume</h1>
        <div className="space-y-6">
          <p className="text-lg text-foreground leading-relaxed">
            View and download my professional resume highlighting my experience
            and skills.
          </p>
          <p className="text-muted leading-relaxed">
            Interactive resume and download functionality will be implemented in
            upcoming tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
