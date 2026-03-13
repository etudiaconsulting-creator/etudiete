"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lightbulb, ArrowRight, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import type { CommonMistake, MistakeImpact } from "@/types/database";

const moduleTabs = [
  { code: null, label: "Toutes" },
  { code: "E1", label: "E1" },
  { code: "E2", label: "E2" },
  { code: "E3", label: "E3" },
  { code: "E4", label: "E4" },
  { code: "E5", label: "E5" },
];

const impactFilters: { key: MistakeImpact | null; label: string }[] = [
  { key: null, label: "Toutes" },
  { key: "critical", label: "Critiques" },
  { key: "major", label: "Majeures" },
  { key: "minor", label: "Mineures" },
];

const impactConfig: Record<MistakeImpact, { label: string; bg: string; text: string; dot: string }> = {
  critical: {
    label: "Critique",
    bg: "bg-red-500",
    text: "text-white",
    dot: "bg-red-500",
  },
  major: {
    label: "Majeure",
    bg: "bg-orange-500",
    text: "text-white",
    dot: "bg-orange-500",
  },
  minor: {
    label: "Mineure",
    bg: "bg-yellow-400",
    text: "text-gray-900",
    dot: "bg-yellow-400",
  },
};

const impactFilterStyle: Record<MistakeImpact, { active: string }> = {
  critical: { active: "bg-red-500 text-white border-red-500" },
  major: { active: "bg-orange-500 text-white border-orange-500" },
  minor: { active: "bg-yellow-400 text-gray-900 border-yellow-400" },
};

export default function ErreursClient() {
  const [mistakes, setMistakes] = useState<CommonMistake[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeImpact, setActiveImpact] = useState<MistakeImpact | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("common_mistakes")
      .select("*")
      .order("order_index")
      .then(({ data }) => {
        setMistakes((data as unknown as CommonMistake[]) || []);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let result = mistakes;
    if (activeModule) {
      result = result.filter((m) => m.module_code === activeModule);
    }
    if (activeImpact) {
      result = result.filter((m) => m.impact === activeImpact);
    }
    return result;
  }, [mistakes, activeModule, activeImpact]);

  const counts = useMemo(() => {
    const base = activeModule ? mistakes.filter((m) => m.module_code === activeModule) : mistakes;
    return {
      critical: base.filter((m) => m.impact === "critical").length,
      major: base.filter((m) => m.impact === "major").length,
      minor: base.filter((m) => m.impact === "minor").length,
    };
  }, [mistakes, activeModule]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Chargement des erreurs fréquentes...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      <div>
        <div className="flex items-center gap-3 mb-1">
          <AlertTriangle className="w-6 h-6 text-orange-500" />
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            Erreurs fréquentes
          </h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {mistakes.length} erreurs à éviter pour réussir ton BTS Diététique
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-gray-600 dark:text-gray-400">{counts.critical} critiques</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
          <span className="text-gray-600 dark:text-gray-400">{counts.major} majeures</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="text-gray-600 dark:text-gray-400">{counts.minor} mineures</span>
        </span>
      </div>

      {/* Module filter */}
      <div className="flex flex-wrap gap-2">
        {moduleTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveModule(activeModule === tab.code ? null : tab.code)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              activeModule === tab.code
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Impact filter */}
      <div className="flex flex-wrap gap-2">
        {impactFilters.map((f) => (
          <button
            key={f.label}
            onClick={() => setActiveImpact(activeImpact === f.key ? null : f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              activeImpact === f.key
                ? f.key
                  ? impactFilterStyle[f.key].active
                  : "bg-emerald-500 text-white border-emerald-500"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Mistakes list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 dark:text-gray-500">Aucune erreur ne correspond aux filtres.</p>
          <button
            onClick={() => {
              setActiveModule(null);
              setActiveImpact(null);
            }}
            className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((mistake) => {
            const impact = impactConfig[mistake.impact];
            return (
              <Card key={mistake.id}>
                {/* Header: impact badge + module badge */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${impact.bg} ${impact.text}`}
                  >
                    {impact.label}
                  </span>
                  <Badge>{mistake.module_code}</Badge>
                </div>

                {/* Title */}
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {mistake.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {mistake.description}
                </p>

                {/* Tip box */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                    {mistake.tip}
                  </p>
                </div>

                {/* Chapter link */}
                {mistake.related_chapter_id && (
                  <Link
                    href={`/dashboard/chapters/${mistake.related_chapter_id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 hover:underline mt-3"
                  >
                    Revoir la fiche
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
