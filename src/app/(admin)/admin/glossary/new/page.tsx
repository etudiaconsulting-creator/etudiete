"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { Module } from "@/types/database";
import { ChevronLeft } from "lucide-react";

const CATEGORIES = [
  { value: "biochimie", label: "Biochimie" },
  { value: "physiologie", label: "Physiologie" },
  { value: "physiopathologie", label: "Physiopathologie" },
  { value: "nutrition", label: "Nutrition" },
  { value: "alimentation", label: "Alimentation" },
  { value: "sante_publique", label: "Santé publique" },
  { value: "reglementation", label: "Réglementation" },
];

export default function NewGlossaryPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const supabase = createClient();

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    term: "",
    definition: "",
    category: "biochimie",
    related_terms: "",
    module_id: null as string | null,
  });

  useEffect(() => {
    async function fetchModules() {
      try {
        const { data } = await supabase
          .from("modules")
          .select("*")
          .order("order_index");

        if (data) {
          setModules(data);
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
    if (!formData.term || !formData.definition) {
      error("Veuillez remplir les champs obligatoires");
      return;
    }

    setSaving(true);
    try {
      const relatedTerms = formData.related_terms
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const { error: err } = await supabase
        .from("glossary_terms")
        .insert({
          id: crypto.randomUUID(),
          term: formData.term,
          definition: formData.definition,
          category: formData.category,
          related_terms: relatedTerms,
          module_id: formData.module_id,
        } as never);

      if (err) throw err;
      success("Terme créé avec succès");

      if (redirectAfter) {
        router.push("/admin/glossary");
      } else {
        setFormData({
          term: "",
          definition: "",
          category: "biochimie",
          related_terms: "",
          module_id: null,
        });
      }
    } catch (err) {
      console.error("Error creating term:", err);
      error("Erreur lors de la création du terme");
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
        <Link href="/admin/glossary">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
            Retour
          </Button>
        </Link>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Nouveau terme
        </h1>
      </div>

      <Card>
        <div className="space-y-6">
          <Input
            label="Terme (obligatoire)"
            id="term"
            value={formData.term}
            onChange={(e) => handleChange("term", e.target.value)}
            required
          />

          <div>
            <label
              htmlFor="definition"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Définition (obligatoire)
            </label>
            <textarea
              id="definition"
              value={formData.definition}
              onChange={(e) => handleChange("definition", e.target.value)}
              className="w-full min-h-[80px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-colors"
              required
            />
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
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Termes liés (séparés par des virgules)"
            id="related_terms"
            placeholder="Ex: ATP, protéine, enzyme"
            value={formData.related_terms}
            onChange={(e) => handleChange("related_terms", e.target.value)}
          />

          <div>
            <label
              htmlFor="module_id"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Module associé (optionnel)
            </label>
            <select
              id="module_id"
              value={formData.module_id || ""}
              onChange={(e) =>
                handleChange("module_id", e.target.value || null)
              }
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="">Aucun module</option>
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.code} - {m.title}
                </option>
              ))}
            </select>
          </div>

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
            <Link href="/admin/glossary">
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
