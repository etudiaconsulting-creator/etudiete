"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/layout/auth-provider";

// ── Exam schedule ──
const epreuves = [
  { code: "E1", title: "Anglais", type: "Écrit", duree: "2h", periode: "Mai" },
  { code: "E2", title: "Biologie & physiopathologie", type: "Écrit", duree: "4h", periode: "Mai" },
  { code: "E3", title: "Démarche de soin diététique", type: "Écrit + Oral", duree: "3h30 + 30 min", periode: "Mai-Juin" },
  { code: "E4", title: "Alimentation saine & adaptée", type: "Écrit", duree: "4h", periode: "Mai" },
  { code: "E5", title: "Santé publique & nutrition", type: "Écrit", duree: "3h", periode: "Mai" },
];

// ── Checklist ──
interface ChecklistCategory {
  title: string;
  items: string[];
}

const checklistData: ChecklistCategory[] = [
  {
    title: "Documents & administratif",
    items: [
      "Convocation imprimée",
      "Pièce d'identité valide",
      "Carte d'étudiant",
      "Relevé de notes (si redoublant)",
    ],
  },
  {
    title: "Matériel",
    items: [
      "Stylos (bleu, noir) + rechanges",
      "Calculatrice autorisée",
      "Règle, gomme, effaceur",
      "Bouteille d'eau + encas",
      "Montre (sans connectivité)",
    ],
  },
  {
    title: "Révisions finales",
    items: [
      "Revoir les fiches de synthèse",
      "Refaire les annales des 2 dernières années",
      "Réviser les formules clés (métabolisme, rations)",
      "Relire les cas cliniques corrigés",
    ],
  },
  {
    title: "Bien-être & logistique",
    items: [
      "Repérer le trajet vers le centre d'examen",
      "Préparer ses affaires la veille",
      "Dormir 8h la nuit précédente",
      "Petit-déjeuner équilibré le jour J",
    ],
  },
];

// ── Conseils par épreuve ──
const conseilsParEpreuve = [
  {
    code: "E1",
    title: "Anglais",
    conseils: [
      "Lire l'intégralité du texte avant de répondre aux questions.",
      "Structurer la rédaction : introduction, développement, conclusion.",
      "Utiliser du vocabulaire spécifique à la nutrition et la diététique.",
    ],
  },
  {
    code: "E2",
    title: "Biologie & physiopathologie",
    conseils: [
      "Bien lire les documents fournis et les exploiter dans tes réponses.",
      "Faire des schémas annotés pour les mécanismes physiologiques.",
      "Gérer ton temps : 4h passent vite, allouer ~45 min par partie.",
      "Relier systématiquement physiopathologie et conséquences nutritionnelles.",
    ],
  },
  {
    code: "E3",
    title: "Démarche de soin diététique",
    conseils: [
      "Structurer le bilan diététique : recueil → analyse → objectifs → plan.",
      "Justifier chaque recommandation par des données du patient.",
      "Pour l'oral : préparer une présentation claire et synthétique.",
      "S'entraîner à la prise de parole avec un chronomètre.",
    ],
  },
  {
    code: "E4",
    title: "Alimentation saine & adaptée",
    conseils: [
      "Connaître les groupes d'aliments et leurs apports nutritionnels.",
      "Maîtriser les calculs de rations et d'équivalences.",
      "Adapter les menus aux pathologies et situations spécifiques.",
      "Vérifier la cohérence des apports avec les ANC/RNP.",
    ],
  },
  {
    code: "E5",
    title: "Santé publique & nutrition",
    conseils: [
      "Connaître le PNNS et ses objectifs actuels.",
      "Maîtriser les concepts d'éducation nutritionnelle et de prévention.",
      "Structurer les réponses avec des exemples concrets.",
    ],
  },
];

const STORAGE_KEY = "etudiet-checklist";

function loadChecked(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    // ignore
  }
  return new Set();
}

export default function JourJClient() {
  const { profile } = useAuth();
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChecked(loadChecked());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checked)));
    }
  }, [checked, mounted]);

  const toggleItem = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Countdown
  const examYear = profile?.exam_year || 2027;
  const examDate = new Date(examYear, 4, 15); // mid-May
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const examPassed = now > examDate;

  // Checklist progress
  const totalItems = checklistData.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = checked.size;
  const progressPercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
        Jour J — Préparation aux épreuves
      </h1>

      {/* ===== S1 — COUNTDOWN ===== */}
      <Card className="text-center py-10">
        {examPassed ? (
          <>
            <p className="text-2xl font-medium text-gray-900 dark:text-white">
              Les épreuves sont terminées.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Bravo et félicitations !</p>
          </>
        ) : (
          <>
            <p className="text-6xl font-medium text-gray-900 dark:text-white mb-2">
              {daysLeft}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              jour{daysLeft > 1 ? "s" : ""} avant les épreuves
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Date estimée : mai {examYear}
            </p>
          </>
        )}
      </Card>

      {/* ===== S2 — EXAM SCHEDULE ===== */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Calendrier des épreuves
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2.5 px-3 text-gray-500 dark:text-gray-400 font-medium">Épreuve</th>
                <th className="text-left py-2.5 px-3 text-gray-500 dark:text-gray-400 font-medium">Type</th>
                <th className="text-left py-2.5 px-3 text-gray-500 dark:text-gray-400 font-medium">Durée</th>
                <th className="text-left py-2.5 px-3 text-gray-500 dark:text-gray-400 font-medium">Période</th>
              </tr>
            </thead>
            <tbody>
              {epreuves.map((ep) => (
                <tr key={ep.code} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <Badge>{ep.code}</Badge>
                      <span className="text-gray-700 dark:text-gray-300">{ep.title}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{ep.type}</td>
                  <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{ep.duree}</td>
                  <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{ep.periode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          Les dates exactes sont communiquées par ton académie.
        </p>
      </Card>

      {/* ===== S3 — CHECKLIST ===== */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Check-list
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {checkedCount}/{totalItems} éléments
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-5">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="space-y-4">
          {checklistData.map((cat, catIdx) => (
            <div key={catIdx}>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {cat.title}
              </p>
              <div className="space-y-1.5">
                {cat.items.map((item, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`;
                  const isChecked = checked.has(id);
                  return (
                    <button
                      key={id}
                      onClick={() => toggleItem(id)}
                      className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isChecked
                            ? "bg-emerald-500 border-emerald-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span
                        className={`text-sm transition-colors ${
                          isChecked
                            ? "text-gray-400 dark:text-gray-500 line-through"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ===== S4 — ADVICE PER EXAM ===== */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Conseils par épreuve
        </h2>
        <div className="space-y-1">
          {conseilsParEpreuve.map((ep, idx) => {
            const isOpen = openSection === idx;
            return (
              <div key={ep.code} className="border border-gray-100 dark:border-gray-800 rounded-lg">
                <button
                  onClick={() => setOpenSection(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Badge>{ep.code}</Badge>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {ep.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-2 ml-2">
                      {ep.conseils.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-emerald-500 mt-0.5">•</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* ===== S5 — MOTIVATIONAL MESSAGE ===== */}
      <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
        <p className="text-center text-emerald-800 dark:text-emerald-300 font-medium text-lg mb-2">
          Tu as fait le plus dur : te préparer.
        </p>
        <p className="text-center text-emerald-700 dark:text-emerald-400 text-sm">
          Chaque fiche révisée, chaque question travaillée t&apos;a rapproché de ton objectif.
          Fais-toi confiance, reste calme, et donne le meilleur de toi-même. Tu es prêt(e) !
        </p>
      </Card>
    </div>
  );
}
