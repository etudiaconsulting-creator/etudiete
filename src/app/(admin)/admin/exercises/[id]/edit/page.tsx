"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { Module, ExerciseType, ExamExercise } from "@/types/database";

export default function EditExercisePage() {
  const router = useRouter();
  const params = useParams();
  const exerciseId = params.id as string;
  const toast = useToast();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    module_id: "",
    title: "",
    description: "",
    exercise_type: "full_exam" as ExerciseType,
    duration_minutes: 60,
    priority: 2,
    subject_html: "",
    model_answer_html: "",
    grading_criteria_html: "",
    common_mistakes_html: "",
  });

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const exRes = (await supabase.from("exam_exercises").select("*").eq("id", exerciseId).single()) as { data: ExamExercise | null };
      const modRes = (await supabase.from("modules").select("*")) as { data: Module[] | null };

      if (exRes.data) {
        const ex = exRes.data as ExamExercise;
        setForm({
          module_id: ex.module_id,
          title: ex.title,
          description: ex.description,
          exercise_type: ex.exercise_type,
          duration_minutes: ex.duration_minutes,
          priority: ex.priority,
          subject_html: ex.subject_html,
          model_answer_html: ex.model_answer_html,
          grading_criteria_html: ex.grading_criteria_html,
          common_mistakes_html: ex.common_mistakes_html || "",
        });
      }
      if (modRes.data) {
        setModules(modRes.data);
      }
      setLoading(false);
    }
    fetch();
  }, [exerciseId]);

  const handleSave = async () => {
    if (!form.module_id || !form.title) {
      toast.error("Module et titre sont obligatoires");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("exam_exercises")
      .update(form as never)
      .eq("id", exerciseId);

    setSaving(false);
    if (error) {
      toast.error("Erreur lors de la mise à jour");
    } else {
      toast.success("Exercice mis à jour");
      router.push("/admin/exercises");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-pulse text-gray-400">Chargement...</div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Modifier l&apos;exercice</h1>

      <Card>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5">
                Module
              </label>
              <select
                value={form.module_id}
                onChange={(e) => setForm({ ...form, module_id: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="">Sélectionner un module</option>
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.code} - {m.title}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Titre"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Ex: Examen partiel module 1"
            />
          </div>

          <div>
            <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full min-h-[80px] py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Description de l'exercice..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5">
                Type d&apos;exercice
              </label>
              <select
                value={form.exercise_type}
                onChange={(e) => setForm({ ...form, exercise_type: e.target.value as ExerciseType })}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="full_exam">Sujet complet</option>
                <option value="mini_case">Mini cas</option>
                <option value="oral_prep">Préparation oral</option>
              </select>
            </div>
            <Input
              label="Durée (minutes)"
              type="number"
              value={form.duration_minutes}
              onChange={(e) => setForm({ ...form, duration_minutes: parseInt(e.target.value) || 0 })}
              min="1"
            />
            <div>
              <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5">
                Priorité
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) })}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="1">1 - Élevée</option>
                <option value="2">2 - Moyenne</option>
                <option value="3">3 - Basse</option>
              </select>
            </div>
          </div>

          <MarkdownEditor
            label="Sujet / Énoncé"
            value={form.subject_html}
            onChange={(v) => setForm({ ...form, subject_html: v })}
            rows={12}
          />

          <MarkdownEditor
            label="Correction modèle"
            value={form.model_answer_html}
            onChange={(v) => setForm({ ...form, model_answer_html: v })}
            rows={12}
          />

          <MarkdownEditor
            label="Critères de notation"
            value={form.grading_criteria_html}
            onChange={(v) => setForm({ ...form, grading_criteria_html: v })}
            rows={8}
          />

          <MarkdownEditor
            label="Erreurs fréquentes"
            value={form.common_mistakes_html}
            onChange={(v) => setForm({ ...form, common_mistakes_html: v })}
            rows={8}
          />

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/exercises")}
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
