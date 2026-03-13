"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { BookmarkContentType } from "@/types/database";

export function useBookmark(contentType: BookmarkContentType, contentId: string) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user || cancelled) {
          setLoading(false);
          return;
        }

        const { data } = await supabase
          .from("user_bookmarks")
          .select("id")
          .eq("user_id", user.id)
          .eq("content_type", contentType)
          .eq("content_id", contentId)
          .maybeSingle();

        if (!cancelled) {
          setIsBookmarked(!!data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, contentId]);

  const toggle = useCallback(async () => {
    const prev = isBookmarked;
    setIsBookmarked(!prev);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      if (prev) {
        await supabase
          .from("user_bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("content_type", contentType)
          .eq("content_id", contentId);
      } else {
        await supabase.from("user_bookmarks").insert({
          user_id: user.id,
          content_type: contentType,
          content_id: contentId,
        } as never);
      }
    } catch {
      setIsBookmarked(prev);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBookmarked, contentType, contentId]);

  return { isBookmarked, loading, toggle };
}
