"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { themeDescriptions } from "../../../config/themes";

export const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme, themes, isLoading } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeId: string) => {
    if (themeId in themes) {
      setTheme(themeId as keyof typeof themes);
    }
    setIsOpen(false);
  };

  const currentThemeData = themes[currentTheme];

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 text-sm">
        <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
        <span className="hidden sm:inline text-muted">Loading...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted hover:text-foreground bg-card border border-border rounded-lg hover:bg-muted/20 transition-colors duration-200"
        aria-label="Select theme"
      >
        <div
          className="w-4 h-4 rounded-full border border-border"
          style={{ backgroundColor: currentThemeData?.primary || "#bd93f9" }}
        />
        <span className="hidden sm:inline">Theme</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
          <div className="p-2">
            <div className="text-xs font-semibold text-muted uppercase tracking-wide px-2 py-1 mb-2">
              Choose Theme
            </div>
            {Object.entries(themes).map(([themeId, theme]) => (
              <button
                key={themeId}
                onClick={() => handleThemeChange(themeId)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                  currentTheme === themeId
                    ? "bg-primary/20 text-primary scale-[1.02]"
                    : "text-foreground hover:bg-muted/30 hover:scale-[1.01]"
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full border border-border transition-transform duration-200"
                  style={{ backgroundColor: theme.primary }}
                />
                <div className="flex-1 text-left">
                  <div className="font-medium">{theme.displayName}</div>
                  <div className="text-xs text-muted">
                    {themeDescriptions[themeId]}
                  </div>
                </div>
                {currentTheme === themeId && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
