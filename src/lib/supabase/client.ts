import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types"; // Note: we'll generate this later

/**
 * Supabase client for browser components (Client Components)
 * Only access NEXT_PUBLIC_ variables here
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
