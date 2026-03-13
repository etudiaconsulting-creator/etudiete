"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { Module } from "@/types/database";
import { ChevronRight, AlertCircle } from "lucide-react";

interface ModuleWithCounts extends Module {
  chapterCount: number;
  questionCount: number;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<ModuleWithCounts[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchModules() {
      try {
        const { data: modulesData } = await supabase
          .from("modules")
          .select("*")
          .order("order_index");

        if (!modulesData) {
          setModules([]);
          return;
        }

        const withCounts = await Promise.all(
          (modulesData as Module[]).map(async (module) => {
            const [chapters, questions] = await Promise.all([
              supabase
                .from("chapters")
                .select("id", { count: "exact" })
                .eq("module_id", module.id),
              supabase
                .from("questions")
                .select("id", { count: "exact" })
                .eq("module_id", module.id),
            ]);

            return {
              ...(module as Module),
              chapterCount: chapters.count || 0,
              questionCount: questions.count || 0,
            };
          })
        );

        setModules(withCounts);
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchModules();
  }, []);

  const examTypeLabel = {
    written: "Écrit",
    oral: "Oral",
    practical: "Pratique",
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
          Modules
        </h1>
      </div>

      {modules.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Aucun module trouvé</p>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Code
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Titre
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Coefficient
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Type d&apos;examen
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Nb chapitres
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Nb questions
                  </th>
                  <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  <tr
                    key={module.id}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <Badge variant="gray" className="font-mono">
                        {module.code}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {module.title}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {module.coefficient}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="emerald">
                        {examTypeLabel[module.exam_type as keyof typeof examTypeLabel]}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {module.chapterCount}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {module.questionCount}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/admin/modules/${module.id}/edit`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="inline-flex items-center gap-1"
                        >
                          Modifier
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
