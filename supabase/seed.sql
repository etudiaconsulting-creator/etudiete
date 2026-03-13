-- Seed Part 1: Modules and E2 Chapters (Niveau 1 + Niveau 2 + first Metabolique)
-- BTS Diététique 2027 Referentiel

-- Delete existing modules (CASCADE handles related data)
DELETE FROM modules;

-- Insert 5 new modules
INSERT INTO modules (id, code, title, description, coefficient, exam_type, exam_duration, order_index) VALUES
('11111111-1111-1111-1111-111111111101', 'E1', 'Anglais', 'Comprehension de documents scientifiques en anglais. Expression ecrite et orale sur des thematiques de santé, nutrition et diététique.', 1, 'oral', '30min + 15min', 1),
('11111111-1111-1111-1111-111111111102', 'E2', 'Biologie et physiopathologie appliquees a la diététique et a la nutrition', 'Biochimie structurale et métabolique, biologie cellulaire, histologie, physiologie des grandes fonctions, physiopathologie des pathologies nutritionnelles.', 4, 'written', '4h', 2),
('11111111-1111-1111-1111-111111111103', 'E3', 'Elaboration et mise en oeuvre d''une demarche de soin diététique et nutritionnel', 'Consultation diététique, bilan nutritionnel, projet de soin, éducation thérapeutique du patient, prise en charge individuelle.', 4, 'oral', '45min', 3),
('11111111-1111-1111-1111-111111111104', 'E4', 'Conception et elaboration d''une alimentation saine, durable et adaptee', 'Connaissance des aliments, valeur nutritionnelle, besoins nutritionnels, elaboration de menus et plans alimentaires adaptes, qualité et sécurité alimentaire.', 4, 'written', '4h', 4),
('11111111-1111-1111-1111-111111111105', 'E5', 'Interventions en santé publique dans les domaines de la diététique et de la nutrition', 'Actions de prévention, éducation nutritionnelle collective, restauration collective, projets de santé publique, communication en nutrition.', 4, 'practical', '3h30', 5);

-- Insert E2 Chapters (19 total)
-- Niveau 1: Bases (10 chapters)
INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'Biochimie structurale : glucides', 'Structure, proprietes et classification des glucides. Monosaccharides, disaccharides et polysaccharides.', 1, 0, 2.0, '<h2>Les glucides</h2><p>Les glucides, aussi appeles hydrates de carbone ou sucres, sont des molecules organiques compose´es de carbone, d''hydroge`ne et d''oxyge`ne. Ils constituent une source d''énergie essentielle pour tous les organismes vivants et jouent des ro^les structuraux et fonctionnels fondamentaux.</p><h3>De´finition et formule gene´rale</h3><p>Les glucides re´pondent a` la formule ge´ne´rale Cn(H2O)m. Cette formule simple est trompeuse car elle ne refle`te que la composition e´le´mentaire. La de´finition chimique pre´cise est : les glucides sont des polyhydroxyalde´hydes ou des polyhydroxyc´etones, ou des compose´s pouvant les former par hydrolyse.</p><h3>Classification des glucides</h3><p>On distingue trois cate´gories principales :</p><ul><li><strong>Monosaccharides</strong> : sucres simples, unite´s de base, ne peuvent pas e^tre hydrolyse´s en compose´s plus simples</li><li><strong>Disaccharides</strong> : forme´s de 2 monosaccharides lie´s par une liaison osidique</li><li><strong>Polysaccharides</strong> : polyacondensats de nombreux monosaccharides</li></ul><h3>Les monosaccharides</h3><p>Les monosaccharides les plus importants sur le plan nutritionnel sont le glucose, le fructose et le galactose.</p><p><strong>Le glucose (C6H12O6)</strong> : c''est le monosaccharide le plus abondant dans la nature. Presente sous deux formes isomeres (α et β), il existe aussi sous forme line´aire et cyclique (penta ou hexose). Le glucose joue un ro^le central dans le me´tabolisme e´nerge´tique. C''est le sucre du sang (glucose´mie normale : 0,8-1,2 g/L en je^un).</p><p><strong>Le fructose</strong> : hexose ce´tonique (c´etose), 1,2 a` 1,7 fois plus sucrant que le glucose. Se trouve naturellement dans les fruits (d''ou` son nom). Métabolisme inde´pendant de l''insuline initialement, mais impacte´ ne´gativement en exce`s sur le me´tabolisme glucidique et lipidique.</p><p><strong>Le galactose</strong> : hexose aldehyde, compose´ structural du lactose. Peu libre dans la nature, essentiellement forme´ par digestion du lactose.</p><h3>Liaisons osidiques</h3><p>La liaison osidique est une liaison C-O-C entre deux monosaccharides. Elle se forme par condensation avec perte d''une mole´cule d''eau. On distingue :</p><ul><li><strong>Liaisons α (1-4)</strong> : unite les monosaccharides dans l''amidon et le glycoge`ne</li><li><strong>Liaisons β (1-4)</strong> : unit les monomers de cellulose</li><li><strong>Liaisons α (1-6)</strong> : points de ramification dans l''amidon et le glycoge`ne</li></ul><h3>Polysaccharides d''intere^t nutritionnel</h3><p><strong>L''amidon</strong> : polysaccharide de re´serve chez les plantes. Compose´ d''amylose (lie´e α 1-4, structure line´aire) et d''amylopectine (ramifiée via liaisons α 1-6). Source majeure d''e´nergie alimentaire pour l''humain. Dige´rable par les enzymes digestives.</p><p><strong>Le glycoge`ne</strong> : polysaccharide de re´serve chez les animaux. Structure tre`s ramifiée (liaisons α 1-6 fre´quentes). Stocke´ principalement dans le foie et les muscles. Mobilisable rapidement lors de besoins e´nerge´tiques (glycoge´nolyse).</p><p><strong>La cellulose</strong> : polysaccharide structure´ avec liaisons β (1-4). Repre´sente la majorite´ des matie`res se`ches ve´ge´tales. Non dige´rable par les enzymes humaines (pas de cellulase), d''ou` son ro^le de fibre alimentaire. Essentielle pour le transit intestinal et la se´lection du microbiote.</p><h3>Ro^les biologiques des glucides</h3><ul><li><strong>Role ene´rge´tique</strong> : 4 kcal/g, source rapide d''énergie pour le cerveau et les muscles</li><li><strong>Role structural</strong> : composant de la cellulose, chitine, peptidoglycane</li><li><strong>Role de re´serve</strong> : amidon et glycoge`ne permettent le stockage d''énergie</li><li><strong>Ro^le de reconnaissance</strong> : glycoprote´ines et glycolipides interviennent dans l''identite´ cellulaire</li><li><strong>Role métabolique</strong> : fourniture de pre´curseurs pour la synthe`se d''autres molecules (acides amine´s, lipides)</li></ul><p>La regulation de la glyce´mie par l''insuline et le glucagon permet de maintenir le glucose sanguin constant, essentiellement pour alimenter le cerveau et les he´maties qui en de´pendent.</p>'),
('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'Biochimie structurale : lipides', 'Acides gras, triglycerides, phospholipides, cholesterol. Roles métaboliques et nutritionnels.', 1, 1, 2.5, '<h2>Les lipides</h2><p>Les lipides constituent une famille tre`s he´te´roge`ne de mole´cules organiques caracte´rise´es par une solubilite´ tre`s faible dans l''eau mais bonne dans les solvants non polaires (e´ther, chloroforme). Ils jouent des ro^les essentiels tant sur le plan ene´rge´tique que structural et fonctionnel.</p><h3>De´finition et classification</h3><p>Les lipides sont des compose´s organiques constitue´s principalement de carbone et d''hydroge`ne, avec peu d''oxyge`ne. On distingue :</p><ul><li>Lipides simples (acides gras, e´sters)</li><li>Lipides complexes (phosolipides, lipoprote´ines)</li><li>Lipides de´rive´s (ste´roles, vitamines liposolubles)</li></ul><h3>Acides gras</h3><p><strong>Structure et classification</strong> : un acide gras est une longue chaî^ne hydrocarbonée (4 a` 24 atomes de carbone ge´ne´ralement) avec un groupe carboxyle (-COOH) a` une extre´mite´. On distingue :</p><p><strong>Acides gras sature´s (AGS)</strong> : lie´s entre eux par des liaisons simples C-C. Solides ou semi-solides a` tempe´rature ambiante. Exemples : acide palmitiqu (C16), ste´ariqu (C18). Absorbe´s facilement mais contribuent a` l''augmentation de la choleste´role´mie LDL en exce`s.</p><p><strong>Acides gras insature´s</strong> : contiennent une ou plusieurs liaisons doubles C=C. Liquides a` tempe´rature ambiante. On distingue :</p><ul><li><strong>Acides gras monoinsature´s (AGMI)</strong> : une seule double liaison. Exemple : acide ole´iqu (olive). Effet neutre ou le´ge`rement positif sur le profil lipidique.</li><li><strong>Acides gras polyinsature´s (AGPI)</strong> : plusieurs doubles liaisons. Essentiels si omega-3 et omega-6. Se trouvent dans les poissons gras, les noix, les huiles ve´ge´tales.</li></ul><p><strong>Acides gras essentiels</strong> : acide line´iqu (omega-6, C18:2) et acide α-linole´niqu (omega-3, C18:3). Non synthe´tise´s par l''organisme, must ^etre apporte´s par l''alimentation. Se transforment respectivement en acide arachidoniq et acide EPA/DHA.</p><h3>Triglycerides</h3><p>Les triglycerides (ou triacylglyce´rols) sont forme´s de glycérol estérifié par 3 acides gras. Ils constituent 95% des lipides alimentaires et corporels. Sont le principal vecteur de stockage de l''énergie lipidique (9 kcal/g).</p><p>Leur composition en acides gras (sature´s vs insature´s) influence fortement le profil me´tabolique et cardiometaboliq du sujet.</p><h3>Phospholipides</h3><p>Structure : glycérol ou sphinganine + 2 acides gras + groupe phosphat + groupe de te^te pola`ire (choline, e´thanolamine, sérine). Sont <strong>amhipathiques</strong> : partie lipophile et partie hydrophile.</p><p><strong>Ro^le structural</strong> : composant majeur des membranes biologique`s (modèle de la mosaïque fluide). Permettent la fluidité membranaire.</p><p><strong>Ro^le de signalisation</strong> : implique´s dans les cascades de signalisation cellulaire. Les lysophospholipides sont des mediateu`rs importants.</p><h3>Cholesterol</h3><p>Le cholesteol est un sterol (alcool polycyclique) essentiell pour la synthe`se des membranes, des hormones ste´roïdes et de la vitamine D.</p><p><strong>Sources</strong> : 70% synthe´tise´ endoge`nement (foie principalement), 30% d''origine alimentaire.</p><p><strong>Transport sanguin</strong> : le cholesterol est insoluble dans le plasma sanguin, il est transport par des lipoprote´ines :</p><ul><li>LDL (low-density lipoprotein) : transport du cholesterol du foie vers les tissus, "mauvais cholesterol"</li><li>HDL (high-density lipoprotein) : transport inverse du choleste´rol, "bon cholesterol"</li><li>VLDL : transport des triglycerides depuis le foie</li></ul><p><strong>Dyslipidemie</strong> : elevation de la cholesterole´mie totale ou LDL, ba´isse du HDL, augmentation des triglycerides. Facteur de risque cardio-vasculaire majeur.</p><h3>Omega-3 vs Omega-6</h3><p>La position de la premie`re double liaison de´termine la se´rie.</p><p><strong>Omega-6</strong> (premiere double liaison apre`s 6e carbone) : acide linéiqu abundant dans les huiles vege´tales, noix, gra´ines. Precurseur de l''acide arachidoniq (AA) et des eicosanoïdes pro-inflammato`ires en exce`s.</p><p><strong>Omega-3</strong> (premiere double liaison apre`s 3e carbone) : acide α-linole´niqu dans les graines de lin, noix. Pre´curseur de l''EPA et DHA (poissons gras). Propriete´s anti-inflammato`ires et cardio-protectrices.</p><p>Un ratio omega-6/omega-3 equilibré (ide´alement 5:1 ou moins) est recommande´.</p><h3>Ro^les biologiques</h3><ul><li>Source d''énergie de longue durée (9 kcal/g)</li><li>Composant structutal des membranes</li><li>Synthe`se d''hormones ste´roïdes et vitamines</li><li>Absorbtion des vitamines liposolubles</li><li>Insolation thermiq et protection me´caniq</li><li>Signalisation cellulaire via eicosanoïdes</li></ul>'),
('22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'Biochimie structurale : protides', 'Acides amines, liaison peptidique, niveaux de structure des protéines, roles biologiques.', 1, 2, 2.5, '<h2>Les prote´ines</h2><p>Les protéines sont des macromolécules organiques comprenant une ou plusieurs chaî^nes polypeptidiq formées par l''enchaî^nement d''acides amine´s lie´s par des liaisons peptidiq. Elles constituent environ 15-20% du poids corporel et jouent des ro^les essentiels dans pratiquement tous les processus biologiq.</p><h3>Les acides amine´s</h3><p><strong>Structure ge´ne´rale</strong> : un acide amine´ se compose de :</p><ul><li>Un groupe amine´ (-NH2) basiq</li><li>Un groupe carboxyle (-COOH) acidiq</li><li>Un groupe re´siduel (chaî^ne late´rale ou "R") qui caracte´rise chaque acide amine´</li><li>Un atome d''hydroge`ne</li><li>Un carbone central (carbone alpha)</li></ul><p>Il existe environ 20 acides amine´s "courants" encode´s par le code génétiq.</p><h3>Classification des acides amine´s</h3><p><strong>Acides amines essentiels</strong> (9) : non synthe´tise´s par l''organisme, doivent ^etre apporte´s par l''alimentation. Leucine, isoleucine, valine (BCAA), lysine, me´thionine, phe´nylalanie, tryptophane, thre´onine, histidine.</p><p><strong>Acides amines non essentiels</strong> (11) : synthe´tise´s par l''organisme a` partir d''autres pre´curseurs. Glycine, alanine, serine, aspartate, glutamate, asparagine, glutamine, proline, tyrosine, cysteine, arginine.</p><p><strong>Acides amines conditionnellement essentiels</strong> : synthe´tise´s normalement mais deviennent essentiels en cas de stress, maladie grave ou effort physique intense (arginine, glutamine, tyrosine).</p><p><strong>Classification par chaî^ne late´rale</strong> :</p><ul><li>AA avec chaî^ne late´rale hydrophobe ou apolaire (Ala, Val, Leu, Ile, Phe, Trp, Met, Pro)</li><li>AA avec chaî^ne late´rale hydrophile et polaire (Ser, Thr, Tyr, Asn, Gln, Cys)</li><li>AA ionise´s acides (Asp, Glu) et basiques (Lys, Arg, His)</li></ul><h3>La liaison peptidiq</h3><p>La liaison peptidiq est une liaison covalent C-N formée entre le groupe carboxyle (-COOH) d''un acide amine´ et le groupe amine´ (-NH2) d''un autre acide amine´, avec liberation d''une mole´cule d''eau (conden sans).</p><p>Cette reaction est catalyse´e par les aminoacyl-ARNt synthe´tas sur les ribosomes pendant la traduction.</p><p>La rotation de la liaison peptidiq est lim`itée, ce qui confere une structure plane au plan peptidiq.</p><h3>Niveaux de structure des prote´ines</h3><p><strong>Structure primaire</strong> : sequence line´aire des acides amine´s dans la chaî^ne polypeptidiq. De´termine´e par le code ge´ne´tiq via l''ARNm. C''est la structure fonda´mentale qui determine toutes les autres propriete´s de la prote´ine.</p><p><strong>Structure secondaire</strong> : arrangement e´spatial local de la chaî^ne polypeptidiq, stabilise´ par des liaisons hydrogene entre le C=O d''une liaison peptidiq et le N-H d''une autre liaison (pas force´ment proximale). Principales formes :</p><ul><li>Hélice alpha (α) : structure helicoïdale compacte, stabilisée par 3,6 acides amine´s par tour</li><li>Feuillet beta (β) : structure ite´e´ due polypeptidiq e´tendue, stabilise´e par liaisons hydrogene lat´e´rales</li><li>Boucles et tours : regions de transition sans structure regulie`re</li></ul><p><strong>Structure tertiaire</strong> : replie´ment tridimensionnel global de la chaî^ne polypeptidiq. Determine par :</p><ul><li>Liaisons hydrogene</li><li>Interactions hydrophobe/hydrophile (effet hydrophobe)</li><li>Liaisons ioniq (ponts salins)</li><li>Liaisons disulfure (-S-S-) entre deux residus cysteine</li><li>Interactions de Van der Waals</li></ul><p>La structure tertiaire est cruciale pour la fonction biologique (site actif des enzymes, sites de liaison).</p><p><strong>Structure quaternaire</strong> : arrangement spatial de plusieurs chaî^nes polypeptidiq (sous-unite´s) dans une prote´ine multimerique. Exemple : he´moglobine (4 sous-unite´s). Stabilise´e par les me^mes types de liaisons qu''en structure tertiaire (pas de liaisons disulfure entre chaî^nes ge´ne´ralement).</p><h3>Denaturation</h3><p>La dénaturatio est la perte de la structure tridimensionnelle d''une protéine, entraiî^nant la perte de sa fonction. Peut ^etre cause´e par :</p><ul><li>Elation de tempe´rature</li><li>Variation de pH</li><li>Force ionique exce´ssive ou insuffisanté</li><li>Compose´s chimiqu (ethanol, ure´e)</li><li>Rayonnement (UV, X)</li></ul><p>La dénaturatio peut ^etre re´versible (renaturatio possible) ou irre´versible (aggre´gation des chaî^nes).</p><h3>Ro^les biologiq des prote´ines</h3><ul><li><strong>Catalytiq</strong> : les enzymes</li><li><strong>Structural</strong> : collagene`, keratin</li><li><strong>Transport</strong> : hemoglobin, transferrin, lipoprote´ines</li><li><strong>De´fense</strong> : anticorps, lysozyme</li><li><strong>Regulation</strong> : hormones, recepteurs</li><li><strong>Contraction</strong> : actine, myosine</li><li><strong>Reserve</strong> : ovalbumine, caséine</li></ul><p>Les prote´ines alimentaires fournissent les acides amine´s essentiels et non-essentiels ne´cessaires a` la synthe`se des prote´ines corporelles. Les besoins en prote´ines varient selon l''aˆge, le sexe, l''activité´ et l''état de santé´.</p>'),
('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'Biochimie structurale : acides nucleiques', 'ADN, ARN, nucleotides, code génétique, replication, transcription, traduction.', 1, 3, 2.0, '<h2>Les acides nucle´iques</h2><p>Les acides nucle´iques sont des macromole´cules qui stockent et transmettent l''information ge´ne´tiq. Il existe deux types principaux : l''ADN et l''ARN. Chaque mole´cule est compose´e de nucleotides assemble´s en chaî^ne.</p><h3>Structure des nucleotides</h3><p>Un nucleotide comporte trois composants :</p><ul><li><strong>Une base azo´te´e</strong> : purine (Ade´nine, Guanine) ou pyrimidine (Cytosine, Thymine, Uracile)</li><li><strong>Un sucre pentose</strong> : ribose (ARN) ou de´oxyribose (ADN)</li><li><strong>Un ou plusieurs groupes phosphate</strong> : forment le "backbone" sucre-phosphate et l''e´nergie cellulaire (ATP)</li></ul><h3>Bases azo´te´es</h3><p><strong>Purines</strong> (deux cycles fuse´s) :</p><ul><li><strong>Ade´nine (A)</strong> : dans ADN et ARN</li><li><strong>Guanine (G)</strong> : dans ADN et ARN</li></ul><p><strong>Pyrimidines</strong> (un cycle) :</p><ul><li><strong>Thymine (T)</strong> : uniquement dans l''ADN</li><li><strong>Cytosine (C)</strong> : dans ADN et ARN</li><li><strong>Uracile (U)</strong> : uniquement dans l''ARN (remplace la thymine)</li></ul><h3>Structure de l''ADN</h3><p><strong>Composition</strong> : de´oxyribose (sucre a` 5 carbones avec pas d''hydrogene sur le carbone 2), phosphate, bases A-T-G-C.</p><p><strong>Structure primaire</strong> : chaî^ne simple de nucleotides lie´s par des liaisons phosphodiesters entre le carbone 3'' du sucre d''un nucleotide et le carbone 5'' du nucleotide suivant.</p><p><strong>Structure double he´lice</strong> (Watson-Crick) :</p><ul><li>Deux brins antiparalle`les (directionn 5''→3'' vs 3''→5'')</li><li>Base pairing via liaisons hydrogene : A-T (2 liaisons), G-C (3 liaisons)</li><li>Helice droite (droitier), pas d''environ 3,4 nm</li><li>10 paires de bases par tour d''he´lice</li><li>Majorite´ et minorité´ sillons</li></ul><p>La comple´mentarite´ des bases assure la possibilite´ de replication exact et la transmission de l''information ge´ne´tiq.</p><h3>Structure de l''ARN</h3><p><strong>Composition</strong> : ribose (sucre avec hydroxyˊ sur C2), phosphate, bases A-U-G-C.</p><p><strong>Mono-brin</strong> : ge´ne´ralement a` simple brin, peut former des structures secondaires (boucles, tiges) via appariement intramoole´culaire.</p><p><strong>Types d''ARN</strong> :</p><ul><li><strong>ARN me´ssager (ARNm)</strong> : copie transitoire du gene´, transport l''information de l''ADN aux ribosomes</li><li><strong>ARN de transfert (ARNt)</strong> : ache`me les acides amine´s corrects au ribosome pendant la traduction</li><li><strong>ARN ribosomiq (ARNr)</strong> : composant structural et catalytiq des ribosomes</li><li><strong>Autres ARN</strong> : ARN nucleolaire (snoARN), ARN nucleair (snARN), ARN de petite interference (siARN)</li></ul><h3>Replication de l''ADN</h3><p><strong>Semi-conservative</strong> : chaque nouveau brin ADN est une copie exacte du brin pate´rnel. Chaque mole´cule fille contient un brin original et un brin ne´.</p><p><strong>Enzymes implique´es</strong> :</p><ul><li>Helicase : deplie la double he´lice</li><li>Primase : synthe´tise les amorces ARN</li><li>ADN polyme´rase : synthe´tise le nouveau brin (5''→3'')</li><li>Ligase : scelle les fragments d''Okazaki</li></ul><p><strong>Brin avance´ et retarde´</strong> : du fait de l''antiparalle´lisme, un brin (5''→3'') est synthe´tise´ continuˊment (avance´), l''autre est synthe´tise´ en fragments (retarde´).</p><h3>Transcription</h3><p><strong>Processus</strong> : copie de l''information d''une gene (fragment d''ADN) vers un ARNm pre´curseur via l''ARN polyme´rase II.</p><p><strong>Etapes</strong> :</p><ul><li>Initiation : reconnaissance de promoteur TATA</li><li>Elongation : synthe`se de l''ARNm</li><li>Terminaison : reconnaissance de se´quences stop</li></ul><p><strong>ARNm mature</strong> : apre`s epissage (enlever les introns, conserver les exons) et polyadenylation, l''ARNm quitte le noyau.</p><h3>Traduction</h3><p>Processus de synthe`se des prote´ines au ribosome a` partir de l''ARNm.</p><p><strong>Code ge´ne´tiq</strong> : codons de 3 nucleotides specifiaient chacun un acide amine´ ou un signal stop. Code universal (ou presque), dege´ne´re´ (plusieurs codons pour le me^me acide amine´), se´quentiel (sans chiffre entre codons).</p><p><strong>Etapes</strong> :</p><ul><li><strong>Initiation</strong> : ribosome se fixe sur le codon de´marrage (AUG), ARNtMet se lie</li><li><strong>Elongation</strong> : ARNt achemine´ par codon-anticodon, liaison peptidiq, translocation</li><li><strong>Terminaison</strong> : codon stop reconnu, polypeptide libere´</li></ul><h3>Mutations et variations</h3><p>Alterations de la sequence d''ADN :</p><ul><li><strong>Mutations ponctuelles</strong> : substitution, insertion, deletion</li><li><strong>Mutations silencieuses</strong> : pas de modification de l''acide amine´</li><li><strong>Mutations faux-sens</strong> : modification de l''acide amine´</li><li><strong>Mutations non-sens</strong> : creation d''un codon stop prématuré´</li></ul><p>Les mutations peuvent ^etre sponta´nees ou induites par des mutage`nes (chimique, physiq, biologiq).</p>'),
('22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'Enzymologie', 'Nature des enzymes, specificite, site actif, cinetique enzymatique, facteurs d''activité, inhibition.', 1, 4, 2.5, '<h2>Enzymologie</h2><p>Les enzymes sont des prote´ines (rarement des ARN avec activité´ catalytiq) qui accelerent les reactions chimiq en abaissant l''énergie d''activation. Elles sont essentielles a` la vie car sans elles, les reactions necessaires a` la vie procede´raient a` une vitesse negligeable.</p><h3>Nature et propriete´s des enzymes</h3><p><strong>Definition</strong> : biocatalyseur qui augmente la vitesse de reaction sans ^etre modifie´ (ou minime´). Agit en petite quantité´, est regeneré apre`s chaque cycle.</p><p><strong>Propriete´s</strong> :</p><ul><li>Activite´ catalytiq : augmente la vitesse de reaction (106 a` 1017 fois)</li><li>Specificite´ : ne catalyse qu''une reaction ou un type de reaction specifiq</li><li>Regulation : peut ^etre controle´e par cofacteurs, coenzymes, inhibiteurs</li><li>Reactivité´ : fonctionne de`s que le substrat est present</li></ul><h3>Specificite´ enzymatiq</h3><p><strong>Specificite´ absolue</strong> : une enzyme ne catalyse qu''une seule reaction sur un seul substrat (exemple : lactase sur lactose).</p><p><strong>Specificite´ de groupe</strong> : reconnaissance d''un groupe chimiq particulier (exemple : kinases sur groupe hydroxyˊ).</p><p><strong>Specificite´ de configuration</strong> : reconnaissance de l''isomerie optiq (D ou L).</p><p>Cette specificite´ est due a` la structure tridimensionnelle du site actif.</p><h3>Mecanisme catalytiq : Le site actif</h3><p><strong>Site actif</strong> : region de l''enzyme ou` se fixe le substrat et ou` se produit la transformation chimiq. Occupe moins de 10% du volume de l''enzyme mais de´termine son activité´.</p><p><strong>Modele cle-serrure</strong> (Emil Fischer, 1890) : le site actif est forme´ de facon rigide et complémentaire a` la forme du substrat, comme une cle´ entrant dans une serrure.</p><p><strong>Modele d''ajustement induit</strong> (Daniel Koshland, 1958) : le site actif change de conformation au contact du substrat, ce qui permet :</p><ul><li>Une meilleure fixation du substrat</li><li>L''activation du substrat</li><li>La stabilisation de l''e´tat de transition</li></ul><p>Ce modele explique mieux la specificite´ et l''efficacite´ catalytiq observe´es.</p><h3>Mecanisme de catalyse enzymatiq</h3><p><strong>Cycle catalytiq</strong> :</p><ul><li>E + S → ES (fixation du substrat)</li><li>ES → EP (transformation du substrat en produit)</li><li>EP → E + P (liberation du produit)</li></ul><p><strong>Mecanismes de catalyse</strong> :</p><ul><li>Abaissement de l''énergie d''activation de la reaction</li><li>Stabilisation de l''e´tat de transition</li><li>Facilitation du transfert de groupes chimiq</li><li>Creation d''un environnement adequat pour la reaction</li></ul><h3>Cinetiq enzymatiq : Michaelis-Menten</h3><p><strong>Equation de Michaelis-Menten</strong> :</p><p>v = Vmax × [S] / (Km + [S])</p><p>ou` :</p><ul><li>v = vitesse de reaction</li><li>Vmax = vitesse maximale (lorsque [S] tend vers l''infini)</li><li>Km = constante de Michaelis (concentration de substrat pour laquelle v = Vmax/2)</li><li>[S] = concentration de substrat</li></ul><p><strong>Km</strong> : mesure l''affinite´ enzyme-substrat. Petit Km = forte affinite´.</p><p><strong>Vmax</strong> : depend de la concentration d''enzyme et de la constante catalytiq kcat.</p><p><strong>kcat</strong> : nombre de molecule´s de substrat transforme´es par site actif par unite´ de temps.</p><p><strong>Efficacite´ catalytiq</strong> : kcat/Km caracterise l''efficacite´ globale de l''enzyme.</p><h3>Facteurs modulant l''activité´ enzymatiq</h3><p><strong>Temperature</strong> : augmentation accele`re la reaction jusqu''a` un optimum (ge´ne´ralement 37°C pour les enzymes humaines), puis denatura l''enzyme.</p><p><strong>pH</strong> : chaque enzyme a un pH optimal (pH neutre pour la plupart des enzymes cytoplasmiq, acide pour les enzymes digestives, basique pour certaines enzymes lysosomiales). Modification du pH affecte la charge des groupes ionisables.</p><p><strong>Concentration d''enzyme</strong> : relation line´aire entre concentration d''enzyme et vitesse (tant que le substrat est en exce`s).</p><p><strong>Force ionique</strong> : affecte la structure tertiaire de l''enzyme et les interactions enzyme-substrat.</p><p><strong>Cofacteurs et coenzymes</strong> :</p><ul><li><strong>Cofacteurs</strong> : non-protéiques (ions mine´raux comme Mg2+, Zn2+, Fe2+, etc.)</li><li><strong>Coenzymes</strong> : molecules organiq comme NAD+, NADP+, FAD, CoA, vitamines B</li></ul><h3>Inhibition enzymatiq</h3><p><strong>Inhibition competitiv</strong> : l''inhibiteur se fixe au site actif et concurrence le substrat. Le Km augmente (moins affine), Vmax inchange´. Peut ^etre re´verse´e en augmentant [S].</p><p><strong>Inhibition non-competitiv</strong> : l''inhibiteur se fixe ailleurs que le site actif et empe^che la catalyse. Vmax diminue, Km inchange´. Ne peut pas ^etre compe´nse´e par [S].</p><p><strong>Inhibition mixte</strong> : combinaison des deux mecanismes.</p><p><strong>Inhibition irre´versib</strong> : formation d''une liaison covalent stable entre inhibiteur et enzyme, inactivation permanente.</p><h3>Regulation enzymatiq</h3><p><strong>Feedback inhibition</strong> : le produit final inhibie l''enzyme qui le synthe´tise, controlant ainsi le flux metaboliq.</p><p><strong>Allosterisme</strong> : fixation d''un effecteur allosteriq sur une site autre que le site actif, modifie la conformation et l''activité´ de l''enzyme.</p><p><strong>Modification covalent</strong> : phosphorylation/de´phosphorylation permet une regulation rapide (exemple : phosphorylase kinase active la phosphorylase).</p><p><strong>Comparabilite´ enzymatiq</strong> : synthese´/degradation d''enzymes selon les besoins metaboliq.</p>'),
('22222222-2222-2222-2222-222222220006', '11111111-1111-1111-1111-111111111102', 'Vitamines hydrosolubles', 'Vitamines B1, B2, B3, B5, B6, B8, B9, B12, C. Roles métaboliques, sources, carences, ANC.', 1, 5, 2.5, '<h2>Vitamines hydrosolubles</h2><p>Les vitamines hydrosolubles sont solubles dans l''eau et ne sont donc pas stocke´es significativement dans l''organisme (sauf B12 dans le foie). Elles doivent ^etre apportees re´gulie`rement par l''alimentation. La plupart agissent comme coenzymes dans les reactions metaboliq.</p><h3>Vitamine B1 (Thiamine)</h3><p><strong>Forme active</strong> : thiomine pyrophosphate (TPP).</p><p><strong>Roles metaboliq</strong> : coenzyme essentiell pour :</p><ul><li>Decarboxylation oxydative du pyruvate et de l''α-ce´toga</li><li>Métabolisme des sucres et des acides amines branche´s</li><li>Fonction nerveuse (synthese d''acetylcholine)</li></ul><p><strong>Sources</strong> : levure, germes de ce´re´ales, porc, noix, le´gumineuses.</p><p><strong>Carences</strong> : beriberi (polyneuropathie), syndrome de Wernicke-Korsakoff (alcoolisme), problemes cardiaq.</p><p><strong>ANC</strong> : 1,2 mg/jour (homme adulte), 0,9 mg/jour (femme adulte).</p><h3>Vitamine B2 (Riboflavine)</h3><p><strong>Forme active</strong> : FAD et FMN (flavines nucle´otides).</p><p><strong>Roles metaboliq</strong> : coenzymes pour :</p><ul><li>Chaine respiratoire mitochondriale (complexes I et II)</li><li>β-oxydation des acides gras</li><li>Hydroxylation (detoxication cytochrome P450)</li></ul><p><strong>Sources</strong> : abats, oeufs, riz comple´, amandes, champignons, yaourt.</p><p><strong>Carences</strong> : cheïlite (inflammation des le`vres), glossite (inflammation de la langue), dermatite, anémie.</p><p><strong>ANC</strong> : 1,6 mg/jour (homme), 1,2 mg/jour (femme).</p><h3>Vitamine B3 (Niacine, Acide nicotiniq)</h3><p><strong>Forme active</strong> : NAD+ et NADP+.</p><p><strong>Roles metaboliq</strong> : coenzymes pour :</p><ul><li>Glycolyse et respiration cellulaire (desa) de nombreuses deshydrogenas)</li><li>Reparation de l''ADN</li><li>Signalisation cellulaire</li></ul><p><strong>Biosynthe`se</strong> : peut ^etre synthe´tise´e a` partir du tryptophane (100 mg de tryptophane = 1 mg de niacine).</p><p><strong>Sources</strong> : thon, poulet, arachides, champignons, riz comple´, tomate seche´e.</p><p><strong>Carences</strong> : pellagre (dermatite, diarrhée, demence, "4 D" classiq).</p><p><strong>ANC</strong> : 16 mg/jour (homme), 12 mg/jour (femme).</p><h3>Vitamine B5 (Acide pantotheniqu)</h3><p><strong>Forme active</strong> : Coenzy A (CoA).</p><p><strong>Roles metaboliq</strong> :</p><ul><li>Transfert d''acyles dans la synthe`se de lipides et protéines</li><li>Production d''énergie (β-oxydation, cycle de Krebs)</li><li>Synthese d''hormones et du cholesterol</li><li>Sante´ de la peau et des cheveux</li></ul><p><strong>Sources</strong> : abundante dans de nombreux aliments (levure, abats, oeuf, champignons, avocat, poisson).</p><p><strong>Carences</strong> : tre`s rares, crampes des muscles, par´esthe´sies.</p><p><strong>ANC</strong> : 5 mg/jour (recommandation).</p><h3>Vitamine B6 (Pyridoxine)</h3><p><strong>Forme active</strong> : pyridoxal phosphate (PLP).</p><p><strong>Roles metaboliq</strong> :</p><ul><li>Metabolism des acides amines (transamination)</li><li>Synthese d''hemoglobine et de neurotransmetteurs (serotonine, GABA, dopamine)</li><li>Metabolism du glycogene</li><li>Fonction immunitaire</li><li>Metabolism de l''homocysteine</li></ul><p><strong>Sources</strong> : poisson, volaille, pois chiche, banane, abats, germe de ble´.</p><p><strong>Carences</strong> : dermatite, convulsions (particulierement chez le nourrisson), anemie, depression.</p><p><strong>ANC</strong> : 1,5 mg/jour (homme), 1,2 mg/jour (femme).</p><h3>Vitamine B8 (Biotine)</h3><p><strong>Roles metaboliq</strong> :</p><ul><li>Carboxylation de l''acetyl-CoA (lipogenese)</li><li>Carboxylation du pyruvate (gluconeogenese)</li><li>Métabolisme d''acides amines</li><li>Sante´ de la peau et des cheveux</li></ul><p><strong>Sources</strong> : jaune d''oeuf, levure, abats (foie), noix, champignons.</p><p><strong>Carences</strong> : tre`s rares (biosynthese bacterienne intestinale), dermatite seborh´eique, chute de cheveux.</p><p><strong>ANC</strong> : 50 μg/jour (recommandation).</p><h3>Vitamine B9 (Folates, Acide foliq)</h3><p><strong>Forme active</strong> : tetrahydrofolate (THF).</p><p><strong>Roles metaboliq</strong> :</p><ul><li>Transfert de groupes monocarbone (synthe`se de bases puriq et pyrimidiq)</li><li>Synthese d''ADN et ARN</li><li>Division cellulaire</li><li>Metabolism de l''homocysteine</li></ul><p><strong>Sources</strong> : le´gumineuses, e´pinards, aspergus, betterave, levure, fromage.</p><p><strong>Carences</strong> : anemie megablastiq, problemes neurologiq, malformations congenitales (tube neural). Homocysteine e´levée (facteur de risque cardio-vasculaire).</p><p><strong>ANC</strong> : 330 μg/jour (homme et femme adultes). 400 μg/jour pour les femmes en age´ de procreer (prévention de malformations).</p><h3>Vitamine B12 (Cobalamine)</h3><p><strong>Forme active</strong> : cyanocobalamine, methylcobalamine.</p><p><strong>Roles metaboliq</strong> :</p><ul><li>Methylation d''homocysteine (métabolism du folate)</li><li>Synthese de la myeline (fonction nerveuse)</li><li>Synthese d''ADN</li><li>Synthese d''hemoglobine</li></ul><p><strong>Sources</strong> : alimentation d''origine animale uniquement (abats, viande, poisson, fromage, oeufs).</p><p><strong>Absorption</strong> : requires la presence du facteur intrinse`que (glycoprote´ine se´cre´tée par l''estomac), absorption dans le terminal ileum.</p><p><strong>Carences</strong> : anemie pernic (auto-immune, absence de facteur intrinse`que), polyneuropathie (pare´sthe´sies, perte de sensation), problemes cognitifs. Plus frquente chez les vegans et les personnes ag´ees (malabsorption).</p><p><strong>ANC</strong> : 2,4 μg/jour.</p><h3>Vitamine C (Acide ascorbiqu)</h3><p><strong>Roles biologiq</strong> :</p><ul><li>Cofacteur pour les hydroxylases (collagene, carnitine)</li><li>Antioxydant (protection contre les radicaux libres)</li><li>Absorption du fer (facilite l''absorption du Fe3+ en Fe2+)</li><li>Synthese de carnitine et de noradrenaline</li><li>Fonction immunitaire (phagocytes)</li></ul><p><strong>Sources</strong> : agrumes, kiwi, poivron rouge, tomate, chou, brocoli, fraise, goyave.</p><p><strong>Carences</strong> : scorbut (hemorragie, problemes de cicatrisation, dents qui se de´chaussent). Tre`s rare dans les pays developpe´s.</p><p><strong>ANC</strong> : 110 mg/jour (homme et femme adultes).</p><p><strong>Stabilite´</strong> : tres fragile, destru par la chaleur, la lumiere, le stockage prolongé.</p>'),
('22222222-2222-2222-2222-222222220007', '11111111-1111-1111-1111-111111111102', 'Vitamines liposolubles', 'Vitamines A, D, E, K. Absorption, transport, stockage, roles, carences, sources.', 1, 6, 2.0, '<h2>Vitamines liposolubles</h2><p>Les vitamines liposolubles (A, D, E, K) sont solubles dans les lipides et insolub dans l''eau. Elles sont absorbe´es avec les graisses alimentaires et stocke´es dans les tissu adipeux et le foie. Les carences se de´veloppent lentement mais les toxicite´s peuvent aussi survenir avec les supple´ments.</p><h3>Vitamine A (Retinol)</h3><p><strong>Formes</strong> : retinol (vitamine A pre-formée), beta-carotene (provitamine A, carotenoi), autres carotenoi.</p><p><strong>Absorption et transport</strong> : require des lipides alimentaire, transport via les lipoprote´ines (VLDL, retinol-binding protein).</p><p><strong>Stockage</strong> : majeure dans le foie (reserve 1-2 ans).</p><p><strong>Roles biologiq</strong> :</p><ul><li>Vision : 11-cis-retinal dans les batonnets et cônes</li><li>Gene regulation : transcription (recepteurs nucleaire)</li><li>Differentiation cellulaire : santé´ des epitheliums</li><li>Fonction immunitaire</li><li>Antioxydant (carotenoi)</li><li>Reproduction et fertilite´</li></ul><p><strong>Sources</strong> : retinol dans foie, oeufs, lait, poisson gras; carotenoi dans carotte, patate douce, épinards, brocoli, courge, tomate.</p><p><strong>Carences</strong> : cecite´ nocturne, keratinisation (xerose oculaire), secheresse cutanée, infection recurrentes.</p><p><strong>Hypervitaminose A</strong> : toxicité (teratogenese en grossesse, toxicite´ hépatique chronique) avec les supple´ments.</p><p><strong>ANC</strong> : 800 μg/jour (homme), 650 μg/jour (femme).</p><h3>Vitamine D (Calciferol)</h3><p><strong>Formes</strong> : cholecalciferol (D3, d''origine animale ou synthe´tise par la peau), ergocalciferol (D2, d''origine vegetale).</p><p><strong>Synthese endogene</strong> : exposition solaire (UVB) genere la synthese de previtamine D3 dans la peau, suivie d''isomeristion.</p><p><strong>Activation</strong> : 25-hydroxylation au foie, puis 1α-hydroxylation aux reins pour obtenir la forme active 1,25-dihydroxycholecalciferol (calcitriol).</p><p><strong>Transport</strong> : via la vitamin D-binding protein.</p><p><strong>Roles biologiq</strong> :</p><ul><li>Homeostasie calcique et phosphate´ (absorption intestinale, resorption osseuse, reabsorption rénale)</li><li>Mineralisation osseuse</li><li>Fonction neuromusculaire</li><li>Modulation immunitaire</li><li>Regulation du cycle cellulaire</li></ul><p><strong>Sources alimentaire</strong> : poisson gras (saumon, maquereau), jaune d''oeuf, lait fortifié, champignons (UVB).</p><p><strong>Carences</strong> : rachitisme (enfants) avec de´formation osseuse, ostéomalacie (adulte) avec douleur osseuse, faiblesse musculaire. Frequente en climat tempere´ ou chez les personnes avec peu d''exposition solaire.</p><p><strong>Hypervitaminose D</strong> : hyperc calcémie, hyperc calcurie, calcifications tissulaire´s.</p><p><strong>ANC</strong> : 15 μg/jour (10-15 μg, recommandation actuelle variable).</p><h3>Vitamine E (Tocopherol)</h3><p><strong>Formes</strong> : alpha-, beta-, gamma-, delta-tocopherol; alpha-tocopherol est la forme la plus biologiquement active.</p><p><strong>Transport et stockage</strong> : via VLDL, HDL, lipoprotein transfer protein; stocke´ dans les lipides membranaire´s et le tissu adipeux.</p><p><strong>Roles biologiq</strong> :</p><ul><li>Antioxydant lipophile majeur (protection des lipides membranaire´s contre la peroxydation)</li><li>Protection contre le stress oxydatif</li><li>Fonction neuromusculaire</li><li>Modulati immunitaire</li></ul><p><strong>Sources</strong> : huiles vegetale´s (olive, tournesol), noix, amandes, graines, avocaт, epinards, brocoⅠi.</p><p><strong>Carences</strong> : rare chez l''humain (absorption requiert lipides et bile), peut survenir en malabsorption lipidiq ou abetalipoprote´ine´mie. Manifeste par anemie hemolytiq et neuropa myelinopa´thie.</p><p><strong>ANC</strong> : 15 mg/jour (homme et femme adultes).</p><h3>Vitamine K (Phylloquinone)</h3><p><strong>Formes</strong> : phylloquinone (K1, ve´ge´tale), menaquinone (K2, bacte´rienne).</p><p><strong>Sources alimentaire</strong> : K1 dans les le´gumes a` feuille vert (epinards, chou), huiles vegetale´s, brocoli; K2 synthe´tise´e par le microbiote colique.</p><p><strong>Absorption et transport</strong> : require lipides et bile; stocke´e dans le foie.</p><p><strong>Roles biologiq</strong> :</p><ul><li>Coagulation sanguine : gamma-carboxylation des facteurs II, VII, IX, X (dependants de la vitamin K)</li><li>Homeostasie calciq osseuess : osteocalcine et matrice Gla protein</li><li>Voies de signalisatio ceulaires</li></ul><p><strong>Carences</strong> : prologa temporelle de saignement (INR e´leve´), hematom, hemorragie. Peut survenir avec antibiotique´s (destruction de bacte´ries intestinale´s), syndrome de malabsorption, resistance vitamin K (rare).</p><p><strong>Anticoagulants</strong> : les anticoagulants coumarine´s (warfarine) antagoni´sent la vitamin K.</p><p><strong>ANC</strong> : 80 μg/jour (homme adulte), 65 μg/jour (femme adulte).</p><h3>Biodisponibilite´ des vitamines liposolubles</h3><p>L''absorption des vitamines liposolubles depend de :</p><ul><li>Presence de lipides alimentaire´s</li><li>Fonction pancre´atiq normale (secre´tion de lipase)</li><li>Function hépatique (production de bile)</li><li>Sante´ intestinale (absorption dans jejunum et ileum)</li></ul><p>Les conditions de malabsorption lipidiq (fibrose kystiq, maladie coeliaq, MICI) peuvent compromettre l''absorption de ces vitamines.</p>'),
('22222222-2222-2222-2222-222222220008', '11111111-1111-1111-1111-111111111102', 'Biologie cellulaire', 'Structure de la cellule eucaryote, organites, membrane plasmique, echanges membranaires, cycle cellulaire.', 1, 7, 2.5, '<h2>Biologie cellulaire</h2><p>La cellule est l''unite´ de base de la vie. Les cellules eucaryote´s (pre´sentes chez les animaux, plantes, champignons) contiennent un noyau et des organites membrane´ux, contrairement aux procaryote´s (bacte´ries). Cette fiche couvre les structure´s et fonctions principales de la cellule eucaryote.</p><h3>Structure ge´ne´rale</h3><p>La cellule eucaryote comprend :</p><ul><li>Une membrane plasmique (delimite la cellule)</li><li>Un noyau (contient l''ADN)</li><li>Le cytoplasme (gel hyaluronade´ contenant les organite´s)</li></ul><h3>Le noyau</h3><p><strong>Structure</strong> : enveloppe nucle´aire (double membrane avec pores), nucleoplasm, chromatine (ADN + proteine´s), nucleole.</p><p><strong>Fonctions</strong> :</p><ul><li>Stockage et transmission de l''information ge´ne´tiq</li><li>Transcription de l''ADN en ARN</li><li>Duplication de l''ADN avant la division cellulaire</li></ul><p><strong>Chromatine</strong> : complexe ADN-proteine´s (histones et autres proteine´s). Organisation en nucleosomes (ADN enroule´ autour de octamere´s d''histones). La condensation progressive donne la chromatine puis les chromosomes.</p><h3>Les mitochondrie´s</h3><p><strong>Structure</strong> : double membrane (externe lisse, interne replie´e en cre^tes), matrice, ADN mitochondrial (mtADN).</p><p><strong>Fonctions principales</strong> :</p><ul><li>Production d''énergie : oxydation des nutriments, synthese d''ATP via la phosphorylation oxydative</li><li>Regulation du calcium intracellulaire</li><li>Synthese de certaine´s molecules</li><li>Apoptose (mort cellulaire programme´e)</li></ul><p><strong>Ge´ne´tiq mitochondriale</strong> : mtADN circulaire (type procaryote), transmission maternelle, mutation peut causer des myopatie´s.</p><h3>Le reticulum endoplasmiq (RE)</h3><p><strong>RE rugueux (RER)</strong> : membrane´ avec ribosome attache´s. Fonction : synthese des proteine´s destine´es a` la sécrétion ou a` la membrane plasmique.</p><p><strong>RE lisse (REL)</strong> : sans ribosome. Fonctions :</p><ul><li>Synthese de lipides (phospholipides, choleste´rol)</li><li>Stockage et liberation de calcium (muscle lisse)</li><li>Detoxication (cytochrome P450)</li></ul><h3>L''appareil de Golgi</h3><p><strong>Structure</strong> : empilement de citernes (saccules) membranaire´s, avec poles cis et trans.</p><p><strong>Fonctions</strong> :</p><ul><li>Modification des proteine´s (glycosylation, sulfatation, phosphorylation)</li><li>Tri et emballage des proteine´s en vesicules</li><li>Synthese de polysaccharides</li><li>Formation des lysosomes</li></ul><p>Le flux de matie`re va du RER vers le Golgi (pole cis) puis vers la membrane plasmique ou les lysosomes (pole trans).</p><h3>Les lysosomes</h3><p><strong>Contenu</strong> : environ 50 enzyme´s hydrolytique´s (proteasess, lipase, nuclease, etc.) dans un environnement acide (pH 4,5-5).</p><p><strong>Fonctions</strong> :</p><ul><li>Digestion intracellulaire d''elements phagocyte´s</li><li>Autopha´gie (elimination des organite´s use´s)</li><li>Apoptose</li></ul><p><strong>Pathologie</strong> : maladies lysosomales (Gaucher, Pompe, Niemann-Pick) avec accumulation de matie`re non-dige´re´es.</p><h3>Les peroxysomes</h3><p><strong>Contenu</strong> : catalase, oxidases.</p><p><strong>Fonctions</strong> :</p><ul><li>Degradation des acides gras a` tre`s longue chaine (> C20)</li><li>Synthese des plasmaloge`nes (lipides membranaire´s cerebraux)</li><li>Detoxication (peroxyde d''hydroge`ne)</li></ul><h3>Le cytosquelet</h3><p><strong>Composants</strong> :</p><ul><li><strong>Microfilaments (actine)</strong> : diametre 7 nm, implication dans la contractile´ et la motilite´ cellulaire</li><li><strong>Microtubes (tubuline)</strong> : diametre 25 nm, formation du fuseau mitotiq, transport intracellulaire, motilite´ de cils/flagelles</li><li><strong>Filaments intermediaire (keratin, vimentine)</strong> : diametre 10 nm, resistance me´caniq</li></ul><p>Le cytosquelet joue un role ´structural et permet les mouvement cellulaire´s.</p><h3>La membrane plasmique : Modele de la mosaï´que fluide</h3><p><strong>Composants</strong> :</p><ul><li>Phospholipides (70%) : bicouche lipidiq asyme´trique</li><li>Prote´ines (25-30%) : inte´grale´s, pe´riphe´rique´s</li><li>Glucides (2-10%) : glycoproteine´s, glycolipides</li></ul><p><strong>Modele de la mosaï´que fluide</strong> (Singer-Nicolson, 1972) : phospholipides forment une bicouche fluide dans laquelle les prote´ines peuvent bouger late´ralement et ve´rticalement.</p><p><strong>Asyme´trie membranaire</strong> : composition diffe´rente entre feuillet externe et interne (asymmetrie lipidiq et proteiniq).</p><p><strong>Fluidite´</strong> : determine´e par le contenu en acides gras insature´s et la teneur en choleste´rol. Les cellules ajustent la composition de leur membrane pour maintenir une fluidite´ optimale.</p><h3>Echanges membranaire´s</h3><p><strong>Diffusion simple</strong> : mouvement de mole´cules du côte´ de haute concentration vers le côte´ de basse concentration, sans dépense d''énergie, pour les molecules lipophiles et les gaz (O2, CO2).</p><p><strong>Diffusion facilite´e</strong> : diffusion via des prote´ines de transport (canaux, transporteurs), sans dépense d''énergie, dans le sens du gradient de concentration.</p><p><strong>Osmose</strong> : diffusion de l''eau a` travers la membrane, du milieu hypoto´niq vers le milieu hyperton´iqu.</p><p><strong>Transport actif primaire</strong> : transport contre le gradient (haute vers basse concentration) via une pompe consommant de l''ATP. Exemple : pompe Na+/K+/ATPase.</p><p><strong>Transport actif secondaire</strong> : utilise l''énergie d''un gradient e´lectro-chimiq (cre´e´ par une pompe primaire) pour transporter une autre substance. Exemple : symporteur Na+/glucose.</p><p><strong>Exocytose</strong> : fusion de vesicules avec la membrane plasmique, rejet de contenu extracellulaire.</p><p><strong>Endocytose</strong> : invagination de la membrane, capture de matie`re extracellulaire. Types : phagocytose (grandes particules), pinocytose (liquides), endocytose par recepteur.</p><h3>Le cycle cellulaire</h3><p><strong>Phases</strong> :</p><ul><li><strong>G1</strong> : croissance, accumulation de pre´curseurs</li><li><strong>S</strong> : synthese d''ADN, duplication des chromosomes</li><li><strong>G2</strong> : préparation a` la mitose</li><li><strong>M</strong> : mitose (division du noyau) et cytokinese (division du cytoplasme)</li></ul><p><strong>Points de control</strong> : G1/S (decision d''entrer en phase S), G2/M (pre´paration de la mitose). En cas de dommages a` l''ADN ou de conditions inappropriees, la cellule peut arreter le cycle (checkpoint arrest) ou entrer en apoptose.</p><p><strong>Regulation</strong> : cyclines (proteine´s dont la concentration augmente/diminue) et cyclin-dependent kinases (CDK) qui phosphorylent les protéines du cycle.</p><p><strong>Mitose</strong> : prophase, metaphase, anaphase, telophase. Aboutit a` deux cellules filles diploï´des identiq.</p><p><strong>Meiose</strong> : deux divisions successives, produit 4 cellules haploi´des (gametes). Reduction de ploidie, recombinaison genetiq.</p>'),
('22222222-2222-2222-2222-222222220009', '11111111-1111-1111-1111-111111111102', 'Histologie', 'Les 4 types de tissus: epitheliaux, conjonctifs, musculaires, nerveux. Caracteristiques et localisations.', 1, 8, 2.0, '<h2>Histologie</h2><p>L''histologie est l''etude des tissus biologiq. Un tissu est un ensemble de cellules de ^meme origine embryologique remplissant une fonction commune. On distingue 4 types principaux chez les animaux.</p><h3>Tissu epithelial</h3><p><strong>Caracte´ristique´s générales</strong> :</p><ul><li>Cellule´s etroitement unies (jonctions serres)</li><li>Peu de substance interstitielle</li><li>Pas de vaisseaux sanguins (nutrition par diffusion)</li><li>Membrane basale (separe de la connective)</li><li>Regeneration rapide</li></ul><p><strong>Fonctions</strong> : revetement, protection, absorption, sécrétion, sensibilite´.</p><p><strong>Epithéliums de revetement</strong> :</p><ul><li><strong>Epithelium stratifie squameux non keratinise</strong> : plusieurs couches, surface douce. Localisation : cavite´ orale, pharynx, oesophage. Fonction : protection, resistance a` l''usure.</li><li><strong>Epithelium simple cubique</strong> : une couche de cellules cubiques. Localisation : tubules renaux, conduits glandulaires. Fonction : transport, sécrétion.</li><li><strong>Epithelium simple cylindrique</strong> : une couche de cellules colonnaires. Localisation : intestin grele´ (avec microvillosites), estomac, colon. Fonction : absorption, sécrétion, protection.</li><li><strong>Epithelium pseudostratifie´ cilié</strong> : cellule´s de hauteurs differentes donnant une apparence stratifiée. Localisation : trachée, bronches. Fonction : nettoyage par mouvement des cils.</li><li><strong>Epithelium de transition</strong> : parait stratifie´ vide, simple rempli. Localisation : vesicule biliaire, bassinet. Fonction : adaptabilite´ au volume.</li></ul><p><strong>Epithéliums glandulaires</strong> : secrète´ent des substances.</p><ul><li><strong>Glandules acineuses</strong> : cellule secretrices disposees en acini. Exemple : glandes salivaires, pancreas endocrine.</li><li><strong>Glandules tubulaires</strong> : cellule secretrices forment des tubes. Exemple : glandes gastriques, glandes uterines.</li><li><strong>Classification par mode de sécrétion</strong> : exocrine (vers l''exterieur), endocrine (vers le sang), apocrine (liberation de partie de cellule), holocrine (destruction de cellule).</li></ul><h3>Tissu conjonctif</h3><p><strong>Caracteristique´s générales</strong> :</p><ul><li>Abondante substance interstitielle (fibres + matrice)</li><li>Cellule´s dispersées</li><li>Origine mesodermale</li><li>Fonction : soutien, stabilite´, nutrition</li></ul><p><strong>Composants</strong> :</p><ul><li><strong>Fibroblastes</strong> : produisent les fibres et la matrice</li><li><strong>Fibrilles de collagene</strong> : resistance a` la traction (type I predominant)</li><li><strong>Fibres elastiq</strong> : elasticite´ (elastin, fibrille)</li><li><strong>Matrice amorphe</strong> : gel contenant GAG et proteoglycans, hyaluronate, eau</li></ul><p><strong>Types</strong> :</p><ul><li><strong>Connective lache</strong> : peu de fibres, abondante matrice, cellule disperse´es (macrophages, mastocytes, fibroblastes). Localisation : sous-epitheliale, enveloppes d''organes. Fonction : flexibilite´.</li><li><strong>Connective dense non-fibreuse (cartilage)</strong> : matrix fibreuse de collagen et elastine. Localisation : disques intervertébraux, menisques. Fonction : amortissement.</li><li><strong>Connective dense fibreuse</strong> : tres nombreuses fibres collagene alignées (tendons, ligaments) ou non-alignées (aponévroses). Fonction : resistance.</li><li><strong>Tissu adipeux</strong> : adipocytes remplis de triglycerides. Fonction : reserve d''énergie, isolation thermique, amortissement. Brun (thermogenese) vs blanc (stockage).</li><li><strong>Cartilage</strong> : chondrocytes dans des lacunes, matrix de collagen et GAG. Hyaline (articulations), elastiq (oreille), fibreux (disques). Avasculaire, nutrition par diffusion.</li><li><strong>Os</strong> : osteocytes dans des lacunes, matrix de collagen mineralise par cristaux de calcium-phosphate. Tres vascularise. Fonction : soutien, protection, hematopoiese, stockage de minéraux.</li><li><strong>Sang</strong> : tissu connective liquide. Plasma (55%) + elements figures (globules rouges, blancs, plaquettes). Fonction : transport, defense, homeostasie.</li></ul><h3>Tissu musculaire</h3><p><strong>Fonction principale</strong> : contraction pour produire le mouvement.</p><p><strong>Muscle strie´ squelettiq</strong> :</p><ul><li>Cylindriq, multinucle´es, striations visibles (sarcome`res)</li><li>Innerve´ par le SNC, contraction volontaire</li><li>Rapide et puissant</li><li>Localisation : muscles du mouvement volontaire</li></ul><p><strong>Muscle lisse</strong> :</p><ul><li>Fusiforme, mononucle´, pas de striations</li><li>Innervation autonome, contraction involontaire</li><li>Lent et prolonge´</li><li>Localisation : paroi des organes creuse (esophage, estomac, intestins, vaisseaux, iris)</li><li>Absence de sarcome`res, organisation d''actine et myosine differente</li></ul><p><strong>Muscle cardiaq</strong> :</p><ul><li>Cylindriq ramifie´, mononucle´ a` dinucle´, striations visibles</li><li>Contraction involontaire, rythme intrinsèque</li><li>Jonctions intercalaires (disques Z) permettent syncytium physiologique</li><li>Localisation : myocarde du coeur</li><li>Resistance a` la fatigue grace aux mitochondries abondantes</li></ul><h3>Tissu nerveux</h3><p><strong>Cellule´s principales</strong> :</p><ul><li><strong>Neurones</strong> : corp cellulaire (soma), axone, dendrites. Transmission du potentiel d''action. Types : sensitif (senseur vers SNC), moteur (SNC vers effecteur), association.</li><li><strong>Cellule´s gliales</strong> : support, nutrition, isolation. Types : astrocytes (nutrition), oligodendrocytes (myelinisation SNC), cellule Schwann (myelinisation SNP), microglie (nettoyage, defense).</li></ul><p><strong>Synapse</strong> : contact entre neurones permettant la transmission du signal via neurotransmetteurs.</p><p><strong>Myeline</strong> : gaine isolante autour de l''axone, augmente la vitesse de propagation du potentiel d''action (conduction saltatorielle).</p><p><strong>Localisations</strong> :</p><ul><li>SNC : encephale, moelle epiniere (substance grise = corps cellulaires, substance blanche = axones)</li><li>SNP : nerfs, ganglions</li></ul><h3>Composants cellulaires communs</h3><p>Bien que different, tous les tissus contiennent des cellule auxquelles on retrouve noyau, mitochondries, cytoplasme, etc. Les differences reposent surtout sur les proportions relatives et l''organisation de ces elements.</p>'),
('22222222-2222-2222-2222-222222220010', '11111111-1111-1111-1111-111111111102', 'Milieu interieur', 'Compartiments liquidiens, sang, hemostase, lymphe, équilibres hydrique et electrolytique.', 1, 9, 2.5, '<h2>Le milieu interieur</h2><p>Le milieu interieur designe l''ensemble des liquides extra-cellulaires qui baignent les cellules et leur permettent d''echanger avec l''environnement externe. Le concept a e´te´ introduit par Claude Bernard (1865) comme base de la theorie de l''homeostasie.</p><h3>Compartiments liquidiens</h3><p><strong>Distribution de l''eau corporelle</strong> (pour une personne de 70 kg) :</p><ul><li>Eau intracellulaire (LIC) : 40% du poids (28 L)</li><li>Eau extracellulaire (LEC) : 20% du poids (14 L)</li></ul><p><strong>Composition du LEC</strong> :</p><ul><li>Plasma sanguin : 4 L (~25% du LEC)</li><li>Liquide interstitiel : 10 L (~75% du LEC), baigne directement les cellules</li><li>Liquide cerebrospinal et autres : traces</li></ul><h3>Le sang</h3><p><strong>Composition</strong> :</p><ul><li><strong>Plasma</strong> (55% du sang) : phase liquide contenant eau (90%), prote´ines (7-8%), electrolytes, nutriments, dechets, hormones, gaz dissous.</li><li><strong>Elements figures</strong> (45% du sang, hematocrit) : globules rouges, blancs, plaquettes.</li></ul><p><strong>Proteines plasmatiq</strong> :</p><ul><li>Albumine (60%) : transport de nombreuses mole´cules (acides gras, bili, hormones), pression oncotiq</li><li>Globulines (35%) : immunoglobulines (defense), autres protéines</li><li>Fibrinogene (4%) : coagulation</li></ul><p><strong>Globules rouges (erythrocytes)</strong> :</p><ul><li>Biconcaves, sans noyau chez l''adulte, 120 jours de survie</li><li>Contiennent l''hemoglobine (transport O2), carbaminohemoglobine (transport CO2)</li><li>Production par erythropoiese dans la moelle osseuse (regulation par erythropoietine rénale)</li><li>Destruction par macrophages spléniques et hépatiques</li></ul><p><strong>Globules blancs (leukocytes)</strong> :</p><ul><li>Neutrophiles (70%) : phagocytose bacte´ries</li><li>Lymphocytes (20%) : B (anticorps), T (immunité´ cellulaire)</li><li>Monocytes (5%) : progeniteurs de macrophages</li><li>Eosinophiles (4%) : parasites, allergie</li><li>Basophiles (1%) : histamine</li></ul><p><strong>Plaquettes (thrombocytes)</strong> :</p><ul><li>Fragment de megakaryocytes</li><li>Survival 10 jours</li><li>Role : hemostase primaire (adhesion, activation, agregation)</li></ul><h3>Hemostasie</h3><p><strong>Definition</strong> : ensemble des processus arretant le saignement et maintenant l''integrite vasculaire.</p><p><strong>Hemostasie primaire</strong> :</p><ul><li>Vasoconstriction immediate´ (reflex neurogeniq)</li><li>Adhesion des plaquettes au collagene de la paroi vasculaire expose´e (von Willebrand factor)</li><li>Activation des plaquettes (changement de forme, libera de granules)</li><li>Agregation des plaquettes (pont de fibrinogene entre plaquettes)</li><li>Formation d''un bouchon hemostasiq blanc</li></ul><p><strong>Coagulation sanguine</strong> (hemostasie secondaire) :</p><ul><li>Cascade de reactions enzymatiq entre facteurs de coagulation</li><li>Deux voies : intrinsèque (contact), extrinseque (liberation de TF)</li><li>Voie commune : activation de la thrombine qui clive le fibrinogene en fibrine</li><li>Formation d''un reseau de fibrine stabilisant le bouchon plaquettaire</li><li>Regulation : anticoagulants naturels (proteine C, proteine S, antithrombine), fibrinolyse (plasmine)</li></ul><p><strong>Fibrinolyse</strong> :</p><ul><li>Degradation progressive du caillot de fibrine</li><li>Plasminogene convert en plasmine par tissus-PA ou urokinase</li><li>La plasmine clive la fibrine en produits de degradation</li><li>Regulation importante pour eviter une thrombose secondaire</li></ul><p><strong>Pathologies</strong> :</p><ul><li>Thrombophilie : tendance a` la thrombose (deficit en protéines C/S, antithrombine, factor V Leiden)</li><li>Coagulopathies : deficit en facteur de coagulation (hemophilie A-B), deficit en fibrino´gene</li><li>Thrombocytopenie : nombre insuffisant de plaquettes</li></ul><h3>La lymphe</h3><p><strong>Definition</strong> : liquide interstitiel collecte dans les vaisseaux lymphatiq, retourne au sang.</p><p><strong>Composition</strong> : semblable au liquide interstitiel (eau, protéines bas, electrolytes, globules blancs).</p><p><strong>Circulation</strong> :</p><ul><li>Forme´e a` partir du liquide interstitiel lorsque la pression hydrostatiq depasse la pression oncotiq</li><li>S''ecoule dans les capillaires lymphatiq puis grands vaisseaux</li><li>Passee par les noeuds lymphatiq (filtration, production de lymphocytes)</li><li>Rejointe le flux sanguin via le canal thoraciq et la veine sous-claviere gauche</li></ul><p><strong>Fonctions</strong> : drainage du liquide interstitiel, transport des lipides alimentaires (chylomicrons), réponse immunitaire.</p><h3>Equilibre hydrique</h3><p><strong>Entree d''eau</strong> :</p><ul><li>Boisson : 1,5-2 L/jour</li><li>Aliments : 0,5-1 L/jour</li><li>Métabolisme : 0,3 L/jour</li></ul><p><strong>Sortie d''eau</strong> :</p><ul><li>Urine : 1,5 L/jour (variable)</li><li>Feces : 0,1 L/jour (variable)</li><li>Respiration : 0,4 L/jour</li><li>Transpiration : 0,5-1 L/jour (variable)</li></ul><p><strong>Regulation</strong> : antidiuretiq hormone (ADH) augmente la reabsorption rénale d''eau en réponse a l''hypertonicit. L''osmolalite du plasma (280-295 mOsm/kg) est finement regulee.</p><h3>Equilibre electrolytiq</h3><p><strong>Cations principaux</strong> :</p><ul><li>Sodium (Na+) : 140 mmol/L plasma, osmot important, extracellulaire</li><li>Potassium (K+) : 5 mmol/L plasma, intracellulaire, essentiell a` l''excitabilite</li><li>Calcium (Ca2+) : 2,2-2,6 mmol/L plasma, coagulation, contraction musculaire</li></ul><p><strong>Anions principaux</strong> :</p><ul><li>Chlorure (Cl-) : 100-105 mmol/L, electroneutralite</li><li>Bicarbonate (HCO3-) : 23-28 mmol/L, tamponnage pH</li></ul><p><strong>Regulation</strong> : rein exerce un control fin par filtration/reabsorption selective. L''aldosterone augmente la reabsorption de Na+ et l''excrétion de K+. Le peptid natriuretiq ANP diminue la reabsorption de Na+.</p><p><strong>Homeostasie´ ioniq</strong> : malgre´ la variation d''entrees/sorties, la concentration de ces ions reste remarquablement constante, maintenu par des mecanismes de regulation sophist.</p>'),
('22222222-2222-2222-2222-222222220011', '11111111-1111-1111-1111-111111111102', 'Systeme endocrinien', 'Glandes endocrines, hormones, modes d''action, axe hypothalamo-hypophysaire, principales hormones.', 1, 10, 2.5, '<h2>Le système endocrinien</h2><p>Le système endocrinien est l''ensemble des glandes secretant des hormones (messagers chimiques) qui circulent dans le sang pour affecter les cellules cibles distantes. Travaille en coordination avec le système nerveux pour maintenir l''homeostasie et regler les fonctions vitales.</p><h3>Definition et proprietes des hormones</h3><p><strong>Definition</strong> : molecules de signalisation produites par les cellules endocrines, liberees dans le sang, agissent sur les cellules cibles distantes via des recepteurs specifiques.</p><p><strong>Caracteristiq</strong> :</p><ul><li>Specificit : chaque hormone agit sur des cellules cibles pourvues de recepteurs</li><li>Affinit : liaisons reversibles avec les recepteurs</li><li>Amplification du signal : une hormone peut activer une cascade de reactions</li><li>Effet modulateur : renforce ou inhibe les activité´s cellulaires</li></ul><h3>Classification des hormones</h3><p><strong>Hormones peptidiq et proteiq</strong> : chaine d''acides amines. Exemples : insuline, glucagon, gonadotropines, TSH. Hydrosolub, transport facilite´ dans le sang, recepteurs membranaire. Re´ponse rapide.</p><p><strong>Hormones steroides</strong> : derives du cholesterol. Exemples : cortisol, estradiol, testosterone, aldosterone. Lipophiles, transport via protéines plasmatiq, recepteurs intracellulaire. Reponse lente mais durable.</p><p><strong>Hormones derives d''acides amines</strong> : T3, T4 (thyroid), adrenali, dopamine. Reponse intermediaire.</p><h3>Modes d''action des hormones</h3><p><strong>Recepteur membranaire</strong> (hormones peptidiq) :</p><ul><li>Hormone se fixe au recepteur transmembranaire</li><li>Activation d''une cascade de signalisation intracellulaire (G-proteins, AMPc, phosphorylation)</li><li>Reponse rapide et reversible</li></ul><p><strong>Recepteur intracellulaire</strong> (hormones steroides) :</p><ul><li>Hormone traverse la membrane (lipophile)</li><li>Fixation a` un recepteur nucle´aire</li><li>Complexe hormone-receptor devient facteur de transcription</li><li>Modulation de l''expression genique</li><li>Reponse lente mais prolongée</li></ul><h3>L''axe hypothalamo-hypophysaire</h3><p><strong>Hypothalamus</strong> : region du cerveau qui produit des releasing hormones et inhibiting hormones qui control l''hypophyse.</p><p><strong>Hypophyse</strong> : glande pituitaire a` la base du crane, deux lobes :</p><ul><li><strong>Adenohypophyse (lobe anterieur)</strong> : secrète LH, FSH (gonadotropines), TSH, ACTH, prolactine, GH (somatotropine)</li><li><strong>Neurohypophyse (lobe posterieur)</strong> : libère ADH et ocytocine produites par l''hypothalamus</li></ul><p><strong>Regulation</strong> : boucles de feedback (negative surtout) permettent l''équilibre. L''hypophyse est l''organe maitre du système endocrinien.</p><h3>Principales glandes et hormones</h3><p><strong>Thyroide</strong> :</p><ul><li>Hormones : T3 (triiodothyronine), T4 (thyroxine), calcitonine</li><li>Regulation : axe hypothalamo-hypophysaire (TRH → TSH)</li><li>Roles : métabolisme basal, thermogenese, croissance, developpement neuro</li><li>Carence : hypothyroid (fatigue, froid, prise de poids)</li><li>Exces : hyperthyroid (hyperactivité, perte de poids, tachycardie)</li></ul><p><strong>Glandes surrénales</strong> :</p><ul><li><strong>Corticoides</strong> : cortisol (glucocorticoid, stress response, antiinflammato), aldosterone (mineralocorticoid, Na+ retention)</li><li><strong>Medulla</strong> : adrenaline, noradrenaline (sympathomimetiq, "fight or flight")</li><li>Regulation : axe HPA (CRH → ACTH → cortisol)</li></ul><p><strong>Pancreas endocrine</strong> :</p><ul><li>Insuline (cellule β) : diminue la glucose´mie, anabolisme</li><li>Glucagon (cellule α) : augmente la glyce´mie, catabolisme</li><li>Somatostatine, polypeptide pancre´atiq : modulation</li><li>Dysfonction : diabète mellitus (type 1 deficit insuline, type 2 resistance)</li></ul><p><strong>Gonades</strong> :</p><ul><li>Testicule : testosterone (spermatogenese, caracteristiq males)</li><li>Ovaire : estradiol, progesterone (cycle menstruel, reproduction)</li><li>Regulation : gonadotropines (LH, FSH) depuis l''hypophyse</li></ul><h3>Autres glandes endocrines</h3><p><strong>Parathyroid</strong> : PTH (augmente Ca2+ sanguin).</p><p><strong>Epiphyse</strong> : melatonine (rythme veille-sommeil).</p><p><strong>Thymus</strong> : hormones lymphopoïetiq (developpement lymphocytes T).</p><p><strong>Secretions non-endocrines</strong> : plusieurs organes (foie, rein, coeur, graisse) secretent des hormones.</p><h3>Mecanismes de regulation</h3><p><strong>Feedback negatif</strong> : sécrétion de l''hormone diminue son propre stimulus (ex : glucose inhibit l''insuline, cortisol inhibe CRH/ACTH).</p><p><strong>Feedback positif</strong> : rare, surge hormone amplifie son stimulus (ex : LH surge pendant ovulation).</p><p><strong>Regulation reciproqu</strong> : deux hormones antagonistes (insulin vs glucagon) permettent l''homeostasie.</p><p>L''équilibre fin de ce système est essential a` la santé´ et l''adaptation a` l''environnement.</p>'),
('22222222-2222-2222-2222-222222220012', '11111111-1111-1111-1111-111111111102', 'Systeme neuromusculaire', 'SNC, SNP, SNA, neurone, contraction musculaire, plaque motrice.', 1, 11, 2.5, '<h2>Le système neuromusculaire</h2><p>Le système nerveux est constitue du système nerveux central (SNC) qui controle l''organisme et du système nerveux peripheriq (SNP) qui relie le SNC aux organes. Ces commandes aboutissent a` la contraction musculaire pour la locomotio et les mouvements.</p><h3>Organisation du système nerveux</h3><p><strong>Systeme nerveux central (SNC)</strong> :</p><ul><li><strong>Encephale</strong> : telencephale (cortex, ganglions basaux), diencephale (hypothalamus, thalamus), mesencephale, metencephale (pont, cervelet), myelencephale (bulbe)</li><li><strong>Moelle epiniere</strong> : portion du SNC dans le canal vertebral, relie l''encephale au SNP via les nerfs rachidiens</li></ul><p><strong>Fonctions SNC</strong> : traitement de l''information sensorielle, integration, commande motrice.</p><p><strong>Systeme nerveux peripheriq (SNP)</strong> :</p><ul><li>31 paires de nerfs rachidiens (sorties de la moelle)</li><li>12 paires de nerfs craniens (sorties directes de l''encephale)</li><li>Ganglions peripheriq</li></ul><p><strong>Fonctions SNP</strong> : acheminement de l''information sensitive (recepteurs → SNC), transmission des commandes motrice (SNC → muscles), regulation autonome.</p><h3>Systeme nerveux autonome (SNA)</h3><p><strong>Composants</strong> : division sympathiq et parasympathiq avec effecteurs.</p><p><strong>Division sympathiq (fight or flight)</strong> :</p><ul><li>Chaī^ne de ganglions paravertébraux</li><li>Neurotransmetteur : noradrenaline (α et β adreno-recepteurs)</li><li>Effets : augmentation FC et TA, mydriase, inhibition digestion, vasoconstriction peripheriq, mobilisation énergie</li></ul><p><strong>Division parasympathiq (rest and digest)</strong> :</p><ul><li>Nerfs craniens (CN III, VII, IX, X) et nerfs sacrés (S2-S4)</li><li>Neurotransmetteur : acetylcholine (recepteurs muscariniq)</li><li>Effets : diminution FC/TA, myosis, activation digestion, vasodilatation, stockage énergie</li></ul><p><strong>Equilibre</strong> : antagonisme généralement, permettant un controle fin de l''homeostasie.</p><h3>L''unite neurale : le neurone</h3><p><strong>Structure</strong> :</p><ul><li>Corp cellulaire (soma) : contient le noyau, mitochondries</li><li>Dendrites : recoivent l''information d''autres neurones</li><li>Axone : envoie l''information, peut s''etendre sur m (neurones moteur lombaires vers muscle de la jambe)</li><li>Terminaison axonale : synapse pour communication</li></ul><p><strong>Types de neurones</strong> :</p><ul><li>Neurones sensitifs : acheminent le signal des recepteurs vers le SNC</li><li>Neurones moteurs : acheminent le signal du SNC vers les effecteurs (muscles)</li><li>Interneurones (neurones d''association) : interconnectent les autres neurones</li></ul><h3>Le potentiel d''action</h3><p><strong>Repos</strong> : potentiel de membrane -70 mV (pompe Na+/K+/ATPase maintient le gradient).</p><p><strong>Phases d''un potentiel d''action</strong> :</p><ul><li><strong>Depolarisation</strong> : ouverture de canaux Na+ voltage-dependants, entree de Na+, potentiel passe a` +30 mV</li><li><strong>Repolarisation</strong> : fermeture de canaux Na+, ouverture des K+, sortie de K+, retour vers -70 mV</li><li><strong>Hyperpolarisation</strong> : moment ou le potentiel descend en-deca de -70 mV avant retour a` repos (periode refractaire absolue)</li></ul><p><strong>Conduction</strong> :</p><ul><li>Conduction le long de l''axone non myeline´ : diffusion le long de la membrane</li><li>Conduction saltatorielle (myeline´) : action potentiels saute entre noeuds de Ranvier, plus rapide</li></ul><h3>La synapse</h3><p><strong>Structure</strong> :</p><ul><li>Terminaison presynaptiq (neurone envoyeur)</li><li>Fente synaptiq (20 nm)</li><li>Membrane postsynaptiq (neurone recepteur)</li></ul><p><strong>Transmission synaptiq</strong> :</p><ul><li>Arrivee du potentiel d''action a` la terminaison</li><li>Entree de Ca2+ par canaux voltages-dependants</li><li>Liberation par exocytose des vesicules de neurotransmetteur</li><li>Fixation des neurotransmetteur aux recepteurs postsynaptiq</li><li>Hyperpolarisation (IPSC, inhibition) ou depolarisation (EPSC, excitation)</li><li>Recapture ou degradation du neurotransmetteur</li></ul><p><strong>Neurotransmetteur principaux</strong> : acetylcholine (plaque motrice), dopamine, serotonin, GABA, glutamate, noradrenaline, adrenali.</p><h3>La contraction musculaire</h3><p><strong>Composants du sarcome´re</strong> (unite contraction) :</p><ul><li><strong>Filaments epais</strong> : myosine (deux tetes avec activité ATPasiq)</li><li><strong>Filaments fins</strong> : actine, tropomyosine, troponine</li><li><strong>Structures de liaison</strong> : protein Z (disques Z), titine, nebuline</li></ul><p><strong>Cycle de contraction</strong> :</p><ul><li>Signal nerveux cause influx Ca2+ dans la cellule musculaire</li><li>Ca2+ se fixe a` la troponine C</li><li>Changement de conformation de troponine permet a` tropomyosine de se deplacer</li><li>Sites de liaison sur actine deviennent accessibles</li><li>Les tetes de myosine (attachees a` ATP) se fixent a l''actine</li><li>Glissement (pousse´es) a` l''aide d''ATP : le sarcome´re se raccourcit</li><li>Flexion de la tete de myosine entree actine et myosine (power stroke), liberation d''ADP + Pi</li><li>Fixation d''un nouveau ATP detache la myosine de l''actine</li><li>Relaxation : si le Ca2+ disparait, tropomyosine cache a nouveau les sites d''actine</li></ul><p><strong>ATP essentiell</strong> : pour le detachement des tetes de myosine et la pompe de recapture du Ca2+. Sans ATP (mort), les muscles deviennent rigid (rigor mortis).</p><h3>La plaque motrice (jonction neuromusculaire)</h3><p><strong>Structure</strong> :</p><ul><li>Terminaison axonale du neurone moteur</li><li>Fente synaptiq (50 nm)</li><li>Membrane musculaire (sarcolemme) avec recepteurs cholinergiq</li></ul><p><strong>Fonctionnement</strong> :</p><ul><li>Potentiel d''action descend l''axone jusqu''a` la terminaison</li><li>Ca2+ entree, liberation d''acetylcholine</li><li>ACh se fixe aux recepteurs nicotiniq de la membrane musculaire</li><li>Ouverture de canaux Na+/K+, depolarisation</li><li>Generation d''un potentiel d''action du muscle (potentiel d''action musculaire) qui se propage a` tout le muscle</li></ul><p><strong>Deficit´ : myasthenie (deficit anticorps contre recepteurs ACh), botulisme (toxine bloque liberation ACh).</p>'),
('22222222-2222-2222-2222-222222220013', '11111111-1111-1111-1111-111111111102', 'Appareil cardiovasculaire', 'Anatomie du coeur, cycle cardiaque, debit cardiaque, vaisseaux, circulation, regulation.', 1, 12, 2.5, '<h2>L''appareil cardiovasculaire</h2><p>Le système cardiovasculaire assure la circulation du sang a` travers le corps pour livrer l''oxygene et les nutriments aux tissus et eliminer les dechets. Il comprend le coeur (pompe), les vaisseaux sanguins et le sang.</p><h3>Anatomie du coeur</h3><p><strong>Structure externe</strong> : organe creux, muscule (myocarde), entouré d''un sac (pericarde). Taille du poing, situe dans le mediastin entre les poumons.</p><p><strong>4 cavités</strong> :</p><ul><li>Oreillettes : chambre de reception (droite: sang pauvre en O2, gauche: sang riche en O2)</li><li>Ventricules : chambre de pompage (droite: vers poumons, gauche: vers corps)</li></ul><p><strong>Valves cardiaques</strong> :</p><ul><li>Valve tricuspide : entre oreillette droite et ventricule droit</li><li>Valve mitrale (bicuspide) : entre oreillette gauche et ventricule gauche</li><li>Valve pulmonaire : entre ventricule droit et artere pulmonaire</li><li>Valve aortiq : entre ventricule gauche et aorte</li></ul><p>Les valves assurent la directionalité du flux sanguin (sens unique).</p><p><strong>Cloisons</strong> : septum interatriot et interventricular separent les cavites.</p><p><strong>Vaisseaux du coeur</strong> :</p><ul><li>Veine cave supérieur et inférieur : ramene sang pauvre en O2 a` l''oreillette droite</li><li>Arteres pulmonaires : transportent sang pauvre en O2 vers les poumons</li><li>Veines pulmonaires : ramene sang oxyge´ vers l''oreillette gauche</li><li>Aorte : distribue sang oxyge au corps (circulation systemiq)</li></ul><h3>Le cycle cardiaque</h3><p><strong>Diastole</strong> (0,4-0,5 s) : phase de remplissage du coeur :</p><ul><li>Les oreillettes se remplissent passivement de sang (atriale diastole)</li><li>Les ventricules se remplissent (ventricular diastole)</li><li>Valves atrioventriculaire ouvertes, valves semilunaire fermees</li></ul><p><strong>Systole atriale</strong> : contraction des oreillettes envoie sang dans les ventricules.</p><p><strong>Systole ventriculaire</strong> (0,2-0,3 s) :</p><ul><li>Contraction isometrique : pression augmente, valves atrioventriculaire ferment (bruit du coeur S1)</li><li>Ejection : pression depasse pression arterie´lle, valves semilunaire s''ouvrent, sang est ejecte´</li><li>Fermeture des valves semilunaire (bruit S2)</li></ul><p><strong>Bruit du coeur</strong> : S1 (systole ventriculaire) et S2 (diastole ventriculaire), facilement auscultables au stethoscope.</p><h3>Debit cardiaque</h3><p><strong>Formula</strong> :</p><p>Debit cardiaque (CO) = Frequence cardiaque (FC) × Volume d''ejection systoliq (VES)</p><p>CO = FC × VES</p><p>Valeurs normales : FC ~70 bpm, VES ~70 mL, CO ~5 L/min au repos.</p><p><strong>Regulatio du VES</strong> (Frank-Starling) : plus le ventricule est rempli en fin de diastole, plus la contraction est vigoreuse (jusqu''a` une limite). Le degre d''etirement des myocardites determine le chevauchement d''actine-myosine optimal.</p><p><strong>Regulation du CO</strong> : augmente via augmentation FC (sympathiq) et VES (retour veineux accru, inotropes positifs).</p><h3>Les vaisseaux sanguins</h3><p><strong>Arteres</strong> :</p><ul><li>Paroi epaisse muscle (muscularis) permettant la constriction/dilatation</li><li>Elasticite via elastin (grandes arteres proximal)</li><li>Transport du sang a` haute pression du coeur vers les tissues</li><li>Pulse (variation oscillante de la pression) permettant massage des tissues</li></ul><p><strong>Capillaires</strong> :</p><ul><li>Diametre ~8 μm (taille cellules) permettant echanges molecule-par-molecule</li><li>Paroi simple (endothelium) pour diffusion facilite´e</li><li>Riche reseau augmente surface d''echange</li><li>Echange : filtration (hydrostatin) et reabsorption (oncotiq)</li></ul><p><strong>Veines</strong> :</p><ul><li>Paroi fine, peu muscle, grand diametre</li><li>Haute capacitance (reservoir de sang)</li><li>Retour du sang au coeur aide par valves (prévention du reflux) et musculature squelettiq</li><li>Accumulation veineuse peut reduire retour au coeur (orthostatismes)</li></ul><h3>Circulation systemiq et pulmonaire</h3><p><strong>Circulation pulmonaire</strong> :</p><ul><li>Ventricule droit → Arteres pulmonaire (sang pauvre en O2) → Poumons (oxygena´tion) → Veines pulmonaire → Oreillette gauche</li><li>Fonction : oxygenation du sang et elimination de CO2</li></ul><p><strong>Circulation systemiq</strong> :</p><ul><li>Ventricule gauche → Aorte → Arteres → Capillaires (echange métabolique) → Veines → Veine cave → Oreillette droite</li><li>Fonction : distribution d''O2 et nutriments, collection de CO2 et dechets</li></ul><h3>Pression arterielle et regulation</h3><p><strong>Pression arterielle</strong> : 120/80 mmHg (systoliq/diastoliq) au repos chez l''adulte normal.</p><p><strong>Determinants</strong> :</p><ul><li>Debit cardiaque : augmentation CO → augmentation TA</li><li>Resistance vasculaire peripheriq : vasoconstriction → augmentation TA</li></ul><p><strong>Regulation acute</strong> :</p><ul><li>Barorecepteurs : captent changements TA, reflex vagal diminue FC et contractilite si TA haute</li><li>Chemorecepteurs : captent O2, CO2, pH</li></ul><p><strong>Regulation chroniq</strong> :</p><ul><li>Systeme rein-angiotensine-aldosterone (SRAA) : renine (rein) → angiotensinogene → angiotensin II → aldosterone (retention Na+/eau), vasoconstriction</li><li>Systeme nerveux sympathiq : adrenaline/noradrenaline → augmentation FC/contractilite, vasoconstriction</li></ul><p>L''hypertension arterielle (TA > 140/90) est un facteur de risque cardio-vasculaire majeur.</p>'),
('22222222-2222-2222-2222-222222220014', '11111111-1111-1111-1111-111111111102', 'Appareil respiratoire', 'Voies aeriennes, poumons, alveoles, mecanique ventilatoire, echanges gazeux, transport O2 et CO2.', 1, 13, 2.5, '<h2>L''appareil respiratoire</h2><p>L''appareil respiratoire assure l''echange gazeux entre le corps et l''environnement : entree d''oxygene (O2) et sortie de dioxyde de carbone (CO2). Il comprend les voies aeriennes et les poumons.</p><h3>Anatomie des voies aeriennes</h3><p><strong>Voies aeriennes supérieures</strong> :</p><ul><li>Cavite nasale : filtration, humidification, thermogenese de l''air</li><li>Pharynx : carrefour respiratoire et digestif</li><li>Larynx : control de l''acces aux voies inférieures, phonation (cordes vocales)</li></ul><p><strong>Voies aeriennes inférieures</strong> :</p><ul><li>Trachee : conduit rigide (cartilage) de 10-12 cm, bifurque en bronches principales gauche et droite au niveau de la carine</li><li>Bronches principales : entrent dans les poumons, se divisent successivement en bronches lobaires, segmentaires, jusqu''aux bronchioles</li><li>Arborisation bronchiq : diminution progressive du diametre et epaisseur de paroi (cartilage disparait en bronchioles)</li></ul><p><strong>Epitelium respiratoire</strong> : epithélium pseudostratifié cilié avec cellules mucipares. Les cils battent a` 10-20 Hz pour propulser le mucus vers la bouche ("escalator mucociliaire").</p><h3>Structure des poumons</h3><p><strong>Positions</strong> : two poumons asymetriq (gauche a` 2 lobes, droite a` 3 lobes) dans le thorax, proteges par la cage thoraciq.</p><p><strong>Divisions</strong> :</p><ul><li>Lobes : divises en segments (10 a` droite, 9 a` gauche) innerves par une bronche segmentaire</li><li>Lobules : unites histologiq contenant plusieurs alveoles</li></ul><p><strong>Pleure´s</strong> : membranes sereus entourant le poumon (viscerale) et la paroi thoraciq (parietal), permettant le glissement pendant la respiration.</p><h3>Les alveoles pulmonaires</h3><p><strong>Structure</strong> : sacs microscopiq (0,2 mm) ou se produisent les echanges gazeux.</p><p><strong>Composition</strong> :</p><ul><li>Cellules epitheliales de type I : 95% surface, echanges gazeux</li><li>Cellules epitheliales de type II : production de surfactant (agent de surface)</li><li>Capillaires sanguins : reseau dense enveloppant les alveoles (surface alveolaire ~70-100 m2)</li></ul><p><strong>Surfactant</strong> : film mince compose de lipides et proteine´s, reduit la tension superficielle et facilite l''expansion alveolaire. Production immature chez les premat (detresse respiratoire).</p><h3>Mecanique ventilatoire</h3><p><strong>Inspiration</strong> : phase active :</p><ul><li>Contraction du diaphragme (principal muscle inspiratoire) et muscles intercostaux externes</li><li>Le diaphragme se deplace vers le bas, augmente le volume thoraciq</li><li>Reduction de la pression intra-pulmonaire (< pressure atmosphere´rique)</li><li>Entree d''air dans les poumons</li></ul><p><strong>Expiration</strong> : phase passive au repos :</p><ul><li>Relaxation du diaphragme et muscles intercostaux</li><li>Elasticite naturelle du poumon (tissu elastiq, collagen) ramene le volume a l''équilibre</li><li>Reduction du volume thoraciq</li><li>Sortie d''air des poumons</li></ul><p><strong>Expiration forcée</strong> : contraction des muscles abdominaux et intercostaux internes.</p><h3>Volumes et capacites pulmonaires</h3><p><strong>Volumes</strong> :</p><ul><li>Volume courant (VC) : air inspire´ et expire en respiration normale (~500 mL)</li><li>Volume reserve inspiration (VRI) : air que peut inspirer apres inspiration normale (~3000 mL)</li><li>Volume reserve expiration (VRE) : air qui peut expirer apres expiration normale (~1100 mL)</li><li>Volume residuel (VR) : air reste dans les poumons apre`s expiration forcee (~1200 mL)</li></ul><p><strong>Capacites</strong> (sommes de volumes) :</p><ul><li>Capacite inspiratoire (CI) : VC + VRI (~3500 mL)</li><li>Capacite residuelle fonctionelle (CRF) : VRE + VR (~2300 mL)</li><li>Capacite vitale (CV) : VC + VRI + VRE (~4600 mL)</li><li>Capacite pulmonaire totale (CPT) : CV + VR (~5800 mL)</li></ul><p><strong>Debit ventilato`ire minute (DVM)</strong> : VC × fréquence respiratoire (~500 mL × 12 = 6 L/min au repos).</p><h3>Echanges gazeux</h3><p><strong>Loi de Fick</strong> : le flux de gaz est proportionnel a` la surface d''echange et a` la difference de pression, inversement proportionnel a` l''epaisseur de la membrane :</p><p>Flux = (P1 - P2) × Surface / Epaisseur</p><p><strong>Pression partielle</strong> (PO2, PCO2) : portion de la pression totale due a` un gaz specifiq. Dans l''air atmospherique : PO2 ~160 mmHg (21%), PCO2 negligeable.</p><p><strong>Gradient de diffusion</strong> :</p><ul><li>Alvéoles : O2 diffuse dans le sang capillaire, CO2 diffuse hors du sang vers les alveoles</li><li>Le sang veineux arrive avec PCO2 ~45 mmHg et PO2 ~40 mmHg</li><li>L''air alveolaire : PO2 ~100 mmHg, PCO2 ~40 mmHg</li></ul><p><strong>Echanges tissulaires</strong> : l''inverse, le sang riche en O2 libere son O2 aux tissues qui liberent CO2.</p><h3>Transport de l''O2 et du CO2</h3><p><strong>Transport de l''O2</strong> :</p><ul><li>Hemoglobine (~97%) : proteine tetramerique avec 4 sites de liaison O2 (cooperativite positif)</li><li>Disso en plasma (~3%) : insuffisant pour besoins metaboliq</li></ul><p><strong>Courbe de dissociation hemoglobin</strong> (courbe de Barcroft) : sigmoïde caracteristiq (effet cooperatif), shift a` droite (facilite libera´tion O2) avec acidose, PCO2 augmente, temperature accrue, 2-3-DPG augmente.</p><p><strong>Transport du CO2</strong> :</p><ul><li>Carbaminohemoglobine (~23%) : CO2 se fixe directement sur l''hemoglobine</li><li>Bicarbonate (~70%) : CO2 + H2O ↔ H2CO3 ↔ HCO3- + H+ (enzyme carboanhydrase accele`re cette reaction)</li><li>Disso en plasma (~7%)</li></ul><p><strong>Effet Haldane</strong> : la deoxyhe´moglobine (debarrasse´e de son O2) capte mieux le CO2 et les protons, facilitant le transport du CO2 par le sang veineux.</p><h3>Regulation de la respiration</h3><p><strong>Centres respiratoires</strong> : dans le bulbe (rythme), pont, mesencephale. Genèrent un rythme automatiq de respiration.</p><p><strong>Chemorecepteurs</strong> : sensibles a` PO2, PCO2, pH sanguin. L''augmentation de PCO2 est le stimulus primaire (plus que reduction PO2).</p><p><strong>Regulation voluntaire</strong> : cortex peut surpasser le controle automatiq (apnée volontaire).</p>'),
('22222222-2222-2222-2222-222222220015', '11111111-1111-1111-1111-111111111102', 'Appareil digestif', 'Tube digestif, digestion mecanique et chimique, absorption intestinale, microbiote intestinal.', 1, 14, 2.5, '<h2>L''appareil digestif</h2><p>L''appareil digestif est l''ensemble des organes assurant l''ingestion, la digestion mecanique et chimique, le transport, l''absorption des aliments et l''elimination des dechets non-absorbables. C''est un tube continu du bouche a`` l''anus, avec des glandes annexes essentielles.</p><h3>Anatomie et physiologie du tube digestif</h3><p><strong>Paroi du tube digestif</strong> : structure histologique identiq de l''oesophage au colon :</p><ul><li>Muqueuse (epithelium, lami´e propria, muscularis mucosae)</li><li>Sous-muqueuse (tissu conjonctif lache, vaisseaux, nerfs)</li><li>Musculeuse (couche circulaire interne, couche longitudinale externe, permettent peristaltism)</li><li>Sereus/adventice (enveloppe externe)</li></ul><p><strong>Peristaltismo</strong> : contraction progressive des muscles de la paroi propulsant le bol alimentaire. Controlee par le système enteric (plexus myenteriq de Auerbach).</p><h3>Bouche et oesophage</h3><p><strong>Digestion buccale</strong> :</p><ul><li>Digestion mecanique : mastication fragment le bol alimentaire, augmente surface d''echange</li><li>Digestion chimique : enzyme amylase salivaire (ptyaline) hydrolyse l''amidon en maltose. Action limitee (30 secondes en bouche)</li><li>Lubrification : mucus facilite la déglutition</li></ul><p><strong>Oesophage</strong> : tube musculaire de 25 cm connectant pharynx a` l''estomac. Peristaltism prime pousse le bol a` travers le sphincter esophagien inférieur (achalasie si dysfunction).</p><h3>Estomac</h3><p><strong>Fonction</strong> : reservoir, brassage mecanique, sécrétion de sucs gastriques, emptying controle.</p><p><strong>Glandes gastriques</strong> secretent :</p><ul><li>Acide chlorhydriq (HCl) : cree pH acide (pH 2) favorable aux proteasess</li><li>Pepsinogene : inactive´ en pepsin par HCl, protease specifiq pour protéines (coupe liaisons Phe-Trp)</li><li>Gastrine (hormone) : stimule sécrétion HCl et motilite (feedback positif auto-amplifie)</li><li>Mucus : protection contre l''autodigestion</li><li>Facteur intrinseq : necessaire pour l''absorption B12 en ileum</li></ul><p><strong>Digestion gastriq</strong> : transformation du bol alimentaire en chyme (pate semi-liquide). Proteasess commence la proteolys (20-30% digestion protein).</p><p><strong>Regula</strong> : hormones (gastrine, secretine, CCK) et neurones intrinseque controlent sécrétion et motilite.</p><h3>Pancreas et bile</h3><p><strong>Pancreas exocrine</strong> secretent dans le duodenum via le conduit pancre´atiq :</p><ul><li>Bicarbonate (HCO3-) : neutralise HCl gastrique, élevé pH a` 6-7 (optimal pour enzymes pancre´atiques)</li><li>Proteasses : trypsine (coupe apres Lys/Arg), chymotrypsine (coupe apres phe/Trp/Tyr), elastase (coupe apres Ala/Val)</li><li>Amylase pancre´atique : continue degradation amidon en maltose</li><li>Lipase pancre´atique : hydrolyse triglycerides en acides gras et glycerol</li><li>Nucleasess : degradent ADN et ARN</li></ul><p><strong>Foie et vesicule biliaire</strong> :</p><ul><li>Foie produit bile : emulsifie les lipides (sels biliaires), facilite lipase action</li><li>Vesicule biliaire : reservoir et concentration de la bile, libere a` l''entree des aliments gras via CCK</li></ul><h3>Intestin grele´</h3><p><strong>Anatomie</strong> : 6-7 m, divise en duodenum, jejunum, ileum. Surface maximale par villosites (1-1,5 mm) et microvillosites (1-2 μm).</p><p><strong>Fonction</strong> : site principal de digestion et absorption.</p><p><strong>Digetion intestinale</strong> :</p><ul><li>Peptidases de bordure en brosse : dipeptidases, tripeptidases complètent proteolys</li><li>Desaccharidases : saccharase, maltase, lactase hydrolyse disaccharides en monosaccharides</li><li>Lipase pancre´atique + emulsification bilaire : hydrolyse lipides</li></ul><p><strong>Absorption intestinale</strong> :</p><ul><li>Enterocytes : cellule principale d''absorption. Absorbe glucose/fructose (cotransport actif Na+-glucose), aa (transporteurs specifiq), acides gras et monoglyce´ride (diffusion), vitamines, minéraux</li><li>Voie sanguine : glucose, aa, vitamines hydrosolubles, minéraux entrent dans le sang portal → foie (traitement initial)</li><li>Voie lymphatiq : lipides (re-esterifies), vitamines liposolubles, cholesterol transportes en chylomicrons via la lymphe (contourne le foie initialement)</li></ul><p><strong>Jonctions serr´es´</strong> : control l''acces paracellulaire.</p><h3>Colon et elimination</h3><p><strong>Function</strong> : absorption de l''eau et des electrolytes, stockage et elimination des dechets.</p><p><strong>Contenu coloniqu</strong> : 1-2 kg de dechets fecaux quotidiens, 95% eau absorb´ee.</p><p><strong>Defeca´tion</strong> : reflex spinal avec components volontaire (sphincter ext controlé par SNC), norm 1x/jour.</p><p><strong>Diarrhee´ : accelera passage → moins absorption eau. Causes : infectio, intolérance, stress, medicaments.</p><p><strong>Constipation</strong> : ralentis passage → trop absorption eau, selles dures. Causes : sedentariat, deshydrata, stress, insufficient fiber.</p><h3>Microbiote intestinal</h3><p><strong>Composition</strong> : ~100 billions de bacteries (phyla : Firmicutes, Bacteroidetes surtout), archeae, virus, champignons. Masse ~1-2 kg.</p><p><strong>Fonctions benefiq</strong> :</p><ul><li>Fermentation de fibres non-dige´stes en acides gras a` chaine courte (butyrate nourrit colonocytes)</li><li>Synthese de vitamines (K, B12 partiel)</li><li>Barrier contre pathogens (competition, metabolites inhibiteurs)</li><li>Developpement immunité´ intestinale</li></ul><p><strong>Dysbiose</strong> : deséquilibre de la composition, associe a` nombreuse maladies (IBD, obésité´, diabètes, depression, allergie).</p><p><strong>Facteurs influencant le microbiote</strong> : alimentation (fiber, polyphenols, protéines animales), antibiotique, stress, maladie.</p>'),
('22222222-2222-2222-2222-222222220016', '11111111-1111-1111-1111-111111111102', 'Appareil urinaire', 'Anatomie rein, nephron, formation urine, clairance rénale, homeostasie.', 1, 15, 2.0, '<h2>L''appareil urinaire</h2><p>L''appareil urinaire assure l''elimination de l''eau et des dechets metaboliq (principalement uree, ammoniaq, acide urique, exces electrolytes). Il joue aussi un role crucial dans l''homeostasie hydrique, electrolytiq et acid-base.</p><h3>Anatomie du rein</h3><p><strong>Position et structure</strong> : deux reins, un de chaque côte de la colonne vertebrale, retroperitoneal. Taille d''un poing (~150 g), richement vascularise (20% du debit cardiaq).</p><p><strong>Divisions</strong> :</p><ul><li>Cortex renali : contient les glomérules et les portions initial des tubules</li><li>Medulla renali : contient les anses de Henle et tubes collecteurs</li><li>Calices mineurs/majeurs : collectent l''urine</li><li>Bassin renali : urine concentre´e vers l''urete`re</li></ul><p><strong>Vascularisation</strong> :</p><ul><li>Artere rénale : entre au hile, se divise en arterioles afferentes (vers glomérule)</li><li>Capillaires glomerulair : fenestres permeables aux petites molecules</li><li>Arteriole efferente : quitte le glomérule, forme capillaires peritubulaires autour des tubules</li></ul><h3>Le nephron : unite´ fonctionelle</h3><p><strong>Composants</strong> : ~1 million par rein.</p><p><strong>Corpuscule renali (renal corpuscle)</strong> :</p><ul><li>Glomérule : reseau capillaire sanguin (fenestres: 70-90 nm, permeables aux protéines plasma a` bas PM)</li><li>Capsule de Bowman : repli entourant le glomérule, collecte le filtrat</li></ul><p><strong>Tubule renali</strong> : resorption et sécrétion selective :</p><ul><li>Tube contourné proximal : grande surface (microvilli), resorption de glucose, aa, eau, ions, petites protéines</li><li>Anse de Henle : cree´ gradient osmot vertical (multiplicateur contrecourant)</li><li>Tube contourne distal : resorption regulate Na+ (aldosterone), sécrétion d''ions</li><li>Tube collecteur : resorption regulate d''eau (ADH), concentration urine</li></ul><h3>Formation de l''urine : 3 processus</h3><p><strong>Filtration glomérulaire</strong> :</p><ul><li>Pression hydrostatiq arteriole afferente (~60 mmHg) force filtration</li><li>Pression oncotiq plasma (~25 mmHg) resiste filtration</li><li>Pression capsulaire (~15 mmHg) resiste filtration</li><li>Pression nette filtration = 60 - 25 - 15 = 20 mmHg</li><li>Taux filtration glomerulaire (TFG) : ~125 mL/min ou 180 L/jour au repos</li><li>Ce qui traverse : eau, glucose, aa, urea, ions (petite molecules avec charge <60 kDa)</li><li>Ce qui ne traverse pas : protéines, cellule (molecular barrier)</li></ul><p><strong>Resorption tubulaire</strong> :</p><ul><li>Glucose : resorption 100% en tube proximal (transporteur saturable, donc glycosurie si glucose exceede seuil rénali)</li><li>Aa : resorption 100% (necessite´ pour tissus)</li><li>Eau : resorption ~99% (ADH regulate en tube collecteur pour ajuster concentration)</li><li>Na+ : resorption ~99% (aldosterone regula en tube distal)</li><li>Urea : resorption ~50% (diffusion passive)</li></ul><p><strong>Secretion tubulaire</strong> :</p><ul><li>Transport actif sécrétion de ions H+ (regulation pH), K+ (exces elimination), medicaments, acide urique</li><li>Ajoute au filtrat les substances a` eliminer</li></ul><h3>Concentration de l''urine : Multiplicateur contrecourant</h3><p><strong>Anse de Henle</strong> : cree gradient osmot vertical :</p><ul><li>Branche descendante : permeable a` l''eau (eau sort passiv), impermeabl aux ions</li><li>Branche ascendante : impermeabl a` l''eau, absorbe Na+/Cl- (transport actif)</li><li>Gradient accumule : medulla hypertoniqu, cortext isotoniqu</li></ul><p><strong>ADH (vasopressine)</strong> :</p><ul><li>Secrete´e par neurohypophyse en réponse a` hypertonicite´ du plasma</li><li>Augmente permeabilite tube collecteur a` l''eau</li><li>Permette eau de diffuser hors du tube vers medulla hypertoniqu</li><li>Resultat : urine concentre´e (hyperton), économie d''eau</li></ul><p>Sans ADH : urine dilue´e, polyurie (diabète insipide si deficit ADH).</p><h3>Urine normale</h3><p><strong>Volume</strong> : 1-2 L/jour (variable selon hydratatio).</p><p><strong>Composition</strong> :</p><ul><li>Urea : principal dechet nitrogene, ~20-30 g/jour</li><li>Creatinine : dechet muscle, ~1-2 g/jour, peu regule´e (reflet de TFG)</li><li>Ions : Na+ (~100 mEq/jour), K+ (~40 mEq/jour), Cl- (~150 mEq/jour)</li><li>Acide urique : dechet puriqu, ~500 mg/jour</li><li>Proteine : trac (normal <150 mg/jour), urine saine sans prote´ine</li></ul><p><strong>pH urine</strong> : 4,5-8 (normal ~6), depends alimentation (aliments acidifiants vs alcalinisant).</p><h3>Clairance rénale</h3><p><strong>Definition</strong> : volume plasma completement cleanse´ d''une substance par minute :</p><p>Clairance = (Urine conc × Debit urine) / Plasma concentration</p><p><strong>Clairance creatinine</strong> : estime le TFG (taux filtration glomérulaire). Chez adulte normal ~90-120 mL/min/1,73m2.</p><p><strong>Clairance PAH (acide p-aminohippurique)</strong> : mesure flux sanguin rena total (~650 mL/min normalement).</p><h3>Role dans l''homeostasie</h3><p>Rein est l''organ clé de l''homeostasie :</p><ul><li>Balance hydrique : ADH regula retention eau</li><li>Balance electrolytiq : aldosterone regula Na+, rein excrete K+ exces</li><li>Regulation acid-base : reabsorption HCO3-, sécrétion H+ ajuste pH plasma</li><li>Regulation pression arterielle : volemia via SRAA, natriurese de pression</li><li>Hormone : erythropoietine (stimule RBC), calcitriol (active vitamine D)</li></ul>'),
('22222222-2222-2222-2222-222222220017', '11111111-1111-1111-1111-111111111102', 'Systeme immunitaire', 'Microorganismes, barrieres naturelles, immunité innée et adaptative, vaccination, allergies.', 1, 16, 2.5, '<h2>Le système immunitaire</h2><p>Le système immunitaire protege le corps contre les agents infectieux (microorganismes) et les corps etrangers. Il comprend deux composantés : l''immunité innee (rapide, non-specifiq) et l''immunité adaptative (lente a` s''installer, specifiq, memoire).</p><h3>Microorganismes pathogenes</h3><p><strong>Bacteries</strong> :</p><ul><li>Organismes unicellulaires procaryote sans noyau</li><li>Paroi cellulaire peptidoglycane (gram+ ou gram-)</li><li>Pathogenicite´ : production toxines, envahissement</li><li>Exemples pathogenes : Streptococcus pyogenes (gorge), E. coli (entero), Mycobacterium tuberculosis (respir)</li></ul><p><strong>Virus</strong> :</p><ul><li>Particules acides nucleiq (ADN ou ARN) + envelope protéique</li><li>Obligatoirement intracellulaires (repliquent dans la cellule hote´)</li><li>Pathogenicite´ : destruction cellule hote, toxines virales</li><li>Exemples : virus grippal, COVID-19, VIH</li></ul><p><strong>Champignons</strong> :</p><ul><li>Eucaryotes unicellulaires ou filamenteus</li><li>Opportunistes surtout en immunodepression</li><li>Exemples : Candida albicans (muguet), Aspergillus</li></ul><p><strong>Parasites</strong> :</p><ul><li>Organismes multicellulaires ou protozoaires vivant aux depens d''un hôte</li><li>Exemples : Plasmodium (malaria), Giardia (diarrhee)</li></ul><h3>Barrieres naturelles</h3><p><strong>Barrieres physiq</strong> :</p><ul><li>Peau : barrier physiq impermeab, acidite, flore commensale</li><li>Muqueuses : epithelium intact, mucus (trap), cils (escalator mucociliaire)</li></ul><p><strong>Barrieres chimiq</strong> :</p><ul><li>Acidite gastrique : HCl tue pathogenes</li><li>Lysozyme : enzyme antibacterienne dans salive, larmes, mucus</li><li>Peroxyde d''hydrogene : agent oxydant tue bacteries</li><li>Complement : famille protéines cascades tuent pathogenes</li></ul><p><strong>Flore commensale</strong> : bacteries "amies" qui occupent niches, empeche pathogens invasion (exemple : Lactobacillus vaginal protege contre Candida).</p><h3>Immunite innee</h3><p><strong>Caracteristiq</strong> : immediate (minutes), non-specifiq, pas de memoire.</p><p><strong>Cellule´s de l''immunité innee</strong> :</p><ul><li>Neutrophiles : phagocytes principaux, premiers arrives (~70% des globules blancs)</li><li>Macrophages : derives de monocytes, resident dans tissus, phagocytent bacteries et dechets</li><li>Cellules dendritiq : antigen-presenting cells, ponts avec immunité adaptative</li><li>Natural killer (NK) : reconnaissent cellule aberrantes (cancereuses, infectees virus), lysent par perforines</li></ul><p><strong>Inflammation</strong> : réponse vaso-active (dilatation, augmente permeabilite) et cellular (infiltration leukocytes).</p><ul><li>Mecanique : damage tissulaire libère DAMPs (damage-associated patterns)</li><li>Pathogenes reconnus par PPRs (pattern recognition receptors) → activation cascade complement et cytokines</li><li>Cytokines inflammatoire : TNF-α, IL-1, IL-6, chimiokines attirent phagocytes</li><li>Complement cascade : C3 le plus important, activation → C3a (chimioattractant), C3b (opsonin), C5b-C9 (lytic complex)</li></ul><p><strong>Phagocytose</strong> :</p><ul><li>Reconnaissance via PAMP (pathogen-associated molecular patterns) ou opsonines (C3b, IgG)</li><li>Englobement de la particule dans une vesicule (phagosome)</li><li>Fusion avec lysosome → phagolysosome</li><li>Enzymes lysosomales et ROS tuent pathogene</li></ul><h3>Immunite adaptative</h3><p><strong>Caracteristiq</strong> : specifiq (recogna´ssance exquisite de l''antigene), responsiv (prend jours/semaines), memoire durable.</p><p><strong>Cellule B (lymphocytes B)</strong> :</p><ul><li>Origine : bone marrow</li><li>Fonction : production d''anticorps (immunoglobulines)</li><li>Activation : contact antigene + signaux helper T cells → differenciation en plasmocytes</li><li>Plasmocytes : fabrique anticorps</li><li>Cellules B memoire : reactivation rapide lors re-exposition</li></ul><p><strong>Immunoglobulines (anticorps)</strong> :</p><ul><li>IgM : premiere réponse, pentameri, bonne agglutination</li><li>IgG : réponse tardive, opsonine puissanté, traverse placenta, long demi-vie → immunité durable</li><li>IgA : protection muqueuses (IgA secrétoire)</li><li>IgE : réponse allergiqu, mastocyte fixation</li></ul><p><strong>Cellule T (lymphocytes T)</strong> :</p><ul><li>Origine : thymus (maturation)</li><li>Deux classes principal :</li></ul><p><strong>CD8+ (T cytotoxiq)</strong> : reconnaissent cellule infectees virus ou cancereuses via MHC-I, lysent par perforines/granzymes.</p><p><strong>CD4+ (T helper)</strong> : reconnaissent antigene present par MHC-II (APC), secretent cytokines (IFN-γ, IL-2, IL-4, etc.) que guident réponse immune. Th1 (infection), Th2 (allergie/parasites), Th17 (bacteria/fungi), Tfh (aide B cells).</p><p><strong>Cellule T regula</strong> : suppressent excessive réponse immune, previennent autoimmunité.</p><p><strong>Selection thymmique</strong> : éducation T cells pour reconnai self vs non-self, elimination cellule avec TCR auto-reactif.</p><h3>Vaccination</h3><p><strong>Principle</strong> : expose le système immune a` antigene (sans danger) pour gener immunité sans maladie.</p><p><strong>Types de vaccin</strong> :</p><ul><li>Vaccin inactives : agent pathogene tue ou inactivé (grippe injectable, hepatite B)</li><li>Vaccin vivants attenues´ : agent reduce virulence mais replica (rougeole, varicelle)</li><li>Vaccin sous-unite : partie antigene (coqueluche acellulaire)</li><li>Vaccin ARNm : acide nucleiq code proteine antigene (COVID-19)</li></ul><p><strong>Reponse immune</strong> : primo-vaccination → IgM puis IgG (phase naive). Rappel → reactivation memoire B/T → IgG rapide et puissant (phase memoire).</p><h3>Allergies</h3><p><strong>Definition</strong> : réponse immune exageree a` un antigene inoffensif (allerge´ne).</p><p><strong>Mecanisme</strong> :</p><ul><li>Exposition initial : allerge´ne → Th2 activation → IL-4/5 → B cells produisent IgE specifiq</li><li>IgE fixee sur mastocytes et basophiles (recepteurs Fc epsilon)</li><li>Re-exposition : allerge´ne lie IgE → crosslinking recepteurs → degranulation mastocyte</li><li>Liberation : histamine (prurit, edeme, bronchconstriction), leucotrienes (inflammation), prostaglandines</li></ul><p><strong>Types reactions allergiq</strong> :</p><ul><li>Type I (immediate) : minutes, histamine (rhinite allergiq, asthme, anaphylaxie)</li><li>Type II (cytotoxiq) : anticorps + complement tuent cellule</li><li>Type III (immune complexes) : precipitation anticorps-antigene (lupus)</li><li>Type IV (delayed cell-mediated) : T-cell mediated (dermatite contact)</li></ul><p><strong>Traitement allergies</strong> : evitation allerge´ne, antihistaminiq, corticoides, immunotherapie (dessensibilisation).</p><h3>Autoimmunité</h3><p><strong>Definition</strong> : réponse immune contre constituants propres du corps.</p><p><strong>Roles des mecanismes de tolerance brisée</strong> : defaut selection centralle (thymus/bone marrow), loss tolerance periphérique (Tregs insuffisant), molecular mimicry (pathogene ressemble self).</p><p><strong>Exemples</strong> : lupus (anticorps anti-noyau), polyarthrite rheumatoïde (anti-collagene cartilage), diabète type 1 (anti-beta pancreatic).</p>'),
('22222222-2222-2222-2222-222222220018', '11111111-1111-1111-1111-111111111102', 'Voies métaboliques du glucose', 'Glycolyse, cycle de Krebs, chaine respiratoire, neoglucogenese, bilan énergétique.', 1, 17, 3.0, '<h2>Voies métaboliques du glucose</h2><p>Le glucose est le carburant principal du corps, et son métabolisme produit l''énergie (ATP) necessaire a` tous les processus vitaux. Cette fiche couvre les principales voies métaboliques du glucose : glycolyse, cycle de Krebs, chaine respiratoire, et neoglucogenese.</p><h3>Glycolyse</h3><p><strong>Lieu</strong> : cytoplasme (cytosol).</p><p><strong>Substrat et produits</strong> : glucose → 2 pyruvate + 2 NADH + 2 ATP (net).</p><p><strong>Les 10 etapes de la glycolyse</strong> :</p><ul><li><strong>1. Glucose → Glucose-6-phosphate (G6P)</strong> : enzyme hexokinase, consomme 1 ATP (phosphorylation activatrice). G6P ne peut pas sortir la cellule (entrapment), premiere step regulation.</li><li><strong>2. G6P → Fructose-6-phosphate (F6P)</strong> : isomerase (glucose-6-phosphate isomerase).</li><li><strong>3. F6P → Fructose-1,6-bisphosphate (F-1,6-BP)</strong> : enzyme phosphofructokinase (PFK-1), consomme 1 ATP. C''est la STEP IRREVERSIBLE clé et principale point regulation (feedback inhibition par ATP, ADP, ATP).</li><li><strong>4. F-1,6-BP → 2 Glyceraldehyde-3-phosphate (G3P)</strong> : aldolase clive le C6 en deux molecules C3.</li><li><strong>5. Dihydroxyacetone phosphate (DHAP) ↔ Glyceraldehyde-3-phosphate (G3P)</strong> : triose phosphate isomerase (interconversion pour que DHAP puisse continuer la voie).</li><li><strong>6. G3P → 1,3-Bisphosphoglycerate (1,3-BPG)</strong> : glyceraldehyde-3-phosphate dehydrogena, oxidation avec production NADH (couplé a` NAD+ reduction).</li><li><strong>7. 1,3-BPG → 3-Phosphoglycerate (3-PG)</strong> : phosphoglycerate kinase, liberation d''énergie (acyl phosphate haute énergie) couple a` phosphorylation ADP → ATP (substrate-level phosphorylation).</li><li><strong>8. 3-PG → 2-Phosphoglycerate (2-PG)</strong> : mutase (rearrangement du groupe phosphate).</li><li><strong>9. 2-PG → Phosphoenolpyruvate (PEP)</strong> : enolase (elimination d''eau).</li><li><strong>10. PEP → Pyruvate</strong> : pyruvate kinase, liberation d''énergie couple a` phosphorylation ADP → ATP (substrate-level). C''est une STEP IRREVERSIBLE.</li></ul><p><strong>Bilans de la glycolyse</strong> :</p><ul><li>Glucose (C6) → 2 Pyruvate (C3)</li><li>ATP : -2 (etape 1 et 3) + 4 (etape 7 et 10) = +2 ATP net</li><li>NADH : +2 NADH (etape 6)</li><li>Rendement : 2 ATP + 2 NADH par glucose</li></ul><p><strong>Fate du pyruvate</strong> :</p><ul><li>Aerobic (O2 present) : entre mitochondrie, convertit en Acetyl-CoA par pyruvate dehydrogena complexe</li><li>Anaerobic (O2 absent) : reduit en lactate par lactate dehydrogena (regenere NAD+ pour continuer glycolyse)</li></ul><p><strong>Regulation de la glycolyse</strong> : principalement par PFK-1 :</p><ul><li>Activateurs : AMP, ADP (énergie basse), F-2,6-BP (metabolite regulateur)</li><li>Inhibiteurs : ATP, citrate (énergie haute)</li></ul><h3>Decarboxylation du pyruvate</h3><p><strong>Lieu</strong> : mitochondrie (matrice).</p><p><strong>Reaction</strong> : Pyruvate + CoA + NAD+ → Acetyl-CoA + CO2 + NADH.</p><p><strong>Enzyme : pyruvate dehydrogena complex : assemblage de 3 enzymes (E1, E2, E3), cofacteurs TPP, lipoate, CoA, NAD+. Cette reaction est IRREVERSIBLE et tres regulée.</strong></p><p><strong>Regulation</strong> : activée par AMP (énergie basse), inhibée par NADH/ATP (énergie haute).</p><p><strong>Produit principal</strong> : Acetyl-CoA (~2 carbone) peut entrer le cycle de Krebs.</p><h3>Cycle de Krebs (Cycle de l''acide citrique)</h3><p><strong>Lieu</strong> : mitochondrie (matrice).</p><p><strong>Substrat et produits par tour</strong> : Acetyl-CoA (2C) + Oxaloacétate (4C) → 2 CO2 + 3 NADH + 1 FADH2 + 1 ATP (via GTP).</p><p><strong>Les 8 etapes</strong> :</p><ul><li><strong>1. Acetyl-CoA + Oxaloacétate → Citrate (6C)</strong> : citrate synthase (condensation aldol). Energie: -31,5 kJ/mol.</li><li><strong>2. Citrate → Isocitrate (6C)</strong> : aconitase (isomerisation via cis-aconitase intermediaire).</li><li><strong>3. Isocitrate → α-Cetoglutarate (5C) + CO2 + NADH</strong> : isocitrate dehydrogena (oxidation decarboxylation). Regulation par NADH et ATP (inhibition).</li><li><strong>4. α-Cetoglutarate → Succinyl-CoA (4C) + CO2 + NADH</strong> : α-cetoglutarate dehydrogena complex (similaire pyruvate dehydrogena). Regulation par NADH/ATP (inhibition).</li><li><strong>5. Succinyl-CoA → Succinate (4C) + GTP (ATP)</strong> : succinyl-CoA synthetase (substrate-level phosphorylation). C''est la seule phosphorylation directe du cycle (GTP transfere a` ATP par nucleoside-diphosphate kinase).</li><li><strong>6. Succinate → Fumarate (4C) + FADH2</strong> : succinate dehydrogena (oxidation FAD-dependante). FADH2 alimente directement la chaine respiratoire (complexe II).</li><li><strong>7. Fumarate → Malate (4C)</strong> : fumarase (hydratation).</li><li><strong>8. Malate → Oxaloacétate (4C) + NADH</strong> : malate dehydrogena (oxidation). Oxaloacétate regeneré pour un nouveau cycle.</li></ul><p><strong>Bilan du cycle de Krebs</strong> :</p><ul><li>Par acetyl-CoA : 3 NADH + 1 FADH2 + 1 ATP (GTP)</li><li>CO2 produit (2 par acetyl, liberaes aux etapes 3 et 4)</li></ul><p><strong>Oxidation des equivalents reduits</strong> : NADH et FADH2 sont les "devises" oxydatives qui alimentent la chaine respiratoire.</p><h3>Chaine respiratoire et phosphorylation oxydative</h3><p><strong>Lieu</strong> : membrane interne mitochondriale.</p><p><strong>Composants</strong> : 4 complexes protéiques (I-IV) et deux transporteurs mobile (CoQ, cytochrome c).</p><p><strong>Le flux d''electrons</strong> :</p><ul><li><strong>Complexe I (NADH dehydrogena)</strong> : NADH → CoQ, transfert 2e-. H+ pumpe.</li><li><strong>Complexe II (succinate dehydrogena)</strong> : FADH2 (de succinate) → CoQ directement. Pas de pompage H+.</li><li><strong>Complexe III (cytochrome bc1)</strong> : CoQ → cytochrome c, transfert electron 1 par 1 (cycle Q). H+ pompe.</li><li><strong>Complexe IV (cytochrome c oxydase)</strong> : cytochrome c → O2 (accepteur final), 2e- + 2H+ + 1/2 O2 → H2O. H+ pompe.</li></ul><p><strong>Gradient de protons</strong> : pompage de H+ vers l''espace intermembran cree gradient electrochimiq (ΔμH+ = Δψ + Δ[H+]).</p><p><strong>ATP synthase</strong> : F0-F1 complex, H+ retourne a` matrice a` travers F0, propulse la rotation de F1 catalytiq, phosphoryle ADP + Pi → ATP. ~3-4 H+ par ATP.</p><p><strong>Rendement énergétiq</strong> :</p><ul><li>NADH : Complexe I + III + IV = 3 H+ pumpes par site = ~2,5 ATP</li><li>FADH2 : Complexe II + III + IV = 2 H+ pumpes (pas complexe I) = ~1,5 ATP</li></ul><h3>Rendement e´nerge´tique global de l''oxydation du glucose</h3><p><strong>Scenario 1 : Aerobic complet</strong></p><ul><li>Glycolyse : +2 ATP (net) + 2 NADH (glycolytiq)</li><li>Decarboxylation pyruvate : 2 NADH (mitochondrial)</li><li>Cycle Krebs : 2 GTP (ATP) + 6 NADH + 2 FADH2 (pour 2 acetyl-CoA)</li><li>NADH mitochondrial : (2 + 6) NADH × 2,5 ATP/NADH = 20 ATP</li><li>FADH2 mitochondrial : 2 FADH2 × 1,5 ATP/FADH2 = 3 ATP</li><li><strong>NADH glycolytiqu</strong> : 2 NADH × 2,5 ATP/NADH = 5 ATP (si tranfere mitochondrie via navette mal/aspartate)</li><li>Phosphorylation directe : 2 ATP (glycolyse) + 2 ATP (Krebs) = 4 ATP</li><li><strong>Total : 20 + 3 + 5 + 4 = 32 ATP (minimum) ou ~30-32 ATP</strong> (varie selon navette NADH)</li></ul><p><strong>Scenario 2 : Anaerobic (lactate)</strong></p><ul><li>Glycolyse seule : 2 ATP + 2 NADH (regenere via lactate formation)</li><li>Total : 2 ATP seulement</li></ul><p>L''aerobic est enormement plus efficient (16x).</p><h3>Neoglucogenese</h3><p><strong>Definition</strong> : synthese de glucose a` partir de precurseurs non-glucidiq (lactate, acides amines, glycerol).</p><p><strong>Lieu</strong> : foie principalement (99%), rein et intestin petit.</p><p><strong>Pourquoi</strong> : maintien de glucose sanguin en jeune, stress, effort. Sinon hypoglycemie (convulsion, coma).</p><p><strong>Etapes irreversible de glycolyse : contournement</strong> :</p><ul><li>Pyruvate → Oxaloacétate : pyruvate carboxylase (consomme 1 ATP)</li><li>Oxaloacétate → Phosphoeno´pyruvate : PEPCK (consomme 1 GTP)</li><li>Fructose-1,6-bisphosphate → Fructose-6-phosphate : FBPase-1 (consume 1 H2O)</li><li>Glucose-6-phosphate → Glucose : G6Pase (glucose se libere = exporte pour le sang)</li></ul><p><strong>Regulation</strong> : glucagon et cortisol stimulent, insuline inhibe. Acceleree en jeune, stress, effort prolong.</p><p><strong>Benif</strong> : maintient glucose sanguin 70-100 mg/dL pour cerveau (depend glucose obligatoirement) et hematies.</p><h3>Comparaison énergétique</h3><p>Glucose (oxyde complet) : ~38-40 kJ/g (2800-2850 kJ/glucose)</p><ul><li>Lipides : ~38 kJ/g (beaucoup plus pèse car hydrophobes)</li><li>Proteines : ~17 kJ/g (metabolite coûteux energetically)</li></ul><p>Pour effort de longue duree, le corps passe aux lipides (reserve abondante, bien assimilables apres glucides epuisés).</p>'),
('22222222-2222-2222-2222-222222220019', '11111111-1111-1111-1111-111111111102', 'Voies métaboliques des acides gras', 'Beta-oxydation, lipogenese, regulation, énergétique, comparaison lipides vs glucides.', 1, 18, 3.0, '<h2>Voies métaboliques des acides gras</h2><p>Les acides gras (lipides) constituent une forme de stockage d''énergie tres riche (9 kcal/g versus 4 kcal/g pour glucides). Leur métabolisme comprend principalement la beta-oxydation (degradation), la lipogenese (synthese), et leur regulation coordonnée selon les besoins énergétiq.</p><h3>Beta-oxydation des acides gras</h3><p><strong>Definition</strong> : degradation progressive des acides gras en acetyl-CoA (unite 2-carbone) pour alimenter le cycle de Krebs et la production d''ATP.</p><p><strong>Lieu</strong> : mitochondrie surtout (acides gras a` chaine longue > C12), peroxysomes (acides gras a` tres longue chaine > C20, puis tranfert en mitochondrie).</p><p><strong>Activation de l''acide gras</strong> :</p><ul><li>Acyl-CoA synthetase : acide gras + CoA + ATP → acyl-CoA + AMP + PPi (dans le cytosol ou membrane mitochondrial)</li><li>Acyl-CoA entre la mitochondrie via le transporteur carnitine</li></ul><p><strong>Shuttle carnitine</strong> :</p><ul><li>Carnitine palmitoyltransferas I (CPT I) : acyl-CoA + carnitine → acyl-carnitine (membrane externe)</li><li>Translocas´e carnitine/acyl-carnitine : transport a` travers la membrane interne</li><li>Carnitine palmitoyltransferas II (CPT II) : acyl-carnitine + CoA → acyl-CoA (membrane interne/matrice)</li></ul><p><strong>Les 4 etapes repeties</strong> (beta-oxydation) du cycle de l''acyl-CoA :</p><ul><li><strong>Etape 1 - Oxidation</strong> : acyl-CoA → enoyl-CoA. Enzyme : acyl-CoA dehydrogena. FADH2 produit (alimentera complexe II).</li><li><strong>Etape 2 - Hydratation</strong> : enoyl-CoA → hydroxyacyl-CoA. Enzyme : enoyl-CoA hydratase. Configuration 2R → 3S.</li><li><strong>Etape 3 - Oxidation</strong> : hydroxyacyl-CoA → 3-ketoacyl-CoA. Enzyme : 3-hydroxyacyl-CoA dehydrogena. NADH produit.</li><li><strong>Etape 4 - Thiolyse</strong> : 3-ketoacyl-CoA + CoA → acetyl-CoA + acyl-CoA (raccourci 2 carbones). Enzyme : beta-ketothiolase (thiophorase).</li></ul><p>Le cycle repeate jusqu''a` exhaustion du AG, liberant acetyl-CoA a` chaque iteration.</p><p><strong>Bilan e´nergetiq pour un acide gras sature´ C16 (palmitiqu)</strong> :</p><ul><li>Palmitate (16C) → 8 acetyl-CoA (8 × 2C)</li><li>FADH2 : 7 (etape 1 de chaque cycle, sauf le dernier cycle inutile)</li><li>NADH : 7 (etape 3)</li><li>Activation : -ATP (cout)</li><li>Rendement en ATP :</li><li>7 FADH2 × 1,5 ATP/FADH2 = 10,5 ATP</li><li>7 NADH × 2,5 ATP/NADH = 17,5 ATP</li><li>8 acetyl-CoA × 10 ATP/acetyl (3 NADH + 1 FADH2 + 1 ATP du Krebs) = 80 ATP</li><li>Moins cout activation : ~2 ATP</li><li><strong>Total : ~106 ATP par palmitate</strong> (vs 32 ATP par glucose)</li></ul><p><strong>Regulation de la beta-oxydation</strong> :</p><ul><li>CPT I : inhibée par malonyl-CoA (signal de lipogenese en cours, ne fais pas oxyder pendant qu''on synthetise)</li><li>Acyl-CoA dehydrogena : inhibée par NADH/FADH2 (énergie haute)</li></ul><h3>Ketose et ketogenese</h3><p><strong>Ketones</strong> : molecules produites en exces de beta-oxydation quand acetyl-CoA surproduction (jeune prolongé, diabète type 1).</p><p><strong>Reaction</strong> : 2 acetyl-CoA → acetoacetyl-CoA → acetoacétate → (HMG-CoA synthase et lyase) → acetone + β-hydroxybutyrate. Les ketones circulent vers cerveau/muscles pour utilisation alternative.</p><p><strong>Chetonemie permise</strong> : ~4-8 mmol/L. Ketoacidose : > 25 mmol/L (pH sanguin baisse dangereus).</p><h3>Lipogenese (synthese des acides gras)</h3><p><strong>Definition</strong> : synthese de nouveaux AG a` partir d''acetyl-CoA, particulierement en periode d''abondance alimentaire (insuline haute).</p><p><strong>Lieu</strong> : cytosol principalement (foie surtout, puis adipeux, muscle).</p><p><strong>Etapes principales</strong> :</p><p><strong>1. Acetyl-CoA carboxylase (ACC)</strong> : acetyl-CoA + CO2 + ATP → malonyl-CoA + ADP + Pi. C''est le step RATE-LIMITING. Malonyl-CoA est precurseur et inhibiteur endogene (feedback).</p><p><strong>Regulation d''ACC</strong> :</p><ul><li>Activation : insuline (phosphorylation par dephosphorylase), citrate (allosteric)</li><li>Inhibition : glucagon/epinephrine (phosphorylation kinase AMPK), AMP (AMPK), palmitate (feedback)</li></ul><p><strong>2. AG synthase (FAS)</strong> : iteration de 7 cycles (chaque cycle ajoute 2C), utilise malonyl-CoA comme substrat.</p><ul><li>Chaque cycle : malonyl-CoA + 2 NADPH + acyl-carrier protein → allongement 2C + CO2 + 2 NADP+</li><li>Bilan : acetyl-CoA + 7 malonyl-CoA + 14 NADPH → palmitate (16C) + 14 NADP+ + 8 CoA + 7 CO2</li></ul><p><strong>Rendement cost</strong> : 7 ATP (pour ACC) + 14 NADPH (equivalent ~21 ATP si NADPH = 1,5 ATP) = ~28 ATP necessaires pour syntheti un palmitate (vs 106 ATP libere pour l''oxider = deficit net pour synthese).</p><p><strong>3. Allongement et desaturation</strong> :</p><ul><li>Elongases : ajoutent 2C iteratif (PE 18, 20, 22, etc.)</li><li>Desaturases : introducent liaisons doubles (omega-3, omega-6 essentielles doivent ^etre alimentaires)</li></ul><h3>Regulation de la lipogenese</h3><p><strong>Insuline (état nourri)</strong> : majeur regulateur lipogenese :</p><ul><li>Augmente ACC (synthese)</li><li>Diminue CPT I via malonyl-CoA (inhibe oxydation)</li><li>Augmente FAS</li><li>Net : accumulation lipides</li></ul><p><strong>Glucagon/Epinephrine (état jeune)</strong> :</p><ul><li>Diminue ACC (inhibition AMPK)</li><li>Diminue malonyl-CoA → CPT I active</li><li>Augmente beta-oxydation</li><li>Net : mobilisation lipides</li></ul><p><strong>Cortisol chroniq (stress long)</strong> : augmente lipogenese hepatiq (depo visceral).</p><h3>Synthese de triglycerides</h3><p><strong>Triglyceridesynthesis</strong> : glycerol-3-phosphate + 3 acyl-CoA → triglycerides (esterification).</p><p><strong>Source glycerol-3-phosphate</strong> :</p><ul><li>Glucose via glycolyse (glucose → G6P → DHAP → glycerol-3-P)</li><li>Glycerol (direct via glycerol kinase)</li></ul><p><strong>Importance</strong> : glucose et lipides métabolism interconnectés. L''oxydation de glucose fournit acetyl-CoA qui nourrit lipogenese, et lipogenese consomme NADPH (requires glucose-6-P via pentose phosphate pathway).</p><h3>Synthese du cholesterol</h3><p><strong>Lieu</strong> : foie surtout (80% endogene).</p><p><strong>Precurseur</strong> : acetyl-CoA via HMG-CoA → mevalonate → cholesterol (multiple etapes).</p><p><strong>Regulation</strong> : feedback inhibition par cholesterol lui-même (reduit HMG-CoA reductase). Statines (medicaments) inhibent HMG-CoA reductase pour diminuer cholesterolemia.</p><h3>Comparaison énergétiq : Lipides vs Glucides</h3><p><strong>Densite énergétiq</strong> :</p><ul><li>Glucides : 4 kcal/g (~17 kJ/g)</li><li>Lipides : 9 kcal/g (~38 kJ/g) → 2,25× plus énergétique</li></ul><p><strong>Raison</strong> : lipides tres reduits (beaucoup C-H liaisons), glucides deja partiellement oxyde (contiennent d''oxy).</p><p><strong>Efficiency de stockage</strong> :</p><ul><li>Glycogene : 3-4g/kg tissu avec beaucoup eau → peu dense</li><li>Triglycerides : ~0,8 kcal/g tissu (car 30% poids est eau, protéines) → tres dense, excellent reserve</li><li>Equivalent énergétiq 1 kg adipeux = ~7,5 kg glycogene en volume corps</li></ul><p><strong>Timing d''utilisation</strong> :</p><ul><li>Glucides : mobilises rapidement (effort court), oxyde complet rapide, favori en exerce intense</li><li>Lipides : mobilise lentement (2-3h apres debut exercice), oxyde lent, favori en effort leger prolong (marathon)</li></ul><p><strong>Recuperation apres exercice</strong> : lipides oxides longtemps apres effort (EPOC = excess post-exercise oxygen consumption), continue thermogenese.</p><p>La regulation coordinée de ces voies par insuline/glucagon, AMP/ATP, et stress hormonaux assure l''homeostasie énergétiq du corps.</p>')
);
-- Seed file for Module E2 (Biologie et physiopathologie) - Chapters 20-38
-- Module E2 UUID: 11111111-1111-1111-1111-111111111102

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222020', '11111111-1111-1111-1111-111111111102', 'Corps cétoniques', 'Cétogenèse hépatique et cétolyse périphérique', 2, 19, 1.5, '<h2>Corps cétoniques</h2>
<p>Les corps cétoniques sont des molécules énergétiques produites lors du catabolisme des acides gras, essentiellement en situation de jeûne prolongé ou de diabète mal contrôlé. Ils représentent une source d''énergie alternative importante pour les tissus périphériques, notamment le cerveau et les muscles.</p>
<h3>Cétogenèse hépatique</h3>
<p>La cétogenèse se déroule exclusivement au niveau du foie. Lors d''un jeûne prolongé ou d''une diabète non contrôlée, l''influx d''acides gras libres augmente considérablement. Ces acides gras subissent une β-oxydation dans les mitochondries hépatiques, produisant massivement de l''acétyl-CoA.</p>
<p>En conditions normales, l''acétyl-CoA alimente le cycle de Krebs. Cependant, lors d''un jeûne prolongé, la demande énergétique des cellules hépatiques diminue, et l''acétyl-CoA en excès ne peut pas entrer complètement dans le cycle de Krebs. Il est alors utilisé pour la synthèse des corps cétoniques.</p>
<h3>Les trois corps cétoniques</h3>
<p>Trois molécules constituent les corps cétoniques :</p>
<ul>
<li><strong>Acétoacétate</strong> : premier corps cétonique synthétisé à partir de deux molécules d''acétyl-CoA. C''est un composé instable.</li>
<li><strong>Bêta-hydroxybutyrate</strong> : forme réduite et principale de l''acétoacétate. C''est le principal corps cétonique circulant (environ 75% des corps cétoniques sanguins).</li>
<li><strong>Acétone</strong> : formée par décarboxylation non enzymatique de l''acétoacétate. Elle est volatile et éliminée par la respiration (haleine caractéristique en acidocétose).</li>
</ul>
<p>Ces trois molécules peuvent être dosées dans le sang (cétonémie) et dans les urines (cétonurie) pour évaluer l''importance de la cétogenèse.</p>
<h3>Cétolyse dans les tissus périphériques</h3>
<p>Les corps cétoniques sont transportés via la circulation sanguine vers les tissus périphériques, particulièrement le cerveau et les muscles. Ces tissus possèdent les enzymes nécessaires pour oxyder les corps cétoniques et produire de l''énergie sous forme d''ATP.</p>
<p>Le cerveau représente le principal consommateur de corps cétoniques lors d''un jeûne prolongé. En conditions normales, le cerveau utilise 100g de glucose par jour. Lors d''un jeûne prolongé, il peut couvrir jusqu''à 70% de ses besoins énergétiques à partir des corps cétoniques, réduisant sa dépendance au glucose.</p>
<h3>Acidocétose diabétique</h3>
<p>En diabète de type 1 mal contrôlé ou en cas de déficit insulinique sévère, une cétogenèse excessive peut survenir, entraînant une accumulation de corps cétoniques sanguins. Cette situation, appelée acidocétose diabétique, est une urgence médicale caractérisée par :</p>
<ul>
<li>Cétonémie très élevée</li>
<li>Acidose métabolique sévère (pH sanguin abaissé)</li>
<li>Déshydratation</li>
<li>Hyperglycémie persistante</li>
</ul>
<p>L''haleine caractéristique et la respiration de Kussmaul (respiration profonde et rapide) en sont les signes cliniques typiques.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222021', '11111111-1111-1111-1111-111111111102', 'Carrefours et inter-conversions métaboliques', 'Intégration du métabolisme glucidique, lipidique et protéique', 2, 20, 2.0, '<h2>Carrefours et inter-conversions métaboliques</h2>
<p>Le métabolisme n''est pas un ensemble de réactions isolées mais un système hautement intégré où les glucides, lipides et protides s''inter-convertissent continuellement. L''acétyl-CoA représente le carrefour métabolique central autour duquel s''organisent ces conversions.</p>
<h3>Acétyl-CoA : le carrefour métabolique central</h3>
<p>L''acétyl-CoA est le composé clé qui relie les trois voies métaboliques majeures :</p>
<ul>
<li><strong>Catabolisme glucidique</strong> : La glycolyse produit du pyruvate qui est ensuite transformé en acétyl-CoA par le complexe pyruvate déshydrogénase.</li>
<li><strong>Catabolisme lipidique</strong> : La β-oxydation des acides gras produit directement de l''acétyl-CoA.</li>
<li><strong>Catabolisme protéique</strong> : Les acides aminés peuvent être convertis en acétyl-CoA après désamination et transamination.</li>
</ul>
<p>L''acétyl-CoA peut alors alimenter le cycle de Krebs pour produire de l''énergie, ou être utilisé pour synthétiser d''autres molécules (lipides, cholestérol, corps cétoniques).</p>
<h3>Inter-conversions glucides-lipides-protides</h3>
<p><strong>Glucides vers lipides</strong> : L''acétyl-CoA produit par la glycolyse peut être utilisé pour la lipogenèse de novo, synthèse des acides gras et du cholestérol. Ceci explique que les excès caloriques sous forme de glucides se stockent en graisse.</p>
<p><strong>Lipides vers glucides</strong> : Les acides gras peuvent être partiellement convertis en glucides par la néoglucogenèse via le glycérol (3 carbones), mais pas les acides gras à chaîne longue car l''acétyl-CoA ne peut pas être converti en glucose. Seul le glycérol 3-phosphate, libéré du catabolisme des triglycérides, peut participer à la néoglucogenèse.</p>
<p><strong>Protides vers glucides et lipides</strong> : Les acides aminés, après désamination, peuvent être convertis en intermédiaires du cycle de Krebs (glucoformateurs) ou en acétyl-CoA (cétoformateurs).</p>
<p><strong>Glucides vers protides</strong> : Bien que possible chez l''animal, la synthèse de acides aminés essentiels ne peut pas se faire à partir de glucides. Seuls les acides aminés non-essentiels peuvent être synthétisés.</p>
<h3>Néoglucogenèse</h3>
<p>La néoglucogenèse est la synthèse de glucose à partir de substrats non-glucidiques. Ses principaux substrats sont :</p>
<ul>
<li>Acides aminés (glutamate, alanine, aspartate) : environ 90% de la néoglucogenèse.</li>
<li>Glycérol : libéré du catabolisme des triglycérides adipeux.</li>
<li>Lactate : produit par la glycolyse anaérobie (cycle de Cori).</li>
</ul>
<p>Elle se déroule principalement dans le foie (90%) et secondairement dans le cortex rénal (10%), particulièrement lors d''un jeûne prolongé.</p>
<h3>Lipogenèse de novo</h3>
<p>La lipogenèse est la synthèse d''acides gras et de triglycérides à partir de l''acétyl-CoA. Elle se produit majoritairement dans le foie et le tissu adipeux lors de l''état post-prandial, sous l''action de l''insuline. L''excès de glucides et de protides alimentaires peut donc être stocké sous forme de graisse.</p>
<h3>Vue d''ensemble intégrée</h3>
<p>Le métabolisme global est régulé par des hormones (insuline, glucagon, épinéphrine, cortisol) qui orchestrent ces conversions selon l''état nutritionnel. En période post-prandiale, l''insuline favorise l''anabolisme (glycogenogenèse, lipogenèse). En période de jeûne, le glucagon et les hormones de stress favorisent le catabolisme pour maintenir la glycémie.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222022', '11111111-1111-1111-1111-111111111102', 'Catabolisme des acides aminés', 'Transamination, désamination et cycle de l''urée', 2, 21, 2.0, '<h2>Catabolisme des acides aminés</h2>
<p>Le catabolisme des acides aminés est un processus complexe qui comprend trois étapes principales : la transamination, la désamination et le devenir du squelette carboné. Ce processus permet de recycler les acides aminés non utilisés et de produire de l''énergie ou de nouveaux composés.</p>
<h3>Transamination</h3>
<p>La transamination est le premier étape du catabolisme de la plupart des acides aminés. Elle consiste en un transfert du groupe aminé (-NH2) d''un acide aminé à un α-cétoacide. Cette réaction est catalysée par des enzymes appelées aminotransférases (ou transaminases).</p>
<p><strong>Cofacteur : Pyridoxal 5-phosphate (PLP)</strong> : Le PLP, forme active de la vitamine B6, est le cofacteur essentiel pour les aminotransférases. La déficience en vitamine B6 perturbe donc l''ensemble du catabolisme aminé.</p>
<p>Les principales aminotransférases sont :</p>
<ul>
<li><strong>ALAT (Alanine aminotransférase)</strong> : prédominante dans le foie et les muscles.</li>
<li><strong>ASAT (Aspartate aminotransférase)</strong> : présente dans le foie, le cœur et les muscles.</li>
</ul>
<p>Leurs dosages sériques permettent d''évaluer l''intégrité hépatique et musculaire.</p>
<h3>Désamination oxydative</h3>
<p>La désamination oxydative produit directement un α-cétoacide et de l''ammoniac (NH3). Elle est catalysée principalement par la glutamate déshydrogénase, une enzyme mitochondriale importante du foie.</p>
<p>Le glutamate est l''acide aminé clé du catabolisme : la transamination de la plupart des acides aminés transfère le groupe aminé au glutamate. La désamination du glutamate libère donc l''ammoniac qui sera traité par le cycle de l''urée.</p>
<h3>Cycle de l''urée</h3>
<p>L''ammoniac produit est extrêmement toxique pour le système nerveux. Il doit être rapidement détoxifié via le cycle de l''urée, processus situé uniquement dans le foie (mitochondries et cytosol) et le cortex rénal.</p>
<p><strong>Les cinq étapes du cycle :</strong></p>
<ol>
<li>Carbamoyl phosphate synthétase I + Glutamine → Carbamoyl phosphate</li>
<li>Carbamoyl phosphate + Ornithine → Citruline (+ Pi)</li>
<li>Citruline + Aspartate → Arginosuccinate (+ ATP)</li>
<li>Arginosuccinate → Arginine + Fumarate</li>
<li>Arginine + H2O → Urée + Ornithine (par arginase)</li>
</ol>
<p><strong>Bilan global :</strong> NH3 + CO2 + Aspartate + 3 ATP → Urée + 2 ADP + Pi + Fumarate</p>
<p>L''urée, composé peu toxique, est excrétée dans les urines. Son dosage sanguin permet d''évaluer la fonction hépatique et rénale.</p>
<h3>Devenir du squelette carboné</h3>
<p>Après transamination/désamination, le squelette carboné peut être converti en :</p>
<ul>
<li><strong>Glucoformateurs</strong> : Acides aminés qui produisent du glucose (alanine, sérine, cystéine, thréonine, arginine, aspartate, glutamate, histidine, méthionine). Importants lors du jeûne.</li>
<li><strong>Cétoformateurs</strong> : Acides aminés qui produisent des corps cétoniques ou de l''acétyl-CoA (leucine, lysine). Ne peuvent pas être convertis en glucose.</li>
<li><strong>Mixtes</strong> : Acides aminés produisant à la fois des intermédiaires glucoformateurs et cétoformateurs (isoleucine, phénylalanine, tryptophane, tyrosine).</li>
</ul>
<p>Cette classification est importante en nutrition thérapeutique, particulièrement en cas d''insuffisance hépatique.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222023', '11111111-1111-1111-1111-111111111102', 'Métabolisme du cholestérol et des lipoprotéines', 'Synthèse, transport et régulation du cholestérol', 1, 22, 2.5, '<h2>Métabolisme du cholestérol et des lipoprotéines</h2>
<p>Le cholestérol est une molécule essentielle pour la structure membranaire, la synthèse d''hormones et d''acides biliaires. Son métabolisme est étroitement régulé et lié au transport des lipides sanguins via les lipoprotéines.</p>
<h3>Synthèse du cholestérol</h3>
<p>Le cholestérol est synthétisé essentiellement dans le foie (80%) et secondairement dans l''intestin, les glandes surrénales et les gonades. La synthèse comprend environ 30 réactions enzymatiques.</p>
<p><strong>Étape limitante : HMG-CoA réductase</strong> : La conversion du HMG-CoA en mévalonate par l''HMG-CoA réductase est l''étape clé et limitante. Cette enzyme est hautement régulée :</p>
<ul>
<li><strong>Régulation rétroactive</strong> : Le cholestérol intracellulaire inhibe l''HMG-CoA réductase et augmente sa dégradation.</li>
<li><strong>Régulation hormonale</strong> : L''insuline augmente la synthèse ; le glucagon et les hormones de stress la diminuent.</li>
<li><strong>Régulation transcriptionnelle</strong> : Les SREBP (Sterol Regulatory Element Binding Proteins) contrôlent l''expression génique de l''HMG-CoA réductase selon les niveaux de cholestérol intracellulaire.</li>
</ul>
<p><strong>Statines</strong> : Les statines sont des inhibiteurs puissants de l''HMG-CoA réductase, réduisant la synthèse hépatique de cholestérol de 30-50%. Elles augmentent l''expression des récepteurs hépatiques LDL, augmentant ainsi la clairance du cholestérol LDL sanguin.</p>
<h3>Les lipoprotéines : structure et fonction</h3>
<p>Les lipoprotéines sont des complexes de protéines (apolipoprotéines) et de lipides permettant le transport hydrophile des lipides hydrophobes.</p>
<p><strong>Chylomicrons</strong> : Produits par les entérocytes après absorption des lipides alimentaires. Contiennent la majorité des triglycérides et du cholestérol alimentaires. Transportent les vitamines liposolubles (A, D, E, K).</p>
<p><strong>VLDL (Very Low Density Lipoprotein)</strong> : Produite par le foie. Riche en triglycérides (export des triglycérides hépatiques). Son apolipoprotéine est l''apoB100.</p>
<p><strong>LDL (Low Density Lipoprotein)</strong> : Produit de catabolisme de la VLDL. Transporte le cholestérol vers les tissus périphériques. Apoprotéine : apoB100. C''est un marqueur clé du risque cardiovasculaire.</p>
<p><strong>HDL (High Density Lipoprotein)</strong> : Produite par le foie et les intestins. Transporte le cholestérol des tissus vers le foie pour son élimination (transport inverse du cholestérol). Protective contre l''athérosclérose.</p>
<h3>Métabolisme des lipoprotéines</h3>
<p><strong>Lipoprotéine lipase (LPL)</strong> : Enzyme de l''endothélium capillaire qui hydrolyse les triglycérides des chylomicrons et VLDL en acides gras et glycérol. Son activité augmente après un repas riche en graisses.</p>
<p><strong>Récepteurs LDL</strong> : Le foie internalise les particules LDL via récepteurs spécifiques de l''apoB100. La quantité de récepteurs est régulée par le cholestérol intracellulaire et par les statines (qui augmentent leur expression).</p>
<p><strong>CETP (Cholesteryl Ester Transfer Protein)</strong> : Protéine facilitant le transfert du cholestérol entre lipoprotéines.</p>
<h3>Régulation globale</h3>
<p>Le cholestérol sanguin total résulte d''un équilibre entre synthèse hépatique, absorption intestinale, et excrétion. Un apport élevé en cholestérol alimentaire diminue la synthèse endogène (régulation rétroactive), tandis qu''un apport faible augmente la synthèse hépatique. Environ 70-80% du cholestérol sanguin est endogène.</p>
<h3>Liens avec l''athérosclérose</h3>
<p>L''athérosclérose naît de l''accumulation de cholestérol LDL oxydé dans la paroi artérielle, formant des plaques athéromateuses. Un LDL cholestérol élevé, une HDL basse, et une hypertriglycéridémie sont des facteurs de risque majeurs.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222024', '11111111-1111-1111-1111-111111111102', 'Régulation de la glycémie', 'Maintien de l''homéostasie glucidique', 1, 23, 2.5, '<h2>Régulation de la glycémie</h2>
<p>La glycémie, concentration de glucose sanguin, est étroitement régulée autour de 0.7-1.1 g/L (3.9-6.1 mmol/L) pour assurer le fonctionnement optimal du cerveau et des autres organes. Cette régulation implique l''action coordonnée d''hormones (insuline, glucagon, épinéphrine, cortisol) et des transformations métaboliques dans le foie, muscle et tissu adipeux.</p>
<h3>Glycémie normale et limites</h3>
<p>Une glycémie à jeun normale se situe entre 0.7-1.1 g/L. Après un repas, la glycémie augmente transitoirement à 1.3-1.4 g/L mais retourne rapidement à la normale en 2-3 heures. Une glycémie persistante supérieure à 1.26 g/L à jeun définirait un diabète.</p>
<h3>Période post-prandiale (après repas) - État anabolique</h3>
<p>Après l''absorption des nutriments, l''augmentation de glucose sanguin stimule la sécrétion d''insuline par les cellules β pancréatiques. L''insuline, hormone anabolique dominante, induit :</p>
<ul>
<li><strong>Glycogénogenèse</strong> : Formation de glycogène hépatique et musculaire pour stocker le glucose excédentaire. Environ 300-400g de glycogène peut être stocké.</li>
<li><strong>Glycolyse</strong> : Augmentation de la dégradation du glucose en pyruvate pour la production d''énergie et les réactions anaboliques.</li>
<li><strong>Lipogenèse</strong> : Synthèse d''acides gras et de triglycérides pour stocker l''énergie en excès. Les glucides en excès se stockent en graisse corporelle.</li>
<li><strong>Inhibition du catabolisme</strong> : Suppression de la glycogénolyse, de la lipolyse et de la cétogenèse.</li>
</ul>
<h3>Période de jeûne - État catabolique</h3>
<p>Lors du jeûne (jeûne de quelques heures à quelques jours), la baisse de glucose stimule la sécrétion de glucagon par les cellules α pancréatiques. Le glucagon, hormone catabolique, induit :</p>
<ul>
<li><strong>Glycogénolyse</strong> : Dégradation du glycogène hépatique et musculaire en glucose. Ceci maintient la glycémie pendant les 12-24 premières heures de jeûne.</li>
<li><strong>Néoglucogenèse</strong> : Synthèse de glucose à partir d''acides aminés (surtout alanine du muscle), de glycérol (de la lipolyse) et de lactate. Ceci devient l''élément principal après épuisement du glycogène.</li>
<li><strong>Lipolyse</strong> : Mobilisation des triglycérides adipeux en acides gras libres et glycérol, fournissant substrats et énergie.</li>
<li><strong>Inhibition de la lipogenèse</strong> : Arrêt de la synthèse de graisse.</li>
</ul>
<h3>Jeûne prolongé (au-delà de 24-48 heures)</h3>
<p>L''épuisement du glycogène hépatique (survient après 24-48 heures) oblige le foie à dépendre quasi-exclusivement de la néoglucogenèse et de la cétogenèse. La production de corps cétoniques devient majeure, permettant au cerveau et aux muscles de réduire leur consommation de glucose.</p>
<p>Le bêta-hydroxybutyrate peut couvrir jusqu''à 70% des besoins énergétiques cérébraux lors d''un jeûne prolongé, épargnant les protéines musculaires d''une désamination excessive.</p>
<h3>Rôles des organes clés</h3>
<p><strong>Foie</strong> : Régulateur central. Synthétise le glucose via glycogénolyse et néoglucogenèse. Exporte le glucose pour maintenir la glycémie systémique.</p>
<p><strong>Muscle</strong> : Consommateur majeur de glucose en période post-prandiale. En jeûne, il mobilise ses réserves de glycogène (pour sa propre contraction) et ses acides aminés pour la néoglucogenèse hépatique.</p>
<p><strong>Tissu adipeux</strong> : Stocke les nutriments en excès sous forme de triglycérides lors de l''état post-prandial. En jeûne, libère des acides gras libres et du glycérol via la lipolyse.</p>
<h3>Diabète : dysrégulation de la glycémie</h3>
<p>Le diabète naît d''une dysrégulation sévère :</p>
<ul>
<li><strong>Diabète type 1</strong> : Destruction auto-immune des cellules β, entraînant un déficit insulinique complet.</li>
<li><strong>Diabète type 2</strong> : Résistance progressive à l''insuline associée à une insuffisance relative de sécrétion insulinique.</li>
</ul>
<p>En diabète mal contrôlé, la glycémie demeure élevée malgré les reins tentant d''éliminer le glucose via l''urine (glycosurie), pouvant s''accompagner d''une cétogenèse excessive en cas de déficit insulinique grave.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222025', '11111111-1111-1111-1111-111111111102', 'Adaptations métaboliques à l''exercice physique', 'Filières énergétiques et besoins nutritionnels du sportif', 2, 24, 2.0, '<h2>Adaptations métaboliques à l''exercice physique</h2>
<p>L''exercice physique provoque des modifications métaboliques rapides pour fournir l''énergie (ATP) nécessaire à la contraction musculaire. La source énergétique mobilisée dépend principalement de l''intensité et de la durée de l''effort.</p>
<h3>Filières énergétiques</h3>
<p><strong>Filière anaérobie alactique (0-10 secondes)</strong> : Utilisée lors d''efforts explosifs courts et intenses. Elle utilise les réserves musculaires d''ATP et la créatine phosphate (CP). L''ATP-CP permet de régénérer rapidement l''ATP. Exemple : sprint de 100m.</p>
<p><strong>Filière anaérobie lactique (10 secondes - 3 minutes)</strong> : Utilisée lors d''efforts intenses mais plus prolongés. Elle repose sur la glycolyse anaérobie, produisant de l''ATP rapidement mais aussi du lactate comme sous-produit. Ce lactate accumule localement dans le muscle, entraînant une acidose musculaire responsable de la fatigue. Exemple : 400m en athlétisme.</p>
<p><strong>Filière aérobie (>3 minutes)</strong> : Utilisée lors d''efforts prolongés d''intensité modérée. Elle utilise l''oxydation complète des substrats énergétiques (glucose, acides gras, acides aminés) via le cycle de Krebs et la chaîne respiratoire. Produit beaucoup plus d''ATP que les filières anaérobies. Exemple : marathon, vélo d''endurance.</p>
<h3>Utilisation des substrats selon l''intensité et la durée</h3>
<p><strong>Début de l''exercice (premiers 30 secondes)</strong> : Utilisation majeure du glycogène musculaire et de l''ATP-CP intramusculaires.</p>
<p><strong>Exercice intense (20-40% du VO2 max)</strong> : Utilisation préférentielle des glucides (glycolyse anaérobie). Quotient respiratoire proche de 1.</p>
<p><strong>Exercice modéré (40-60% du VO2 max)</strong> : Utilisation mixte : les glucides demeurent prédominants mais les acides gras commencent à être oxydés. Le rapport augmente progressivement.</p>
<p><strong>Exercice d''endurance prolongée (>60 minutes)</strong> : Utilisation croissanté des acides gras comme substrat, épargnant les glucides. Après épuisement du glycogène (90-120 minutes), le métabolisme dépend quasi-exclusivement des acides gras et secondairement des acides aminés (branchus : leucine, isoleucine, valine).</p>
<h3>Adaptations cardiovasculaires et respiratoires</h3>
<p>Pendant l''exercice, la demande en oxygène des muscles augmente massivement. Ceci entraîne :</p>
<ul>
<li><strong>Augmentation du débit cardiaque</strong> : Via augmentation de la fréquence cardiaque et du volume d''éjection systolique.</li>
<li><strong>Augmentation de la ventilation pulmonaire</strong> : Pour augmenter l''extraction de l''oxygène atmosphérique et l''élimination du CO2.</li>
<li><strong>Vasodilatation des artérioles musculaires</strong> : Pour augmenter le flux sanguin vers les muscles actifs.</li>
<li><strong>Vasoconstriction des territoires inactifs</strong> : Redirection du flux sanguin vers les muscles et le cerveau.</li>
</ul>
<h3>Besoins nutritionnels du sportif</h3>
<p>Les recommandations nutritionnelles diffèrent selon le type d''activité :</p>
<ul>
<li><strong>Énergie</strong> : Augmentée de 300-1000 kcal/jour selon l''intensité. Calculée souvent à partir du VO2 max.</li>
<li><strong>Glucides</strong> : 6-10 g/kg poids/jour pour les sportifs d''endurance (vs 3-5 g/kg pour les sédentaires).</li>
<li><strong>Protéines</strong> : 1.6-2.0 g/kg poids/jour pour les sportifs en musculation (vs 0.8 g/kg pour les sédentaires) pour optimiser la synthèse protéique musculaire.</li>
<li><strong>Lipides</strong> : 1.0-1.5 g/kg poids/jour, prioritairement des acides gras insaturés.</li>
<li><strong>Micronutriments</strong> : Fer (femmes notamment), vitamine C, vitamine E, magnésium en quantités augmentées.</li>
</ul>
<p><strong>Hydratation</strong> : Cruciale pour les performances. La sudation pendant l''exercice entraîne des pertes hydrosodées. Un sportif doit boire régulièrement pour compensé les pertes (environ 500-1000 mL/heure selon l''intensité et les conditions climatiques) et maintenir un poids stable (perte <2% du poids corporel pendant l''exercice).</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222026', '11111111-1111-1111-1111-111111111102', 'Régulation de l''équilibre phosphocalcique', 'Métabolisme du calcium, phosphore et minéralisation osseuse', 2, 25, 1.5, '<h2>Régulation de l''équilibre phosphocalcique</h2>
<p>Le calcium et le phosphore sont essentiels à la structure osseuse, à la fonction neuromusculaire, à la coagulation et à de nombreuses réactions enzymatiques. Leur concentration sanguine est étroitement régulée par trois hormones principales : la parathormone, la calcitonine et la vitamine D.</p>
<h3>Calcium et phosphore : rôles et répartition</h3>
<p><strong>Calcium</strong> : Total sanguin 8.5-10.5 mg/dL (2.1-2.6 mmol/L). Trois fractions : ionisée (50%, biologiquement active), liée aux protéines (40%), liée aux anions (10%).</p>
<p><strong>Phosphore</strong> : Total sanguin 2.5-4.5 mg/dL (0.8-1.45 mmol/L), majoritairement sous forme de phosphate.</p>
<p><strong>Répartition corporelle</strong> : 99% du calcium et 80% du phosphore sont stockés dans le squelette. L''équilibre du calcium sanguin est donc un équilibre entre absorption intestinale, réabsorption rénale, sécrétion gastrique et remodelage osseux.</p>
<h3>Parathormone (PTH) - Hormone hypercalcémiante</h3>
<p>Sécrétée par les glandes parathyroïdes en réponse à une baisse du calcium ionisé sanguin.</p>
<ul>
<li><strong>Au niveau rénal</strong> : Augmente la réabsorption tubulaire du calcium ; diminue la réabsorption du phosphate (provoquant une phosphaturie).</li>
<li><strong>Au niveau intestinal</strong> : Via activation de la vitamine D, augmente l''absorption du calcium alimentaire.</li>
<li><strong>Au niveau osseux</strong> : Stimule les ostéoclastes pour augmenter la résorption osseuse, libérant le calcium et le phosphate.</li>
</ul>
<p>Bilan : Augmentation de la calcémie et baisse de la phosphatémie.</p>
<h3>Calcitonine - Hormone hypocalcémiante</h3>
<p>Sécrétée par les cellules parafolliculaires thyroïdiennes (cellules C) en réponse à une augmentation du calcium sanguin. Actions opposées à la PTH :</p>
<ul>
<li><strong>Au niveau rénal</strong> : Augmente l''élimination du calcium dans les urines (hypercalciurie).</li>
<li><strong>Au niveau osseux</strong> : Inhibe les ostéoclastes, réduisant la résorption osseuse.</li>
</ul>
<p>Son rôle physiologique est cependant mineure comparé à la PTH et à la vitamine D.</p>
<h3>Vitamine D (Calcitriol) - Métabolite actif</h3>
<p>La vitamine D existe sous deux formes : D2 (d''origine végétale) et D3 (synthèse cutanée et aliments). Elle subit deux hydroxylations pour devenir active :</p>
<ul>
<li>1ère hydroxylation au foie → 25-hydroxyvitamine D (25(OH)D) : marqueur du statut vitaminique D.</li>
<li>2e hydroxylation au rein → 1,25-dihydroxyvitamine D (1,25(OH)2D) : forme biologiquement active.</li>
</ul>
<p><strong>Calcitriol actions</strong> :</p>
<ul>
<li><strong>Au niveau intestinal</strong> : Augmente l''absorption du calcium et du phosphate alimentaires.</li>
<li><strong>Au niveau rénal</strong> : Augmente la réabsorption du calcium.</li>
<li><strong>Au niveau osseux</strong> : Soutient le remodelage osseux.</li>
<li><strong>Au niveau des glandes parathyroïdes</strong> : Inhibe la sécrétion de PTH par rétroaction négative.</li>
</ul>
<p>Les déficits en vitamine D (risque si exposition solaire insuffisanté, malabsorption, ou alimentation carencée) entraînent un hypoparathyroïdisme secondaire compensatoire, risquant l''ostéomalacia chez l''adulte et le rachitisme chez l''enfant.</p>
<h3>Remodelage osseux</h3>
<p>L''os est une structure dynamique en constant remodelage via l''activation alternée d''ostéoblastes (synthèse osseuse) et d''ostéoclastes (résorption osseuse).</p>
<p><strong>Facteurs stimulant la résorption</strong> : PTH, carence en œstrogènes (post-ménopause), manque d''activité physique.</p>
<p><strong>Facteurs stimulant la synthèse</strong> : Charge mécanique (exercice), vitamine D, calcium alimentaire, hormones anabolisantés (IGF-1, testostérone).</p>
<h3>Ostéoporose</h3>
<p>L''ostéoporose caractérise une diminution de la densité minérale osseuse (DMO) entraînant une fragilité osseuse et risque fracturaire. Ses causes sont multiples : ménopause (carence œstrogénique), sédentarité, malabsorption, carence vitaminique D, apport calcique insuffisant, tabagisme, alcool, corticothérapie prolongée.</p>
<p>La prévention primaire repose sur un apport calcique et vitaminique D suffisant, l''activité physique régulière, et l''absence de facteurs de risque modifiables.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222027', '11111111-1111-1111-1111-111111111102', 'Régulation de l''équilibre hydromineéral', 'Homéostasie sodée, potassique et hydrique', 2, 26, 2.0, '<h2>Régulation de l''équilibre hydrominéral</h2>
<p>L''équilibre hydrominéral est fondamental pour maintenir l''osmolalité plasmatique, le potentiel membranaire et la fonction cellulaire. La régulation implique le rein, l''hypothalamus et plusieurs hormones (ADH, aldostérone), coordonnant l''apport et l''excrétion d''eau et d''électrolytes.</p>
<h3>Bilan hydrique : entrées et sorties</h3>
<p><strong>Entrées d''eau</strong> :</p>
<ul>
<li>Eau de boisson : 1-2 L/jour</li>
<li>Eau des aliments : 0.5-1 L/jour</li>
<li>Eau de métabolisme (oxydation glucides, lipides, protides) : 0.3-0.4 L/jour</li>
</ul>
<p><strong>Sorties d''eau</strong> :</p>
<ul>
<li>Urine : 1-2 L/jour (majorité)</li>
<li>Perspiration insensible (cutanée et respiratoire) : 0.4-0.6 L/jour</li>
<li>Sueur : variable selon température et activité (0-2 L/jour)</li>
<li>Fèces : 0.1-0.2 L/jour</li>
</ul>
<p>En conditions normales, le rein ajuste l''excrétion urinaire pour maintenir l''équilibre.</p>
<h3>ADH (Hormone antidiurétique) - Vasoprressine</h3>
<p>Synthétisée par l''hypothalamus, stockée et libérée par l''hypophyse postérieure. Elle régule la réabsorption de l''eau au niveau du rein.</p>
<p><strong>Stimuli de sécrétion</strong> :</p>
<ul>
<li>Augmentation de l''osmolalité plasmatique (>295 mOsm/kg) : stimulus principal détecté par des osmorecepteurs hypothalamiques.</li>
<li>Diminution du volume sanguin (via barorécepteurs artériels).</li>
<li>Stress, douleur, nausées.</li>
</ul>
<p><strong>Mécanisme d''action</strong> : L''ADH se fixe sur des récepteurs V2 rénaux, augmentant la concentration en AMPc intracellulaire, qui provoque l''insertion d''aquaporines (canaux à eau) dans la membrane apicale des cellules collectrices. Ceci augmente la perméabilité à l''eau, permettant sa réabsorption.</p>
<p><strong>Bilan</strong> : Augmentation de la réabsorption d''eau libre, diminution du volume urinaire, augmentation du volume sanguin et abaissement de l''osmolalité plasmatique.</p>
<p>Un déficit en ADH (diabète insipide) entraîne une polyurie massive et une hypernatrémie.</p>
<h3>Aldostérone - Minéralocorticoïde</h3>
<p>Synthétisée par la zone glomérulée du cortex surrénalien. Elle régule l''équilibre sodé et potassique principalement au niveau du canal collecteur rénal.</p>
<p><strong>Stimuli de sécrétion</strong> :</p>
<ul>
<li>Activation du système rénine-angiotensine-aldostérone (SRAA) : en réponse à une baisse de la perfusion rénale, les juxtaglomerulaires libèrent la rénine, activant le système.</li>
<li>Hyperkalémie (augmentation K+ sanguin) : stimulus puissant.</li>
<li>ACTH (stimulation corticotrope) : stimulus mineur.</li>
</ul>
<p><strong>Mécanisme d''action</strong> : Augmentation de l''expression des pompes Na-K-ATPase et des canaux épithéliaux sodés, provoquant une augmentation de la réabsorption sodée et une sécrétion potassique dans le tubule collecteur.</p>
<p><strong>Bilan</strong> : Augmentation du sodium sanguin (natrémie) et baisse du potassium sanguin (hypokaliémie). L''eau suit le sodium par osmose, augmentant le volume sanguin et la pression artérielle.</p>
<h3>Système SRAA (Rénine-Angiotensine-Aldostérone)</h3>
<p>Cascade enzymatique régulant la pression artérielle et l''équilibre sodé :</p>
<ul>
<li>Rénine (produite par juxtaglomerulaires) agit sur l''angiotensinogène hépatique → Angiotensine I.</li>
<li>ACE (Enzyme de Conversion de l''Angiotensine, au niveau pulmonaire) → Angiotensine II.</li>
<li>Angiotensine II provoque : vasoconstriction, libération d''aldostérone, libération d''ADH, augmentation de la soif.</li>
</ul>
<p>Les IEC (inhibiteurs de l''ACE) et les ARA2 (bloqueurs du récepteur de l''angiotensine II) sont largement utilisés pour traiter l''HTA et l''insuffisance cardiaque.</p>
<h3>Soif</h3>
<p>Mécanisme comportemental complémentaire. La soif est stimulée par :</p>
<ul>
<li>Augmentation de l''osmolalité plasmatique (osmorecepteurs).</li>
<li>Diminution du volume sanguin (barorécepteurs).</li>
<li>Facteurs sensoriels : sécheresse buccale, température corporelle élevée.</li>
<li>Facteurs cognitifs et sociaux : habitudes, émotions.</li>
</ul>
<p>Le centre de la soif est situé dans l''hypothalamus latéral. Son altération peut entraîner une hyperhydratation ou une déshydratation secondaire.</p>
<h3>Déshydratation et hyperhydratation</h3>
<p><strong>Déshydratation</strong> (perte d''eau) : Caractérisée par augmentation de l''osmolalité plasmatique, natrémie élevée, volume sanguin réduit. Symptômes : soif, sécheresse buccale, oligurie, confusion. Traitée par apport hydrique oral ou IV.</p>
<p><strong>Hyperhydratation</strong> (surcharge hydrique) : Caractérisée par diminution de l''osmolalité plasmatique, hyponatrémie, risque d''œdème cérébral. Peut survenir après excès d''ADH (SIADH) ou après apport hydrique excessif. Traitée par restriction hydrique stricte voire hypertonique en cas grave.</p>
<h3>Électrolytes clés</h3>
<p><strong>Sodium</strong> : Principal cation extracellulaire (normal : 135-145 mEq/L). Régule l''osmolalité et le volume extracellulaire. Apport alimentaire : 2300 mg Na/jour recommandé.</p>
<p><strong>Potassium</strong> : Principal cation intracellulaire (normal : 3.5-5.0 mEq/L). Essentiel au potentiel membranaire et à la fonction cardiaque. Une hyperkaliémie (>5.5 mEq/L) risque une arythmie ; une hypokaliémie (<3.5 mEq/L) aussi.</p>
<p><strong>Chlore</strong> : Principal anion extracellulaire (normal : 98-107 mEq/L). Suit le sodium. Essentiel pour l''équilibre acido-basique.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222028', '11111111-1111-1111-1111-111111111102', 'Régulation faim, satiété et soif', 'Contrôle appétit et signaux neurohormonaux', 2, 27, 2.0, '<h2>Régulation faim, satiété et soif</h2>
<p>La faim (sensation de besoin alimentaire) et la satiété (sensation de satisfaction après un repas) sont régulées par des signaux complexes d''origine hypothalamique, hormonale, gastro-intestinale et comportementale. Leur dysrégulation peut entraîner l''obésité ou les troubles du comportement alimentaire.</p>
<h3>Centres hypothalamiques</h3>
<p>L''hypothalamus est le centre majeur de la régulation de l''appétit. Deux régions clés :</p>
<ul>
<li><strong>Noyau ventromédian (VMN)</strong> : Classiquement considéré comme le centre de la satiété. Son lésion expérimentale provoque l''hyperphagie et l''obésité chez l''animal.</li>
<li><strong>Noyau latéral</strong> : Classiquement le centre de la faim. Son lésion provoque une aphagie (refus de manger).</li>
</ul>
<p>Cette dichotomie anatomique est toutefois simpliste ; ces deux régions forment en réalité un continuum fonctionnel avec interactions complexes.</p>
<h3>Signaux orexigènes (stimulant l''appétit)</h3>
<p><strong>Ghréline</strong> : Hormone secrétée par les cellules de l''estomac. Augmente avant les repas (ghréline « faim »). Stimule l''appétit et augmente la prise alimentaire. Ses niveaux diminuent après un repas. Joue un rôle dans les adaptations métaboliques au jeûne prolongé.</p>
<p><strong>NPY (Neuropeptide Y)</strong> : Neurotransmetteur hypothalamique. Puissant stimulateur de l''appétit, particulièrement de la prise d''aliments caloriquement denses (gras, sucres).</p>
<p><strong>AgRP (Agouti-Related Peptide)</strong> : Neuropeptide hypothalamique co-exprimé avec NPY. Antagoniste des récepteurs mélanocortin, bloquant l''effet anorexigène de la POMC.</p>
<h3>Signaux anorexigènes (inhibant l''appétit)</h3>
<p><strong>Leptine</strong> : Hormone synthétisée par l''adipocyte en proportion de la masse grasse corporelle. Agit comme signal du statut énergétique à long terme. Augmente l''appétit si bas (adaptation au jeûne) ; l''inhibe si élevé (adaptation à la suralimentation). Résistance à la leptine observée dans l''obésité.</p>
<p><strong>POMC (Pro-opiomélanocortine)</strong> : Neuropeptide hypothalamique précurseur de l''α-MSH. Son activation provoque l''anorexie (perte d''appétit). Inhibée par NPY/AgRP.</p>
<p><strong>Insuline</strong> : Hormone de l''abondance énergétique. Signale au cerveau un statut énergétique élevé, inhibant l''appétit. Traverse la barrière hémato-encéphalique pour agir sur l''hypothalamus.</p>
<p><strong>CCK (Cholécystokinine)</strong> : Hormone produite par les cellules I du duodénum en réponse aux lipides et protides du repas. Stimule la satiété et contribue à la sensation de rassasiement post-prandial.</p>
<p><strong>PYY (Peptide YY)</strong> : Hormone intestinale synthétisée par les cellules L de l''iléon et du côlon. Augmente après ingestion alimentaire, stimulant la satiété et inhibant l''appétit via Y2 récepteurs hypothalamiques.</p>
<p><strong>GLP-1 (Glucagon-Like Peptide-1)</strong> : Hormone intestinale augmentant après repas. Satiétogène. Améliore aussi la tolérance glucidique post-prandiale. Agonistes GLP-1 utilisés dans diabète et obésité.</p>
<h3>Régulation à court terme vs long terme</h3>
<p><strong>Court terme</strong> (minutes à heures) : Dominée par les signaux gastrointestinaux (CCK, PYY, distension gastrique) et le système nerveux. Durée du repas, viscéralité et satiété post-prandiale.</p>
<p><strong>Long terme</strong> (jours à semaines) : Dominée par les signaux énergétiques (leptine, insuline) reflétant les réserves énergétiques corporelles. Adaptation du poids corporel et des dépenses énergétiques.</p>
<h3>Facteurs sensoriels, cognitifs et sociaux</h3>
<p>Au-delà des signaux hormonaux, de nombreux facteurs influencent l''appétit :</p>
<ul>
<li><strong>Sensoriels</strong> : Odeur, saveur, texture des aliments. Conditionnement sensoriel à la faim/satiété.</li>
<li><strong>Cognitifs</strong> : Restriction alimentaire volontaire, croyances sur la nutrition, expériences négatives antérieures.</li>
<li><strong>Sociaux</strong> : Normes culturelles, repas en groupe, disponibilité alimentaire, stress psychosocial.</li>
<li><strong>Émotionnels</strong> : Stress, anxiété, dépression augmentent souvent l''appétit ; certains états réduisent l''appétit.</li>
</ul>
<h3>Perturbations : obésité et troubles du comportement alimentaire</h3>
<p><strong>Obésité</strong> : Résultant de dysrégulation chronique appétit-satiété, menant à un apport énergétique chroniquement supérieur aux dépenses. Facteurs contribuants : résistance à la leptine, dérégulation du système GLP-1, facteurs génétiques et environnementaux (aliments ultra-transformés, sédentarité).</p>
<p><strong>Troubles du Comportement Alimentaire (TCA)</strong> : Anorexie mentale (restriction sévère, dysmorphophobie), boulimie (crises/purges), hyperphagie boulimique. Résultent de dysrégulation cognitive et émotionnelle du comportement alimentaire, souvent avec composanté hormonale secondaire (améliorations de leptine/gréline en conséquence de l''état nutritionnel altéré).</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222029', '11111111-1111-1111-1111-111111111102', 'Pathologies du tube digestif', 'Gastrite, ulcères, MICI, SII, cœliaquie, cancers digestifs', 1, 28, 3.0, '<h2>Pathologies du tube digestif</h2>
<p>Les pathologies du tube digestif sont très fréquentes et constituent des enjeux majeurs de santé publique. Elles incluent les troubles fonctionnels, les infections, les inflammations chroniques, les malabsorptions et les cancers. Chacune entraîne des conséquences nutritionnelles spécifiques.</p>
<h3>Troubles de l''oralité et de la déglutition</h3>
<p>Les troubles de la déglutition (dysphagie) résultent de problèmes moteurs (achalasie, spasme oesophagien, parésie) ou sensoriels. Ils compliquent l''AVC, les maladies neurologiques dégénératives et les traumatismes.</p>
<p><strong>Adaptations nutritionnelles</strong> : Texture modifiée (aliments mixés ou hachés finement), liquides épaississants, déglutition assistée, nutrition entérale ou parentérale si nécessaire.</p>
<h3>Reflux gastro-oesophagien (RGO)</h3>
<p>Remontée pathologique du contenu gastrique acide dans l''oesophage, entraînant brûlures rétrosternales. Résulte d''une diminution de la pression du sphincter inférieur de l''oesophage (SIO), d''une vidange gastrique lente ou d''une sécrétion acide excessive.</p>
<p><strong>Facteurs favorisants</strong> : Obésité, grossesse, certains médicaments, café, alcool, aliments gras ou épicés.</p>
<p><strong>Complications chroniques</strong> : Œsophagite, sténose, œsophage de Barrett (métaplasie précancéreuse).</p>
<p><strong>Adaptations nutritionnelles</strong> : Fractionnement des repas, élévation céphalique, éviction des aliments déclenchants (gras, acide, chocolat, menthe), réduction du poids corporel si obésité.</p>
<h3>Ulcère gastro-duodénal</h3>
<p>Solution de continuité de la muqueuse gastrique ou duodénale, résultant d''un déséquilibre entre facteurs d''agressivité (acide, pepsine, Helicobacter pylori) et facteurs de protection (mucus, bicarbonate, prostaglandines).</p>
<p><strong>Helicobacter pylori</strong> : Bactérie responsable de 90% des ulcères duodénaux et 60-70% des ulcères gastriques. Traitement d''éradication : triple ou quadruple thérapie avec inhibiteur de la pompe à protons (IPP).</p>
<p><strong>AINS</strong> : Responsables de 20-30% des ulcères. Inhibition des prostaglandines protectrices.</p>
<p><strong>Adaptations nutritionnelles</strong> : Fractionnement des repas, éviction des aliments acides ou irritants, consommation d''aliments alcalins (lait, purées), suppression de l''alcool et du tabac.</p>
<h3>Maladies inflammatoires chroniques de l''intestin (MICI)</h3>
<p><strong>Maladie de Crohn</strong> : Inflammation transmuraleaffectant toute l''épaisseur du tube digestif, pouvant toucher tous les segments (bouche à anus), souvent le terminal iléal. Complication : fistules, sténoses.</p>
<p><strong>Rectocolite hémorragique (RCH)</strong> : Inflammation limitée à la muqueuse-sous-muqueuse, affectant le côlon et le rectum continuement (pas de segments sains intercalés).</p>
<p><strong>Symptômes</strong> : Diarrhée sanglante, douleurs abdominales, fièvre, perte de poids, malabsorption.</p>
<p><strong>Adaptations nutritionnelles</strong> : Régime sans résidu en poussée, hyperprotéine, supplémentation en oligo-éléments et vitamines (B12, folates, fer), nutrition entérale sélective, correction des déficits nutritionnels.</p>
<h3>Syndrome du côlon irritable (SII)</h3>
<p>Trouble fonctionnel sans lésion organique anatomique, associant douleurs/inconfort abdominal et troubles du transit (diarrhée, constipation ou alternance). Diagnostic par critères Rome IV.</p>
<p><strong>Adaptations nutritionnelles</strong> : Augmentation des fibres solubles, restriction FODMAP (en particulier si diarrhée), hydratation adéquate, activité physique régulière.</p>
<h3>Maladie cœliaque</h3>
<p>Autoimmunité au gluten (protéine du blé, orge, seigle) entraînant une atrophie des villosités intestinales et malabsorption. Prévalence : 1% population générale, mais plus élevée chez apparentés.</p>
<p><strong>Symptômes</strong> : Diarrhée chronique, mauvaise absorption (maigreur), douleurs abdominales, anémie, ostéoporose, dermatite herpétiforme (formes cutanées).</p>
<p><strong>Diagnostic</strong> : Sérologie (antigliadine, anti-endomysium, anti-transglutaminase), biopsie duodénale montrant atrophie villositaire.</p>
<p><strong>Traitement</strong> : Régime sans gluten strict et à vie. Correction des déficits nutritionnels (fer, B12, folates, calcium, vitamine D).</p>
<h3>Cancers digestifs</h3>
<p><strong>Cancer de l''estomac</strong> : Épidémiologie variable selon régions. Facteurs de risque : Helicobacter pylori, tabac, alcool, régime (viandes rouges, salés). Adénocarcinome majoritaire.</p>
<p><strong>Cancer du côlon</strong> : Fréquent en pays occidentaux. Facteurs de risque : âge >50 ans, AINS, polypes adénomateux, régime carné/pauvre en fibres, sédentarité, alcool, tabac, obésité. Dépistage par coloscopie tous les 10 ans (occultation sanguine recommandée avant).</p>
<p><strong>Adaptations nutritionnelles post-chirurgie</strong> : Selon la localisation et l''étendue de la résection.</p>
<h3>Chirurgies digestives et adaptations</h3>
<p><strong>Gastrectomie</strong> (résection gastrique) : Syndrome de dumping (vidange gastrique rapide), malabsorption vitaminique B12 et fer, satiation précoce. Régime : petits repas fréquents, aliments hydrates lentement absorbables.</p>
<p><strong>Colectomie</strong> (résection colique) : Diarrhée post-opératoire, perte accrue d''eau et électrolytes. Adaptation hydrosodée.</p>
<p><strong>Chirurgie bariatrique</strong> (by-pass gastrique, sleeve) : Réduction volontaire de la capacité gastrique ou de l''absorption intestinale pour traiter l''obésité. Complications : malabsorption, carences vitaminiques (B12, fer, folates, vitamine D), hypoglycémie réactive. Suivi nutritionnel obligatoire, supplémentations vitaminiques à vie.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222030', '11111111-1111-1111-1111-111111111102', 'Pathologies des glandes annexes', 'Foie, pancréas et vésicule biliaire', 1, 29, 3.0, '<h2>Pathologies des glandes annexes</h2>
<p>Le foie, le pancréas et la vésicule biliaire jouent des rôles métaboliques essentiels. Leurs pathologies entraînent des dysfonctionnements majeurs du métabolisme, de la digestion et de l''absorption nutritionnelle.</p>
<h3>Foie</h3>
<p><strong>Hépatites virales</strong> : Inflammations hépatiques causes par virus (A, B, C, D, E). VHA et VHE transmission orofécale (prévention : hygiène, vaccins). VHB et VHD transmission sanguine/sexuelle (prévention : vaccin HB). VHC transmission sanguine. Tableau : ictère, fatigue, anorexie, malaise abdominal. Récupération spontanée pour A et E ; chronicité possible pour B, C, D.</p>
<p><strong>Hépatites alcooliques</strong> : Inflammation hépatique secondaire à la consommation d''alcool chronique. Stéatose, hépatite, fibrose, cirrhose. Caractérisée par surcharge en triglycérides (stéatose hépatique).</p>
<p><strong>NASH (Non-Alcoholic Fatty Liver Disease)</strong> : Stéatose hépatique non alcoolique chez obèses ou diabétiques type 2 (insulinorésistance). Progression possible vers cirrhose sans consommation d''alcool.</p>
<p><strong>Cirrhose</strong> : Fibrose hépatique extensive entraînant une disparition des hépatocytes fonctionnels, menant à une insuffisance hépatique. Causes : alcoolisme chronique, hépatites virales chroniques, NASH, hémochromatose, cirrhose biliaire primitive. Complications : ascite, encéphalopathie hépatique, hypertension portale, varices oesophagiennes, coagulopathie.</p>
<p><strong>Insuffisance hépatique</strong> : Perte progressive de la capacité métabolique du foie. Tableau : coagulopathie, hypoglycémie, encéphalopathie hépatique (confusion, astérixis), accumulation d''ammoniac.</p>
<p><strong>Cancer du foie (hépatocarcinome)</strong> : Souvent sur cirrhose. Facteurs de risque : VHB, VHC, alcoolisme, NASH, hémochromatose.</p>
<p><strong>Adaptations nutritionnelles</strong> : En cirrhose, restriction protéique relative (risque d''encéphalopathie si apport excessif), faveur des acides aminés branchés, réduction du sel (ascite), supplémentation vitaminique (B, D, E, folates), restriction liquidienne en hyponatrémie.</p>
<h3>Pancréas</h3>
<p><strong>Pancréatite aiguë</strong> : Inflammation pancréatique soudaine. Causes : lithiase biliaire, alcool, hypertriglycéridémie, traumatisme, médicaments, infections. Tableau : douleur épigastrique intense, nausées, vomissements, élévation d''amylase et lipase pancréatiques. Complications graves : nécrose, infection, choc.</p>
<p><strong>Pancréatite chronique</strong> : Inflammation progressive entraînant destruction du parenchyme pancréatique. Causes : alcoolisme chronique (80%), mucoviscidose, hyperparathyroïdie. Conséquences : insuffisance pancréatique exocrine et endocrine (diabète type 3c).</p>
<p><strong>Insuffisance pancréatique exocrine</strong> : Perte des cellules acineuses produisant les enzymes digestives (lipase, amylase, protéase). Tableau : stéatorrhée (graisses dans les selles), diarrhée, malabsorption des lipides et vitamines liposolubles (A, D, E, K), perte de poids.</p>
<p><strong>Cancer du pancréas</strong> : Parmi les plus agressifs, pronostic très sombre (survie médiane <12 mois). Souvent découvert tardivement.</p>
<p><strong>Adaptations nutritionnelles</strong> : En insuffisance pancréatique, supplémentation enzymatique (lipase pancréatique), régime faible en graisses, supplémentation vitaminique (A, D, E, K), nutrition entérale ou parentérale si sévère.</p>
<h3>Vésicule biliaire</h3>
<p><strong>Lithiase biliaire (calculs biliaires)</strong> : Formation de calculs cholestérol ou bilirubine dans la vésicule. Facteurs de risque : âge, sexe féminin, obésité, régime pauvre en fibres. Majorité asymptomatique ; symptomatique si obstruction du cholédoque (colique biliaire, cholécystite aiguë, pancreatite).</p>
<p><strong>Cholécystite aiguë</strong> : Inflammation vésiculaire souvent secondaire à obstruction lithiasique. Tableau : douleur épigastrique, nausées, signes infectieux.</p>
<p><strong>Adaptations nutritionnelles</strong> : Éviction des aliments gras en phase aiguë (promotion de la vidange vésiculaire), régime riche en fibres pour prévention.</p>
<h3>Conséquences nutritionnelles communes</h3>
<p>Malabsorption des graisses entraîne une carence en vitamines liposolubles (A, D, E, K) et acides gras essentiels. Malabsorption du lactose, cobalamine (B12), folates, fer, calcium selon la localisation exacte du défaut.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222031', '11111111-1111-1111-1111-111111111102', 'Pathologies de l''appareil urinaire', 'Insuffisance rénale, dialyse, lithiase, adaptations diététiques', 1, 30, 2.5, '<h2>Pathologies de l''appareil urinaire</h2>
<p>Les maladies rénales entraînent une rétention de produits du catabolisme azotés et une dysrégulation électrolytique majeure. Elles constituent un défi nutritionnel spécifique où la balance entre besoins énergéto-protéiques et restrictions devient délicate.</p>
<h3>Maladie rénale chronique (MRC)</h3>
<p>Perte progressive de la fonction rénale définie par le débit de filtration glomérulaire (DFG) et l''albuminurie.</p>
<p><strong>Stades de MRC</strong> :</p>
<ul>
<li><strong>Stade 1-2</strong> : DFG ≥60, fonction rénale préservée ou légèrement diminuée.</li>
<li><strong>Stade 3a</strong> : DFG 45-59, atteinte rénale légère à modérée.</li>
<li><strong>Stade 3b</strong> : DFG 30-44, atteinte rénale modérée à sévère.</li>
<li><strong>Stade 4</strong> : DFG 15-29, atteinte rénale très sévère.</li>
<li><strong>Stade 5</strong> : DFG <15, insuffisance rénale terminale (IRT), nécessitant dialyse ou transplantation.</li>
</ul>
<p><strong>Causes</strong> : Diabète (30%), HTA (25%), glomérulonéphrite, polykystose rénale, infections urinaires récurrentes, obstructions.</p>
<p><strong>Complications</strong> : Anémie (déficit érythropoïétine), HTA, hyperphosphatémie, hyperkalémie, ostéodystrophie rénale (perturbations calcium/phosphore/vitamine D).</p>
<h3>Dialyse</h3>
<p><strong>Hémodialyse</strong> : Épuration du sang via une membrane semi-perméable, généralement 3 séances de 4-5 h/semaine. Permet l''élimination des petits solutés (urée, créatinine, potassium) mais moins efficace pour les molécules de poids moléculaire élevé.</p>
<p><strong>Dialyse péritonéale</strong> : Épuration via le péritoine (membrane naturelle du corps). 4-5 échanges de 2L de liquide dialysant/jour (dialyse péritonéale continue ambulatoire - DPCA) ou via machine la nuit (cycler). Avantages : moins invasive, plus physiologique, meilleur maintien résiduel. Risque : péritonite.</p>
<h3>Syndrome néphrotique</h3>
<p>Protéinurie massive (>3-4 g/24h), hypoalbuminémie, œdèmes généralisés, hyperlipidémie. Résulte d''une augmentation de la perméabilité glomérulaire (gloméruloscléroses, maladies auto-immunes). Complications : infections (déplétion opsonines), thromboses (perte facteurs anticoagulants).</p>
<h3>Lithiase rénale</h3>
<p><strong>Calculs calciques</strong> : Oxalate de calcium (80%), phosphate de calcium (20%). Facteurs de risque : hypercalciurie, hyperoxalurie, acidurie, déshydratation, immobilité.</p>
<p><strong>Calculs uriques</strong> : Acide urique (gouteux, débitmétabolisme purinique élevé, acidité urinaire). Facteurs de risque : goutte, régime riche en purines, déshydratation, acidose urinaire.</p>
<p><strong>Calculs de struvite</strong> : Infection urinaire (Proteus).</p>
<p><strong>Adaptations nutritionnelles</strong> : Hydratation massive (>2L/jour), restriction sodée (diminue calcurie), restriction protéique (diminue acide urique), restriction oxalates (épinards, noisettes, cacao), alcalinisation ou acidification urinaire selon type.</p>
<h3>Insuffisance rénale aiguë (IRA)</h3>
<p>Perte soudaine de fonction rénale sur jours à semaines, réversible si cause traitée. Causes : pré-rénale (hypovolémie), rénale (nécrose tubulaire aiguë - toxine, médicament), post-rénale (obstruction).</p>
<h3>Adaptations diététiques en MRC</h3>
<p><strong>Protéines</strong> : Restriction à 0.8 g/kg/jour en MRC avancée (stades 4-5) ; 1.0-1.2 g/kg en stades 3-4. Objectif : réduire la production d''urée et de créatinine (sous-produits protéiques) sans dénutrition. Privilégier les protéines à haut indice PDCAAS (biological value élevé).</p>
<p><strong>Sel</strong> : Restriction à 5-6 g Na/jour (<2.3 g Na/jour) pour contrôler l''HTA et l''œdème.</p>
<p><strong>Potassium</strong> : Restriction en MRC avancée (risque hyperkalémie). <3 g K/jour en stade 5. Éviter fruits secs, épinards, bananes, légumes racines.</p>
<p><strong>Phosphore</strong> : Restriction en stade 4-5 (risque hyperphosphatémie, ostéodystrophie). <1000-1200 mg/jour. Limiter produits laitiers, oeufs, viande, noix, chocolat.</p>
<p><strong>Eau</strong> : Restriction en stade 5 (oligoanurie). Quantité = débits urinaires + insensibles (500 mL), environ 500-1000 mL/jour.</p>
<p><strong>Calories</strong> : 30-35 kcal/kg/jour pour prévenir le catabolisme protéique (en stade avancé).</p>
<p><strong>Vitamines</strong> : Supplémenter B1, B2, B3, B6, C, acide folique (perdues en dialyse) ; restriction vitamine A et D (accumulation) sauf si carence.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222032', '11111111-1111-1111-1111-111111111102', 'Pathologies cardiovasculaires', 'Athérosclérose, infarctus, HTA, insuffisance cardiaque, AVC', 1, 31, 2.5, '<h2>Pathologies cardiovasculaires</h2>
<p>Les maladies cardiovasculaires constituent la première cause de mortalité mondiale. Elles résultent de l''interaction de facteurs génétiques et de facteurs de risque modifiables, notamment nutritionnels et métaboliques.</p>
<h3>Athérosclérose</h3>
<p>Processus chronique d''accumulation de lipides et de fibroses dans la paroi artérielle, entraînant une sténose progressive des artères.</p>
<p><strong>Formation de la plaque athéromateuse</strong> :</p>
<ul>
<li>Dysfonction endothéliale (exposition des cellules musculaires lisses et matrice extracellulaire aux lipides sériques).</li>
<li>Infiltration du LDL cholestérol et oxydation du LDL (LDLox), reconnu comme "danger" par les macrophages.</li>
<li>Phagocytose du LDLox par les macrophages formant les cellules spumeuses.</li>
<li>Accumulation progressive : noyau lipidique + dépôts calciques + fibrose progressive.</li>
<li>Rupture de la chape fibreuse → exposition du noyau lipidique thrombogène → thrombose → occlusion artérielle.</li>
</ul>
<p><strong>Facteurs de risque modifiables</strong> : Hyperlipoprotéinémie, HTA, tabac, diabète, obésité, sédentarité, stress.</p>
<p><strong>Facteurs de risque non modifiables</strong> : Âge, sexe masculine, antécédents familiaux précoces.</p>
<h3>Infarctus du myocarde (IDM)</h3>
<p>Nécrose myocardique secondaire à l''occlusion d''une artère coronaire (athérosclérose, thrombose, embolie, spasme, dissection). Symptômes : douleur thoracique écrasanté, irradiation bras/mâchoire, dyspnée, sueurs, nausées.</p>
<p><strong>Complications aiguës</strong> : Arythmies, insuffisance cardiaque aiguë, choc cardiogénique, rupture septale ou pariétale.</p>
<p><strong>Adaptations nutritionnelles post-IDM</strong> : Régime DASH (riche fruits/légumes/céréales complètes, pauvre sodium/saturés), réduction du cholestérol, acides gras oméga-3 (poissons gras), suppression du tabac et alcool.</p>
<h3>Hypertension artérielle (HTA)</h3>
<p>Pression artérielle systolique ≥140 mmHg ou diastolique ≥90 mmHg lors de mesures répétées.</p>
<p><strong>HTA primaire (essentielle)</strong> : 90-95% des cas. Multifactorielle : génétique, surpoids, sédentarité, stress, apport sodé excessif, carences magnésium/potassium/calcium.</p>
<p><strong>HTA secondaire</strong> : 5-10% des cas. Causes : rénales (sténose artérielle rénale, glomérulonéphrite), endocriniennes (phéochromocytome, hyperthyroïdie, hyperaldostéronisme primaire), vasculaires.</p>
<p><strong>Adaptations nutritionnelles (régime DASH)</strong> : Restriction sodée (<2.3 g Na/jour), augmentation potassium/magnésium/calcium, fruits/légumes 4-5 portions/jour, réduction des saturés, activité physique régulière.</p>
<h3>Insuffisance cardiaque</h3>
<p>Incapacité du cœur à pomper suffisamment de sang pour couvrir les besoins métaboliques des tissus.</p>
<p><strong>HF systolique</strong> : Fraction d''éjection du VG diminuée (<40%). Résulte d''IDM antérieur, cardiomyopathies, HTA chronique.</p>
<p><strong>HF diastolique</strong> : Fraction d''éjection préservée (>50%). Dysfonction du remplissage ventriculaire. Fréquent chez la femme âgée hypertensive.</p>
<p><strong>Symptômes</strong> : Dyspnée d''effort, orthopnée, œdèmes des membres inférieurs, fatigue, intolérance à l''exercice.</p>
<p><strong>Adaptations nutritionnelles</strong> : Restriction sodée stricte (<2 g Na/jour en IC avancée), restriction liquidienne (500 mL-1L/jour en décompensation), apport énergétique adéquat pour prévenir la cachexie cardiaque, oméga-3, réduction des saturés.</p>
<h3>Accident vasculaire cérébral (AVC)</h3>
<p><strong>AVC ischémique</strong> : Occlusion d''une artère cérébrale (80% des AVC). Causes : athérosclérose, embolie cardiaque (fibrillation auriculaire), dissection artérielle, thrombophilie.</p>
<p><strong>AVC hémorragique</strong> : Rupture d''une artère cérébrale (20% des AVC). Causes : HTA chronique, anévrysme, malformation veineuse.</p>
<p><strong>Symptômes d''alerte</strong> : Déficit moteur soudain, troubles de la parole, perte de vision unilatérale, déviation de la bouche, asymétrie faciale.</p>
<p><strong>Adaptations nutritionnelles post-AVC</strong> : Prévention secondaire selon le type (anticoagulation si cardioembolique), même adaptations que post-IDM. Attention particulière si dysphagie (texture modifiée, nutrition entérale si nécessaire).</p>
<h3>Prévention primaire et secondaire</h3>
<p><strong>Facteurs modifiables clés</strong> :</p>
<ul>
<li>Arrêt du tabac (diminue risque IDM/AVC de 50% en 1 an).</li>
<li>Normalisation tension artérielle (cible <140/90 mmHg en général, <130/80 en diabète).</li>
<li>Abaissement du cholestérol LDL (statines, ézétimibe, inhibiteurs PCSK9).</li>
<li>Contrôle du diabète (HbA1c <7%).</li>
<li>Réduction du poids corporel si surpoids (diminue surmortalité).</li>
<li>Activité physique régulière (30 min/jour, 5 jours/semaine).</li>
<li>Régime cardiosanitaire (DASH, méditerranéen).</li>
<li>Gestion du stress, sommeil suffisant.</li>
</ul>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222033', '11111111-1111-1111-1111-111111111102', 'Pathologies endocriniennes et métaboliques', 'Diabète, dyslipidemies, obésité, syndrome métabolique', 1, 32, 3.0, '<h2>Pathologies endocriniennes et métaboliques</h2>
<p>Les pathologies endocriniennes et métaboliques constituent un ensemble de troubles caractérisés par une dysrégulation de la glycémie, des lipides ou du poids corporel, souvent interconnectés et associés à une insulinorésistance.</p>
<h3>Diabète</h3>
<p><strong>Diabète type 1</strong> : Destruction auto-immune des cellules β pancréatiques entraînant un déficit insulinique total. Survient généralement chez le jeune (enfant, adolescent). Tableau clinique brutal : polyurie, polydipsie, perte de poids rapide, cétose/acidocétose d''emblée sans traitement.</p>
<p>Traitement : Insulinothérapie obligatoire (basal-bolus ou pompe), comptage des glucides, autosurveillance glycémique.</p>
<p><strong>Diabète type 2</strong> : Insidieux, survient surtout chez l''adulte d''âge mûr, souvent obèse. Pathophysiologie : insulinorésistance progressive (muscles, foie, adipocytes moins sensibles) associée à une insuffisance relative de sécrétion insulinique (dysfonction cellule β). Facteurs contributifs : génétique, sédentarité, suralimentation, obésité.</p>
<p>Traitement : Hygiène de vie (régime, activité physique, perte de poids), antidiabétiques oraux (metformine, sulfamides, glinides, glitazones, inhibiteurs DPP-4, inhibiteurs SGLT2, agonistes GLP-1), insuline si progression.</p>
<p><strong>HbA1c (hémoglobine glyquée)</strong> : Marqueur du contrôle glycémique moyen sur 2-3 mois. Cible thérapeutique : <7% en général ; <6.5% chez jeune sans complications.</p>
<h3>Complications du diabète</h3>
<p><strong>Microvascularité</strong> :</p>
<ul>
<li><strong>Rétinopathie diabétique</strong> : Atteinte rétinienne causant cécité, particulièrement chez type 1.</li>
<li><strong>Néphropathie diabétique</strong> : Atteinte rénale, première cause de dialyse dans pays développés. Marquée par protéinurie progressive et perte de DFG.</li>
<li><strong>Neuropathie diabétique</strong> : Atteinte nerveuse périphérique (neuropathie distale symmetric) ou autonome (dysfonctionnement érectile, gastroparésie). Douleurs, paresthésies, risque d''ulcères de pied.</li>
</ul>
<p><strong>Macrovascularité</strong> : Accélération de l''athérosclérose coronaire, cérébrale et périphérique, jusqu''à 2-4 fois plus fréquente que chez non-diabétiques.</p>
<h3>Dyslipidemies</h3>
<p>Perturbations du profil lipidique sanguin :</p>
<ul>
<li><strong>Hypertriglycéridémie</strong> : TG >150 mg/dL. Facteurs : consommation excessive alcool/sucres simples, surpoids, génétique, hypothyroïdie, diabète mal contrôlé.</li>
<li><strong>Hypercholestérolémie</strong> : Cholestérol LDL >130 mg/dL ou cholestérol total >200 mg/dL. Génétique (hypercholestérolémie familiale) ou secondaire (HTA, diabète, obésité).</li>
<li><strong>Dyslipidémie athérogène</strong> : Associe LDL élevé ou TG élevés, HDL bas. Fréquent en syndrome métabolique et diabète type 2.</li>
</ul>
<p><strong>Adaptation nutritionnelle</strong> : Réduction graisses saturées et trans, augmentation acides gras insaturés (oléique, linoléique), supplémentation oméga-3, acides gras omega-3, augmentation fibres solubles, réduction poids si obésité.</p>
<h3>Obésité</h3>
<p><strong>Définition</strong> : IMC ≥30 kg/m² (surpoids : 25-29.9, normal : 18.5-24.9).</p>
<p><strong>Distribution aisdale du tissu adipeux</strong> : Obésité abdominale (risque métabolique accru) évaluée par tour de taille (hommes ≥94 cm, femmes ≥80 cm).</p>
<p><strong>Complications</strong> : Diabète type 2, dyslipidémie, HTA, insuffisance cardiaque, apnée du sommeil, stéatose hépatique, infertilité, cancers (sein, côlon, endomètre).</p>
<p><strong>Traitement</strong> : Régime hypocalorique (500-1000 kcal déficit/jour), activité physique régulière (150 min/semaine), thérapie comportementale, bariatrique si BMI ≥40 ou ≥35 avec comorbidités.</p>
<h3>Syndrome métabolique</h3>
<p>Cluster de facteurs de risque cardio-métabolique. Critères IDF :</p>
<ul>
<li>Obésité centrale (tour de taille augmenté) + au moins 2 des critères :</li>
<li>Triglycérides ≥150 mg/dL</li>
<li>HDL <40 mg/dL (hommes) ou <50 mg/dL (femmes)</li>
<li>PAS ≥130 ou PAD ≥85 mmHg</li>
<li>Glycémie à jeun ≥100 mg/dL ou diabète type 2</li>
</ul>
<p><strong>Pathophysiologie</strong> : Insulinorésistance centrale (tissu adipeux viscéral). Inflammation chronique de bas grade. Augmente le risque de diabète et maladies cardiovasculaires.</p>
<p><strong>Traitement</strong> : Perte de poids (5-10% réduisent significativement les facteurs de risque), régime DASH, activité physique régulière, traitement pharmacologique des facteurs de risque individuels.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222034', '11111111-1111-1111-1111-111111111102', 'Pathologies du système nerveux', 'Parkinson, Alzheimer, épilepsie, AVC, dysphagie', 1, 33, 2.5, '<h2>Pathologies du système nerveux</h2>
<p>Les maladies neurodégénératives et les AVC impactent profondément le métabolisme, la déglutition, et l''autonomie. Leur prise en charge nutritionnelle est complexe, requérant une approche multidisciplinaire.</p>
<h3>Maladie de Parkinson</h3>
<p>Neurédégénérescence progressive des neurones dopaminergiques du locus niger (substantia nigra pars compacta). Caractérisée par le trioplet classique :</p>
<ul>
<li><strong>Trémor</strong> : Au repos, souvent asymptomatique initialement.</li>
<li><strong>Rigidité</strong> : Résistance au mouvement passif (phénomène de la "roue dentée").</li>
<li><strong>Bradykinésie</strong> : Ralentissement des mouvements volontaires, lenteur initiale.</li>
</ul>
<p>Symptômes additionnels : instabilité posturale, impassibilité faciale, hypophonie (voix faible), troubles de l''écriture (micrographie), constipation, troubles du sommeil, dépression, dysphonie, dysphagie.</p>
<p><strong>Traitement pharmacologique</strong> : L-dopa (précurseur dopamine, mécanisme le plus efficace), agonistes dopaminergiques (bromocriptine, ropinirole, pramipexole), inhibiteurs MAO-B (sélégiline).</p>
<p><strong>Adaptations nutritionnelles</strong> : Timing des repas par rapport aux médicaments (L-dopa compétitionne avec acides aminés neutres pour l''absorption intestinale ; prise sans protéines à proximité). Régime riche en fibres et hydratation contre la constipation. Textures adaptées si dysphagie. Supplémentation coenzyme Q10 (potentiel neuroprotecteur).</p>
<h3>Maladie d''Alzheimer</h3>
<p>Neurodégénérescence progressive caractérisée histologiquement par :</p>
<ul>
<li><strong>Plaques amyloïdes</strong> : Dépôts extracellulaires de protéine amyloïde-bêta (Aβ), toxiques pour les synapses.</li>
<li><strong>Dégénérescence neurofibrillaire</strong> : Enchevêtrements intracellulaires de protéine tau phosphorylée.</li>
</ul>
<p>Cliniquement : Déclin cognitif progressif (mémoire, langage, fonctions exécutives), confusion, désorientatio, comportement désinhibé, dépression, apathie. Stades : léger (MMSE 21-26), modéré (MMSE 11-20), sévère (MMSE <10).</p>
<p><strong>Adaptations nutritionnelles</strong> : Approche nutritionnelle bienveillante adaptée aux capacités cognitives et motrices. Stimulation de l''appétit (aliments préférés), facilitation de l''autonomie malgré les troubles cognitifs, surveillance du poids (risque de dénutrition en stade avancé), adaptation des textures si dysphagie tardive.</p>
<h3>Épilepsie</h3>
<p>Prédisposition à des crises épileptiques récurrentes (provoquées par des décharges neuronales excessives). Peut être primitif ou secondaire (lésions, infections, trauma, AVC).</p>
<p><strong>Types de crises</strong> : Généralisées (atonie, tonico-cloniques, absence) ou focales (origine localisée, parfois secondairement généralisées).</p>
<p><strong>Traitement pharmacologique</strong> : Antiépileptiques (diphénylhydantoïne, valproate, lévétiracetam, lamotrigine, gabapentin).</p>
<p><strong>Régime cétogène</strong> : Régime riche en graisses, pauvre en glucides, normal en protéines. Utilisé en épilepsie résistante aux médicaments. Avantages : réduction des crises chez 50-70% des cas réfractaires. Mécanismes : production de corps cétoniques, altération du métabolisme énergétique, modulation du GABA.</p>
<p><strong>Adaptations nutritionnelles</strong> : Régime cétogène classique (ratio 3-4:1 lipides : glucides+protides) ou variantes (MCT oil, régime Atkins modifié) sous supervision. Supplémentation en vitamine D (déficience fréquente avec antiépileptiques), calcium, folates.</p>
<h3>Accident vasculaire cérébral (AVC)</h3>
<p>Atteinte cérébrale aiguë ischémique ou hémorragique. Voir chapitre pathologies cardiovasculaires pour détails.</p>
<p><strong>Complications nutritionnelles post-AVC</strong> : Dysphagie (25-50% des cas), hémianopsie (trouble du champ visuel), héminégligence (inattention au demi-champ), aphasie (troubles du langage), apraxie (trouble du contrôle moteur volontaire).</p>
<h3>Troubles de la déglutition (dysphagie)</h3>
<p>Difficulté à avaler salive, liquides ou solides. Causes neurologiques multiples (AVC, Parkinson, Alzheimer, sclérose latérale amyotrophique, myasthénie gravis).</p>
<p><strong>Phases de la déglutition</strong> :</p>
<ul>
<li><strong>Orale</strong> : Mastication, formation d''un bolus, propulsion vers l''oropharynx.</li>
<li><strong>Pharyngée</strong> : Réflexe de déglutition, fermeture laryngée, propulsion vers l''oesophage.</li>
<li><strong>Œsophagienne</strong> : Transport esophagien (atteinte moins fréquente neurologiquement).</li>
</ul>
<p><strong>Diagnostic</strong> : Test d''eau, vidéofluoroscopie, manométrie.</p>
<p><strong>Adaptations diététiques</strong> : Selon la sévérité :</p>
<ul>
<li>Texture normale si déglutition préservée.</li>
<li>Texture hachée finement si déglutition pharyngée atteinte légèrement.</li>
<li>Texture mixée-lisse si déglutition pharyngée sévèrement atteinte.</li>
<li>Liquides épaississants (eau épaissie, nectar, miel) si risque de fausse route.</li>
<li>Nutrition entérale (sonde nasogastrique ou gastrostomie) si dysphagie sévère.</li>
</ul>
<p><strong>Enrichissement de l''alimentation</strong> : Supplémentation énergétique (crème, huile, beurre), protéique (lait en poudre, yaourt grecque) pour prévenir la dénutrition malgré l''apport réduit.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222035', '11111111-1111-1111-1111-111111111102', 'Troubles du comportement alimentaire', 'Anorexie, boulimie, hyperphagie, critères diagnostiques, complications', 1, 34, 2.5, '<h2>Troubles du comportement alimentaire</h2>
<p>Les troubles du comportement alimentaire (TCA) constituent une pathologie psychiatrique grave avec des conséquences somatiques sévères. Ils associent des perturbations du comportement alimentaire, de l''image corporelle et du rapport au poids/à la nourriture.</p>
<h3>Anorexie mentale</h3>
<p><strong>Critères diagnostiques DSM-5</strong> :</p>
<ul>
<li>Restriction sévère de l''apport alimentaire menant à un poids corporel anormalement bas pour l''âge, le sexe et la santé physique.</li>
<li>Peur intense de la prise de poids, comportement persistant empêchant la prise de poids (même si poids est bas).</li>
<li>Perturbation de l''image corporelle et de la perception du poids/forme corporelle, importance accordée excessive au poids/forme dans l''estime de soi.</li>
</ul>
<p><strong>Types</strong> :</p>
<ul>
<li><strong>Restrictif</strong> : Restriction alimentaire seule.</li>
<li><strong>Accès/purge</strong> : Episodes de crises alimentaires suivies de purges (vomissements, laxatifs).</li>
</ul>
<p><strong>Dysmorphophobie</strong> : Perception déformée, dystopique de son propre corps. Même lorsque atteint poids très bas, perception subjective de surpoids.</p>
<p><strong>Conséquences somatiques</strong> :</p>
<ul>
<li>Dénutrition protéino-énergétique : amaigrissement, fonte musculaire, carence multivitaminique.</li>
<li>Troubles cardiaques : cardiomyopathie, bradycardie, hypotension, arythmies (risque mort subite).</li>
<li>Troubles gastro-intestinaux : vidange gastrique ralentie (gastroparésie), constipation, distension abdominale.</li>
<li>Troubles endocriniens : aménorrhée (insuffisance d''oestrogènes), hypothyroïdie, baisse du cortisol, hypogonadisme.</li>
<li>Ostéoporose : risque fracturaire majeur, souvent irréversible si anorexie prolongée pendant la croissance.</li>
<li>Troubles hydro-électrolytiques : hypokalémie (arythmie), hypochlorémie, hypophosphatémie (si renutrition inappropriée).</li>
<li>Troubles dentaires : usure, caries (acidité du vomitus).</li>
<li>Troubles hématologiques : anémie (carence fer, folates, B12), leucopénie, thrombocytopénie.</li>
</ul>
<h3>Boulimie</h3>
<p><strong>Critères diagnostiques DSM-5</strong> :</p>
<ul>
<li>Crises de boulimie récurrentes (consommation rapide de large quantité d''aliments avec sensation de perte de contrôle).</li>
<li>Comportements de compensation réguliers (vomissements provocateurs, abus de laxatifs/diurétiques, jeûne, exercice compulsif).</li>
<li>Crises et comportements compensatoires ≥1 fois/semaine pendant ≥3 mois.</li>
<li>Perturbation de l''image corporelle identique à l''anorexie.</li>
</ul>
<p><strong>Conséquences spécifiques</strong> :</p>
<ul>
<li>Déchaussement dentaire, usure dentaire (acidité du vomitus).</li>
<li>Cicatrices sur les phalanges (traumatisme lors des vomissements provocateurs).</li>
<li>Hypertrophie des glandes parotides (amylasémie élevée).</li>
<li>Œsophagite, laryngite (reflux acide chronique).</li>
<li>Troubles hydro-électrolytiques identiques ou parfois plus sévères que l''anorexie (abus de laxatifs).</li>
<li>Dysfonctionnement cardiaque identique.</li>
</ul>
<p>Poids généralement normal ou légèrement au-dessus (contrastant avec anorexie), ce qui peut retarder le diagnostic.</p>
<h3>Hyperphagie boulimique (Binge Eating Disorder - BED)</h3>
<p><strong>Critères diagnostiques</strong> :</p>
<ul>
<li>Crises de boulimie récurrentes sans comportements compensatoires réguliers (contrairement à la boulimie).</li>
<li>Détresse associée aux crises.</li>
<li>Crises ≥1 fois/semaine pendant ≥3 mois.</li>
</ul>
<p>Fréquemment associée à l''obésité et aux douleurs de culpabilité/honte post-crises.</p>
<h3>Orthorexie</h3>
<p>Obsession pathologique pour les aliments "purs" ou "sains", menant à des restrictions alimentaires sévères. Non reconnue au DSM-5 mais croissanté en prévalence. Peut mener à la dénutrition si critères de "pureté" excessivement restrictifs.</p>
<h3>Complications nutritionnelles communes</h3>
<ul>
<li><strong>Dénutrition protéino-énergétique</strong> : Marasme (perte pondérale majeure), kwashiorkor (peut survenir lors de renutrition rapide inappropriée si apport protéique faible).</li>
<li><strong>Carence vitaminique et minérale</strong> : Fer (anémie), folates, B12, vitamines liposolubles, magnésium, zinc.</li>
<li><strong>Syndrome de renutrition inappropriée (SRI)</strong> : Complication grave lors de la renutrition rapide. Détails au chapitre dénutrition.</li>
</ul>
<h3>Prise en charge pluridisciplinaire</h3>
<p><strong>Équipe</strong> : Psychiatre/psychologue, médecin interniste/pédiatre, diététicien, infirmier, travailleur social.</p>
<p><strong>Approche</strong> : Psychothérapie (CBT-E : thérapie comportementale-cognitive améliorée, psychothérapie interpersonnelle, thérapie motivationnelle), renutrition progressive et prudente (risque SRI), traitement des complications, implication familiale.</p>
<p><strong>Suivi médical</strong> : Électrocardiogramme (surveillance arythmies), bilan électrolytique fréquent, densité osseuse (DXA), évaluation cardiaque, psychologique et nutritionnelle régulière.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222036', '11111111-1111-1111-1111-111111111102', 'Dénutrition', 'Définition, critères, types, dépistage, syndrome de renutrition, stratégies', 1, 35, 3.0, '<h2>Dénutrition</h2>
<p>La dénutrition est un état d''insuffisance d''apport nutritif entraînant une perte de poids, une fonte musculaire et une altération des fonctions biologiques. Elle affecte la cicatrisation, l''immunité, la récupération post-opératoire et la morbi-mortalité. Son dépistage et sa correction sont essentiels en pratique clinique.</p>
<h3>Définition et critères HAS 2019</h3>
<p><strong>Chez l''adulte</strong> : Perte de poids involontaire >5% en 1 mois ou >10% en 6 mois, ou indice de masse corporelle (IMC) <18.5 kg/m² (ou <20 si âge >70 ans).</p>
<p>OU albumine sérique <35 g/L (albuminémie) si perte de poids récente (<2 semaines) ; pré-albumine <20 mg/dL.</p>
<p><strong>Chez l''enfant</strong> : Indice poids-pour-âge <-2 écarts-types ou indice poids-pour-taille <-2 écarts-types (selon normes OMS).</p>
<p><strong>Chez la personne âgée</strong> : Perte de poids involontaire >5% en 1 mois, IMC <21 kg/m² ou albumine <35 g/L.</p>
<h3>Types de dénutrition</h3>
<p><strong>Marasme</strong> : Dénutrition protéino-énergétique par déficit d''apport global d''énergie et de protéines. Caractérisé par perte pondérale importante, fonte musculaire majeure, conservation relative de l''albumine (catabolisme musculaire préférentiel). Skin and bones appearance ("peau et os").</p>
<p><strong>Kwashiorkor</strong> : Dénutrition protéique spécifique (apport énergétique conservé) avec albumine très basse (<2.5 g/dL), oedèmes généralisés, hépatomégalie (stéatose hépatique), dermatose desquamative. Rare dans pays développés.</p>
<p><strong>Marasme-kwashiorkor mixte</strong> : Combinaison des deux types.</p>
<h3>Mécanismes de dénutrition</h3>
<p><strong>Hyper-catabolisme</strong> : Augmentation du catabolisme métabolique (infections sévères, burn, traumatisme, chirurgie) entraînant une dépense énergétique augmentée et une destruction tissulaire accélérée.</p>
<p><strong>Carence d''apport</strong> : Apport nutritif insuffisant (restriction volontaire, TCA, pauvreté, malabsorption digestive).</p>
<p><strong>Combinaison</strong> : La plupart des cas combinent hyper-catabolisme (maladie chronique, cancer) et apport insuffisant (anorexie, dysphagie).</p>
<h3>Dépistage</h3>
<p><strong>Score NRS 2002 (Nutritional Risk Screening)</strong> : Outil rapide utilisé en milieu hospitalier.</p>
<ul>
<li>Perte de poids involontaire >5% en 3 mois : oui/non</li>
<li>IMC <18.5 ou >18.5-20.49 si âge >70 : oui/non</li>
<li>Apport alimentaire réduit la dernière semaine : oui/non</li>
<li>Maladie aiguë sévère : oui/non</li>
<li>Mobilité : normal/réduit/alité</li>
<li>Score ≥3 indique risque dénutrition ; Score <3 réévaluer après 1 semaine.</li>
</ul>
<p><strong>Score MNA (Mini Nutritional Assessment)</strong> : Outil pour personne âgée incluant anthropométrie, facteurs alimentaires, évaluation subjective.</p>
<h3>Syndrome de renutrition inappropriée (SRI)</h3>
<p>Complication grave lors de la renutrition trop rapide ou trop importante d''un patient sévèrement dénutri. Causée par une réalimentation brutale après longue période de carence nutritive.</p>
<p><strong>Mécanismes</strong> : Passage métabolisme catabolique → anabolique induit par réalimentation, Augmentation rapide de l''insuline et du glucose, Entrant cellulaire massif de potassium, phosphore et magnésium intra-cellulaires, entraînant une hypophosphatémie, hypokaliémie et hypomagnésémie sévères.</p>
<p><strong>Complications</strong> :</p>
<ul>
<li>Hypophosphatémie : Décroissance capacité ATP cellulaire, faiblesse musculaire, encéphalopathie, cardiomyopathie, insuffisance respiratoire.</li>
<li>Hypokaliémie : Arythmies cardiaques, faiblesse musculaire, arrêt cardiaque.</li>
<li>Hypomagnésémie : Arythmies, convulsions, tétanie.</li>
</ul>
<p><strong>Prévention</strong> :</p>
<ul>
<li>Renutrition progressive : débuter à 30-50% des besoins, augmenter graduellement sur 5-7 jours.</li>
<li>Réduction de l''insuline/glucose initialement (restriction glucidique transitoire).</li>
<li>Supplémentation électrolytique préventive : phosphore, potassium, magnésium.</li>
<li>Monitoring : électrolytes quotidiens initialement, puis 2-3 fois/semaine.</li>
<li>Correction des déficits avant renutrition (hypokaliémie, hypophosphatémie préexistantes).</li>
</ul>
<h3>Stratégies de renutrition</h3>
<p><strong>Nutrition orale (NO)</strong> : Première approche si tolérance digestive préservée. Aliments enrichis, suppléments nutritionnels oraux (CNO), fractionnement des repas pour augmenter apport sans satiété excessive. Adaptation selon préférences et capacités.</p>
<p><strong>Nutrition entérale (NE)</strong> : Via sonde nasogastrique ou gastrostomie si NO insuffisanté ou impossible (dysphagie, obstruction). Débits initiaux faibles (10-20 mL/h) augmentés progressivement. Moins de SRI que parentérale car maintient perméabilité intestinale (intestin "pompe du système immunitaire").</p>
<p><strong>Nutrition parentérale (NP)</strong> : Via cathéter central si malabsorption sévère, obstruction digestive complète. Coûts élevés, complications thrombose-sepsis plus fréquentes. Utilisation réservée au strict nécessaire.</p>
<h3>Suivi et ré-évaluation</h3>
<p>Poids hebdomadaire initialement, puis 2 fois/semaine ; anthropométrie (tour de taille, tour de bras) et albumine mensuelle. Ajustement apports selon tolérance et réponse clinique.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222037', '11111111-1111-1111-1111-111111111102', 'Grossesse et allaitement — aspects nutritionnels', 'Besoins nutritionnels, prise de poids, complications, allaitement', 1, 36, 2.0, '<h2>Grossesse et allaitement — aspects nutritionnels</h2>
<p>La grossesse et l''allaitement induisent des modifications métaboliques et nutritionnelles majeures. Une nutrition adaptée est cruciale pour la santé maternelle et fœtale, et la qualité du lait maternel.</p>
<h3>Besoins nutritionnels pendant la grossesse</h3>
<p><strong>Énergie</strong> : Augmentation progressive : +0 kcal 1er trimestre, +300 kcal 2e-3e trimestres au-dessus des besoins de base. Total supplémentaire : ~80 000 kcal sur 9 mois (~300 kcal/jour). Adapté selon IMC pré-gestationnel et activité physique.</p>
<p><strong>Protéines</strong> : Augmentation à 70-100 g/jour (vs ~50 g chez femme non-enceinte). Priorité aux protéines de haute valeur biologique (œufs, poisson, viande, produits laitiers).</p>
<p><strong>Acides gras essentiels</strong> : Acide linolénique (oméga-3 ALA : 1.4 g/jour vs 1.1) et acide linoléique (oméga-6 LA : 13 g/jour vs 12). Importante pour neurodéveloppement fœtal. Source : poisson gras, noix, graines, huiles.</p>
<p><strong>Fer</strong> : Augmentation à 27 mg/jour (vs 18 non-enceinte) pour la synthèse de l''hémoglobine supplémentaire et constitution des réserves fœtales. Biodisponibilité augmentée durant la grossesse (adaptation physiologique). Source : viandes rouges (absorption facilitée), légumineuses, céréales enrichies.</p>
<p><strong>Folates</strong> : 600 μg/jour (vs 400 non-enceinte). Crucials pour fermeture du tube neural (prévention spina bifida) et division cellulaire rapide. Supplémentation en acide folique (400 μg/jour) recommandée avant conception et premier trimestre. Source : légumes verts, légumineuses, céréales complètes.</p>
<p><strong>Calcium</strong> : 1000-1200 mg/jour inchangé, mais absorption augmentée (1,25-dihydroxyvitamine D augmentée). Crucial pour minéralisation osseuse fœtale. Source : produits laitiers, légumes verts, poissons à arêtes (sardines).</p>
<p><strong>Iode</strong> : 220-290 μg/jour (vs 150 non-enceinte). Essentiel pour hormones thyroïdiennes fœtales et développement neurologique. Source : sel iodé, poissons, produits laitiers.</p>
<p><strong>Vitamine D</strong> : 600-800 UI/jour. Absorption calcium dépend vitamine D. Vérifier statut 25(OH)D et supplémenter si <30 ng/mL. Source : poissons gras, œufs, exposition solaire.</p>
<p><strong>Autres micronutriments</strong> : Zinc (11-13 mg/jour), cuivre, vitamine A (augmentation modérée), vitamine C (augmentation à 85 mg/jour).</p>
<h3>Prise de poids recommandée</h3>
<p>Dépendant de l''IMC pré-gestationnel :</p>
<ul>
<li><strong>IMC <18.5</strong> (underweight) : 12.5-18 kg</li>
<li><strong>IMC 18.5-24.9</strong> (normal) : 11.5-16 kg</li>
<li><strong>IMC 25-29.9</strong> (surpoids) : 7-11.5 kg</li>
<li><strong>IMC ≥30</strong> (obèse) : 5-9 kg</li>
</ul>
<p>Composition : ~60% graisse maternelle (dépôts énergétiques), ~30% fœtus+placenta+liquide amniotique, ~10% liquide maternel.</p>
<p>Prise excessive : risque prééclampsie, diabète gestationnel, macrosomie fœtale, difficulté post-partum perte de poids. Prise insuffisanté : risque prématurité, petit poids de naissance.</p>
<h3>Diabète gestationnel (GDM)</h3>
<p>Intolérance au glucose développée durant la grossesse (>95% normalisée post-partum), affectant ~2-10% des grossesses. Causes : insulinorésistance augmentée (hormone placenta, progestérone), déplétion pancréatique β.</p>
<p><strong>Dépistage</strong> : Oral glucose tolerance test (OGTT) 75g après 24 heures de régime sans restriction, mesuré à jeun et 2h post-charge (diagnostic : glycémie 2h ≥140 mg/dL).</p>
<p><strong>Conséquences</strong> : Macrosomie fœtale (hypoglycémie néonatale, trauma accouchement), risque pré-éclampsie, polydramnie. Mère : risque progression diabète type 2 post-partum.</p>
<p><strong>Traitement</strong> : Régime hypoglucidique modéré (glucides complexes, fibres), activité physique régulière, perte de poids si surpoids (5-10% réduit significativement risque). Insuline si régime insuffisant.</p>
<h3>Pré-éclampsie</h3>
<p>Hypertension de novo >140/90 mmHg après 20 semaines associée à protéinurie ou autres signes d''atteinte d''organe (thrombocytopénie, hémolysie, insuffisance hépatique, insuffisance rénale, œdème pulmonaire).</p>
<p><strong>Risques</strong> : Placental insufficiency, retard de croissance intra-utérin, décès fœtal, complications maternelles graves.</p>
<p><strong>Prévention et traitement</strong> : Restriction sodée modérée (non extrême), supplémentation calcium (1000-1200 mg/jour) si risque élevé, antihypertenseurs, repos.</p>
<h3>Allaitement maternel</h3>
<p><strong>Composition du lait maternel</strong> : Unique et adapté aux besoins du nourrisson :</p>
<ul>
<li><strong>Colostrum</strong> (jours 1-4) : Riche en immunoglobulines (IgA), protéines, moins de lactose. Prépare digestif du nouveau-né.</li>
<li><strong>Lait de transition</strong> (jours 5-14) : Passage progressif vers lait mature.</li>
<li><strong>Lait mature</strong> (après jour 14) : ~60 kcal/100mL, protéines 1.3 g/100mL (80% lactalbumine, 20% caséine - facile à digérer), lactose 7 g/100mL, lipides 4.2 g/100mL (riche acides gras polyinsaturés oméga-3), minéraux (fer biodisponible, calcium, phosphore), vitamines (A, D, C, B complète).</li>
</ul>
<p><strong>Bénéfices</strong> : Immunité passive (IgA, leucocytes), protection infections (gastro-entérite, otite, pneumonie), prévention allergies, développement optimal intestinal, liaison mère-enfant, contraception partielle (lactational amenorrhea method).</p>
<p><strong>Besoins maternels</strong> : Énergie augmentée de 500 kcal/jour (nécessaires pour production laitière). Protéines 71-79 g/jour. Apports identiques à grossesse pour vitamines/minéraux sauf fer (cycles menstruels aménorrhées). Hydratation augmentée (soif peut augmenter).</p>
<p><strong>Durée recommandée</strong> : Allaitement exclusif 6 mois, poursuite avec diversification jusqu''à 2 ans ou plus.</p>
<h3>Allergies alimentaires du nourrisson</h3>
<p><strong>Allaitement maternel</strong> : Protège par absence d''exposition directe aux allergènes. Mère peut réduire aliments allergènes (cacahuètes, crustacés) si histoire familiale allergie, bien qu''élimination complète non prouvée utile.</p>
<p><strong>Alimentation artificielle</strong> : Utiliser formules adaptées. Hydrolysats de protéines (formules HA) recommandés en risque élevé allergie. Introduction progressive aliments solides après 4-6 mois diminue risque allergie (exposition plutôt qu''éviction).</p>
<p><strong>Aliments allergènes courants</strong> : Lait de vache, œufs, cacahuètes, noix, poisson, crustacés, sésame. Gastrointestinal symptoms (colicy, diarrhée, constipation), cutanées (eczéma) ou respiratoires (dyspnée) peuvent survenir.</p>');

INSERT INTO chapters (id, module_id, title, description, priority, order_index, estimated_hours, content_html) VALUES
('22222222-2222-2222-2222-222222222038', '11111111-1111-1111-1111-111111111102', 'Nutrition de la personne âgée', 'Vieillissement, sarcopénie, ostéoporose, besoins spécifiques, dépistage, enrichissement', 1, 37, 2.0, '<h2>Nutrition de la personne âgée</h2>
<p>Le vieillissement entraîne des modifications physiologiques, métaboliques et sociales complexes impactant l''état nutritionnel. La dénutrition affecte 15-30% des personnes âgées vivant à domicile et jusqu''à 50% en institution. Son dépistage et sa correction sont essentiels pour préserver l''autonomie et la qualité de vie.</p>
<h3>Vieillissement physiologique : modifications métaboliques</h3>
<p><strong>Sarcopénie</strong> : Perte progressive de masse musculaire squelettique et de force liée à l''âge. Débute après 40-50 ans (1-2% perte/an après 50), accélérée après 70 ans. Causes : baisse testostérone/IGF-1, résistance anabolique (muscles moins sensibles aux acides aminés et entraînement), sédentarité, inflammation chronique de bas grade, dysbiose.</p>
<p>Conséquences : Risque de chutes (faiblesse des extenseurs jambes), fractures, perte d''autonomie, mortalité accrue.</p>
<p><strong>Ostéoporose</strong> : Diminution densité minérale osseuse (DMO <-2.5 écarts-types T-score). Chez femme post-ménopausale, déficit œstrogénique accélère résorption osseuse. Hommes aussi affectés après 70 ans.</p>
<p><strong>Troubles sensoriels</strong> : Diminution goût (5 goûts primaires : sucré, salé, acide, amer, umami tous diminués), odorat (major contributor au flaveur). Résulte en anorexie relative (aliments moins appétissants), risque dénutrition.</p>
<p><strong>Troubles gastro-intestinaux</strong> : Vidange gastrique ralentie, diminution production acide chlorhydrique (gastroparalysie, réduction absorption B12, fer), dysmotilité intestinale (constipation), dysbiose (réduction Lactobacillus/Bifidobacterium bénéfiques).</p>
<p><strong>Modifications métaboliques</strong> : Diminution dépense énergétique de repos (DEE) par perte musculaire, baisse thyroïdienne, facteur métabolique diminué. Paradoxe : besoin protéique augmente (résistance anabolique) alors que dépense diminue.</p>
<h3>Besoins nutritionnels spécifiques</h3>
<p><strong>Énergie</strong> : 25-30 kcal/kg/jour (diminué vs adulte 30-35) du fait baisse DEE, sauf si actif. Doit couvrir besoins sans conduire à obésité (complications articulaires, métaboliques).</p>
<p><strong>Protéines augmentées</strong> : 1.0-1.2 g/kg/jour (vs 0.8 g/kg adulte) pour combattre sarcopénie. Apport total >100 g/jour si poids >80 kg, distribution entre repas (minimum 25-30 g par repas) pour optimiser synthèse protéique post-prandiale. Source : œufs, laitages, viandes, légumineuses.</p>
<p><strong>Vitamine D</strong> : 800-1000 UI/jour (augmenté vs 400-600 adulte). Absorption diminuée, synthèse cutanée réduite (exposition solaire moins importante). Cible 25(OH)D ≥30 ng/mL. Supplémentation systématique souvent recommandée.</p>
<p><strong>Calcium</strong> : 1000-1200 mg/jour inchangé mais absorption diminuée. Sources : produits laitiers (absorption optimale), légumes verts, légumineuses.</p>
<p><strong>Vitamine B12</strong> : 2.4 μg/jour. 10-30% déficits (malabsorption acide-dépendante, atrophie gastrique, interaction médicaments). Supplémentation parentérale recommandée si achlorhydrie.</p>
<p><strong>Folates</strong> : 400 μg/jour pour prévenir hyperhomocystéinémie (risque cardiovasculaire). Source : légumes verts, légumineuses, céréales enrichies.</p>
<p><strong>Zinc</strong> : 11 mg/jour (hommes), 8 mg/jour (femmes), souvent déficient. Immunité, plaie cicatrisation, goût.</p>
<p><strong>Magnésium</strong> : 320 mg/jour (femmes), 420 mg/jour (hommes), souvent insuffisant. Fonction neuromusculaire, osseuse.</p>
<p><strong>Hydratation</strong> : Soif diminuée (altération thermo-régulation hypothalamique), déshydratation risque confusional, chutes, insuffisance rénale aiguë. Encourager apport minimum 1.5-2 L/jour.</p>
<h3>Dénutrition du sujet âgé : prévalence et dépistage</h3>
<p><strong>Prévalence</strong> : 5-10% à domicile, 25-50% en institution, jusqu''à 70% en soins palliatifs. Prédicteurs : vivre seul, dépression, polypharmacologie, multiples comorbidités.</p>
<p><strong>Dépistage MNA (Mini Nutritional Assessment)</strong> : Outil validé incluant :</p>
<ul>
<li>Perte de poids récente</li>
<li>Mobilité</li>
<li>Stress psychologique/maladie aiguë</li>
<li>Capacités mentales</li>
<li>Troubles digestifs</li>
<li>Consommation médicaments</li>
<li>Anthropométrie (IMC, tour de bras, tour de jambe, hauteur genoux)</li>
<li>Évaluation nutritionnelle subjective</li>
</ul>
<p>Score : Normal (≥24), À risque (17-23.5), Dénutri (<17).</p>
<h3>Dysphagie</h3>
<p>Trouble fréquent après AVC, Parkinson, Alzheimer. Risque : fausse route (aspiration alimentaire), pneumonie d''aspiration, dénutrition (apport diminué), risque d''étouffement.</p>
<p><strong>Dépistage</strong> : Observation déglutition (notamment liquides), test d''eau à température variable (froid plus stimulant), référence orthophoniste si doute.</p>
<h3>Enrichissement alimentaire</h3>
<p>Objectif : Augmenter apport énergétique/protéique sans augmenter volume alimentaire (rassasiement précoce, peu d''espace gastrique).</p>
<p><strong>Aliments enrichis</strong> :</p>
<ul>
<li>Crème fraîche, beurre, huile ajoutés aux plats (+45 kcal/cuillère à soupe).</li>
<li>Lait en poudre dans lait normal (+25 kcal/cuillère à soupe).</li>
<li>Fromage râpé, jaune d''œuf dans plats.</li>
<li>Yaourt grecque, fromage blanc riche en protéines.</li>
<li>Fruits secs, noix (apéritifs, desserts).</li>
</ul>
<p><strong>Suppléments nutritionnels oraux (CNO)</strong> : Boissons ou aliments complets caloriquement denses (200-400 kcal/verre, 5-15 g protéines). Exemples : Fortimel, Fresubin, Ensure. Utilisation en compléments si apport oral insuffisant. Peu appétissants ; adaptation flaveur, température importante.</p>
<p><strong>Texture modifiée</strong> : Si dysphagie, adapter consistance (hachée finement, mixée, épaississants selon sévérité).</p>
<h3>Prévention chutes et fractures</h3>
<p>Multifactorielle : force (protéines, activité), équilibre (activité), vision (vitamine A, D), minéralisation osseuse (calcium, vitamine D, protéines), prévention constipation/diarrhée (hydratation, fibres), vision adéquate, environnement sûr.</p>
<p><strong>Supplémentation calcium+vitamine D</strong> : Réduit fractures de ~20% si apport initial insuffisant.</p>
<p><strong>Protéines+résistance training</strong> : Maintenance/regain masse musculaire, force, fonction.</p>');
-- SEED PART 3: Module E2 - Questions, Exam Exercise, and Weekly Objectives
-- Generated: 2026-03-13

-- ============================================================================
-- PART 1: 75 QUESTIONS (15 per chapter × 5 chapters)
-- ============================================================================

-- CHAPTER 01: GLUCIDES (15 questions: 10 MCQ + 3 true/false + 2 open_short)
-- Difficulty: 5×1 (facile), 7×2 (moyen), 3×3 (difficile)

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000001', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel monosaccharide est le principal composant de l''amidon ?',
'[{"id":"a","text":"Glucose","is_correct":true},{"id":"b","text":"Fructose","is_correct":false},{"id":"c","text":"Galactose","is_correct":false},{"id":"d","text":"Ribose","is_correct":false}]',
'a',
'L''amidon est un polysaccharide compose de chaînes de glucose liees par des liaisons alpha-1,4 et alpha-1,6.',
1, 1, '{"glucides","monosaccharides"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000002', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel type de liaison osidique se trouve dans la lactose ?',
'[{"id":"a","text":"Alpha-1,4","is_correct":false},{"id":"b","text":"Beta-1,4","is_correct":true},{"id":"c","text":"Alpha-1,6","is_correct":false},{"id":"d","text":"Beta-1,6","is_correct":false}]',
'b',
'Le lactose est compose de glucose et galactose lies par une liaison beta-1,4 glycosidique.',
1, 1, '{"glucides","disaccharides"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000003', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quelle est la principale difference structurale entre l''amidon et le glycogene ?',
'[{"id":"a","text":"Amidon a plus de liaisons alpha-1,6","is_correct":false},{"id":"b","text":"Glycogene a plus de liaisons alpha-1,6","is_correct":true},{"id":"c","text":"Amidon contient du fructose","is_correct":false},{"id":"d","text":"Glycogene a une structure lineaire","is_correct":false}]',
'b',
'Le glycogene a plus de points de ramification (liaisons alpha-1,6) que l''amidon, ce qui permet une hydrolyse plus rapide.',
1, 1, '{"glucides","polysaccharides"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000004', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel facteur influe principalement sur l''index glycemique d''un glucide ?',
'[{"id":"a","text":"La couleur de l''aliment","is_correct":false},{"id":"b","text":"La structure chimique et la digestibilite","is_correct":true},{"id":"c","text":"Le prix de l''aliment","is_correct":false},{"id":"d","text":"La date de production","is_correct":false}]',
'b',
'L''index glycemique depend de la vitesse d''absorption du glucose, influencee par la structure du glucide et sa disponibilite.",
1, 1, '{"glucides","index_glycemique"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000005', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'mcq',
'Les fibres solubles ont quel effet principal sur la glycemie ?',
'[{"id":"a","text":"Augmentent l''absorption du glucose","is_correct":false},{"id":"b","text":"Ralentissent l''absorption du glucose","is_correct":true},{"id":"c","text":"N''ont aucun effet","is_correct":false},{"id":"d","text":"Accelerent la digestion","is_correct":false}]',
'b',
'Les fibres solubles forment un gel visqueux dans le tractus digestif, ralentissant l''absorption du glucose et reduisant l''index glycemique.',
2, 1, '{"glucides","fibres"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000006', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est le role principal du glucose dans la respiration cellulaire ?',
'[{"id":"a","text":"Fournir de l''énergie par oxydation","is_correct":true},{"id":"b","text":"Synthetiser des lipides","is_correct":false},{"id":"c","text":"Stocker l''azote","is_correct":false},{"id":"d","text":"Proteger les cellules","is_correct":false}]',
'a',
'Le glucose est oxyde au cours de la glycolyse et du cycle de Krebs pour generer de l''ATP, la principal source d''énergie cellulaire.',
2, 1, '{"glucides","métabolisme"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000007', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'mcq',
'L''intolérance au lactose resulte d''une carence en quel enzyme ?',
'[{"id":"a","text":"Amylase","is_correct":false},{"id":"b","text":"Lactase","is_correct":true},{"id":"c","text":"Sucrase","is_correct":false},{"id":"d","text":"Lipase","is_correct":false}]',
'b',
'La lactase digere le lactose en glucose et galactose. Son absence provoque une intolérance au lactose.',
2, 1, '{"glucides","enzymes_digestives"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000008', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quelle caracteristique des fibres insolubles les rend particulierement utiles pour la santé digestive ?',
'[{"id":"a","text":"Elles augmentent la viscosité du chyme","is_correct":false},{"id":"b","text":"Elles absorbent l''eau et augmentent le volume des selles","is_correct":true},{"id":"c","text":"Elles sont absorbees par l''intestin grele","is_correct":false},{"id":"d","text":"Elles fermentent dans le colon","is_correct":false}]',
'b',
'Les fibres insolubles (cellulose, hémicelluloses) absorbent l''eau et augmentent le volume des selles, facilitant le transit intestinal.',
2, 1, '{"glucides","fibres"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000009', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel mecanisme physiologique explique que l''amidon refroidi (amidon resistant) a un index glycemique inférieur ?',
'[{"id":"a","text":"La retrogradasion rend l''amidon moins accessible aux enzymes","is_correct":true},{"id":"b","text":"Le refroidissement desactive les enzymes digestives","is_correct":false},{"id":"c","text":"L''amidon resistant est non-digestible","is_correct":false},{"id":"d","text":"Le glucose se transforme en fructose","is_correct":false}]',
'b',
'Lors du refroidissement, l''amidon subit une rétrogradation, creant une structure cristalline moins digestible et donc un IG plus bas.',
3, 1, '{"glucides","amidon_resistant"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000010', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'mcq',
'Dans le contexte de la santé métabolique, comment les prebiotiques (FOS, inuline) agissent-ils differemment des autres fibres ?',
'[{"id":"a","text":"Ils reduisent l''absorption calorique totale","is_correct":false},{"id":"b","text":"Ils servent de substrat de fermentation pour les bacteries benéfiques du microbiote","is_correct":true},{"id":"c","text":"Ils inhibent la gluconeogenese hépatique","is_correct":false},{"id":"d","text":"Ils augmentent la sécrétion d''insuline","is_correct":false}]',
'b',
'Les prebiotiques sont fermentes par les bacteries benefiques du colon, produisant des acides gras a chaîne courte benefiques pour la santé métabolique.',
3, 1, '{"glucides","prebiotiques"}');

-- CHAPTER 01: TRUE/FALSE (3 questions)

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000011', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'true_false',
'Le saccharose est un disaccharide compose de glucose et fructose.',
'[{"id":"true","text":"Vrai","is_correct":true},{"id":"false","text":"Faux","is_correct":false}]',
'true',
'Le saccharose est effectivement compose d''une molecule de glucose et d''une molecule de fructose liees par une liaison 1,2 glycosidique.',
1, 1, '{"glucides","disaccharides"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000012', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'true_false',
'L''amylose et l''amylopectine sont les deux composants majeurs de l''amidon, avec des rapports variables selon la source vegetale.',
'[{"id":"true","text":"Vrai","is_correct":true},{"id":"false","text":"Faux","is_correct":false}]',
'true',
'L''amidon est constitue d''amylose (chaîne lineaire ~20-25%) et d''amylopectine (chaîne branchiee ~75-80%) dans des proportions variables selon la culture.',
2, 1, '{"glucides","amidon"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000013', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'true_false',
'Les monosaccharides sont toujours doux au gout et facilement cristallisables.',
'[{"id":"true","text":"Vrai","is_correct":false},{"id":"false","text":"Faux","is_correct":true}]',
'false',
'Bien que la plupart des monosaccharides soient doux, certains comme le ribose ne cristallisent pas facilement, et le deoxyribose a un gout amer.',
2, 1, '{"glucides","monosaccharides"}');

-- CHAPTER 01: OPEN SHORT (2 questions)

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000014', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'open_short',
'Expliquez la difference entre la glycemie et l''index glycemique.',
NULL,
'La glycemie est le taux de glucose dans le sang a un moment donne, tandis que l''IG mesure la vitesse et l''intensite de l''augmentation de la glycemie apres l''ingestion d''un aliment.',
'L''IG classe les aliments selon leur effet sur la glycemie, independamment de la quantité de glucides. Un aliment peut avoir une glycemie élevée mais un IG faible s''il est peu digestible.',
3, 1, '{"glucides","métabolisme"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333301000015', '22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111102', 'open_short',
'Decrivez le mecanisme par lequel les fibres solubles modulent l''absorption intestinale du glucose.',
NULL,
'Les fibres solubles forment un gel visqueux qui enrobe les particules alimentaires, ralentissant la diffusion du glucose vers les cellules intestinales et limitant l''absorption rapide.',
'Ce ralentissement de l''absorption previent les pics de glucose sanguin et reduit l''index glycemique global du repas, beneficiant aux diabétiques et favorisant la satiete.',
3, 1, '{"glucides","fibres"}');

-- ============================================================================
-- CHAPTER 02: LIPIDES (15 questions: 10 MCQ + 3 true/false + 2 open_short)
-- ============================================================================

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000001', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quelle caracteristique chimique distingue un acide gras sature d''un acide gras insature ?',
'[{"id":"a","text":"Le nombre d''atomes d''oxygene","is_correct":false},{"id":"b","text":"La presence de doubles liaisons carbone-carbone","is_correct":true},{"id":"c","text":"Le nombre d''atomes d''azote","is_correct":false},{"id":"d","text":"La presence de groupes sulfure","is_correct":false}]',
'b',
'Les acides gras insatures contiennent une ou plusieurs doubles liaisons carbone-carbone (C=C) dans leur chaîne, contrairement aux satures qui ne contiennent que des liaisons simples.',
1, 1, '{"lipides","acides_gras"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000002', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est le principal composant structural des membranes cellulaires ?',
'[{"id":"a","text":"Triglycerides","is_correct":false},{"id":"b","text":"Phospholipides","is_correct":true},{"id":"c","text":"Sterols","is_correct":false},{"id":"d","text":"Acides gras libres","is_correct":false}]',
'b',
'Les phospholipides forment la bicouche lipidique de la membrane cellulaire grace a leur structure amphipatique (partie hydrophile et hydrophobe).',
1, 1, '{"lipides","membranes"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000003', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel acide gras est considere comme essentiel pour l''organisme ?',
'[{"id":"a","text":"Acide palmitoïque","is_correct":false},{"id":"b","text":"Acide sterique","is_correct":false},{"id":"c","text":"Acide linoleïque (omega-6)","is_correct":true},{"id":"d","text":"Acide oleique","is_correct":false}]',
'c',
'L''acide linoleïque (omega-6) et l''acide alpha-linoleïque (omega-3) sont essentiels car l''organisme ne peut les synthetiser et doit les obtenir par l''alimentation.',
1, 1, '{"lipides","acides_gras_essentiels"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000004', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est le role principal du cholesterol dans le corps ?',
'[{"id":"a","text":"Fournir de l''énergie rapidement","is_correct":false},{"id":"b","text":"Synthese de membranes et hormones steroidales","is_correct":true},{"id":"c","text":"Digerer les glucides","is_correct":false},{"id":"d","text":"Transporter l''oxygene","is_correct":false}]',
'b',
'Le cholesterol est un precurseur essentiel pour la synthese des hormones steroidales (cortisol, testosterone), de la vitamine D et de la bile.',
1, 1, '{"lipides","cholesterol"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000005', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'mcq',
'Pourquoi les acides gras satures ont-ils un point de fusion plus élevé que les acides gras insatures ?',
'[{"id":"a","text":"Ils contiennent plus d''hydrogene","is_correct":false},{"id":"b","text":"Leur structure rectiligne permet un meilleur empilage et des interactions van der Waals plus fortes","is_correct":true},{"id":"c","text":"Ils sont plus lourds","is_correct":false},{"id":"d","text":"Ils repoussent mieux l''eau","is_correct":false}]',
'b',
'Les acides gras satures ont une structure rectiligne qui permet un empilage compact et dense, necessitant plus d''énergie (chaleur) pour fondre.',
2, 1, '{"lipides","acides_gras"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000006', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel type de lipoproteine transporte principalement le cholesterol des tissues vers le foie ?',
'[{"id":"a","text":"LDL","is_correct":false},{"id":"b","text":"HDL","is_correct":true},{"id":"c","text":"VLDL","is_correct":false},{"id":"d","text":"Chylomicrons","is_correct":false}]',
'b',
'Les HDL (High Density Lipoprotein) collectent l''exces de cholesterol dans les tissues et le transportent vers le foie pour elimination, d''où leur nom « bon cholesterol ».',
2, 1, '{"lipides","lipoprotéines"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000007', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel rapport omega-6/omega-3 est généralement considere comme optimal pour la santé ?',
'[{"id":"a","text":"1:1","is_correct":false},{"id":"b","text":"4:1 a 10:1","is_correct":true},{"id":"c","text":"20:1","is_correct":false},{"id":"d","text":"30:1","is_correct":false}]',
'b',
'Un rapport omega-6/omega-3 entre 4:1 et 10:1 est considere optimal. Les régimes occidentaux atteignent souvent 15-20:1, favorisant l''inflammation.',
2, 1, '{"lipides","acides_gras_polyinsatures"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000008', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est le principal role des triglycerides dans le corps ?',
'[{"id":"a","text":"Formation des membranes","is_correct":false},{"id":"b","text":"Synthetisation d''hormones","is_correct":false},{"id":"c","text":"Stockage et fourniture d''énergie","is_correct":true},{"id":"d","text":"Transport de glucose","is_correct":false}]',
'c',
'Les triglycerides, composes de glycerol et trois acides gras, sont la forme majeure de stockage d''énergie dans le tissu adipeux.',
2, 1, '{"lipides","triglycerides"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000009', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'mcq',
'Comment la glycation du LDL affecte-t-elle le risque cardiovasculaire chez les diabétiques ?',
'[{"id":"a","text":"Augmente la reconnaissance par les recepteurs LDL normaux","is_correct":false},{"id":"b","text":"Reduit l''atherogenicite du LDL","is_correct":false},{"id":"c","text":"Favorise l''accumulation du LDL dans les parois arteriales et l''inflammation","is_correct":true},{"id":"d","text":"Ameliore le transport du cholesterol","is_correct":false}]',
'c',
'Le LDL glycosyle est moins reconnu par les recepteurs LDL et accumule dans les parois arteriales, accelerant l''atherosclerose chez les diabétiques mal controles.',
3, 1, '{"lipides","glycation"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000010', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel mecanisme explique pourquoi l''acide eicosapentaenoïque (EPA) et l''acide docosahexaenoïque (DHA) ont des proprietes anti-inflammatoires ?',
'[{"id":"a","text":"Ils inhibent la lipase pancrearique","is_correct":false},{"id":"b","text":"Ils sont precurseurs d''eicosanoïdes a action anti-inflammatoire et modulent les cytokines","is_correct":true},{"id":"c","text":"Ils eliminent les acides gras satures","is_correct":false},{"id":"d","text":"Ils reduisent la synthese de cholesterol","is_correct":false}]',
'b',
'L''EPA et le DHA produisent des eicosanoïdes (prostaglandines, leucotrienes) a proprietes anti-inflammatoires, contrastant avec les derives de l''acide arachidique.',
3, 1, '{"lipides","omega3"}');

-- CHAPTER 02: TRUE/FALSE (3 questions)

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000011', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'true_false',
'Les acides gras trans sont naturellement presents en grandes quantités dans les aliments et ne presentent aucun risque pour la santé.',
'[{"id":"true","text":"Vrai","is_correct":false},{"id":"false","text":"Faux","is_correct":true}]',
'false',
'Les acides gras trans sont principalement des produits de l''hydrogenation industrielle et augmentent le risque de maladies cardiovasculaires bien au-dela des acides gras satures.',
1, 1, '{"lipides","acides_gras_trans"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000012', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'true_false',
'Le cholesterol LDL est completement synthetise par le foie et ne peut pas provenir de sources alimentaires.',
'[{"id":"true","text":"Vrai","is_correct":false},{"id":"false","text":"Faux","is_correct":true}]',
'false',
'Bien que le foie synthetise le cholesterol, environ 25 a 30% du cholesterol sanguin provient de sources alimentaires, particulierement des aliments riches en graisses saturees.',
2, 1, '{"lipides","cholesterol"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000013', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'true_false',
'Les phospholipides contiennent toujours un groupe phosphate et deux molecules d''acides gras liees au glycerol.',
'[{"id":"true","text":"Vrai","is_correct":true},{"id":"false","text":"Faux","is_correct":false}]',
'true',
'Par definition, les phospholipides contiennent un groupe phosphate et deux acides gras (ou derives lipidiques) lises au glycerol via des liaisons ester.',
2, 1, '{"lipides","phospholipides"}');

-- CHAPTER 02: OPEN SHORT (2 questions)

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000014', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'open_short',
'Expliquez comment la structure amphipathique des phospholipides leur permet de former une membrane cellulaire.',
NULL,
'Les phospholipides ont une tete hydrophile (aimant l''eau) et une queue hydrophobe (craignant l''eau). En environnement aqueux, ils s''organisent spontanement en bicouche avec les tetes tournees vers l''eau et les queues vers l''interieur.',
'Cette configuration minimise l''énergie libre du système et cree une barriere semi-perméable essentielle pour isoler les cellules et regler le transport des substances.',
3, 1, '{"lipides","membranes"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333302000015', '22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111102', 'open_short',
'Decrivez les mecanismes par lesquels un exces d''acides gras omega-6 peut augmenter l''inflammation systemique.',
NULL,
'L''acide arachidique (omega-6) est un precurseur d''eicosanoïdes pro-inflammatoires (prostaglandines E2, leucotrienes 4 et 5) qui augmentent la production de cytokines inflammatoires (IL-6, TNF-alpha).',
'Un ratio omega-6/omega-3 élevé deséquilibre la balance entre mediateurs pro et anti-inflammatoires, favorisant une inflammation chronique impliquee dans les maladies métaboliques et cardiovasculaires.',
3, 1, '{"lipides","inflammation"}');

-- ============================================================================
-- CHAPTER 03: PROTIDES (15 questions: 10 MCQ + 3 true/false + 2 open_short)
-- ============================================================================

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000001', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel type de liaison unit les acides amines dans une proteine ?',
'[{"id":"a","text":"Liaison ester","is_correct":false},{"id":"b","text":"Liaison peptidique","is_correct":true},{"id":"c","text":"Liaison hydrogene","is_correct":false},{"id":"d","text":"Liaison glycosidique","is_correct":false}]',
'b',
'La liaison peptidique relie le groupe carboxyle d''un acide amine au groupe amine d''un autre, formant une liaison covalente C-N.',
1, 1, '{"protides","acides_amines"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000002', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'mcq',
'Combien d''acides amines sont consideres comme essentiels chez l''adulte ?',
'[{"id":"a","text":"5","is_correct":false},{"id":"b","text":"9","is_correct":true},{"id":"c","text":"15","is_correct":false},{"id":"d","text":"20","is_correct":false}]',
'b',
'9 acides amines sont essentiels chez l''adulte : leucine, isoleucine, valine, lysine, methionine, phenylalanine, thréonine, tryptophane, et histidine.',
1, 1, '{"protides","acides_amines_essentiels"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000003', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est le role principal de l''hemoglobine ?',
'[{"id":"a","text":"Transporter l''oxygene dans le sang","is_correct":true},{"id":"b","text":"Digerer les glucides","is_correct":false},{"id":"c","text":"Produire de l''ATP","is_correct":false},{"id":"d","text":"Lutter contre les infections","is_correct":false}]',
'a',
'L''hemoglobine est une proteïne quaternaire composee de 4 sous-unites qui fixent cooperativement le dioxyde de carbone et l''oxygene, assurant le transport respiratoire.',
1, 1, '{"protides","protéines"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000004', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quelle structure proteïque est responsable de la specificite enzymatique ?',
'[{"id":"a","text":"Structure primaire","is_correct":false},{"id":"b","text":"Structure secondaire","is_correct":false},{"id":"c","text":"Structure tertiaire et site actif","is_correct":true},{"id":"d","text":"Structure quaternaire","is_correct":false}]',
'c',
'Le site actif d''une enzyme, forme par le repliement tridimensionnel de la proteïne (structure tertiaire), determine sa specificite pour le substrat.',
1, 1, '{"protides","enzymes"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000005', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel acide amine soufre est essentiel pour la structure des cheveux et de la peau ?',
'[{"id":"a","text":"Cysteine","is_correct":true},{"id":"b","text":"Tyrosine","is_correct":false},{"id":"c","text":"Serine","is_correct":false},{"id":"d","text":"Glycine","is_correct":false}]',
'a',
'La cysteine contient un groupe thiol (-SH) qui forme des liaisons disulfure cruciales pour la structure et l''elasticite des matieres keratinees.',
1, 1, '{"protides","acides_amines"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000006', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'mcq',
'Qu''est-ce que la denaturation proteïque et quels facteurs peuvent la causer ?',
'[{"id":"a","text":"La destruction des liaisons peptidiques","is_correct":false},{"id":"b","text":"Le depliement irreversible de la structure tridimensionnelle par chaleur, pH ou solvant","is_correct":true},{"id":"c","text":"La synthese de nouvelles proteïnes","is_correct":false},{"id":"d","text":"La fusion de deux proteïnes","is_correct":false}]',
'b',
'La denaturation brise les interactions (liaisons hydrogene, liaisons disulfure, interactions hydrophobes) maintenant la structure 3D, sans rompre les liaisons peptidiques.',
2, 1, '{"protides","denaturation"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000007', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est le score PDCAAS et comment l''utilise-t-on en nutrition ?',
'[{"id":"a","text":"Mesure la concentration proteïque totale","is_correct":false},{"id":"b","text":"Evalue la qualité proteïque en fonction de la digestibilite et de l''équilibre en AA essentiels","is_correct":true},{"id":"c","text":"Mesure seulement le contenu en acides amines branches","is_correct":false},{"id":"d","text":"Donne le poids moleculaire des proteïnes","is_correct":false}]',
'b',
'Le PDCAAS (Protein Digestibility Corrected Amino Acid Score) evalue la qualité proteïque sur une echelle de 0 a 1 en combinant digestibilite et contenu en AA essentiels.',
2, 1, '{"protides","qualité_proteïque"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000008', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est l''effet principal de la coagulation proteïque au-dela de la denaturation ?',
'[{"id":"a","text":"Degradation en acides amines","is_correct":false},{"id":"b","text":"Formation d''un gel par liaisons croisees entre proteïnes denaturees","is_correct":true},{"id":"c","text":"Synthetisation de nouvelles chaînes","is_correct":false},{"id":"d","text":"Oxydation complete du carbone","is_correct":false}]',
'b',
'La coagulation suit la denaturation quand les proteïnes depliees forment des liaisons croisees covalentes ou hydrophobes, creant une structure gelifiee (exemple : blanc d''oeuf cuit).',
2, 1, '{"protides","denaturation"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000009', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'mcq',
'Comment la mutation d''une seule base dans le codon d''une proteïque peut-elle avoir differentes consequences (synonyme, faux-sens, non-sens) ?',
'[{"id":"a","text":"Le degre d''appariement avec l''ARNm change","is_correct":false},{"id":"b","text":"Selon la position du codon et la degenerescence du code génétique","is_correct":true},{"id":"c","text":"La mutation affecte toujours l''acide amine ajoute","is_correct":false},{"id":"d","text":"La ribose du nucleotide change","is_correct":false}]',
'b',
'La degenerescence du code génétique signifie que plusieurs codons codent pour le meme AA. Une mutation synonyme peut donc ne pas changer l''AA, tandis qu''un faux-sens change l''AA et non-sens cree un stop.',
3, 1, '{"protides","code_génétique"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000010', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'mcq',
'Expliquez le mecanisme de l''effet allosterique dans l''hemoglobine et son implication pour le transport d''oxygene cooperatif.',
'[{"id":"a","text":"La fixation d''O2 a une sous-unite n''affecte pas les autres","is_correct":false},{"id":"b","text":"La fixation d''O2 a une sous-unite augmente l''affinite des autres sous-unites pour l''O2","is_correct":true},{"id":"c","text":"L''hemoglobine a besoin de CO2 pour fixer l''oxygene","is_correct":false},{"id":"d","text":"La cooperativite diminue l''efficacite du transport","is_correct":false}]',
'b',
'L''hemoglobine exhibe une cooperativite positive : la fixation d''O2 a une sous-unite deforme la structure quaternaire, facilitant la fixation sur les autres sous-unites.',
3, 1, '{"protides","hemoglobine"}');

-- CHAPTER 03: TRUE/FALSE (3 questions)

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000011', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'true_false',
'Tous les acides amines sauf deux possedent un groupe amine et un groupe carboxyle attaches au meme atome de carbone.',
'[{"id":"true","text":"Vrai","is_correct":false},{"id":"false","text":"Faux","is_correct":true}]',
'false',
'Tous les 20 acides amines standard possedent exactement un groupe amine (-NH2) et un groupe carboxyle (-COOH) lies au carbone alpha (C-alpha).',
1, 1, '{"protides","acides_amines"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000012', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'true_false',
'La complementarite proteïque signifie que la consommation de legumineuses avec des cereales compense l''absence d''acides amines essentiels dans chaque aliment seul.',
'[{"id":"true","text":"Vrai","is_correct":true},{"id":"false","text":"Faux","is_correct":false}]',
'true',
'Les legumineuses manquent de methionine mais contiennent de la lysine, tandis que les cereales ont l''inverse. Leur combinaison offre tous les AA essentiels.',
2, 1, '{"protides","complementarite"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000013', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'true_false',
'L''effet thermique de la proteïne (TEF) est plus élevé que celui des glucides et lipides en raison du cout énergétique de la synthese proteïque.',
'[{"id":"true","text":"Vrai","is_correct":true},{"id":"false","text":"Faux","is_correct":false}]',
'true',
'Le TEF de la proteïne est environ 20-30%, comparé a 5-10% pour les glucides et 0-3% pour les lipides, en raison de la digestion et de la synthese proteïque energivores.',
2, 1, '{"protides","métabolisme"}');

-- CHAPTER 03: OPEN SHORT (2 questions)

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000014', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'open_short',
'Decrivez comment la structure quaternaire de l''hemoglobine permet une adaptation physiologique a l''altitude.',
NULL,
'En altitude, la pression partielle d''O2 est basse. L''hemoglobine avec sa structure quaternaire et cooperativite positive peut augmenter son affinite pour l''O2, optimisant son capture meme a basse pO2.',
'Cette adaptation se combine a d''autres mecanismes (augmentation d''erythropoïetine, polycytemie) pour augmenter la capacite transporteuse d''oxygene.',
3, 1, '{"protides","hemoglobine"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333303000015', '22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111102', 'open_short',
'Expliquez comment une mutation faux-sens dans le gene de la globine peut causer une sickle cell (drepanocytose).',
NULL,
'La mutation remplace une acide gluthami (AA polaire) par une valine (AA apolaire) en position 6 de la chaîne beta-globine. Cette valine apolaire provoque une polymerisation du HbS en environnement hypoxique.',
'Les molecules HbS polymerisees deforment les globules rouges en faucille, causant une hemolise et une vaso-occlusion responsable des crises drepanocytaires.',
3, 1, '{"protides","mutations"}');

-- ============================================================================
-- CHAPTER 04: ACIDES NUCLEIQUES (15 questions: 10 MCQ + 3 true/false + 2 open_short)
-- ============================================================================

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000001', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quelle est la principale difference structurale entre l''ADN et l''ARN ?',
'[{"id":"a","text":"Le nombre de nucleotides","is_correct":false},{"id":"b","text":"Le sucre (deoxyribose vs ribose) et la thymine vs uracile","is_correct":true},{"id":"c","text":"La charge electrique","is_correct":false},{"id":"d","text":"La presence de phosphate","is_correct":false}]',
'b',
'L''ADN contient du deoxyribose et thymine en double brin, tandis que l''ARN contient du ribose et uracile, généralement en simple brin.',
1, 1, '{"acides_nucleiques","ADN_ARN"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000002', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est le role principal de l''ARN messager (ARNm) ?',
'[{"id":"a","text":"Catalyser les reactions métaboliques","is_correct":false},{"id":"b","text":"Transporter les acides amines lors de la traduction","is_correct":false},{"id":"c","text":"Transporter l''information génétique du noyau vers les ribosomes","is_correct":true},{"id":"d","text":"Synthétiser les proteïnes directement","is_correct":false}]',
'c',
'L''ARNm est le transcrit de l''ADN qui vehicule l''information codant pour une proteine du noyau vers le ribosome dans le cytoplasme.',
1, 1, '{"acides_nucleiques","ARN"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000003', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel principe d''appariement des bases explique la complementarite entre les deux brins d''ADN ?',
'[{"id":"a","text":"Adenine avec adenine, guanine avec guanine","is_correct":false},{"id":"b","text":"Adenine avec thymine et guanine avec cytosine","is_correct":true},{"id":"c","text":"Adenine avec cytosine et guanine avec thymine","is_correct":false},{"id":"d","text":"Tous les nucleotides s''apparient aleatoirement","is_correct":false}]',
'b',
'La regle de Chargaff etablit que A=T et G=C dans l''ADN double brin, expliquant la complementarite des bases et permettant la replication fidele.',
1, 1, '{"acides_nucleiques","appariement_bases"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000004', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel enzyme est responsable de la replication de l''ADN ?',
'[{"id":"a","text":"ARN polymerase","is_correct":false},{"id":"b","text":"ADN polymerase","is_correct":true},{"id":"c","text":"Reverse transcriptase","is_correct":false},{"id":"d","text":"Protease","is_correct":false}]',
'b',
'L''ADN polymerase catalyse l''ajout de nucleotides au brin croissant, guidee par l''appariement correct des bases avec le brin matrice.',
1, 1, '{"acides_nucleiques","replication"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000005', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel processus convertit l''information génétique d''ADN en ARN messager ?',
'[{"id":"a","text":"La traduction","is_correct":false},{"id":"b","text":"La transcription","is_correct":true},{"id":"c","text":"La replication","is_correct":false},{"id":"d","text":"La mutation","is_correct":false}]',
'b',
'La transcription utilise l''ARN polymerase pour synthetiser un ARN complémentaire du brin matrice d''ADN, transferant l''information génétique.',
1, 1, '{"acides_nucleiques","transcription"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000006', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'mcq',
'Combien de nucleotides compose un codon et combien de codons codent pour les 20 acides amines canoniques ?',
'[{"id":"a","text":"2 nucleotides, 20 codons","is_correct":false},{"id":"b","text":"3 nucleotides, 20 codons","is_correct":false},{"id":"c","text":"3 nucleotides, 61 codons","is_correct":true},{"id":"d","text":"4 nucleotides, 64 codons","is_correct":false}]',
'c',
'Un codon contient 3 nucleotides. 61 des 64 codons codent pour les 20 acides amines (degenerescence), 3 sont des signaux stop.',
2, 1, '{"acides_nucleiques","code_génétique"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000007', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est le role de l''ARN de transfert (ARNt) lors de la traduction ?',
'[{"id":"a","text":"Transporter l''information génétique du noyau","is_correct":false},{"id":"b","text":"Apporter l''acide amine specifique au ribosome selon le codon de l''ARNm","is_correct":true},{"id":"c","text":"Catalyser la formation de liaisons peptidiques","is_correct":false},{"id":"d","text":"Terminer la synthese proteïque","is_correct":false}]',
'b',
'L''ARNt se lie a un acide amine specifique et contient un anticodon qui s''apparie avec le codon de l''ARNm, assurant l''ajout correct de l''acide amine.',
2, 1, '{"acides_nucleiques","traduction"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000008', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel type de mutation pourrait avoir les consequences les plus graves pour la fonction proteïque ?',
'[{"id":"a","text":"Mutation synonyme","is_correct":false},{"id":"b","text":"Mutation faux-sens changeant un acide amine non-essentiel","is_correct":false},{"id":"c","text":"Mutation non-sens creant un codon stop prématuré","is_correct":true},{"id":"d","text":"Mutation faux-sens en dehors du site actif","is_correct":false}]',
'c',
'Une mutation non-sens cree un codon stop et produit une proteine tronquee, perdant généralement sa fonction. C''est plus grave qu''un faux-sens sauf si c''est au site actif.',
2, 1, '{"acides_nucleiques","mutations"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000009', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'mcq',
'Comment les sequences repetees de dinucleotides microsatellites (STR) peuvent-elles causer des maladies génétiques par instabilite de la replication ?',
'[{"id":"a","text":"Elles sont toujours benefiques","is_correct":false},{"id":"b","text":"L''ADN polymerase peut glisser pendant la replication, causant des expansions ou contractions du nombre de repeats","is_correct":true},{"id":"c","text":"Elles n''affectent jamais la replication","is_correct":false},{"id":"d","text":"Elles augmentent l''efficacite de la transcription","is_correct":false}]',
'b',
'Dans les sequences repetees comme les CAG de la maladie de Huntington, l''ADN polymerase peut se desaligner, causant une expansion du nombre de repeats entre generations.',
3, 1, '{"acides_nucleiques","mutations"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000010', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'mcq',
'Expliquez le mecanisme par lequel un ARN peut agir comme une molecule catalytique (ribozyme) et ses implications biologiques.',
'[{"id":"a","text":"L''ARN ne peut jamais etre catalytique","is_correct":false},{"id":"b","text":"L''ARN possede une structure 3D complexe et peut stabiliser l''état de transition, catalysant les reactions comme les proteïnes","is_correct":true},{"id":"c","text":"L''ARN catalytique remplace tous les enzymes","is_correct":false},{"id":"d","text":"Seul l''ARNm peut etre un ribozyme","is_correct":false}]',
'b',
'Certains ARN (exemple : ARN 23S du ribosome) ont des activités catalytiques grace a leur structure 3D complexe. Cela suggere une origine ARN du monde precoce.',
3, 1, '{"acides_nucleiques","ribozymes"}');

-- CHAPTER 04: TRUE/FALSE (3 questions)

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000011', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'true_false',
'La replication de l''ADN est semi-conservative, ce qui signifie que chaque molecule ADN fille contient un brin ancien et un brin nouvellement synthetise.',
'[{"id":"true","text":"Vrai","is_correct":true},{"id":"false","text":"Faux","is_correct":false}]',
'true',
'L''experience de Meselson-Stahl a demontre que la replication est semi-conservative : chaque brin sert de matrice pour un nouveau brin complémentaire.',
1, 1, '{"acides_nucleiques","replication"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000012', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'true_false',
'Le code génétique est universel, ce qui signifie que le meme codon code pour le meme acide amine chez tous les organismes vivants.',
'[{"id":"true","text":"Vrai","is_correct":false},{"id":"false","text":"Faux","is_correct":true}]',
'false',
'Le code génétique est presque universel mais avec quelques exceptions dans les mitochondries et certains organismes (exemple : certains codons stop codent pour des AA chez Candida).',
2, 1, '{"acides_nucleiques","code_génétique"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000013', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'true_false',
'Les introns sont presentes dans tous les genes procaryotes et eucaryotes et doivent etre enleves par epissage avant la traduction.',
'[{"id":"true","text":"Vrai","is_correct":false},{"id":"false","text":"Faux","is_correct":true}]',
'false',
'Les introns sont typiques des genes eucaryotes mais pratiquement absents dans les genes procaryotes, ou l''ARNm est traduit directement sans epissage.',
2, 1, '{"acides_nucleiques","epissage"}');

-- CHAPTER 04: OPEN SHORT (2 questions)

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000014', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'open_short',
'Decrivez le processus complet de la synthese proteïque a partir du gene jusqu''a la proteine fonctionnelle, en incluant transcription et traduction.',
NULL,
'1) Transcription : ARN polymerase synthetise l''ARNm complémentaire du gene. 2) Epissage (eucaryotes) : enleve les introns. 3) Traduction : ribosome lit l''ARNm et recrute les ARNt correspondants, formant les liaisons peptidiques entre acides amines.',
'Apres la synthese, la proteine subit un repliement (chaperones proteïques) et les modifications post-traductionnelles (clivage, glycosylation, etc.) pour devenir fonctionnelle.',
3, 1, '{"acides_nucleiques","synthese_proteïque"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333304000015', '22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111102', 'open_short',
'Expliquez comment une mutation ponctuelle peut aboutir a une proteine totalement non-fonctionnelle, en utilisant l''exemple de la drepanocytose.',
NULL,
'Une seule substitution nucleotidique (A-T a T-A dans le 17e nucleotide du gene beta-globine) change le codon GAG (acide glutamique) en GTG (valine) a la position 6.',
'Cette valine apolaire cause la polymerisation de l''hemoglobine S desoxygene en fibrilles insolubeles, changeant la morphologie des globules rouges (falciformes) et causant une hemolise.',
3, 1, '{"acides_nucleiques","mutations"}');

-- ============================================================================
-- CHAPTER 05: ENZYMOLOGIE (15 questions: 10 MCQ + 3 true/false + 2 open_short)
-- ============================================================================

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000001', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est le principal role des enzymes dans les reactions métaboliques ?',
'[{"id":"a","text":"Fournir de l''énergie aux reactions","is_correct":false},{"id":"b","text":"Abaisser l''énergie d''activation et accelerer les reactions","is_correct":true},{"id":"c","text":"Changer l''équilibre thermodynamique des reactions","is_correct":false},{"id":"d","text":"Consommer les produits de reaction","is_correct":false}]',
'b',
'Les enzymes accelerent les reactions en diminuant l''énergie d''activation sans affecter l''équilibre thermodynamique, permettant aux métabolismes de fonctionner rapidement.',
1, 1, '{"enzymes","catalyse"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000002', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'mcq',
'Qu''est-ce que la constante de Michaelis (Km) et que represente-t-elle ?',
'[{"id":"a","text":"La concentration de substrat produisant la vitesse maximale","is_correct":false},{"id":"b","text":"La concentration de substrat a laquelle la vitesse est la moitie de Vmax","is_correct":true},{"id":"c","text":"La temperature optimale de l''enzyme","is_correct":false},{"id":"d","text":"Le nombre de molecules d''enzyme","is_correct":false}]',
'b',
'Km est une mesure de l''affinite de l''enzyme pour son substrat : un petit Km indique haute affinite, un grand Km indique basse affinite.',
1, 1, '{"enzymes","Michaelis_Menten"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000003', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est le principal mecanisme d''action des inhibiteurs competitifs d''enzymes ?',
'[{"id":"a","text":"Ils modifient de facon irreversible le site actif","is_correct":false},{"id":"b","text":"Ils se fixent sur le site actif et competent avec le substrat","is_correct":true},{"id":"c","text":"Ils se fixent loin du site actif","is_correct":false},{"id":"d","text":"Ils denaturent l''enzyme","is_correct":false}]',
'b',
'Les inhibiteurs competitifs se lient au site actif et peuvent etre surpassees par une concentration élevée de substrat, contrastant avec les inhibiteurs non-competitifs.',
1, 1, '{"enzymes","inhibition"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000004', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel cofacteur organique est essentiel pour de nombreuses reactions métaboliques (transfert de groupes, oxydoreductions) ?',
'[{"id":"a","text":"Glucose","is_correct":false},{"id":"b","text":"Vitamines (CoA, NAD+, FAD, etc.)","is_correct":true},{"id":"c","text":"Proteïne","is_correct":false},{"id":"d","text":"Lipide","is_correct":false}]',
'b',
'Les vitamines se convertissent en coenzymesfonctiounels qui aident les enzymes a catalyser des reactions. NAD+ et FAD sont essentiels pour les oxydoreductions.',
1, 1, '{"enzymes","coenzymes"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000005', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est l''effet optimal du pH et de la temperature sur la velocite enzymatique ?',
'[{"id":"a","text":"Plus chaud et plus acide est toujours mieux","is_correct":false},{"id":"b","text":"Chaque enzyme a un pH et temperature optimaux specifiques","is_correct":true},{"id":"c","text":"Le pH et temperature n''affectent jamais l''activité","is_correct":false},{"id":"d","text":"L''activité augmente infiniment avec la temperature","is_correct":false}]',
'b',
'Chaque enzyme possede un pH optimal (exemple : pepsine a pH 2) et une temperature optimale (37°C pour enzymes humaines). En dehors, l''activité diminue par denaturation progressive.',
1, 1, '{"enzymes","conditions_optimales"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000006', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel type de specifsite enzymatique decrit une enzyme qui agit sur un seul substrat ou un groupe de substrats etroitement apparentes ?',
'[{"id":"a","text":"Specifsite absolue","is_correct":true},{"id":"b","text":"Specifsite de groupe","is_correct":false},{"id":"c","text":"Specifsite large","is_correct":false},{"id":"d","text":"Absence de specificite","is_correct":false}]',
'a',
'La specificite absolue signifie que l''enzyme agit sur un seul substrat (exemple : glucose oxydase agit uniquement sur le glucose), resultant d''un site actif complémentaire precise.',
2, 1, '{"enzymes","specificite"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000007', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel est le role de la regulation allosterique dans les voies métaboliques ?',
'[{"id":"a","text":"Augmenter indefiniment la synthese du produit final","is_correct":false},{"id":"b","text":"Permettre une regulation fine de la vitesse de reaction en réponse aux signaux cellulaires","is_correct":true},{"id":"c","text":"Remplacer la regulation competive","is_correct":false},{"id":"d","text":"Denaturiser l''enzyme","is_correct":false}]',
'b',
'La regulation allosterique lie des effecteurs (differents du substrat) a un site autre que le site actif, changeant la conformation et l''activité enzymatique de facon reversible.',
2, 1, '{"enzymes","regulation_allosterique"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000008', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'mcq',
'Quel mecanisme explique pourquoi l''inhibition par le produit final est importante dans la regulation métabolique ?',
'[{"id":"a","text":"L''enzyme crée plus de produit","is_correct":false},{"id":"b","text":"Quand le produit s''accumule, il inhibe l''enzyme pour prévenir la surproduction","is_correct":true},{"id":"c","text":"Le produit ne peut jamais inhiber l''enzyme","is_correct":false},{"id":"d","text":"L''enzyme devient permanemment inactive","is_correct":false}]',
'b',
'L''inhibition par le produit final (exemple : CTP inhibant l''aspartate transcarbamoylase) previent l''accumulation excessive du produit et optimise l''efficacite métabolique.',
2, 1, '{"enzymes","regulation"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000009', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'mcq',
'Comment la nomination systemique (nomenclature EC) classe-t-elle les enzymes et pourquoi est-elle importante ?',
'[{"id":"a","text":"Elle nomme aleatoirement les enzymes","is_correct":false},{"id":"b","text":"Elle classe les enzymes en 6 classes selon le type de reaction qu''elles catalysent (oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases)","is_correct":true},{"id":"c","text":"Elle ne s''applique qu''aux enzymes digestives","is_correct":false},{"id":"d","text":"Elle mesure seulement la temperature optimale","is_correct":false}]',
'b',
'La classification EC utilise un code a 4 chiffres (exemple : EC 1.1.1.1 pour l''alcool deshydrogenase) permettant une identification precise et une standardisation scientifique.',
3, 1, '{"enzymes","nomenclature"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000010', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'mcq',
'Decrivez le mecanisme de la inhibition non-competitif et ses differences avec la inhibition competitif en termes d''effet sur Km et Vmax.',
'[{"id":"a","text":"L''inhibition non-competitif n''affecte que Km","is_correct":false},{"id":"b","text":"L''inhibition non-competitif abaisse Vmax mais n''affecte pas Km, tandis que competitif augmente Km sans affecter Vmax","is_correct":true},{"id":"c","text":"Les deux types ont des effets identiques","is_correct":false},{"id":"d","text":"L''inhibition non-competitif se surpasse facilement par plus de substrat","is_correct":false}]',
'b',
'L''inhibiteur non-competitif se lie au site allosterique et ne peut etre surpasse par le substrat. Cela diminue Vmax. L''inhibiteur competitif augmente Km en competant pour le site actif.',
3, 1, '{"enzymes","inhibition"}');

-- CHAPTER 05: TRUE/FALSE (3 questions)

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000011', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'true_false',
'Les enzymes reduisent l''énergie d''activation des reactions, permettant au métabolisme de fonctionner a une vitesse compatible avec la vie.',
'[{"id":"true","text":"Vrai","is_correct":true},{"id":"false","text":"Faux","is_correct":false}]',
'true',
'Sans enzymes, les reactions métaboliques seraient trop lentes pour soutenir la vie. Les enzymes accelerent typiquement les reactions de 10^6 a 10^17 fois.',
1, 1, '{"enzymes","catalyse"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000012', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'true_false',
'Les enzymes sont consommes au cours des reactions qu''elles catalysent et doivent etre reproduites constamment pour maintenir l''activité métabolique.',
'[{"id":"true","text":"Vrai","is_correct":false},{"id":"false","text":"Faux","is_correct":true}]',
'false',
'Les enzymes ne sont pas consommes lors de la reaction catalytique. Elles sont regenerees apres chaque cycle et peuvent fonctionner des milliers de fois.',
1, 1, '{"enzymes","catalyse"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000013', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'true_false',
'Une enzyme avec une valeur de Km tres basse indique qu''elle a une grande affinite pour son substrat et fonctionne efficacement a tres basses concentrations de substrat.',
'[{"id":"true","text":"Vrai","is_correct":true},{"id":"false","text":"Faux","is_correct":false}]',
'true',
'Un petit Km (<< concentration cellulaire du substrat) indique haute affinite, signifiant l''enzyme se sature rapidement et fonctionne effectivement a basses concentrations.',
2, 1, '{"enzymes","Michaelis_Menten"}');

-- CHAPTER 05: OPEN SHORT (2 questions)

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000014', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'open_short',
'Decrivez comment le mecanisme de l''enzyme agit sur un substrat selon le modele de l''ajustement induit (induced fit) de Koshland.',
NULL,
'Le substrat approche l''enzyme et l''ajustement induit decrit comment le site actif change de conformation pour envelopper parfaitement le substrat, stabilisant l''état de transition et accelerant la reaction catalytique.',
'Cette flexibilite du site actif explique aussi la regulation allosterique et specifite enzymatique élevée, contrastant avec le modele rigide de cle-serrure.',
3, 1, '{"enzymes","mecanisme_catalytique"}');

INSERT INTO questions (id, chapter_id, module_id, question_type, question_text, options, correct_answer, explanation, difficulty, priority, tags) VALUES
('33333333-3333-3333-3333-333305000015', '22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111102', 'open_short',
'Expliquez comment la cooperativite positive dans les proteïnes multimeriques (comme l''hemoglobine ou la phosphofructokinase) affecte la sensibilite métabolique a la concentration de substrat.',
NULL,
'La cooperativite positive signifie que la fixation d''une molecule de substrat/ligand sur une sous-unite augmente l''affinite des autres sous-unites. Cela cree une courbe sigmoidale de vitesse vs substrat.',
'Cette sigmoidalite rend l''enzyme beaucoup plus sensible aux petites variations de concentration de substrat autour d''une concentration critique, permettant une regulation métabolique plus precise et une réponse rapide aux signaux.',
3, 1, '{"enzymes","cooperativite"}');

-- ============================================================================
-- PART 2: EXAM EXERCISE E2
-- ============================================================================

INSERT INTO exam_exercises (id, module_id, title, description, exercise_type, duration_minutes, subject_html, model_answer_html, grading_criteria_html, common_mistakes_html, priority) VALUES
('44444444-4444-4444-4444-444444440001', '11111111-1111-1111-1111-111111111102',
'Le diabète de type 2 : mecanismes physiopathologiques et adaptations nutritionnelles',
'Sujet type E2 complet avec contexte clinique, documents annexes et 4 parties a traiter.',
'full_exam', 240,
'<h1>Sujet : Le Diabète de Type 2 - Mecanismes Physiopathologiques et Prise en Charge Nutritionnelle</h1>
<h2>Contexte clinique</h2>
<p>Vous suivez Monsieur Martin, 55 ans, en consultation diététique. Il a été diagnostiqué diabétique de type 2 il y a 2 ans. Son dernier bilan biologique confirme une mauvaise stabilisation glycemique malgre l''usage de metformine (500 mg x2/jour).</p>
<h3>Antecédents médicaux</h3>
<ul>
<li>Obésité abdominale (BMI 32 kg/m²)</li>
<li>Sedentarite (travail de bureau, peu d''activité physique)</li>
<li>Regime riche en aliments ultra-transformes</li>
<li>Dyslipidémie (cholesterol total élevé, HDL bas)</li>
<li>Tension arterielle elevée (145/90 mmHg)</li>
</ul>
<h3>Resultats biologiques récents (date : semaine 1)</h3>
<table border="1">
<tr><th>Parametre</th><th>Valeur</th><th>Valeur normale</th><th>Unite</th></tr>
<tr><td>Glycémie à jeun</td><td>2.15</td><td>0.7-1.0</td><td>g/L</td></tr>
<tr><td>HbA1c</td><td>8.2%</td><td>&lt;5.7%</td><td>%</td></tr>
<tr><td>Cholestérol total</td><td>2.65</td><td>&lt;2.0</td><td>g/L</td></tr>
<tr><td>LDL-cholestérol</td><td>1.85</td><td>&lt;1.30</td><td>g/L</td></tr>
<tr><td>HDL-cholestérol</td><td>0.35</td><td>&gt;0.40</td><td>g/L</td></tr>
<tr><td>Triglycerides</td><td>2.85</td><td>&lt;1.50</td><td>g/L</td></tr>
<tr><td>Creatinine</td><td>1.15</td><td>0.7-1.2</td><td>mg/dL</td></tr>
</table>
<h2>Questions à traiter</h2>
<h3>PARTIE 1 : Mecanismes physiopathologiques du diabète de type 2</h3>
<p>En vous appuyant sur vos connaissances en biochimie, expliquez :</p>
<ol>
<li>Les mecanismes d''insulinoresistance (definition, role de l''insuline, facteurs favorisant la resistance)</li>
<li>Le phenomene de glucotoxicite et ses consequences sur la sécrétion insulinaire</li>
<li>Comment l''obésité abdominale favorise l''insulinoresistance via l''inflammation et les adipokines</li>
</ol>
<h3>PARTIE 2 : Analyse des résultats biologiques</h3>
<p>Interpretez les résultats du patient en :</p>
<ol>
<li>Evaluant la qualité de son controle glycemique (utiliser HbA1c comme marqueur)</li>
<li>Decrivant le profil lipidique et ses risques cardiovasculaires associes</li>
<li>Evaluant la fonction rénale et l''absence de complication rénale actuelle</li>
</ol>
<h3>PARTIE 3 : Objectifs nutritionnels personnalises</h3>
<p>En tenant compte du profil du patient :</p>
<ol>
<li>Definir 3 objectifs nutritionnels SMART (Specifiques, Mesurables, Accessibles, Realistes, Temporels)</li>
<li>Justifier l''approche diététique recommandee (Index Glycemique, charge glycemique, fibres)</li>
<li>Proposer des modifications du régime pour reduire les glucides ultra-transformes</li>
</ol>
<h3>PARTIE 4 : Menu type adapte sur une journée</h3>
<p>Elaborez un menu sur 24 heures pour Monsieur Martin incluant :</p>
<ol>
<li>Un petit-déjeuner avec fibres et proteïnes (sans sucres rapides)</li>
<li>Un déjeuner équilibre avec legumes, proteïne, glucides complets</li>
<li>Un dîner leger avec proteïne et légumes</li>
<li>2 collations saines</li>
<li>Justifier chaque choix alimentaire en fonction des proprietes biochimiques des aliments</li>
</ol>',
'<h1>Réponse Modèle : Diabète de Type 2</h1>
<h2>PARTIE 1 : Mecanismes Physiopathologiques</h2>
<h3>1. Insulinoresistance</h3>
<p><strong>Definition :</strong> L''insulinoresistance est une diminution de la sensibilite des cellules cibles (muscles, foie, adipocytes) a l''action de l''insuline, necessitant une sécrétion accrue d''insuline pour maintenir la glycemie normale.</p>
<p><strong>Role de l''insuline :</strong> L''insuline est une hormone anabolique secretee par les cellules beta du pancreas. Elle facilite l''entree du glucose dans les cellules via les transporteurs GLUT4, stimule la synthesis de glycogene et lipides, et inhibe la gluconeogenese hépatique.</p>
<p><strong>Mecanismes de resistance :</strong></p>
<ul>
<li><strong>Dysfonction du recepteur insulin</strong> : Diminution du nombre de recepteurs ou de leur sensibilite (serine-kinase au lieu de tyrosine-kinase)</li>
<li><strong>Defaut post-recepteur</strong> : Dysfonction de la cascade de signalisation insulinique (IRS-1, PI3K, Akt)</li>
<li><strong>Accumulation de lipides intracellulaires</strong> : Triglycerides dans le muscle et foie interferent avec la signalisation insulinique</li>
<li><strong>Inflammation chronique</strong> : Adipokines pro-inflammatoires (TNF-alpha, IL-6) inhibent la phosphorylation d''IRS-1</li>
<li><strong>Stress oxidatif</strong> : Production accrue de ROS dans les mitochondries dysfonctionnelles</li>
</ul>
<h3>2. Glucotoxicite</h3>
<p><strong>Definition :</strong> La glucotoxicite est le dysfonctionnement des cellules beta pancreatiqu du fait d''une exposition chronique a une hyperglycemie, causant une degradation progressive de la sécrétion insulinaire.</p>
<p><strong>Mecanismes :</strong></p>
<ul>
<li>Glycation des proteïnes (hemoglobine, albumine, proteïnes intracellulaires)</li>
<li>Accumulation de AGE (produits de glycation avancee) qui activent les recepteurs RAGE, provoquant inflammation et stress oxidatif</li>
<li>Dysfonctionnement mitochondrial et apoptose des cellules beta</li>
<li>Defaut de sécrétion d''insuline et de glucagon </li>
</ul>
<p><strong>Consequences :</strong> Vicious cycle : hyperglycemie initiale → insulinoresistance → hyperglycemie plus grave → glucotoxicite → diminution de sécrétion insulin → hyperglycemie resistante au traitement.</p>
<h3>3. Obesite abdominale et adipokines</h3>
<p>L''obésité est une maladie inflammatoire chronique. Le tissu adipeux visceral secrete :</p>
<ul>
<li><strong>TNF-alpha</strong> : Cytokine pro-inflammatoire inhibant IRS-1</li>
<li><strong>IL-6</strong> : Amplifie l''inflammation hépatique et la resistance insulinique</li>
<li><strong>Adiponectine</strong> (diminuee en obésité) : Ameliore la sensibilite insulinique, proprietes anti-inflammatoires</li>
<li><strong>Leptin</strong> : Regulation de l''appetit mais aussi sécrétion adipokines</li>
</ul>
<p>L''obésité abdominale est particulièrement risquée car le tissu adipeux visceral draine directement vers le foie via la veine porte, amplifying la resistance insulinique hépatique et la dyslipidémie.</p>
<h2>PARTIE 2 : Analyse des Resultats Biologiques</h2>
<h3>1. Controle glycemique</h3>
<p><strong>Glycémie à jeun : 2.15 g/L (1.19 mmol/L)</strong> - Elevée (normale &lt;1.0 g/L). Indique une perseverance de la hepatic glucose output malgre la metformine.</p>
<p><strong>HbA1c : 8.2%</strong> - Mauvais controle. Objectif pour diabétiques est 6.5-7%. Cette valeur indique une moyenne glycemique sur 3 mois de ~180-200 mg/dL (10-11 mmol/L).</p>
<p><strong>Interprétation :</strong> Le patient a besoin d''une intensification thérapeutique (combinaison medicamenteuse, insulinotherapie) et surtout d''une adherence amelioree aux modifications de mode de vie.</p>
<h3>2. Profil lipidique et risque cardiovasculaire</h3>
<p><strong>Cholestérol total : 2.65 g/L</strong> - Eleve (normal &lt;2.0)</p>
<p><strong>LDL-C : 1.85 g/L</strong> - Tres élevé (normal &lt;1.30). LDL glycosyle est particulièrement atherogenique chez le diabétique.</p>
<p><strong>HDL-C : 0.35 g/L</strong> - Bas (normal &gt;0.40). HDL faible est un marqueur de risque cardiovasculaire, particulièrement chez le diabétique.</p>
<p><strong>Triglycerides : 2.85 g/L</strong> - Eleves (normal &lt;1.50). Indique une dysregulation du métabolisme des VLDL et probleme d''insulinoresistance.</p>
<p><strong>Interprétation :</strong> Pattern dyslipidémique diabétique typique = LDL-C élevé + HDL-C bas + TG élevés. Risque cardiovasculaire TRES ELEVE. Necessite un traitement lipid-lowering (statine, ezetimibe, PCSK9 inhibitor?) et modification diététique (reduction AG saturés, augmentation acides gras insatures, omega-3).</p>
<h3>3. Fonction rénale</h3>
<p><strong>Creatinine : 1.15 mg/dL</strong> - Dans la limite supérieure normale (0.7-1.2). DFG presumablement normal si pas de variation acute. Patient n''a pas de nephropathie diabétique actuellement mais est a risque (HbA1c elevée, hypertension).</p>
<p><strong>Recommendation :</strong> Screening annuel pour albuminurie et DFG. Prevention de progression par control glycemique optimal et reduction de la pression arterielle.</p>
<h2>PARTIE 3 : Objectifs Nutritionnels Personnalises</h2>
<p><strong>Objectif 1 (Glycemie) :</strong> Reduire HbA1c de 8.2% a 7.0% (ou &lt;6.5%) en 3-6 mois par :</p>
<ul>
<li>Diminution de l''apport en glucides simples et ultra-transformes</li>
<li>Augmentation des fibres (35-40 g/jour)</li>
<li>Choix d''aliments a IG bas et CG faible</li>
</ul>
<p><strong>Justification :</strong> Les fibres solubles ralentissent l''absorption du glucose (diminuent la glycemie postprandiale de 20-30%), les aliments IG bas ne provoquent pas de pics d''insuline, limitant les AGE et l''inflammation.</p>
<p><strong>Objectif 2 (Poids et comorbidités) :</strong> Perdre 5-10% du poids corporel en 6 mois (~6-12 kg) pour reduire l''insulinoresistance et améliorer le profil lipidique.</p>
<ul>
<li>Deficit calorique de 500-750 kcal/jour</li>
<li>Augmentation activité physique (150 min/semaine d''aerobic)</li>
</ul>
<p><strong>Justification :</strong> La perte de poids ameliore la sensibilite insulinique en reduisant les adipokines pro-inflammatoires et les lipides intracellulaires. Même 5% reduction = improvement glycemique significant.</p>
<p><strong>Objectif 3 (Profil lipidique) :</strong> Diminuer LDL-C a &lt;1.30 et augmenter HDL-C a &gt;0.40 en 3 mois par :</p>
<ul>
<li>Reduction des AG satures (beurre, viandes grasses, laitages pleins) a &lt;7% des calories</li>
<li>Augmentation des AG insatures (huiles vegetales, poissons gras, noix) = 10-15% des calories</li>
<li>Augmentation omega-3 (poisson 2-3x/semaine, graines de lin)</li>
<li>Augmentation des phytosterols (cereales, huiles vegetales)</li>
</ul>
<p><strong>Justification :</strong> Les AG satures augmentent le LDL via le recepteur LDL. Les AG insatures et omega-3 ont proprietes hypolipidemiantes et anti-inflammatoires. Les phytosterols diminuent l''absorption cholesterol.</p>
<h2>PARTIE 4 : Menu Type Sur 24 Heures</h2>
<h3>PETIT-DEJEUNER (07:00)</h3>
<p><strong>Composition :</strong> Flocons d''avoine (50 g) avec lait demi-ecreme (200 mL), 1 oeuf poché, 1 tranche pain complet, 1 kiwi.</p>
<p><strong>Justifications biochimiques :</strong></p>
<ul>
<li>Avoine : Riche en beta-glucanes (fibres solubles) qui ralentissent l''absorption glucose et diminuent postprandial glycemia spike</li>
<li>Oeuf : Proteïne complete, augmente satiete, ralentit la vidange gastrique</li>
<li>Pain complet : IG plus bas que blanc, apporte fibres et vitamines B</li>
<li>Kiwi : Vitamine C, fibres, IG bas</li>
<li>Lait demi-ecreme : Apporte proteïne et calcium, limite les AG satures</li>
</ul>
<p><strong>Macros : ~450 kcal, 40g glucides (25g fibres), 15g proteïnes, 12g lipides</strong></p>
<h3>COLLATION MATIN (10:30)</h3>
<p>1 pomme + 20 g amandes</p>
<p><strong>Justification :</strong> Pomme = fibres solubles (pectine) + polyphenols antioxydants. Amandes = AG insatures, vitamine E, fibre, protein. Combination ralentit absorption et apporte nutriments sans spike glycemique.</p>
<h3>DEJEUNER (12:30)</h3>
<p><strong>Composition :</strong> Salade verte (tomates, concombre, épinards frais) + 150g poulet roti + 1 portion legumes secs (lentilles cuites, 150g) + 1 tranche pain complet + huile olive (1 cuillère)</p>
<p><strong>Justifications :</strong></p>
<ul>
<li>Salade verte : Fibres insolubles, minéraux, peu calorique, ralentit glycemie</li>
<li>Poulet maigre : Proteïne de haute qualité (9 AA essentiels), effet thermique élevé, diminue appetit</li>
<li>Lentilles : Proteïne vegetale, fibres solubles (diminuent IG), index glycemique bas malgré teneur glucides, acides gras polyinsatures</li>
<li>Pain complet : Meilleur que blanc pour IG et fibre</li>
<li>Huile olive : AG monoinsatures, polyphenols antioxydants, anti-inflammatoire</li>
</ul>
<p><strong>Macros : ~600 kcal, 60g glucides (18g fibres), 40g proteïnes, 15g lipides (olive)</strong></p>
<h3>COLLATION APRES-MIDI (16:00)</h3>
<p>1 yaourt nature (150g) + 30g granola sans sucre + quelques baies (framboises)</p>
<p><strong>Justification :</strong> Yaourt = probiotiques benefiques pour microbiote (influence métabolique), proteïne, calcium. Granola sans sucre = glucides complexes + fibre. Baies = antioxydants, polyphenols, peu de fructose.</p>
<h3>DINER (19:30)</h3>
<p><strong>Composition :</strong> 150g poisson gras (saumon sauvage) roti + 200g brocoli vapeur + 150g riz complet + 1 portion jus citron frais</p>
<p><strong>Justifications :</strong></p>
<ul>
<li>Saumon : Riche EPA + DHA (omega-3 LC), diminuent triglycerides (-20-40%), proprietes anti-inflammatoires, ameliorent sensibilite insulinique</li>
<li>Brocoli : Fibres solubles, sulforaphane (composé anti-cancer), vitamines K, C, peu glucides</li>
<li>Riz complet : IG modere, apporte B vitamines, magnésium (cofacteur insuline signaling)</li>
<li>Citron : Acide citrique ralentit absorption glucose (diminue IG de 20-30% si avec repas), vitamine C</li>
</ul>
<p><strong>Macros : ~550 kcal, 55g glucides (8g fibres), 38g proteïnes, 18g lipides (saumon)</strong></p>
<h3>RESUME NUTRITIONNEL JOURNALIER :</h3>
<ul>
<li><strong>Total calories :</strong> ~2100-2200 kcal (deficit modere si poids de base ~90 kg)</li>
<li><strong>Glucides :</strong> ~210g (35% calories) = plus bas que recommandations standard mais encore suffisant pour activité. Tous complexes ou IG bas.</li>
<li><strong>Proteïnes :</strong> ~95g (17% calories) = 1.2 g/kg poids ideaux. Ameliore satiete et effect thermique.</li>
<li><strong>Lipides :</strong> ~60g (27% calories). Ratio poly/mono : 0.5:1 (favorable)</li>
<li><strong>Fibres :</strong> ~51g/jour (objectif &gt;30g) = ralentit glycemie, ameliore lipidemia, augmente satiation</li>
<li><strong>AG satures :</strong> ~15g (&lt;7% calories) = conforme recommandations pour dyslipidémie</li>
<li><strong>Sodium :</strong> &lt;2300 mg/jour = contribue a reduction tension arterielle</li>
</ul>
<h3>Recommandations supplementaires :</h3>
<ul>
<li>Boire ~2.5 L eau/jour, limiter alcool</li>
<li>Eviter completement sodas sucres et jus fruits concentres</li>
<li>Augmenter progressivement fibre (risque ballonnements initiaux)</li>
<li>Planification repas et portions (assiette moitie legumes, quart proteïne, quart glucides)</li>
<li>Activite physique : 150 min/semaine marche rapide ou 75 min/semaine running, resistance training 2x/semaine</li>
</ul>',
'<h1>Critères de Notation : Diabète de Type 2</h1>
<h3>PARTIE 1 : Mecanismes Physiopathologiques (25 points)</h3>
<ul>
<li><strong>5 points :</strong> Definition claire de l''insulinoresistance + role de l''insuline dans le métabolisme (entree GLUT4, synthese glycogene/lipide, inhibition gluconeogenese)</li>
<li><strong>8 points :</strong> Mecanismes de resistance (dysfonction recepteur, defaut post-recepteur, lipotoxicite, inflammation, stress oxidatif). Minimum 3 mecanismes attendus avec details.</li>
<li><strong>7 points :</strong> Glucotoxicite bien expliquee (glycation proteïnes, AGE, RAGE, mitochondrial dysfunction, vicious cycle)</li>
<li><strong>5 points :</strong> Obesite abdominale et adipokines (TNF-alpha, IL-6, leptin, adiponectine). Distinction visceral vs sous-cutane idealement.</li>
</ul>
<h3>PARTIE 2 : Analyse Resultats Biologiques (20 points)</h3>
<ul>
<li><strong>7 points :</strong> Glycémie + HbA1c interprétation. Reconnaissance mauvais controle, calcul moyen glycemique mentionee est +.</li>
<li><strong>8 points :</strong> Profil lipidique : interprétation LDL-C élevé, HDL-C bas, TG elevés. Connexion diabète (LDL glycosyle). Risque cardiovasculaire identifie.</li>
<li><strong>5 points :</strong> Fonction rénale : creatinine normale, mention absence nephropathie actuelle mais risque future. Prevention screening mentione.</li>
</ul>
<h3>PARTIE 3 : Objectifs Nutritionnels (25 points)</h3>
<ul>
<li><strong>8 points :</strong> 3 objectifs SMART identifiés et bien formules (glycémie, poids, lipides sont bons choix)</li>
<li><strong>10 points :</strong> Justification scientifique de chaque objectif (fibres + IG bas pour glycemie, perte poids pour adipokines, AG insatures pour lipids). Details biochimiques attendus.</li>
<li><strong>7 points :</strong> Strategies concretes mentionnees (reduction glucides simples, augmentation fibres, activité physique)</li>
</ul>
<h3>PARTIE 4 : Menu Adapte (30 points)</h3>
<ul>
<li><strong>8 points :</strong> Menu complet + équilibre (petit-dej, collations, dejeuner, diner). Portions raisonnables (~2100-2200 kcal)</li>
<li><strong>10 points :</strong> Justifications biochimiques DE CHAQUE ALIMENT (role fibre, proteïne, ag insature, glycemie, satiete). Qualité des justifications important.</li>
<li><strong>7 points :</strong> Macro et micros nutriments calcules. Verification : glucides complexes, proteine suffisanté, lipides équilibres, fibre &gt;30g.</li>
<li><strong>5 points :</strong> Autres recommandations (eau, eviter sodas, activité physique) + messages de bonne pratique diététique</li>
</ul>
<h3>Qualite Generale (10 points)</h3>
<ul>
<li>Presentation claire et logique</li>
<li>Vocabulaire scientifique approprie (insuline, gluconeogenese, glycation, adipokines, etc.)</li>
<li>Logique coherente entre biochimie et recommandations pratiques</li>
<li>Absence contresens ou informations dangereuses</li>
</ul>
<h3>TOTAL : 100 points. Conversion notation 0-20 = score/5</h3>',
'<h1>Erreurs Communes et Confusions Frequentes</h1>
<h3>PARTIE 1 - Mecanismes Physiopathologiques</h3>
<ul>
<li><strong>Erreur 1 :</strong> Confusion entre insulin resistance ET deficit de sécrétion insulinaire. Expliquer que le type 2 commence par resistance PUIS decline de sécrétion. Eviter de dire que l''insuline est « absente » chez le type 2 (elle est presente mais inefficace au debut).</li>
<li><strong>Erreur 2 :</strong> Oublier le role de l''ADN polymerase et des mutations dans la denaturation proteïque ou mutations. Details mecanistiques manquants.</li>
<li><strong>Erreur 3 :</strong> Métabolisme lipidique insuffisamment detailed. Oublier explanation des AG satures vs insatures, formation de VLDL, role lipase hépatique.</li>
<li><strong>Erreur 4 :</strong> Confondre TNF-alpha (cytokine pro-inflammatoire) avec adiponectine (anti-inflammatoire). Important pour logic de adipose tissue pathology.</li>
<li><strong>Erreur 5 :</strong> Glucotoxicite expliquee trop superficiellement. Besoin de mentionner AGE, RAGE activation, ROS generation, mitochondrial dysfunction.</li>
</ul>
<h3>PARTIE 2 - Analyse Biologique</h3>
<ul>
<li><strong>Erreur 1 :</strong> Ignorer que HbA1c estime glycémie moyenne sur 3 mois, pas glycémie instantanee. Dire simplement « HbA1c élevée » sans interprétation est insuffisant.</li>
<li><strong>Erreur 2 :</strong> Ne pas reconnaître le profil dyslipidémique CARACTERISTIQUE du diabète type 2 (TG élevés, HDL bas, LDL modérément élevé). Focus souvent trop sur cholestérol total seul.</li>
<li><strong>Erreur 3 :</strong> Oublier que LDL glycosyle est plus atherogenique que LDL normal. Cette connection diabète-cardiovascular est essentielle.</li>
<li><strong>Erreur 4 :</strong> Interpreter creatinine 1.15 comme abnormale. Elle est a limite SUPERIEURE normal (0.7-1.2). Pas de nephropathie actuelle mais screening annuel recommandé.</li>
</ul>
<h3>PARTIE 3 - Objectifs Nutritionnels</h3>
<ul>
<li><strong>Erreur 1 :</strong> Objectifs non SMART. Ex: « reduire glycémie » n''est pas SMART (pas chiffre, pas delai). Doit etre « reduire HbA1c de 8.2% a 7.0% en 3 mois ».</li>
<li><strong>Erreur 2 :</strong> Justifications générales ou superficielles. Eviter « fibres c''est bon ». Dire plutot « beta-glucanes de l''avoine ralentissent absorption glucose via viscosite, diminuant spike postprandial de 20-30% ».</li>
<li><strong>Erreur 3 :</strong> Oublier le deficit calorique pour perte de poids. Dire « perdre poids » sans mentionner 500 kcal deficit/jour est vague.</li>
<li><strong>Erreur 4 :</strong> Recommandations generiques sans lien au biochimie. Chaque objectif doit avoir mecanisme biochimique detail (adipokines, insuline signaling, lipid métabolism, etc.).</li>
<li><strong>Erreur 5 :</strong> Ne pas mentionner activité physique. Resistance training et aerobic importants pour améliorer sensibilite insulinique via AMPK activation.</li>
</ul>
<h3>PARTIE 4 - Menu Adapte</h3>
<ul>
<li><strong>Erreur 1 :</strong> Menu deséquilibre (trop de calories, trop de glucides, pas assez proteïne). Besoin de check rapide : calories raisonnables, ratio macro acceptables, fibre &gt;30g.</li>
<li><strong>Erreur 2 :</strong> Aliments choisis mais sans justifications. « Saumon » seul c''est insuffisant. Besoin de « Saumon riche en EPA/DHA (omega-3 LC) qui diminuent TG de 20-40% et ameliorent sensibilite insulinique ».</li>
<li><strong>Erreur 3 :</strong> Oublier l''importance des fibres dans chaque repas. Menu sans legumes suffisants ou cereales completes.</li>
<li><strong>Erreur 4 :</strong> Glucides rapides inclus (sucre, white bread, jus sucres). Tous les choix doivent etre IG bas ou complexes.</li>
<li><strong>Erreur 5 :</strong> Lipides deséquilibres. AG satures trop élevées (beurre, fromage, viande grasse) sans AG insatures. Ratio important pour dyslipidémia.</li>
<li><strong>Erreur 6 :</strong> Portions derealistes (trop petites = non adherence, trop grandes = surcharge glycemique). Check que portions sont raisonnables et satisfaisantés.</li>
<li><strong>Erreur 7 :</strong> Oublier macros calculates. Verification rapide essentielles : 210-250g glucides/jour, 90-110g proteïnes, 55-65g lipides, fibre 35-40g.</li>
<li><strong>Erreur 8 :</strong> Ne pas mentionner hydratation et evitement des boissons sucrees. Estos sont basics mais importants.</li>
</ul>
<h3>Erreurs Redhibitoires (entraine reduction majeure de note) :</h3>
<ul>
<li>Informations medicalement incorrectes (ex: insuline n''existe pas chez type 2, proteïnes ne sont pas glucides)</li>
<li>Recommandations dangereuses (ex: zero carbs, jeune extreme, supplements non-regules)</li>
<li>Plagiat evident ou sources non-citees</li>
<li>Confusion diabète type 1 et type 2</li>
<li>Menu hyper-restrictif ou psychologiquement non-adherent</li>
</ul>',
1);

-- ============================================================================
-- PART 3: WEEKLY OBJECTIVES (4 weeks, 12-month program)
-- ============================================================================

INSERT INTO weekly_objectives (id, program_duration, week_number, module_id, title, chapter_ids, exercise_ids, target_score) VALUES
('55555555-5555-5555-5555-555555550001', '12months', 1, '11111111-1111-1111-1111-111111111102',
'Biochimie structurale : glucides et lipides',
'["22222222-2222-2222-2222-222222220001","22222222-2222-2222-2222-222222220002"]',
'[]',
80);

INSERT INTO weekly_objectives (id, program_duration, week_number, module_id, title, chapter_ids, exercise_ids, target_score) VALUES
('55555555-5555-5555-5555-555555550002', '12months', 2, '11111111-1111-1111-1111-111111111102',
'Biochimie structurale : protides et acides nucleiques',
'["22222222-2222-2222-2222-222222220003","22222222-2222-2222-2222-222222220004"]',
'[]',
80);

INSERT INTO weekly_objectives (id, program_duration, week_number, module_id, title, chapter_ids, exercise_ids, target_score) VALUES
('55555555-5555-5555-5555-555555550003', '12months', 3, '11111111-1111-1111-1111-111111111102',
'Enzymologie et vitamines hydrosolubles',
'["22222222-2222-2222-2222-222222220005","22222222-2222-2222-2222-222222220006"]',
'[]',
80);

INSERT INTO weekly_objectives (id, program_duration, week_number, module_id, title, chapter_ids, exercise_ids, target_score) VALUES
('55555555-5555-5555-5555-555555550004', '12months', 4, '11111111-1111-1111-1111-111111111102',
'Vitamines liposolubles et biologie cellulaire',
'["22222222-2222-2222-2222-222222220007","22222222-2222-2222-2222-222222220008"]',
'["44444444-4444-4444-4444-444444440001"]',
80);

-- ============================================================================
-- END OF SEED PART 3
-- ============================================================================

-- ============================================================================
-- GLOSSARY TERMS (50 terms)
-- ============================================================================
INSERT INTO glossary_terms (term, definition, category, related_terms, module_id) VALUES

-- BIOCHIMIE (12)
('Glycolyse', 'Voie métabolique anaérobie qui dégrade le glucose (6 carbones) en 2 molécules de pyruvate (3 carbones). Se déroule dans le cytoplasme. Bilan net : 2 ATP et 2 NADH.', 'biochimie', ARRAY['Pyruvate','ATP','NAD+','Glucose'], '11111111-1111-1111-1111-111111111102'),
('Catabolisme', 'Ensemble des réactions de dégradation des molécules complexes en molécules simples, libérant de l''énergie sous forme d''ATP.', 'biochimie', ARRAY['Anabolisme','ATP','Métabolisme'], '11111111-1111-1111-1111-111111111102'),
('Anabolisme', 'Ensemble des réactions de synthèse qui construisent des molécules complexes à partir de molécules simples, consommant de l''énergie (ATP).', 'biochimie', ARRAY['Catabolisme','ATP','Métabolisme'], '11111111-1111-1111-1111-111111111102'),
('Cycle de Krebs', 'Cycle métabolique central qui oxyde l''acétyl-CoA en CO2 dans la matrice mitochondriale. Produit 3 NADH, 1 FADH2 et 1 GTP par tour de cycle.', 'biochimie', ARRAY['Mitochondrie','Acétyl-CoA','NADH'], '11111111-1111-1111-1111-111111111102'),
('Bêta-oxydation', 'Voie catabolique de dégradation des acides gras dans la mitochondrie. Chaque cycle raccourcit la chaîne de 2 carbones et produit 1 NADH, 1 FADH2 et 1 acétyl-CoA.', 'biochimie', ARRAY['Acides gras','Mitochondrie','Acétyl-CoA'], '11111111-1111-1111-1111-111111111102'),
('Néoglucogenèse', 'Synthèse de glucose à partir de précurseurs non glucidiques (lactate, acides aminés, glycérol). Se déroule principalement dans le foie. Essentielle au maintien de la glycémie à jeun.', 'biochimie', ARRAY['Glycolyse','Glucose','Foie'], '11111111-1111-1111-1111-111111111102'),
('Glycogénogenèse', 'Voie de synthèse du glycogène à partir du glucose. Stockage hépatique (80-100 g) et musculaire (300-400 g). Activée par l''insuline.', 'biochimie', ARRAY['Glycogénolyse','Glycogène','Insuline'], '11111111-1111-1111-1111-111111111102'),
('Glycogénolyse', 'Dégradation du glycogène en glucose-6-phosphate (muscle) ou glucose libre (foie). Activée par le glucagon et l''adrénaline.', 'biochimie', ARRAY['Glycogénogenèse','Glycogène','Glucagon'], '11111111-1111-1111-1111-111111111102'),
('Phosphorylation oxydative', 'Processus mitochondrial couplant le transport d''électrons à la synthèse d''ATP via l''ATP synthase. Produit environ 30-32 ATP par molécule de glucose.', 'biochimie', ARRAY['ATP','Mitochondrie','Chaîne respiratoire'], '11111111-1111-1111-1111-111111111102'),
('Lipogenèse', 'Synthèse d''acides gras à partir d''acétyl-CoA, principalement dans le foie et le tissu adipeux. Activée par l''insuline en période postprandiale.', 'biochimie', ARRAY['Acides gras','Insuline','Tissu adipeux'], '11111111-1111-1111-1111-111111111102'),
('ATP', 'Adénosine triphosphate. Molécule universelle de transfert d''énergie dans la cellule. L''hydrolyse d''une liaison phosphate libère environ 30,5 kJ/mol.', 'biochimie', ARRAY['Catabolisme','Phosphorylation oxydative','Glycolyse'], '11111111-1111-1111-1111-111111111102'),
('Acétyl-CoA', 'Molécule carrefour du métabolisme. Point d''entrée dans le cycle de Krebs. Produit par la glycolyse (via le pyruvate), la bêta-oxydation et la dégradation des acides aminés.', 'biochimie', ARRAY['Cycle de Krebs','Bêta-oxydation','Pyruvate'], '11111111-1111-1111-1111-111111111102'),

-- PHYSIOLOGIE (8)
('Insuline', 'Hormone peptidique sécrétée par les cellules bêta des îlots de Langerhans du pancréas. Hypoglycémiante : favorise l''entrée du glucose dans les cellules et le stockage énergétique.', 'physiologie', ARRAY['Glucagon','Glycémie','Pancréas'], '11111111-1111-1111-1111-111111111102'),
('Glucagon', 'Hormone hyperglycémiante sécrétée par les cellules alpha du pancréas. Stimule la glycogénolyse et la néoglucogenèse hépatiques pour maintenir la glycémie à jeun.', 'physiologie', ARRAY['Insuline','Glycémie','Néoglucogenèse'], '11111111-1111-1111-1111-111111111102'),
('Péristaltisme', 'Contractions musculaires involontaires et coordonnées de la paroi du tube digestif qui propulsent le bol alimentaire de l''œsophage au rectum.', 'physiologie', ARRAY['Digestion','Tube digestif'], '11111111-1111-1111-1111-111111111102'),
('Absorption intestinale', 'Passage des nutriments de la lumière intestinale vers le sang ou la lymphe à travers les entérocytes. Se produit principalement dans le jéjunum et l''iléon.', 'physiologie', ARRAY['Entérocyte','Villosités','Intestin grêle'], '11111111-1111-1111-1111-111111111102'),
('Filtration glomérulaire', 'Premier processus de formation de l''urine dans le glomérule rénal. Le sang est filtré sous pression pour former l''urine primitive (environ 180 L/jour).', 'physiologie', ARRAY['Rein','Néphron','Diurèse'], '11111111-1111-1111-1111-111111111102'),
('Métabolisme basal', 'Dépense énergétique minimale de l''organisme au repos, à jeun, en neutralité thermique. Représente 60-70% de la dépense énergétique totale.', 'physiologie', ARRAY['Dépense énergétique','Harris-Benedict','Thermogenèse'], '11111111-1111-1111-1111-111111111102'),
('Homéostasie', 'Capacité de l''organisme à maintenir stable son milieu intérieur (pH, température, glycémie, natrémie) malgré les variations de l''environnement extérieur.', 'physiologie', ARRAY['Glycémie','Régulation','pH sanguin'], '11111111-1111-1111-1111-111111111102'),
('Microbiote intestinal', 'Ensemble des micro-organismes (bactéries, virus, champignons) colonisant le tube digestif. Joue un rôle dans la digestion, l''immunité et la synthèse de vitamines (K, B12).', 'physiologie', ARRAY['Intestin','Probiotiques','Prébiotiques'], '11111111-1111-1111-1111-111111111102'),

-- PHYSIOPATHOLOGIE (7)
('Diabète de type 2', 'Maladie métabolique chronique caractérisée par une insulinorésistance et un déficit relatif en insuline. Provoque une hyperglycémie chronique avec complications micro et macrovasculaires.', 'physiopathologie', ARRAY['Insuline','Glycémie','HbA1c'], '11111111-1111-1111-1111-111111111102'),
('Dénutrition', 'État pathologique résultant d''un déséquilibre entre les apports et les besoins nutritionnels, entraînant une perte de masse maigre et une altération des fonctions biologiques.', 'physiopathologie', ARRAY['IMC','Albumine','NRI'], '11111111-1111-1111-1111-111111111103'),
('Dyslipidémie', 'Anomalie du profil lipidique sanguin : hypercholestérolémie (LDL élevé), hypertriglycéridémie, ou HDL bas. Facteur de risque cardiovasculaire majeur.', 'physiopathologie', ARRAY['Cholestérol','LDL','HDL','Triglycérides'], '11111111-1111-1111-1111-111111111102'),
('Insuffisance rénale chronique', 'Diminution progressive et irréversible du débit de filtration glomérulaire. Nécessite une adaptation diététique : restriction protéique, contrôle du potassium et du phosphore.', 'physiopathologie', ARRAY['Filtration glomérulaire','Rein','Dialyse'], '11111111-1111-1111-1111-111111111102'),
('Maladie cœliaque', 'Entéropathie auto-immune déclenchée par le gluten chez des sujets génétiquement prédisposés. Provoque une atrophie villositaire et une malabsorption. Traitement : régime sans gluten strict à vie.', 'physiopathologie', ARRAY['Gluten','Villosités','Malabsorption'], '11111111-1111-1111-1111-111111111102'),
('Obésité', 'Excès de masse grasse ayant des conséquences sur la santé. Définie par un IMC >= 30 kg/m². Facteur de risque du diabète de type 2, des maladies cardiovasculaires et de certains cancers.', 'physiopathologie', ARRAY['IMC','Tissu adipeux','Syndrome métabolique'], '11111111-1111-1111-1111-111111111102'),
('Syndrome métabolique', 'Association d''au moins 3 critères parmi : obésité abdominale, hypertriglycéridémie, HDL bas, hypertension, hyperglycémie à jeun. Augmente le risque cardiovasculaire.', 'physiopathologie', ARRAY['Obésité','Dyslipidémie','Diabète de type 2'], '11111111-1111-1111-1111-111111111102'),

-- NUTRITION (8)
('IMC', 'Indice de Masse Corporelle. Se calcule : Poids (kg) / Taille (m)². Normal : 18.5-24.9. Surpoids : 25-29.9. Obésité : >= 30. Limites : ne distingue pas masse grasse et masse maigre.', 'nutrition', ARRAY['Obésité','Dénutrition','Poids'], '11111111-1111-1111-1111-111111111103'),
('ANC', 'Apports Nutritionnels Conseillés. Valeurs de référence couvrant les besoins de 97,5% de la population. Remplacés progressivement par les RNP (Références Nutritionnelles pour la Population).', 'nutrition', ARRAY['RNP','BNM','Micronutriments'], '11111111-1111-1111-1111-111111111104'),
('NAP', 'Niveau d''Activité Physique. Coefficient multiplicateur du métabolisme de base pour estimer la dépense énergétique totale. Varie de 1.2 (alité) à 2.2 (sportif intense).', 'nutrition', ARRAY['Métabolisme basal','Dépense énergétique','BET'], '11111111-1111-1111-1111-111111111104'),
('Fibres alimentaires', 'Polysaccharides végétaux non digestibles par les enzymes humaines. Solubles (pectine, inuline) et insolubles (cellulose). Recommandation : 25-30 g/jour. Rôle dans le transit et la satiété.', 'nutrition', ARRAY['Glucides','Transit','Microbiote intestinal'], '11111111-1111-1111-1111-111111111104'),
('Acides gras essentiels', 'Acides gras que l''organisme ne peut pas synthétiser : acide linoléique (oméga-6) et acide alpha-linolénique (oméga-3). Doivent être apportés par l''alimentation.', 'nutrition', ARRAY['Lipides','Oméga-3','Oméga-6'], '11111111-1111-1111-1111-111111111104'),
('Fer héminique', 'Forme de fer présente dans les aliments d''origine animale (viande, poisson). Mieux absorbé (20-25%) que le fer non héminique végétal (5-10%).', 'nutrition', ARRAY['Anémie','Fer non héminique','Hémoglobine'], '11111111-1111-1111-1111-111111111104'),
('Index glycémique', 'Capacité d''un aliment glucidique à élever la glycémie après ingestion, par rapport au glucose pur (IG=100). IG bas < 55, moyen 55-70, élevé > 70.', 'nutrition', ARRAY['Glycémie','Glucides','Charge glycémique'], '11111111-1111-1111-1111-111111111104'),
('Biodisponibilité', 'Fraction d''un nutriment ingéré qui est effectivement absorbée et utilisée par l''organisme. Dépend de la matrice alimentaire, des interactions entre nutriments et de l''état physiologique.', 'nutrition', ARRAY['Absorption intestinale','Fer héminique','Calcium'], '11111111-1111-1111-1111-111111111104'),

-- ALIMENTATION (6)
('HACCP', 'Hazard Analysis Critical Control Point. Méthode systématique d''identification, d''évaluation et de maîtrise des dangers en sécurité alimentaire. Obligatoire en restauration collective.', 'alimentation', ARRAY['CCP','Hygiène alimentaire','TIAC'], '11111111-1111-1111-1111-111111111104'),
('GEMRCN', 'Groupe d''Étude des Marchés de Restauration Collective et de Nutrition. Recommandations sur la fréquence de service des plats en restauration collective (grammages, fréquences).', 'alimentation', ARRAY['Restauration collective','Plan alimentaire','Grammages'], '11111111-1111-1111-1111-111111111104'),
('TIAC', 'Toxi-Infection Alimentaire Collective. Survenue d''au moins 2 cas groupés d''une symptomatologie similaire liée à une même origine alimentaire. Déclaration obligatoire à l''ARS.', 'alimentation', ARRAY['HACCP','Hygiène alimentaire','Salmonelle'], '11111111-1111-1111-1111-111111111104'),
('Texture modifiée', 'Adaptation de la consistance des aliments pour les personnes ayant des troubles de la déglutition. Niveaux : haché, mouliné, mixé lisse. Codification IDDSI internationale.', 'alimentation', ARRAY['Dysphagie','Déglutition','IDDSI'], '11111111-1111-1111-1111-111111111104'),
('Plan alimentaire', 'Document de planification des menus en restauration collective. Respecte les fréquences GEMRCN, l''équilibre nutritionnel et les contraintes budgétaires sur un cycle de 4-5 semaines.', 'alimentation', ARRAY['GEMRCN','Restauration collective','Menu'], '11111111-1111-1111-1111-111111111104'),
('Régime sans résidu', 'Régime excluant les fibres alimentaires, le lactose et les aliments irritants. Prescrit avant une coloscopie ou en phase aiguë de MICI. Temporaire et non équilibré.', 'alimentation', ARRAY['Fibres alimentaires','MICI','Coloscopie'], '11111111-1111-1111-1111-111111111104'),

-- SANTÉ PUBLIQUE (5)
('PNNS', 'Programme National Nutrition Santé. Programme de santé publique français visant à améliorer l''état nutritionnel de la population. Repères : 5 fruits et légumes/jour, activité physique 30 min/jour.', 'sante_publique', ARRAY['Santé publique','Prévention','Nutrition'], '11111111-1111-1111-1111-111111111105'),
('ETP', 'Éducation Thérapeutique du Patient. Démarche structurée visant à aider le patient à acquérir des compétences d''auto-soin pour gérer sa maladie au quotidien.', 'sante_publique', ARRAY['Patient','Compétences','Observance'], '11111111-1111-1111-1111-111111111105'),
('Prévalence', 'Nombre total de cas d''une maladie dans une population à un instant donné, rapporté à l''effectif de cette population. S''exprime en pourcentage ou pour 100 000 habitants.', 'sante_publique', ARRAY['Incidence','Épidémiologie','Morbidité'], '11111111-1111-1111-1111-111111111105'),
('Nutri-Score', 'Logo nutritionnel à 5 niveaux (A vert à E rouge) apposé sur les emballages. Calcule un score basé sur les nutriments favorables et défavorables pour 100 g de produit.', 'sante_publique', ARRAY['Étiquetage nutritionnel','PNNS','Prévention'], '11111111-1111-1111-1111-111111111105'),
('Déterminants de santé', 'Facteurs qui influencent l''état de santé d''un individu ou d''une population : biologiques, comportementaux, environnementaux, socio-économiques et liés au système de soins.', 'sante_publique', ARRAY['Prévention','Santé publique','Inégalités de santé'], '11111111-1111-1111-1111-111111111105'),

-- RÉGLEMENTATION (4)
('CLAN', 'Comité de Liaison Alimentation Nutrition. Instance pluridisciplinaire hospitalière chargée de la politique nutritionnelle de l''établissement. Associe médecins, diététiciens, pharmaciens et cuisiniers.', 'reglementation', ARRAY['Hôpital','Restauration collective','Dénutrition'], '11111111-1111-1111-1111-111111111105'),
('PMS', 'Plan de Maîtrise Sanitaire. Document décrivant les mesures d''hygiène mises en place par un établissement alimentaire : bonnes pratiques, plan HACCP, traçabilité, gestion des non-conformités.', 'reglementation', ARRAY['HACCP','Hygiène alimentaire','Agrément sanitaire'], '11111111-1111-1111-1111-111111111104'),
('Allégation nutritionnelle', 'Mention sur un emballage indiquant qu''un aliment possède des propriétés nutritionnelles bénéfiques (ex : « riche en fibres », « source de calcium »). Encadrée par le règlement CE 1924/2006.', 'reglementation', ARRAY['Étiquetage nutritionnel','Nutri-Score','Réglementation'], '11111111-1111-1111-1111-111111111104'),
('Secret professionnel', 'Obligation légale du diététicien de ne pas divulguer les informations médicales et personnelles du patient. Inscrit dans le Code de la santé publique (art. L.1110-4).', 'reglementation', ARRAY['Éthique','Patient','Déontologie'], '11111111-1111-1111-1111-111111111103')
;
