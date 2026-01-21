export type GoogleSheetsLeadPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  page: string;
  timestamp: string;
};

type AppsScriptResponse =
  | { success: true }
  | { success: false; error?: string };

function getWebAppUrl(): string {
  const url = import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL as string | undefined;
  if (!url) {
    throw new Error(
      "Missing VITE_GOOGLE_SHEETS_WEBAPP_URL. Add it to your .env file (see env.example)."
    );
  }
  return url;
}

/**
 * Frontend-only Google Sheets integration:
 * - POSTs to Google Apps Script Web App URL
 * - Sends JSON string but uses text/plain to avoid CORS preflight
 */
export async function submitLeadToGoogleSheets(
  payload: GoogleSheetsLeadPayload
): Promise<void> {
  const url = getWebAppUrl();

  const res = await fetch(url, {
    method: "POST",
    // IMPORTANT: keep as text/plain to avoid CORS preflight against Apps Script
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data: AppsScriptResponse | null = null;
  try {
    data = JSON.parse(text) as AppsScriptResponse;
  } catch {
    // ignore parse errors; we'll handle below
  }

  if (!res.ok) {
    throw new Error(`Request failed (${res.status}). ${text || "Unknown error."}`);
  }

  if (data && "success" in data && data.success === false) {
    throw new Error(data.error || "Submission failed.");
  }
}

export function isValidEmail(email: string): boolean {
  // pragmatic email check (frontend only)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function normalizePhone(phone: string): string {
  return phone.trim();
}


