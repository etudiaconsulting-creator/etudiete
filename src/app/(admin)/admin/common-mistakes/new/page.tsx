"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { ChevronLeft } from "lucide-react";

const MODULES = [
  { value: "E1", label: "E1" },
  { value: "E2", label: "E2" },
  { value: "E3", label: "E3" },
  { value: "E4", label: "E4" },
  { value: "E5", label: "E5" },
];

export default function NewCommonMistakePage() {
  const router = useRouter();
  const { success, error } = useToast();
  const supabase = createClient();

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    module_code: "E1",
    title: "",
    description: "",
    impact: "major",
    tip: "",
    related_chapter_id: "",
    order_index: 0,
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.tip) {
      error("Veuillez remplir les champs obligatoires");
      return;
    }

    setSaving(true);
    try {
      const { error: err } = await supabase
        .from("common_mistakes")
        .insert({
          id: crypto.randomUUID(),
          module_code: formData.module_code,
          title: formData.title,
          description: formData.description,
          impact: formData.impact,
          tip: formData.tip,
          related_chapter_id: formData.related_chapter_id || null,
          order_index: formData.order_index,
        } as never);

      if (err) throw err;
      success("Erreur créée avec succès");
      router.push("/admin/common-mistakes");
    } catch (err) {
      console.error("Error creating mistake:", err);
      error("Erreur lors de la création de l'erreur");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/common-mistakes">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
            Retour
          </Button>
        </Link>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Nouvelle erreur courante
        </h1>
      </div>

      <Card>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="module_code"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Module
            </label>
            <select
              id="module_code"
              value={formData.module_code}
              onChange={(e) => handleChange("module_code", e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              {MODULES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
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
              Description (obligatoire)
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full min-h-[80px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="impact"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Impact
            </label>
            <select
              id="impact"
              value={formData.impact}
              onChange={(e) => handleChange("impact", e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="critical">Critique</option>
              <option value="major">Majeure</option>
              <option value="minor">Mineure</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="tip"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Astuce (obligatoire)
            </label>
            <textarea
              id="tip"
              value={formData.tip}
              onChange={(e) => handleChange("tip", e.target.value)}
              className="w-full min-h-[80px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-colors"
              required
            />
          </div>

          <Input
            label="Chapitre lié (optionnel, ex: e2-ch1)"
            id="related_chapter_id"
            placeholder="e2-ch1"
            value={formData.related_chapter_id}
            onChange={(e) => handleChange("related_chapter_id", e.target.value)}
          />

          <Input
            label="Ordre d'affichage"
            id="order_index"
            type="number"
            value={formData.order_index}
            onChange={(e) => handleChange("order_index", parseInt(e.target.value))}
          />

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Enregistrement..." : "Sauvegarder"}
            </Button>
            <Link href="/admin/common-mistakes">
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
