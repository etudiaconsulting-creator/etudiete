"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Zap,
  ClipboardList,
  Wrench,
  AlertTriangle,
  Star,
  BarChart3,
  Flag,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/layout/theme-provider";
import { useDueQuestions } from "@/lib/hooks/use-due-questions";
import { useBookmarkCount } from "@/lib/hooks/use-bookmark-count";
import { useAuth } from "@/components/layout/auth-provider";

const modules = [
  { code: "E1", title: "Anglais" },
  { code: "E2", title: "Biologie & physiopatho" },
  { code: "E3", title: "Démarche de soin" },
  { code: "E4", title: "Alimentation saine" },
  { code: "E5", title: "Santé publique" },
];

const outilsItems = [
  { href: "/dashboard/outils/calculateur", label: "Calculateur nutritionnel" },
  { href: "/dashboard/outils/simulateur", label: "Simulateur de moyenne" },
  { href: "/dashboard/glossaire", label: "Glossaire" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(false);
  const [outilsOpen, setOutilsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { theme, toggleTheme } = useTheme();
  const { count: dueQuestions } = useDueQuestions();
  const { count: bookmarkCount } = useBookmarkCount();
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    }
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  const isOutilsActive = () =>
    pathname.startsWith("/dashboard/outils") || pathname.startsWith("/dashboard/glossaire");

  const linkClass = (href: string) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
      isActive(href)
        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
    }`;

  const separator = (
    <div className="my-2 border-t border-gray-200 dark:border-gray-700 mx-3" />
  );

  return (
    <>
      {/* ══════════════════════════════════════ */}
      {/* Desktop sidebar                       */}
      {/* ══════════════════════════════════════ */}
      <aside
        className={`hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f1117] transition-all ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">E</span>
            </div>
            {!collapsed && (
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                ETUDIET
              </span>
            )}
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {/* Admin link — visible only for admins */}
          {isAdmin && (
            <>
              <Link href="/admin" className={linkClass("/admin")}>
                <Shield className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>Administration</span>}
              </Link>
              {separator}
            </>
          )}

          {/* 1. Dashboard */}
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Dashboard</span>}
          </Link>

          {/* 2. Mes modules (sub-menu) */}
          <div>
            <button
              onClick={() => setModulesOpen(!modulesOpen)}
              className={`w-full ${linkClass("/dashboard/modules")}`}
            >
              <BookOpen className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">Mes modules</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      modulesOpen ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>
            {modulesOpen && !collapsed && (
              <div className="ml-8 mt-1 space-y-0.5">
                {modules.map((mod) => (
                  <Link
                    key={mod.code}
                    href={`/dashboard/modules/${mod.code}`}
                    className={`block px-3 py-2 rounded-lg text-xs transition-colors ${
                      pathname === `/dashboard/modules/${mod.code}`
                        ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="font-medium">{mod.code}</span>{" "}
                    <span className="hidden xl:inline">— {mod.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 3. Quiz du jour */}
          <Link href="/dashboard/quiz-du-jour" className={linkClass("/dashboard/quiz-du-jour")}>
            <Zap className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1">Quiz du jour</span>
                {dueQuestions > 0 && (
                  <span className="bg-coral-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {dueQuestions}
                  </span>
                )}
              </>
            )}
            {collapsed && dueQuestions > 0 && (
              <span className="absolute top-0 right-0 bg-coral-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {dueQuestions}
              </span>
            )}
          </Link>

          {/* 4. Exercices */}
          <Link href="/dashboard/exercises" className={linkClass("/dashboard/exercises")}>
            <ClipboardList className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Exercices</span>}
          </Link>

          {/* ─── séparateur ─── */}
          {separator}

          {/* 5. Outils (sub-menu) */}
          <div>
            <button
              onClick={() => setOutilsOpen(!outilsOpen)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isOutilsActive()
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <Wrench className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">Outils</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      outilsOpen ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>
            {outilsOpen && !collapsed && (
              <div className="ml-8 mt-1 space-y-0.5">
                {outilsItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg text-xs transition-colors ${
                      isActive(item.href)
                        ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 6. Erreurs fréquentes */}
          <Link href="/dashboard/erreurs-frequentes" className={linkClass("/dashboard/erreurs-frequentes")}>
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Erreurs fréquentes</span>}
          </Link>

          {/* 7. Mes favoris */}
          <Link href="/dashboard/favoris" className={linkClass("/dashboard/favoris")}>
            <Star className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1">Mes favoris</span>
                {bookmarkCount > 0 && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {bookmarkCount}
                  </span>
                )}
              </>
            )}
          </Link>

          {/* ─── séparateur ─── */}
          {separator}

          {/* 8. Progression */}
          <Link href="/dashboard/progress" className={linkClass("/dashboard/progress")}>
            <BarChart3 className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Progression</span>}
          </Link>

          {/* 9. Jour J */}
          <Link href="/dashboard/jour-j" className={linkClass("/dashboard/jour-j")}>
            <Flag className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Jour J</span>}
          </Link>

          {/* ─── séparateur ─── */}
          {separator}

          {/* 10. Paramètres */}
          <Link href="/dashboard/settings" className={linkClass("/dashboard/settings")}>
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Paramètres</span>}
          </Link>
        </nav>

        {/* Bottom section */}
        <div className="p-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 w-full transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Déconnexion</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 w-full transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span>Réduire</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════ */}
      {/* Mobile bottom bar                     */}
      {/* ══════════════════════════════════════ */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f1117] px-2 py-1.5">
        <div className="flex items-center justify-around">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs ${
              pathname === "/dashboard"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-gray-400"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Accueil</span>
          </Link>
          <Link
            href="/dashboard/quiz-du-jour"
            className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs ${
              pathname.includes("/quiz")
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-gray-400"
            }`}
          >
            <Zap className="w-5 h-5" />
            {dueQuestions > 0 && (
              <span className="absolute -top-0.5 right-1 bg-coral-600 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                {dueQuestions}
              </span>
            )}
            <span>Quiz</span>
          </Link>
          <Link
            href="/dashboard/modules"
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs ${
              pathname.includes("/modules")
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-gray-400"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Modules</span>
          </Link>
          <Link
            href="/dashboard/progress"
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs ${
              pathname.includes("/progress")
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-gray-400"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Stats</span>
          </Link>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs text-gray-400"
          >
            <Menu className="w-5 h-5" />
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════ */}
      {/* Mobile drawer                         */}
      {/* ══════════════════════════════════════ */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setDrawerOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-[#0f1117] rounded-t-2xl max-h-[85vh] overflow-y-auto transition-transform duration-300 ${
            drawerOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              Menu
            </span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="px-3 py-3 space-y-1">
            <DrawerLink href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active={pathname === "/dashboard"} onClose={() => setDrawerOpen(false)} />
            <DrawerLink href="/dashboard/modules" icon={<BookOpen className="w-5 h-5" />} label="Mes modules" active={pathname.includes("/modules")} onClose={() => setDrawerOpen(false)} />
            <DrawerLink href="/dashboard/quiz-du-jour" icon={<Zap className="w-5 h-5" />} label="Quiz du jour" active={pathname.includes("/quiz")} onClose={() => setDrawerOpen(false)} badge={dueQuestions > 0 ? dueQuestions : undefined} />
            <DrawerLink href="/dashboard/exercises" icon={<ClipboardList className="w-5 h-5" />} label="Exercices" active={pathname.includes("/exercises")} onClose={() => setDrawerOpen(false)} />

            <div className="my-2 border-t border-gray-200 dark:border-gray-700 mx-3" />

            <DrawerLink href="/dashboard/outils/calculateur" icon={<Wrench className="w-5 h-5" />} label="Calculateur nutritionnel" active={pathname.includes("/outils/calculateur")} onClose={() => setDrawerOpen(false)} />
            <DrawerLink href="/dashboard/outils/simulateur" icon={<Wrench className="w-5 h-5" />} label="Simulateur de moyenne" active={pathname.includes("/outils/simulateur")} onClose={() => setDrawerOpen(false)} />
            <DrawerLink href="/dashboard/glossaire" icon={<Wrench className="w-5 h-5" />} label="Glossaire" active={pathname.includes("/glossaire")} onClose={() => setDrawerOpen(false)} />
            <DrawerLink href="/dashboard/erreurs-frequentes" icon={<AlertTriangle className="w-5 h-5" />} label="Erreurs fréquentes" active={pathname.includes("/erreurs-frequentes")} onClose={() => setDrawerOpen(false)} />
            <DrawerLink href="/dashboard/favoris" icon={<Star className="w-5 h-5" />} label="Mes favoris" active={pathname.includes("/favoris")} onClose={() => setDrawerOpen(false)} badge={bookmarkCount > 0 ? bookmarkCount : undefined} />

            <div className="my-2 border-t border-gray-200 dark:border-gray-700 mx-3" />

            <DrawerLink href="/dashboard/progress" icon={<BarChart3 className="w-5 h-5" />} label="Progression" active={pathname.includes("/progress")} onClose={() => setDrawerOpen(false)} />
            <DrawerLink href="/dashboard/jour-j" icon={<Flag className="w-5 h-5" />} label="Jour J" active={pathname.includes("/jour-j")} onClose={() => setDrawerOpen(false)} />

            <div className="my-2 border-t border-gray-200 dark:border-gray-700 mx-3" />

            <DrawerLink href="/dashboard/settings" icon={<Settings className="w-5 h-5" />} label="Paramètres" active={pathname.includes("/settings")} onClose={() => setDrawerOpen(false)} />
          </div>

          {/* Bottom actions */}
          <div className="px-3 py-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
            <button
              onClick={() => { toggleTheme(); setDrawerOpen(false); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 w-full transition-colors"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
            </button>
            <button
              onClick={() => { handleLogout(); setDrawerOpen(false); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 w-full transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Drawer link helper ── */
function DrawerLink({
  href,
  icon,
  label,
  active,
  onClose,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClose: () => void;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
        active
          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="bg-coral-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
}
