"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { Module, Chapter, ExamExercise, WeeklyObjective, ProgramDuration } from "@/types/database";

const PROGRAM_DURATIONS: { value: ProgramDuration; label: string }[] = [
  { value: "1month", label: "1 mois" },
  { value: "3months", label: "3 mois" },
  { value: "6months", label: "6 mois" },
  { value: "12months", label: "12 mois" },
  { value: "24months", label: "24 mois" },
];

export default function EditWeeklyObjectivePage() {
  const router = useRouter();
  const params = useParams();
  const objectiveId = params.id as string;
  const toast = useToast();
  const [modules, setModules] = useState<Module[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [exercises, setExercises] = useState<ExamExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    program_duration: "1month" as ProgramDuration,
    week_number: 1,
    module_id: "",
    title: "",
    chapter_ids: [] as string[],
    exercise_ids: [] as string[],
    target_score: 70,
  });

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const objRes = (await supabase.from("weekly_objectives").select("*").eq("id", objectiveId).single()) as { data: WeeklyObjective | null };
      const modRes = (await supabase.from("modules").select("*")) as { data: Module[] | null };
      const chapRes = (await supabase.from("chapters").select("*")) as { data: Chapter[] | null };
      const exRes = (await supabase.from("exam_exercises").select("*")) as { data: ExamExercise[] | null };

      if (objRes.data) {
        const obj = objRes.data as WeeklyObjective;
        setForm({
          program_duration: obj.program_duration,
          week_number: obj.week_number,
          module_id: obj.module_id,
          title: obj.title,
          chapter_ids: obj.chapter_ids || [],
          exercise_ids: obj.exercise_ids || [],
          target_score: obj.target_score,
        });
      }
      if (modRes.data) setModules(modRes.data);
      if (chapRes.data) setChapters(chapRes.data);
      if (exRes.data) setExercises(exRes.data);
      setLoading(false);
    }
    fetch();
  }, [objectiveId]);

  const filteredChapters = form.module_id
    ? chapters.filter((c) => c.module_id === form.module_id)
    : [];
  const filteredExercises = form.module_id
    ? exercises.filter((e) => e.module_id === form.module_id)
    : [];

  const handleSave = async () => {
    if (!form.module_id || !form.title) {
      toast.error("Module et titre sont obligatoires");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("weekly_objectives")
      .update(form as never)
      .eq("id", objectiveId);

    setSaving(false);
    if (error) {
      toast.error("Erreur lors de la mise à jour");
    } else {
      toast.success("Objectif mis à jour");
      router.push("/admin/weekly-objectives");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-pulse text-gray-400">Chargement...</div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Modifier l'objectif hebdomadaire</h1>

      <Card>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5">
                Durée du programme
              </label>
              <select
                value={form.program_duration}
                onChange={(e) => setForm({ ...form, program_duration: e.target.value as ProgramDuration })}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                {PROGRAM_DURATIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Numéro de semaine"
              type="number"
              value={form.week_number}
              onChange={(e) => setForm({ ...form, week_number: parseInt(e.target.value) || 1 })}
              min="1"
            />
            <Input
              label="Score cible (%)"
              type="number"
              value={form.target_score}
              onChange={(e) => setForm({ ...form, target_score: parseInt(e.target.value) || 0 })}
              min="0"
              max="100"
            />
            <div>
              <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5">
                Module
              </label>
              <select
                value={form.module_id}
                onChange={(e) => setForm({ ...form, module_id: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="">Sélectionner</option>
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Titre"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Ex: Introduction à la thermodynamique"
          />

          <div>
            <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-3">
              Chapitres à couvrir ({form.chapter_ids.length} sélectionné{form.chapter_ids.length !== 1 ? "s" : ""})
            </label>
            {filteredChapters.length > 0 ? (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800/50 space-y-2 max-h-[300px] overflow-y-auto">
                {filteredChapters.map((ch) => (
                  <label key={ch.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={form.chapter_ids.includes(ch.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setForm({ ...form, chapter_ids: [...form.chapter_ids, ch.id] });
                        } else {
                          setForm({ ...form, chapter_ids: form.chapter_ids.filter((id) => id !== ch.id) });
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{ch.title}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Sélectionnez un module d'abord</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-3">
              Exercices recommandés ({form.exercise_ids.length} sélectionné{form.exercise_ids.length !== 1 ? "s" : ""})
            </label>
            {filteredExercises.length > 0 ? (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800/50 space-y-2 max-h-[300px] overflow-y-auto">
                {filteredExercises.map((ex) => (
                  <label key={ex.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={form.exercise_ids.includes(ex.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setForm({ ...form, exercise_ids: [...form.exercise_ids, ex.id] });
                        } else {
                          setForm({ ...form, exercise_ids: form.exercise_ids.filter((id) => id !== ex.id) });
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{ex.title}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Sélectionnez un module d'abord</p>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/weekly-objectives")}
              disabled={saving}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Enregistrement..." : "Sauvegarder"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
