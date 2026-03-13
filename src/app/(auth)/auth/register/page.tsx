"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [examYear, setExamYear] = useState("2027");
  const [currentYear, setCurrentYear] = useState("1");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          exam_year: parseInt(examYear),
          current_year: parseInt(currentYear),
        } as never)
        .eq("id", data.user.id);
      if (profileError) {
        console.error("Profile update error:", profileError);
      }
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <span className="text-white text-sm font-medium">E</span>
          </div>
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            ETUDIET
          </span>
        </Link>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          Créer un compte
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Commence tes révisions gratuitement
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <Input
          id="fullName"
          label="Nom complet"
          type="text"
          placeholder="Marie Dupont"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="ton@email.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          label="Mot de passe"
          type="password"
          placeholder="8 caractères minimum"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="examYear"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Année d&apos;examen
            </label>
            <select
              id="examYear"
              value={examYear}
              onChange={(e) => setExamYear(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            >
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="currentYear"
              className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Année d&apos;études
            </label>
            <select
              id="currentYear"
              value={currentYear}
              onChange={(e) => setCurrentYear(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            >
              <option value="1">1ère année</option>
              <option value="2">2ème année</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="text-sm text-coral-600 bg-coral-50 dark:bg-coral-900/20 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Inscription..." : "Créer mon compte"}
        </Button>
      </form>

      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
        Déjà un compte ?{" "}
        <Link
          href="/auth/login"
          className="text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </Card>
  );
}
