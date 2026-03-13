"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Clock, BookOpen } from "lucide-react";
import { getExpressRedirectUrl, ExpressDuration } from "@/lib/utils/express-session";

const options = [
  {
    duration: 15 as ExpressDuration,
    label: "15 min",
    description: "Quiz rapide sur tes erreurs récentes",
    icon: Zap,
    prominent: false,
  },
  {
    duration: 30 as ExpressDuration,
    label: "30 min",
    description: "Fiche de cours + quiz ciblé",
    icon: Clock,
    prominent: true,
  },
  {
    duration: 60 as ExpressDuration,
    label: "1 heure",
    description: "Fiche + quiz + exercice format examen",
    icon: BookOpen,
    prominent: false,
  },
];

export default function ExpressRevision() {
  const router = useRouter();
  const [loadingDuration, setLoadingDuration] = useState<ExpressDuration | null>(null);

  const handleClick = async (duration: ExpressDuration) => {
    setLoadingDuration(duration);
    try {
      const url = await getExpressRedirectUrl(duration);
      router.push(url);
    } catch {
      setLoadingDuration(null);
    }
  };

  return (
    <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-5 sm:p-6">
      <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200 mb-4">
        Révision express — combien de temps tu as ?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isLoading = loadingDuration === opt.duration;
          const base = opt.prominent
            ? "bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-500"
            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-500";

          return (
            <button
              key={opt.duration}
              onClick={() => handleClick(opt.duration)}
              disabled={loadingDuration !== null}
              className={`${base} rounded-xl p-4 text-left transition-all duration-200 disabled:opacity-60`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${opt.prominent ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`} />
                <span className="text-sm font-medium">
                  {isLoading ? "Chargement..." : opt.label}
                </span>
              </div>
              <p className={`text-xs ${opt.prominent ? "text-emerald-100" : "text-gray-500 dark:text-gray-400"}`}>
                {opt.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
