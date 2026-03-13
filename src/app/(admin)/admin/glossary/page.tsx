"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";
import { createClient } from "@/lib/supabase/client";
import { GlossaryTerm, Module } from "@/types/database";
import { ChevronRight, AlertCircle, Plus, Trash2 } from "lucide-react";

interface TermWithModule extends GlossaryTerm {
  module?: Module;
}

export default function GlossaryPage() {
  const [terms, setTerms] = useState<TermWithModule[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, termId: "", loading: false });
  const { success, error } = useToast();
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: modulesData } = await supabase
          .from("modules")
          .select("*")
          .order("order_index");

        const { data: termsData } = await supabase
          .from("glossary_terms")
          .select("*")
          .order("created_at", { ascending: false });

        if (termsData) {
          const termsTyped = (termsData as GlossaryTerm[]);
          const modulesTyped = (modulesData as Module[]) || [];
          const withModules = termsTyped.map((term) => ({
            ...term,
            module: modulesTyped?.find((m) => m.id === term.module_id),
          }));
          setTerms(withModules);
        }
      } catch (err) {
        console.error("Error fetching terms:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredTerms = terms.filter((t) =>
    t.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    try {
      const { error: err } = await supabase
        .from("glossary_terms")
        .delete()
        .eq("id", deleteDialog.termId);

      if (err) throw err;
      success("Terme supprimé avec succès");
      setTerms(terms.filter((t) => t.id !== deleteDialog.termId));
      setDeleteDialog({ open: false, termId: "", loading: false });
    } catch (err) {
      console.error("Error deleting term:", err);
      error("Erreur lors de la suppression du terme");
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
          Glossaire
        </h1>
        <Link href="/admin/glossary/new">
          <Button variant="primary" className="inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un terme
          </Button>
        </Link>
      </div>

      <Card className="p-4">
        <Input
          label="Rechercher un terme"
          id="search"
          placeholder="Chercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filteredTerms.length} terme{filteredTerms.length !== 1 ? "s" : ""} trouvé{filteredTerms.length !== 1 ? "s" : ""}
      </p>

      {filteredTerms.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Aucun terme trouvé</p>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Terme
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Catégorie
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Module
                  </th>
                  <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTerms.map((term) => (
                  <tr
                    key={term.id}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {term.term}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="gray">{term.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      {term.module ? (
                        <Badge variant="emerald">{term.module.code}</Badge>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/glossary/${term.id}/edit`}>
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
                              termId: term.id,
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
        title="Supprimer le terme"
        message="Êtes-vous sûr de vouloir supprimer ce terme ? Cette action est irréversible."
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ open: false, termId: "", loading: false })}
        loading={deleteDialog.loading}
      />
    </div>
  );
}
