import { supabase } from "@/lib/supabase";

function getExtFromFile(file: File): string {
  const name = file.name || "";
  const parts = name.split(".");
  const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
  // basic safety
  return ext.replace(/[^a-z0-9]/g, "").slice(0, 10) || "jpg";
}

function safeUUID(): string {
  // browser-compatible uuid fallback
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Uploads a blog cover image to Supabase Storage bucket `blog-images`
 * and returns the public URL.
 *
 * Bucket must be public and have insert/select policies as configured.
 */
export async function uploadBlogImage(file: File): Promise<string> {
  const ext = getExtFromFile(file);
  const path = `covers/${new Date().toISOString().slice(0, 10)}/${safeUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(path, file, {
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  if (!data?.publicUrl) throw new Error("Unable to generate public image URL.");
  return data.publicUrl;
}


