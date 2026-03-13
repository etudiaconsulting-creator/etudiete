"use client";

import { useState, useCallback } from "react";
import { calculateNextReview } from "@/lib/utils/spaced-repetition";
import { createClient } from "@/lib/supabase/client";

export interface QuizQuestion {
  id: string;
  chapterId: string;
  moduleCode: string;
  chapterTitle: string;
  questionType: "mcq" | "true_false" | "open_short";
  questionText: string;
  options: { id: string; text: string; isCorrect: boolean }[] | null;
  correctAnswer: string;
  explanation: string;
  difficulty: number;
  tags: string[];
  examLink: string | null;
}

export interface AnswerRecord {
  questionId: string;
  correct: boolean;
  selectedOptionId?: string;
  userAnswer?: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  selectedOption: string | null;
  userTextAnswer: string;
  validated: boolean;
  isCorrect: boolean | null;
  answers: AnswerRecord[];
  finished: boolean;
  score: number;
  total: number;
  transitioning: boolean;
}

const initialState: Omit<QuizState, "questions" | "total"> = {
  currentIndex: 0,
  selectedOption: null,
  userTextAnswer: "",
  validated: false,
  isCorrect: null,
  answers: [],
  finished: false,
  score: 0,
  transitioning: false,
};

export function useQuiz(questions: QuizQuestion[]) {
  const [state, setState] = useState<QuizState>({
    ...initialState,
    questions,
    total: questions.length,
  });

  const supabase = createClient();
  const currentQuestion = state.questions[state.currentIndex];

  const selectOption = useCallback((optionId: string) => {
    if (state.validated) return;
    setState((s) => ({ ...s, selectedOption: optionId }));
  }, [state.validated]);

  const setTextAnswer = useCallback((text: string) => {
    if (state.validated) return;
    setState((s) => ({ ...s, userTextAnswer: text }));
  }, [state.validated]);

  const validate = useCallback(async () => {
    if (state.validated) return;

    const q = state.questions[state.currentIndex];
    let correct = false;

    if (q.questionType === "mcq" || q.questionType === "true_false") {
      if (!state.selectedOption) return;
      const selectedOpt = q.options?.find((o) => o.id === state.selectedOption);
      correct = selectedOpt?.isCorrect ?? false;
    } else if (q.questionType === "open_short") {
      // Simple string comparison (case insensitive, trimmed)
      correct =
        state.userTextAnswer.trim().toLowerCase() ===
        q.correctAnswer.trim().toLowerCase();
    }

    const answer: AnswerRecord = {
      questionId: q.id,
      correct,
      selectedOptionId: state.selectedOption ?? undefined,
      userAnswer: q.questionType === "open_short" ? state.userTextAnswer : undefined,
    };

    // Update spaced repetition client-side, then send to Supabase
    try {
      const { data: existing } = await supabase
        .from("user_question_history")
        .select("review_interval_days, ease_factor")
        .eq("question_id", q.id)
        .order("answered_at", { ascending: false })
        .limit(1)
        .single() as { data: { review_interval_days: number; ease_factor: number } | null };

      const currentInterval = existing?.review_interval_days ?? 0;
      const currentEase = existing?.ease_factor ?? 2.5;

      const { nextInterval, newEaseFactor, nextReviewDate } = calculateNextReview(
        correct,
        currentInterval,
        currentEase
      );

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("user_question_history").insert({
          id: crypto.randomUUID(),
          user_id: user.id,
          question_id: q.id,
          answered_correctly: correct,
          answered_at: new Date().toISOString(),
          next_review_at: nextReviewDate.toISOString(),
          review_interval_days: nextInterval,
          ease_factor: newEaseFactor,
        } as never);
      }
    } catch {
      // Silent fail — quiz continues even if DB update fails
    }

    setState((s) => ({
      ...s,
      validated: true,
      isCorrect: correct,
      score: correct ? s.score + 1 : s.score,
      answers: [...s.answers, answer],
    }));
  }, [state, supabase]);

  const next = useCallback(() => {
    if (state.currentIndex + 1 >= state.questions.length) {
      setState((s) => ({ ...s, finished: true }));
      return;
    }

    // Trigger transition animation
    setState((s) => ({ ...s, transitioning: true }));
    setTimeout(() => {
      setState((s) => ({
        ...s,
        currentIndex: s.currentIndex + 1,
        selectedOption: null,
        userTextAnswer: "",
        validated: false,
        isCorrect: null,
        transitioning: false,
      }));
    }, 200);
  }, [state.currentIndex, state.questions.length]);

  const restart = useCallback((onlyErrors = false) => {
    const newQuestions = onlyErrors
      ? state.questions.filter((q) =>
          state.answers.find((a) => a.questionId === q.id && !a.correct)
        )
      : state.questions;

    setState({
      ...initialState,
      questions: newQuestions,
      total: newQuestions.length,
    });
  }, [state.questions, state.answers]);

  const wrongAnswers = state.answers.filter((a) => !a.correct);
  const percentage = state.total > 0 ? Math.round((state.score / state.total) * 100) : 0;

  return {
    ...state,
    currentQuestion,
    percentage,
    wrongAnswers,
    selectOption,
    setTextAnswer,
    validate,
    next,
    restart,
  };
}
