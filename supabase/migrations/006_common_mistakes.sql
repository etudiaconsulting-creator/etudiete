-- Common mistakes table
CREATE TABLE common_mistakes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_code TEXT NOT NULL CHECK (module_code IN ('E1','E2','E3','E4','E5')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT NOT NULL CHECK (impact IN ('critical','major','minor')),
  tip TEXT NOT NULL,
  related_chapter_id TEXT,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE common_mistakes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read common mistakes"
  ON common_mistakes FOR SELECT TO authenticated USING (true);

CREATE INDEX idx_common_mistakes_module ON common_mistakes(module_code);
CREATE INDEX idx_common_mistakes_impact ON common_mistakes(impact);

-- ============================================
-- SEED DATA: 30 erreurs fréquentes BTS Diététique
-- ============================================

INSERT INTO common_mistakes (module_code, title, description, impact, tip, related_chapter_id, order_index) VALUES

-- ── E2 — Biologie & Physiopathologie (6) ──
('E2', 'Confondre catabolisme et anabolisme',
 'Le catabolisme DÉGRADE les molécules complexes en molécules simples (libère de l''énergie). L''anabolisme SYNTHÉTISE des molécules complexes à partir de molécules simples (consomme de l''énergie). Confondre les deux entraîne des erreurs en cascade dans tout le raisonnement métabolique.',
 'critical',
 'Catabolisme = Casser. Anabolisme = Assembler. Retiens le "C" de Catabolisme = "C" de Casser.',
 'e2-ch1', 1),

('E2', 'Oublier de nommer les enzymes',
 'En biochimie, chaque réaction a une enzyme spécifique. Le jury attend le nom de l''enzyme. "Le glucose est transformé en pyruvate" est insuffisant. "L''hexokinase phosphoryle le glucose en glucose-6-phosphate" est correct. Sans nom d''enzyme, la réponse est considérée incomplète.',
 'critical',
 'Pour chaque réaction que tu écris, pose-toi la question : "Quelle enzyme ?" Si tu ne sais pas, c''est un point à réviser.',
 'e2-ch5', 2),

('E2', 'Confondre NADH et NAD+',
 'NADH est la forme RÉDUITE (elle a capté des électrons). NAD+ est la forme OXYDÉE (elle est prête à capter des électrons). En glycolyse, NAD+ est réduit en NADH. Dans la chaîne respiratoire, NADH est oxydé en NAD+. Inverser ces formes fausse tout le bilan énergétique.',
 'major',
 'NADH = il a de l''Hydrogène en plus, donc il est "chargé" (réduit). NAD+ = il est "vide", prêt à capter (oxydé).',
 'e2-ch1', 3),

('E2', 'Ne pas relier la physiopatho aux adaptations alimentaires',
 'Le jury attend TOUJOURS le lien entre le mécanisme pathologique et la prise en charge nutritionnelle. Ne pas juste décrire la maladie — expliquer POURQUOI telle adaptation alimentaire est nécessaire. Une réponse purement descriptive sans lien diététique perd la moitié des points.',
 'major',
 'Après chaque mécanisme physiopathologique, ajoute systématiquement : "En conséquence, sur le plan diététique..." suivi de l''adaptation.',
 NULL, 4),

('E2', 'Confondre diabète de type 1 et type 2',
 'DT1 = auto-immun, destruction des cellules bêta, insulinopénie absolue, sujet jeune et mince. DT2 = insulinorésistance puis insulinopénie relative, sujet plus âgé, souvent en surpoids. Les prises en charge diététiques sont DIFFÉRENTES. Confondre les deux est une faute grave.',
 'critical',
 'DT1 = Déficit (plus d''insuline du tout). DT2 = Dysfonctionnement (l''insuline marche mal). Le chiffre 1 = une seule cause (auto-immune). Le chiffre 2 = deux problèmes (résistance + déficit).',
 NULL, 5),

('E2', 'Oublier les unités dans les calculs',
 'Toujours écrire l''unité : kcal, kJ, g, mg, mmol/L. Une valeur sans unité peut valoir 0 point. C''est une erreur simple à éviter mais qui coûte cher en points.',
 'minor',
 'Règle d''or : chaque nombre doit être suivi de son unité. Relis tes calculs en vérifiant que CHAQUE valeur a une unité.',
 NULL, 6),

-- ── E3 — Démarche de soin diététique (6) ──
('E3', 'Pas de diagnostic diététique structuré',
 'Le jury attend la méthodologie PES (Problème, Étiologie, Signes). "Le patient mange mal" n''est pas un diagnostic. "Apports protéiques insuffisants (P) liés à une perte d''appétit post-chirurgicale (E) objectivé par une albuminémie à 28g/L (S)" est correct.',
 'critical',
 'Utilise toujours le format PES : Problème nutritionnel → Étiologie (cause) → Signes (preuves). C''est la structure attendue par le jury.',
 NULL, 7),

('E3', 'Confondre objectifs nutritionnels et moyens',
 'Un objectif = ce qu''on veut atteindre ("augmenter les apports protéiques à 1.2g/kg/j"). Un moyen = comment y arriver ("enrichir les préparations avec de la poudre de lait"). Le jury sanctionne quand les deux sont mélangés.',
 'major',
 'Objectif = QUOI (chiffré si possible). Moyen = COMMENT (actions concrètes). Sépare-les clairement dans ta copie.',
 NULL, 8),

('E3', 'Négliger le recueil de données',
 'Avant toute prise en charge, il faut un recueil complet : données anthropométriques (poids, taille, IMC), biologiques (albuminémie, glycémie), cliniques (pathologie, traitements), alimentaires (enquête alimentaire). Oublier une catégorie = prise en charge incomplète.',
 'major',
 'Mémorise ABCA : Anthropométrique, Biologique, Clinique, Alimentaire. Chaque catégorie doit figurer dans ton recueil.',
 NULL, 9),

('E3', 'Ne pas adapter le plan alimentaire au patient',
 'Un plan alimentaire générique ne suffit pas. Il faut adapter aux goûts, habitudes culturelles, contraintes financières, capacités physiques du patient. Le jury vérifie la personnalisation.',
 'critical',
 'Après chaque recommandation, demande-toi : "Est-ce réaliste pour CE patient ?" Si la réponse est non, adapte.',
 NULL, 10),

('E3', 'Oublier le suivi et l''évaluation',
 'Une prise en charge diététique ne s''arrête pas à la prescription. Il faut planifier le suivi : quand revoir le patient, quels paramètres surveiller, quels critères d''évaluation. Le jury attend cette dimension.',
 'major',
 'Termine toujours par : "Suivi prévu à J+X avec réévaluation de [paramètres]". Ça montre que tu penses à long terme.',
 NULL, 11),

('E3', 'Mal rédiger le courrier de transmission',
 'Le courrier au médecin doit être structuré : motif, bilan diététique résumé, objectifs, plan proposé, suivi prévu. Un courrier mal structuré donne une mauvaise impression au jury.',
 'minor',
 'Structure : 1. Motif de la consultation, 2. Résumé du bilan, 3. Objectifs et plan, 4. Suivi prévu. Court et professionnel.',
 NULL, 12),

-- ── E4 — Alimentation saine & adaptée (6) ──
('E4', 'Ne pas respecter la structure du GEM-RCN',
 'En restauration collective, le jury attend que tu cites les fréquences GEM-RCN. Un menu sans référence au GEM-RCN perd des points. Les fréquences de service des plats (crudités, protéines, laitages) doivent être respectées.',
 'critical',
 'Apprends les fréquences GEM-RCN par cœur : 4/5 crudités en entrée, 4/5 légumes en garniture, etc. C''est un incontournable de l''épreuve.',
 NULL, 13),

('E4', 'Oublier la dimension développement durable',
 'Le nouveau référentiel 2027 insiste sur l''alimentation durable. Pense : circuits courts, saisonnalité, gaspillage alimentaire, empreinte carbone. Ne pas en parler = passer à côté d''une attente du jury.',
 'major',
 'Dans chaque menu ou plan alimentaire, ajoute une mention "durabilité" : choix de produits locaux, de saison, réduction du gaspillage.',
 NULL, 14),

('E4', 'Erreurs dans les calculs de ration',
 'Vérifie toujours que Protéines + Lipides + Glucides = Apport énergétique total. Erreur classique : ne pas convertir les grammes en kcal (P×4, L×9, G×4). Une erreur de conversion fausse tout le calcul.',
 'major',
 'P×4 + L×9 + G×4 = AET en kcal. Vérifie toujours la somme. Utilise un tableau à colonnes pour ne rien oublier.',
 NULL, 15),

('E4', 'Confondre ANC et RNP',
 'Les ANC (Apports Nutritionnels Conseillés) sont l''ancienne terminologie. Depuis 2021, on parle de RNP (Références Nutritionnelles pour la Population). Utiliser l''ancien terme montre un manque de mise à jour.',
 'minor',
 'Utilise toujours "RNP" dans tes copies. Si tu cites un tableau ancien avec "ANC", précise que la terminologie actuelle est "RNP".',
 NULL, 16),

('E4', 'Ne pas vérifier l''équilibre du menu sur 5 jours',
 'Un menu équilibré se juge sur la semaine, pas sur un repas isolé. Le jury vérifie la variété et l''équilibre global sur 5 jours (plan alimentaire). Proposer un menu sur un seul jour est insuffisant.',
 'major',
 'Construis toujours un plan sur 5 jours minimum. Vérifie la rotation des protéines animales, la variété des féculents et des légumes.',
 NULL, 17),

('E4', 'Ignorer les textures modifiées',
 'En milieu hospitalier ou EHPAD, les textures modifiées sont essentielles (mixé, haché, lisse). Ne pas les mentionner quand le cas le nécessite est une erreur. Le jury évalue la capacité à adapter les textures.',
 'critical',
 'Dès qu''un patient a des troubles de la déglutition ou mastication, pense IDDSI (International Dysphagia Diet Standardisation Initiative) : niveaux 0 à 7.',
 NULL, 18),

-- ── E5 — Santé publique & nutrition (6) ──
('E5', 'Ne pas connaître le PNNS actuel',
 'Le PNNS 4 (2019-2023) et ses prolongations sont les références actuelles. Connaître ses 10 repères alimentaires est indispensable. Citer un ancien PNNS montre un manque de mise à jour.',
 'critical',
 'Les 10 repères : 5 fruits et légumes, féculents complets, 2 fois poisson/semaine, limiter viande rouge à 500g/semaine, huile de colza/noix, 3 produits laitiers, limiter sel/sucre/alcool, activité physique.',
 NULL, 19),

('E5', 'Confondre prévalence et incidence',
 'La prévalence = nombre de cas existants à un moment donné (photo). L''incidence = nombre de nouveaux cas sur une période (film). Confondre les deux est une erreur conceptuelle majeure en épidémiologie.',
 'major',
 'Prévalence = "combien de personnes SONT malades maintenant ?" Incidence = "combien de personnes DEVIENNENT malades cette année ?"',
 NULL, 20),

('E5', 'Oublier les déterminants sociaux de la santé',
 'La nutrition ne se résume pas aux nutriments. Les déterminants sociaux (revenu, éducation, accès aux soins, environnement) influencent fortement les comportements alimentaires. Le jury attend cette dimension sociale.',
 'major',
 'Pour chaque problème de santé publique, cite au moins 2 déterminants sociaux : précarité, isolement, déserts alimentaires, illettrisme...',
 NULL, 21),

('E5', 'Ne pas structurer un projet d''éducation nutritionnelle',
 'Un projet d''éducation nutritionnelle doit suivre une méthodologie : diagnostic de situation, objectifs SMART, actions, évaluation. Proposer des actions sans diagnostic ni évaluation = projet incomplet.',
 'critical',
 'Structure DOSE : Diagnostic, Objectifs, Stratégies/actions, Évaluation. Chaque étape doit figurer dans ta réponse.',
 NULL, 22),

('E5', 'Confondre éducation nutritionnelle et éducation thérapeutique',
 'L''éducation nutritionnelle s''adresse à la population générale (prévention primaire). L''éducation thérapeutique du patient (ETP) s''adresse aux malades chroniques (prévention tertiaire). Les objectifs et méthodes diffèrent.',
 'major',
 'Nutritionnelle = pour TOUS (prévenir). Thérapeutique = pour les MALADES (gérer). L''ETP nécessite un programme autorisé par l''ARS.',
 NULL, 23),

('E5', 'Ignorer les inégalités sociales de santé en nutrition',
 'Les populations précaires ont un risque accru d''obésité et de carences. Ne pas en tenir compte dans un projet de santé publique est une lacune. Le jury valorise la prise en compte des publics vulnérables.',
 'minor',
 'Mentionne toujours les publics cibles prioritaires : familles modestes, personnes âgées isolées, quartiers prioritaires, migrants.',
 NULL, 24),

-- ── E1 — Anglais (6) ──
('E1', 'Ne pas structurer sa rédaction en anglais',
 'Le jury attend une structure claire : introduction (contexte + problématique), développement (2-3 paragraphes argumentés), conclusion (synthèse + ouverture). Un texte sans structure perd des points de méthodologie.',
 'critical',
 'Utilise des connecteurs logiques : "Firstly...", "Moreover...", "However...", "In conclusion...". Ils structurent visuellement ta copie.',
 NULL, 25),

('E1', 'Utiliser du vocabulaire trop général',
 'En BTS Diététique, le jury attend du vocabulaire spécialisé en nutrition et santé. "Food is important for health" est trop vague. "Balanced dietary intake is essential for metabolic homeostasis" est attendu.',
 'major',
 'Apprends 50 mots clés : nutrients, dietary fiber, micronutrients, malnutrition, food-borne illness, body mass index, caloric intake, food labeling...',
 NULL, 26),

('E1', 'Traduire mot à mot depuis le français',
 'La traduction littérale produit des phrases incorrectes en anglais. "Faire un régime" ≠ "make a regime". Correct : "to go on a diet" ou "to follow a dietary plan". Les faux-amis sont piégeux.',
 'major',
 'Attention aux faux-amis : "diet" = régime alimentaire (pas diète), "eventually" = finalement (pas éventuellement), "actually" = en fait (pas actuellement).',
 NULL, 27),

('E1', 'Négliger la compréhension du document',
 'La première partie de l''épreuve est la compréhension d''un texte scientifique en anglais. Beaucoup d''étudiants survolent le texte et répondent à côté. Lire attentivement est essentiel.',
 'critical',
 'Lis le texte 2 fois avant de répondre. Première lecture = compréhension globale. Deuxième lecture = repérage des réponses. Souligne les mots clés.',
 NULL, 28),

('E1', 'Erreurs de grammaire récurrentes',
 'Les erreurs les plus fréquentes : oubli du -s à la 3e personne du singulier, confusion entre present perfect et past simple, mauvais usage des articles (a/an/the). Ces erreurs basiques coûtent des points.',
 'minor',
 'Relis chaque phrase en vérifiant : sujet-verbe accord, temps correct, article présent. Consacre 10 min à la relecture.',
 NULL, 29),

('E1', 'Ne pas exploiter le document dans sa rédaction',
 'La rédaction doit s''appuyer sur le document fourni. Écrire un essai sans lien avec le texte = hors-sujet partiel. Le jury attend des références explicites au document.',
 'major',
 'Cite le document : "As stated in the article...", "The author highlights that...", "According to the document...". Cela prouve que tu as compris le texte.',
 NULL, 30);
