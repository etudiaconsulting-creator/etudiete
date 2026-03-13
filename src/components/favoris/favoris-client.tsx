"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  BookOpen,
  Brain,
  ClipboardList,
  BookA,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { UserBookmark, BookmarkContentType } from "@/types/database";

const tabs: { key: BookmarkContentType; label: string; icon: React.ReactNode }[] = [
  { key: "chapter", label: "Fiches de cours", icon: <BookOpen className="w-4 h-4" /> },
  { key: "question", label: "Questions", icon: <Brain className="w-4 h-4" /> },
  { key: "exercise", label: "Exercices", icon: <ClipboardList className="w-4 h-4" /> },
  { key: "glossary_term", label: "Glossaire", icon: <BookA className="w-4 h-4" /> },
];

export default function FavorisClient() {
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [activeTab, setActiveTab] = useState<BookmarkContentType>("chapter");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetch() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }
        const { data } = await supabase
          .from("user_bookmarks")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        setBookmarks((data as unknown as UserBookmark[]) || []);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeBookmark = async (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    try {
      await supabase.from("user_bookmarks").delete().eq("id", id);
    } catch {
      // silent
    }
  };

  const filtered = bookmarks.filter((b) => b.content_type === activeTab);
  const questionBookmarks = bookmarks.filter((b) => b.content_type === "question");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Chargement des favoris...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            Mes favoris
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {bookmarks.length} élément{bookmarks.length !== 1 ? "s" : ""} sauvegardé{bookmarks.length !== 1 ? "s" : ""}
          </p>
        </div>
        {questionBookmarks.length > 0 && (
          <Link href="/dashboard/quiz/favoris">
            <Button variant="primary" size="sm">
              <Brain className="w-4 h-4 mr-2" />
              Réviser mes questions favorites
            </Button>
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {tabs.map((tab) => {
          const count = bookmarks.filter((b) => b.content_type === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <span className="hidden sm:inline-flex">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
              {count > 0 && (
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full px-1.5 py-0.5">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Star className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 dark:text-gray-500">
            Aucun favori pour l&apos;instant.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Clique sur l&apos;étoile pour ajouter du contenu ici.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((bm) => (
            <BookmarkItem key={bm.id} bookmark={bm} onRemove={removeBookmark} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookmarkItem({
  bookmark,
  onRemove,
}: {
  bookmark: UserBookmark;
  onRemove: (id: string) => void;
}) {
  const { content_type, content_id } = bookmark;

  const getLink = () => {
    switch (content_type) {
      case "chapter":
        return `/dashboard/chapters/${content_id}`;
      case "question":
        return null;
      case "exercise":
        return `/dashboard/exercises/${content_id}`;
      case "glossary_term":
        return `/dashboard/glossaire?search=${encodeURIComponent(content_id)}`;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (content_type) {
      case "chapter":
        return "Fiche de cours";
      case "question":
        return "Question";
      case "exercise":
        return "Exercice";
      case "glossary_term":
        return "Terme";
      default:
        return "";
    }
  };

  const link = getLink();

  const inner = (
    <Card className="hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Star className="w-4 h-4 fill-coral-500 text-coral-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {content_id}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {getLabel()} — {new Date(bookmark.created_at).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {content_type === "question" && (
            <Badge variant="coral">Quiz</Badge>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(bookmark.id);
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Retirer des favoris"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );

  if (link) {
    return <Link href={link}>{inner}</Link>;
  }
  return inner;
}
