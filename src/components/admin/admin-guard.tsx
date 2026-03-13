"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/layout/auth-provider";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!profile || profile.role !== "admin")) {
      router.replace("/dashboard");
    }
  }, [profile, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-[#0a0b10]">
        <div className="animate-pulse text-gray-400">Chargement...</div>
      </div>
    );
  }

  if (!profile || profile.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
