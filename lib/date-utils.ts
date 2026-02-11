import { formatDistanceToNow } from "date-fns";
import { es, fr, enUS } from "date-fns/locale";

// Locale mapping
const locales = {
  en: enUS,
  es: es,
  fr: fr,
} as const;

type SupportedLocale = keyof typeof locales;

/**
 * Converts a timestamp to a relative time string (e.g., "2h ago", "hace 5min", "il y a 3d")
 * Returns complete phrase with locale-specific word order
 * @param timestamp - Unix timestamp in milliseconds or ISO string
 * @param locale - Current locale (en, es, fr)
 * @returns Relative time string with "ago" equivalent
 */
export function formatRelativeTime(
  timestamp: string | number,
  locale: SupportedLocale = "en",
): string {
  const now = Date.now();
  const then =
    typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;
  const diffInMs = now - then;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  // Helper to format with locale-specific word order
  const formatWithSuffix = (value: string): string => {
    switch (locale) {
      case "en":
        return `${value} ago`;
      case "es":
        return `hace ${value}`;
      case "fr":
        return `il y a ${value}`;
    }
  };

  // Translations for "now"
  const nowText = {
    en: "now",
    es: "ahora",
    fr: "maintenant",
  };

  // Translations for week abbreviation
  const weekAbbr = {
    en: "w",
    es: "sem",
    fr: "sem",
  };

  // Translations for year abbreviation
  const yearAbbr = {
    en: "y",
    es: "a",
    fr: "an",
  };

  if (diffInSeconds < 60) {
    return diffInSeconds <= 5
      ? nowText[locale]
      : formatWithSuffix(`${diffInSeconds}s`);
  } else if (diffInMinutes < 60) {
    return formatWithSuffix(`${diffInMinutes}min`);
  } else if (diffInHours < 24) {
    return formatWithSuffix(`${diffInHours}h`);
  } else if (diffInDays < 7) {
    return formatWithSuffix(`${diffInDays}d`);
  } else if (diffInWeeks < 4) {
    return formatWithSuffix(`${diffInWeeks}${weekAbbr[locale]}`);
  } else if (diffInMonths < 12) {
    return formatWithSuffix(`${diffInMonths}m`);
  } else {
    return formatWithSuffix(`${diffInYears}${yearAbbr[locale]}`);
  }
}

/**
 * Formats a timestamp to a readable date string (e.g., "January 7, 2026")
 * @param timestamp - Unix timestamp in milliseconds or ISO string
 * @param locale - Current locale (en, es, fr)
 * @returns Formatted date string
 */
export function formatDate(
  timestamp: string | number,
  locale: SupportedLocale = "en",
): string {
  const date = new Date(
    typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp,
  );

  const localeMap = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
  };

  return date.toLocaleDateString(localeMap[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formats a timestamp using date-fns formatDistanceToNow with locale support
 * @param timestamp - Unix timestamp in milliseconds or ISO string or Date
 * @param locale - Current locale (en, es, fr)
 * @returns Formatted distance string (e.g., "2 hours ago", "hace 2 horas")
 */
export function formatDistanceToNowLocalized(
  timestamp: string | number | Date,
  locale: SupportedLocale = "en",
): string {
  const date =
    timestamp instanceof Date
      ? timestamp
      : new Date(
          typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp,
        );

  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: locales[locale],
  });
}
