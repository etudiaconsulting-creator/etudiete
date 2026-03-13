"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, FileQuestion, Clock, Filter } from "lucide-react";
import Link from "next/link";

interface ChapterData {
  id: string;
  title: string;
  priority: number;
  estimatedHours: number;
  progress: number;
  description: string;
}

const moduleInfo: Record<string, { code: string; title: string; description: string; examType: string; examDuration: string; coefficient: number }> = {
  E1: { code: "E1", title: "Anglais", description: "Expression orale et compréhension de documents techniques en anglais médical et scientifique. Vocabulaire spécialisé et communication orale professionnelle.", examType: "Oral", examDuration: "45min", coefficient: 1 },
  E2: { code: "E2", title: "Biologie et physiopathologie appliquées à la diététique et à la nutrition", description: "Bases biochimiques, physiologiques et physiopathologiques essentielles à l'activité de diététicien. 38 chapitres couvrant la biochimie structurale, le métabolisme, les systèmes physiologiques et les pathologies nutritionnelles.", examType: "Écrit", examDuration: "4h", coefficient: 4 },
  E3: { code: "E3", title: "Élaboration et mise en œuvre d'une démarche de soin diététique et nutritionnel", description: "Démarche de soin diététique, bilan nutritionnel, consultation et éducation thérapeutique du patient. Cas cliniques et prise en charge personnalisée.", examType: "Oral", examDuration: "45min", coefficient: 4 },
  E4: { code: "E4", title: "Conception et élaboration d'une alimentation saine, durable et adaptée", description: "Élaboration de plans alimentaires équilibrés, adaptés aux besoins spécifiques. Composition alimentaire, qualité et sécurité alimentaire. Menus adaptés à différentes pathologies.", examType: "Écrit", examDuration: "4h", coefficient: 4 },
  E5: { code: "E5", title: "Interventions en santé publique dans les domaines de la diététique et de la nutrition", description: "Actions de prévention nutritionnelle, éducation collective en matière de santé. Nutrition en restauration collective et programmes de santé publique.", examType: "Pratique", examDuration: "3h30", coefficient: 4 },
};

const moduleChapters: Record<string, ChapterData[]> = {
  E1: [
    { id: "e1-ch1", title: "Compréhension de textes médicaux en anglais", priority: 1, estimatedHours: 3, progress: 0, description: "Lecture et compréhension de documents scientifiques et médicaux" },
    { id: "e1-ch2", title: "Expression orale et conversation professionnelle", priority: 1, estimatedHours: 2.5, progress: 0, description: "Communication orale, expression spontanée, présentation" },
    { id: "e1-ch3", title: "Vocabulaire médical et scientifique", priority: 1, estimatedHours: 2.5, progress: 0, description: "Terminologie médicale, nutrition et diététique en anglais" },
    { id: "e1-ch4", title: "Techniques de l'épreuve orale", priority: 2, estimatedHours: 1.5, progress: 0, description: "Stratégies pour l'examen oral, gestion du stress, timing" },
  ],
  E2: [
    { id: "e2-ch1", title: "Biochimie structurale : glucides", priority: 1, estimatedHours: 2, progress: 0, description: "Monosaccharides, disaccharides, polysaccharides" },
    { id: "e2-ch2", title: "Biochimie structurale : lipides", priority: 1, estimatedHours: 2, progress: 0, description: "Acides gras, triglycérides, phospholipides, cholestérol" },
    { id: "e2-ch3", title: "Biochimie structurale : protides", priority: 1, estimatedHours: 2, progress: 0, description: "Acides aminés, protéines, structure et fonction" },
    { id: "e2-ch4", title: "Biochimie structurale : acides nucléiques", priority: 1, estimatedHours: 1.5, progress: 0, description: "ADN, ARN, structure et rôles biologiques" },
    { id: "e2-ch5", title: "Enzymologie", priority: 1, estimatedHours: 2, progress: 0, description: "Cinétique enzymatique, régulation, mécanismes catalytiques" },
    { id: "e2-ch6", title: "Vitamines hydrosolubles", priority: 1, estimatedHours: 1.5, progress: 0, description: "Vitamines B, C et leurs rôles biologiques" },
    { id: "e2-ch7", title: "Vitamines liposolubles", priority: 1, estimatedHours: 1.5, progress: 0, description: "Vitamines A, D, E, K et leurs rôles biologiques" },
    { id: "e2-ch8", title: "Biologie cellulaire", priority: 1, estimatedHours: 2.5, progress: 0, description: "Structure cellulaire, organites, métabolisme cellulaire" },
    { id: "e2-ch9", title: "Histologie", priority: 1, estimatedHours: 2, progress: 0, description: "Tissus fondamentaux, organisation tissulaire" },
    { id: "e2-ch10", title: "Milieu intérieur", priority: 1, estimatedHours: 1.5, progress: 0, description: "Homéostasie, compartiments liquidiens, équilibre" },
    { id: "e2-ch11", title: "Système endocrinien", priority: 1, estimatedHours: 2.5, progress: 0, description: "Glandes endocrines, hormones, régulation hormonale" },
    { id: "e2-ch12", title: "Système neuromusculaire", priority: 1, estimatedHours: 2, progress: 0, description: "Système nerveux, muscle squelettique, contraction musculaire" },
    { id: "e2-ch13", title: "Appareil cardiovasculaire", priority: 1, estimatedHours: 2.5, progress: 0, description: "Coeur, vaisseaux, circulation sanguine, physiologie cardiaque" },
    { id: "e2-ch14", title: "Appareil respiratoire", priority: 1, estimatedHours: 2, progress: 0, description: "Voies respiratoires, mécaniques respiratoires, échanges gazeux" },
    { id: "e2-ch15", title: "Appareil digestif", priority: 1, estimatedHours: 2.5, progress: 0, description: "Anatomie digestive, mécanismes de digestion, absorption" },
    { id: "e2-ch16", title: "Appareil urinaire", priority: 1, estimatedHours: 2, progress: 0, description: "Rein, filtration, réabsorption, excrétion" },
    { id: "e2-ch17", title: "Système immunitaire", priority: 1, estimatedHours: 2, progress: 0, description: "Immunité, réponse immunitaire, inflammation" },
    { id: "e2-ch18", title: "Voies métaboliques du glucose", priority: 1, estimatedHours: 2.5, progress: 0, description: "Glycolyse, gluconéogenèse, glycogénolyse, cycle de Krebs" },
    { id: "e2-ch19", title: "Voies métaboliques des acides gras", priority: 1, estimatedHours: 2, progress: 0, description: "Bêta-oxydation, lipogenèse, cétogenèse" },
    { id: "e2-ch20", title: "Corps cétoniques", priority: 1, estimatedHours: 1.5, progress: 0, description: "Formation, utilisation, acidocétose" },
    { id: "e2-ch21", title: "Carrefours et inter-conversions métaboliques", priority: 1, estimatedHours: 2, progress: 0, description: "Gluconéogenèse à partir de non-glucides, lipogenèse" },
    { id: "e2-ch22", title: "Catabolisme des acides aminés", priority: 1, estimatedHours: 2, progress: 0, description: "Désaminase, cycle de l'urée, gluconéogenèse" },
    { id: "e2-ch23", title: "Métabolisme du cholestérol et des lipoprotéines", priority: 1, estimatedHours: 2, progress: 0, description: "Synthèse, transport, métabolisme du cholestérol" },
    { id: "e2-ch24", title: "Régulation de la glycémie", priority: 1, estimatedHours: 2, progress: 0, description: "Rôle de l'insuline et du glucagon, homéostasie glucidique" },
    { id: "e2-ch25", title: "Adaptations à l'exercice physique", priority: 2, estimatedHours: 2, progress: 0, description: "Métabolisme de l'effort, substrat utilisé, fatigue musculaire" },
    { id: "e2-ch26", title: "Régulation équilibre phosphocalcique", priority: 2, estimatedHours: 1.5, progress: 0, description: "Calcium, phosphore, régulation hormonale" },
    { id: "e2-ch27", title: "Régulation équilibre hydrominéral", priority: 2, estimatedHours: 1.5, progress: 0, description: "Sodium, potassium, osmolarité, ADH, aldostérone" },
    { id: "e2-ch28", title: "Régulation faim, satiété et soif", priority: 2, estimatedHours: 1.5, progress: 0, description: "Mécanismes de régulation, hormones, hypothalamus" },
    { id: "e2-ch29", title: "Pathologies du tube digestif", priority: 2, estimatedHours: 2, progress: 0, description: "Ulcère, RGO, gastroentérite, maladie cœliaque, IBD" },
    { id: "e2-ch30", title: "Pathologies des glandes annexes", priority: 2, estimatedHours: 1.5, progress: 0, description: "Pancréas, foie, vésicule biliaire" },
    { id: "e2-ch31", title: "Pathologies de l'appareil urinaire", priority: 2, estimatedHours: 1.5, progress: 0, description: "Insuffisance rénale, lithiase, infections urinaires" },
    { id: "e2-ch32", title: "Pathologies cardiovasculaires", priority: 2, estimatedHours: 2, progress: 0, description: "Hypertension, athérosclérose, infarctus, insuffisance cardiaque" },
    { id: "e2-ch33", title: "Pathologies endocriniennes et métaboliques", priority: 1, estimatedHours: 2.5, progress: 0, description: "Diabète, hyperthyroïdie, hypothyroïdie, obésité" },
    { id: "e2-ch34", title: "Pathologies du système nerveux", priority: 2, estimatedHours: 2, progress: 0, description: "Démence, AVC, épilepsie, Parkinson" },
    { id: "e2-ch35", title: "Troubles des conduites alimentaires", priority: 2, estimatedHours: 1.5, progress: 0, description: "Anorexie, boulimie, hyperphagie, orthorexie" },
    { id: "e2-ch36", title: "Dénutrition et malnutrition", priority: 1, estimatedHours: 1.5, progress: 0, description: "Mécanismes, conséquences, prise en charge nutritionnelle" },
    { id: "e2-ch37", title: "Nutrition de la femme enceinte et allaitante", priority: 2, estimatedHours: 1.5, progress: 0, description: "Besoins spécifiques, adaptation alimentaire, lactogénèse" },
    { id: "e2-ch38", title: "Nutrition de la personne âgée", priority: 2, estimatedHours: 1.5, progress: 0, description: "Changements métaboliques, besoins, prévention de la dénutrition" },
  ],
  E3: [
    { id: "e3-ch1", title: "Consultation diététique et anamnèse", priority: 1, estimatedHours: 2.5, progress: 0, description: "Entretien motivationnel, bilan nutritionnel, diagnostic diététique" },
    { id: "e3-ch2", title: "Bilan nutritionnel et anthropométrie", priority: 1, estimatedHours: 2, progress: 0, description: "Mesures anthropométriques, calcul d'indices, interprétation" },
    { id: "e3-ch3", title: "Projet thérapeutique et plan de soin", priority: 1, estimatedHours: 2.5, progress: 0, description: "Définition des objectifs, élaboration du plan, suivi" },
    { id: "e3-ch4", title: "Éducation thérapeutique du patient", priority: 1, estimatedHours: 2, progress: 0, description: "Compétences, techniques pédagogiques, évaluation" },
    { id: "e3-ch5", title: "Étude de cas clinique", priority: 2, estimatedHours: 2, progress: 0, description: "Analyse de situation, démarche, rédaction de rapport" },
  ],
  E4: [
    { id: "e4-ch1", title: "Groupes alimentaires et équivalences", priority: 1, estimatedHours: 2, progress: 0, description: "Classification des aliments, équivalences nutritionnelles" },
    { id: "e4-ch2", title: "Besoins nutritionnels et repères alimentaires", priority: 1, estimatedHours: 2.5, progress: 0, description: "ANC, RNP, PNNS, adéquation nutritionnelle" },
    { id: "e4-ch3", title: "Élaboration de plans alimentaires adaptés", priority: 1, estimatedHours: 2.5, progress: 0, description: "Plans alimentaires équilibrés, régimes spécifiques, adaptation à différentes populations" },
    { id: "e4-ch4", title: "Qualité et sécurité alimentaire", priority: 1, estimatedHours: 1.5, progress: 0, description: "HACCP, contaminants, allergènes, règles de conservation" },
    { id: "e4-ch5", title: "Menus adaptés et durable", priority: 1, estimatedHours: 1.5, progress: 0, description: "Équilibre nutritionnel, respect de l'environnement, palatabilité" },
  ],
  E5: [
    { id: "e5-ch1", title: "Prévention nutritionnelle et éducation collective", priority: 1, estimatedHours: 2.5, progress: 0, description: "Interventions de santé publique, programmes de prévention" },
    { id: "e5-ch2", title: "Éducation collective en nutrition", priority: 1, estimatedHours: 2, progress: 0, description: "Animation d'ateliers, communication de groupe, supports pédagogiques" },
    { id: "e5-ch3", title: "Nutrition en restauration collective", priority: 1, estimatedHours: 2.5, progress: 0, description: "Organisation, menus, adaptation, qualité hygiénique" },
    { id: "e5-ch4", title: "Projet de santé publique en nutrition", priority: 2, estimatedHours: 2, progress: 0, description: "Diagnostic de santé, objectifs, actions, évaluation" },
  ],
};

const priorityConfig: Record<number, { label: string; shortLabel: string; variant: "coral" | "emerald" | "gray"; }> = {
  1: { label: "Vital", shortLabel: "P1", variant: "coral" },
  2: { label: "Important", shortLabel: "P2", variant: "emerald" },
  3: { label: "Approfondissement", shortLabel: "P3", variant: "gray" },
};

type FilterMode = "p1" | "p1p2" | "all";

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const [filter, setFilter] = useState<FilterMode>("all");
  const mod = moduleInfo[params.moduleId] || moduleInfo.E1;
  const chapters = moduleChapters[params.moduleId] || moduleChapters.E1;

  const filteredChapters = useMemo(() => {
    if (filter === "p1") return chapters.filter((c) => c.priority === 1);
    if (filter === "p1p2") return chapters.filter((c) => c.priority <= 2);
    return chapters;
  }, [chapters, filter]);

  const totalHours = filteredChapters.reduce((acc, c) => acc + c.estimatedHours, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/dashboard/modules"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Tous les modules
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge>{mod.code}</Badge>
          <Badge variant="coral">Coeff. {mod.coefficient}</Badge>
          <Badge variant="gray">{mod.examType} — {mod.examDuration}</Badge>
        </div>
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
          {mod.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
          {mod.description}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">Filtrer :</span>
        {([
          { key: "p1" as FilterMode, label: "P1 — Vital" },
          { key: "p1p2" as FilterMode, label: "P1 + P2" },
          { key: "all" as FilterMode, label: "Tout" },
        ]).map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              filter === f.key
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="text-xs text-gray-400 ml-auto">
          {filteredChapters.length} chapitres — {totalHours}h estimées
        </span>
      </div>

      <div className="space-y-3">
        {filteredChapters.map((chapter) => {
          const prio = priorityConfig[chapter.priority];
          return (
            <Card key={chapter.id} hover>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant={prio.variant}>{prio.shortLabel} — {prio.label}</Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {chapter.estimatedHours}h
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {chapter.title}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-1">
                    {chapter.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 max-w-xs bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${chapter.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{chapter.progress}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/dashboard/chapters/${chapter.id}`}>
                    <Button variant="ghost" size="sm">
                      <BookOpen className="w-4 h-4 mr-1.5" />
                      Fiche
                    </Button>
                  </Link>
                  <Link href={`/dashboard/quiz/${chapter.id}`}>
                    <Button variant="outline" size="sm">
                      <FileQuestion className="w-4 h-4 mr-1.5" />
                      Quiz
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
