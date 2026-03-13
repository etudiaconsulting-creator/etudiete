"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { Chapter, Module } from "@/types/database";
import { ChevronRight, AlertCircle, Plus, Trash2 } from "lucide-react";

interface ChapterWithModule extends Chapter {
  module?: Module;
}

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<ChapterWithModule[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, chapterId: "", loading: false });
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
          const modulesTyped = (modulesData as Module[]);
          setModules(modulesTyped);
        }

        const { data: chaptersData } = await supabase
          .from("chapters")
          .select("*")
          .order("order_index");

        if (chaptersData) {
          const chaptersTyped = (chaptersData as Chapter[]);
          const modulesTyped = (modulesData as Module[]) || [];
          const withModules = chaptersTyped.map((chapter) => ({
            ...chapter,
            module: modulesTyped?.find((m) => m.id === chapter.module_id),
          }));
          setChapters(withModules);
        }
      } catch (err) {
        console.error("Error fetching chapters:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredChapters = selectedModule
    ? chapters.filter((c) => c.module_id === selectedModule)
    : chapters;

  const handleDelete = async () => {
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    try {
      const { error: err } = await supabase
        .from("chapters")
        .delete()
        .eq("id", deleteDialog.chapterId);

      if (err) throw err;
      success("Chapitre supprimé avec succès");
      setChapters(chapters.filter((c) => c.id !== deleteDialog.chapterId));
      setDeleteDialog({ open: false, chapterId: "", loading: false });
    } catch (err) {
      console.error("Error deleting chapter:", err);
      error("Erreur lors de la suppression du chapitre");
      setDeleteDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  const priorityLabel = {
    1: "Vital",
    2: "Important",
    3: "Approfondissement",
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
          Chapitres
        </h1>
        <Link href="/admin/chapters/new">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un chapitre
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
        {filteredChapters.length} chapitre{filteredChapters.length !== 1 ? "s" : ""} trouvé{filteredChapters.length !== 1 ? "s" : ""}
      </p>

      {filteredChapters.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Aucun chapitre trouvé</p>
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
                    Module
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Priorité
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Ordre
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Temps estimé
                  </th>
                  <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredChapters.map((chapter) => (
                  <tr
                    key={chapter.id}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {chapter.title}
                    </td>
                    <td className="py-3 px-4">
                      {chapter.module ? (
                        <Badge variant="gray">{chapter.module.code}</Badge>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          chapter.priority === 1
                            ? "coral"
                            : chapter.priority === 2
                            ? "emerald"
                            : "gray"
                        }
                      >
                        {priorityLabel[chapter.priority as keyof typeof priorityLabel]}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {chapter.order_index}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {chapter.estimated_hours}h
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/chapters/${chapter.id}/edit`}>
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
                              chapterId: chapter.id,
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
        title="Supprimer le chapitre"
        message="Êtes-vous sûr de vouloir supprimer ce chapitre ? Cette action est irréversible."
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ open: false, chapterId: "", loading: false })}
        loading={deleteDialog.loading}
      />
    </div>
  );
}
