# Supabase Integration (Frontend Only) — JJR SOFTWARE

This project can store leads in **Supabase** with no backend server:

- React frontend uses the Supabase JavaScript client
- Inserts data into `public.leads`
- Row Level Security (RLS) protects the table

Supabase is the **default** provider; you can optionally switch to Google Sheets via env.

---

## 1) Supabase project prerequisites

You already have:

- Supabase project created
- `public.leads` table with RLS enabled
- Insert-only RLS policy for `anon` (publishable key)

If you ever need to recreate the table:

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  subject text,
  message text,
  page text,
  created_at timestamp with time zone default now()
);
```

> **Important:** RLS must be enabled and a policy must allow **INSERT** for `anon`:

```sql
alter table public.leads enable row level security;

create policy "Insert leads as anon"
on public.leads
for insert
to anon
with check (true);
```

---

## 2) Environment variables

Create or update your `.env` file in the project root:

```env
VITE_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
VITE_SUPABASE_ANON_KEY="YOUR_ANON_KEY"

# Optional: choose provider (default is supabase)
VITE_LEADS_PROVIDER="supabase"
```

- `VITE_SUPABASE_URL` → from Supabase dashboard (Project settings → API)
- `VITE_SUPABASE_ANON_KEY` → the **anon** public key (never service_role)
- `VITE_LEADS_PROVIDER`:
  - `supabase` → store in Supabase (default if missing)
  - `googlesheets` → send to Google Sheets via Apps Script (see `docs/google-sheets-integration.md`)

After editing `.env`, restart the dev server:

```sh
npm run dev
```

---

## 3) Supabase client (frontend only)

Defined in `src/lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
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

export async function submitLeadToSupabase(payload: LeadInsert): Promise<void> {
  const { error } = await supabase.from("leads").insert(payload);
  if (error) {
    throw new Error(error.message || "Unable to submit lead.");
  }
}
```

Security:
- Uses only the **anon** key (public)
- Only calls `.insert()` on `public.leads`
- No `SELECT`, `UPDATE`, or `DELETE`
- RLS decides what is allowed

---

## 4) Unified lead submission helper

Defined in `src/lib/leads.ts`:

```ts
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

export async function submitLead(payload: LeadPayload): Promise<void> {
  const provider = getProvider();

  if (provider === "googlesheets") {
    await submitLeadToGoogleSheets({
      ...payload,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  await submitLeadToSupabase(payload);
}
```

- By default (`VITE_LEADS_PROVIDER` missing or `supabase`) → **Supabase**
- If `VITE_LEADS_PROVIDER="googlesheets"` → Google Sheets

---

## 5) Form integration (Contact + Our Team)

### 5.1 Contact form (`src/pages/Contact.tsx`)

The Contact form composes a payload and calls `submitLead`:

```ts
import { isValidEmail, normalizePhone } from "@/lib/googleSheets";
import { submitLead } from "@/lib/leads";

// ...

await submitLead({
  name: fullName,
  email: form.email.trim(),
  phone: normalizePhone(form.phone),
  subject: form.subject.trim(),
  message: form.message.trim(),
  page: "Contact",
});
```

### 5.2 Our Team form (`src/pages/OurTeam.tsx`)

The Team page uses the same helper:

```ts
import { isValidEmail } from "@/lib/googleSheets";
import { submitLead } from "@/lib/leads";

// ...

await submitLead({
  name: form.name.trim(),
  email: form.email.trim(),
  phone: "",
  subject: "Team Page Inquiry",
  message: form.message.trim(),
  page: "Our Team",
});
```

Both forms:
- Validate inputs on frontend
- Disable submit button while sending
- Show success or error message (auto-hides after 5s)
- Reset fields on success

---

## 6) Testing Supabase integration

1. Ensure `.env` has:

```env
VITE_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
VITE_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
VITE_LEADS_PROVIDER="supabase"
```

2. Restart dev server:

```sh
npm run dev
```

3. In the app:
   - Open **Contact** page → submit form
   - Open **Our Team** page → submit form

4. In Supabase dashboard:
   - Go to **Table Editor → public.leads**
   - You should see new rows with:
     - name, email, phone, subject, message, page, created_at

---

## 7) Switching between Supabase and Google Sheets

- Use **Supabase** (recommended):

```env
VITE_LEADS_PROVIDER="supabase"
```

- Use **Google Sheets**:

```env
VITE_LEADS_PROVIDER="googlesheets"
VITE_GOOGLE_SHEETS_WEBAPP_URL="https://script.google.com/macros/s/XXXX/exec"
```

Restart `npm run dev` after changing env vars.


