"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/toast";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { createClient } from "@/lib/supabase/client";
import { WeeklyObjective, Module, ProgramDuration } from "@/types/database";
import { Trash2, Edit2, Plus } from "lucide-react";

const PROGRAM_DURATIONS: { value: ProgramDuration; label: string }[] = [
  { value: "1month", label: "1 mois" },
  { value: "3months", label: "3 mois" },
  { value: "6months", label: "6 mois" },
  { value: "12months", label: "12 mois" },
  { value: "24months", label: "24 mois" },
];

export default function WeeklyObjectivesListPage() {
  const [objectives, setObjectives] = useState<(WeeklyObjective & { module?: Module })[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<ProgramDuration>("1month");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const [objRes, modRes] = await Promise.all([
        supabase.from("weekly_objectives").select("*"),
        supabase.from("modules").select("*"),
      ]);

      if (objRes.data) {
        const withModules = (objRes.data as WeeklyObjective[]).map((obj) => ({
          ...obj,
          module: (modRes.data as Module[])?.find((m) => m.id === obj.module_id),
        }));
        setObjectives(withModules);
      }
      if (modRes.data) setModules(modRes.data as Module[]);
      setLoading(false);
    }
    fetch();
  }, []);

  const filtered = objectives.filter((o) => o.program_duration === selectedDuration).sort((a, b) => a.week_number - b.week_number);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from("weekly_objectives").delete().eq("id", deleteId);
    setDeleting(false);
    setDeleteId(null);
    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      setObjectives((prev) => prev.filter((o) => o.id !== deleteId));
      toast.success("Objectif supprimé");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-pulse text-gray-400">Chargement...</div></div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Objectifs hebdomadaires</h1>
        <Link href="/admin/weekly-objectives/new">
          <Button variant="primary" size="md" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter une semaine
          </Button>
        </Link>
      </div>

      <Card>
        <div className="mb-4">
          <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5">
            Durée du programme
          </label>
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value as ProgramDuration)}
            className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
          >
            {PROGRAM_DURATIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {filtered.length} semaine{filtered.length !== 1 ? "s" : ""}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Semaine N°</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Module</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Titre</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Nb chapitres</th>
                <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((obj) => (
                <tr key={obj.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{obj.week_number}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{obj.module?.code}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{obj.title}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{obj.chapter_ids?.length || 0}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <Link href={`/admin/weekly-objectives/${obj.id}/edit`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Edit2 className="w-3.5 h-3.5" />
                        Modifier
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-coral-600 hover:text-coral-700"
                      onClick={() => setDeleteId(obj.id)}
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
        title="Supprimer l'objectif?"
        message="Cette action ne peut pas être annulée."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
