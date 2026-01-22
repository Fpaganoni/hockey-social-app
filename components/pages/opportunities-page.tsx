"use client";

import { Filter } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JobOpportunities } from "@/components/opportunities/job-opportunities";

export function OpportunitiesPage() {
  const [showFilters, setShowFilters] = useState(false);

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
            className="bg-background border-b border-border px-4 py-4 grid grid-cols-2 gap-2"
          >
            {["Experience", "Location", "Contract", "Salary"].map((filter) => (
              <button
                key={filter}
                className="px-3 py-2 bg-background hover:bg-input text-foreground border border-border-strong rounded-lg cursor-pointer text-sm font-medium"
              >
                {filter}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MADE IT UNTIL HERE */}

      <JobOpportunities />
    </main>
  );
}
