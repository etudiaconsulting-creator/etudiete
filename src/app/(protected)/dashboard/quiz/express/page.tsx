import dynamic from "next/dynamic";

const ExpressQuizClient = dynamic(
  () => import("@/components/quiz/express-quiz-client"),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 dark:text-gray-500 animate-pulse">
          Chargement...
        </p>
      </div>
    ),
  }
);

export default function ExpressQuizPage() {
  return <ExpressQuizClient />;
}
