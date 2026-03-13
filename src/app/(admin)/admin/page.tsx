"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Users, BookOpen, FileText, HelpCircle, ClipboardList } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Stats {
  totalUsers: number;
  paidUsers: number;
  modules: number;
  chapters: number;
  questions: number;
  exercises: number;
}

interface RecentUser {
  id: string;
  full_name: string;
  created_at: string;
  subscription_status: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, paidUsers: 0, modules: 0, chapters: 0, questions: 0, exercises: 0 });
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function fetchStats() {
      const [users, modules, chapters, questions, exercises] = await Promise.all([
        supabase.from("profiles").select("id, full_name, subscription_status, created_at", { count: "exact" }),
        supabase.from("modules").select("*", { count: "exact", head: true }),
        supabase.from("chapters").select("*", { count: "exact", head: true }),
        supabase.from("questions").select("*", { count: "exact", head: true }),
        supabase.from("exam_exercises").select("*", { count: "exact", head: true }),
      ]);

      const allUsers = (users.data || []) as unknown as RecentUser[];
      const paid = allUsers.filter((u) => u.subscription_status === "monthly" || u.subscription_status === "yearly" || u.subscription_status === "lifetime");

      setStats({
        totalUsers: users.count ?? 0,
        paidUsers: paid.length,
        modules: modules.count ?? 0,
        chapters: chapters.count ?? 0,
        questions: questions.count ?? 0,
        exercises: exercises.count ?? 0,
      });

      const sorted = [...allUsers].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRecentUsers(sorted.slice(0, 5));
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-pulse text-gray-400">Chargement...</div></div>;
  }

  const cards = [
    { label: "Utilisateurs", value: stats.totalUsers, icon: Users, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
    { label: "Abonnés payants", value: stats.paidUsers, icon: Users, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "Modules", value: stats.modules, icon: BookOpen, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" },
    { label: "Chapitres", value: stats.chapters, icon: FileText, color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20" },
    { label: "Questions", value: stats.questions, icon: HelpCircle, color: "text-pink-600 bg-pink-50 dark:bg-pink-900/20" },
    { label: "Exercices", value: stats.exercises, icon: ClipboardList, color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Tableau de bord</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-medium text-gray-900 dark:text-white">{c.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{c.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Dernières inscriptions</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">Nom</th>
              <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">Abonnement</th>
              <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((u) => (
              <tr key={u.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                <td className="py-2.5 text-gray-700 dark:text-gray-300">{u.full_name || "—"}</td>
                <td className="py-2.5">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                    u.subscription_status === "free"
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                  }`}>
                    {u.subscription_status}
                  </span>
                </td>
                <td className="py-2.5 text-gray-500 dark:text-gray-400">{new Date(u.created_at).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
