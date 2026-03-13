import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("title, excerpt")
      .eq("slug", params.slug)
      .single();

    const post = data as { title: string; excerpt: string } | null;
    if (!post) return { title: "Article introuvable" };

    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        locale: "fr_FR",
      },
    };
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogArticlePage({ params }: Props) {
  let post: {
    title: string;
    content_html: string;
    published_at: string;
    excerpt: string;
  } | null = null;

  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("title, content_html, published_at, excerpt")
      .eq("slug", params.slug)
      .not("published_at", "is", null)
      .single();

    post = data as typeof post;
  } catch {
    // Table may not exist
  }

  if (!post) notFound();

  const article = post as { title: string; content_html: string; published_at: string; excerpt: string };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au blog
      </Link>
      <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white mb-4">
        {article.title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        {new Date(article.published_at).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div
        className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-medium prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-li:text-gray-600 dark:prose-li:text-gray-400 prose-strong:text-gray-900 dark:prose-strong:text-white"
        dangerouslySetInnerHTML={{ __html: article.content_html }}
      />
    </article>
  );
}
