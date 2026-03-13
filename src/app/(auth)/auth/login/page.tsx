"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
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
          Connexion
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Connecte-toi pour accéder à tes révisions
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
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
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-sm text-coral-600 bg-coral-50 dark:bg-coral-900/20 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
        Pas encore de compte ?{" "}
        <Link
          href="/auth/register"
          className="text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Créer un compte
        </Link>
      </p>
    </Card>
  );
}
