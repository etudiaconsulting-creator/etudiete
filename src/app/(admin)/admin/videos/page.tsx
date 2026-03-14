"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { Video, Module } from "@/types/database";
import { ChevronRight, AlertCircle, Plus, Trash2 } from "lucide-react";

const categoryLabels: Record<string, string> = {
  cours: "Cours",
  methode: "Méthode",
  annale: "Annale",
  conseil: "Conseil",
  temoignage: "Témoignage",
};

interface VideoWithModule extends Video {
  module?: Module;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoWithModule[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, videoId: "", loading: false });
  const { success, error } = useToast();
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: modulesData } = await supabase
          .from("modules")
          .select("*")
          .order("order_index");

        if (modulesData) {
          setModules(modulesData as Module[]);
        }

        const { data: videosData } = await supabase
          .from("videos")
          .select("*")
          .order("order_index");

        if (videosData) {
          const videosTyped = videosData as Video[];
          const modulesTyped = (modulesData as Module[]) || [];
          const withModules = videosTyped.map((video) => ({
            ...video,
            module: modulesTyped.find((m) => m.id === video.module_id),
          }));
          setVideos(withModules);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredVideos = selectedModule
    ? videos.filter((v) => v.module_id === selectedModule)
    : videos;

  const handleDelete = async () => {
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    try {
      const { error: err } = await supabase
        .from("videos")
        .delete()
        .eq("id", deleteDialog.videoId);

      if (err) throw err;
      success("Vidéo supprimée avec succès");
      setVideos(videos.filter((v) => v.id !== deleteDialog.videoId));
      setDeleteDialog({ open: false, videoId: "", loading: false });
    } catch (err) {
      console.error("Error deleting video:", err);
      error("Erreur lors de la suppression de la vidéo");
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
          Vidéos
        </h1>
        <Link href="/admin/videos/new">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter une vidéo
          </Button>
        </Link>
      </div>

      <Card className="p-4">
        <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5">
          Filtrer par module
        </label>
        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
        >
          <option value="">Tous les modules</option>
          {modules.map((m) => (
            <option key={m.id} value={m.id}>
              {m.code} - {m.title}
            </option>
          ))}
        </select>
      </Card>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filteredVideos.length} vidéo{filteredVideos.length !== 1 ? "s" : ""} trouvée{filteredVideos.length !== 1 ? "s" : ""}
      </p>

      {filteredVideos.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Aucune vidéo trouvée</p>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Miniature
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Titre
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Module
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Catégorie
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Gratuit
                  </th>
                  <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredVideos.map((video) => (
                  <tr
                    key={video.id}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtube_video_id}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-20 h-[45px] object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {video.title}
                    </td>
                    <td className="py-3 px-4">
                      {video.module ? (
                        <Badge variant="gray">{video.module.code}</Badge>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">Général</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {categoryLabels[video.category] || video.category}
                    </td>
                    <td className="py-3 px-4">
                      {video.is_free ? (
                        <Badge variant="emerald">Oui</Badge>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">Non</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/videos/${video.id}/edit`}>
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
                              videoId: video.id,
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
        title="Supprimer la vidéo"
        message="Êtes-vous sûr de vouloir supprimer cette vidéo ? Cette action est irréversible."
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ open: false, videoId: "", loading: false })}
        loading={deleteDialog.loading}
      />
    </div>
  );
}
