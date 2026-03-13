"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Découverte",
    price: "0",
    period: "",
    description: "Pour découvrir la plateforme",
    features: [
      "Diagnostic de positionnement",
      "3 fiches par module",
      "10 questions par module",
      "1 exercice type",
    ],
    cta: "Commencer gratuitement",
    variant: "outline" as const,
    highlighted: false,
    href: "/auth/register",
  },
  {
    name: "Programme complet",
    price: "12,90",
    period: "/mois",
    description: "Flexible, sans engagement",
    features: [
      "Tout le contenu illimité",
      "Programme personnalisé semaine par semaine",
      "Quiz à répétition espacée",
      "Exercices format examen + corrections modèles",
      "BTS blancs",
    ],
    cta: "S'abonner",
    variant: "primary" as const,
    highlighted: true,
    badge: "Le plus populaire",
    priceId: "price_1TAJm5G7wy7ZH18LRm3TikkV",
  },
  {
    name: "Objectif BTS",
    price: "99",
    period: "/an",
    description: "Le meilleur rapport qualité-prix",
    features: [
      "Tout du plan mensuel",
      "Économie de 30%",
      "Garantie diplôme ou remboursé*",
    ],
    cta: "S'abonner",
    variant: "primary" as const,
    highlighted: false,
    savings: "soit 8,25€/mois",
    priceId: "price_1TAJnfG7wy7ZH18L1vq2dIhK",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    setLoading(priceId);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const { url, error } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        console.error("Checkout error:", error);
        if (res.status === 401) {
          window.location.href = "/auth/register";
        }
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen py-20 sm:py-24 bg-white dark:bg-[#0f1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-medium text-gray-900 dark:text-white">
            Tarifs
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Commence gratuitement et passe à un plan payant quand tu es prêt.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.highlighted
                  ? "border-emerald-400 dark:border-emerald-600 ring-1 ring-emerald-400 dark:ring-emerald-600"
                  : ""
              }`}
            >
              {plan.highlighted && plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>{plan.badge}</Badge>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {plan.description}
                </p>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-medium text-gray-900 dark:text-white">
                  {plan.price}&euro;
                </span>
                {plan.period && (
                  <span className="text-gray-500 dark:text-gray-400">
                    {plan.period}
                  </span>
                )}
              </div>
              {"savings" in plan && plan.savings && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-6">
                  {plan.savings}
                </p>
              )}
              {!("savings" in plan) && <div className="mb-6" />}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              {plan.href ? (
                <Link href={plan.href} className="block">
                  <Button variant={plan.variant} className="w-full">
                    {plan.cta}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant={plan.variant}
                  className="w-full"
                  onClick={() => handleSubscribe(plan.priceId!)}
                  disabled={loading === plan.priceId}
                >
                  {loading === plan.priceId ? "Redirection..." : plan.cta}
                </Button>
              )}
            </Card>
          ))}
        </div>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8">
          * Sous conditions. Voir CGV.
        </p>
      </div>
    </div>
  );
}
