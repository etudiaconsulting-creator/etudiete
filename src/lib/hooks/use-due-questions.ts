"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function useDueQuestions() {
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

        const now = new Date().toISOString();
        const { count: dueCount } = await supabase
          .from("user_question_history")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .lte("next_review_at", now);

        setCount(dueCount ?? 0);
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    }

    fetchCount();
    // Refresh every 60 seconds
    const interval = setInterval(fetchCount, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { count, loading };
}
