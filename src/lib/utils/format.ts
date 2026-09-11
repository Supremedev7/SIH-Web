import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";

/**
 * Format a date string or Date object into a human-readable format.
 */
export function formatDate(date: string | Date, pattern: string = "MMM d, yyyy"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "Invalid date";
  return format(d, pattern);
}

/**
 * Format a date as relative time (e.g., "2 hours ago").
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(d)) return "Invalid date";
  return formatDistanceToNow(d, { addSuffix: true });
}

/**
 * Format a number as currency (INR by default).
 */
export function formatCurrency(
  amount: number,
  currency: string = "INR",
  locale: string = "en-IN"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number with commas (Indian numbering).
 */
export function formatNumber(num: number, locale: string = "en-IN"): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format a percentage value.
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Truncate text to a given length and append ellipsis.
 */
export function truncate(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

/**
 * Generate initials from a full name (e.g., "John Doe" → "JD").
 */
export function getInitials(name: string, maxChars: number = 2): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, maxChars)
    .join("");
}

/**
 * Capitalize the first letter of each word.
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Convert snake_case or kebab-case to human-readable label.
 */
export function humanize(str: string): string {
  return titleCase(str.replace(/[_-]/g, " "));
}

/**
 * Pluralize a word based on count.
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : (plural || `${singular}s`);
  return `${formatNumber(count)} ${word}`;
}
