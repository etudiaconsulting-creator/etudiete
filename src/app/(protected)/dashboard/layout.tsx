import { Metadata } from "next";
import { AuthProvider } from "@/components/layout/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardNavbar } from "@/components/layout/dashboard-navbar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Tableau de bord ETUDIET — Suivi de ta progression BTS Diététique.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-[#0a0b10]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardNavbar />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 lg:pb-6">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
