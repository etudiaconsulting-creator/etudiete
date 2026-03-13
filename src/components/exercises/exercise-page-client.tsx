"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AccordionGeneric, type AccordionSection } from "@/components/ui/accordion";
import {
  ArrowLeft,
  Clock,
  Play,
  Pause,
  Eye,
  EyeOff,
  BookOpen,
  Star,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { BookmarkButton } from "@/components/ui/bookmark-button";
import { useAuth } from "@/components/layout/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { hasFullAccess, isExerciseFree } from "@/lib/utils/subscription";
import { Paywall } from "@/components/paywall";
import { useParams } from "next/navigation";

const exerciseTypeLabels: Record<string, string> = {
  full_exam: "Sujet type",
  mini_case: "Mini cas",
  oral_prep: "Prépa orale",
};

const priorityConfig: Record<number, { label: string; variant: "coral" | "emerald" | "gray" }> = {
  1: { label: "P1", variant: "coral" },
  2: { label: "P2", variant: "emerald" },
  3: { label: "P3", variant: "gray" },
};

interface Exercise {
  id: string;
  moduleCode: string;
  title: string;
  type: "full_exam" | "mini_case" | "oral_prep";
  duration_minutes: number;
  priority: 1 | 2 | 3;
  subject_html: string;
  model_answer_html: string;
  grading_criteria_html: string;
  common_mistakes_html: string;
}

const sampleExercises: Record<string, Exercise> = {
  ex1: {
    id: "ex1",
    moduleCode: "E2",
    title: "Sujet type — Diabète de type 2 et métabolisme glucidique",
    type: "full_exam",
    duration_minutes: 240,
    priority: 1,
    subject_html: `
      <p>Un patient de 55 ans, diabétique de type 2 sous metformine, consulte pour un bilan nutritionnel. Il pèse 92 kg pour 1m75. Son HbA1c est à 8.2%.</p>
      <p><strong>Question 1 :</strong> Calculez l'IMC du patient et interprétez le résultat.</p>
      <p><strong>Question 2 :</strong> Décrivez les mécanismes physiopathologiques du diabète de type 2, en particulier l'insulinorésistance.</p>
      <p><strong>Question 3 :</strong> En vous appuyant sur les voies métaboliques du glucose, expliquez pourquoi la glycémie est élevée chez ce patient.</p>
      <p><strong>Question 4 :</strong> Proposez un plan alimentaire adapté sur une journée (petit-déjeuner, déjeuner, collation, dîner) en justifiant vos choix nutritionnels.</p>
      <p><strong>Question 5 :</strong> Quel est le rôle de la metformine dans le métabolisme glucidique ?</p>
    `,
    model_answer_html: `
      <p><strong>Question 1 :</strong> IMC = 92 / (1.75)² = 30.0 kg/m². Le patient est en situation d'obésité de classe I (IMC entre 30 et 34.9). Cette obésité est un facteur de risque majeur pour l'insulinorésistance.</p>
      <p><strong>Question 2 :</strong> Le diabète de type 2 associe une insulinorésistance périphérique et un déficit relatif de sécrétion d'insuline. L'insulinorésistance signifie que les tissus (foie, muscle) répondent moins bien à l'insuline. Le foie continue à produire du glucose par gluconéogenèse malgré une glycémie élevée. Les cellules bêta du pancréas tentent de compenser par une hyperinsulinémie secondaire.</p>
      <p><strong>Question 3 :</strong> Chez ce patient, la voie de glycolyse est moins utilisée (insulinorésistance musculaire). La gluconéogenèse hépatique est augmentée, en particulier à partir des acides gras libres mobilisés du tissu adipeux. Le cycle de Krebs et la chaîne respiratoire sont moins actifs, réduisant la capture de glucose cellulaire.</p>
      <p><strong>Question 4 :</strong> Petit-déjeuner : pain complet 60g + fromage blanc 100g + fruits rouges 80g. Déjeuner : poulet grillé 150g + riz basmati 150g + légumes verts 150g + vinaigrette. Collation : yaourt nature 125g. Dîner : omelette 2 œufs + salade composée.</p>
      <p><strong>Question 5 :</strong> La metformine augmente la sensibilité à l'insuline (réduit l'insulinorésistance), diminue la gluconéogenèse hépatique et améliore la capture de glucose par les muscles. Elle n'augmente pas la sécrétion d'insuline.</p>
    `,
    grading_criteria_html: `
      <ul>
        <li><strong>Question 1 :</strong> 3 points (calcul 1.5pts + interprétation 1.5pts)</li>
        <li><strong>Question 2 :</strong> 4 points (insulinorésistance 2pts + déficit sécrétion 2pts)</li>
        <li><strong>Question 3 :</strong> 4 points (gluconéogenèse 2pts + voies métaboliques 2pts)</li>
        <li><strong>Question 4 :</strong> 4 points (adéquation énergétique 1.5pts + distribution glucides 1.5pts + présentation 1pt)</li>
        <li><strong>Question 5 :</strong> 3 points (mécanisme d'action 2pts + pertinence 1pt)</li>
      </ul>
    `,
    common_mistakes_html: `
      <ul>
        <li>Oublier d'interpréter l'IMC après le calcul numérique</li>
        <li>Confondre diabète de type 1 (auto-immun) et type 2 (métabolique)</li>
        <li>Ne pas mentionner l'insulinorésistance périphérique</li>
        <li>Ne pas adapter les quantités et timing des glucides au profil du patient</li>
        <li>Ignorer l'index glycémique des aliments</li>
        <li>Proposer des portions trop importantes malgré l'obésité</li>
      </ul>
    `,
  },
  ex2: {
    id: "ex2",
    moduleCode: "E4",
    title: "Mini cas — Plan alimentaire patient surpoids",
    type: "mini_case",
    duration_minutes: 60,
    priority: 1,
    subject_html: `
      <p>Monsieur Durand, 38 ans, pèse 78 kg pour 1m70. Son IMC est de 26.9. Il consulte pour une prise de poids progressive (gain de 8 kg en 2 ans). Ses apports alimentaires sont : petit-déjeuner peu important, déjeuner classique, nombreuses collations (biscuits, chocolat), dîner copieux.</p>
      <p>Ses analyses : cholestérol total 220 mg/dL, HDL 35 mg/dL, glucose à jeun 105 mg/dL (début d'insulinorésistance).</p>
      <p><strong>Question :</strong> Élaborez un plan alimentaire d'une semaine équilibré et adapté à cet homme, avec gestion des fringales et restructuration du comportement alimentaire.</p>
    `,
    model_answer_html: `
      <p><strong>Analyse :</strong> IMC 26.9 = surpoids. Les apports ne sont pas bien répartis (petit-déjeuner insuffisant, grignotages, dîner important). La glucose à jeun élevée indique une insulinorésistance naissante.</p>
      <p><strong>Plan alimentaire :</strong></p>
      <p><strong>Petit-déjeuner renforcé :</strong> Pain complet 50g + œuf + fruit frais (apaise la faim jusqu'à midi). Déjeuner équilibré : protéines 120-150g (poisson, volaille), féculent 120g (riz, pâtes), légumes 200g. Goûter planifié : yaourt ou fruit (évite les biscuits). Dîner plus léger : légumes + protéines légères + pain complet.</p>
      <p><strong>Ajustements :</strong> Augmenter les fibres (pain complet, légumes, légumineuses), réduire les sucres simples, choisir des matières grasses de qualité (huile d'olive), limiter l'alcool.</p>
    `,
    grading_criteria_html: `
      <ul>
        <li>Analyse nutritionnelle du patient : 3 points</li>
        <li>Plan alimentaire équilibré : 4 points</li>
        <li>Adéquation énergétique et macronutriments : 3 points</li>
      </ul>
    `,
    common_mistakes_html: `
      <ul>
        <li>Proposer un régime trop restrictif (non durable)</li>
        <li>Ignorer les habitudes du patient</li>
        <li>Ne pas prévoir de collation structurée</li>
      </ul>
    `,
  },
  ex3: {
    id: "ex3",
    moduleCode: "E3",
    title: "Prépa orale — Consultation diététique",
    type: "oral_prep",
    duration_minutes: 30,
    priority: 2,
    subject_html: `
      <p>Vous devez présenter une consultation diététique réalisée auprès d'une patiente insulinodépendante. Détaillez votre démarche de soin : anamnèse, bilan nutritionnel, diagnostic diététique et plan personnalisé.</p>
    `,
    model_answer_html: `
      <p><strong>Démarche de soin diététique :</strong></p>
      <p>1. <strong>Anamnèse :</strong> Recueillir l'histoire médicale, les habitudes alimentaires, les contraintes (travail, famille), les préférences.</p>
      <p>2. <strong>Bilan nutritionnel :</strong> Mesures anthropométriques (poids, taille, tour de taille), calcul d'indices (IMC, BIA si possible), recueil alimentaire (24h ou carnet 3j).</p>
      <p>3. <strong>Diagnostic diététique :</strong> Identifier les forces et les faiblesses du patient, les carences, les excès, les risques nutritionnels.</p>
      <p>4. <strong>Objectifs SMART :</strong> Spécifiques, mesurables, atteignables, réalistes, temporels.</p>
      <p>5. <strong>Plan personnalisé :</strong> Proposer des modifications progressives, durables, acceptables par le patient.</p>
      <p>6. <strong>Suivi :</strong> Planifier les rendez-vous, évaluer l'évolution, adapter le plan.</p>
    `,
    grading_criteria_html: `
      <ul>
        <li>Connaissance de la démarche : 5 points</li>
        <li>Capacité à structurer son discours : 3 points</li>
        <li>Pertinence et exhaustivité : 2 points</li>
      </ul>
    `,
    common_mistakes_html: `
      <ul>
        <li>Omettre une étape de la démarche</li>
        <li>Proposer un plan non adapté au patient</li>
        <li>Ne pas évoquer le suivi</li>
      </ul>
    `,
  },
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function ExercisePageClient() {
  const params = useParams();
  const exerciseId = params.exerciseId as string;
  const { user, profile } = useAuth();
  const [examMode, setExamMode] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const [selfScore, setSelfScore] = useState(10);
  const [selfNotes, setSelfNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const exercise = sampleExercises[exerciseId] || sampleExercises.ex1;
  const exerciseKeys = Object.keys(sampleExercises);
  const exerciseIndex = exerciseKeys.indexOf(exerciseId);
  const isFree = isExerciseFree(exerciseIndex, profile?.role);
  const isPaid = hasFullAccess(profile?.subscription_status, profile?.role);

  useEffect(() => {
    setTimeRemaining(exercise.duration_minutes * 60);
  }, [exercise.duration_minutes]);

  useEffect(() => {
    if (examMode) {
      setTimerActive(false);
      setTimeRemaining(exercise.duration_minutes * 60);
    }
  }, [examMode, exercise.duration_minutes]);

  useEffect(() => {
    if (timerActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerActive, timeRemaining]);

  const handleSaveEvaluation = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const supabase = createClient();
      await supabase.from("user_exercise_attempts").insert({
        id: crypto.randomUUID(),
        user_id: user.id,
        exercise_id: exercise.id,
        self_score: selfScore,
        notes: selfNotes,
        completed_at: new Date().toISOString(),
      } as never);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving evaluation:", error);
    } finally {
      setSaving(false);
    }
  };

  const accordionSections: AccordionSection[] = [
    {
      title: "Réponse modèle",
      icon: <BookOpen className="w-4 h-4" />,
      className: "bg-emerald-50 dark:bg-emerald-950/30",
      content: (
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: exercise.model_answer_html }}
        />
      ),
    },
    {
      title: "Critères de notation",
      icon: <Star className="w-4 h-4" />,
      content: (
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: exercise.grading_criteria_html }}
        />
      ),
    },
    {
      title: "Erreurs fréquentes",
      icon: <AlertTriangle className="w-4 h-4" />,
      className: "bg-red-50 dark:bg-red-950/30",
      content: (
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: exercise.common_mistakes_html }}
        />
      ),
    },
    {
      title: "Auto-évaluation",
      icon: <CheckCircle2 className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-fit">
              Note: {selfScore}/20
            </label>
            <input
              type="range"
              min={0}
              max={20}
              step={1}
              value={selfScore}
              onChange={(e) => setSelfScore(parseInt(e.target.value))}
              className="flex-1 accent-emerald-600"
            />
          </div>
          <textarea
            placeholder="Notes personnelles sur votre réponse..."
            value={selfNotes}
            onChange={(e) => setSelfNotes(e.target.value)}
            className="w-full min-h-[100px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <Button
            variant="primary"
            onClick={handleSaveEvaluation}
            disabled={saving}
            className="w-full"
          >
            {saved ? "Enregistré !" : saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/dashboard/exercises"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
      >
        <ArrowLeft className="w-4 h-4" />
        Exercices
      </Link>

      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge>{exercise.moduleCode}</Badge>
          <Badge>{exerciseTypeLabels[exercise.type]}</Badge>
          <Badge variant={priorityConfig[exercise.priority].variant}>
            {priorityConfig[exercise.priority].label}
          </Badge>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {exercise.duration_minutes} min
          </span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">{exercise.title}</h1>
          <BookmarkButton contentType="exercise" contentId={exercise.id} />
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Mode examen</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Activez le mode examen pour démarrer un décompte à rebours
            </p>
          </div>
          <button
            onClick={() => setExamMode(!examMode)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              examMode ? "bg-emerald-600" : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                examMode ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {examMode && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div
              className={`text-center text-4xl font-mono font-bold ${
                timeRemaining < 300 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {formatTime(timeRemaining)}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant={timerActive ? "secondary" : "primary"}
                size="sm"
                onClick={() => setTimerActive(!timerActive)}
                className="flex items-center gap-2"
              >
                {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {timerActive ? "Pause" : "Démarrer"}
              </Button>
            </div>
          </div>
        )}
      </Card>

      {!isFree && !isPaid ? (
        <Paywall>
          <Card>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Énoncé</h2>
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: exercise.subject_html }}
            />
          </Card>
        </Paywall>
      ) : (
        <Card>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Énoncé</h2>
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: exercise.subject_html }}
          />
        </Card>
      )}

      {(isFree || isPaid) && (
        <Card>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ma réponse</h2>
          <textarea
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder="Saisissez votre réponse ici..."
            className="w-full min-h-[300px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {studentAnswer.length} caractères
          </p>
        </Card>
      )}

      {(isFree || isPaid) && (
        <Button
          variant="primary"
          onClick={() => setShowCorrection(!showCorrection)}
          className="w-full flex items-center justify-center gap-2"
        >
          {showCorrection ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showCorrection ? "Masquer la correction" : "Voir la correction"}
        </Button>
      )}

      {(isFree || isPaid) && showCorrection && <AccordionGeneric sections={accordionSections} />}
    </div>
  );
}
