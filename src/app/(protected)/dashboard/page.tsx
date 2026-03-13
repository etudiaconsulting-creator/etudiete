"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/layout/auth-provider";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Flame,
  Bell,
  CheckCircle2,
  Circle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import ExpressRevision from "@/components/dashboard/express-revision";
import { ActivityCalendar } from "@/components/dashboard/activity-calendar";

function getDaysUntilExam(examYear: number): number {
  const examDate = new Date(examYear, 5, 15);
  const now = new Date();
  const diff = examDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getWeekNumber(createdAt?: string): number {
  if (!createdAt) return 1;
  const start = new Date(createdAt);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.max(1, Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1);
}

const durationLabels: Record<string, string> = {
  "1month": "1 mois",
  "3months": "3 mois",
  "6months": "6 mois",
  "12months": "12 mois",
  "24months": "24 mois",
};

const weeklyTasks = [
  { id: "t1", title: "Lire la fiche : Biochimie structurale des glucides", subtitle: "E2 — Chapitre 1", status: "done", percent: 100 },
  { id: "t2", title: "Quiz : Glucides et métabolisme", subtitle: "E2 — Chapitre 1", status: "done", percent: 100 },
  { id: "t3", title: "Lire la fiche : Lipides", subtitle: "E2 — Chapitre 2", status: "in_progress", percent: 45 },
  { id: "t4", title: "Quiz : Structure et rôles des lipides", subtitle: "E2 — Chapitre 2", status: "not_started", percent: 0 },
  { id: "t5", title: "Exercice : Sujet type diabète", subtitle: "E2 — Format examen", status: "not_started", percent: 0 },
  { id: "t6", title: "Réviser les rappels du jour", subtitle: "Répétition espacée", status: "not_started", percent: 0 },
];

const moduleProgress = [
  { code: "E1", title: "Anglais", percent: 0, coeff: 1 },
  { code: "E2", title: "Biologie & physiopathologie", percent: 0, coeff: 4 },
  { code: "E3", title: "Démarche de soin diététique", percent: 0, coeff: 4 },
  { code: "E4", title: "Alimentation saine & adaptée", percent: 0, coeff: 4 },
  { code: "E5", title: "Santé publique & nutrition", percent: 0, coeff: 4 },
];

function ProgressBar({ percent, color }: { percent: number; color: string }) {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all ${color}`}
        style={{ width: `${Math.max(percent, 2)}%` }}
      />
    </div>
  );
}

function getScoreColor(percent: number): string {
  if (percent < 40) return "bg-red-500";
  if (percent < 70) return "bg-amber-500";
  return "bg-emerald-500";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "done") return <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
  if (status === "in_progress") return <Circle className="w-5 h-5 text-amber-400 flex-shrink-0" />;
  return <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0" />;
}

export default function DashboardPage() {
  const { profile, loading } = useAuth();

  const firstName = profile?.full_name?.split(" ")[0] || "";
  const daysLeft = getDaysUntilExam(profile?.exam_year || 2027);
  const weekNum = getWeekNumber(profile?.created_at);
  const duration = durationLabels[profile?.program_duration || "12months"] || "12 mois";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ===== GREEN HEADER ===== */}
      <div className="bg-emerald-600 rounded-xl p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium">
              Bonjour{firstName ? `, ${firstName}` : ""}
            </h1>
            <p className="text-emerald-100 mt-1 text-sm">
              Semaine {weekNum} — Biochimie structurale : glucides et métabolisme
            </p>
            <p className="text-emerald-200 text-xs mt-0.5">
              Programme {duration} — session {profile?.exam_year || 2027}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-4xl sm:text-5xl font-medium">{daysLeft}</p>
            <p className="text-emerald-200 text-sm">jours avant l&apos;examen</p>
          </div>
        </div>
      </div>

      {/* ===== EXPRESS REVISION ===== */}
      <ExpressRevision />

      {/* ===== COMPACT ACTIVITY CALENDAR ===== */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Activité récente</h3>
          <Link
            href="/dashboard/progress"
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Voir tout
          </Link>
        </div>
        <ActivityCalendar weeks={4} />
      </Card>

      {/* ===== METRIC CARDS ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progression globale */}
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-medium text-gray-900 dark:text-white">0%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Progression globale</p>
            </div>
          </div>
          <ProgressBar percent={0} color="bg-emerald-500" />
        </Card>

        {/* Quiz cette semaine */}
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
              <Brain className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-medium text-gray-900 dark:text-white">0/0</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Quiz cette semaine</p>
            </div>
          </div>
          <ProgressBar percent={0} color="bg-gray-300 dark:bg-gray-600" />
        </Card>

        {/* Serie en cours */}
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-coral-50 dark:bg-coral-900/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-coral-600 dark:text-coral-400" />
            </div>
            <div>
              <p className="text-2xl font-medium text-gray-900 dark:text-white">0 j</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Série en cours</p>
            </div>
          </div>
          <p className="text-xs text-gray-400">Record : 0 jours</p>
        </Card>

        {/* Rappels du jour */}
        <Link href="/dashboard/quiz-du-jour">
          <Card className="h-full hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-coral-50 dark:bg-coral-900/20 flex items-center justify-center">
                <Bell className="w-4 h-4 text-coral-600 dark:text-coral-400" />
              </div>
              <div>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">5</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Rappels du jour</p>
              </div>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              Réviser maintenant <ArrowRight className="w-3 h-3" />
            </p>
          </Card>
        </Link>
      </div>

      {/* ===== TWO COLUMNS ===== */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Weekly objectives */}
        <div className="lg:col-span-3">
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Objectif de la semaine
              </h2>
              <Badge variant="coral">Semaine {weekNum}</Badge>
            </div>
            <div className="space-y-3">
              {weeklyTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <StatusIcon status={task.status} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      task.status === "done"
                        ? "text-gray-400 dark:text-gray-500 line-through"
                        : "text-gray-900 dark:text-white"
                    }`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{task.subtitle}</p>
                  </div>
                  <span className={`text-xs font-medium flex-shrink-0 ${
                    task.percent === 100
                      ? "text-emerald-500"
                      : task.percent > 0
                      ? "text-amber-500"
                      : "text-gray-400"
                  }`}>
                    {task.percent}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Module progress */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-5">
              Tes épreuves
            </h2>
            <div className="space-y-4">
              {moduleProgress.map((mod) => (
                <Link key={mod.code} href={`/dashboard/modules/${mod.code}`}>
                  <div className="group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">
                          {mod.code}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {mod.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{mod.percent}%</span>
                    </div>
                    <ProgressBar percent={mod.percent} color={getScoreColor(mod.percent)} />
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ===== WEAK POINT ALERT ===== */}
      <div className="bg-coral-50 dark:bg-coral-900/10 border border-coral-200 dark:border-coral-800 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-coral-100 dark:bg-coral-900/30 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-coral-600 dark:text-coral-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-coral-900 dark:text-coral-300">
              Point faible détecté
            </h3>
            <p className="text-sm text-coral-700 dark:text-coral-400 mt-1">
              Biochimie métabolique — voies des acides gras. Tu as raté 7/10 questions.
              Revois la fiche avant vendredi.
            </p>
            <Link href="/dashboard/chapters/e2-ch2" className="inline-block mt-3">
              <Button variant="coral" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Revoir la fiche
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ===== BIG CTA ===== */}
      <Link href="/dashboard/chapters/e2-ch1" className="block">
        <div className="bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-xl p-4 sm:p-5 text-white text-center flex items-center justify-center gap-3 cursor-pointer">
          <span className="text-base font-medium">Continuer ma session</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </Link>
    </div>
  );
}
