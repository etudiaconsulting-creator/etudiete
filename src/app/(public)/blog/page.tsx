import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles et conseils pour réussir le BTS Diététique. Méthodes de révision, erreurs à éviter, nouveau référentiel 2027.",
};

export default async function BlogPage() {
  let posts: { title: string; slug: string; excerpt: string; published_at: string }[] = [];

  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("title, slug, excerpt, published_at")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false });

    if (data) posts = data as typeof posts;
  } catch {
    // Table may not exist yet
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white mb-4">
        Blog
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10">
        Conseils, méthodes et actualités pour réussir ton BTS Diététique.
      </p>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <Card hover>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(post.published_at).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {post.excerpt}
              </p>
            </Card>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            Aucun article pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
