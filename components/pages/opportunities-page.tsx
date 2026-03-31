"use client";

import { Filter } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JobOpportunities } from "@/components/opportunities/job-opportunities";
import { useTranslations } from "next-intl";
import { JobOpportunity } from "@/types/models/job-opportunity";

interface OpportunitiesPageProps {
  initialData?: { jobOpportunities: JobOpportunity[] } | any;
}

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function OpportunitiesPage({ initialData }: OpportunitiesPageProps) {
  const t = useTranslations("opportunities");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [showFilters, setShowFilters] = useState(false);
  const activeFilters = searchParams.getAll("filter");

  const filterKeys = [
    { key: "experience", label: t("filters.experience") },
    { key: "location", label: t("filters.location") },
    { key: "contract", label: t("filters.contract") },
    { key: "salary", label: t("filters.salary") },
  ];

  const handleToggleFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (activeFilters.includes(key)) {
      // Rebuild without this key
      params.delete("filter");
      activeFilters.filter(k => k !== key).forEach(k => params.append("filter", k));
    } else {
      params.append("filter", key);
    }
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <main className="max-w-2xl mx-auto pb-4 mb-22">
      <div className="sticky top-16 bg-background border-b border-border rounded-b-lg shadow-md px-4 py-4 z-20 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">
          {t("availablePositions")}
        </h2>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 cursor-pointer transition-colors ${activeFilters.length > 0 ? "text-primary" : "text-foreground"}`}
        >
          <Filter size={24} />
          {activeFilters.length > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full"></span>
          )}
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
            {filterKeys.map((f) => {
              const isActive = activeFilters.includes(f.key);
              return (
                <button
                  key={f.key}
                  onClick={() => handleToggleFilter(f.key)}
                  className={`px-3 py-2 border rounded-lg cursor-pointer text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "bg-background hover:bg-input text-foreground border-border-strong"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MADE IT UNTIL HERE */}

      <JobOpportunities initialData={initialData} />
    </main>
  );
}
