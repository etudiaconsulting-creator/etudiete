"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { ChevronLeft } from "lucide-react";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewBlogPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const supabase = createClient();

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content_html: "",
    cover_image_url: "",
    published_at: "",
    published: false,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "title" && { slug: generateSlug(value) }),
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content_html) {
      error("Veuillez remplir les champs obligatoires");
      return;
    }

    setSaving(true);
    try {
      let publishedAt = null;
      if (formData.published) {
        publishedAt = formData.published_at
          ? new Date(formData.published_at).toISOString()
          : new Date().toISOString();
      }

      const { error: err } = await supabase
        .from("blog_posts")
        .insert({
          id: crypto.randomUUID(),
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content_html: formData.content_html,
          cover_image_url: formData.cover_image_url || null,
          published_at: publishedAt,
        } as never);

      if (err) throw err;
      success("Article créé avec succès");
      router.push("/admin/blog");
    } catch (err) {
      console.error("Error creating post:", err);
      error("Erreur lors de la création de l'article");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/blog">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
            Retour
          </Button>
        </Link>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Nouvel article
        </h1>
      </div>

      <Card>
        <div className="space-y-6">
          <Input
            label="Titre (obligatoire)"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />

          <Input
            label="Slug (auto-généré, modifiable)"
            id="slug"
            value={formData.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
          />

          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Extrait (obligatoire)
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleChange("excerpt", e.target.value)}
              className="w-full min-h-[80px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-colors"
              required
            />
          </div>

          <MarkdownEditor
            label="Contenu (obligatoire, Markdown)"
            value={formData.content_html}
            onChange={(value) => handleChange("content_html", value)}
            rows={16}
          />

          <Input
            label="URL de l'image de couverture (optionnel)"
            id="cover_image_url"
            placeholder="https://..."
            value={formData.cover_image_url}
            onChange={(e) => handleChange("cover_image_url", e.target.value)}
          />

          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => handleChange("published", e.target.checked)}
                className="w-4 h-4 rounded border-gray-200 dark:border-gray-700 text-emerald-600 focus:ring-emerald-400"
              />
              <label
                htmlFor="published"
                className="text-sm font-normal text-gray-700 dark:text-gray-300"
              >
                Publier cet article
              </label>
            </div>

            {formData.published && (
              <Input
                label="Date de publication"
                id="published_at"
                type="date"
                value={formData.published_at}
                onChange={(e) => handleChange("published_at", e.target.value)}
              />
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Enregistrement..." : "Sauvegarder"}
            </Button>
            <Link href="/admin/blog">
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
