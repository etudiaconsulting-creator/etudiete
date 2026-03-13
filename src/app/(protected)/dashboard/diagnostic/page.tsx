import dynamic from "next/dynamic";

const DiagnosticPageClient = dynamic(
  () => import("@/components/diagnostic/diagnostic-page-client"),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 dark:text-gray-500 animate-pulse">
          Chargement du diagnostic...
        </p>
      </div>
    ),
  }
);

export default function DiagnosticPage() {
  return <DiagnosticPageClient />;
}
