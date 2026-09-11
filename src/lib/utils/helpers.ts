/**
 * Generate a URL-friendly slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Extract the file extension from a filename.
 */
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

/**
 * Format file size in human-readable format.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Generate a random color from a string (for avatars, tags, etc.).
 */
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 50%)`;
}

/**
 * Calculate match percentage between two skill sets.
 * Required: { skillName: requiredLevel }
 * Profile: { skillName: currentLevel }
 */
export function calculateSkillMatch(
  required: Record<string, number>,
  profile: Record<string, number>
): number {
  const requiredSkills = Object.entries(required);
  if (requiredSkills.length === 0) return 100;

  let totalMatch = 0;
  for (const [skill, requiredLevel] of requiredSkills) {
    const currentLevel = profile[skill] || 0;
    const match = Math.min(currentLevel / requiredLevel, 1);
    totalMatch += match;
  }

  return Math.round((totalMatch / requiredSkills.length) * 100);
}

/**
 * Sleep for a given number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if we're running on the server.
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Get the base URL for the application.
 */
export function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}
