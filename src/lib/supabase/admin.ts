import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

/**
 * Supabase client with SERVICE_ROLE key.
 * 
 * WARNING: This client bypasses all Row Level Security (RLS) policies.
 * ONLY use this in secure server contexts (API routes, server actions)
 * where you explicitly need to bypass RLS.
 * 
 * NEVER expose this to the client browser.
 */
export const adminClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
