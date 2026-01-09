"use client";

import { useState } from "react";
import { CheckCircle, MapPin, Calendar, Award } from "lucide-react";
import { Badge } from "../ui/badge";
import { Club } from "@/graphql/queries";
import { formatRelativeTime } from "@/lib/date-utils";

interface OpportunityListCard {
  id: string;
  title: string;
  description: string;
  positionType: string;
  club: Club;
  country: string;
  city: string;
  salary?: number;
  currency?: string;
  benefits?: string[];
  createdAt: string;
  level?: string;
  status?: string;
}

export type OpportunityListCardProps = OpportunityListCard;

export function OpportunityListCard({
  id,
  title,
  description,
  positionType,
  club,
  country,
  city,
  status,
  salary,
  currency,
  benefits,
  createdAt,
  level,
}: OpportunityListCardProps) {
  const tagColorMap: Record<string, string> = {
    Professional: "bg-info/30 text-foreground border-info/40",
    Amateur: "bg-warning/30 text-foreground border-warning/40",
    Elite: "bg-success/30 text-foreground border-success/40",
    "Contract 1 Year":
      "bg-accent-bright/20 text-foreground border-foreground/30",
    "Contract 2 Years":
      "bg-accent-bright/20 text-foreground border-foreground/30",
    EU: "bg-foreground/20 text-foreground border-foreground/30",
  };

  return (
    <div className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg group border-l-4 border-l-accent">
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-foreground-muted font-medium mt-1">
                {club.name}
              </p>
            </div>
            {level && (
              <>
                {level == "PROFESSIONAL" ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      key={status}
                      className={
                        status == "OPEN"
                          ? "bg-success/30 text-foreground border-success/40"
                          : "bg-error/30 text-foreground border-error/40"
                      }
                    >
                      {status}
                    </Badge>
                    <Badge
                      key={country}
                      className="bg-foreground/20 text-foreground border-foreground/30"
                    >
                      {country.slice(0, 4)}
                    </Badge>
                    <Badge
                      key={level}
                      className="bg-info/30 text-foreground border-info/40"
                    >
                      {level}
                    </Badge>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      key={status}
                      className={
                        status == "OPEN"
                          ? "bg-success/30 text-foreground border-success/40"
                          : "bg-danger/30 text-foreground border-danger/40"
                      }
                    >
                      {status}
                    </Badge>
                    <Badge
                      key={country}
                      className="bg-foreground/20 text-foreground border-foreground/30"
                    >
                      {country.slice(0, 4)}
                    </Badge>
                    <Badge
                      key={level}
                      className="bg-warning/30 text-foreground border-warning/40"
                    >
                      {level}
                    </Badge>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-muted mb-4">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{city}</span>
            </div>
            {salary && (
              <div className="flex items-center gap-1">
                <Award size={16} />
                <span>
                  {salary} {currency}
                </span>
              </div>
            )}
          </div>

          <p className="text-sm text-foreground-muted mb-4">{description}</p>

          <div className="flex items-center gap-2 text-xs text-foreground-muted mb-4">
            <Calendar size={14} />
            <span>Published {formatRelativeTime(createdAt)} ago.</span>
          </div>
        </div>

        {status == "FILLED" ? (
          <button
            disabled
            className="w-full py-2 rounded-lg border-2 border-success bg-success/20 font-semibold text-foreground flex items-center justify-center gap-2 transition-colors duration-300 cursor-default"
          >
            <CheckCircle size={18} />
            Application Sent
          </button>
        ) : (
          <button className="w-full py-2 rounded-lg bg-success/20 border border-border hover:bg-success text-foreground hover:text-background font-semibold transition-colors duration-300 cursor-pointer hover:shadow-lg">
            Apply with Profile
          </button>
        )}
      </div>
    </div>
  );
}
