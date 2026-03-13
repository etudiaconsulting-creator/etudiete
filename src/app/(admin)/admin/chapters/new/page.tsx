"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { Module, Chapter } from "@/types/database";
import { ChevronLeft } from "lucide-react";

export default function NewChapterPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const supabase = createClient();

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    module_id: "",
    title: "",
    description: "",
    priority: 2,
    order_index: 0,
    estimated_hours: 1,
    content_html: "",
  });

  useEffect(() => {
    async function fetchModules() {
      try {
        const { data } = await supabase
          .from("modules")
          .select("*")
          .order("order_index");

        if (data) {
          const modulesData = data as Module[];
          setModules(modulesData);
          if (modulesData.length > 0) {
            setFormData((prev) => ({ ...prev, module_id: modulesData[0].id }));
          }
        }
      } catch (err) {
        console.error("Error fetching modules:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchModules();
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (redirectAfter: boolean = true) => {
    if (!formData.module_id || !formData.title) {
      error("Veuillez remplir les champs obligatoires");
      return;
    }

    setSaving(true);
    try {
      const { error: err } = await supabase
        .from("chapters")
        .insert({
          id: crypto.randomUUID(),
          module_id: formData.module_id,
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          order_index: formData.order_index,
          estimated_hours: formData.estimated_hours,
          content_html: formData.content_html,
        } as never);

      if (err) throw err;
      success("Chapitre créé avec succès");

      if (redirectAfter) {
        router.push("/admin/chapters");
      } else {
        setFormData((prev) => ({
          ...prev,
          title: "",
          description: "",
          priority: 2,
          order_index: prev.order_index + 1,
          estimated_hours: 1,
          content_html: "",
        }));
      }
    } catch (err) {
      console.error("Error creating chapter:", err);
      error("Erreur lors de la création du chapitre");
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

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/chapters">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
            Retour
          </Button>
        </Link>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Nouveau chapitre
        </h1>
      </div>

      <Card>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="module_id"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Module (obligatoire)
            </label>
            <select
              id="module_id"
              value={formData.module_id}
              onChange={(e) => handleChange("module_id", e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.code} - {m.title}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Titre (obligatoire)"
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

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Priorité
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => handleChange("priority", parseInt(e.target.value))}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value={1}>1 - Vital</option>
              <option value={2}>2 - Important</option>
              <option value={3}>3 - Approfondissement</option>
            </select>
          </div>

          <Input
            label="Ordre d'affichage"
            id="order_index"
            type="number"
            value={formData.order_index}
            onChange={(e) => handleChange("order_index", parseInt(e.target.value))}
          />

          <Input
            label="Temps estimé (heures)"
            id="estimated_hours"
            type="number"
            step="0.5"
            value={formData.estimated_hours}
            onChange={(e) => handleChange("estimated_hours", parseFloat(e.target.value))}
          />

          <MarkdownEditor
            label="Contenu (Markdown)"
            value={formData.content_html}
            onChange={(value) => handleChange("content_html", value)}
            rows={12}
          />

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => handleSave(true)}
              disabled={saving}
            >
              {saving ? "Enregistrement..." : "Sauvegarder"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={saving}
            >
              Sauvegarder et ajouter un autre
            </Button>
            <Link href="/admin/chapters">
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
