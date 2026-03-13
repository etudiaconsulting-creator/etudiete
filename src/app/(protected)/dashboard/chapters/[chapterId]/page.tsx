"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion, Clock, CheckCircle2, BookOpen } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/layout/auth-provider";
import { hasFullAccess, isChapterFree } from "@/lib/utils/subscription";
import { Paywall } from "@/components/paywall";
import { SessionTimer } from "@/components/quiz/session-timer";
import { BookmarkButton } from "@/components/ui/bookmark-button";

const chapterData: Record<string, { moduleCode: string; moduleTitle: string; title: string; priority: number; estimatedHours: number; content: string; orderIndex: number }> = {
  "e2-ch1": {
    moduleCode: "E2",
    moduleTitle: "Biologie et physiopathologie",
    title: "Biochimie structurale : glucides",
    priority: 1,
    estimatedHours: 2,
    orderIndex: 0,
    content: `
      <h2>1. Classification des glucides</h2>
      <p>Les glucides (ou saccharides) sont les biomolécules les plus abondantes sur Terre. Ils représentent la principale source d'énergie pour l'organisme humain, fournissant environ <strong>4 kcal/g</strong>.</p>

      <h3>1.1 Les monosaccharides</h3>
      <p>Les monosaccharides sont les unites de base des glucides. Ils sont classes selon :</p>
      <ul>
        <li><strong>Le nombre de carbones</strong> : trioses (3C), tétoses (4C), pentoses (5C), hexoses (6C)</li>
        <li><strong>La fonction chimique</strong> : aldoses (fonction aldéhyde) ou cétoses (fonction cétone)</li>
      </ul>
      <p>Les plus importants en nutrition :</p>
      <ul>
        <li><strong>Glucose</strong> (C6H12O6) : carburant principal des cellules, en particulier du cerveau</li>
        <li><strong>Fructose</strong> : présent dans les fruits, métabolisé principalement par le foie</li>
        <li><strong>Galactose</strong> : issu de l'hydrolyse du lactose</li>
      </ul>

      <h3>1.2 Les disaccharides</h3>
      <p>Les disaccharides résultent de la condensation de deux monosaccharides par une liaison osidique :</p>
      <ul>
        <li><strong>Saccharose</strong> (glucose + fructose) : le sucre de table</li>
        <li><strong>Lactose</strong> (glucose + galactose) : le sucre du lait</li>
        <li><strong>Maltose</strong> (glucose + glucose) : issu de la digestion de l'amidon</li>
      </ul>

      <h3>1.3 Les polysaccharides</h3>
      <p>Les polysaccharides sont des polymères de monosaccharides :</p>
      <ul>
        <li><strong>Amidon</strong> : réserve glucidique végétale (amylose + amylopectine)</li>
        <li><strong>Glycogène</strong> : réserve glucidique animale (foie et muscles)</li>
        <li><strong>Cellulose</strong> : fibre alimentaire non digestible mais essentielle au transit</li>
      </ul>

      <h2>2. Structure chimique des glucides</h2>
      <p>Les glucides répondent à la formule générale Cn(H2O)m. La structure des monosaccharides comporte :</p>
      <ul>
        <li>Une chaîne carbonée</li>
        <li>Un groupe fonctionnel carbonyle (aldéhyde ou cétone)</li>
        <li>Plusieurs groupes hydroxyle (-OH)</li>
      </ul>

      <h3>2.1 Formes cycliques</h3>
      <p>En solution, les monosaccharides adoptent une forme cyclique (cyclisation). Le glucose existe principalement sous ses formes alpha-D-glucopyranose et bêta-D-glucopyranose. L'équilibre entre ces deux formes est responsable du phénomène de mutarotation.</p>

      <h3>2.2 Liaisons osidiques</h3>
      <p>Les liaisons osidiques sont des liaisons covalentes entre monosaccharides. Elles se forment entre un atome de carbone du groupe hydroxyle d'une molécule et un atome d'oxygène d'une autre molécule. On les désigne par leur position (exemple : liaison 1,4-osidique).</p>

      <h2>3. Rôles biologiques des glucides</h2>
      <p><strong>Rôle énergétique</strong> : Les glucides fournissent l'énergie immédiatement disponible pour le travail cellulaire. L'ATP (adénosine triphosphate) produit par la dégradation des glucides alimente tous les processus biologiques.</p>
      <p><strong>Rôle structural</strong> : La cellulose constitue les parois cellulaires végétales. Le glycogène constitue la réserve énergétique intracellulaire.</p>
      <p><strong>Rôle régulateur</strong> : Les glucides participent à la régulation de nombreux processus métaboliques et à la signalisation cellulaire.</p>

      <h2>4. Importance nutritionnelle</h2>
      <p>Les glucides constituent la base de l'alimentation humaine. Ils sont présents dans les céréales (riz, blé), les légumineuses (lentilles, pois), les fruits et les légumes. Un apport adéquat en glucides (45-65% de l'énergie totale) est recommandé pour une bonne santé métabolique.</p>
    `,
  },
  "e2-ch2": {
    moduleCode: "E2",
    moduleTitle: "Biologie et physiopathologie",
    title: "Biochimie structurale : lipides",
    priority: 1,
    estimatedHours: 2,
    orderIndex: 1,
    content: `
      <h2>1. Définition et classification des lipides</h2>
      <p>Les lipides sont des biomolécules hydrophobes (ou amphipathiques) constituées principalement de carbone, d'hydrogène et d'oxygène. Contrairement aux glucides, ils contiennent peu d'oxygène et ne répondent pas à une formule générale simple.</p>

      <h3>1.1 Acides gras</h3>
      <p>Les acides gras sont des acides carboxyliques à chaîne longue (généralement 12-22 carbones). On distingue :</p>
      <ul>
        <li><strong>Acides gras saturés</strong> : sans liaison double, solides à température ambiante (beurre, huile de coco)</li>
        <li><strong>Acides gras monoinsaturés</strong> : une liaison double (huile d'olive)</li>
        <li><strong>Acides gras polyinsaturés</strong> : plusieurs liaisons doubles (poisson, noix)</li>
      </ul>

      <h3>1.2 Triglycérides</h3>
      <p>Les triglycérides (ou triacylglycérols) sont formés par l'estérification de trois acides gras sur une molécule de glycérol. C'est la forme de stockage énergétique principale dans les tissus adipeux.</p>

      <h3>1.3 Lipides complexes</h3>
      <p><strong>Phospholipides</strong> : composés d'une molécule de glycérol, de deux acides gras et d'un groupe phosphate. Ils constituent la bicouche lipidique des membranes cellulaires.</p>
      <p><strong>Cholestérol</strong> : stérol synthétisé par le foie et présent dans les aliments d'origine animale. Précurseur des hormones stéroïdales et des acides biliaires.</p>

      <h2>2. Rôles biologiques des lipides</h2>
      <p><strong>Rôle énergétique</strong> : Les lipides fournissent 9 kcal/g, soit plus du double des glucides. Ils sont la forme de stockage énergétique la plus efficace.</p>
      <p><strong>Rôle structural</strong> : Les phospholipides et le cholestérol constituent les membranes cellulaires. Les lipides cutanés assurent l'étanchéité de la peau.</p>
      <p><strong>Rôle hormonal</strong> : Les lipides sont précurseurs d'hormones (cortisol, testostérone, œstrogènes).</p>

      <h2>3. Métabolisme des lipides</h2>
      <p>La digestion des lipides commence dans l'estomac (lipase gastrique) et se poursuit dans l'intestin (lipase pancréatique). Les acides biliaires du foie émulsifient les lipides alimentaires.</p>
      <p>L'absorption intestinale des acides gras forme des chylomicrons transportés par la lymphe vers le foie et les tissus adipeux.</p>
    `,
  },
  "e2-ch3": {
    moduleCode: "E2",
    moduleTitle: "Biologie et physiopathologie",
    title: "Biochimie structurale : protides",
    priority: 1,
    estimatedHours: 2,
    orderIndex: 2,
    content: `
      <h2>1. Acides aminés et protéines</h2>
      <p>Les protéines sont des macromolécules composées de chaînes d'acides aminés liés par des liaisons peptidiques. Elles sont essentielles à pratiquement toutes les fonctions biologiques.</p>

      <h3>1.1 Structure des acides aminés</h3>
      <p>Les acides aminés sont caractérisés par :</p>
      <ul>
        <li>Un groupe carboxyle (-COOH)</li>
        <li>Un groupe amine (-NH2)</li>
        <li>Un atome d'hydrogène</li>
        <li>Une chaîne latérale (R) spécifique</li>
      </ul>

      <h3>1.2 Acides aminés essentiels et non essentiels</h3>
      <p>L'organisme humain utilise 20 acides aminés dont 9 sont essentiels (non synthétisés par le corps) : leucine, isoleucine, valine, lysine, méthionine, phénylalanine, tryptophane, thréonine, histidine.</p>

      <h2>2. Structure des protéines</h2>
      <p><strong>Structure primaire</strong> : séquence linéaire des acides aminés dans la chaîne peptidique.</p>
      <p><strong>Structure secondaire</strong> : organisation locale de la chaîne (hélice alpha, feuillet bêta).</p>
      <p><strong>Structure tertiaire</strong> : repliement tridimensionnel de la protéine.</p>
      <p><strong>Structure quaternaire</strong> : association de plusieurs chaînes peptidiques (exemple : hémoglobine).</p>

      <h2>3. Classification des protéines</h2>
      <p><strong>Protéines simples</strong> : composées uniquement d'acides aminés (albumine, collagène).</p>
      <p><strong>Protéines conjuguées</strong> : associées à d'autres molécules (hémoglobine avec hème, lipoprotéines).</p>

      <h2>4. Rôles biologiques des protéines</h2>
      <p>Les protéines assurent des fonctions structurales (collagène), catalytiques (enzymes), de transport (transferrine), de défense (anticorps) et de régulation (hormones).</p>
    `,
  },
  "e2-ch4": {
    moduleCode: "E2",
    moduleTitle: "Biologie et physiopathologie",
    title: "Biochimie structurale : acides nucleiques",
    priority: 1,
    estimatedHours: 1.5,
    orderIndex: 3,
    content: `
      <h2>1. Composition des acides nucléiques</h2>
      <p>Les acides nucléiques sont des polynucléotides composés d'unités appelées nucléotides. Chaque nucléotide contient :</p>
      <ul>
        <li>Un sucre (ribose ou désoxyribose)</li>
        <li>Une base azotée</li>
        <li>Un groupe phosphate</li>
      </ul>

      <h3>1.1 Bases azotées</h3>
      <p><strong>Purines</strong> : adénine (A) et guanine (G)</p>
      <p><strong>Pyrimidines</strong> : cytosine (C), thymine (T) et uracile (U)</p>

      <h2>2. ADN et ARN</h2>
      <p><strong>ADN</strong> : contient du désoxyribose et la thymine. Double hélice complémentaires reliées par des liaisons hydrogène (A-T et G-C). Stocke l'information génétique.</p>
      <p><strong>ARN</strong> : contient du ribose et l'uracile. Généralement monocaténaire. Impliqué dans l'expression génétique (ARNm, ARNt, ARNr).</p>

      <h2>3. Fonction biologique</h2>
      <p>L'ADN transmet l'information génétique de génération en génération. L'ARN traduit cette information en protéines via la transcription et la traduction.</p>
    `,
  },
  "e2-ch5": {
    moduleCode: "E2",
    moduleTitle: "Biologie et physiopathologie",
    title: "Enzymologie",
    priority: 1,
    estimatedHours: 2,
    orderIndex: 4,
    content: `
      <h2>1. Définition et propriétés des enzymes</h2>
      <p>Les enzymes sont des protéines catalytiques accélérant les réactions biologiques sans être consommées. Elles sont caractérisées par :</p>
      <ul>
        <li>Une grande <strong>spécificité</strong> (substrat et réaction spécifiques)</li>
        <li>Une grande <strong>efficacité catalytique</strong> (accélèrent les réactions de 10^6 à 10^17 fois)</li>
        <li>Une action <strong>réversible</strong></li>
      </ul>

      <h3>1.1 Mécanisme catalytique</h3>
      <p>Les enzymes forment un complexe enzyme-substrat qui diminue l'énergie d'activation. Le mécanisme comporte trois étapes :</p>
      <ul>
        <li>Liaison du substrat au site actif</li>
        <li>Catalyse</li>
        <li>Libération du produit</li>
      </ul>

      <h2>2. Cinétique enzymatique</h2>
      <p>La cinétique de Michaelis-Menten décrit la vitesse de réaction en fonction de la concentration de substrat. Les paramètres clés sont :</p>
      <ul>
        <li><strong>Vmax</strong> : vitesse maximale de réaction</li>
        <li><strong>Km</strong> : concentration de substrat pour atteindre Vmax/2</li>
      </ul>

      <h2>3. Régulation enzymatique</h2>
      <p><strong>Régulation allostérique</strong> : modification de l'activité par fixation de molécules sur un site différent du site actif.</p>
      <p><strong>Inhibition compétitive</strong> : compétition entre substrat et inhibiteur pour le site actif.</p>
      <p><strong>Inhibition non-compétitive</strong> : l'inhibiteur se fixe sur un site différent et diminue Vmax.</p>
      <p><strong>Régulation covalente</strong> : phosphorylation/déphosphorylation des enzymes.</p>
    `,
  },
};

const defaultChapter = {
  moduleCode: "E2",
  moduleTitle: "Biologie et physiopathologie",
  title: "Contenu du chapitre",
  priority: 1,
  estimatedHours: 2,
  orderIndex: 3,
  content: "<p>Le contenu detaille de ce chapitre sera charge depuis la base de donnees Supabase.</p>",
};

const priorityConfig: Record<number, { label: string; variant: "coral" | "emerald" | "gray" }> = {
  1: { label: "P1 — Vital", variant: "coral" },
  2: { label: "P2 — Important", variant: "emerald" },
  3: { label: "P3 — Approfondissement", variant: "gray" },
};

export default function ChapterPage({ params }: { params: { chapterId: string } }) {
  const { profile } = useAuth();
  const searchParams = useSearchParams();
  const expressDuration = searchParams.get("express");
  const [progress, setProgress] = useState(0);
  const [markedAsRead, setMarkedAsRead] = useState(false);

  const chapter = chapterData[params.chapterId] || defaultChapter;
  const prio = priorityConfig[chapter.priority] || priorityConfig[1];
  const isFree = isChapterFree(chapter.orderIndex, profile?.role);
  const isPaid = hasFullAccess(profile?.subscription_status, profile?.role);

  const handleMarkAsRead = () => {
    setProgress(100);
    setMarkedAsRead(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {(expressDuration === "30" || expressDuration === "60") && (
        <SessionTimer durationMinutes={Number(expressDuration)} />
      )}
      <div className="flex items-center gap-2 text-sm">
        <Link
          href={`/dashboard/modules/${chapter.moduleCode}`}
          className="text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          {chapter.moduleCode} — {chapter.moduleTitle}
        </Link>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge>{chapter.moduleCode}</Badge>
          <Badge variant={prio.variant}>{prio.label}</Badge>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {chapter.estimatedHours}h estimées
          </span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
            {chapter.title}
          </h1>
          <BookmarkButton contentType="chapter" contentId={params.chapterId} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
          {progress}%
        </span>
        {markedAsRead && (
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
        )}
      </div>

      {!isFree && !isPaid ? (
        <Paywall message="Cette fiche fait partie du programme complet.">
          <Card>
            <div
              className="prose dark:prose-invert max-w-none text-sm leading-relaxed
                prose-headings:font-medium prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-3
                prose-li:text-gray-700 dark:prose-li:text-gray-300
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-medium
                prose-ul:space-y-1"
              dangerouslySetInnerHTML={{ __html: chapter.content }}
            />
          </Card>
        </Paywall>
      ) : (
        <Card>
          <div
            className="prose dark:prose-invert max-w-none text-sm leading-relaxed
              prose-headings:font-medium prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-3
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-medium
              prose-ul:space-y-1"
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {!markedAsRead && (isFree || isPaid) ? (
          <Button onClick={handleMarkAsRead} className="flex-1">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Marquer comme lu
          </Button>
        ) : markedAsRead ? (
          <div className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Chapitre termine
          </div>
        ) : null}
        {(isFree || isPaid) && (
          <Link href={`/dashboard/quiz/${params.chapterId}`} className="flex-1">
            <Button variant="outline" className="w-full">
              <FileQuestion className="w-4 h-4 mr-2" />
              Lancer le quiz
            </Button>
          </Link>
        )}
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-300">
              Conseil de révision
            </p>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
              Lis attentivement la fiche puis lance le quiz pour ancrer les notions. L&apos;algorithme de répétition espacée te reproposera les questions que tu maîtrises moins bien.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
