import { Suspense } from "react";
import GlossaireClient from "@/components/glossaire/glossaire-client";

export default function GlossairePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-pulse text-gray-400">Chargement...</div></div>}>
      <GlossaireClient />
    </Suspense>
  );
}
