"use client";

import { Filter } from "lucide-react";
import { useState } from "react";
import { OpportunityListCard } from "@/components/opportunities/opportunity-list-card";
import { motion, AnimatePresence } from "framer-motion";

export function OpportunitiesPage() {
  const [showFilters, setShowFilters] = useState(false);

  const opportunities = [
    {
      id: 1,
      title: "Left Midfielder",
      club: "HC Amsterdam",
      location: "Netherlands",
      description:
        "We are looking for a skilled midfielder to join our professional field hockey team.",
      tags: ["Professional", "Contract 1 Year", "EU"],
      deadline: "30 Dec 2025",
      level: "Elite",
      salary: "€2,500 - €4,000",
    },
    {
      id: 2,
      title: "Defender",
      club: "British Field Hockey Club",
      location: "UK",
      description: "Seeking an experienced defender for the upcoming season.",
      tags: ["Amateur", "Contract 2 Years", "EU"],
      deadline: "15 Jan 2026",
      level: "Amateur",
      salary: "€2,000 - €3,500",
    },
    {
      id: 3,
      title: "Goalkeeper",
      club: "Team Sweden Elite",
      location: "Sweden",
      description:
        "Top-tier goalkeeper position available for the elite league.",
      tags: ["Professional", "Contract 1 Year", "EU"],
      deadline: "5 Jan 2026",
      level: "Elite",
      salary: "€3,000 - €5,000",
    },
    {
      id: 4,
      title: "Right Midfielder",
      club: "HC Rotterdam",
      location: "Netherlands",
      description:
        "We are searching for a right midfielder to join our professional field hockey team.",
      tags: ["Elite", "Contract 1 Year", "EU"],
      deadline: "15 Jan 2026",
      level: "Elite",
      salary: "To agree",
    },
    {
      id: 5,
      title: "Central Attacker",
      club: "Wattducks",
      location: "Belgium",
      description:
        "Central attacker position available for the upcoming season.",
      tags: ["Professional", "Half Season", "EU"],
      deadline: "15 Feb 2026",
      level: "Elite",
      salary: "€3,000",
    },
  ];

  return (
    <main className="max-w-2xl mx-auto pb-4 mb-22">
      <div className="sticky top-16 bg-background border-b border-border rounded-b-lg shadow-md px-4 py-4 z-20 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">
          Available Positions
        </h2>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 cursor-pointer text-foreground"
        >
          <Filter size={24} />
        </motion.button>
      </div>

      {/* Filter panel */}
      <AnimatePresence mode="wait">
        {showFilters && (
          <motion.div
            key="filters"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="group relative pt-16 -top-12 bg-background border-b border-border px-4 py-4 grid grid-cols-2 gap-2 "
          >
            {["Experience", "Location", "Contract", "Salary"].map((filter) => (
              <button
                key={filter}
                className="px-3 py-2 bg-background hover:bg-input text-foreground border border-border-strong rounded-lg  cursor-pointer text-sm font-medium"
              >
                {filter}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MADE IT UNTIL HERE */}

      <div className="px-4 py-6 space-y-4">
        {opportunities.length > 0 ? (
          opportunities.map((opp) => (
            <OpportunityListCard key={opp.id} {...opp} />
          ))
        ) : (
          <p className="text-center text-foreground py-12">
            No opportunities available at the moment.
          </p>
        )}
      </div>
    </main>
  );
}
