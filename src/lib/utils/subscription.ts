/**
 * Subscription access control utilities for ETUDIET.
 *
 * FREE tier limits:
 * - Diagnostic: full access
 * - Chapters: first 3 per module (orderIndex 0, 1, 2)
 * - Questions: 10 per quiz session
 * - Exercises: 1 per module (first only)
 * - Dashboard: full but locked content indicators
 *
 * PAID tier (monthly / yearly / lifetime): everything unlocked.
 */

const PAID_STATUSES = ["monthly", "yearly", "lifetime"];

/** Returns true if the user has a paid subscription. */
export function hasFullAccess(subscriptionStatus: string | undefined, role?: string): boolean {
  if (role === "admin") return true;
  return PAID_STATUSES.includes(subscriptionStatus ?? "free");
}

/**
 * Returns true if a chapter is available on the free tier.
 * Free = first 3 chapters per module (orderIndex 0, 1, 2).
 */
export function isChapterFree(orderIndex: number, role?: string): boolean {
  if (role === "admin") return true;
  return orderIndex < 3;
}

/**
 * Returns true if an exercise is available on the free tier.
 * Free = first exercise per module (index 0).
 */
export function isExerciseFree(exerciseIndex: number, role?: string): boolean {
  if (role === "admin") return true;
  return exerciseIndex === 0;
}

/**
 * Maximum number of quiz questions per session for the user's plan.
 * Free: 10, Paid: unlimited (Infinity).
 */
export function getQuestionLimit(subscriptionStatus: string | undefined, role?: string): number {
  if (role === "admin") return Infinity;
  return hasFullAccess(subscriptionStatus) ? Infinity : 10;
}
