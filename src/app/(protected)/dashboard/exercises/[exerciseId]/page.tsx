import dynamic from "next/dynamic";

const ExercisePageClient = dynamic(
  () => import("@/components/exercises/exercise-page-client"),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 dark:text-gray-500 animate-pulse">
          Chargement de l'exercice...
        </p>
      </div>
    ),
  }
);

export default function ExercisePage() {
  return <ExercisePageClient />;
}
