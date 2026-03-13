import { AuthProvider } from "@/components/layout/auth-provider";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ToastProvider } from "@/components/admin/toast";

export const metadata = {
  title: "Administration — ETUDIET",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminGuard>
        <ToastProvider>
          <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-[#0a0b10]">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </ToastProvider>
      </AdminGuard>
    </AuthProvider>
  );
}
