import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente et d'utilisation du service ETUDIET.",
};

export default function CGVPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">
        Conditions générales de vente
      </h1>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Article 1 — Objet
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Les présentes conditions générales de vente (CGV) régissent l&apos;utilisation de la
        plateforme ETUDIET et la souscription aux offres payantes. En utilisant le service,
        vous acceptez les présentes conditions.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Article 2 — Description du service
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        ETUDIET est une plateforme en ligne de préparation au BTS Diététique et Nutrition.
        Le service comprend des fiches de cours, des quiz avec répétition espacée, des
        exercices au format examen et un programme de révision personnalisé.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Article 3 — Offres et tarifs
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        ETUDIET propose les offres suivantes :
      </p>
      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
        <li>Plan Découverte (gratuit) : accès limité au contenu</li>
        <li>Programme complet (12,90 euros/mois) : accès illimité, sans engagement</li>
        <li>Objectif BTS (99 euros/an) : accès illimité, meilleur rapport qualité-prix</li>
      </ul>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Les prix sont indiqués en euros TTC. ETUDIET se réserve le droit de modifier ses
        tarifs à tout moment, les modifications ne s&apos;appliquant qu&apos;aux nouvelles souscriptions.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Article 4 — Paiement
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Les paiements sont effectués par carte bancaire via la plateforme sécurisée Stripe.
        L&apos;abonnement est prélevé automatiquement à chaque échéance (mensuelle ou annuelle).
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Article 5 — Droit de rétractation
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation
        ne peut être exercé pour les contenus numériques fournis sur un support immatériel dont
        l&apos;exécution a commencé avec votre accord. Toutefois, ETUDIET offre une garantie
        satisfait ou remboursé de 14 jours après la première souscription.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Article 6 — Résiliation
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Vous pouvez résilier votre abonnement à tout moment depuis votre espace personnel
        (Paramètres &gt; Abonnement &gt; Gérer). La résiliation prend effet à la fin de la
        période en cours. Aucun remboursement au prorata n&apos;est effectué.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Article 7 — Garantie diplôme*
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        La garantie &quot;diplôme ou remboursé&quot; est applicable sous les conditions suivantes :
        abonnement annuel actif, complétions d&apos;au moins 80% du programme, et présentation des
        résultats officiels. Les modalités détaillées sont disponibles sur demande à
        contact@etudiet.fr.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Article 8 — Limitation de responsabilité
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        ETUDIET fournit un outil de révision et ne garantit pas l&apos;obtention du diplôme.
        La responsabilité d&apos;ETUDIET est limitée au montant de l&apos;abonnement souscrit.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Article 9 — Droit applicable
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Les présentes CGV sont soumises au droit français. En cas de litige, les parties
        s&apos;engagent à rechercher une solution amiable avant toute action judiciaire. À défaut,
        les tribunaux français seront compétents.
      </p>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-12">
        Dernière mise à jour : mars 2026
      </p>
    </div>
  );
}
