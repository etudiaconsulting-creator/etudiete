import dynamic from "next/dynamic";

const FavorisQuizClient = dynamic(
  () => import("@/components/quiz/favoris-quiz-client"),
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

export default function FavorisQuizPage() {
  return <FavorisQuizClient />;
}
