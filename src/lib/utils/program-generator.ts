import { ProgramDuration } from "@/types/database";

export interface WeekPlan {
  weekNumber: number;
  moduleCode: string;
  title: string;
  chapterIds: string[];
  chapterPriorities: number[];
  quizTarget: number;
  exerciseRecommended: boolean;
  hoursTarget: number;
  isRevisionWeek: boolean;
}

export interface ProgramConfig {
  examDate: Date;
  startDate: Date;
  programDuration: ProgramDuration;
}

const DURATION_WEEKS: Record<ProgramDuration, number> = {
  "1month": 4,
  "3months": 12,
  "6months": 24,
  "12months": 48,
  "24months": 96,
};

// Priority distribution per program duration
// Which priority levels are included
const PRIORITY_SCOPE: Record<ProgramDuration, number[]> = {
  "1month": [1],
  "3months": [1, 2],
  "6months": [1, 2],
  "12months": [1, 2, 3],
  "24months": [1, 2, 3],
};

// Hours per week target by duration
const WEEKLY_HOURS: Record<ProgramDuration, number> = {
  "1month": 20,
  "3months": 12,
  "6months": 10,
  "12months": 8,
  "24months": 6,
};

// Module rotation order — weighted by coefficient
// E1, E2, E5 have coeff 4 so appear more often
const MODULE_ROTATION = ["E1", "E2", "E5", "E1", "E2", "E3", "E4", "E5", "E1", "E2"];

/**
 * Calculate weeks between two dates
 */
function weeksBetween(start: Date, end: Date): number {
  const diff = end.getTime() - start.getTime();
  return Math.max(1, Math.floor(diff / (7 * 24 * 60 * 60 * 1000)));
}

/**
 * Generate an adaptive study program
 */
export function generateProgram(config: ProgramConfig): WeekPlan[] {
  const { examDate, startDate, programDuration } = config;

  const availableWeeks = Math.min(
    weeksBetween(startDate, examDate),
    DURATION_WEEKS[programDuration]
  );

  const allowedPriorities = PRIORITY_SCOPE[programDuration];
  const weeklyHours = WEEKLY_HOURS[programDuration];
  const weeks: WeekPlan[] = [];

  // Reserve last 10-15% of weeks for revision
  const revisionStart = Math.floor(availableWeeks * 0.85);

  for (let week = 1; week <= availableWeeks; week++) {
    const progress = week / availableWeeks;
    const isRevisionWeek = week >= revisionStart;

    // Determine which priorities to study this week based on progress
    let weekPriorities: number[];
    if (isRevisionWeek) {
      // Revision: focus on P1 and P2
      weekPriorities = [1, 2];
    } else if (progress <= 0.4) {
      // First 40%: focus on vital chapters (P1)
      weekPriorities = allowedPriorities.filter((p) => p === 1);
    } else if (progress <= 0.7) {
      // Middle 30%: add important chapters (P1 + P2)
      weekPriorities = allowedPriorities.filter((p) => p <= 2);
    } else {
      // Last 30% before revision: everything allowed
      weekPriorities = [...allowedPriorities];
    }

    // Select module for this week using weighted rotation
    const moduleIndex = (week - 1) % MODULE_ROTATION.length;
    const moduleCode = MODULE_ROTATION[moduleIndex];

    // Quiz target: increases as exam approaches
    const quizTarget = isRevisionWeek
      ? 30
      : progress <= 0.5
      ? 10
      : 20;

    // Exercise recommended every 2-3 weeks, more frequent near exam
    const exerciseRecommended = isRevisionWeek || week % (progress > 0.7 ? 2 : 3) === 0;

    const weekTitle = isRevisionWeek
      ? `Révision — ${moduleCode}`
      : `${moduleCode} — Semaine ${week}`;

    weeks.push({
      weekNumber: week,
      moduleCode,
      title: weekTitle,
      chapterIds: [], // To be filled when matching with actual DB chapters
      chapterPriorities: weekPriorities,
      quizTarget,
      exerciseRecommended,
      hoursTarget: weeklyHours,
      isRevisionWeek,
    });
  }

  return weeks;
}

/**
 * Get the current week number for a user
 */
export function getCurrentWeek(createdAt: string): number {
  const start = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  return Math.max(1, Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1);
}

/**
 * Calculate days until exam
 */
export function getDaysUntilExam(examYear: number): number {
  const examDate = new Date(examYear, 5, 15); // June 15
  const now = new Date();
  return Math.max(0, Math.ceil((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

/**
 * Get the recommended weekly hours label
 */
export function getWeeklyHoursLabel(duration: ProgramDuration): string {
  return `${WEEKLY_HOURS[duration]}h/semaine`;
}
