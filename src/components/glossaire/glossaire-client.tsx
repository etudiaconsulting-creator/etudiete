"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import type { GlossaryTerm } from "@/types/database";
import { BookmarkButton } from "@/components/ui/bookmark-button";

const categories: { key: string; label: string; variant: "emerald" | "coral" | "gray" }[] = [
  { key: "biochimie", label: "Biochimie", variant: "emerald" },
  { key: "physiologie", label: "Physiologie", variant: "emerald" },
  { key: "physiopathologie", label: "Physiopathologie", variant: "coral" },
  { key: "nutrition", label: "Nutrition", variant: "emerald" },
  { key: "alimentation", label: "Alimentation", variant: "emerald" },
  { key: "sante_publique", label: "Santé publique", variant: "coral" },
  { key: "reglementation", label: "Réglementation", variant: "gray" },
];

const categoryMap = Object.fromEntries(categories.map((c) => [c.key, c]));

const moduleNames: Record<string, string> = {
  "11111111-1111-1111-1111-111111111102": "E2 — Biologie et physiopathologie",
  "11111111-1111-1111-1111-111111111103": "E3 — Démarche de soin diététique",
  "11111111-1111-1111-1111-111111111104": "E4 — Alimentation saine et adaptée",
  "11111111-1111-1111-1111-111111111105": "E5 — Santé publique",
};

const moduleCodeFromId: Record<string, string> = {
  "11111111-1111-1111-1111-111111111102": "E2",
  "11111111-1111-1111-1111-111111111103": "E3",
  "11111111-1111-1111-1111-111111111104": "E4",
  "11111111-1111-1111-1111-111111111105": "E5",
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaireClient() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("glossary_terms")
      .select("*")
      .order("term")
      .then(({ data }) => {
        setTerms((data as unknown as GlossaryTerm[]) || []);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let result = terms;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
      );
    }
    if (activeCategory) {
      result = result.filter((t) => t.category === activeCategory);
    }
    return result;
  }, [terms, search, activeCategory]);

  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {};
    for (const t of filtered) {
      const letter = t.term[0]?.toUpperCase() || "#";
      if (!map[letter]) map[letter] = [];
      map[letter].push(t);
    }
    return map;
  }, [filtered]);

  const scrollToLetter = (letter: string) => {
    const el = document.getElementById(`letter-${letter}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTerm = (termName: string) => {
    const found = terms.find((t) => t.term.toLowerCase() === termName.toLowerCase());
    if (found) {
      setExpandedId(found.id);
      setSearch("");
      setActiveCategory(null);
      setTimeout(() => {
        const el = document.getElementById(`term-${found.id}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Chargement du glossaire...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Glossaire BTS Diététique
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {terms.length} termes essentiels pour le BTS Diététique et Nutrition
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un terme..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              activeCategory === cat.key
                ? cat.variant === "emerald"
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : cat.variant === "coral"
                  ? "bg-coral-500 text-white border-coral-500"
                  : "bg-gray-600 text-white border-gray-600"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Alphabetical index */}
      <div className="flex flex-wrap gap-1">
        {ALPHABET.map((letter) => {
          const hasTerms = grouped[letter] && grouped[letter].length > 0;
          return (
            <button
              key={letter}
              onClick={() => hasTerms && scrollToLetter(letter)}
              disabled={!hasTerms}
              className={`w-8 h-8 rounded-md text-xs font-medium transition-colors ${
                hasTerms
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                  : "text-gray-300 dark:text-gray-600 cursor-default"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Terms list */}
      <div ref={listRef} className="space-y-6">
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 dark:text-gray-500">Aucun terme trouvé.</p>
            {search && (
              <button onClick={() => { setSearch(""); setActiveCategory(null); }} className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 hover:underline">
                Réinitialiser la recherche
              </button>
            )}
          </div>
        )}

        {ALPHABET.filter((l) => grouped[l]).map((letter) => (
          <div key={letter} id={`letter-${letter}`}>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-2 sticky top-0 bg-gray-50 dark:bg-[#0a0b10] py-1 z-10">
              {letter}
            </p>
            <div className="space-y-2">
              {grouped[letter].map((t) => {
                const cat = categoryMap[t.category];
                const isExpanded = expandedId === t.id;
                return (
                  <div key={t.id} id={`term-${t.id}`}>
                    <Card className="cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : t.id)}
                        className="w-full text-left"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 dark:text-white" style={{ fontSize: "15px" }}>
                                {t.term}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              )}
                            </div>
                            {!isExpanded && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                                {t.definition}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {cat && <Badge variant={cat.variant}>{cat.label}</Badge>}
                            <BookmarkButton contentType="glossary_term" contentId={t.id} size="sm" />
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {t.definition}
                            </p>

                            {t.related_terms.length > 0 && (
                              <div className="mt-3">
                                <p className="text-xs text-gray-400 mb-1.5">Termes liés :</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {t.related_terms.map((rt) => (
                                    <span
                                      key={rt}
                                      onClick={(e) => { e.stopPropagation(); scrollToTerm(rt); }}
                                      className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                                    >
                                      {rt}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {t.module_id && moduleNames[t.module_id] && (
                              <div className="mt-3">
                                <Link
                                  href={`/dashboard/modules/${moduleCodeFromId[t.module_id]}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  {moduleNames[t.module_id]}
                                </Link>
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
