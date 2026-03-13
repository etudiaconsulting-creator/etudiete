"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";

interface DayActivity {
  date: string;
  count: number;
  correctRate: number;
}

interface ActivityCalendarProps {
  weeks?: number;
  showTooltip?: boolean;
  showStats?: boolean;
  showMonthLabels?: boolean;
}

const DAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];
const MONTH_LABELS = [
  "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
  "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
];

function formatDateFr(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function getCellColor(count: number): string {
  if (count === 0) return "bg-gray-200 dark:bg-gray-700";
  if (count <= 5) return "bg-emerald-200 dark:bg-emerald-300/40";
  if (count <= 15) return "bg-emerald-400";
  if (count <= 30) return "bg-emerald-500";
  return "bg-emerald-600";
}

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function ActivityCalendar({
  weeks = 13,
  showTooltip = false,
  showStats = false,
  showMonthLabels = false,
}: ActivityCalendarProps) {
  const [activityMap, setActivityMap] = useState<Map<string, DayActivity>>(new Map());
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  }, []);

  const todayKey = toDateKey(today);

  // Build grid dates
  const { grid, monthLabels: months } = useMemo(() => {
    // Find the Monday of the week `weeks-1` weeks ago
    const endOfWeek = new Date(today);
    const dow = endOfWeek.getDay();
    const sundayOffset = dow === 0 ? 0 : 7 - dow;
    endOfWeek.setDate(endOfWeek.getDate() + sundayOffset); // end of current week (Sunday)

    const startDate = new Date(endOfWeek);
    startDate.setDate(startDate.getDate() - weeks * 7 + 1); // Monday of first week

    const cols: string[][] = [];
    const mLabels: { col: number; label: string }[] = [];
    let lastMonth = -1;

    for (let w = 0; w < weeks; w++) {
      const col: string[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + w * 7 + d);
        const key = toDateKey(date);
        col.push(key);

        // Track month labels
        if (d === 0) {
          const month = date.getMonth();
          if (month !== lastMonth) {
            mLabels.push({ col: w, label: MONTH_LABELS[month] });
            lastMonth = month;
          }
        }
      }
      cols.push(col);
    }

    return { grid: cols, monthLabels: mLabels };
  }, [today, weeks]);

  const startDateStr = grid[0]?.[0] || todayKey;

  useEffect(() => {
    let cancelled = false;

    async function fetchActivity() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user || cancelled) {
          setLoading(false);
          return;
        }

        const { data } = await supabase
          .from("user_question_history")
          .select("answered_at, answered_correctly")
          .eq("user_id", user.id)
          .gte("answered_at", startDateStr);

        if (cancelled) return;

        const map = new Map<string, { total: number; correct: number }>();
        if (data) {
          for (const row of data as unknown as { answered_at: string; answered_correctly: boolean }[]) {
            const key = row.answered_at.slice(0, 10);
            const entry = map.get(key) || { total: 0, correct: 0 };
            entry.total++;
            if (row.answered_correctly) entry.correct++;
            map.set(key, entry);
          }
        }

        const actMap = new Map<string, DayActivity>();
        map.forEach((val, key) => {
          actMap.set(key, {
            date: key,
            count: val.total,
            correctRate: val.total > 0 ? Math.round((val.correct / val.total) * 100) : 0,
          });
        });
        setActivityMap(actMap);
      } catch {
        // silent
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchActivity();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateStr]);

  // Stats
  const stats = useMemo(() => {
    let activeDays = 0;
    let totalQuestions = 0;
    let currentStreak = 0;
    let maxStreak = 0;
    let streak = 0;

    // Iterate from most recent to oldest
    const allDates: string[] = [];
    for (let i = grid.length - 1; i >= 0; i--) {
      for (let d = 6; d >= 0; d--) {
        const key = grid[i][d];
        if (key <= todayKey) allDates.push(key);
      }
    }

    for (let i = 0; i < allDates.length; i++) {
      const act = activityMap.get(allDates[i]);
      if (act && act.count > 0) {
        activeDays++;
        totalQuestions += act.count;
        streak++;
        if (streak > maxStreak) maxStreak = streak;
        if (i === 0 || currentStreak === i) currentStreak = streak;
      } else {
        streak = 0;
      }
    }

    return { activeDays, totalQuestions, currentStreak, maxStreak };
  }, [activityMap, grid, todayKey]);

  return (
    <div className="space-y-3">
      {/* Month labels */}
      {showMonthLabels && (
        <div className="flex" style={{ paddingLeft: "24px" }}>
          {(() => {
            const labels: React.ReactNode[] = [];
            let prevEnd = 0;
            for (const m of months) {
              const left = m.col;
              const gap = left - prevEnd;
              if (gap > 0) {
                labels.push(
                  <span key={`gap-${m.col}`} style={{ width: `${gap * 16}px` }} />
                );
              }
              labels.push(
                <span
                  key={m.col}
                  className="text-[10px] text-gray-400 dark:text-gray-500"
                  style={{ width: "16px" }}
                >
                  {m.label}
                </span>
              );
              prevEnd = left + 1;
            }
            return labels;
          })()}
        </div>
      )}

      {/* Grid */}
      <div className="flex gap-0">
        {/* Day labels */}
        {showMonthLabels && (
          <div className="flex flex-col gap-[2px] mr-1 flex-shrink-0">
            {DAY_LABELS.map((l, i) => (
              <span
                key={i}
                className="text-[10px] text-gray-400 dark:text-gray-500 leading-none flex items-center justify-end"
                style={{ width: "20px", height: "14px" }}
              >
                {i % 2 === 0 ? l : ""}
              </span>
            ))}
          </div>
        )}

        {/* Cells */}
        <div
          className="grid gap-[2px]"
          style={{
            gridTemplateColumns: `repeat(${weeks}, 14px)`,
            gridTemplateRows: "repeat(7, 14px)",
            gridAutoFlow: "column",
          }}
        >
          {grid.map((col) =>
            col.map((dateKey) => {
              const act = activityMap.get(dateKey);
              const count = act?.count || 0;
              const isToday = dateKey === todayKey;
              const isFuture = dateKey > todayKey;

              if (isFuture) {
                return (
                  <div
                    key={dateKey}
                    className="w-[14px] h-[14px] rounded-sm bg-transparent"
                  />
                );
              }

              const cell = (
                <div
                  key={dateKey}
                  className={`w-[14px] h-[14px] rounded-sm ${getCellColor(count)} ${
                    isToday ? "ring-1 ring-gray-400 dark:ring-gray-500" : ""
                  } ${loading ? "animate-pulse" : ""}`}
                />
              );

              if (showTooltip && !loading) {
                return (
                  <div key={dateKey} className="relative group">
                    <div
                      className={`w-[14px] h-[14px] rounded-sm ${getCellColor(count)} ${
                        isToday ? "ring-1 ring-gray-400 dark:ring-gray-500" : ""
                      }`}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
                      <div className="bg-gray-900 dark:bg-gray-700 text-white text-[11px] rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                        <p className="font-medium">{formatDateFr(dateKey)}</p>
                        <p className="text-gray-300 mt-0.5">
                          {count === 0
                            ? "Aucune activité"
                            : `${count} question${count > 1 ? "s" : ""} — ${act?.correctRate || 0}% correct`}
                        </p>
                      </div>
                      <div className="w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45 mx-auto -mt-1" />
                    </div>
                  </div>
                );
              }

              return cell;
            })
          )}
        </div>
      </div>

      {/* Legend */}
      {showMonthLabels && (
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500" style={{ paddingLeft: "24px" }}>
          <span>Moins</span>
          <div className="w-[10px] h-[10px] rounded-sm bg-gray-200 dark:bg-gray-700" />
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-200 dark:bg-emerald-300/40" />
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-400" />
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-500" />
          <div className="w-[10px] h-[10px] rounded-sm bg-emerald-600" />
          <span>Plus</span>
        </div>
      )}

      {/* Stats */}
      {showStats && !loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">{stats.activeDays}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">jours d&apos;activité</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">{stats.currentStreak} j</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">série en cours</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">{stats.maxStreak} j</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">record</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalQuestions}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">questions répondues</p>
          </div>
        </div>
      )}
    </div>
  );
}
