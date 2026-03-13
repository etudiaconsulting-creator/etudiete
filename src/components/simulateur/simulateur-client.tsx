"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const epreuves = [
  { key: "e1", label: "E1 — Anglais", coef: 1 },
  { key: "e2", label: "E2 — Biologie et physiopathologie", coef: 4 },
  { key: "e3", label: "E3 — Démarche de soin diététique", coef: 4 },
  { key: "e4", label: "E4 — Alimentation saine, durable et adaptée", coef: 4 },
  { key: "e5", label: "E5 — Santé publique", coef: 4 },
] as const;

type NoteKey = (typeof epreuves)[number]["key"];
type Notes = Record<NoteKey, string>;

const TOTAL_COEF = 17;

function getResultConfig(moyenne: number) {
  if (moyenne >= 12) return { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800", bar: "bg-emerald-500", message: "Admis avec mention !" };
  if (moyenne >= 10) return { color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800", bar: "bg-emerald-400", message: "Admis ! Tu as ton BTS !" };
  if (moyenne >= 8) return { color: "text-coral-500", bg: "bg-coral-50 dark:bg-coral-900/10 border-coral-200 dark:border-coral-800", bar: "bg-coral-500", message: "Rattrapage possible. Courage !" };
  return { color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800", bar: "bg-red-500", message: "Il faut encore travailler. Ne lâche rien." };
}

export default function SimulateurClient() {
  const [notes, setNotes] = useState<Notes>({ e1: "", e2: "", e3: "", e4: "", e5: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (data.user) setIsLoggedIn(true);
    });
  }, []);

  const moyenne = useMemo(() => {
    const values = epreuves.map((ep) => {
      const v = parseFloat(notes[ep.key]);
      if (isNaN(v) || notes[ep.key].trim() === "") return null;
      return v * ep.coef;
    });
    if (values.some((v) => v === null)) return null;
    return (values as number[]).reduce((a, b) => a + b, 0) / TOTAL_COEF;
  }, [notes]);

  const handleChange = (key: NoteKey, value: string) => {
    const num = parseFloat(value);
    if (value !== "" && (!isFinite(num) || num < 0 || num > 20)) return;
    setNotes((prev) => ({ ...prev, [key]: value }));
  };

  const result = moyenne !== null ? getResultConfig(moyenne) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
      <div className="text-center mb-10">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white">
          Simulateur de moyenne — BTS Diététique et Nutrition 2027
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm sm:text-base">
          Entre tes notes estimées pour savoir si tu obtiens ton BTS.
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          {epreuves.map((ep) => (
            <div key={ep.key} className="flex items-center justify-between gap-4">
              <label htmlFor={ep.key} className="text-sm text-gray-700 dark:text-gray-300 flex-1 min-w-0">
                {ep.label}{" "}
                <span className="text-gray-400 dark:text-gray-500">(coef {ep.coef})</span>
              </label>
              <input
                id={ep.key}
                type="number"
                min={0}
                max={20}
                step={0.5}
                value={notes[ep.key]}
                onChange={(e) => handleChange(ep.key, e.target.value)}
                placeholder="—"
                className="w-20 sm:w-24 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Result */}
      <Card className={`mt-6 text-center border ${result ? result.bg : "border-gray-200 dark:border-gray-700"}`}>
        <p className={`text-4xl font-medium ${result ? result.color : "text-gray-300 dark:text-gray-600"}`}>
          {moyenne !== null ? moyenne.toFixed(2) : "—"} <span className="text-lg font-normal text-gray-400">/20</span>
        </p>
        <p className={`text-sm mt-2 ${result ? result.color : "text-gray-400"}`}>
          {result ? result.message : "Remplis toutes les notes pour voir ton résultat"}
        </p>

        {/* Progress bar */}
        <div className="mt-6 relative">
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${result ? result.bar : "bg-gray-200 dark:bg-gray-700"}`}
              style={{ width: moyenne !== null ? `${(moyenne / 20) * 100}%` : "0%" }}
            />
          </div>
          {/* Marker at 10/20 (50%) */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-1" style={{ left: "50%" }}>
            <div className="w-0.5 h-5 bg-gray-400 dark:bg-gray-500" />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>0</span>
            <span className="absolute left-1/2 -translate-x-1/2 text-gray-500 dark:text-gray-400 font-medium" style={{ left: "50%" }}>
              10
            </span>
            <span>20</span>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div className="mt-8 text-center">
        {isLoggedIn ? (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Continue ta préparation</p>
            <Link href="/dashboard">
              <Button>
                Aller au dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Tu veux améliorer tes notes ? Rejoins le programme ETUDIET gratuitement.
            </p>
            <Link href="/auth/register">
              <Button>
                Commencer <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
