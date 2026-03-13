import dynamic from "next/dynamic";

const QuizDuJourClient = dynamic(
  () => import("@/components/quiz/quiz-du-jour-client"),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 dark:text-gray-500 animate-pulse">
          Chargement du quiz du jour...
        </p>
      </div>
    ),
  }
);

export default function QuizDuJourPage() {
  return <QuizDuJourClient />;
}
