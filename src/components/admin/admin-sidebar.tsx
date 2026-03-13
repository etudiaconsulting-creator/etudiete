"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  HelpCircle,
  ClipboardList,
  Calendar,
  BookA,
  AlertTriangle,
  PenLine,
  Users,
  ArrowLeft,
  Shield,
} from "lucide-react";

const links = [
  { href: "/admin", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/admin/modules", icon: BookOpen, label: "Modules" },
  { href: "/admin/chapters", icon: FileText, label: "Chapitres" },
  { href: "/admin/questions", icon: HelpCircle, label: "Questions" },
  { href: "/admin/exercises", icon: ClipboardList, label: "Exercices" },
  { href: "/admin/weekly-objectives", icon: Calendar, label: "Programmes hebdo" },
  { href: "/admin/glossary", icon: BookA, label: "Glossaire" },
  { href: "/admin/common-mistakes", icon: AlertTriangle, label: "Erreurs fréquentes" },
  { href: "/admin/blog", icon: PenLine, label: "Blog" },
  { href: "/admin/users", icon: Users, label: "Utilisateurs" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f1117]">
      {/* Header */}
      <div className="h-16 flex items-center gap-2.5 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-medium text-gray-900 dark:text-white">Administration</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour au site</span>
        </Link>
      </div>
    </aside>
  );
}
