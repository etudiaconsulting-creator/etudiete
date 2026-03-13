"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  RotateCcw,
  Trophy,
  AlertTriangle,
  Sparkles,
  Zap,
  Circle,
} from "lucide-react";
import Link from "next/link";
import { useQuiz, QuizQuestion } from "@/lib/hooks/use-quiz";
import { SessionTimer } from "@/components/quiz/session-timer";
import { createClient } from "@/lib/supabase/client";

// Fallback questions when no DB data is available
const fallbackQuestions: QuizQuestion[] = [
  {
    id: "exp-q1",
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
    explanation: "La glycolyse produit 4 ATP au total mais en consomme 2. Bilan net : 2 ATP et 2 NADH.",
    difficulty: 1,
    tags: ["glycolyse", "ATP"],
    examLink: null,
  },
  {
    id: "exp-q2",
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
    explanation: "Le glycogène est la réserve glucidique ANIMALE. Chez les végétaux c'est l'amidon.",
    difficulty: 1,
    tags: ["glycogène", "amidon"],
    examLink: null,
  },
  {
    id: "exp-q3",
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
    tags: ["glucose", "énergie"],
    examLink: null,
  },
  {
    id: "exp-q4",
    chapterId: "e2-ch1",
    moduleCode: "E2",
    chapterTitle: "Biochimie structurale : glucides",
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
    tags: ["insuline", "pancréas"],
    examLink: null,
  },
  {
    id: "exp-q5",
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
    explanation: "Le lactose est le sucre du lait, composé de glucose et galactose.",
    difficulty: 1,
    tags: ["lactose", "disaccharide"],
    examLink: null,
  },
  {
    id: "exp-q6",
    chapterId: "e2-ch1",
    moduleCode: "E2",
    chapterTitle: "Biochimie structurale : glucides",
    questionType: "open_short",
    questionText: "Quel est le principal polysaccharide de réserve chez les plantes ?",
    options: null,
    correctAnswer: "amidon",
    explanation: "L'amidon est le polysaccharide de réserve des plantes, composé d'amylose et d'amylopectine.",
    difficulty: 1,
    tags: ["amidon", "polysaccharide"],
    examLink: null,
  },
  {
    id: "exp-q7",
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
    explanation: "Les acides gras saturés sont solides à température ambiante. Les insaturés sont liquides.",
    difficulty: 1,
    tags: ["acides gras", "structure"],
    examLink: null,
  },
  {
    id: "exp-q8",
    chapterId: "e3-ch1",
    moduleCode: "E3",
    chapterTitle: "Démarche de soin diététique",
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
    id: "exp-q9",
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
    explanation: "Les glucides fournissent 4 kcal/g, comme les protéines. Les lipides : 9 kcal/g.",
    difficulty: 1,
    tags: ["énergie", "nutrition"],
    examLink: null,
  },
  {
    id: "exp-q10",
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
    tags: ["glucose", "formule"],
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

function getMotivationalMessage(pct: number): string {
  if (pct >= 80) return "Excellent ! Tu maîtrises bien ce sujet.";
  if (pct >= 50) return "Pas mal ! Quelques points à revoir.";
  return "Ce chapitre mérite plus d'attention. Revois la fiche.";
}

export default function ExpressQuizClient() {
  const searchParams = useSearchParams();
  const durationParam = searchParams.get("duration");
  const duration = durationParam ? parseInt(durationParam, 10) : 15;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // Try to get due questions
          const now = new Date().toISOString();
          const { data: dueRows } = await supabase
            .from("user_question_history")
            .select("question_id")
            .eq("user_id", user.id)
            .lte("next_review_at", now)
            .order("next_review_at", { ascending: true })
            .limit(10) as { data: { question_id: string }[] | null };

          const questionIds = dueRows?.map((r) => r.question_id) || [];

          // If not enough, add most recently failed
          if (questionIds.length < 10) {
            const { data: failedRows } = await supabase
              .from("user_question_history")
              .select("question_id")
              .eq("user_id", user.id)
              .eq("answered_correctly", false)
              .order("answered_at", { ascending: false })
              .limit(10 - questionIds.length) as { data: { question_id: string }[] | null };

            const failedIds = failedRows?.map((r) => r.question_id) || [];
            for (const id of failedIds) {
              if (!questionIds.includes(id)) questionIds.push(id);
            }
          }

          // Fetch actual questions from DB
          if (questionIds.length > 0) {
            const { data: dbQuestions } = await supabase
              .from("questions")
              .select("*")
              .in("id", questionIds) as { data: Array<{
                id: string;
                chapter_id: string;
                module_id: string;
                question_type: string;
                question_text: string;
                options: Array<{ id: string; text: string; is_correct: boolean }> | null;
                correct_answer: string;
                explanation: string;
                difficulty: number;
                tags: string[];
                exam_link: string | null;
              }> | null };

            if (dbQuestions && dbQuestions.length > 0) {
              const mapped: QuizQuestion[] = dbQuestions.map((q) => ({
                id: q.id,
                chapterId: q.chapter_id,
                moduleCode: q.module_id,
                chapterTitle: "",
                questionType: q.question_type as "mcq" | "true_false" | "open_short",
                questionText: q.question_text,
                options: q.options?.map((o) => ({
                  id: o.id,
                  text: o.text,
                  isCorrect: o.is_correct,
                })) ?? null,
                correctAnswer: q.correct_answer,
                explanation: q.explanation,
                difficulty: q.difficulty,
                tags: q.tags || [],
                examLink: q.exam_link,
              }));
              setQuestions(mapped);
              setLoading(false);
              return;
            }
          }
        }
      } catch {
        // Fallback on any error
      }

      // Fallback to hardcoded questions
      setQuestions(fallbackQuestions);
      setLoading(false);
    }

    loadQuestions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 dark:text-gray-500 animate-pulse">
          Préparation de ta session express...
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-gray-500 dark:text-gray-400 text-center mt-12">
          Aucune question disponible pour le moment.
        </p>
        <Link href="/dashboard" className="block text-center">
          <Button>Retour au dashboard</Button>
        </Link>
      </div>
    );
  }

  return <ExpressQuizActive questions={questions} duration={duration} />;
}

function ExpressQuizActive({ questions, duration }: { questions: QuizQuestion[]; duration: number }) {
  const quiz = useQuiz(questions);

  if (quiz.finished) {
    const wrongQuestions = quiz.questions.filter((q) =>
      quiz.wrongAnswers.find((a) => a.questionId === q.id)
    );

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>

        <Card className={`text-center py-10 border ${getScoreBg(quiz.percentage)}`}>
          <Trophy className={`w-12 h-12 mx-auto mb-4 ${getScoreColor(quiz.percentage)}`} />
          <p className={`text-5xl font-medium mb-2 ${getScoreColor(quiz.percentage)}`}>
            {quiz.percentage}%
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {quiz.score}/{quiz.total} bonnes réponses
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 max-w-sm mx-auto">
            {getMotivationalMessage(quiz.percentage)}
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
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                À revoir ({wrongQuestions.length})
              </h2>
            </div>
            <div className="space-y-4">
              {wrongQuestions.map((q, i) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-coral-50/50 dark:bg-coral-900/10 border border-coral-200 dark:border-coral-800"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge>{q.moduleCode}</Badge>
                    <span className="text-xs text-gray-400">{q.chapterTitle}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {i + 1}. {q.questionText}
                  </p>
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
      <SessionTimer durationMinutes={duration} />

      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Dashboard
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-500" />
            Révision express
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {duration} min — {quiz.total} questions ciblées
          </p>
        </div>
        <Badge variant="coral">
          {quiz.currentIndex + 1}/{quiz.total}
        </Badge>
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
          <div className="flex items-center gap-2 mb-4">
            <Badge>{q.moduleCode}</Badge>
            <span className="text-xs text-gray-400">{q.chapterTitle}</span>
          </div>

          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3].map((i) => (
              <Circle
                key={i}
                className={`w-3 h-3 ${
                  i <= q.difficulty
                    ? "fill-emerald-500 text-emerald-500"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>

          <p
            className="text-gray-900 dark:text-white font-medium mb-6 leading-relaxed"
            style={{ fontSize: "15px", lineHeight: "1.6" }}
          >
            {q.questionText}
          </p>

          {q.questionType === "mcq" && q.options && (
            <div className="space-y-3">
              {q.options.map((opt) => {
                let cls =
                  "border border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-emerald-400 dark:hover:border-emerald-600";
                if (quiz.validated) {
                  if (opt.isCorrect)
                    cls =
                      "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4";
                  else if (quiz.selectedOption === opt.id)
                    cls =
                      "border-2 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl p-4";
                  else
                    cls =
                      "border border-gray-200 dark:border-gray-700 rounded-xl p-4 opacity-40";
                } else if (quiz.selectedOption === opt.id) {
                  cls =
                    "border-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4";
                }
                return (
                  <button
                    key={opt.id}
                    onClick={() => quiz.selectOption(opt.id)}
                    className={`${cls} w-full text-left flex items-center gap-3`}
                    disabled={quiz.validated}
                  >
                    {quiz.validated && opt.isCorrect && (
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    {quiz.validated && quiz.selectedOption === opt.id && !opt.isCorrect && (
                      <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          )}

          {q.questionType === "true_false" && q.options && (
            <div className="grid grid-cols-2 gap-4">
              {q.options.map((opt) => {
                let cls =
                  "border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer transition-all text-center hover:border-emerald-400 dark:hover:border-emerald-600";
                if (quiz.validated) {
                  if (opt.isCorrect)
                    cls =
                      "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 text-center";
                  else if (quiz.selectedOption === opt.id)
                    cls =
                      "border-2 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-center";
                  else
                    cls =
                      "border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center opacity-40";
                } else if (quiz.selectedOption === opt.id) {
                  cls =
                    "border-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 text-center";
                }
                return (
                  <button
                    key={opt.id}
                    onClick={() => quiz.selectOption(opt.id)}
                    className={cls}
                    disabled={quiz.validated}
                  >
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {opt.text}
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
                className="w-full h-24 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none text-sm"
              />
              {quiz.validated && (
                <p className="mt-2 text-sm">
                  <span className="text-gray-500">Réponse attendue : </span>
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
            className={`mt-4 rounded-xl p-5 border ${
              quiz.isCorrect
                ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800"
                : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
            }`}
          >
            <div className="flex items-start gap-3">
              {quiz.isCorrect ? (
                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
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
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">
          Score : {quiz.score}/{quiz.currentIndex + (quiz.validated ? 1 : 0)}
        </span>
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
            {quiz.currentIndex + 1 >= quiz.total ? "Voir le résultat" : "Suivante"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
