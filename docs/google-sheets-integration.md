# Google Sheets Integration (Frontend Only) — JJR SOFTWARE

This project uses **frontend-only** form submission:

- React frontend sends data using `fetch()`
- A **Google Apps Script Web App** receives the request
- Apps Script appends the row to **Google Sheets**

No Node/Express backend. No Google API keys in the frontend.

---

## 1) Google Sheet setup (step-by-step)

### 1.1 Create the Sheet
1. Go to Google Drive → **New** → **Google Sheets**
2. Name it: **JJR Leads**
3. Rename the first tab (sheet) to: **Leads**

### 1.2 Add header row (exact order required)
In **row 1** of the `Leads` tab, add columns in this exact order:

1. **Name**
2. **Email**
3. **Phone**
4. **Subject**
5. **Message**
6. **Page**
7. **Timestamp**

---

## 2) Apps Script setup (step-by-step)

### 2.1 Open Apps Script
Inside your Google Sheet:
1. Click **Extensions → Apps Script**
2. Delete any existing code in `Code.gs`
3. Paste the code from **Section 3** below
4. Press **Save** (Ctrl+S)

### 2.2 Deploy as a Web App (this generates the URL)
1. Click **Deploy → New deployment**
2. Click **Select type** → choose **Web app**
3. Set:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. Approve permissions when Google asks
6. Copy the **Web app URL** (looks like):
   - `https://script.google.com/macros/s/XXXXXXXXXXXX/exec`

You will paste this URL into your frontend `.env`.

---

## 3) Apps Script code (copy/paste)

Paste this in Apps Script (`Code.gs`):

```javascript
function doPost(e) {
  try {
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    var payload = {};
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    }

    // Ensure all keys exist
    var required = ["name", "email", "phone", "subject", "message", "page", "timestamp"];
    for (var i = 0; i < required.length; i++) {
      var k = required[i];
      if (payload[k] === undefined || payload[k] === null) payload[k] = "";
    }

    // Uses the spreadsheet that this script is attached to
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Leads") || ss.insertSheet("Leads");

    // Header sequence (exact order)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Name", "Email", "Phone", "Subject", "Message", "Page", "Timestamp"]);
    }

    // Row mapping (same order as headers)
    sheet.appendRow([
      payload.name,
      payload.email,
      payload.phone,
      payload.subject,
      payload.message,
      payload.page,
      payload.timestamp,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    try { LockService.getScriptLock().releaseLock(); } catch (e) {}
  }
}
```

---

## 4) Frontend `.env` setup (step-by-step)

This project is Vite. Environment variables must start with `VITE_`.

### 4.1 Create `.env` file
In your project root (same folder as `package.json`), create a file named:

- `.env`

Add this line:

```env
VITE_GOOGLE_SHEETS_WEBAPP_URL="PASTE_YOUR_WEB_APP_URL_HERE"
```

Example:

```env
VITE_GOOGLE_SHEETS_WEBAPP_URL="https://script.google.com/macros/s/XXXXXXXXXXXX/exec"
```

### 4.2 Restart dev server
Vite reads `.env` only on startup.
1. Stop your dev server
2. Start again:
   - `npm run dev`

### 4.3 Where the env is used (frontend function)
The frontend reads the env variable in:
- `src/lib/googleSheets.ts`

It uses:
- `import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL`

---

## 5) Frontend submission behavior

Forms currently wired:
- `src/pages/Contact.tsx` → sends `page: "Contact"`
- `src/pages/OurTeam.tsx` → sends `page: "Our Team"`

Payload format (JSON):

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 94 281 951 57",
  "subject": "Project Inquiry",
  "message": "I want a new website...",
  "page": "Contact",
  "timestamp": "2026-01-20T10:15:30.000Z"
}
```

Button behavior:
- Disabled while sending
- Shows success/error status message

---

## 6) Testing checklist

1. Open the site → go to **Contact**
2. Fill the form → click **Send Message**
3. In Google Sheets → `Leads` tab → a new row should appear

---

## 7) Troubleshooting

### 7.1 “Missing VITE_GOOGLE_SHEETS_WEBAPP_URL”
- You didn’t create `.env` or you didn’t restart the dev server.

### 7.2 No row added / error response
- Re-check Apps Script deployment:
  - Must be **Web app**
  - Access must be **Anyone**
  - Execute as **Me**

### 7.3 CORS issues
This project sends the body as JSON text but uses:
- `Content-Type: text/plain;charset=utf-8`

This avoids CORS preflight for Apps Script Web Apps.

---

## 8) Security notes

- No Google API keys are stored in frontend
- No credentials are exposed
- Only the Apps Script Web App URL is in `.env`


