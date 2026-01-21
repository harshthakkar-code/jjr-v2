import { supabase } from "@/lib/supabase";

export type BlogStatus = "draft" | "published";

export type BlogRow = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  status: BlogStatus | string;
  author: string | null;
  created_at: string;
};

export type BlogInsert = {
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  status: BlogStatus;
  author?: string;
};

export type BlogNavItem = {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  created_at: string;
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function fetchPublishedBlogs(): Promise<BlogRow[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("id,title,slug,category,excerpt,cover_image,status,author,created_at,content")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []) as BlogRow[];
}

export async function fetchPublishedBlogNav(): Promise<BlogNavItem[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("id,title,slug,cover_image,created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []) as BlogNavItem[];
}

export async function fetchPublishedBlogBySlug(slug: string): Promise<BlogRow | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select("id,title,slug,category,excerpt,cover_image,status,author,created_at,content")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as BlogRow) || null;
}

export async function insertBlog(payload: BlogInsert): Promise<void> {
  const { error } = await supabase.from("blogs").insert({
    title: payload.title,
    slug: payload.slug,
    category: payload.category || null,
    excerpt: payload.excerpt || null,
    content: payload.content,
    cover_image: payload.cover_image || null,
    status: payload.status,
    author: payload.author || null,
  });

  if (error) throw new Error(error.message);
}


