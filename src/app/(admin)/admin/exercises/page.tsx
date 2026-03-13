"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/admin/toast";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { createClient } from "@/lib/supabase/client";
import { ExamExercise, Module, ExerciseType } from "@/types/database";
import { Trash2, Edit2, Plus } from "lucide-react";

export default function ExercisesListPage() {
  const [exercises, setExercises] = useState<(ExamExercise & { module?: Module })[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const [exRes, modRes] = await Promise.all([
        supabase.from("exam_exercises").select("*"),
        supabase.from("modules").select("*"),
      ]);

      if (exRes.data) {
        const withModules = (exRes.data as ExamExercise[]).map((ex) => ({
          ...ex,
          module: (modRes.data as Module[])?.find((m) => m.id === ex.module_id),
        }));
        setExercises(withModules);
      }
      if (modRes.data) setModules(modRes.data as Module[]);
      setLoading(false);
    }
    fetch();
  }, []);

  const filtered = selectedModule ? exercises.filter((e) => e.module_id === selectedModule) : exercises;

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from("exam_exercises").delete().eq("id", deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      setExercises((prev) => prev.filter((e) => e.id !== deleteId));
      toast.success("Exercice supprimé");
    }
  };

  const getExerciseTypeLabel = (type: ExerciseType) => {
    const labels = {
      full_exam: "Sujet complet",
      mini_case: "Mini cas",
      oral_prep: "Préparation oral",
    };
    return labels[type] || type;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-pulse text-gray-400">Chargement...</div></div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Exercices d'examen</h1>
        <Link href="/admin/exercises/new">
          <Button variant="primary" size="md" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un exercice
          </Button>
        </Link>
      </div>

      <Card>
        <div className="mb-4">
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
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {filtered.length} exercice{filtered.length !== 1 ? "s" : ""}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Titre</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Module</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Durée (min)</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Priorité</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ex) => (
                <tr key={ex.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{ex.title}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{ex.module?.code}</td>
                  <td className="py-3 px-4">
                    <Badge variant="gray">{getExerciseTypeLabel(ex.exercise_type)}</Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{ex.duration_minutes}</td>
                  <td className="py-3 px-4">
                    <Badge variant={ex.priority === 1 ? "coral" : "emerald"}>{ex.priority}</Badge>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <Link href={`/admin/exercises/${ex.id}/edit`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Edit2 className="w-3.5 h-3.5" />
                        Modifier
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-coral-600 hover:text-coral-700"
                      onClick={() => setDeleteId(ex.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <ConfirmDialog
        open={deleteId !== null}
        title="Supprimer l'exercice?"
        message="Cette action ne peut pas être annulée."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
