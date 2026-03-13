"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useBookmarkCount() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCount() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const { count: total } = await supabase
          .from("user_bookmarks")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        setCount(total ?? 0);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    }

    fetchCount();
    const interval = setInterval(fetchCount, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { count, loading };
}
