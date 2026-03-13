"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  RotateCcw,
  BookOpen,
  Trophy,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useQuiz, QuizQuestion } from "@/lib/hooks/use-quiz";
import { useAuth } from "@/components/layout/auth-provider";
import { getQuestionLimit } from "@/lib/utils/subscription";
import { useParams } from "next/navigation";
import { BookmarkButton } from "@/components/ui/bookmark-button";

const sampleQuestionsByChapter: Record<string, QuizQuestion[]> = {
  "e2-ch1": [
    {
      id: "q1",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "mcq",
      questionText: "Quel est le bilan énergétique net de la glycolyse pour une molécule de glucose ?",
      options: [
        { id: "a", text: "2 ATP + 2 NADH", isCorrect: true },
        { id: "b", text: "4 ATP + 2 NADH", isCorrect: false },
        { id: "c", text: "2 ATP + 4 NADH", isCorrect: false },
        { id: "d", text: "38 ATP", isCorrect: false },
      ],
      correctAnswer: "",
      explanation: "La glycolyse produit 4 ATP au total mais en consomme 2 dans la phase d'investissement. Le bilan net est donc de 2 ATP et 2 NADH par molécule de glucose.",
      difficulty: 1,
      tags: ["glycolyse", "ATP", "métabolisme"],
      examLink: null,
    },
    {
      id: "q2",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "mcq",
      questionText: "Quel monosaccharide est la principale source d'énergie pour les cellules ?",
      options: [
        { id: "a", text: "Fructose", isCorrect: false },
        { id: "b", text: "Glucose", isCorrect: true },
        { id: "c", text: "Galactose", isCorrect: false },
        { id: "d", text: "Ribose", isCorrect: false },
      ],
      correctAnswer: "",
      explanation: "Le glucose est le principal carburant des cellules et le seul sucre utilisé par le cerveau en conditions normales.",
      difficulty: 1,
      tags: ["glucose", "monosaccharide", "énergie"],
      examLink: null,
    },
    {
      id: "q3",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "true_false",
      questionText: "Le glycogène est la forme de réserve glucidique chez les végétaux.",
      options: [
        { id: "vrai", text: "Vrai", isCorrect: false },
        { id: "faux", text: "Faux", isCorrect: true },
      ],
      correctAnswer: "Faux",
      explanation: "Le glycogène est la réserve glucidique ANIMALE. Chez les végétaux, c'est l'amidon qui représente la réserve glucidique.",
      difficulty: 1,
      tags: ["glycogène", "amidon", "réserve"],
      examLink: null,
    },
    {
      id: "q4",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "mcq",
      questionText: "Quel disaccharide est composé de glucose et de galactose ?",
      options: [
        { id: "a", text: "Saccharose", isCorrect: false },
        { id: "b", text: "Maltose", isCorrect: false },
        { id: "c", text: "Lactose", isCorrect: true },
        { id: "d", text: "Tréhalose", isCorrect: false },
      ],
      correctAnswer: "",
      explanation: "Le lactose est le sucre du lait, composé d'un glucose et d'un galactose liés par une liaison bêta-1,4-osidique.",
      difficulty: 1,
      tags: ["lactose", "disaccharide", "lait"],
      examLink: null,
    },
    {
      id: "q5",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "open_short",
      questionText: "Quel est le principal polysaccharide de réserve chez les plantes ?",
      options: null,
      correctAnswer: "amidon",
      explanation: "L'amidon est le polysaccharide de réserve des plantes. Il est composé d'amylose et d'amylopectine.",
      difficulty: 1,
      tags: ["amidon", "polysaccharide", "plante"],
      examLink: null,
    },
    {
      id: "q6",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "mcq",
      questionText: "Quel enzyme catalyse l'étape limitante (irréversible) de la glycolyse ?",
      options: [
        { id: "a", text: "Hexokinase", isCorrect: false },
        { id: "b", text: "Phosphofructokinase-1", isCorrect: true },
        { id: "c", text: "Pyruvate kinase", isCorrect: false },
        { id: "d", text: "Aldolase", isCorrect: false },
      ],
      correctAnswer: "",
      explanation: "La phosphofructokinase-1 (PFK-1) est l'enzyme clé de régulation de la glycolyse.",
      difficulty: 2,
      tags: ["PFK-1", "enzyme", "régulation"],
      examLink: null,
    },
    {
      id: "q7",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "true_false",
      questionText: "Les acides gras saturés sont généralement liquides à température ambiante.",
      options: [
        { id: "vrai", text: "Vrai", isCorrect: false },
        { id: "faux", text: "Faux", isCorrect: true },
      ],
      correctAnswer: "Faux",
      explanation: "Les acides gras saturés sont solides à température ambiante (beurre). Les acides gras insaturés sont liquides.",
      difficulty: 1,
      tags: ["acides gras", "structure", "saturation"],
      examLink: null,
    },
    {
      id: "q8",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "mcq",
      questionText: "En conditions anaérobies, le pyruvate est réduit en ?",
      options: [
        { id: "a", text: "Ethanol", isCorrect: false },
        { id: "b", text: "Lactate", isCorrect: true },
        { id: "c", text: "Acetyl-CoA", isCorrect: false },
        { id: "d", text: "Oxaloacetate", isCorrect: false },
      ],
      correctAnswer: "",
      explanation: "En conditions anaérobies (effort intense), le pyruvate est réduit en lactate par la lactate déshydrogénase.",
      difficulty: 1,
      tags: ["fermentation", "lactate", "anaérobie"],
      examLink: null,
    },
    {
      id: "q9",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "mcq",
      questionText: "Combien de carbones contient un pentose ?",
      options: [
        { id: "a", text: "3", isCorrect: false },
        { id: "b", text: "4", isCorrect: false },
        { id: "c", text: "5", isCorrect: true },
        { id: "d", text: "6", isCorrect: false },
      ],
      correctAnswer: "",
      explanation: "Un pentose est un monosaccharide à 5 carbones (C5). L'exemple le plus connu est le ribose.",
      difficulty: 1,
      tags: ["monosaccharide", "pentose", "structure"],
      examLink: null,
    },
    {
      id: "q10",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "true_false",
      questionText: "Le glucose existe uniquement sous sa forme linéaire en solution aqueuse.",
      options: [
        { id: "vrai", text: "Vrai", isCorrect: false },
        { id: "faux", text: "Faux", isCorrect: true },
      ],
      correctAnswer: "Faux",
      explanation: "Le glucose adopte principalement des formes cycliques (alpha et bêta-D-glucopyranose) en solution aqueuse.",
      difficulty: 2,
      tags: ["glucose", "forme cyclique", "structure"],
      examLink: null,
    },
    {
      id: "q11",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "mcq",
      questionText: "Quel est le principal organe de métabolisation du fructose ?",
      options: [
        { id: "a", text: "Le cerveau", isCorrect: false },
        { id: "b", text: "Le foie", isCorrect: true },
        { id: "c", text: "Le muscle", isCorrect: false },
        { id: "d", text: "Le pancréas", isCorrect: false },
      ],
      correctAnswer: "",
      explanation: "Le fructose est principalement métabolisé par le foie via la fructokinase.",
      difficulty: 1,
      tags: ["fructose", "foie", "métabolisme"],
      examLink: null,
    },
    {
      id: "q12",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "open_short",
      questionText: "Comment s'appelle la chaîne de glucose simple composant une partie de l'amidon ?",
      options: null,
      correctAnswer: "amylose",
      explanation: "L'amylose est la fraction linéaire de l'amidon, composée de monomères de glucose en liaison alpha-1,4.",
      difficulty: 2,
      tags: ["amidon", "amylose", "glucose"],
      examLink: null,
    },
    {
      id: "q13",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "true_false",
      questionText: "La cellulose peut être entièrement digestible par l'être humain.",
      options: [
        { id: "vrai", text: "Vrai", isCorrect: false },
        { id: "faux", text: "Faux", isCorrect: true },
      ],
      correctAnswer: "Faux",
      explanation: "La cellulose est une fibre non digestible car l'homme ne possède pas l'enzyme nécessaire pour hydrolyser les liaisons bêta-1,4.",
      difficulty: 1,
      tags: ["cellulose", "fibre", "digestion"],
      examLink: null,
    },
    {
      id: "q14",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "mcq",
      questionText: "Quel est l'apport énergétique des glucides par gramme ?",
      options: [
        { id: "a", text: "2 kcal/g", isCorrect: false },
        { id: "b", text: "4 kcal/g", isCorrect: true },
        { id: "c", text: "7 kcal/g", isCorrect: false },
        { id: "d", text: "9 kcal/g", isCorrect: false },
      ],
      correctAnswer: "",
      explanation: "Les glucides fournissent 4 kcal/g, tout comme les protéines. Les lipides en fournissent 9 kcal/g.",
      difficulty: 1,
      tags: ["énergie", "kcal", "nutrition"],
      examLink: null,
    },
    {
      id: "q15",
      chapterId: "e2-ch1",
      moduleCode: "E2",
      chapterTitle: "Biochimie structurale : glucides",
      questionType: "mcq",
      questionText: "Quelle est la formule chimique du glucose ?",
      options: [
        { id: "a", text: "C5H10O5", isCorrect: false },
        { id: "b", text: "C6H12O6", isCorrect: true },
        { id: "c", text: "C7H14O7", isCorrect: false },
        { id: "d", text: "C12H22O11", isCorrect: false },
      ],
      correctAnswer: "",
      explanation: "Le glucose a pour formule brute C6H12O6. C'est un hexose (6 carbones).",
      difficulty: 1,
      tags: ["glucose", "formule", "structure"],
      examLink: null,
    },
  ],
};

const defaultQuestions: QuizQuestion[] = [
  {
    id: "default-q1",
    chapterId: "default",
    moduleCode: "E2",
    chapterTitle: "Quiz",
    questionType: "mcq",
    questionText: "Les questions de ce quiz seront chargées depuis la base de données. En attendant, voici un exemple : quel nutriment fournit 4 kcal/g ?",
    options: [
      { id: "a", text: "Lipides", isCorrect: false },
      { id: "b", text: "Glucides", isCorrect: true },
      { id: "c", text: "Alcool", isCorrect: false },
      { id: "d", text: "Fibres", isCorrect: false },
    ],
    correctAnswer: "",
    explanation: "Les glucides et les protéines fournissent 4 kcal/g. Les lipides fournissent 9 kcal/g et l'alcool 7 kcal/g.",
    difficulty: 1,
    tags: ["nutrition", "énergie"],
    examLink: null,
  },
];

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

export default function QuizPageClient() {
  const params = useParams();
  const chapterId = params.chapterId as string;
  const { profile } = useAuth();
  const allQuestions = sampleQuestionsByChapter[chapterId] || defaultQuestions;
  const questionLimit = getQuestionLimit(profile?.subscription_status, profile?.role);
  const questions = allQuestions.slice(0, Math.min(allQuestions.length, questionLimit));
  const hasMoreQuestions = allQuestions.length > questions.length;

  const quiz = useQuiz(questions);

  if (quiz.finished) {
    const wrongQuestions = quiz.questions.filter((q) =>
      quiz.wrongAnswers.find((a) => a.questionId === q.id)
    );

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href={`/dashboard/chapters/${chapterId}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au chapitre
        </Link>

        <Card className={`text-center py-10 border ${getScoreBg(quiz.percentage)}`}>
          <Trophy className={`w-12 h-12 mx-auto mb-4 ${getScoreColor(quiz.percentage)}`} />
          <p className={`text-5xl font-medium mb-2 ${getScoreColor(quiz.percentage)}`}>
            {quiz.percentage}%
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {quiz.score}/{quiz.total} bonnes réponses
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            {quiz.percentage >= 80
              ? "Excellent ! Tu maîtrises bien ce chapitre."
              : quiz.percentage >= 50
              ? "Pas mal ! Quelques notions à revoir."
              : "Continue de réviser, tu vas progresser !"}
          </p>
        </Card>

        {wrongQuestions.length > 0 && (
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-coral-500" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Questions à revoir ({wrongQuestions.length})
              </h2>
            </div>
            <div className="space-y-4">
              {wrongQuestions.map((q, i) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-coral-50/50 dark:bg-coral-900/10 border border-coral-200 dark:border-coral-800"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {i + 1}. {q.questionText}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {q.explanation}
                  </p>
                  {q.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {q.tags.map((tag) => (
                        <Badge key={tag} variant="gray">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {hasMoreQuestions && !profile?.subscription_status && (
          <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800">
            <p className="text-sm text-emerald-700 dark:text-emerald-400">
              Abonne-toi pour accéder à toutes les questions
            </p>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          {wrongQuestions.length > 0 && (
            <Button
              variant="coral"
              className="flex-1"
              onClick={() => quiz.restart(true)}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Revoir les erreurs ({wrongQuestions.length})
            </Button>
          )}
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => quiz.restart(false)}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Recommencer tout
          </Button>
          <Link href={`/dashboard/chapters/${chapterId}`} className="flex-1">
            <Button variant="ghost" className="w-full">
              <BookOpen className="w-4 h-4 mr-2" />
              Retour au chapitre
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const q = quiz.currentQuestion;
  if (!q) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href={`/dashboard/chapters/${chapterId}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Link>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge>{q.moduleCode}</Badge>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {q.chapterTitle}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-gray-900 dark:text-white">Quiz</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Question {quiz.currentIndex + 1}/{quiz.total}
          </span>
        </div>
      </div>

      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
        <div
          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((quiz.currentIndex + 1) / quiz.total) * 100}%` }}
        />
      </div>

      <div
        className={`transition-all duration-200 ${
          quiz.transitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
        }`}
      >
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    level <= q.difficulty
                      ? "bg-emerald-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-400 ml-1">
                {q.difficulty === 1 ? "Facile" : q.difficulty === 2 ? "Moyen" : "Difficile"}
              </span>
            </div>
            <BookmarkButton contentType="question" contentId={q.id} size="sm" />
          </div>

          <p className="text-gray-900 dark:text-white font-medium mb-6 leading-relaxed" style={{ fontSize: "15px", lineHeight: "1.6" }}>
            {q.questionText}
          </p>

          {q.questionType === "mcq" && q.options && (
            <div className="space-y-3">
              {q.options.map((option) => {
                let cls =
                  "border border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-emerald-400 dark:hover:border-emerald-600";

                if (quiz.validated) {
                  if (option.isCorrect) {
                    cls =
                      "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4";
                  } else if (quiz.selectedOption === option.id && !option.isCorrect) {
                    cls =
                      "border-2 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl p-4";
                  } else {
                    cls =
                      "border border-gray-200 dark:border-gray-700 rounded-xl p-4 opacity-40";
                  }
                } else if (quiz.selectedOption === option.id) {
                  cls =
                    "border-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4";
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => quiz.selectOption(option.id)}
                    className={`${cls} w-full text-left flex items-center gap-3`}
                    disabled={quiz.validated}
                  >
                    {quiz.validated && option.isCorrect && (
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    {quiz.validated &&
                      quiz.selectedOption === option.id &&
                      !option.isCorrect && (
                        <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                    {(!quiz.validated ||
                      (!option.isCorrect && quiz.selectedOption !== option.id)) && (
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                          quiz.selectedOption === option.id && !quiz.validated
                            ? "border-emerald-600 bg-emerald-600"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {quiz.selectedOption === option.id && !quiz.validated && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {q.questionType === "true_false" && q.options && (
            <div className="grid grid-cols-2 gap-4">
              {q.options.map((option) => {
                let cls =
                  "border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer transition-all duration-200 text-center hover:border-emerald-400 dark:hover:border-emerald-600";

                if (quiz.validated) {
                  if (option.isCorrect) {
                    cls =
                      "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 text-center";
                  } else if (quiz.selectedOption === option.id) {
                    cls =
                      "border-2 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-center";
                  } else {
                    cls =
                      "border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center opacity-40";
                  }
                } else if (quiz.selectedOption === option.id) {
                  cls =
                    "border-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 text-center";
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => quiz.selectOption(option.id)}
                    className={cls}
                    disabled={quiz.validated}
                  >
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {q.questionType === "open_short" && (
            <div>
              <textarea
                value={quiz.userTextAnswer}
                onChange={(e) => quiz.setTextAnswer(e.target.value)}
                placeholder="Tape ta réponse..."
                disabled={quiz.validated}
                className="w-full h-24 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none text-sm"
              />
              {quiz.validated && (
                <p className="mt-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Réponse attendue : </span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {q.correctAnswer}
                  </span>
                </p>
              )}
            </div>
          )}
        </Card>

        {quiz.validated && (
          <div
            className={`mt-4 rounded-xl p-5 border transition-all duration-300 ${
              quiz.isCorrect
                ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800"
                : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
            }`}
          >
            <div className="flex items-start gap-3">
              {quiz.isCorrect ? (
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p
                  className={`text-sm font-medium mb-1 ${
                    quiz.isCorrect
                      ? "text-emerald-900 dark:text-emerald-300"
                      : "text-red-900 dark:text-red-300"
                  }`}
                >
                  {quiz.isCorrect ? "Bonne réponse !" : "Mauvaise réponse"}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {q.explanation}
                </p>

                {q.examLink && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 italic mt-3">
                    {q.examLink}
                  </p>
                )}

                {q.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {q.tags.map((tag) => (
                      <Badge key={tag} variant="gray">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Score : {quiz.score}/{quiz.currentIndex + (quiz.validated ? 1 : 0)}
        </div>

        {!quiz.validated ? (
          <Button
            onClick={quiz.validate}
            disabled={
              (q.questionType !== "open_short" && !quiz.selectedOption) ||
              (q.questionType === "open_short" && !quiz.userTextAnswer.trim())
            }
          >
            Valider
          </Button>
        ) : (
          <Button onClick={quiz.next}>
            {quiz.currentIndex + 1 >= quiz.total
              ? "Voir le résultat"
              : "Question suivante"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
