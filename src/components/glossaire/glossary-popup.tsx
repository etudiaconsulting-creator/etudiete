"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { GlossaryTerm } from "@/types/database";

const cache = new Map<string, GlossaryTerm | null>();

interface GlossaryPopupProps {
  term: string;
  children: React.ReactNode;
}

export function GlossaryPopup({ term, children }: GlossaryPopupProps) {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<GlossaryTerm | null>(null);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchTerm = useCallback(async () => {
    const key = term.toLowerCase();
    if (cache.has(key)) {
      setData(cache.get(key)!);
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { data: result } = await supabase
      .from("glossary_terms")
      .select("*")
      .ilike("term", key)
      .limit(1)
      .single();
    const entry = (result as unknown as GlossaryTerm) || null;
    cache.set(key, entry);
    setData(entry);
    setLoading(false);
  }, [term]);

  const handleEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
      fetchTerm();
    }, 300);
  };

  const handleLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const handleClick = () => {
    setVisible(!visible);
    if (!visible) fetchTerm();
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span
        onClick={handleClick}
        className="border-b border-dashed border-emerald-400 dark:border-emerald-600 text-emerald-700 dark:text-emerald-400 cursor-help"
      >
        {children}
      </span>

      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 z-50">
          <span className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-left">
            {loading ? (
              <span className="text-xs text-gray-400 animate-pulse">Chargement...</span>
            ) : data ? (
              <>
                <span className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {data.term}
                </span>
                <span className="block text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {data.definition}
                </span>
                <Link
                  href={`/dashboard/glossaire?search=${encodeURIComponent(data.term)}`}
                  className="block text-xs text-emerald-600 dark:text-emerald-400 mt-2 hover:underline"
                >
                  Voir dans le glossaire
                </Link>
              </>
            ) : (
              <span className="text-xs text-gray-400">Terme non trouvé.</span>
            )}
          </span>
          {/* Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 rotate-45 -mt-1" />
        </span>
      )}
    </span>
  );
}
