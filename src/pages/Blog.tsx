import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, Plus } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchPublishedBlogs, insertBlog, slugify, type BlogRow, type BlogStatus } from "@/lib/blogs";
import { uploadBlogImage } from "@/lib/blogStorage";
import { X, Upload } from "lucide-react";

const isBlogAdminEnabled = String(import.meta.env.VITE_ENABLE_BLOG_ADMIN).toLowerCase() === "true";

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [adminOpen, setAdminOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [adminMsg, setAdminMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    status: "draft" as BlogStatus,
    author: "JJR SOFTWARE",
  });
  const [slugTouched, setSlugTouched] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [fileInputKey, setFileInputKey] = useState(0);

  const navigate = useNavigate();

  const canSubmit = useMemo(() => {
    return (
      form.title.trim() &&
      form.slug.trim() &&
      form.category.trim() &&
      form.content.trim()
    );
  }, [form.title, form.slug, form.category, form.content]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPublishedBlogs();
        if (!alive) return;
        setBlogs(data);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load blogs.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Auto-generate slug from title until user edits slug manually
  useEffect(() => {
    if (slugTouched) return;
    const next = slugify(form.title);
    setForm((p) => ({ ...p, slug: next }));
  }, [form.title, slugTouched]);

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview("");
      return;
    }
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  const refreshBlogs = async () => {
    const data = await fetchPublishedBlogs();
    setBlogs(data);
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setAdminMsg(null);

    if (!canSubmit) {
      setAdminMsg({ type: "error", text: "Please fill Title, Slug, Category and Content." });
      return;
    }

    setSaving(true);
    try {
      const coverUrl = coverFile ? await uploadBlogImage(coverFile) : undefined;
      await insertBlog({
        title: form.title.trim(),
        slug: form.slug.trim(),
        category: form.category.trim(),
        excerpt: form.excerpt.trim() || undefined,
        content: form.content.trim(),
        cover_image: coverUrl,
        status: form.status,
        author: form.author.trim() || undefined,
      });

      setAdminMsg({ type: "success", text: "Blog saved successfully." });
      setForm({
        title: "",
        slug: "",
        category: "",
        excerpt: "",
        content: "",
        status: "draft",
        author: "JJR SOFTWARE",
      });
      setSlugTouched(false);
      setCoverFile(null);
      setCoverPreview("");
      setFileInputKey((k) => k + 1);
      setAdminOpen(false);

      // If published, refresh list so it appears immediately
      await refreshBlogs();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save blog.";
      // Friendly message for unique slug constraint
      if (msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("unique")) {
        setAdminMsg({ type: "error", text: "Slug already exists. Please choose a different slug." });
      } else {
        setAdminMsg({ type: "error", text: msg });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog"
        description="Read the latest insights, tips, and industry news from JJR SOFTWARE. Articles on software development, technology trends, and best practices."
        keywords="software development blog, technology blog, IT insights, software development tips, Ahmedabad tech blog"
        canonical="/blog"
      />
      <Header />

      <PageHero title="Blog" breadcrumb="Blog" />

      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">Latest Posts</h2>
              <p className="text-muted-foreground mt-2">
                Published updates, insights and best practices from the JJR SOFTWARE team.
              </p>
            </div>

            {isBlogAdminEnabled && (
              <Dialog open={adminOpen} onOpenChange={setAdminOpen}>
                <DialogTrigger asChild>
                  <Button variant="hero" className="shrink-0">
                    <Plus className="w-4 h-4" />
                    Add Blog
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[calc(100vw-2rem)] sm:w-full max-w-2xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add Blog</DialogTitle>
                    <DialogDescription>
                      Create a new blog post. You can save as Draft or Published.
                    </DialogDescription>
                  </DialogHeader>

                  {adminMsg && (
                    <div
                      className={`rounded-xl border px-4 py-3 text-sm ${
                        adminMsg.type === "success"
                          ? "border-primary/30 bg-primary/10"
                          : "border-destructive/30 bg-destructive/10"
                      }`}
                      role="status"
                      aria-live="polite"
                    >
                      {adminMsg.text}
                    </div>
                  )}

                  <form className="space-y-5 pb-1" onSubmit={handleAddBlog}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="grid gap-2">
                        <Label htmlFor="blog-title">Title *</Label>
                        <Input
                          id="blog-title"
                          value={form.title}
                          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                          placeholder="Enter blog title"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="blog-category">Category *</Label>
                        <Input
                          id="blog-category"
                          value={form.category}
                          onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                          placeholder="Technology, Development, Marketing..."
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="blog-slug">Slug *</Label>
                      <Input
                        id="blog-slug"
                        value={form.slug}
                        onChange={(e) => {
                          setSlugTouched(true);
                          setForm((p) => ({ ...p, slug: slugify(e.target.value) }));
                        }}
                        placeholder="auto-generated-from-title"
                      />
                      <p className="text-xs text-muted-foreground">
                        URL: <span className="font-mono">/blog/{form.slug || "your-slug"}</span>
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="blog-excerpt">Excerpt</Label>
                      <Textarea
                        id="blog-excerpt"
                        value={form.excerpt}
                        onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                        placeholder="Short summary for the blog card"
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="blog-content">Content *</Label>
                      <Textarea
                        id="blog-content"
                        value={form.content}
                        onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                        placeholder="Write your blog content here..."
                        rows={10}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="grid gap-2">
                        <Label htmlFor="blog-cover-file">Cover Image (Upload)</Label>

                        {/* Custom file UI to avoid browser-specific icons and keep layout stable */}
                        <div className="flex items-center gap-3">
                          <input
                            key={fileInputKey}
                            id="blog-cover-file"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                          />
                          <Label
                            htmlFor="blog-cover-file"
                            className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-300 border-2 border-foreground/15 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background h-12 px-7 py-3 cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                            {coverFile ? "Change Image" : "Upload Image"}
                          </Label>
                        </div>

                        {coverFile && (
                          <p className="text-xs text-muted-foreground">
                            Selected: <span className="font-medium text-foreground">{coverFile.name}</span>
                          </p>
                        )}

                        {coverPreview && (
                          <div className="relative rounded-2xl overflow-hidden border bg-secondary aspect-[4/3] w-full">
                            <img
                              src={coverPreview}
                              alt="Cover preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setCoverFile(null);
                                setCoverPreview("");
                                setFileInputKey((k) => k + 1);
                              }}
                              className="absolute top-3 right-3 inline-flex items-center justify-center h-9 w-9 rounded-full bg-background/90 backdrop-blur border border-border text-foreground shadow-sm hover:bg-foreground hover:text-background transition-colors"
                              aria-label="Remove cover image"
                              title="Remove"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Optional. If provided, it will be uploaded to Supabase Storage bucket{" "}
                          <span className="font-mono">blog-images</span>.
                        </p>
                      </div>

                      <div className="grid gap-2 content-start">
                        <Label>Status</Label>
                        <Select
                          value={form.status}
                          onValueChange={(v) => setForm((p) => ({ ...p, status: v as BlogStatus }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="blog-author">Author</Label>
                      <Input
                        id="blog-author"
                        value={form.author}
                        onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                        placeholder="JJR SOFTWARE"
                      />
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
                      <Button type="button" variant="outline" onClick={() => setAdminOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="hero" disabled={saving || !canSubmit}>
                        {saving ? "Saving..." : "Save Blog"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {loading && <div className="text-muted-foreground">Loading blogs...</div>}
          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="rounded-2xl border bg-card px-6 py-10 text-center">
              <h3 className="font-serif text-xl text-foreground">No published blogs yet</h3>
              <p className="text-muted-foreground mt-2">
                When you publish a post, it will appear here automatically.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="h-full"
              >
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <div className="h-full rounded-3xl border border-border bg-card shadow-card overflow-hidden flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-secondary">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary to-background" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="px-6 py-7 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-foreground text-background text-[11px] font-semibold tracking-wide uppercase">
                          {(post.category || "General").toUpperCase()}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(post.created_at)}
                        </span>
                      </div>

                      <h3
                        className="font-serif text-2xl text-foreground leading-snug group-hover:text-primary transition-colors"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.title}
                      </h3>

                      <p
                        className="text-sm text-muted-foreground leading-relaxed mt-4"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.excerpt ||
                          post.content.slice(0, 140) + (post.content.length > 140 ? "..." : "")}
                      </p>

                      <div className="mt-auto pt-8">
                        <span className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-300 border-2 border-foreground/15 bg-transparent text-foreground group-hover:border-foreground group-hover:bg-foreground group-hover:text-background h-12 px-7 py-3">
                          <ArrowRight className="w-4 h-4" />
                          Read More
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center text-sm text-muted-foreground">
            Want to publish?{" "}
            <Link className="text-primary hover:underline" to="/contact">
              Contact us
            </Link>
            .
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
