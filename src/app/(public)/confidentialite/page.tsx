import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles ETUDIET.",
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">
        Politique de confidentialité
      </h1>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        ETUDIET accorde une grande importance à la protection de vos données personnelles.
        Cette politique décrit les données collectées, leur utilisation et vos droits
        conformément au Règlement Général sur la Protection des Données (RGPD).
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Responsable du traitement
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Le responsable du traitement des données est ETUDIET, joignable à l'adresse
        contact@etudiet.fr.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Données collectées
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Nous collectons les données suivantes :
      </p>
      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
        <li>Nom complet et adresse email (lors de l'inscription)</li>
        <li>Année d'examen et année d'études</li>
        <li>Données de progression (scores, réponses aux quiz, avancement)</li>
        <li>Données de paiement (traitées par Stripe, non stockées sur nos serveurs)</li>
      </ul>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Finalités du traitement
      </h2>
      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
        <li>Fourniture du service de révision personnalisé</li>
        <li>Suivi de la progression et adaptation du programme</li>
        <li>Gestion des abonnements et facturation</li>
        <li>Communication relative au service (notifications, mises à jour)</li>
      </ul>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Base légale
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Le traitement de vos données repose sur l'exécution du contrat (fourniture du service)
        et votre consentement (lors de l'inscription).
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Durée de conservation
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Vos données sont conservées pendant la durée de votre compte actif, puis supprimées
        dans un délai de 12 mois après la clôture du compte.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Vos droits
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Conformément au RGPD, vous disposez des droits suivants :
      </p>
      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
        <li>Droit d'accès à vos données personnelles</li>
        <li>Droit de rectification des données inexactes</li>
        <li>Droit à l'effacement (droit à l'oubli)</li>
        <li>Droit à la portabilité de vos données</li>
        <li>Droit d'opposition au traitement</li>
        <li>Droit de retirer votre consentement à tout moment</li>
      </ul>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Pour exercer ces droits, contactez-nous à contact@etudiet.fr.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Sous-traitants
      </h2>
      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
        <li>Supabase (base de données et authentification) — Union Européenne</li>
        <li>Stripe (paiement sécurisé) — Certifié PCI DSS</li>
        <li>Vercel (hébergement) — États-Unis, clauses contractuelles types</li>
      </ul>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Cookies
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Nous utilisons uniquement des cookies techniques nécessaires au fonctionnement
        du site (session d'authentification, préférence de thème sombre/clair).
        Aucun cookie de tracking ou publicitaire n'est utilisé.
      </p>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-12">
        Dernière mise à jour : mars 2026
      </p>
    </div>
  );
}
