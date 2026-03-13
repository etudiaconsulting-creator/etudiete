"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const modules = [
  { code: "E1", title: "Anglais", description: "Expression orale et compréhension de documents techniques en anglais médical et scientifique.", examType: "Oral", examDuration: "45min", coefficient: 1, chapters: 4 },
  { code: "E2", title: "Biologie et physiopathologie appliquées à la diététique et à la nutrition", description: "Bases biochimiques, physiologiques et physiopathologiques essentielles à l'activité de diététicien. 38 chapitres : biochimie, métabolisme, systèmes physiologiques, pathologies liées à la nutrition.", examType: "Écrit", examDuration: "4h", coefficient: 4, chapters: 38 },
  { code: "E3", title: "Élaboration et mise en œuvre d'une démarche de soin diététique et nutritionnel", description: "Démarche de soin, bilan nutritionnel, consultation et éducation thérapeutique du patient.", examType: "Oral", examDuration: "45min", coefficient: 4, chapters: 5 },
  { code: "E4", title: "Conception et élaboration d'une alimentation saine, durable et adaptée", description: "Élaboration de plans alimentaires équilibrés et adaptés aux besoins spécifiques. Composition, qualité et sécurité alimentaire.", examType: "Écrit", examDuration: "4h", coefficient: 4, chapters: 5 },
  { code: "E5", title: "Interventions en santé publique dans les domaines de la diététique et de la nutrition", description: "Actions de prévention, éducation collective et nutrition en restauration collective.", examType: "Pratique", examDuration: "3h30", coefficient: 4, chapters: 4 },
];

export default function ModulesIndexPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au dashboard
      </Link>

      <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
        Tous les modules
      </h1>

      <div className="space-y-4">
        {modules.map((mod) => (
          <Card key={mod.code} hover>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{mod.code}</Badge>
                  <Badge variant="gray">{mod.examType} - {mod.examDuration}</Badge>
                  <Badge variant="coral">Coeff. {mod.coefficient}</Badge>
                </div>
                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                  {mod.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {mod.description}
                </p>
                <p className="text-xs text-gray-400 mt-2">{mod.chapters} chapitres</p>
              </div>
              <Link href={`/dashboard/modules/${mod.code}`} className="ml-4">
                <Button variant="ghost" size="sm">
                  Voir
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
