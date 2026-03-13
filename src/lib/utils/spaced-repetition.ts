/**
 * SM-2 Modified Spaced Repetition Algorithm
 * Client-side calculation — only results are sent to Supabase
 */

export interface ReviewResult {
  nextInterval: number;
  newEaseFactor: number;
  nextReviewDate: Date;
}

/**
 * Calculate the next review using modified SM-2 algorithm
 * @param answeredCorrectly - whether the user answered correctly
 * @param currentInterval - current interval in days (0 = first time)
 * @param easeFactor - current ease factor (starts at 2.5, minimum 1.3)
 */
export function calculateNextReview(
  answeredCorrectly: boolean,
  currentInterval: number,
  easeFactor: number
): ReviewResult {
  let nextInterval: number;
  let newEaseFactor: number;

  if (answeredCorrectly) {
    if (currentInterval === 0) {
      nextInterval = 1;
    } else if (currentInterval === 1) {
      nextInterval = 3;
    } else {
      nextInterval = Math.round(currentInterval * easeFactor);
    }
    newEaseFactor = Math.max(1.3, easeFactor + 0.1);
  } else {
    nextInterval = 1; // reset to 1 day
    newEaseFactor = Math.max(1.3, easeFactor - 0.2);
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);
  nextReviewDate.setHours(0, 0, 0, 0);

  return {
    nextInterval,
    newEaseFactor: Math.round(newEaseFactor * 100) / 100,
    nextReviewDate,
  };
}

/**
 * Convert quality of response to SM-2 quality score (0-5)
 */
export function answerToQuality(correct: boolean, difficulty: number): number {
  if (!correct) return 1;
  return 6 - difficulty; // difficulty 1 → quality 5, difficulty 3 → quality 3
}

/**
 * Check if a question is due for review
 */
export function isDueForReview(nextReviewAt: string | Date): boolean {
  const reviewDate = new Date(nextReviewAt);
  const now = new Date();
  return reviewDate <= now;
}
