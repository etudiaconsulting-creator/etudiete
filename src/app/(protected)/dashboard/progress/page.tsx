"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/layout/auth-provider";
import { ActivityCalendar } from "@/components/dashboard/activity-calendar";

const moduleProgress = [
  { code: "E1", title: "Anglais", percent: 0, coeff: 1, totalChapters: 4, completedChapters: 0 },
  { code: "E2", title: "Biologie & physiopathologie", percent: 0, coeff: 4, totalChapters: 38, completedChapters: 0 },
  { code: "E3", title: "Démarche de soin diététique", percent: 0, coeff: 4, totalChapters: 5, completedChapters: 0 },
  { code: "E4", title: "Alimentation saine & adaptée", percent: 0, coeff: 4, totalChapters: 5, completedChapters: 0 },
  { code: "E5", title: "Santé publique & nutrition", percent: 0, coeff: 4, totalChapters: 4, completedChapters: 0 },
];

// Heat map data: all chapters flattened
const allChapters = [
  { id: "e1-ch1", code: "E1", title: "Glucides", mastery: 0 },
  { id: "e1-ch2", code: "E1", title: "Lipides", mastery: 0 },
  { id: "e1-ch3", code: "E1", title: "Protéines", mastery: 0 },
  { id: "e1-ch4", code: "E1", title: "Enzymes", mastery: 0 },
  { id: "e1-ch5", code: "E1", title: "Krebs", mastery: 0 },
  { id: "e1-ch6", code: "E1", title: "Vitamines", mastery: 0 },
  { id: "e1-ch7", code: "E1", title: "Digestion", mastery: 0 },
  { id: "e1-ch8", code: "E1", title: "Diabète", mastery: 0 },
  { id: "e1-ch9", code: "E1", title: "Rénal", mastery: 0 },
  { id: "e1-ch10", code: "E1", title: "Acido-basique", mastery: 0 },
  { id: "e2-ch1", code: "E2", title: "Composition aliments", mastery: 0 },
  { id: "e2-ch2", code: "E2", title: "Groupes aliments", mastery: 0 },
  { id: "e2-ch3", code: "E2", title: "Qualité sécurité", mastery: 0 },
  { id: "e2-ch4", code: "E2", title: "Technologie", mastery: 0 },
  { id: "e2-ch5", code: "E2", title: "Besoins nutritionnels", mastery: 0 },
  { id: "e2-ch6", code: "E2", title: "Populations spécifiques", mastery: 0 },
  { id: "e3-ch1", code: "E3", title: "Bilan nutritionnel", mastery: 0 },
  { id: "e3-ch2", code: "E3", title: "Consultation diététique", mastery: 0 },
  { id: "e3-ch3", code: "E3", title: "Éducation thérapeutique", mastery: 0 },
  { id: "e3-ch4", code: "E3", title: "Suivi diététique", mastery: 0 },
  { id: "e4-ch1", code: "E4", title: "Composition des aliments", mastery: 0 },
  { id: "e4-ch2", code: "E4", title: "Plans alimentaires", mastery: 0 },
  { id: "e4-ch3", code: "E4", title: "Qualité alimentaire", mastery: 0 },
  { id: "e4-ch4", code: "E4", title: "Besoins nutritionnels", mastery: 0 },
  { id: "e5-ch1", code: "E5", title: "Prévention santé", mastery: 0 },
  { id: "e5-ch2", code: "E5", title: "Éducation nutritionnelle", mastery: 0 },
  { id: "e5-ch3", code: "E5", title: "Restauration collective", mastery: 0 },
  { id: "e5-ch4", code: "E5", title: "Politique de santé", mastery: 0 },
];

// Weekly activity data (last 8 weeks)
const weeklyActivity = [
  { week: "S1", questions: 0 },
  { week: "S2", questions: 0 },
  { week: "S3", questions: 0 },
  { week: "S4", questions: 0 },
  { week: "S5", questions: 0 },
  { week: "S6", questions: 0 },
  { week: "S7", questions: 0 },
  { week: "S8", questions: 0 },
];

function getScoreColor(percent: number): string {
  if (percent === 0) return "bg-gray-200 dark:bg-gray-700";
  if (percent < 40) return "bg-red-500";
  if (percent < 70) return "bg-amber-500";
  return "bg-emerald-500";
}

function getHeatmapColor(mastery: number): string {
  if (mastery === 0) return "bg-gray-200 dark:bg-gray-700";
  if (mastery < 40) return "bg-red-400";
  if (mastery < 70) return "bg-amber-400";
  return "bg-emerald-400";
}

export default function ProgressPage() {
  const { profile } = useAuth();

  const totalChapters = moduleProgress.reduce((acc, m) => acc + m.totalChapters, 0);
  const completedChapters = moduleProgress.reduce((acc, m) => acc + m.completedChapters, 0);
  const overallPercent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
  const maxWeeklyQuestions = Math.max(...weeklyActivity.map((w) => w.questions), 1);

  const examDate = new Date((profile?.exam_year || 2027), 5, 15);
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  // Estimated remaining hours
  const totalEstimatedHours = 280; // total for the BTS program
  const remainingHours = Math.round(totalEstimatedHours * (1 - overallPercent / 100));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
        Suivi de progression
      </h1>

      {/* ===== ACTIVITY CALENDAR ===== */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Calendrier d&apos;activité
        </h2>
        <div className="hidden lg:block">
          <ActivityCalendar weeks={13} showTooltip showStats showMonthLabels />
        </div>
        <div className="lg:hidden">
          <ActivityCalendar weeks={8} showTooltip showStats showMonthLabels />
        </div>
      </Card>

      {/* ===== GLOBAL OVERVIEW ===== */}
      <Card className="text-center py-8">
        <p className="text-6xl font-medium text-gray-900 dark:text-white mb-2">
          {overallPercent}%
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          Progression globale — {completedChapters}/{totalChapters} chapitres
        </p>
        <div className="w-full max-w-md mx-auto bg-gray-100 dark:bg-gray-800 rounded-full h-3">
          <div
            className="bg-emerald-500 h-3 rounded-full transition-all"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </Card>

      {/* ===== MODULE PROGRESS ===== */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-5">
          Progression par module
        </h2>
        <div className="space-y-5">
          {moduleProgress.map((mod) => (
            <Link key={mod.code} href={`/dashboard/modules/${mod.code}`}>
              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge>{mod.code}</Badge>
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {mod.title}
                    </span>
                    <span className="text-xs text-gray-400">coeff. {mod.coeff}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {mod.completedChapters}/{mod.totalChapters}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-10 text-right">
                      {mod.percent}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all ${getScoreColor(mod.percent)}`}
                    style={{ width: `${Math.max(mod.percent, 1)}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* ===== HEAT MAP ===== */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-5">
          Carte de maîtrise
        </h2>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {allChapters.map((ch) => (
            <div
              key={ch.id}
              title={`${ch.code} — ${ch.title} (${ch.mastery}%)`}
              className={`aspect-square rounded-lg ${getHeatmapColor(ch.mastery)} cursor-pointer hover:ring-2 hover:ring-emerald-400 hover:ring-offset-1 dark:hover:ring-offset-gray-900 transition-all`}
            />
          ))}
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-700" />
            <span>Non commencé</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-red-400" />
            <span>&lt; 40%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-amber-400" />
            <span>40-70%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emerald-400" />
            <span>&gt; 70%</span>
          </div>
        </div>
      </Card>

      {/* ===== BAR CHART — WEEKLY ACTIVITY ===== */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-5">
          Activité hebdomadaire
        </h2>
        <div className="flex items-end justify-between gap-2 h-40 px-2">
          {weeklyActivity.map((w) => {
            const heightPercent = maxWeeklyQuestions > 0 ? (w.questions / maxWeeklyQuestions) * 100 : 0;
            return (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400 mb-1">
                  {w.questions > 0 ? w.questions : ""}
                </span>
                <div className="w-full flex items-end justify-center" style={{ height: "120px" }}>
                  <div
                    className={`w-full max-w-[40px] rounded-t-lg transition-all ${
                      w.questions > 0 ? "bg-emerald-500" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                    style={{ height: `${Math.max(heightPercent, 8)}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{w.week}</span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 text-center mt-3">Questions répondues par semaine</p>
      </Card>

      {/* ===== STATS ROW ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center py-4">
          <p className="text-3xl font-medium text-gray-900 dark:text-white">0</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Questions répondues</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-medium text-gray-900 dark:text-white">--%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Taux de réussite</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-medium text-gray-900 dark:text-white">{remainingHours}h</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Temps restant estimé</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-medium text-gray-900 dark:text-white">{daysLeft}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Jours avant l'examen</p>
        </Card>
      </div>
    </div>
  );
}
