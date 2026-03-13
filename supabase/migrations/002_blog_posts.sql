-- Blog posts table for SEO content
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content_html TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts are publicly readable when published
CREATE POLICY "Anyone can read published blog posts" ON blog_posts
  FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

-- Seed with 3 sample articles
INSERT INTO blog_posts (title, slug, excerpt, content_html, published_at) VALUES
(
  'Comment bien organiser ses révisions pour le BTS Diététique',
  'organiser-révisions-bts-diététique',
  'Découvre une méthode en 5 étapes pour planifier tes révisions et maximiser tes chances de réussite au BTS Diététique.',
  '<h2>1. Fais un bilan de tes connaissances</h2>
<p>Avant de te lancer dans les révisions, prends le temps d''évaluer ton niveau actuel dans chaque matière. Un diagnostic initial te permet d''identifier tes points forts et tes lacunes. Sur ETUDIET, le diagnostic de positionnement te donne un score par module (E1 à E5) pour cibler tes efforts.</p>
<h2>2. Planifie semaine par semaine</h2>
<p>Un planning structuré est la clé de la réussite. Découpe ton programme en blocs hebdomadaires en fonction de ta date d''examen. Alterne entre les matières pour éviter la lassitude et prévois des semaines de révision plus légères avant l''examen.</p>
<p>Conseils pratiques :</p>
<ul>
<li>Commence par les matières à fort coefficient (E2 Biologie, E4 Alimentation)</li>
<li>Réserve 2 à 3 séances par semaine pour les exercices au format examen</li>
<li>Prévois une journee de repos hebdomadaire</li>
</ul>
<h2>3. Utilise la répétition espacée</h2>
<p>La science de la mémoire montre que réviser au bon moment est plus efficace que réviser longtemps. L''algorithme de répétition espacée te propose les questions à revoir juste avant que tu ne les oublies. C''est la méthode la plus efficace pour ancrer les connaissances à long terme.</p>
<h2>4. Entraîne-toi au format examen</h2>
<p>Les exercices en conditions réelles sont indispensables. Entraîne-toi avec un chronomètre, sur des sujets complets, et compare ta réponse avec le corrigé modèle. Analyse tes erreurs pour ne pas les reproduire le jour J.</p>
<h2>5. Prends soin de toi</h2>
<p>Sommeil, alimentation équilibrée et pauses régulières sont essentiels pour une mémorisation optimale. Le cerveau consolide les apprentissages pendant le sommeil. Vise 7 à 8 heures de sommeil par nuit pendant la période de révisions.</p>',
  NOW()
),
(
  'Les 5 erreurs les plus fréquentes a l''examen du BTS Diététique',
  'erreurs-fréquentes-bts-diététique',
  'Évite ces pièges classiques que font la majorité des candidats au BTS Diététique et maximise tes points.',
  '<h2>Erreur 1 : Ne pas gérer son temps</h2>
<p>L''épreuve écrite de biologie dure 4 heures. Beaucoup de candidats passent trop de temps sur les premières questions et baclent la fin. Astuce : lis tout le sujet d''abord, répartis ton temps proportionnellement aux points, et garde 15 minutes pour la relecture.</p>
<h2>Erreur 2 : Oublier de justifier ses calculs</h2>
<p>En diététique, chaque calcul (rations, apports énergétiques, besoins nutritionnels) doit être montré étape par étape. Un résultat juste sans justification ne reçoit souvent que la moitié des points. Montre ta démarche, même pour les calculs simples.</p>
<h2>Erreur 3 : Confondre les voies métaboliques</h2>
<p>Glycolyse, néoglucogenèse, béta-oxydation, cycle de Krebs... Ces voies sont souvent confondues par les candidats. Crée des fiches comparatives et utilise des schémas pour les différencier. La répétition espacée est particulièrement efficace pour ce type de connaissance.</p>
<h2>Erreur 4 : Négliger la présentation</h2>
<p>Une copie bien structurée avec des titres, des paragraphes clairs et une écriture lisible fait une vraie différence. Utilise des puces pour les listes, souligne les termes importants et aère ta copie. Les correcteurs corrigent des dizaines de copies : facilite-leur la lecture.</p>
<h2>Erreur 5 : Ne pas relire</h2>
<p>Les erreurs d''inattention coûtent cher : unités oubliées (kcal, g, mg), erreurs de calcul, confusions de termes. Réserve systématiquement 15 minutes en fin d''épreuve pour relire et vérifier tes réponses. C''est souvent là que se gagnent les derniers points.</p>',
  NOW()
),
(
  'Nouveau référentiel BTS Diététique 2027 : ce qui change',
  'nouveau-référentiel-bts-diététique-2027',
  'Tour d''horizon complet des changements du nouveau référentiel BTS Diététique qui entre en vigueur en 2027.',
  '<h2>Un référentiel modernisé</h2>
<p>Le ministère de l''Éducation nationale a revu en profondeur le programme du BTS Diététique pour mieux refléter les réalités du métier. Le nouveau référentiel entre en vigueur pour la session 2027 et concerne donc les étudiants qui entrent en première année à la rentrée 2025.</p>
<h2>Les 5 nouvelles épreuves</h2>
<p>Le nouveau référentiel réorganise les épreuves autour de 5 pôles :</p>
<ul>
<li><strong>E1 — Anglais</strong> (coef. 1, oral 45 min) : compréhension de documents scientifiques en anglais</li>
<li><strong>E2 — Biologie et physiopathologie appliquées</strong> (coef. 4, écrit 4h) : biochimie, physiologie, physiopathologie</li>
<li><strong>E3 — Démarche de soin diététique et nutritionnel</strong> (coef. 4, oral 45 min) : consultation, bilan nutritionnel, projet de soin</li>
<li><strong>E4 — Alimentation saine, durable et adaptée</strong> (coef. 4, écrit 4h) : aliments, besoins nutritionnels, menus adaptés</li>
<li><strong>E5 — Interventions en santé publique</strong> (coef. 4, oral + pratique 3h30) : prévention, éducation nutritionnelle</li>
</ul>
<h2>Ce qui change concrètement</h2>
<p>Les principales évolutions par rapport à l''ancien référentiel :</p>
<ul>
<li>L''anglais devient une épreuve à part entière (E1)</li>
<li>L''accent est mis sur la démarche de soin (E3) et la santé publique (E5)</li>
<li>Les coefficients sont rééquilibrés : E2, E3, E4 et E5 ont tous un coefficient 4</li>
<li>De nouvelles thématiques apparaissent : alimentation durable, nutrition du sportif, nutrition pédiatrique</li>
</ul>
<h2>Comment se préparer avec ETUDIET</h2>
<p>ETUDIET est entièrement conçu pour le nouveau référentiel 2027. Chaque module correspond à une épreuve, avec des fiches de cours détaillées, des quiz à répétition espacée et des exercices au format examen. Le programme de révision s''adapte automatiquement à ta date d''examen et à ton niveau.</p>',
  NOW()
);
