"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type ReactNode } from "react";

interface PaywallProps {
  children?: ReactNode;
  message?: string;
}

export function Paywall({ children, message }: PaywallProps) {
  return (
    <div className="relative">
      {/* Blurred content preview */}
      {children && (
        <div className="blur-sm pointer-events-none select-none opacity-50" aria-hidden="true">
          {children}
        </div>
      )}

      {/* Overlay */}
      <div className={`${children ? "absolute inset-0" : ""} flex items-center justify-center`}>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center max-w-sm mx-auto shadow-lg">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Contenu Premium
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {message || "Cette fiche fait partie du programme complet. Abonne-toi pour débloquer tout le contenu."}
          </p>
          <Link href="/pricing">
            <Button className="w-full">
              Débloquer tout le programme
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
