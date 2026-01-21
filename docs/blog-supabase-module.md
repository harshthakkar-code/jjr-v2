# Blog Module (Supabase + Frontend Only) — JJR SOFTWARE

This project implements a **frontend-only** blog module using Supabase:

- Public users can **read published blogs**
- Blog creation UI is shown **only when admin mode is enabled** via env
- No backend server and no Supabase Auth required (as requested)

> Security note: hiding UI via env is **not true security**. Real protection requires Supabase Auth + RLS policies that check the authenticated user. This doc follows your requested approach.

---

## 1) Create `public.blogs` table (run in Supabase SQL Editor)

```sql
create table public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null,
  excerpt text,
  content text not null,
  cover_image text,
  status text default 'draft',
  author text,
  created_at timestamp with time zone default now()
);

alter table public.blogs enable row level security;

-- Allow public read of published blogs only
create policy "Public read published blogs"
on public.blogs
for select
using (status = 'published');

-- Allow insert ONLY for admin users (frontend-controlled)
create policy "Admin insert blogs"
on public.blogs
for insert
to anon
with check (true);
```

### If you already created the table (make `category` required)

Run this in Supabase SQL Editor:

```sql
alter table public.blogs add column if not exists category text;

update public.blogs
set category = 'General'
where category is null;

alter table public.blogs alter column category set not null;
```

---

## 2) Supabase Storage setup (blog images)

### 2.1 Create a bucket
In Supabase Dashboard:

- Storage → Buckets → **New bucket**
- **Name**: `blog-images`
- **Public bucket**: **Enabled**

### 2.2 Storage policies (SQL)
Run in Supabase SQL Editor:

```sql
create policy "Allow public uploads"
on storage.objects
for insert
to anon
with check (bucket_id = 'blog-images');

create policy "Allow public read"
on storage.objects
for select
using (bucket_id = 'blog-images');
```

> Note: This is “public upload” as requested (frontend-only, no auth). For stronger security, use Supabase Auth and restrict uploads to authenticated admins only.

---

## 3) Environment variables

In your `.env` file (project root):

```env
VITE_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
VITE_SUPABASE_ANON_KEY="YOUR_ANON_KEY"

# Blog admin mode (frontend-only)
VITE_ENABLE_BLOG_ADMIN="false"
```

To enable blog creation UI:

```env
VITE_ENABLE_BLOG_ADMIN="true"
```

Restart dev server after changing env:

```sh
npm run dev
```

---

## 4) Routes

- **Blog list**: `/blog`
  - Fetches **published** blogs only
  - Shows “Add Blog” button only if admin mode is enabled
- **Blog detail**: `/blog/:slug`
  - Fetches a **published** blog by slug only

---

## 5) Frontend files added/updated

- `src/lib/blogs.ts`
  - `fetchPublishedBlogs()`
  - `fetchPublishedBlogBySlug()`
  - `insertBlog()` (admin UI uses this)
- `src/lib/blogStorage.ts`
  - `uploadBlogImage(file)` → uploads to bucket `blog-images` and returns public URL
- `src/pages/Blog.tsx`
  - Listing UI + conditional “Add Blog” modal (with cover image upload + preview)
- `src/pages/BlogPost.tsx`
  - Blog detail page (published only)
- `env.example`
  - Added `VITE_ENABLE_BLOG_ADMIN`

---

## 6) Public vs Admin behavior

### Public
- Can see only `status = 'published'` blogs
- Can open blog detail pages for published posts only

### Admin mode (env)
- If `VITE_ENABLE_BLOG_ADMIN="true"`:
  - “Add Blog” button appears on `/blog`
  - Admin can create blogs (draft or published) and optionally upload a cover image


