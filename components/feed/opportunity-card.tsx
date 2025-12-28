"use client";

import { useState } from "react";
import { CheckCircle, MapPin, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";

interface OpportunityCardProps {
  title: string;
  club: string;
  location: string;
  level?: string;
  salary?: string;
  tags: string[];
}

export function OpportunityCard({
  title,
  club,
  location,
  level,
  salary,
  tags,
}: OpportunityCardProps) {
  const [applied, setApplied] = useState(false);

  const tagColorMap: Record<string, string> = {
    Professional: "bg-info/20 text-foreground border-info/30 hover:border-info",
    Amateur:
      "bg-accent/20 text-foreground border-accent/30 hover:border-accent",
    Youth:
      "bg-warning/20 text-foreground border-warning/30 hover:border-warning",
    Elite:
      "bg-success/20 text-foreground border-success/30 hover:border-success",
    "1 Year Contract":
      "bg-accent/20 text-foreground border-accent/30 hover:border-accent",
    "2 Years Contract":
      "bg-accent/20 text-foreground border-accent/30 hover:border-accent",
    EU: "bg-info/20 text-foreground border-info/30 hover:border-info",
  };

  return (
    <div className="bg-accent-soft rounded-xl overflow-hidden shadow-md hover:shadow-lg group">
      <div className="p-4 border-l-4 border-l-accent">
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold text-foreground transition-colors">
              {title}
            </h3>
            {level && (
              <span className="px-2 py-1 text-xs font-semibold rounded-md bg-success/20 text-foreground border border-success/30 shrink-0">
                {level}
              </span>
            )}
          </div>
          <p className="text-foreground-muted font-medium mb-1">{club}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-foreground-muted">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
            {salary && (
              <div className="flex items-center gap-1">
                <Award size={14} />
                <span>{salary}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors duration-300 ${
                tagColorMap[tag] ||
                "bg-accent/20 text-foreground border-border hover:border-accent"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-foreground-muted mb-4">
          <Calendar size={14} />
          <span>Application deadline: 30 Dec 2025</span>
        </div>

        {applied ? (
          <button
            disabled
            className="w-full h-(--input-button-height) py-2 rounded-lg border-2 border-success bg-success/20 font-semibold text-foreground flex items-center justify-center gap-2 transition-colors duration-300 cursor-default"
          >
            <CheckCircle size={18} />
            Application Sent
          </button>
        ) : (
          <button
            onClick={() => setApplied(true)}
            className="w-full h-(--input-button-height) py-2 rounded-lg bg-success/20 border border-success hover:bg-success text-foreground hover:text-background font-semibold transition-colors duration-300 cursor-pointer hover:shadow-lg"
          >
            Apply with Profile
          </button>
        )}
      </div>
    </div>
  );
}
