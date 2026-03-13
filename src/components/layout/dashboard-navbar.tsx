"use client";

import { Menu, Moon, Sun, Bell, Shield } from "lucide-react";
import { useTheme } from "@/components/layout/theme-provider";
import { useAuth } from "@/components/layout/auth-provider";

interface DashboardNavbarProps {
  onMenuClick?: () => void;
}

export function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { profile } = useAuth();

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f1117] flex items-center px-4 gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1" />

      <button
        className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
      </button>

      {profile?.role === "admin" && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
          <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Admin</span>
        </div>
      )}

      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </header>
  );
}
