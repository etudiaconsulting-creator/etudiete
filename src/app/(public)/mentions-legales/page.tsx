import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site ETUDIET.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">
        Mentions légales
      </h1>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Éditeur du site
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Le site etudiet.fr est édité par ETUDIET.
      </p>
      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 space-y-1">
        <li>Email : contact@etudiet.fr</li>
        <li>Directeur de la publication : [À compléter]</li>
      </ul>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Hébergement
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Propriété intellectuelle
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        L'ensemble du contenu du site etudiet.fr (textes, images, logos, fiches de cours, exercices, quiz)
        est protégé par le droit d'auteur. Toute reproduction, représentation, modification ou adaptation,
        totale ou partielle, est interdite sans l'accord préalable et écrit de l'éditeur.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Données personnelles
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Les informations relatives au traitement des données personnelles sont détaillées dans notre{" "}
        <a href="/confidentialite" className="text-emerald-600 dark:text-emerald-400 hover:underline">
          politique de confidentialité
        </a>.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Cookies
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        Le site utilise des cookies strictement nécessaires au fonctionnement du service
        (authentification, préférences de thème). Aucun cookie publicitaire ou de tracking
        n'est utilisé.
      </p>

      <h2 className="text-xl font-medium text-gray-900 dark:text-white mt-8 mb-4">
        Limitation de responsabilité
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        ETUDIET s'efforce de fournir des contenus pédagogiques de qualité mais ne garantit pas
        l'exactitude ou l'exhaustivité des informations. L'utilisation du site se fait sous la
        responsabilité de l'utilisateur. ETUDIET ne saurait être tenu responsable des résultats
        obtenus aux examens.
      </p>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-12">
        Dernière mise à jour : mars 2026
      </p>
    </div>
  );
}
