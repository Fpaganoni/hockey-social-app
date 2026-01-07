/**
 * Converts a timestamp to a relative time string (e.g., "2h", "5m", "3d")
 * @param timestamp - Unix timestamp in milliseconds or ISO string
 * @returns Relative time string
 */
export function formatRelativeTime(timestamp: string | number): string {
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

  if (diffInSeconds < 60) {
    return diffInSeconds <= 5 ? "ahora" : `${diffInSeconds}s`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}min`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks}sem`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}m`;
  } else {
    return `${diffInYears}a`;
  }
}

/**
 * Formats a timestamp to a readable date string (e.g., "7 de Enero, 2026")
 * @param timestamp - Unix timestamp in milliseconds or ISO string
 * @returns Formatted date string
 */
export function formatDate(timestamp: string | number): string {
  const date = new Date(
    typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp
  );
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
