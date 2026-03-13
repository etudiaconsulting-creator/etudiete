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
  Brain,
  Trophy,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useQuiz, QuizQuestion } from "@/lib/hooks/use-quiz";
import { BookmarkButton } from "@/components/ui/bookmark-button";

const dailyReviewQuestions: QuizQuestion[] = [
  {
    id: "dr1",
    chapterId: "e2-ch1",
    moduleCode: "E2",
    chapterTitle: "Glucides & métabolisme",
    questionType: "mcq",
    questionText: "Quel est le bilan énergétique net de la glycolyse ?",
    options: [
      { id: "a", text: "2 ATP + 2 NADH", isCorrect: true },
      { id: "b", text: "4 ATP + 2 NADH", isCorrect: false },
      { id: "c", text: "2 ATP + 4 NADH", isCorrect: false },
      { id: "d", text: "38 ATP", isCorrect: false },
    ],
    correctAnswer: "",
    explanation: "La glycolyse produit 4 ATP mais en consomme 2 dans la phase d'investissement, soit un bilan net de 2 ATP et 2 NADH.",
    difficulty: 1,
    tags: ["glycolyse", "ATP"],
    examLink: null,
  },
  {
    id: "dr2",
    chapterId: "e2-ch1",
    moduleCode: "E2",
    chapterTitle: "Glucides & métabolisme",
    questionType: "true_false",
    questionText: "Le glycogène est la forme de réserve glucidique chez les végétaux.",
    options: [
      { id: "vrai", text: "Vrai", isCorrect: false },
      { id: "faux", text: "Faux", isCorrect: true },
    ],
    correctAnswer: "Faux",
    explanation: "Le glycogène est la réserve glucidique ANIMALE. Chez les végétaux c'est l'amidon.",
    difficulty: 1,
    tags: ["glycogene", "amidon"],
    examLink: null,
  },
  {
    id: "dr3",
    chapterId: "e2-ch2",
    moduleCode: "E2",
    chapterTitle: "Lipides & structure",
    questionType: "mcq",
    questionText: "Quel est le principal organe de métabolisation des acides gras ?",
    options: [
      { id: "a", text: "L'intestin", isCorrect: false },
      { id: "b", text: "Le foie", isCorrect: true },
      { id: "c", text: "Le muscle", isCorrect: false },
      { id: "d", text: "Le rein", isCorrect: false },
    ],
    correctAnswer: "",
    explanation: "Le foie est le principal lieu de métabolisation des lipides et de la bêta-oxydation des acides gras.",
    difficulty: 2,
    tags: ["lipides", "foie"],
    examLink: null,
  },
  {
    id: "dr4",
    chapterId: "e3-ch2",
    moduleCode: "E3",
    chapterTitle: "Bilan nutritionnel",
    questionType: "open_short",
    questionText: "Comment s'appelle l'indice qui se calcule en divisant le poids (kg) par la taille (m) au carré ?",
    options: null,
    correctAnswer: "IMC",
    explanation: "L'Indice de Masse Corporelle (IMC) = Poids (kg) / Taille (m)^2. Normal : 18.5-24.9.",
    difficulty: 1,
    tags: ["IMC", "anthropometrie"],
    examLink: "Lien E3 : bilan diététique initial",
  },
  {
    id: "dr5",
    chapterId: "e2-ch6",
    moduleCode: "E2",
    chapterTitle: "Vitamines & minéraux",
    questionType: "mcq",
    questionText: "Quelle vitamine est synthétisée par la flore intestinale ?",
    options: [
      { id: "a", text: "Vitamine A", isCorrect: false },
      { id: "b", text: "Vitamine C", isCorrect: false },
      { id: "c", text: "Vitamine K", isCorrect: true },
      { id: "d", text: "Vitamine D", isCorrect: false },
    ],
    correctAnswer: "",
    explanation: "La vitamine K2 (ménaquinone) est synthétisée par les bactéries de la flore intestinale.",
    difficulty: 2,
    tags: ["vitamine K", "flore intestinale"],
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

export default function QuizDuJourClient() {
  const quiz = useQuiz(dailyReviewQuestions);

  if (quiz.finished) {
    const wrongQuestions = quiz.questions.filter((q) =>
      quiz.wrongAnswers.find((a) => a.questionId === q.id)
    );

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>

        <Card className={`text-center py-10 border ${getScoreBg(quiz.percentage)}`}>
          <Trophy className={`w-12 h-12 mx-auto mb-4 ${getScoreColor(quiz.percentage)}`} />
          <p className={`text-5xl font-medium mb-2 ${getScoreColor(quiz.percentage)}`}>{quiz.percentage}%</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{quiz.score}/{quiz.total} bonnes réponses</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            {quiz.percentage >= 80 ? "Excellent ! La répétition espacée fonctionne." : quiz.percentage >= 50 ? "Pas mal ! Continue de réviser régulièrement." : "Continue, chaque révision renforce ta mémoire."}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>Les intervalles de révision ont été mis à jour</span>
          </div>
        </Card>

        {wrongQuestions.length > 0 && (
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-coral-500" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">À revoir ({wrongQuestions.length})</h2>
            </div>
            <div className="space-y-4">
              {wrongQuestions.map((q, i) => (
                <div key={q.id} className="p-4 rounded-xl bg-coral-50/50 dark:bg-coral-900/10 border border-coral-200 dark:border-coral-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge>{q.moduleCode}</Badge>
                    <span className="text-xs text-gray-400">{q.chapterTitle}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{i + 1}. {q.questionText}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{q.explanation}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          {wrongQuestions.length > 0 && (
            <Button variant="coral" className="flex-1" onClick={() => quiz.restart(true)}>
              <RotateCcw className="w-4 h-4 mr-2" /> Revoir les erreurs
            </Button>
          )}
          <Link href="/dashboard" className="flex-1">
            <Button className="w-full">Retour au dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const q = quiz.currentQuestion;
  if (!q) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Dashboard
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-500" />
            Quiz du jour
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Répétition espacée — {quiz.total} questions à réviser</p>
        </div>
        <Badge variant="coral">{quiz.currentIndex + 1}/{quiz.total}</Badge>
      </div>

      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
        <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${((quiz.currentIndex + 1) / quiz.total) * 100}%` }} />
      </div>

      <div className={`transition-all duration-200 ${quiz.transitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge>{q.moduleCode}</Badge>
              <span className="text-xs text-gray-400">{q.chapterTitle}</span>
            </div>
            <BookmarkButton contentType="question" contentId={q.id} size="sm" />
          </div>

          <p className="text-gray-900 dark:text-white font-medium mb-6 leading-relaxed" style={{ fontSize: "15px", lineHeight: "1.6" }}>
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
                  <button key={opt.id} onClick={() => quiz.selectOption(opt.id)} className={`${cls} w-full text-left flex items-center gap-3`} disabled={quiz.validated}>
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
                let cls = "border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer transition-all text-center hover:border-emerald-400";
                if (quiz.validated) {
                  if (opt.isCorrect) cls = "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 text-center";
                  else if (quiz.selectedOption === opt.id) cls = "border-2 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-center";
                  else cls = "border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center opacity-40";
                } else if (quiz.selectedOption === opt.id) {
                  cls = "border-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 text-center";
                }
                return (
                  <button key={opt.id} onClick={() => quiz.selectOption(opt.id)} className={cls} disabled={quiz.validated}>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{opt.text}</span>
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
                className="w-full h-24 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none text-sm"
              />
              {quiz.validated && (
                <p className="mt-2 text-sm">
                  <span className="text-gray-500">Réponse attendue : </span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">{q.correctAnswer}</span>
                </p>
              )}
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
                {q.examLink && <p className="text-sm text-emerald-600 dark:text-emerald-400 italic mt-3">{q.examLink}</p>}
                {q.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {q.tags.map((tag) => (<Badge key={tag} variant="gray">{tag}</Badge>))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Score : {quiz.score}/{quiz.currentIndex + (quiz.validated ? 1 : 0)}</span>
        {!quiz.validated ? (
          <Button onClick={quiz.validate} disabled={(q.questionType !== "open_short" && !quiz.selectedOption) || (q.questionType === "open_short" && !quiz.userTextAnswer.trim())}>
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
