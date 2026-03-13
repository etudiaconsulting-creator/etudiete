"use client";

import { Star } from "lucide-react";
import { useBookmark } from "@/lib/hooks/use-bookmark";
import type { BookmarkContentType } from "@/types/database";

interface BookmarkButtonProps {
  contentType: BookmarkContentType;
  contentId: string;
  size?: "sm" | "md";
}

export function BookmarkButton({ contentType, contentId, size = "md" }: BookmarkButtonProps) {
  const { isBookmarked, loading, toggle } = useBookmark(contentType, contentId);

  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggle();
      }}
      disabled={loading}
      className={`transition-all duration-200 hover:scale-110 active:scale-125 ${
        loading ? "opacity-40" : "opacity-100"
      }`}
      title={isBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}
      aria-label={isBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Star
        className={`${iconSize} transition-colors ${
          isBookmarked
            ? "fill-coral-500 text-coral-500"
            : "fill-transparent text-gray-400 hover:text-coral-400"
        }`}
      />
    </button>
  );
}
