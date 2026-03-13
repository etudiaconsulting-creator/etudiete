import dynamic from "next/dynamic";

const QuizPageClient = dynamic(
  () => import("@/components/quiz/quiz-page-client"),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 dark:text-gray-500 animate-pulse">
          Chargement du quiz...
        </p>
      </div>
    ),
  }
);

export default function QuizPage() {
  return <QuizPageClient />;
}
