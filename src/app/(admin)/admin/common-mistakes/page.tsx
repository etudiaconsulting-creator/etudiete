"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { CommonMistake, MistakeImpact } from "@/types/database";
import { ChevronRight, AlertCircle, Plus, Trash2 } from "lucide-react";

const MODULES = [
  { value: "E1", label: "E1" },
  { value: "E2", label: "E2" },
  { value: "E3", label: "E3" },
  { value: "E4", label: "E4" },
  { value: "E5", label: "E5" },
];

const IMPACT_LABELS: Record<MistakeImpact, string> = {
  critical: "Critique",
  major: "Majeure",
  minor: "Mineure",
};

const IMPACT_VARIANTS: Record<MistakeImpact, "coral" | "emerald" | "gray"> = {
  critical: "coral",
  major: "emerald",
  minor: "gray",
};

export default function CommonMistakesPage() {
  const [mistakes, setMistakes] = useState<CommonMistake[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterModule, setFilterModule] = useState("");
  const [filterImpact, setFilterImpact] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, mistakeId: "", loading: false });
  const { success, error } = useToast();
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase
          .from("common_mistakes")
          .select("*")
          .order("order_index");

        if (data) {
          setMistakes(data);
        }
      } catch (err) {
        console.error("Error fetching mistakes:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredMistakes = mistakes.filter((m) => {
    if (filterModule && m.module_code !== filterModule) return false;
    if (filterImpact && m.impact !== filterImpact) return false;
    return true;
  });

  const handleDelete = async () => {
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    try {
      const { error: err } = await supabase
        .from("common_mistakes")
        .delete()
        .eq("id", deleteDialog.mistakeId);

      if (err) throw err;
      success("Erreur supprimée avec succès");
      setMistakes(mistakes.filter((m) => m.id !== deleteDialog.mistakeId));
      setDeleteDialog({ open: false, mistakeId: "", loading: false });
    } catch (err) {
      console.error("Error deleting mistake:", err);
      error("Erreur lors de la suppression de l'erreur");
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
          Erreurs courantes
        </h1>
        <Link href="/admin/common-mistakes/new">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter une erreur
          </Button>
        </Link>
      </div>

      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="filter-module"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Filtrer par module
            </label>
            <select
              id="filter-module"
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="">Tous les modules</option>
              {MODULES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-impact"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Filtrer par impact
            </label>
            <select
              id="filter-impact"
              value={filterImpact}
              onChange={(e) => setFilterImpact(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="">Tous les impacts</option>
              <option value="critical">Critique</option>
              <option value="major">Majeure</option>
              <option value="minor">Mineure</option>
            </select>
          </div>
        </div>
      </Card>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filteredMistakes.length} erreur{filteredMistakes.length !== 1 ? "s" : ""} trouvée{filteredMistakes.length !== 1 ? "s" : ""}
      </p>

      {filteredMistakes.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Aucune erreur trouvée</p>
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
                    Impact
                  </th>
                  <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMistakes.map((mistake) => (
                  <tr
                    key={mistake.id}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {mistake.title}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="gray">{mistake.module_code}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={IMPACT_VARIANTS[mistake.impact]}>
                        {IMPACT_LABELS[mistake.impact]}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/common-mistakes/${mistake.id}/edit`}>
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
                              mistakeId: mistake.id,
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
        title="Supprimer l'erreur"
        message="Êtes-vous sûr de vouloir supprimer cette erreur ? Cette action est irréversible."
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ open: false, mistakeId: "", loading: false })}
        loading={deleteDialog.loading}
      />
    </div>
  );
}
