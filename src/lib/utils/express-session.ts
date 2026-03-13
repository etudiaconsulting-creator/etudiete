import { createClient } from "@/lib/supabase/client";

export type ExpressDuration = 15 | 30 | 60;

const DEFAULT_CHAPTER = "e2-ch1";

/**
 * Determines the redirect URL for an express revision session.
 * - 15 min → quiz express (due questions or most-failed)
 * - 30 min → weakest chapter page with timer
 * - 60 min → weakest chapter page with timer
 */
export async function getExpressRedirectUrl(duration: ExpressDuration): Promise<string> {
  if (duration === 15) {
    return `/dashboard/quiz/express?duration=15`;
  }

  // For 30 and 60 min, find the weakest chapter
  const chapterId = await getWeakestChapterId();
  return `/dashboard/chapters/${chapterId}?express=${duration}`;
}

async function getWeakestChapterId(): Promise<string> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return DEFAULT_CHAPTER;

    const { data } = await supabase
      .from("user_progress")
      .select("chapter_id, completion_percentage")
      .eq("user_id", user.id)
      .order("completion_percentage", { ascending: true })
      .limit(1)
      .single() as { data: { chapter_id: string; completion_percentage: number } | null };

    return data?.chapter_id || DEFAULT_CHAPTER;
  } catch {
    return DEFAULT_CHAPTER;
  }
}
