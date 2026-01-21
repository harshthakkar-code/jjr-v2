import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { fetchPublishedBlogBySlug, fetchPublishedBlogNav, type BlogNavItem, type BlogRow } from "@/lib/blogs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<BlogNavItem[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPublishedBlogBySlug(String(slug || ""));
        if (!alive) return;
        setPost(data);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load blog.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const items = await fetchPublishedBlogNav();
        if (!alive) return;
        setNavItems(items);
      } catch {
        // ignore nav errors; blog content still works
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const title = post?.title || "Blog";
  const description = post?.excerpt || (post?.content ? post.content.slice(0, 160) : "Blog post");

  const currentIndex = navItems.findIndex((p) => p.slug === slug);
  const count = navItems.length;
  const hasNav = count > 1 && currentIndex !== -1;

  // Requirement:
  // - 1 blog: no nav
  // - 2 blogs: show ONLY "Next"
  // - 3+ blogs: show BOTH prev/next (circular)
  let nextPost: BlogNavItem | null = null;
  let prevPost: BlogNavItem | null = null;
  if (hasNav) {
    if (count === 2) {
      nextPost = navItems[(currentIndex + 1) % count];
      prevPost = null;
    } else {
      nextPost = navItems[(currentIndex + 1) % count];
      prevPost = navItems[(currentIndex - 1 + count) % count];
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={title}
        description={description}
        canonical={slug ? `/blog/${slug}` : "/blog"}
        ogType="article"
        ogImage={post?.cover_image || undefined}
      />
      <Header />

      <section className="pt-32 pb-10">
        <div className="container">
          <Button variant="outline" asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          {loading && <div className="text-muted-foreground">Loading post...</div>}
          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm">
              {error}
            </div>
          )}
          {!loading && !error && !post && (
            <div className="rounded-2xl border bg-card px-6 py-10 text-center">
              <h3 className="font-serif text-xl text-foreground">Post not found</h3>
              <p className="text-muted-foreground mt-2">
                This post may be unpublished or the link is incorrect.
              </p>
              <div className="mt-6">
                <Button variant="hero" asChild>
                  <Link to="/blog">Go to Blog</Link>
                </Button>
              </div>
            </div>
          )}

          {post && (
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              {post.cover_image && (
                <div className="rounded-3xl overflow-hidden mb-10 aspect-[16/9] bg-secondary">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-foreground text-background text-[11px] font-semibold tracking-wide uppercase">
                  {(post.category || "General").toUpperCase()}
                </span>
              </div>

              <h1 className="mt-4 font-serif text-4xl md:text-5xl text-foreground leading-tight">
                {post.title}
              </h1>

              <div className="mt-4 text-sm text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
                <span>{formatDate(post.created_at)}</span>
                {post.author && (
                  <>
                    <span>•</span>
                    <span>{post.author}</span>
                  </>
                )}
              </div>

              {post.excerpt && (
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-10 prose prose-neutral max-w-none dark:prose-invert">
                {/* Simple rendering (textarea content). If you want Markdown, we can add a renderer. */}
                {post.content.split("\n").map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Next / Previous */}
              {hasNav && (nextPost || prevPost) && (
                <div className="mt-14 grid gap-6 md:grid-cols-2">
                  {prevPost && (
                    <Link
                      to={`/blog/${prevPost.slug}`}
                      className="group rounded-2xl border border-border bg-card shadow-card overflow-hidden flex items-center gap-5 p-5 hover:border-primary/40 transition-colors"
                    >
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-secondary shrink-0">
                        {prevPost.cover_image ? (
                          <img
                            src={prevPost.cover_image}
                            alt={prevPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary to-background" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm text-muted-foreground">Previous Post</div>
                        <div
                          className="mt-1 font-serif text-lg text-foreground leading-snug"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {prevPost.title}
                        </div>
                      </div>
                      <div className="ml-auto text-muted-foreground group-hover:text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                      </div>
                    </Link>
                  )}

                  {nextPost && (
                    <Link
                      to={`/blog/${nextPost.slug}`}
                      className={`group rounded-2xl border border-border bg-card shadow-card overflow-hidden flex items-center gap-5 p-5 hover:border-primary/40 transition-colors ${
                        prevPost ? "" : "md:col-span-2"
                      }`}
                    >
                      <div className="min-w-0 text-right flex-1">
                        <div className="text-sm text-muted-foreground">Next Post</div>
                        <div
                          className="mt-1 font-serif text-lg text-foreground leading-snug"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {nextPost.title}
                        </div>
                      </div>
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-secondary shrink-0">
                        {nextPost.cover_image ? (
                          <img
                            src={nextPost.cover_image}
                            alt={nextPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary to-background" />
                        )}
                      </div>
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Link>
                  )}
                </div>
              )}
            </motion.article>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;


