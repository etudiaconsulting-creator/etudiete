"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { Module, Video } from "@/types/database";
import { ChevronLeft } from "lucide-react";

function extractYouTubeId(input: string): string {
  const watchMatch = input.match(/youtube\.com\/watch\?v=([^&\s]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = input.match(/youtu\.be\/([^?\s]+)/);
  if (shortMatch) return shortMatch[1];
  return input.trim();
}

export default function EditVideoPage() {
  const router = useRouter();
  const params = useParams();
  const { success, error } = useToast();
  const supabase = createClient();

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<(Video & { youtube_input: string }) | null>(null);

  const videoId = params.id as string;

  useEffect(() => {
    async function fetchData() {
      try {
        const [videoResponse, modulesResponse] = await Promise.all([
          supabase.from("videos").select("*").eq("id", videoId).single(),
          supabase.from("modules").select("*").order("order_index"),
        ]);

        if (videoResponse.error) throw videoResponse.error;
        if (modulesResponse.error) throw modulesResponse.error;

        const videoData = videoResponse.data as Video;
        setFormData({
          ...videoData,
          youtube_input: videoData.youtube_video_id,
        });
        if (modulesResponse.data) {
          setModules(modulesResponse.data as Module[]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [videoId]);

  const handleChange = (field: string, value: string | number | boolean) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const youtubeId = formData ? extractYouTubeId(formData.youtube_input) : "";
  const isValidId = youtubeId.length >= 5 && youtubeId.length <= 20;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    if (!formData.title || !formData.youtube_input) {
      error("Veuillez remplir les champs obligatoires");
      return;
    }

    setSaving(true);
    try {
      const { error: err } = await supabase
        .from("videos")
        .update({
          title: formData.title,
          youtube_video_id: youtubeId,
          description: formData.description || null,
          module_id: formData.module_id || null,
          category: formData.category,
          order_index: formData.order_index,
          is_free: formData.is_free,
        } as never)
        .eq("id", videoId);

      if (err) throw err;
      success("Vidéo mise à jour avec succès");
      router.push("/admin/videos");
    } catch (err) {
      console.error("Error updating video:", err);
      error("Erreur lors de la mise à jour de la vidéo");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Chargement...</div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Vidéo non trouvée</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/videos">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
            Retour
          </Button>
        </Link>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Modifier la vidéo
        </h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Titre (obligatoire)"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />

          <div>
            <Input
              label="URL ou ID YouTube (obligatoire)"
              id="youtube_input"
              value={formData.youtube_input}
              onChange={(e) => handleChange("youtube_input", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... ou ID directement"
              required
            />
            {isValidId && formData.youtube_input && (
              <div className="mt-3 max-w-[300px]">
                <YouTubeEmbed videoId={youtubeId} title="Aperçu" />
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full min-h-[80px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="module_id"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Module
            </label>
            <select
              id="module_id"
              value={formData.module_id || ""}
              onChange={(e) => handleChange("module_id", e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="">Aucun — Vidéo générale</option>
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.code} - {m.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Catégorie
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="cours">Cours</option>
              <option value="methode">Méthode</option>
              <option value="annale">Annale corrigée</option>
              <option value="conseil">Conseil</option>
              <option value="temoignage">Témoignage</option>
            </select>
          </div>

          <Input
            label="Ordre d'affichage"
            id="order_index"
            type="number"
            value={formData.order_index}
            onChange={(e) => handleChange("order_index", parseInt(e.target.value))}
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_free"
              checked={formData.is_free}
              onChange={(e) => handleChange("is_free", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800"
            />
            <label
              htmlFor="is_free"
              className="text-sm font-normal text-gray-700 dark:text-gray-300"
            >
              Gratuit (visible par les utilisateurs free)
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
            <Link href="/admin/videos">
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
