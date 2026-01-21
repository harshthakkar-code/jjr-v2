import { submitLeadToSupabase, type LeadInsert } from "@/lib/supabase";
import { submitLeadToGoogleSheets } from "@/lib/googleSheets";

export type LeadPayload = LeadInsert;

type Provider = "supabase" | "googlesheets";

function getProvider(): Provider {
  const p = (import.meta.env.VITE_LEADS_PROVIDER as string | undefined)?.toLowerCase();
  if (!p) return "supabase"; // default
  if (p === "supabase") return "supabase";
  if (p === "googlesheets" || p === "google-sheets" || p === "google_sheets") return "googlesheets";
  return "supabase";
}

/**
 * Submit lead using the configured provider.
 * Default provider: Supabase
 * Optional provider: Google Sheets (Apps Script Web App)
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const provider = getProvider();

  if (provider === "googlesheets") {
    // Apps Script expects an extra timestamp field; Supabase does not.
    await submitLeadToGoogleSheets({
      ...payload,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Default: Supabase INSERT into public.leads
  await submitLeadToSupabase(payload);
}


