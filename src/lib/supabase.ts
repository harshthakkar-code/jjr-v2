import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast in dev; in production this will surface in logs
  console.warn(
    "Supabase env vars missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env."
  );
}

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

export type LeadInsert = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  page: string;
};

/**
 * Inserts a single lead row into public.leads.
 * Security:
 * - Uses only anon key
 * - INSERT only, no SELECT/UPDATE/DELETE
 * - Relies on RLS policies configured in Supabase
 */
export async function submitLeadToSupabase(payload: LeadInsert): Promise<void> {
  const { error } = await supabase.from("leads").insert(payload);
  if (error) {
    throw new Error(error.message || "Unable to submit lead.");
  }
}


