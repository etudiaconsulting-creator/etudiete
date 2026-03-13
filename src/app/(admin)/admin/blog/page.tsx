"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { BlogPost } from "@/types/database";
import { ChevronRight, AlertCircle, Plus, Trash2 } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, postId: "", loading: false });
  const { success, error } = useToast();
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (data) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async () => {
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    try {
      const { error: err } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", deleteDialog.postId);

      if (err) throw err;
      success("Article supprimé avec succès");
      setPosts(posts.filter((p) => p.id !== deleteDialog.postId));
      setDeleteDialog({ open: false, postId: "", loading: false });
    } catch (err) {
      console.error("Error deleting post:", err);
      error("Erreur lors de la suppression de l'article");
      setDeleteDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Blog
        </h1>
        <Link href="/admin/blog/new">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un article
          </Button>
        </Link>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {posts.length} article{posts.length !== 1 ? "s" : ""} trouvé{posts.length !== 1 ? "s" : ""}
      </p>

      {posts.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Aucun article trouvé</p>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Titre
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Slug
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Date de publication
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Statut
                  </th>
                  <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {post.title}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {post.slug}
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString("fr-FR")
                        : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          post.published_at ? "emerald" : "gray"
                        }
                      >
                        {post.published_at ? "Publié" : "Brouillon"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="inline-flex items-center gap-1"
                          >
                            Modifier
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setDeleteDialog({
                              open: true,
                              postId: post.id,
                              loading: false,
                            })
                          }
                          className="text-coral-600 dark:text-coral-400 hover:bg-coral-50 dark:hover:bg-coral-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <ConfirmDialog
        open={deleteDialog.open}
        title="Supprimer l'article"
        message="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ open: false, postId: "", loading: false })}
        loading={deleteDialog.loading}
      />
    </div>
  );
}
