"use client";

import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface FilterButtonProps {
  label: string;
  options?: string[];
  onSelect?: (option: string) => void;
}

export function FilterButton({
  label,
  options = [],
  onSelect,
}: FilterButtonProps) {
  const t = useTranslations("explore");
  const [isOpen, setIsOpen] = useState(false);

  const getDefaultOptions = (): string[] => {
    const filterKey = label.toLowerCase();

    if (filterKey === t("filters.role").toLowerCase()) {
      return [t("roles.player"), t("roles.coach"), t("roles.clubManager")];
    }

    if (filterKey === t("filters.country").toLowerCase()) {
      return [
        "ca Canada",
        "us USA",
        "nl Netherlands",
        "uk UK",
        "be Belgium",
        "fr France",
        "de Germany",
        "es Spain",
        "it Italy",
        "pt Portugal",
        "ch Switzerland",
        "dk Denmark",
        "ar Argentina",
        "se Sweden",
        "fi Finland",
        "cl Chile",
        "at Austria",
      ];
    }

    if (filterKey === t("filters.level").toLowerCase()) {
      return [
        t("levels.elite"),
        t("levels.professional"),
        t("levels.amateur"),
        t("levels.youth"),
      ];
    }

    if (filterKey === t("filters.position").toLowerCase()) {
      return [
        t("positions.forward"),
        t("positions.midfielder"),
        t("positions.defender"),
        t("positions.goalkeeper"),
      ];
    }

    if (filterKey === t("filters.season").toLowerCase()) {
      return [t("seasons.current"), t("seasons.next"), t("seasons.any")];
    }

    return [];
  };

  const items = options.length > 0 ? options : getDefaultOptions();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-(--input-button-height) px-4 py-2.5 bg-background border border-border rounded-md text-foreground transition-colors duration-300 text-sm font-medium cursor-pointer active:scale-95"
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => {
                onSelect?.(item);
                setIsOpen(false);
              }}
              className="w-full h-10 text-left justify-center items-center px-4 py-1.5 bg-background hover:bg-input text-foreground rounded-md text-sm transition-colors cursor-pointer border border-border-strong"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40"
          aria-label={t("closeDropdown")}
        />
      )}
    </div>
  );
}
