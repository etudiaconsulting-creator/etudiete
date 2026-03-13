"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Exercise {
  id: string;
  moduleCode: string;
  title: string;
  type: "full_exam" | "mini_case" | "oral_prep";
  duration: number;
  priority: 1 | 2 | 3;
  done: boolean;
  score: number | null;
}

const exerciseTypeLabels: Record<string, string> = {
  full_exam: "Sujet type",
  mini_case: "Mini cas",
  oral_prep: "Prépa orale",
};

const priorityConfig: Record<number, { label: string; variant: "coral" | "emerald" | "gray" }> = {
  1: { label: "P1", variant: "coral" },
  2: { label: "P2", variant: "emerald" },
  3: { label: "P3", variant: "gray" },
};

const sampleExercises: Exercise[] = [
  {
    id: "ex1",
    moduleCode: "E2",
    title: "Sujet type — Diabète de type 2 et métabolisme glucidique",
    type: "full_exam",
    duration: 240,
    priority: 1,
    done: false,
    score: null,
  },
  {
    id: "ex2",
    moduleCode: "E4",
    title: "Mini cas — Plan alimentaire patient surpoids",
    type: "mini_case",
    duration: 60,
    priority: 1,
    done: true,
    score: 14,
  },
  {
    id: "ex3",
    moduleCode: "E3",
    title: "Prépa orale — Consultation diététique",
    type: "oral_prep",
    duration: 30,
    priority: 2,
    done: false,
    score: null,
  },
  {
    id: "ex4",
    moduleCode: "E5",
    title: "Sujet type — Programme de santé publique",
    type: "full_exam",
    duration: 210,
    priority: 1,
    done: true,
    score: 16,
  },
  {
    id: "ex5",
    moduleCode: "E1",
    title: "Mini cas — Compréhension texte médical",
    type: "mini_case",
    duration: 45,
    priority: 2,
    done: false,
    score: null,
  },
  {
    id: "ex6",
    moduleCode: "E2",
    title: "Sujet type — Biochimie métabolique",
    type: "full_exam",
    duration: 240,
    priority: 1,
    done: false,
    score: null,
  },
  {
    id: "ex7",
    moduleCode: "E4",
    title: "Mini cas — Menus adaptés au diabète",
    type: "mini_case",
    duration: 60,
    priority: 2,
    done: true,
    score: 13,
  },
  {
    id: "ex8",
    moduleCode: "E3",
    title: "Prépa orale — Bilan nutritionnel complet",
    type: "oral_prep",
    duration: 45,
    priority: 1,
    done: false,
    score: null,
  },
];

type ExerciseType = "full_exam" | "mini_case" | "oral_prep";

export default function ExercisesPage() {
  const [filterModule, setFilterModule] = useState("all");
  const [filterType, setFilterType] = useState<"all" | ExerciseType>("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const filteredAndSorted = useMemo(() => {
    let filtered = sampleExercises.filter((ex) => {
      if (filterModule !== "all" && ex.moduleCode !== filterModule) return false;
      if (filterType !== "all" && ex.type !== filterType) return false;
      if (filterPriority !== "all" && ex.priority !== parseInt(filterPriority)) return false;
      return true;
    });

    filtered.sort((a, b) => {
      if (a.done === b.done) {
        if (a.done) {
          return (a.score ?? 0) - (b.score ?? 0);
        }
        return 0;
      }
      return a.done ? 1 : -1;
    });

    return filtered;
  }, [filterModule, filterType, filterPriority]);

  const modules = ["E1", "E2", "E3", "E4", "E5"];
  const types: ExerciseType[] = ["full_exam", "mini_case", "oral_prep"];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
      >
        <ArrowLeft className="w-4 h-4" />
        Tableau de bord
      </Link>

      <div>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Exercices</h1>
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={filterModule}
          onChange={(e) => setFilterModule(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="all">Tous les modules</option>
          {modules.map((mod) => (
            <option key={mod} value={mod}>
              {mod}
            </option>
          ))}
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as "all" | ExerciseType)}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="all">Tous les types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {exerciseTypeLabels[type]}
            </option>
          ))}
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="all">Toutes les priorités</option>
          <option value="1">P1</option>
          <option value="2">P2</option>
          <option value="3">P3</option>
        </select>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filteredAndSorted.length} exercice{filteredAndSorted.length !== 1 ? "s" : ""}
      </p>

      <div className="space-y-3">
        {filteredAndSorted.map((exercise) => (
          <Link key={exercise.id} href={`/dashboard/exercises/${exercise.id}`}>
            <Card hover>
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <Badge>{exercise.moduleCode}</Badge>
                  <Badge>{exerciseTypeLabels[exercise.type]}</Badge>
                  <Badge variant={priorityConfig[exercise.priority].variant}>
                    {priorityConfig[exercise.priority].label}
                  </Badge>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">{exercise.title}</h3>
                  <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1" />
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {exercise.duration} min
                  </span>
                  {exercise.done && exercise.score !== null && (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      {exercise.score}/20
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
