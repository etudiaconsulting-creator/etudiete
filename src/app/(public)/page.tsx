import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import {
  CalendarDays,
  FileCheck2,
  Brain,
  ArrowRight,
  Check,
  ClipboardList,
  Target,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ETUDIET — Programme de préparation BTS Diététique et Nutrition 2027",
  description:
    "Le programme de révision qui te fait avoir ton BTS Diététique. Planning semaine par semaine, exercices format examen, répétition espacée.",
};

const features = [
  {
    icon: CalendarDays,
    title: "Programme guidé",
    description:
      "Un planning de révision semaine par semaine, adapté à ta durée de préparation. Tu sais exactement quoi réviser et quand.",
  },
  {
    icon: FileCheck2,
    title: "Format examen réel",
    description:
      "Entraîne-toi avec des sujets au format BTS : étude de cas, questions de synthèse, oral structuré. Pas de surprise le jour J.",
  },
  {
    icon: Brain,
    title: "Répétition espacée",
    description:
      "L'algorithme SM-2 identifie tes points faibles et te les représente au bon moment. Tu retiens plus longtemps, avec moins d'effort.",
  },
];

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Diagnostic initial",
    description:
      "Réponds à quelques questions pour que l'on adapte ton programme à ton niveau, tes objectifs et ton calendrier.",
  },
  {
    number: "02",
    icon: Target,
    title: "Programme personnalisé",
    description:
      "Reçois un plan de révision semaine par semaine avec les chapitres prioritaires et les objectifs à atteindre.",
  },
  {
    number: "03",
    icon: BookOpen,
    title: "Exercices format examen",
    description:
      "Entraîne-toi chaque semaine avec des exercices au format BTS et des corrections détaillées.",
  },
];

const plans = [
  {
    name: "Gratuit",
    price: "0",
    period: "",
    description: "Pour découvrir la plateforme",
    features: [
      "Accès au module E1",
      "10 questions par chapitre",
      "1 exercice format examen",
      "Suivi de progression basique",
    ],
    cta: "Commencer gratuitement",
    variant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Annuel",
    price: "99",
    period: "/an",
    description: "Le meilleur rapport qualité-prix",
    features: [
      "Accès à tous les modules (E1-E5)",
      "Questions illimitées",
      "Tous les exercices format examen",
      "Répétition espacée complète",
      "Programme personnalisé",
      "Corrections détaillées",
    ],
    cta: "Choisir le plan annuel",
    variant: "primary" as const,
    highlighted: true,
    badge: "Le plus populaire",
  },
  {
    name: "Mensuel",
    price: "12,90",
    period: "/mois",
    description: "Flexible, sans engagement",
    features: [
      "Accès à tous les modules (E1-E5)",
      "Questions illimitées",
      "Tous les exercices format examen",
      "Répétition espacée complète",
      "Programme personnalisé",
    ],
    cta: "Commencer maintenant",
    variant: "outline" as const,
    highlighted: false,
  },
];

const faqItems = [
  {
    question: "Le programme est-il adapté au nouveau référentiel 2027 ?",
    answer:
      "Oui, ETUDIET est entièrement conçu pour le nouveau référentiel du BTS Diététique qui entre en vigueur en 2027. Tous les modules, chapitres et exercices sont alignés sur les nouvelles exigences.",
  },
  {
    question: "Comment fonctionne la répétition espacée ?",
    answer:
      "Notre algorithme SM-2 analyse tes réponses aux quiz et calcule le moment optimal pour te représenter chaque notion. Les concepts que tu maîtrises bien apparaissent moins souvent, tandis que tes points faibles sont revus plus fréquemment.",
  },
  {
    question: "Puis-je utiliser ETUDIET sur mobile ?",
    answer:
      "Absolument. La plateforme est entièrement responsive et fonctionne parfaitement sur smartphone, tablette et ordinateur. Tu peux réviser dans les transports, en pause, ou chez toi.",
  },
  {
    question: "Les exercices sont-ils au format de l'examen réel ?",
    answer:
      "Oui, tous nos exercices reproduisent le format exact du BTS Diététique : études de cas détaillées, questions de synthèse, préparation à l'oral. Chaque exercice inclut une correction modèle et une grille de notation.",
  },
  {
    question: "Puis-je annuler mon abonnement à tout moment ?",
    answer:
      "Oui, tu peux annuler ton abonnement mensuel à tout moment depuis les paramètres de ton compte. L'accès reste actif jusqu'à la fin de la période payée. Aucuns frais cachés.",
  },
  {
    question: "Y a-t-il une garantie satisfait ou remboursé ?",
    answer:
      "Oui, nous offrons une garantie satisfait ou remboursé de 14 jours sur tous les abonnements. Si la plateforme ne te convient pas, il suffit de nous contacter pour obtenir un remboursement complet.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-coral-50 dark:from-emerald-900/10 dark:via-[#0f1117] dark:to-coral-900/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6">Nouveau référentiel 2027</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
              Le programme de révision qui te fait avoir ton{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                BTS Diététique
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Un programme structuré semaine par semaine, des exercices au format
              examen, et un système de répétition espacée qui s'adapte à ton rythme.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Tester gratuitement
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/#programme">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Voir le programme
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="programme" className="py-20 sm:py-24 bg-white dark:bg-[#0f1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white">
              Tout ce qu'il te faut pour réussir
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Une méthode complète qui couvre les 5 épreuves du BTS Diététique,
              avec un suivi intelligent de ta progression.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} hover className="text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STAT CHOC ============ */}
      <section className="py-20 sm:py-24 bg-emerald-600 dark:bg-emerald-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-5xl sm:text-6xl font-medium text-white mb-6">
            1 sur 2
          </p>
          <p className="text-xl sm:text-2xl text-emerald-100 leading-relaxed max-w-2xl mx-auto">
            1 étudiant sur 2 échoue au BTS Diététique.{" "}
            <span className="text-white font-medium">
              Les étudiants ETUDIET ne font pas partie de cette statistique.
            </span>
          </p>
        </div>
      </section>

      {/* ============ COMMENT CA MARCHE ============ */}
      <section className="py-20 sm:py-24 bg-gray-50 dark:bg-[#0f1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              3 étapes simples pour commencer tes révisions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="text-5xl font-medium text-emerald-200 dark:text-emerald-800 mb-4">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="tarifs" className="py-20 sm:py-24 bg-white dark:bg-[#0f1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white">
              Des tarifs simples et transparents
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Commence gratuitement, puis choisis le plan qui te convient.
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
                <div className="mb-6">
                  <span className="text-4xl font-medium text-gray-900 dark:text-white">
                    {plan.price}&euro;
                  </span>
                  {plan.period && (
                    <span className="text-gray-500 dark:text-gray-400">
                      {plan.period}
                    </span>
                  )}
                </div>
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
                <Link href="/auth/register" className="block">
                  <Button
                    variant={plan.variant}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-20 sm:py-24 bg-gray-50 dark:bg-[#0a0b10]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white">
              Questions fréquentes
            </h2>
          </div>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-20 sm:py-24 bg-white dark:bg-[#0f1117]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 dark:text-white mb-4">
            Prêt à réussir ton BTS Diététique ?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Rejoins les étudiants qui ont choisi de ne rien laisser au hasard.
          </p>
          <Link href="/auth/register">
            <Button size="lg">
              Commencer gratuitement
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Programme de préparation BTS Diététique et Nutrition 2027",
            description:
              "Programme de révision personnalisé pour le BTS Diététique et Nutrition. Nouveau référentiel 2027.",
            provider: {
              "@type": "EducationalOrganization",
              name: "ETUDIET",
              url: "https://etudiet.fr",
            },
            inLanguage: "fr",
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "online",
            },
          }),
        }}
      />
    </div>
  );
}
