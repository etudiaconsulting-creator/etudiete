"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { Module, ExamType } from "@/types/database";
import { ChevronLeft } from "lucide-react";

export default function EditModulePage() {
  const router = useRouter();
  const params = useParams();
  const { success, error } = useToast();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Module | null>(null);

  const moduleId = params.id as string;

  useEffect(() => {
    async function fetchModule() {
      try {
        const { data, error: err } = await supabase
          .from("modules")
          .select("*")
          .eq("id", moduleId)
          .single();

        if (err) throw err;
        setFormData(data);
      } catch (err) {
        console.error("Error fetching module:", err);
        error("Erreur lors du chargement du module");
      } finally {
        setLoading(false);
      }
    }

    fetchModule();
  }, [moduleId]);

  const handleChange = (field: keyof Module, value: string | number) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);
    try {
      const { error: err } = await supabase
        .from("modules")
        .update({
          code: formData.code,
          title: formData.title,
          description: formData.description,
          coefficient: formData.coefficient,
          exam_type: formData.exam_type,
          exam_duration: formData.exam_duration,
          order_index: formData.order_index,
        } as never)
        .eq("id", moduleId);

      if (err) throw err;
      success("Module mis à jour avec succès");
      router.push("/admin/modules");
    } catch (err) {
      console.error("Error updating module:", err);
      error("Erreur lors de la mise à jour du module");
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
          <p className="text-gray-500 dark:text-gray-400">Module non trouvé</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/modules">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
            Retour
          </Button>
        </Link>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Modifier le module
        </h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Code du module"
            id="code"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
            required
          />

          <Input
            label="Titre"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full min-h-[80px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-colors"
            />
          </div>

          <Input
            label="Coefficient"
            id="coefficient"
            type="number"
            step="0.1"
            value={formData.coefficient}
            onChange={(e) => handleChange("coefficient", parseFloat(e.target.value))}
            required
          />

          <div>
            <label
              htmlFor="exam_type"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Type d&apos;examen
            </label>
            <select
              id="exam_type"
              value={formData.exam_type}
              onChange={(e) => handleChange("exam_type", e.target.value as ExamType)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-colors"
            >
              <option value="written">Écrit</option>
              <option value="oral">Oral</option>
              <option value="practical">Pratique</option>
            </select>
          </div>

          <Input
            label="Durée d'examen"
            id="exam_duration"
            value={formData.exam_duration}
            onChange={(e) => handleChange("exam_duration", e.target.value)}
            placeholder="ex: 120 minutes"
          />

          <Input
            label="Ordre d'affichage"
            id="order_index"
            type="number"
            value={formData.order_index}
            onChange={(e) => handleChange("order_index", parseInt(e.target.value))}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
            <Link href="/admin/modules">
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
