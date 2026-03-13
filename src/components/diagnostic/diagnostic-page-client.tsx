"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Target,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Circle,
  Check,
  X,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuiz, QuizQuestion } from "@/lib/hooks/use-quiz";
import { useAuth } from "@/components/layout/auth-provider";
import { generateProgram } from "@/lib/utils/program-generator";
import { ProgramDuration } from "@/types/database";

const diagnosticQuestions: QuizQuestion[] = [
  {
    id: "diag-e1-q1",
    chapterId: "diag-E1",
    moduleCode: "E1",
    chapterTitle: "Diagnostic E1 - Anglais",
    questionType: "mcq",
    questionText: "Comment dit-on 'métabolisme' en anglais médical ?",
    options: [
      { id: "a", text: "Metabolism", isCorrect: true },
      { id: "b", text: "Metabolic process", isCorrect: false },
      { id: "c", text: "Body chemistry", isCorrect: false },
      { id: "d", text: "Nutrient processing", isCorrect: false },
    ],
    correctAnswer: "",
    explanation: "En anglais médical, 'métabolisme' se dit 'metabolism'.",
    difficulty: 1,
    tags: ["anglais", "vocabulaire"],
    examLink: null,
  },
  {
    id: "diag-e2-q1",
    chapterId: "diag-E2",
    moduleCode: "E2",
    chapterTitle: "Diagnostic E2 - Biochimie",
    questionType: "mcq",
    questionText: "Quel est le principal produit final de la glycolyse ?",
    options: [
      { id: "a", text: "Acetyl-CoA", isCorrect: false },
      { id: "b", text: "Pyruvate", isCorrect: true },
      { id: "c", text: "Glucose-6-phosphate", isCorrect: false },
      { id: "d", text: "Oxaloacetate", isCorrect: false },
    ],
    correctAnswer: "",
    explanation: "La glycolyse produit 2 molécules de pyruvate à partir d'une molécule de glucose.",
    difficulty: 1,
    tags: ["glycolyse", "métabolisme"],
    examLink: null,
  },
  {
    id: "diag-e2-q2",
    chapterId: "diag-E2",
    moduleCode: "E2",
    chapterTitle: "Diagnostic E2 - Biochimie",
    questionType: "true_false",
    questionText: "Les acides gras saturés sont généralement liquides à température ambiante.",
    options: [
      { id: "true", text: "Vrai", isCorrect: false },
      { id: "false", text: "Faux", isCorrect: true },
    ],
    correctAnswer: "Faux",
    explanation: "Les acides gras saturés sont solides à température ambiante. Les acides gras insaturés sont liquides.",
    difficulty: 1,
    tags: ["lipides", "structure"],
    examLink: null,
  },
  {
    id: "diag-e2-q3",
    chapterId: "diag-E2",
    moduleCode: "E2",
    chapterTitle: "Diagnostic E2 - Biochimie",
    questionType: "mcq",
    questionText: "Quel organe produit l'insuline ?",
    options: [
      { id: "a", text: "Le foie", isCorrect: false },
      { id: "b", text: "Le pancréas", isCorrect: true },
      { id: "c", text: "La glande thyroïde", isCorrect: false },
      { id: "d", text: "Les glandes surrénales", isCorrect: false },
    ],
    correctAnswer: "",
    explanation: "L'insuline est produite par les cellules bêta des îlots de Langerhans du pancréas.",
    difficulty: 2,
    tags: ["insuline", "pancréas", "endocrinien"],
    examLink: null,
  },
  {
    id: "diag-e2-q4",
    chapterId: "diag-E2",
    moduleCode: "E2",
    chapterTitle: "Diagnostic E2 - Biochimie",
    questionType: "true_false",
    questionText: "Le cholestérol est une molécule essentiellement d'origine végétale.",
    options: [
      { id: "true", text: "Vrai", isCorrect: false },
      { id: "false", text: "Faux", isCorrect: true },
    ],
    correctAnswer: "Faux",
    explanation: "Le cholestérol est principalement d'origine animale. Les végétaux ne contiennent pas de cholestérol.",
    difficulty: 2,
    tags: ["lipides", "cholestérol"],
    examLink: null,
  },
  {
    id: "diag-e2-q5",
    chapterId: "diag-E2",
    moduleCode: "E2",
    chapterTitle: "Diagnostic E2 - Biochimie",
    questionType: "mcq",
    questionText: "Quel est l'apport énergétique des glucides par gramme ?",
    options: [
      { id: "a", text: "2 kcal/g", isCorrect: false },
      { id: "b", text: "4 kcal/g", isCorrect: true },
      { id: "c", text: "7 kcal/g", isCorrect: false },
      { id: "d", text: "9 kcal/g", isCorrect: false },
    ],
    correctAnswer: "",
    explanation: "Les glucides et protéines fournissent 4 kcal/g. Les lipides fournissent 9 kcal/g.",
    difficulty: 1,
    tags: ["énergie", "nutrition"],
    examLink: null,
  },
  {
    id: "diag-e3-q1",
    chapterId: "diag-E3",
    moduleCode: "E3",
    chapterTitle: "Diagnostic E3 - Démarche de soin",
    questionType: "mcq",
    questionText: "Quelle est la première étape d'une consultation diététique ?",
    options: [
      { id: "a", text: "Prescrire un régime", isCorrect: false },
      { id: "b", text: "L'anamnèse", isCorrect: true },
      { id: "c", text: "Le diagnostic", isCorrect: false },
      { id: "d", text: "L'évaluation", isCorrect: false },
    ],
    correctAnswer: "",
    explanation: "L'anamnèse est la première étape pour recueillir l'histoire médicale et alimentaire du patient.",
    difficulty: 2,
    tags: ["démarche", "consultation"],
    examLink: null,
  },
  {
    id: "diag-e3-q2",
    chapterId: "diag-E3",
    moduleCode: "E3",
    chapterTitle: "Diagnostic E3 - Démarche de soin",
    questionType: "true_false",
    questionText: "L'éducation thérapeutique du patient est une activité réservée aux médecins.",
    options: [
      { id: "true", text: "Vrai", isCorrect: false },
      { id: "false", text: "Faux", isCorrect: true },
    ],
    correctAnswer: "Faux",
    explanation: "L'ETP est une activité multidisciplinaire, y compris diététiciens, infirmières, psychologues.",
    difficulty: 2,
    tags: ["ETP", "multidisciplinaire"],
    examLink: null,
  },
  {
    id: "diag-e4-q1",
    chapterId: "diag-E4",
    moduleCode: "E4",
    chapterTitle: "Diagnostic E4 - Alimentation",
    questionType: "mcq",
    questionText: "Les groupes d'aliments principaux selon le PNNS sont au nombre de ?",
    options: [
      { id: "a", text: "3", isCorrect: false },
      { id: "b", text: "4", isCorrect: false },
      { id: "c", text: "5", isCorrect: false },
      { id: "d", text: "7", isCorrect: true },
    ],
    correctAnswer: "",
    explanation: "Le PNNS (Programme National Nutrition Santé) recommande 7 groupes d'aliments.",
    difficulty: 2,
    tags: ["PNNS", "groupes alimentaires"],
    examLink: null,
  },
  {
    id: "diag-e4-q2",
    chapterId: "diag-E4",
    moduleCode: "E4",
    chapterTitle: "Diagnostic E4 - Alimentation",
    questionType: "true_false",
    questionText: "Les lipides n'ont aucun intérêt nutritionnel et doivent être éliminés de l'alimentation.",
    options: [
      { id: "true", text: "Vrai", isCorrect: false },
      { id: "false", text: "Faux", isCorrect: true },
    ],
    correctAnswer: "Faux",
    explanation: "Les lipides sont essentiels pour l'absorption des vitamines liposolubles et la satiété.",
    difficulty: 1,
    tags: ["lipides", "nutrition"],
    examLink: null,
  },
  {
    id: "diag-e5-q1",
    chapterId: "diag-E5",
    moduleCode: "E5",
    chapterTitle: "Diagnostic E5 - Santé publique",
    questionType: "mcq",
    questionText: "La santé publique s'intéresse à la santé de ?",
    options: [
      { id: "a", text: "L'individu uniquement", isCorrect: false },
      { id: "b", text: "La population entière", isCorrect: true },
      { id: "c", text: "Un groupe de risque", isCorrect: false },
      { id: "d", text: "Les professionnels de santé", isCorrect: false },
    ],
    correctAnswer: "",
    explanation: "La santé publique a une approche collective et vise à améliorer la santé de la population entière.",
    difficulty: 1,
    tags: ["santé publique", "prévention"],
    examLink: null,
  },
  {
    id: "diag-e5-q2",
    chapterId: "diag-E5",
    moduleCode: "E5",
    chapterTitle: "Diagnostic E5 - Santé publique",
    questionType: "true_false",
    questionText: "La restauration collective est hors du champ de compétences du diététicien.",
    options: [
      { id: "true", text: "Vrai", isCorrect: false },
      { id: "false", text: "Faux", isCorrect: true },
    ],
    correctAnswer: "Faux",
    explanation: "La gestion de la restauration collective (menus, qualité hygiénique) est une activité majeure du diététicien.",
    difficulty: 1,
    tags: ["restauration collective", "compétences"],
    examLink: null,
  },
];

const moduleInfo: Record<string, { title: string; color: string }> = {
  E1: { title: "Anglais", color: "emerald" },
  E2: { title: "Biologie et physiopathologie", color: "emerald" },
  E3: { title: "Démarche de soin diététique", color: "emerald" },
  E4: { title: "Alimentation saine et durable", color: "emerald" },
  E5: { title: "Santé publique et nutrition", color: "emerald" },
};

function getScoreColor(pct: number): string {
  if (pct < 50) return "text-red-500";
  if (pct < 80) return "text-amber-500";
  return "text-emerald-500";
}

function getScoreBg(pct: number): string {
  if (pct < 50) return "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800";
  if (pct < 80) return "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800";
  return "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800";
}

function getScoreBgBar(pct: number): string {
  if (pct < 50) return "bg-red-500";
  if (pct < 80) return "bg-amber-500";
  return "bg-emerald-500";
}

function getStatusLabel(pct: number): string {
  if (pct >= 80) return "Point fort";
  if (pct >= 50) return "À consolider";
  return "Point faible";
}

function getStatusVariant(pct: number): "emerald" | "coral" | "gray" {
  if (pct >= 80) return "emerald";
  if (pct >= 50) return "coral";
  return "gray";
}

interface ModuleScore {
  correct: number;
  total: number;
}

export default function DiagnosticPageClient() {
  const router = useRouter();
  const { profile } = useAuth();
  const [phase, setPhase] = useState<"quiz" | "results">("quiz");
  const [moduleScores, setModuleScores] = useState<Record<string, ModuleScore>>({
    E1: { correct: 0, total: 0 },
    E2: { correct: 0, total: 0 },
    E3: { correct: 0, total: 0 },
    E4: { correct: 0, total: 0 },
    E5: { correct: 0, total: 0 },
  });

  const quiz = useQuiz(diagnosticQuestions);

  useEffect(() => {
    if (quiz.finished) {
      const newScores: Record<string, ModuleScore> = {
        E1: { correct: 0, total: 0 },
        E2: { correct: 0, total: 0 },
        E3: { correct: 0, total: 0 },
        E4: { correct: 0, total: 0 },
        E5: { correct: 0, total: 0 },
      };

      diagnosticQuestions.forEach((q) => {
        const module = q.moduleCode;
        newScores[module].total += 1;
        const isCorrect = !quiz.wrongAnswers.find((a) => a.questionId === q.id);
        if (isCorrect) newScores[module].correct += 1;
      });

      setModuleScores(newScores);
      setPhase("results");
    }
  }, [quiz.finished, quiz.wrongAnswers]);

  if (phase === "results") {
    const modules = ["E1", "E2", "E3", "E4", "E5"];
    const overallPercentage = quiz.percentage;
    const strongPoints = modules.filter((m) => {
      const score = moduleScores[m];
      if (!score) return false;
      return (score.correct / score.total) * 100 >= 80;
    });
    const needsWork = modules.filter((m) => {
      const score = moduleScores[m];
      if (!score) return false;
      const pct = (score.correct / score.total) * 100;
      return pct >= 50 && pct < 80;
    });
    const weakPoints = modules.filter((m) => {
      const score = moduleScores[m];
      if (!score) return false;
      return (score.correct / score.total) * 100 < 50;
    });

    const examYear = profile?.exam_year || 2027;
    const programDuration = (profile?.program_duration || "12months") as ProgramDuration;
    const weeks = generateProgram({
      examDate: new Date(examYear, 5, 15),
      startDate: new Date(),
      programDuration,
    });

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>

        <h1 className="text-2xl font-medium text-center text-gray-900 dark:text-white">
          Résultats du diagnostic
        </h1>

        <Card className={`text-center py-10 border ${getScoreBg(overallPercentage)}`}>
          <Trophy className={`w-12 h-12 mx-auto mb-4 ${getScoreColor(overallPercentage)}`} />
          <p className={`text-4xl font-medium mb-2 ${getScoreColor(overallPercentage)}`}>
            {overallPercentage}%
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {quiz.score}/{diagnosticQuestions.length} bonnes réponses
          </p>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Résultats par module
          </h2>
          {modules.map((moduleCode) => {
            const score = moduleScores[moduleCode];
            if (!score) return null;
            const pct = Math.round((score.correct / score.total) * 100);
            return (
              <Card key={moduleCode} className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge>{moduleCode}</Badge>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {moduleInfo[moduleCode]?.title}
                    </span>
                  </div>
                  <Badge variant="gray">{score.correct}/{score.total}</Badge>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getScoreBgBar(pct)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{pct}%</span>
                  <Badge variant={getStatusVariant(pct)}>
                    {getStatusLabel(pct)}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Analyse
          </h2>
          <div className="space-y-4">
            {strongPoints.length > 0 && (
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Points forts
                </p>
                <div className="space-y-1">
                  {strongPoints.map((m) => (
                    <p key={m} className="text-sm text-gray-700 dark:text-gray-300">
                      {m} : {moduleInfo[m]?.title}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {needsWork.length > 0 && (
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> À consolider
                </p>
                <div className="space-y-1">
                  {needsWork.map((m) => (
                    <p key={m} className="text-sm text-gray-700 dark:text-gray-300">
                      {m} : {moduleInfo[m]?.title}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {weakPoints.length > 0 && (
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Points faibles
                </p>
                <div className="space-y-1">
                  {weakPoints.map((m) => (
                    <p key={m} className="text-sm text-gray-700 dark:text-gray-300">
                      {m} : {moduleInfo[m]?.title}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800 p-6">
          <h2 className="text-lg font-medium text-emerald-900 dark:text-emerald-300 mb-2">
            Ton programme personnalisé est prêt !
          </h2>
          <p className="text-sm text-emerald-800 dark:text-emerald-400 mb-4">
            {weeks.length} semaines de révision adaptées à ton niveau
          </p>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            {overallPercentage >= 80
              ? "Excellent départ ! Ton programme t'aidera à consolider ces connaissances."
              : overallPercentage >= 50
              ? "Bon travail ! Focus sur les modules à améliorer avec ton programme personnalisé."
              : "Continue ! Ce programme est adapté pour progresser progressivement."}
          </p>
        </Card>

        <Button
          onClick={() => router.push("/dashboard")}
          size="lg"
          className="w-full"
        >
          Commencer mon programme
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  const q = quiz.currentQuestion;
  if (!q) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900 dark:text-white">
            Diagnostic
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Question {quiz.currentIndex + 1}/{quiz.total}
          </p>
        </div>
        <Badge variant="coral">{quiz.currentIndex + 1}/{quiz.total}</Badge>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
        <div
          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((quiz.currentIndex + 1) / quiz.total) * 100}%` }}
        />
      </div>

      {quiz.currentIndex % 6 === 0 && (
        <div className="flex items-center gap-2">
          <Badge>{q.moduleCode}</Badge>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {moduleInfo[q.moduleCode]?.title}
          </span>
        </div>
      )}

      <div className={`transition-all duration-200 ${quiz.transitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Badge>{q.moduleCode}</Badge>
            <span className="text-xs text-gray-400">{q.chapterTitle}</span>
          </div>

          <div className="flex items-center gap-1 mb-6">
            {[1, 2, 3].map((i) => (
              <Circle
                key={i}
                className={`w-3 h-3 ${i <= q.difficulty ? "fill-emerald-500 text-emerald-500" : "text-gray-300 dark:text-gray-600"}`}
              />
            ))}
          </div>

          <p className="text-gray-900 dark:text-white font-medium mb-6 leading-relaxed">
            {q.questionText}
          </p>

          {q.questionType === "mcq" && q.options && (
            <div className="space-y-3">
              {q.options.map((opt) => {
                let cls = "border border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-emerald-400 dark:hover:border-emerald-600";
                if (quiz.validated) {
                  if (opt.isCorrect) cls = "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4";
                  else if (quiz.selectedOption === opt.id) cls = "border-2 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl p-4";
                  else cls = "border border-gray-200 dark:border-gray-700 rounded-xl p-4 opacity-40";
                } else if (quiz.selectedOption === opt.id) {
                  cls = "border-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4";
                }
                return (
                  <button
                    key={opt.id}
                    onClick={() => quiz.selectOption(opt.id)}
                    className={`${cls} w-full text-left flex items-center gap-3`}
                    disabled={quiz.validated}
                  >
                    {quiz.validated && opt.isCorrect && <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                    {quiz.validated && quiz.selectedOption === opt.id && !opt.isCorrect && <X className="w-5 h-5 text-red-500 flex-shrink-0" />}
                    <span className="text-sm text-gray-700 dark:text-gray-300">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          )}

          {q.questionType === "true_false" && q.options && (
            <div className="grid grid-cols-2 gap-4">
              {q.options.map((opt) => {
                let cls = "border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer transition-all text-center hover:border-emerald-400 dark:hover:border-emerald-600";
                if (quiz.validated) {
                  if (opt.isCorrect) cls = "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 text-center";
                  else if (quiz.selectedOption === opt.id) cls = "border-2 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-center";
                  else cls = "border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center opacity-40";
                } else if (quiz.selectedOption === opt.id) {
                  cls = "border-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 text-center";
                }
                return (
                  <button
                    key={opt.id}
                    onClick={() => quiz.selectOption(opt.id)}
                    className={cls}
                    disabled={quiz.validated}
                  >
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          )}
        </Card>

        {quiz.validated && (
          <div className={`mt-4 rounded-xl p-5 border ${quiz.isCorrect ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800" : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"}`}>
            <div className="flex items-start gap-3">
              {quiz.isCorrect ? <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" /> : <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
              <div>
                <p className={`text-sm font-medium mb-1 ${quiz.isCorrect ? "text-emerald-900 dark:text-emerald-300" : "text-red-900 dark:text-red-300"}`}>
                  {quiz.isCorrect ? "Bonne réponse !" : "Mauvaise réponse"}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Score : {quiz.score}/{quiz.currentIndex + (quiz.validated ? 1 : 0)}</span>
        {!quiz.validated ? (
          <Button onClick={quiz.validate} disabled={!quiz.selectedOption}>
            Valider
          </Button>
        ) : (
          <Button onClick={quiz.next}>
            {quiz.currentIndex + 1 >= quiz.total ? "Voir le résultat" : "Suivante"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
