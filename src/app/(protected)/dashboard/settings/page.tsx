"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Moon,
  Sun,
  RefreshCw,
  Trash2,
  AlertTriangle,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/layout/auth-provider";
import { useTheme } from "@/components/layout/theme-provider";
import { createClient } from "@/lib/supabase/client";
import { generateProgram } from "@/lib/utils/program-generator";
import { ProgramDuration } from "@/types/database";
import { hasFullAccess } from "@/lib/utils/subscription";

export default function SettingsPage() {
  const { profile, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [fullName, setFullName] = useState("");
  const [examYear, setExamYear] = useState("2027");
  const [currentYear, setCurrentYear] = useState("1");
  const [programDuration, setProgramDuration] = useState<string>("12months");

  // Sync form state when profile loads
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setExamYear(String(profile.exam_year || 2027));
      setCurrentYear(String(profile.current_year || 1));
      setProgramDuration(profile.program_duration || "12months");
    }
  }, [profile]);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [regenerated, setRegenerated] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [portalLoading, setPortalLoading] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            full_name: fullName,
            exam_year: parseInt(examYear),
            current_year: parseInt(currentYear),
            program_duration: programDuration,
          } as never)
          .eq("id", user.id);
        if (updateError) throw updateError;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerateProgram = async () => {
    if (!profile) return;
    setRegenerating(true);
    try {
      const examDate = new Date(profile.exam_year, 5, 15);
      const startDate = new Date();
      generateProgram({
        examDate,
        startDate,
        programDuration: programDuration as ProgramDuration,
      });
      setRegenerated(true);
      setTimeout(() => setRegenerated(false), 3000);
    } catch (error) {
      console.error("Error regenerating program:", error);
    } finally {
      setRegenerating(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Delete user data first
        await supabase.from("user_exercise_attempts").delete().eq("user_id", user.id);
        await supabase.from("user_question_history").delete().eq("user_id", user.id);
        await supabase.from("user_progress").delete().eq("user_id", user.id);
        await supabase.from("profiles").delete().eq("id", user.id);
        // Sign out
        await supabase.auth.signOut();
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Une erreur est survenue lors de la suppression. Contacte le support.");
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Portal error:", err);
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au dashboard
      </Link>

      <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
        Paramètres
      </h1>

      {/* Card 1: Informations personnelles */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Informations personnelles
        </h2>
        <div className="space-y-4">
          <Input
            id="fullName"
            label="Nom complet"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                Année d'examen
              </label>
              <select
                value={examYear}
                onChange={(e) => setExamYear(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
                Année d'études
              </label>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="1">1ère année</option>
                <option value="2">2ème année</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">
              Durée du programme
            </label>
            <select
              value={programDuration}
              onChange={(e) => setProgramDuration(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="1month">1 mois (intensif)</option>
              <option value="3months">3 mois</option>
              <option value="6months">6 mois</option>
              <option value="12months">12 mois</option>
              <option value="24months">24 mois (complet)</option>
            </select>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Enregistrement..." : saved ? "Enregistré !" : "Sauvegarder"}
          </Button>
        </div>
      </Card>

      {/* Card 2: Apparence */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Apparence
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "dark" ? (
              <Moon className="w-5 h-5 text-gray-900 dark:text-white" />
            ) : (
              <Sun className="w-5 h-5 text-gray-900 dark:text-white" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Mode sombre
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Changer l'apparence de l'application
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              theme === "dark" ? "bg-emerald-600" : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                theme === "dark" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </Card>

      {/* Card 3: Programme de revision */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Programme de révision
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Ton planning est généré automatiquement en fonction de ta date d'examen et de la durée choisie.
        </p>
        <div>
          <Button
            variant="outline"
            onClick={handleRegenerateProgram}
            disabled={regenerating}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${regenerating ? "animate-spin" : ""}`}
            />
            {regenerating
              ? "Régénération..."
              : regenerated
              ? "Planning régénéré !"
              : "Régénérer le planning"}
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Cela recalculera ton planning en fonction de tes paramètres actuels.
          </p>
        </div>
      </Card>

      {/* Card 4: Abonnement */}
      <Card>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Abonnement
        </h2>
        {hasFullAccess(profile?.subscription_status, profile?.role) ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-sm text-gray-900 dark:text-white font-medium capitalize">
                  Plan {profile?.subscription_status}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Accès complet à tous les modules
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleManageSubscription}
              disabled={portalLoading}
            >
              {portalLoading ? "Chargement..." : "Gérer"}
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-900 dark:text-white font-medium">
                Plan gratuit
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Accès limité au module E1
              </p>
            </div>
            <Link href="/pricing">
              <Button variant="coral" size="sm">
                Passer à Premium
              </Button>
            </Link>
          </div>
        )}
      </Card>

      {/* Card 5: Zone dangereuse */}
      <Card className="border-red-200 dark:border-red-900/50">
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
          <h2 className="text-lg font-medium text-red-600 dark:text-red-400">
            Supprimer mon compte
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          La suppression de ton compte est définitive. Toutes tes données de progression seront perdues.
        </p>
        {!showDeleteConfirm ? (
          <Button
            variant="coral"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Supprimer mon compte
          </Button>
        ) : (
          <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                Cette action est irréversible
              </span>
            </div>
            <div className="mb-4">
              <Input
                label="Tape SUPPRIMER pour confirmer"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
              />
            </div>
            <Button
              variant="coral"
              size="sm"
              disabled={deleteConfirmText !== "SUPPRIMER"}
              onClick={handleConfirmDelete}
            >
              Confirmer la suppression
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
