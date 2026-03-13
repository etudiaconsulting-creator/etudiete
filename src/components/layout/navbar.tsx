"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/layout/theme-provider";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#0f1117]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">E</span>
            </div>
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              ETUDIET
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#programme"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Programme
            </Link>
            <Link
              href="/simulateur"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Simulateur
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Tarifs
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Se connecter
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Commencer gratuitement</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f1117] px-4 py-4 space-y-3">
          <Link
            href="/#programme"
            className="block text-sm text-gray-600 dark:text-gray-300 py-2"
            onClick={() => setMobileOpen(false)}
          >
            Programme
          </Link>
          <Link
            href="/simulateur"
            className="block text-sm text-gray-600 dark:text-gray-300 py-2"
            onClick={() => setMobileOpen(false)}
          >
            Simulateur
          </Link>
          <Link
            href="/pricing"
            className="block text-sm text-gray-600 dark:text-gray-300 py-2"
            onClick={() => setMobileOpen(false)}
          >
            Tarifs
          </Link>
          <Link
            href="/blog"
            className="block text-sm text-gray-600 dark:text-gray-300 py-2"
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <Link href="/auth/login" className="block">
              <Button variant="outline" className="w-full">
                Se connecter
              </Button>
            </Link>
            <Link href="/auth/register" className="block">
              <Button className="w-full">Commencer gratuitement</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
