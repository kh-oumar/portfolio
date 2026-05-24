import { Component, HostListener, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

type MajorTask = {
  title: string;
  context: string;
  steps: string[];
  result: string;
  learning?: string;
};

// === Rich (v2) sub-types. Contenu riche, plus humain ===
type ActorEntry = {
  role: string;
  name?: string;
  description: string;
};

type RichStep = {
  title: string;
  description?: string;
  bullets: string[];
  annexLink?: boolean;   // si true, affiche un bouton "Voir les annexes" qui scrolle vers la section annexes
};

type AnnexGroup = {
  label: string;          // ex: "Airdroped V2"
  description?: string;
  images: string[];
};

type RichAnnexes = {
  title?: string;          // titre de la section (défaut: "Annexes")
  description?: string;    // intro courte
  groups: AnnexGroup[];
};

type StackEntry = {
  label: string;
  value: string;
};

type RichContext = {
  period: string;
  framework: string;
  mode: string;
  team: ActorEntry[];
  organization?: string[];
  stack: StackEntry[];
  stakes?: string[];
  risks?: string[];
};

type RichResults = {
  personal: { technical: string[]; organizational: string[]; conclusion: string };
  business: { achievements: string[]; satisfaction: string[]; conclusion: string };
};

type RichAftermath = {
  immediate?: string[];
  distant?: string[];
  today?: string[];
};

type KeyMetric = {
  value: string;
  label: string;
};

type CritiquePoint = {
  title: string;
  body: string;
  type?: 'lesson' | 'takeaway';   // omis = lesson par défaut
};

type ProjectRichContent = {
  // Optionnels. Différencient visuellement la page
  theme?: 'default' | 'emerald' | 'amber' | 'violet' | 'sky' | 'gold' | 'peach';
  tagline?: string;            // sous-titre éditorial sous le H1
  keyMetrics?: KeyMetric[];    // bandeau de chiffres-clés
  // Sections obligatoires (couvrent la grille d'évaluation)
  presentation: string[];      // multi-paragraphes
  objectives: string[];        // bullets
  context: RichContext;
  steps: RichStep[];
  actors: ActorEntry[];
  results: RichResults;
  aftermath?: RichAftermath;
  critique: CritiquePoint[];   // points structurés (titre + body)
  annexes?: RichAnnexes;       // galerie d'annexes (ex: comparaison V2/V3)
};

type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  logo?: string;
  url?: string;            // lien vers le projet en ligne (affiché dans le header)
  previewImages?: string[]; // captures pour projets pas encore en ligne (galerie + lightbox)
  presentation: string;
  objectives: { context: string; goals: string; challenges: string; risks: string };
  steps: string[];
  actors: string;
  results: { personal: string; business: string };
  future: string;
  critique: string;
  relatedSkills?: string[];
  majorTasks?: MajorTask[];

  // v2. Quand `rich` est présent, on rend le nouveau layout détaillé
  rich?: ProjectRichContent;
};

const projectsData: Record<string, Project> = {
  'portfolio': {
    title: 'Portfolio - Site Vitrine Technique',
    description: "Portfolio technique présentant mes projets et compétences avec une architecture Angular moderne.",
    tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'SCSS', 'Signals', 'Standalone Components', 'GitHub Pages'],
    year: '2025-2026',
    logo: 'assets/logos/portfolio.png',
    presentation: "Ce portfolio est un projet technique à part entière qui démontre ma maîtrise d'Angular et des bonnes pratiques frontend modernes. Le site est construit from scratch avec Angular 20 en utilisant les dernières fonctionnalités du framework : standalone components (sans NgModules), signals pour la réactivité, et lazy loading pour les performances.\n\nL'architecture est pensée pour être data-driven : chaque compétence et chaque projet est défini comme un objet TypeScript typé, ce qui permet d'ajouter du contenu sans modifier la structure. Le design system repose sur Tailwind CSS avec une configuration personnalisée des couleurs et typographies. Les composants partagés (SkillCard, ProjectCard, BadgeChip) assurent la cohérence visuelle sur l'ensemble du site.\n\nJ'ai enrichi progressivement chaque page pour créer une structure réutilisable, maintenable et performante, avec une attention particulière portée à l'accessibilité (rôles ARIA, navigation clavier) et au responsive design (mobile-first).",
    objectives: {
      context: "Besoin d'un portfolio qui dépasse le simple site vitrine pour devenir une démonstration technique de mes compétences. Le portfolio doit présenter 10 compétences professionnelles avec des fiches détaillées (définition, anecdotes STAR, autocritique, évolution) et 5 projets avec un contenu approfondi.",
      goals: "Présenter mes compétences et projets de façon structurée et professionnelle. Démontrer ma maîtrise d'Angular moderne, du frontend et d'une architecture propre. Créer une base technique extensible qui sert de référence pour mes candidatures.",
      challenges: "Concevoir une architecture data-driven qui supporte 10 compétences et 5 projets avec des pages détaillées sans duplication de code. Maintenir l'équilibre entre richesse du contenu et performances de chargement. Créer des templates visuellement distincts pour chaque compétence.",
      risks: "Complexifier inutilement l'architecture. Passer trop de temps sur le design au détriment du contenu. Négliger l'accessibilité et le responsive."
    },
    steps: [
      "Conception de l'architecture Angular (standalone, signals, lazy loading)",
      "Création du design system Tailwind (couleurs, typographies, composants)",
      "Développement des composants partagés (SkillCard, ProjectCard, BadgeChip)",
      "Rédaction et structuration du contenu (10 compétences, 5 projets)",
      "Création des templates visuellement distincts par compétence",
      "Optimisations SEO, accessibilité et performances",
      "Mise en ligne et déploiement automatique via GitHub Pages"
    ],
    actors: "Projet réalisé intégralement seul. Retours de développeurs et de professionnels pour valider la clarté du contenu et la qualité technique.",
    results: {
      personal: "Ce portfolio m'a fait progresser en Angular 20. Standalone components, signals, lazy loading, j'utilise tout ça au quotidien maintenant. J'ai aussi appris à construire un vrai design system avec Tailwind. Et surtout, rédiger des fiches compétences STAR m'a forcé à prendre du recul sur mon parcours.",
      business: "Le portfolio est utilisé dans toutes mes candidatures. 10 fiches compétences détaillées, 5 projets approfondis. Les recruteurs remarquent la qualité technique et la profondeur du contenu. Le site lui-même est la meilleure preuve de ce qu'il décrit."
    },
    future: "Ajout d'un système de gestion de contenu externe (JSON ou CMS headless) pour séparer les données du code. Amélioration continue du SEO et des performances. Ajout de fonctionnalités interactives (animations de transition, mode sombre avancé).",
    critique: "J'aurais dû séparer les données du code dès le départ : le contenu des compétences et projets est actuellement intégré directement dans les composants TypeScript, ce qui rend les mises à jour moins pratiques. L'architecture data-driven fonctionne mais aurait gagné à utiliser un service dédié avec des fichiers JSON externes. J'ai aussi sous-estimé le temps nécessaire pour rédiger un contenu de qualité : les anecdotes STAR et les descriptions détaillées représentent une part importante du travail total. La prochaine itération devra intégrer cette leçon en prévoyant du temps dédié à la rédaction.",
    relatedSkills: ['angular', 'optimisation-ux'],
    majorTasks: [
      {
        title: "1. Architecture Angular moderne (standalone + signals)",
        context: "Concevoir une base technique propre et performante avec les dernières fonctionnalités d'Angular, sans NgModules traditionnels.",
        steps: [
          "Initialisation du projet Angular 20 avec standalone components",
          "Configuration du routing avec lazy loading de toutes les pages",
          "Mise en place de signals pour la gestion d'état (filtres compétences, modales)",
          "Définition des interfaces TypeScript pour les données (Skill, Project, SkillDetail)",
          "Structuration en couches : pages, shared, core, layout"
        ],
        result: "Architecture claire et performante. Chargement initial rapide grâce au lazy loading. Typage strict sur l'ensemble du projet avec zéro erreur TypeScript. Ajout de nouveau contenu en quelques minutes.",
        learning: "Les standalone components simplifient l'architecture Angular. Fini les NgModules inutiles. Le typage TypeScript strict dès le départ, c'est ce qui m'a évité le plus de bugs. Et la séparation en couches rend le code navigable même après des mois."
      },
      {
        title: "2. Design system Tailwind et composants réutilisables",
        context: "Créer un design cohérent et des composants partagés pour assurer l'homogénéité visuelle sur les pages compétences, projets et détails.",
        steps: [
          "Configuration Tailwind avec palette de couleurs, typographies et espacements personnalisés",
          "Création de SkillCard : logo, nom, badge catégorie, barre de progression, lien routé",
          "Création de ProjectCard : logo, titre, description, tags, année",
          "Création de BadgeChip : variantes tech/human avec styles différenciés",
          "Implémentation du responsive mobile-first et des états d'accessibilité (ARIA, focus)"
        ],
        result: "Cohérence visuelle sur l'ensemble du site. Composants réutilisés sur plusieurs pages sans duplication. Design responsive fonctionnel sur mobile, tablette et desktop.",
        learning: "Un bon design system fait gagner un temps fou sur les nouvelles pages. Le mobile-first force à prioriser le contenu essentiel. Et les rôles ARIA, il faut les penser dès la conception du composant, pas les ajouter après."
      },
      {
        title: "3. Pages compétences avec templates uniques",
        context: "Chaque compétence doit avoir une fiche détaillée avec un header visuellement distinct pour différencier les compétences entre elles.",
        steps: [
          "Création des 10 fiches compétences avec contenu STAR complet",
          "Implémentation du @switch Angular pour router vers 10 headers visuellement uniques",
          "Configuration de couleurs et accents spécifiques par compétence (Symfony violet, Angular rouge, etc.)",
          "Intégration des icônes Lucide pour les compétences sans logo (sécurisation, données, UX, agile, autonomie, vision)",
          "Structure commune des 6 sections obligatoires avec mise en forme enrichie"
        ],
        result: "10 pages compétences avec des identités visuelles distinctes. Navigation fluide entre compétences et projets associés. Contenu riche et structuré en format STAR.",
        learning: "Le @switch Angular permet de personnaliser visuellement sans dupliquer la logique. Les gradients et accents de couleur suffisent à créer des identités visuelles fortes sans surcharger le design."
      },
      {
        title: "4. Pages projets approfondies",
        context: "Chaque projet doit être présenté avec un contenu riche : présentation, objectifs, tâches majeures détaillées, résultats et regard critique.",
        steps: [
          "Structuration du contenu de 5 projets (MacWay, VenaLabs, FollowDeen, WeDriv, Portfolio)",
          "Rédaction des présentations enrichies avec contexte business et technique",
          "Détail des tâches majeures avec étapes, résultats et apprentissages",
          "Ajout des références croisées compétences ↔ projets",
          "Intégration des métriques et chiffres concrets pour chaque projet"
        ],
        result: "5 pages projets complètes avec présentation, objectifs, tâches majeures, résultats et critique. Navigation circulaire entre projets et compétences.",
        learning: "Le contenu est l'élément le plus important d'un portfolio : une architecture technique parfaite avec un contenu superficiel n'a pas de valeur. Prévoir du temps dédié à la rédaction."
      },
      {
        title: "5. SEO, accessibilité et déploiement",
        context: "Rendre le site accessible, performant et visible en production.",
        steps: [
          "Optimisation SEO : balises meta, structure HTML sémantique, titres hiérarchisés",
          "Accessibilité : rôles ARIA, navigation clavier, contraste de couleurs WCAG",
          "Performance : lazy loading des routes, optimisation des images, tree-shaking",
          "Configuration GitHub Pages avec déploiement automatique",
          "Tests manuels sur mobile, tablette et desktop"
        ],
        result: "Site accessible et performant en production. Déploiement automatique à chaque mise à jour. Bonnes métriques Lighthouse.",
        learning: "Le SEO et l'accessibilité doivent être intégrés dès la conception, pas ajoutés après coup. L'automatisation du déploiement élimine les erreurs manuelles et accélère les itérations."
      }
    ],

    // === RICH CONTENT (v2 layout). Méta-projet Angular, identité par défaut (bleu portfolio) ===
    rich: {
      theme: 'default',
      tagline: "Le projet que tu es en train de lire. Mon premier vrai projet Angular, et le miroir de tout ce que j'ai appris ailleurs.",
      presentation: [
        "Ce portfolio est le projet que tu es en train de lire. C'est à la fois la vitrine de mon parcours et un projet à part entière, pensé pour valider mon cursus tout en me servant pour mes candidatures.",
        "C'est aussi mon premier vrai projet Angular. Je l'avais croisé pendant mes études, mais jamais sur quelque chose d'ambitieux. Repartir dessus m'a obligé à réapprendre des automatismes que j'avais pris ailleurs, à sortir du mode automatique. C'est inconfortable au début, et c'est précisément pour ça que j'ai voulu y passer du temps.",
        "Le travail le plus dur n'a pas été le code, mais la rédaction. Reprendre chacun de mes projets un par un, pour les raconter avec la même structure, m'a forcé à prendre du recul sur tout mon parcours. C'est en réécrivant que j'ai vu des fils rouges que je n'avais pas conscientisés, des réflexes qui se répondent d'un projet au suivant, des choses apprises quelque part qui resservent ailleurs. Ce portfolio est donc autant un exercice technique qu'un exercice d'introspection. Et c'est cette double dimension qui en fait le projet le plus formateur de la liste, contre toute attente."
      ],
      objectives: [
        "Construire un portfolio qui ne soit pas qu'une vitrine, mais aussi une démonstration de ce que je sais faire",
        "M'approprier Angular pour de vrai, plutôt que d'en rester à des connaissances scolaires",
        "Concevoir un site facile à faire évoluer : ajouter un projet ou une compétence doit prendre quelques minutes, pas une refonte",
        "Reprendre chaque projet en profondeur, avec une structure cohérente d'un bout à l'autre du site",
        "Tirer un fil de cohérence sur tout mon parcours, identifier ce que j'ai appris où, et ce que j'en garde aujourd'hui",
        "Livrer un site rapide, lisible et propre, qui me serve sur la durée pour mes candidatures"
      ],
      context: {
        period: "Janvier 2026 à Mai 2026, en parallèle de l'école et de mon alternance",
        framework: "Projet personnel, en lien avec mon cursus pour la validation des compétences",
        mode: "100 % remote, sur soirs et week-ends",
        team: [
          { role: "Moi", description: "Toutes les casquettes : conception, développement, design, rédaction, mise en ligne. La partie la plus longue et la plus formatrice n'a pas été le code, mais la rédaction." }
        ],
        organization: [
          "Plan de travail défini en amont : structure du site, liste des compétences, projets à reprendre",
          "Itérations courtes : un projet ou une compétence à fond avant de passer au suivant, pour ne jamais avoir un site à moitié fini",
          "Mises en ligne progressives à chaque jalon validé, plutôt qu'en gros lots",
          "Auto-relecture systématique à 24h d'intervalle pour rattraper ce que j'écris dans le rush",
          "Recherche d'inspiration sur d'autres portfolios professionnels pour valider les choix de structure et de ton"
        ],
        stack: [
          { label: "Framework principal", value: "Angular dans sa version récente" },
          { label: "Langage", value: "TypeScript en mode strict, pour attraper les erreurs avant qu'elles arrivent en ligne" },
          { label: "Style", value: "Tailwind pour aller vite sur l'essentiel, SCSS pour les composants spécifiques" },
          { label: "Système de thèmes", value: "Chaque projet a sa propre couleur sans dupliquer le style. Une variable change, tout suit" },
          { label: "Routing", value: "Chargement à la demande : chaque page n'apporte que ce dont elle a besoin" },
          { label: "Hébergement", value: "GitHub Pages avec déploiement automatique à chaque mise à jour validée" },
        ],
        stakes: [
          "Valider les compétences attendues par mon cursus avec un projet réel",
          "Crédibiliser mon profil pour mes candidatures. Un portfolio bien fait pèse plus que dix lignes de CV",
          "Obtenir un actif personnel qui me servira plusieurs années, et que je pourrai faire évoluer",
          "Tirer du sens de mon parcours en le racontant avec recul, plutôt que d'aligner des projets sans fil conducteur"
        ],
        risks: [
          "Passer trop de temps sur le design ou la technique au détriment du contenu, qui reste le cœur du portfolio",
          "Sur-architecturer un projet qui n'en avait pas besoin",
          "Sous-estimer le temps de rédaction. C'est arrivé, et c'est ce qui a pris le plus de temps au final",
          "Perdre la cohérence visuelle en multipliant les variations entre projets et compétences"
        ]
      },
      steps: [
        {
          title: "Cadrage et premières décisions",
          description: "Poser les fondations du site et le périmètre du contenu",
          bullets: [
            "Définition du périmètre : dix compétences à présenter, cinq projets à reprendre, sept notions à couvrir par projet",
            "Choix d'Angular comme socle technique, en sachant que j'allais devoir l'apprendre en chemin",
            "Décision dès le départ d'un site où ajouter du contenu n'oblige pas à toucher à la structure",
            "Mise en place de la grille graphique et des règles de ton avant d'écrire la première ligne"
          ]
        },
        {
          title: "Apprentissage d'Angular et premières pages",
          description: "Se réapproprier un framework qu'on connaît mal sur un projet ambitieux",
          bullets: [
            "Lecture de la documentation officielle pour comprendre comment Angular se pense aujourd'hui",
            "Petits exercices pour me familiariser avec les nouvelles syntaxes avant de me lancer sur le vrai site",
            "Construction de la page d'accueil en partant des fondamentaux, pour valider ma compréhension avant de produire en série",
            "Mise en place de la navigation et du chargement à la demande, pour que le site reste léger"
          ]
        },
        {
          title: "Composants partagés et système de thèmes",
          description: "Construire les briques de base et le moteur visuel qui rend chaque projet unique",
          bullets: [
            "Conception de la carte projet : logo, titre, description, étiquettes avec un comportement propre quand il y en a trop",
            "Conception de la carte compétence : logo ou icône, nom, catégorie, niveau de maîtrise",
            "Système de thèmes par couleurs : chaque projet peut imposer son ambiance sans dupliquer le style",
            "Accessibilité prise en compte dès la conception, pas ajoutée à la fin"
          ]
        },
        {
          title: "Pages détaillées des compétences",
          description: "Dix fiches compétences avec une identité visuelle propre à chacune",
          bullets: [
            "Définition d'une structure commune à toutes les fiches, du même format mais avec assez d'espace pour le ton personnel",
            "Couleurs et accents spécifiques par compétence, pour les différencier sans casser la cohérence d'ensemble",
            "Icônes intégrées pour les compétences qui n'ont pas de logo officiel",
            "Rédaction des dix fiches avec une vraie autocritique sur chacune"
          ]
        },
        {
          title: "Pages détaillées des projets",
          description: "La partie qui a pris le plus de temps : reprendre chaque projet en profondeur",
          bullets: [
            "Conception d'un format unifié couvrant les sept notions exigées par le cursus, sans en faire un formulaire à remplir",
            "Migration progressive de chaque projet vers ce format, avec une vraie réflexion personnelle sur chacun",
            "Cohérence du ton sur tous les projets : personnel, lucide, sans jargon inutile"
          ]
        },
        {
          title: "Finitions et mise en ligne",
          description: "Polish et passage en production",
          bullets: [
            "Optimisations pour le référencement et la lisibilité, sans surcharger les pages",
            "Accessibilité validée : navigation au clavier, contraste, lecture d'écran",
            "Site léger et rapide, même sur une connexion lente",
            "Déploiement automatique à chaque mise à jour validée",
            "Tests sur téléphone, tablette et ordinateur avant publication"
          ]
        }
      ],
      actors: [
        {
          role: "Moi (porteur unique)",
          description: "J'étais seul aux commandes sur ce projet. Conception, design, développement, rédaction, mise en ligne. La spécificité, c'est que j'étais à la fois le développeur et le sujet. Chaque ligne parle d'expériences que j'ai vécues, ce qui rend la rédaction plus exigeante que sur un projet client."
        },
        {
          role: "Famille et amis (relectures et conseils)",
          description: "Sollicités à différents moments pour relire les pages et me donner leur avis. Leurs retours étaient précieux quand ils ne comprenaient pas une phrase ou un terme. C'était le signe que je devais simplifier. C'est grâce à eux que j'ai banni plusieurs jargons. Un portfolio doit rester lisible par un recruteur non-tech."
        },
        {
          role: "Professeurs et accompagnants de mon école professionnelle (conseils et suivi)",
          description: "Les professeurs et les personnes qui me suivent à l'école m'ont apporté un œil calibré sur les attentes du cursus. Leurs conseils ont porté sur la profondeur du contenu, la structure des fiches, et les passages qui méritaient d'être enrichis."
        }
      ],
      results: {
        personal: {
          technical: [
            "Première vraie maîtrise d'Angular, acquise sur un projet complet plutôt que sur des exercices isolés",
            "Un site pensé pour évoluer : ajouter un projet ou une compétence est désormais une affaire de quelques minutes",
            "Un système de thèmes qui rend chaque projet visuellement unique sans dupliquer le code"
          ],
          organizational: [
            "Capacité à mener un projet long en parallèle de l'école et de l'alternance, sans le sacrifier aux deux",
            "Discipline d'écriture : reprendre cinq projets un par un avec la même exigence, sans bâcler les derniers",
            "Auto-relecture systématique et passage par des relecteurs externes pour rattraper ce que je ne voyais plus"
          ],
          conclusion: "Le code m'a appris Angular. La rédaction m'a appris autre chose, de moins attendu : savoir parler de mon propre travail. C'est ce que je garde de ce projet."
        },
        business: {
          achievements: [
            "Dix fiches compétences détaillées, chacune avec sa propre identité visuelle",
            "Cinq projets approfondis avec une structure unifiée couvrant les sept notions du cursus",
            "Site déployé en production, mis à jour automatiquement, prêt à servir mes candidatures"
          ],
          satisfaction: [
            "Validation positive du contenu par des proches non-tech : preuve de lisibilité",
            "Validation positive par les professeurs et accompagnants de mon école professionnelle, qui confirme que le format et le ton sont en phase avec les attentes du cursus",
            "Pas d'écart entre la promesse et la livraison. Le site lui-même est la preuve de ce qu'il décrit"
          ],
          conclusion: "Ce portfolio est un actif construit pour durer. Chaque nouveau projet ou compétence est une question de contenu, pas de refonte. C'est exactement ce qui m'aurait manqué si j'avais bâclé les fondations."
        }
      },
      aftermath: {
        immediate: [
          "Mise en ligne définitive et déploiement automatique en place",
          "Diffusion auprès de mon réseau : LinkedIn, anciens collègues, recruteurs avec qui j'étais en discussion",
          "Relecture finale par quelques personnes de confiance pour rattraper les dernières typos"
        ],
        distant: [
          "Sortir le contenu du code pour pouvoir corriger une phrase sans repasser par une mise en production",
          "Section journal pour publier de courts retours d'expérience entre deux projets",
          "Version anglaise si je vise des opportunités à l'étranger"
        ],
        today: [
          "Le portfolio est en ligne et utilisé activement pour mes candidatures",
          "L'architecture me permet d'ajouter un nouveau projet rapidement",
          "Le site reste vivant : je le retouche dès qu'un projet avance ou qu'une compétence se précise, sans jamais repartir de zéro"
        ]
      },
      critique: [
        {
          type: 'lesson',
          title: "J'ai sous-estimé le temps de rédaction",
          body: "Au départ, j'ai pensé ce projet comme un projet technique. Sauf que reprendre cinq projets en profondeur, écrire dix fiches compétences, formuler une autocritique honnête sur chaque sujet, c'est long. Beaucoup plus long que de coder. À refaire, je donnerais autant de poids à la rédaction qu'à la technique dans le planning, et je commencerais probablement par elle."
        },
        {
          type: 'lesson',
          title: "Parler de soi est un exercice à part entière",
          body: "En tant que développeur, on est entraîné à parler du code, pas de soi. Sur ce portfolio, j'ai dû passer de l'autre côté. Choisir le bon angle, la bonne longueur, le bon niveau de recul sans tomber dans la fausse modestie ni dans l'auto-promo. C'est probablement la chose la plus difficile du projet."
        },
        {
          type: 'lesson',
          title: "Auto-relire à 24h d'intervalle change tout",
          body: "Plusieurs paragraphes que je trouvais clairs le soir me paraissaient confus le lendemain. Ce décalage d'une journée me rapproche du regard d'un lecteur qui découvre le texte pour la première fois. Je ne mets plus rien en ligne sans cette relecture à froid. C'est le filtre le plus simple et le plus efficace que j'aie trouvé contre les phrases bâclées."
        },
        {
          type: 'takeaway',
          title: "Le vrai apprentissage, c'était le recul sur tout mon parcours",
          body: "En racontant chaque projet avec la même grille, j'ai vu apparaître des fils rouges que je n'avais jamais formulés. Le passage du code d'école au code de production. La rigueur de validation manuelle qui revient sur mes projets solo. Les réflexes que je traîne d'un projet au suivant, et que je n'avais jamais nommés. Ce regard d'ensemble sur mon propre parcours, c'est précisément ce que cet exercice de portfolio m'a apporté."
        },
      ]
    }
  },

  'venalabs': {
    title: 'VenaLabs',
    description: "VenaLabs est une plateforme française d'éducation au Web3 (cours crypto, farming d'airdrops, abonnement premium). J'y ai passé un an en alternance, comme développeur puis lead developer sur la dernière période.",
    tags: ['Java', 'Spring Boot', 'Next.js', 'TypeScript', 'MongoDB', 'Tailwind', 'Web3', 'Gamification', 'Lead developer'],
    year: '2025-2026',
    logo: 'assets/logos/venalabs.png',
    url: 'https://venalabs.com',
    presentation: "VenaLabs est une plateforme française d'éducation au Web3. Elle propose des cours pensés pour les débutants, du contenu autour de l'écosystème crypto, du farming d'airdrops et un abonnement premium. L'idée est d'aider des gens qui découvrent ce monde à se l'approprier sans se faire happer par sa complexité.\n\nJ'y ai passé un an en alternance. L'équipe tech était réduite : moi, une autre alternante plutôt orientée frontend, et notre maître d'apprentissage qui pilotait l'équipe. Autour de nous, une équipe Business en charge des cours et des partenariats, et une équipe Marketing pour la communication. On travaillait principalement à distance, avec des bureaux virtuels sur l'application Work Adventure (l'équivalent d'un open space dans lequel on se croise, où on peut se voir et se parler) et des réunions tous les jours pour caler le travail. Une organisation à taille humaine, avec une vraie proximité entre les équipes.\n\nLe Web3 et la crypto, je n'y connaissais rien en arrivant. Les premières semaines n'ont pas été un défi technique, mais un défi de vocabulaire et de compréhension. Tout un univers avec ses propres mots, ses propres usages, ses propres attentes. J'ai dû apprendre ce que le produit faisait vraiment, à qui il s'adressait, et pourquoi sa communauté venait sur ce genre de plateforme. Sans cette compréhension, le code que je livrais n'aurait pas eu de sens.\n\nLes premiers mois, j'ai contribué à la V2 du produit, qui existait déjà à mon arrivée. Mes premières features ont été côté gamification, notamment un système de classement des utilisateurs par points obtenus, et d'autres fonctionnalités plus petites qui m'ont permis de rentrer dans le code et dans le produit. J'arrivais avec déjà plusieurs années d'expérience derrière moi, tandis que l'autre alternante était encore en licence. Cette différence d'expérience a naturellement pesé dans la suite.\n\nDans les trois à quatre derniers mois, mon maître d'apprentissage a quitté l'entreprise. J'ai naturellement repris son rôle. Les déploiements, la planification technique, les décisions d'architecture, tout est venu sur moi. C'est moi qui planifiais et qui priorisais ce qui était important, en toujours en restant en réunion avec toute l'équipe (pas uniquement la tech) pour valider la direction. Et c'est aussi pendant cette période que j'ai pris le temps d'accompagner l'autre alternante, plus juniore, pour la guider sur ses tâches du quotidien. C'est dans cette période que la grande refonte V3 a pris forme : le chantier le plus structurant que j'ai conduit, et celui qui m'a vraiment fait basculer dans la posture de lead.",
    objectives: {
      context: "Alternance d'un an dans une équipe tech réduite (moi, une autre alternante encore en licence, plutôt orientée frontend, et notre maître d'apprentissage qui pilotait l'équipe), avec les équipes Business et Marketing autour. Travail principalement à distance, avec des bureaux virtuels sur Work Adventure et des réunions tous les jours. Le produit existait déjà en V2 à mon arrivée. J'arrivais sans aucune notion du Web3 ni du vocabulaire crypto, mais avec déjà plusieurs années d'expérience en développement derrière moi.",
      goals: "M'intégrer dans une équipe tech sur un produit en production. Apprendre le Web3 et son langage from scratch. Contribuer à la V2 existante avec des features de gamification (notamment un système de classement par points). Sur la dernière partie de l'année, après le départ de mon maître d'apprentissage, reprendre la responsabilité technique de l'équipe, accompagner l'autre alternante plus juniore, et conduire la grande refonte V3.",
      challenges: "Apprendre tout un univers en parallèle des premiers tickets, sans bloquer la livraison. Tenir la qualité côté V2 pendant que la V3 se prépare. Reprendre le rôle de lead sans transition formelle, suite au départ de mon maître d'apprentissage. Accompagner l'autre alternante, encore en licence, sur ses tâches du quotidien.",
      risks: "Courbe d'apprentissage Web3 freinant les premières semaines. Continuité de l'équipe fragilisée par le départ du maître d'apprentissage. Difficulté à doser l'accompagnement de l'autre alternante sans freiner mes propres livrables. Dérive du chantier V3 si l'architecture n'était pas posée tôt."
    },
    steps: [
      "Premières semaines d'onboarding : apprentissage du vocabulaire crypto, compréhension du produit et de sa communauté",
      "Contributions à la V2 : système de classement des utilisateurs par points obtenus et autres features de gamification",
      "Travail à distance avec bureaux virtuels Work Adventure et réunions tous les jours avec toute l'équipe",
      "Prise du rôle de lead developer dans les derniers mois suite au départ du maître d'apprentissage",
      "Conduite de la refonte V3 : architecture, design system avec la designeuse freelance, nouvelles features signature",
      "Planification, priorisation et déploiements, en validant la direction en réunion avec toute l'équipe (pas seulement la tech)",
      "Accompagnement de l'autre alternante (en licence) sur ses tâches du quotidien"
    ],
    actors: "Équipe tech réduite (moi, une autre alternante encore en licence et plutôt orientée frontend, et notre maître d'apprentissage qui a quitté l'entreprise dans la dernière partie de l'année), une designeuse freelance engagée pour la refonte V3, une équipe Business (cours et partenariats) et une équipe Marketing (communication, réseaux sociaux). Travail principalement à distance avec des bureaux virtuels Work Adventure pour se voir et se parler au quotidien, et des réunions tous les jours avec toute l'équipe. Dans les derniers mois, prise de la planification et des décisions techniques, en restant systématiquement en réunion avec toute l'équipe pour valider la direction.",
    results: {
      personal: "Cette année m'a fait passer du dev qui exécute au lead qui assume les décisions techniques de l'équipe. Sur le plan technique, j'ai progressé sur tout : Java et Spring Boot en production, Next.js, MongoDB, et tout l'univers Web3 que j'ai appris from scratch. Sur le plan humain, j'ai appris à coordonner, à arbitrer, à porter un chantier de refonte d'un bout à l'autre, et à accompagner une alternante plus juniore. La confiance que l'équipe m'a accordée pour reprendre le rôle a été la validation la plus claire de cette progression.",
      business: "Les features livrées côté V2, dont le système de classement par points, ont alimenté la rétention de la plateforme pendant que la refonte se préparait. La V3 a remis le produit sur des bases solides pour les années qui suivent. La continuité technique a été préservée au départ du maître d'apprentissage, sans rupture de service ni retard sur le calendrier V3."
    },
    future: "Le travail livré pendant l'année continue d'évoluer sur la base que j'ai posée pendant la V3. Pour moi, cette alternance restera la période où j'ai vraiment basculé : du dev qui exécute des specs au dev qui conçoit, décide et coordonne. Dans un domaine que je découvrais en arrivant, ce qui rend la progression encore plus parlante.",
    critique: "La courbe d'apprentissage Web3 a été plus raide que prévu. À refaire, je structurerais mon apprentissage différemment, avec une vraie période dédiée en amont plutôt qu'au fil de l'eau. La transition vers le rôle de lead s'est faite brusquement, sans passation formelle puisque mon maître d'apprentissage partait. J'ai dû reprendre plusieurs dossiers en cours d'eau. À refaire, je demanderais un point structuré beaucoup plus tôt sur ce que je devais reprendre, plutôt que de tout découvrir au fil des semaines. Enfin, l'accompagnement de l'autre alternante m'a parfois pris plus de temps que prévu sur mes propres livrables. Avec plus de recul, j'aurais formalisé un cadre clair de revue plutôt que de répondre au fil de l'eau.",
    relatedSkills: ['spring-boot', 'react-nextjs', 'nextjs', 'docker', 'collaboration-agile', 'autonomie-resolution'],
    majorTasks: [
      {
        title: "1. Système de classement par points et premières features V2",
        context: "Mes premières contributions sur Airdroped, encore en V2 à mon arrivée. Le but : mettre en place un système de classement des utilisateurs en fonction des points qu'ils obtenaient sur la plateforme, et plus largement contribuer à la couche de gamification existante. Côté apprentissage, c'est aussi la période où je découvrais le code, le produit et tout le vocabulaire crypto en parallèle.",
        steps: [
          "Découverte de la base de code V2 et de ses conventions, en parallèle de l'apprentissage du vocabulaire crypto",
          "Conception du système de classement : récupération des points par utilisateur, agrégation et tri",
          "Mise en place de la pagination et du cache pour que le classement reste réactif avec un nombre croissant d'utilisateurs",
          "Tâche planifiée de recalcul régulier pour intégrer les nouvelles actions sans tout recalculer à chaque appel",
          "Coordination des features de gamification avec l'autre alternante via des réunions régulières"
        ],
        result: "Système de classement opérationnel et intégré au produit V2. Premières briques de gamification livrées, qui ont alimenté la rétention de la plateforme pendant que la V3 se préparait.",
        learning: "Cette première période m'a appris à entrer dans un code existant et dans un domaine inconnu en même temps. La leçon : ne pas attendre de tout comprendre avant de livrer. Apprendre en faisant, mais avec l'humilité de poser les bonnes questions au bon moment."
      },
      {
        title: "2. Prise du rôle de lead developer",
        context: "Mon maître d'apprentissage a quitté l'entreprise dans les trois à quatre derniers mois de mon alternance. J'ai naturellement repris le rôle de lead developer de l'équipe : déploiements, planification technique, arbitrages et décisions d'architecture sont passés sur moi.",
        steps: [
          "Reprise des dossiers en cours laissés par mon maître d'apprentissage (architecture en place, choix techniques engagés, livrables prévus)",
          "Prise en main des déploiements en production et des opérations techniques quotidiennes",
          "Planification des sprints et arbitrage des priorités avec l'autre alternante et les équipes Business et Marketing",
          "Décisions d'architecture sur les chantiers en cours et à venir, en particulier sur la refonte V3 qui démarrait",
          "Coordination directe avec les équipes métier sur les besoins de la plateforme (Business pour les cours et partenariats, Marketing pour la communication)"
        ],
        result: "Continuité technique préservée sans rupture pour l'équipe et pour le produit. L'équipe a continué à livrer normalement, et le calendrier de la refonte V3 a pu être tenu. La confiance qui m'a été accordée pour reprendre ce rôle a confirmé la progression acquise pendant l'année.",
        learning: "Reprendre un rôle de lead sans transition formelle, c'est apprendre à décider vite, à assumer ses choix, et à demander de l'aide intelligemment. La technique n'est qu'une partie du métier. La coordination, la priorisation et la communication en sont l'autre moitié, et cette période me l'a appris en accéléré."
      },
      {
        title: "3. Refonte V3 : architecture et design system",
        context: "Airdroped V2 vieillissait, à la fois côté visuel et côté code. La V3 a été pensée comme une refonte structurelle complète : nouvelle identité visuelle, nouvelle architecture, conventions explicites tenues d'un bout à l'autre. C'est moi qui ai porté la conception et la mise en place de cette nouvelle architecture, en coordination étroite avec la designeuse freelance engagée spécifiquement pour la refonte visuelle.",
        steps: [
          "Cadrage de l'architecture cible avec un pattern feature-based strict (api / core / comp / service / store par feature)",
          "Construction du design system V3 côté front : tokens couleur centralisés en classes Tailwind, iconographie unifiée, variantes responsive custom",
          "Définition du pattern back-end équivalent : RequestJson → Controller → Service → Model → Repository, mappers Model ↔ JSON",
          "Migration progressive des écrans et modules vers la nouvelle architecture pour éviter le big bang risqué",
          "Refonte complète de la page Discover comme hub unifié (airdrops, routines, cours) avec cards hero et filtres par écosystème",
          "Conventions de nommage explicites et documentées pour que l'équipe puisse continuer dans la même direction sans moi"
        ],
        result: "Architecture stricte tenue sur plus de 40 modules backend et plus de 200 composants V3 côté front. Nouvelle identité visuelle déployée sur toutes les surfaces. L'équipe peut ajouter une nouvelle feature en suivant un schéma clair, sans renégocier les conventions à chaque fois.",
        learning: "Sur un projet de cette ampleur, l'architecture ne se résume pas à un diagramme : c'est un ensemble de conventions tenues dans la durée. Le vrai travail de lead, c'est de poser ces conventions tôt et de les tenir même quand un sprint serre."
      },
      {
        title: "4. Battle Pass saisonnier dynamique (V3)",
        context: "Construire un système de progression saisonnier inspiré des jeux AAA, mais adapté au contexte Web3 : double track free/premium, missions à cadences multiples, claims atomiques, et surtout des saisons configurables dynamiquement sans nouveau code à chaque cycle.",
        steps: [
          "Modélisation des entités (BattlePassSeason, BattlePassTier, BattlePassMission) avec dates de début/fin et tiers progressifs",
          "Mise en place du double track : chaque palier débloque une récompense free et une récompense premium",
          "Missions à cadence multiple (daily, weekly, monthly, seasonal) avec reset automatique calculé à la demande",
          "Triggers événementiels : un service écoute les événements métier (airdrop complété, cours terminé) et incrémente la mission concernée",
          "Claims atomiques en une opération MongoDB pour empêcher toute double-distribution, sans lock applicatif",
          "Outillage admin pour que l'équipe Business puisse créer une nouvelle saison en autonomie : durée, paliers, récompenses"
        ],
        result: "Battle Pass en production, qui rythme la vie de la plateforme. L'équipe Business lance les nouvelles saisons sans solliciter la tech, en choisissant ses récompenses et son calendrier. Aucun incident de double-claim malgré le trafic.",
        learning: "Concevoir un système saisonnier vraiment dynamique demande un investissement initial plus lourd qu'une version figée. Mais c'est ce qui libère ensuite l'équipe métier et qui donne au système sa durée de vie. Penser dynamique dès le départ, c'est une décision qui paie dans la durée."
      },
      {
        title: "5. Système de boxes et drop pools (V3)",
        context: "Concevoir le moteur central de gamification : des boxes ouvrables contenant des récompenses tirées au sort selon des probabilités configurables. Huit types de récompenses possibles, des photos de profil à plusieurs tiers visuels, et un tirage qui doit rester équitable et fiable.",
        steps: [
          "Picker avec précision décimale jusqu'à 0,0001 % sur les probabilités, avec validation côté admin que la somme du pool fait exactement 100 %",
          "Huit types de drops gérés (VenaPoints, XP, coffres, fragments, streak savers, boosters, boxes imbriquées, photos de profil), chacun routé vers son service dédié",
          "Mode de quantité par drop : montant fixe ou intervalle (roll uniforme dans la plage) selon la configuration",
          "Système de photos de profil à plusieurs tiers visuels (V3 / V4 / V5) avec foils et covers, déterminés par la rareté tirée",
          "Déduplication naturelle des avatars par clé stable d'image : la même image tirée depuis plusieurs boxes ne crée qu'un seul Avatar en inventaire",
          "Effet de cascade : un drop peut être une box, qui atterrit dans l'inventaire et peut être ouverte à son tour"
        ],
        result: "Système en production, devenu le moteur de rétention de la plateforme. Probabilités configurables finement côté admin, sans risque de double-distribution ou d'incohérence des marges. Les utilisateurs ouvrent leurs boxes avec des animations soignées et un système de tiers visuels qui crée un vrai effet de collection.",
        learning: "Les systèmes de drop probabilistes sont des aimants à bugs subtils : une décimale mal arrondie ou un picker non déterministe peut casser l'équité du tirage. La rigueur sur les types et la précision décimale m'a obligé à être méthodique d'une manière nouvelle."
      }
    ],

    // === RICH CONTENT (v2 layout). Une année chez VenaLabs, thème peach. Du junior qui découvre le Web3 au lead developer de l'équipe ===
    rich: {
      theme: 'peach',
      tagline: "Du junior qui découvre le Web3 au lead developer de l'équipe, en une année d'alternance.",
      presentation: [
        "VenaLabs est une plateforme française d'éducation au Web3. Elle propose des cours pensés pour les débutants, du contenu autour de l'écosystème crypto, du farming d'airdrops et un abonnement premium. L'idée est d'aider des gens qui découvrent ce monde à se l'approprier sans se faire happer par sa complexité.",
        "J'y ai passé un an en alternance. L'équipe tech était réduite : moi, une autre alternante encore en licence et plutôt orientée frontend, et notre maître d'apprentissage qui pilotait l'équipe. Autour de nous, une équipe Business en charge des cours et des partenariats, et une équipe Marketing pour la communication. On travaillait principalement à distance, avec des bureaux virtuels sur l'application Work Adventure (l'équivalent d'un open space où on se croise, où on peut se voir et se parler) et des réunions tous les jours. Une organisation à taille humaine, avec une vraie proximité entre les équipes.",
        "Le Web3 et la crypto, je n'y connaissais rien en arrivant. Les premières semaines n'ont pas été un défi technique, mais un défi de vocabulaire et de compréhension. Tout un univers avec ses propres mots, ses propres usages, ses propres attentes. J'ai dû apprendre ce que le produit faisait vraiment, à qui il s'adressait, et pourquoi sa communauté venait sur ce genre de plateforme. Sans cette compréhension, le code que je livrais n'aurait pas eu de sens.",
        "Les premiers mois, j'ai contribué à la V2 du produit, qui existait déjà à mon arrivée. Mes premières features ont tourné autour de la gamification, notamment un système de classement des utilisateurs par points obtenus, et plusieurs autres fonctionnalités plus petites qui m'ont permis de rentrer dans le code et dans le produit. J'arrivais avec déjà plusieurs années d'expérience en développement derrière moi, ce qui m'a permis de progresser vite sur les sujets structurants.",
        "Dans les trois à quatre derniers mois, mon maître d'apprentissage a quitté l'entreprise. J'ai naturellement repris son rôle : déploiements, planification, décisions d'architecture, accompagnement de l'autre alternante au quotidien. C'est dans cette période que la grande refonte V3 a pris forme, le chantier le plus structurant que j'ai conduit. Ce que je retiens de cette année, ce n'est pas une feature en particulier : c'est cette progression et la confiance que l'équipe m'a accordée pour reprendre le rôle."
      ],
      objectives: [
        "M'intégrer dans une équipe tech sur un produit en production",
        "Apprendre le Web3 from scratch et comprendre les attentes de sa communauté avant de coder",
        "Contribuer à la V2 existante via des features de gamification (système de classement par points)",
        "Reprendre la responsabilité technique de l'équipe au départ du maître d'apprentissage",
        "Conduire la refonte V3 en tant que lead developer, du cadrage à la mise en production",
        "Accompagner l'autre alternante, plus juniore, sur ses tâches du quotidien"
      ],
      context: {
        period: "Un an d'alternance entre 2025 et 2026, dont les trois à quatre derniers mois comme lead developer après le départ de mon maître d'apprentissage",
        framework: "Alternance développeur chez VenaLabs, plateforme française d'éducation au Web3 et à la crypto",
        mode: "Principalement à distance, via bureaux virtuels Work Adventure",
        team: [
          { role: "Moi", description: "Alternant développeur, puis lead developer sur la dernière partie de l'année." },
          { role: "Autre alternante (en licence, plutôt frontend)", description: "Binôme dev au quotidien, sur les composants UI." },
          { role: "Maître d'apprentissage", description: "Pilotait l'équipe tech jusqu'à son départ en cours d'année." }
        ],
        organization: [
          "Réunions quotidiennes avec toute l'équipe (tech, Business, Marketing) pour caler la suite",
          "Code reviews systématiques avant tout merge",
          "Démos régulières aux équipes Business et Marketing pour valider les features en cours",
          "Coordination étroite avec la designeuse freelance pendant la refonte V3",
          "Conventions d'architecture et de nommage documentées sur la V3",
          "Sur la dernière période, planification et priorisation portées par moi, validées en réunion d'équipe complète"
        ],
        stack: [
          { label: "Backend", value: "Java 22, Spring Boot 3.3, MongoDB, architecture feature-based stricte (Controller / Service / Mapper / Model / Repository)" },
          { label: "Frontend", value: "Next.js 14 (App Router), TypeScript, Tailwind, Framer Motion, Zustand pour le state local par feature" },
          { label: "Auth", value: "JWT stateless, public endpoints isolés, rôles différenciés" },
          { label: "Paiements", value: "Stripe (abonnements premium + items consommables)" },
          { label: "Stockage", value: "Azure Blob pour les médias et les avatars" },
          { label: "Emails", value: "Mailjet (transactionnels + onboarding)" },
          { label: "Outils collaboratifs", value: "Work Adventure pour les bureaux virtuels et la communication quotidienne en remote" },
          { label: "DevOps", value: "Docker, déploiement automatisé" }
        ],
        stakes: [
          "Une plateforme en production utilisée par une vraie communauté. Chaque feature compte directement sur leur expérience",
          "Continuité de l'équipe technique au départ du maître d'apprentissage, avec une refonte d'ampleur en cours",
          "Repartir d'une V2 vieillie avec une refonte structurelle (V3) qui tienne plusieurs années, pas un simple lifting",
          "Différenciation produit dans un marché Web3 concurrentiel par une gamification poussée et une expérience pensée pour les débutants",
          "Première prise de rôle de lead pour moi. Responsabilité directe sur les choix d'architecture qui engagent l'équipe sur la durée"
        ],
        risks: [
          "Difficulté à entrer dans le domaine (vocabulaire, usages, attentes de la communauté) freinant la livraison les premières semaines",
          "Continuité de l'équipe fragilisée par le départ du maître d'apprentissage en cours d'année",
          "Reprise du rôle de lead sans transition formelle, avec plusieurs dossiers en cours à reprendre rapidement",
          "Difficulté à doser l'accompagnement de l'autre alternante sans freiner mes propres livrables",
          "Dérive du chantier V3 si l'architecture n'est pas posée tôt et tenue. Le piège classique d'une V3 qui finit comme la V2"
        ]
      },
      steps: [
        {
          title: "Onboarding : apprendre le produit avant d'apprendre la tech",
          description: "Premières semaines : comprendre ce qu'est VenaLabs, qui sont ses utilisateurs et pourquoi ils viennent, avant de toucher au code",
          bullets: [
            "Découverte du vocabulaire crypto et du fonctionnement de l'écosystème, à partir de zéro",
            "Lecture des cours du produit lui-même pour me mettre à la place d'un utilisateur débutant",
            "Échanges réguliers avec l'équipe pour comprendre les usages, la communauté, les attentes des abonnés",
            "Découverte de la base de code V2 existante, repérage des modules et des conventions internes",
            "Premières contributions sur des sujets simples pour être productif pendant que je montais en compétence sur le domaine"
          ]
        },
        {
          title: "Contributions à la V2 et premières features de gamification",
          description: "Mes premiers vrais livrables sur le produit, dont un système de classement des utilisateurs par points",
          bullets: [
            "Conception et développement d'un système de classement des utilisateurs en fonction des points qu'ils obtenaient sur la plateforme",
            "Plusieurs features secondaires de gamification (incentives, affichages de progression, ajustements UX)",
            "Optimisation des requêtes et mise en cache pour que le classement reste réactif avec un nombre croissant d'utilisateurs"
            
          ]
        },
        {
          title: "Prise du rôle de lead developer",
          description: "Dans les trois à quatre derniers mois, mon maître d'apprentissage quitte l'entreprise. Je reprends le rôle",
          bullets: [
            "Reprise des dossiers en cours laissés par mon maître d'apprentissage (choix techniques engagés, livrables prévus, organisation interne)",
            "Prise en main des déploiements en production et des opérations techniques quotidiennes",
            "Planification et priorisation des sujets, portées par moi mais validées en réunion avec toute l'équipe",
            "Accompagnement de l'autre alternante, encore en licence, pour la guider sur ses tâches du quotidien",
            "Coordination directe avec les équipes Business et Marketing sur leurs besoins, sans intermédiaire entre la tech et le produit",
            "Décisions d'architecture sur les chantiers en cours et à venir, en particulier sur la refonte V3 qui démarrait"
          ]
        },
        {
          title: "Cadrage de la refonte V3",
          description: "Le chantier le plus structurant de l'année. Poser une architecture qui tienne plusieurs années",
          bullets: [
            "Cadrage de l'architecture cible côté front comme côté back, avec un pattern d'organisation par feature strict et tenu sur la durée",
            "Construction du design system V3 main dans la main avec la designeuse freelance engagée pour la refonte visuelle complète",
            "Conventions de nommage et règles d'organisation documentées pour que l'équipe puisse continuer dans la même direction",
            "Choix techniques structurants pris en concertation avec l'équipe, puis assumés comme lead",
          ],
          annexLink: true
        },
        {
          title: "Battle Pass saisonnier dynamique (V3)",
          description: "Concevoir un système de progression saisonnier que l'équipe Business peut piloter sans solliciter la tech",
          bullets: [
            "Modélisation d'un système de saisons avec paliers progressifs, récompenses différenciées et missions à cadences multiples (quotidiennes, hebdomadaires, mensuelles, saisonnières)",
            "Double track gratuit / premium : chaque palier débloque une récompense accessible à tous et une réservée aux abonnés",
            "Récompenses distribuées de façon atomique pour empêcher toute double-distribution, sans verrou applicatif",
            "Outillage admin complet pour que la création d'une nouvelle saison soit une affaire de configuration, pas de code à pousser"
          ]
        },
        {
          title: "Système de boxes et drop pools (V3)",
          description: "Construire le moteur central de récompense, avec des probabilités finement configurables et plusieurs types de drops",
          bullets: [
            "Tirages aléatoires basés sur des probabilités configurables très finement par les administrateurs",
            "Huit types de récompenses possibles (points, expérience, coffres, photos de profil, boosters, etc.)",
            "Photos de profil à plusieurs niveaux de rareté visuelle, avec un système de collection pour les utilisateurs",
            "Boxes imbriquées : un tirage peut donner une autre box, qui peut elle-même être ouverte. Effet cascade côté utilisateur"
          ]
        }
      ],
      actors: [
        {
          role: "Maître d'apprentissage",
          description: "Mon référent technique pendant les premiers mois. C'est lui qui m'a accompagné dans la prise en main du code, du produit et du domaine crypto. Sa manière de poser un problème, de l'instruire avant de coder, est ce qui m'a le plus marqué. Sans cet accompagnement initial, je n'aurais pas pu reprendre la suite aussi vite à son départ."
        },
        {
          role: "Autre alternante",
          description: "Revues de code croisées et déblocages mutuels au quotidien sur les sujets en cours, avec une répartition naturelle (elle sur l'UI, moi sur l'architecture et le back). Une fois mon maître d'apprentissage parti, je l'ai accompagnée sur ses tâches : c'est la première fois que je portais ce rôle de guide pour une personne plus juniore que moi."
        },
        {
          role: "Designeuse freelance (refonte V3)",
          description: "Engagée pour la refonte V3 : nouvelle identité visuelle complète et design system de bout en bout. Sa contribution a structuré tout le chantier. Travailler avec elle m'a appris à dialoguer côté front sur ce qui est réalisable proprement, plutôt qu'à improviser une demi-solution une fois la maquette livrée."
        },
        {
          role: "Équipe Business",
          description: "En charge des cours et des partenariats. C'est avec eux que je calibrais les fonctionnalités qui devaient devenir des leviers business (saisons du Battle Pass, drops, contenus). Leurs demandes ont structuré ma façon de penser le tooling admin : si une équipe métier doit appeler la tech à chaque action, on a raté quelque chose."
        },
        {
          role: "Équipe Marketing",
          description: "En charge des réseaux sociaux et de la communication. C'est elle qui portait la V3 à l'extérieur. Nos échanges m'ont appris à formuler ce qu'on livrait en termes utilisables pour leur communication, pas en termes techniques internes. Une feature mal présentée passe inaperçue, peu importe la qualité du code."
        }
      ],
      results: {
        personal: {
          technical: [
            "Apprentissage d'un domaine complet (Web3, crypto, codes de la communauté) en partant de zéro, en parallèle de la livraison",
            "Maîtrise d'une stack moderne en production (Java, Spring Boot, Next.js, MongoDB, Tailwind), du back-end au front",
            "Conception et livraison de plusieurs features de gamification, de la V2 (système de classement par points) à la V3 (Battle Pass saisonnier, drop pools)",
            "Conduite d'une refonte structurelle (V3) avec des choix d'architecture qui engagent l'équipe pour plusieurs années",
            "Posture technique de lead : déploiements, planification, arbitrages et coordination avec les équipes métier"
          ],
          organizational: [
            "Passage du dev qui exécute au lead qui assume les décisions techniques de l'équipe",
            "Collaboration au quotidien avec l'autre alternante via Work Adventure, avec une dynamique de revue de code croisée naturelle",
            "Accompagnement de l'autre alternante, plus juniore, une fois que j'ai pris le rôle de lead",
            "Reprise sans transition formelle du rôle du maître d'apprentissage à son départ, avec plusieurs dossiers en cours",
            "Dialogue direct avec les équipes Business et Marketing sur la dernière période, sans intermédiaire entre la tech et le produit",
            "Conception orientée autonomie des équipes métier : éviter que le Business ou le Marketing doivent solliciter la tech pour leurs actions du quotidien"
          ],
          conclusion: "La posture de lead, c'est ce qui m'a fait progresser le plus vite : apprendre à décider quand on n'a pas toutes les réponses, à tenir ses choix face à un calendrier qui serre, à coordonner sans s'imposer, et à accompagner une alternante plus juniore sans freiner mes propres livrables."
        },
        business: {
          achievements: [
            "Features V2 livrées (système de classement par points et autres), qui ont alimenté la rétention de la plateforme pendant que la V3 se préparait",
            "Refonte V3 livrée : nouvelle identité, nouvelle architecture, plateforme remise sur des bases qui tiennent dans la durée",
            "Battle Pass saisonnier en production, avec l'équipe Business qui crée elle-même les nouvelles saisons",
            "Système de boxes et drop pools devenu le moteur central de gamification de la plateforme",
            "Continuité technique de l'équipe assurée au départ du maître d'apprentissage, sans retard sur le calendrier"
          ],
          satisfaction: [
            "Continuité technique préservée au départ du maître d'apprentissage, sans rupture de service ni retard sur le calendrier V3",
            "Confiance accordée par l'équipe et par la direction pour reprendre le rôle de lead sans transition formelle",
            "Autonomie acquise par les équipes Business et Marketing sur des actions qui passaient avant par la tech"
          ],
          conclusion: "Au-delà des features livrées, j'ai contribué à assurer la continuité technique de l'équipe à un moment charnière (départ du maître d'apprentissage, refonte V3 en cours). La V3 a remis la plateforme sur des bases que l'équipe peut continuer à faire grandir. Et l'autonomie donnée aux équipes Business et Marketing leur permet désormais d'avancer sans goulot technique sur leur quotidien."
        }
      },
      aftermath: {
        immediate: [
          "Mise en production de la V3 et accompagnement des premiers usages côté utilisateurs",
          "Lancement de la première saison du Battle Pass par l'équipe Business en autonomie, via les nouveaux outils admin",
          "Premier cycle de retours utilisateurs et ajustements correctifs sur les écrans les plus utilisés",
          "Continuation du développement sur la base posée par la V3 (nouvelles évolutions sur la map de cours, ajouts dans les drop pools, polish UI)"
        ],
        distant: [
          "L'équipe a continué à lancer de nouvelles saisons du Battle Pass en autonomie, comme prévu",
          "De nouveaux types de drops et de nouveaux écrans V3 ont été ajoutés en suivant l'architecture posée",
          "Pas de retour de bugs structurels sur la V3. Bon signe sur la solidité de la refonte",
          "Continuité confirmée du système de classement V2, qui tournait toujours sans incident"
        ],
        today: [
          "La V3 est en production et continue d'évoluer sur la base posée pendant la dernière partie de mon année",
          "Les features de gamification (du classement V2 au Battle Pass V3) sont devenues des piliers du produit",
          "Mon expérience de passage du junior au lead developer sur cette année me sert directement aujourd'hui dans la manière dont je structure les nouveaux projets"
        ]
      },
      critique: [
        {
          type: 'lesson',
          title: "Apprendre un domaine inconnu en livrant en même temps",
          body: "Le Web3, je l'ai découvert en codant. Les premières semaines, j'avais l'impression de faire semblant : je livrais du code qui compilait, mais sans bien comprendre ce que faisait vraiment le produit ni qui le consommait. La leçon, c'est que ce sentiment est normal et qu'il faut le traverser, mais aussi qu'on gagne énormément à passer du temps en amont sur le produit lui-même (lire les cours, observer les usages, parler aux équipes Business et Marketing) plutôt qu'à attaquer le code dès le premier jour. À refaire, je consacrerais explicitement un sprint à ça avant de m'attaquer aux tickets."
        },
        {
          type: 'lesson',
          title: "Accompagner une alternante plus juniore sans freiner ses propres livrables",
          body: "Une fois mon maître d'apprentissage parti, j'ai pris le temps d'accompagner l'autre alternante, encore en licence, sur ses tâches du quotidien. C'est une responsabilité que je n'avais jamais portée. Au début, je répondais à ses questions au fil de l'eau, ce qui me coupait régulièrement de mes propres sujets et finissait par m'éparpiller. À refaire, je formaliserais un cadre clair de revue (créneaux dédiés, points fixes) plutôt que de fonctionner en réactif. Bien accompagner sans s'oublier, c'est probablement la compétence la plus difficile que cette période m'a appris à doser."
        },
        {
          type: 'lesson',
          title: "Reprendre un rôle de lead sans transition formelle",
          body: "Le départ de mon maître d'apprentissage a été brutal. Plusieurs dossiers étaient en cours, le calendrier de la V3 était engagé, et il a fallu reprendre la suite sans passation formelle. J'ai dû redécouvrir certains choix au fil des semaines, ce qui m'a fait perdre du temps sur le démarrage. À refaire, je demanderais un point structuré beaucoup plus tôt sur ce que je devais reprendre, plutôt que de le découvrir par accident."
        },
        {
          type: 'lesson',
          title: "Une refonte vaut autant par les conventions que par le code",
          body: "Sur la V3, ce qui a fait tenir le chantier sur la durée, ce n'est pas la qualité du premier module livré, c'est la solidité des conventions sur tous les modules suivants. J'ai passé un temps inhabituel à formaliser l'organisation par feature, les règles de nommage, les bases du design system avec la designeuse freelance. Ce travail invisible côté produit a évité que la V3 dérive en cours de route et finisse comme la V2 qu'on remplaçait."
        },
        {
          type: 'takeaway',
          title: "La confiance ne se décrète pas, elle se construit",
          body: "Quand mon maître d'apprentissage est parti, c'est l'équipe qui m'a poussé à reprendre le rôle. Cette confiance ne s'est pas décrétée le jour où on m'a confié la suite : elle s'est construite mois après mois, à travers les features livrées sur la V2, la régularité au quotidien, et la capacité à dire honnêtement ce que je ne savais pas encore faire. C'est probablement la leçon humaine que je garde de plus durable de cette année."
        }
      ],
      annexes: {
        title: "Annexes : avant / après de la refonte V3",
        description: "Quelques captures pour visualiser concrètement le passage V2 à V3. Trois écrans de l'ancienne version, trois écrans de la nouvelle. Cliquez sur une image pour l'agrandir.",
        groups: [
          {
            label: "Airdroped V2 (avant)",
            description: "L'ancienne version, point de départ de la refonte.",
            images: [
              'assets/previews/venalabs/01.png',
              'assets/previews/venalabs/02.png',
              'assets/previews/venalabs/03.png'
            ]
          },
          {
            label: "Airdroped V3 (après)",
            description: "La nouvelle version, nouvelle identité visuelle et nouvelle architecture.",
            images: [
              'assets/previews/venalabs/04.png',
              'assets/previews/venalabs/05.png',
              'assets/previews/venalabs/06.png'
            ]
          }
        ]
      }
    }
  },

  'macway': {
    title: 'MacWay - Site E-commerce',
    description: "MacWay est un distributeur français de produits Apple et high-tech, fondé en 1990. J'y ai fait mon alternance pendant près de 3 ans (2022-2025). C'était ma première expérience en entreprise.",
    tags: ['Symfony', 'PHP', 'Twig', 'MySQL', 'SCSS', 'jQuery', 'API REST', 'Cron Jobs'],
    year: '2022-2025',
    logo: 'assets/logos/macway.png',
    url: 'https://www.macway.com/',
    presentation: "MacWay était un site e-commerce spécialisé dans les produits Apple et high-tech, avec un catalogue de plusieurs milliers de références et un trafic significatif. Pendant mon alternance de près de 3 ans (2022-2025), j'ai travaillé comme développeur web au sein d'une équipe de 2-3 développeurs, en lien direct avec le chef de projet et les équipes commerciales et marketing.\n\nLe site fonctionnait sous Symfony avec Twig pour le templating, jQuery pour les interactions frontend, MySQL pour la base de données et une architecture de cron jobs pour les tâches automatisées. J'ai développé de nombreuses fonctionnalités à fort impact business : un comparateur de produits cross-catégories, un système de promotions automatiques (UpdateDestockPromoTask) avec paliers graduels et protection des marges, des flux produits automatisés vers 4 marketplaces (Pinterest, Meta, Awin, Google Shopping), un système anti-fraude par fingerprinting navigateur (getBrowserFingerprint()), et la gestion des promotions vendeurs Mirakl.\n\nCette expérience m'a donné une compréhension profonde du e-commerce en production : logique métier complexe (marges, promotions, stock), contraintes de performance (trafic, temps de chargement), sécurité (fraude, paiements), et collaboration avec des équipes non-techniques.",
    objectives: {
      context: "Alternance de près de 3 ans dans une équipe de 2-3 développeurs sur un site e-commerce en production avec un trafic significatif. Le site vendait des produits Apple et high-tech avec des enjeux de conversion, de gestion de stock et de visibilité marketplace. L'entreprise a été rachetée par un concurrent en 2025, et plusieurs fonctionnalités auxquelles j'ai contribué tournent encore aujourd'hui sur le site.",
      goals: "Développer des fonctionnalités à fort impact business (comparateur, promotions automatiques, flux marketplaces). Assurer la stabilité et la performance du site en production. Protéger le business contre la fraude. Automatiser les tâches répétitives pour libérer les équipes.",
      challenges: "Travailler sur un projet legacy existant avec du code hérité. Gérer des règles métier complexes (marges, paliers de promotion, éligibilité). Intégrer des APIs externes variées (Google Shopping, Pinterest, Meta, Awin, Mirakl). Maintenir la performance sur un catalogue volumineux. Protéger les transactions financières contre la fraude.",
      risks: "Bugs impactant les ventes ou les prix en production. Erreurs de calcul de marges sur les promotions automatiques. Flux marketplace rejetés par les plateformes. Fraudes non détectées entraînant des pertes financières. Régressions sur un code legacy sans tests exhaustifs."
    },
    steps: [
      "Développement du comparateur de produits cross-catégories (ComparisonController, DQL optimisé)",
      "Création du système de promotions automatiques (UpdateDestockPromoTask, paliers 20%/40%/60%)",
      "Mise en place des flux produits vers 4 marketplaces (UpdateProductsFeedTask, CSV/XML)",
      "Développement du système anti-fraude (getBrowserFingerprint(), FraudDetectionService)",
      "Intégration des promotions vendeurs Mirakl (API externe, synchronisation)",
      "Correction de bugs critiques en production (paniers abandonnés, dates, timezone)"
    ],
    actors: "Équipe de 2-3 développeurs, un chef de projet, et les équipes commerciales et marketing. Travail quotidien avec validations métier sur les règles de promotion et de pricing. Revues de code entre développeurs. Communication régulière avec l'équipe commerciale pour comprendre les besoins business.",
    results: {
      personal: "3 ans chez MacWay, ça m'a rendu solide en Symfony et MySQL sur un vrai site e-commerce en production. J'ai compris comment fonctionne un business en ligne de l'intérieur : marges, conversions, gestion de stock, promotions. J'ai aussi appris à sécuriser un site contre la fraude et à automatiser des flux de données complexes. Et surtout, j'ai appris à résoudre des bugs critiques en prod sans paniquer.",
      business: "Le comparateur de produits aide les clients à se décider entre plusieurs références. Le système de promos automatiques (UpdateDestockPromoTask) a réduit le stock dormant sans que l'équipe commerciale n'ait à intervenir. Les produits MacWay étaient visibles sur 4 marketplaces avec des flux mis à jour chaque nuit. La fraude a chuté grâce au fingerprinting navigateur. L'équipe commerciale a gagné plusieurs heures par semaine en tâches manuelles."
    },
    future: "MacWay a été racheté par un concurrent en 2025, et plusieurs des fonctionnalités auxquelles j'ai contribué continuent de tourner sur le site. Ce que j'ai appris là-bas me sert tous les jours. Le e-commerce en production. Symfony, MySQL, marketplaces, anti-fraude. C'est un bagage que je réutilise sur chaque projet. Et avoir compris les enjeux business (marges, conversions, stock) me donne une vision produit que beaucoup de développeurs n'ont pas.",
    critique: "Au début de mon alternance, j'utilisais une seule branche Git pour tout le travail, ce qui créait des conflits et des risques de régression. J'ai appris l'importance d'un workflow Git structuré (branches par fonctionnalité, pull requests, revues de code) à travers cette erreur. Le code legacy sans tests exhaustifs rendait les refactorings risqués : j'aurais dû insister pour ajouter des tests sur les modules critiques (calcul de promotions, anti-fraude) avant de les modifier. Le système de promotions automatiques a nécessité plusieurs itérations car les premières règles métier n'étaient pas assez précises : une validation plus rigoureuse des spécifications en amont aurait évité du retravail. Enfin, la documentation technique était insuffisante, ce qui rendait l'onboarding de nouveaux développeurs difficile.",
    relatedSkills: ['symfony', 'optimisation-ux', 'collaboration-agile', 'autonomie-resolution', 'vision-produit'],
    majorTasks: [
      {
        title: "1. Comparateur de produits cross-catégories",
        context: "Les clients MacWay souhaitaient comparer des produits Apple et high-tech, y compris entre catégories différentes (MacBook vs iPad, par exemple). La fonctionnalité devait gérer des caractéristiques hétérogènes, supporter jusqu'à 4 produits simultanés et offrir une expérience mobile fluide.",
        steps: [
          "Conception du ComparisonController Symfony avec logique multi-catégories",
          "Développement d'une requête Doctrine DQL optimisée pour croiser les attributs communs et spécifiques",
          "Implémentation d'une limite de 4 produits maximum avec persistance en session",
          "Création du template Twig avec highlights automatiques des différences",
          "Optimisation mobile avec scroll horizontal et accordéons pour les caractéristiques",
          "Tests et mise en production avec suivi des métriques d'utilisation"
        ],
        result: "Comparateur en production, fluide sur mobile comme sur desktop. La fonctionnalité est mise en avant sur les pages catégories et aide les clients à se décider entre plusieurs produits.",
        learning: "L'approche mobile-first est indispensable en e-commerce : la majorité du trafic vient du mobile. La persistance en session évite la frustration de perdre la sélection entre les pages. Les highlights automatiques guident l'utilisateur sans surcharger l'interface."
      },
      {
        title: "2. Système de promotions automatiques (UpdateDestockPromoTask)",
        context: "MacWay accumulait du stock dormant sur des produits en fin de vie. L'objectif était d'automatiser complètement le processus de déstockage avec des réductions graduelles (20%, 40%, 60%) tout en protégeant une marge minimum de 5%.",
        steps: [
          "Analyse des critères d'éligibilité avec l'équipe commerciale (ancienneté, ventes, catégorie)",
          "Développement de la commande Symfony UpdateDestockPromoTask exécutée quotidiennement par cron",
          "Implémentation de l'algorithme de paliers graduels (20% → 40% → 60%) avec délais configurables",
          "Mise en place de la règle de marge minimum de 5% calculée dynamiquement sur le prix d'achat",
          "Création du NotifierSubscriber pour alerter l'équipe commerciale à chaque changement de palier",
          "Développement du reporting hebdomadaire (produits en promo, marges, évolution du stock)",
          "Tests unitaires sur les règles de calcul de promotion et de marge"
        ],
        result: "Système actif en continu sans intervention manuelle. Réduction significative du stock dormant. Marges systématiquement protégées par les garde-fous. L'équipe commerciale ne gère plus que les cas exceptionnels grâce au reporting automatique.",
        learning: "Les règles métier doivent être validées minutieusement avec les équipes concernées avant le développement. Le NotifierSubscriber s'est avéré essentiel pour maintenir la confiance des équipes commerciales dans un système automatisé. Les tests unitaires sur les calculs de marge sont indispensables : une erreur de calcul pourrait entraîner des ventes à perte."
      },
      {
        title: "3. Flux produits vers 4 marketplaces (UpdateProductsFeedTask)",
        context: "Diffuser automatiquement le catalogue MacWay sur Pinterest Shopping, Meta (Facebook/Instagram), Awin (affiliation) et Google Shopping. Chaque plateforme exige un format de flux spécifique avec des champs obligatoires différents.",
        steps: [
          "Analyse des spécifications de flux de chaque plateforme (Pinterest, Meta, Awin, Google Shopping)",
          "Développement de UpdateProductsFeedTask : tâche Symfony planifiée générant les flux quotidiennement",
          "Filtrage des produits éligibles (stock disponible, prix renseigné, images validées, catégorie autorisée)",
          "Génération de fichiers CSV/XML conformes aux spécifications de chaque plateforme",
          "Implémentation des champs spécifiques : GTIN, product_type hiérarchique, Google Product Taxonomy",
          "Mise en place du monitoring : alertes en cas d'anomalies (nombre de produits, champs manquants)",
          "Hébergement des flux sur des endpoints dédiés accessibles par les plateformes"
        ],
        result: "Produits MacWay visibles sur 4 plateformes majeures avec des flux mis à jour automatiquement chaque nuit. Zéro intervention manuelle nécessaire. Les anomalies sont détectées et signalées avant rejet par les plateformes.",
        learning: "Les spécifications des plateformes sont souvent mal documentées et changent sans prévenir. Il faut prévoir du temps pour les tests. Le monitoring proactif évite les coupures de diffusion. Et un flux propre, ça se voit directement sur la visibilité des produits."
      },
      {
        title: "4. Système anti-fraude par fingerprinting navigateur",
        context: "MacWay subissait des commandes frauduleuses avec des cartes bancaires volées. Le processus de vérification manuelle était chronophage et insuffisant. L'objectif était de créer un système de détection automatisé.",
        steps: [
          "Développement de getBrowserFingerprint() collectant les caractéristiques du navigateur (résolution, timezone, plugins, canvas, WebGL)",
          "Création du FraudDetectionService Symfony croisant les fingerprints avec l'historique des commandes",
          "Implémentation de règles de détection : même fingerprint/multiples cartes, fingerprints à chargebacks, incohérence timezone/adresse",
          "Mise en place d'un scoring de risque automatisé avec seuils configurables",
          "Alertes automatiques pour les commandes suspectes avec détail du score de risque",
          "Règles de blocage automatique pour les cas les plus flagrants"
        ],
        result: "Réduction significative des commandes frauduleuses validées. Diminution des chargebacks. L'équipe commerciale ne vérifie plus que les cas ambigus grâce au score de risque automatisé.",
        learning: "L'approche par scoring plutôt que par blocage binaire évite les faux positifs qui feraient perdre des ventes légitimes. Le fingerprinting est efficace mais doit respecter les réglementations sur la vie privée. La combinaison de plusieurs signaux (fingerprint + règles métier + historique) est plus fiable qu'un signal unique."
      },
      {
        title: "5. Intégration des promotions vendeurs Mirakl",
        context: "MacWay utilisait la marketplace Mirakl pour les vendeurs tiers. Les promotions devaient être synchronisées entre le catalogue MacWay et les offres Mirakl pour afficher des prix cohérents aux clients.",
        steps: [
          "Étude de l'API Mirakl et de ses endpoints de gestion des promotions",
          "Développement du service de synchronisation des promotions MacWay ↔ Mirakl",
          "Gestion des cas complexes : promotions croisées, promotions concurrentes, promotions expirées",
          "Mise en place de la gestion d'erreurs et des retry pour les appels API instables",
          "Validation métier avec l'équipe commerciale des règles de priorité entre promotions"
        ],
        result: "Promotions cohérentes entre le catalogue MacWay et les offres Mirakl. Les clients voient des prix corrects quelle que soit l'origine du produit. L'équipe commerciale gère les promotions marketplace sans intervention technique.",
        learning: "Les APIs externes (Mirakl) nécessitent une gestion d'erreurs robuste : timeouts, retry, circuit breaker. Les promotions marketplace ont des règles complexes (priorité, cumul, expiration) qui doivent être validées avec les équipes métier."
      }
    ],

    // === RICH CONTENT (v2 layout). Alternance e-commerce, thème sky ===
    rich: {
      theme: 'sky',
      tagline: "Ma première vraie expérience en entreprise. Près de 3 ans d'alternance sur un site e-commerce historique, à apprendre le métier au quotidien.",
      keyMetrics: [
        { value: '1990', label: 'année de création de MacWay' },
        { value: '~3 ans', label: 'd\'alternance, ma 1ère expérience pro' },
        { value: '4', label: 'marketplaces alimentées' }
      ],
      presentation: [
        "MacWay était un distributeur français de produits Apple et high-tech, fondé en 1990. L'un des plus anciens revendeurs Apple en France, avec un catalogue de plusieurs milliers de références et un site e-commerce historique. C'est là que j'ai fait mon alternance pendant près de 3 ans, de novembre 2022 à mars 2025, comme développeur web.",
        "C'était ma toute première expérience en entreprise. J'arrivais avec les bases théoriques de mon école, et je suis tombé sur un projet vivant depuis longtemps, avec son historique, ses conventions et son code hérité. Le vrai défi des premiers mois n'a pas été de coder, mais d'apprendre à comprendre. Comprendre comment fonctionne un site e-commerce en production, comment une équipe de développeurs travaille au quotidien, comment on intervient sur un code qu'on n'a pas écrit sans tout casser.",
        "L'entreprise traversait des difficultés, et les objectifs qui m'étaient confiés visaient à faire gagner du chiffre d'affaires et à améliorer la conversion utilisateur. Mon maître d'apprentissage, occupé par ses propres chantiers, n'avait pas toujours le temps de tout relire en détail. Ça m'a obligé très tôt à produire un code propre, prêt à être déployé sans aller-retour. C'est cette contrainte qui m'a forgé en autonomie, en discipline et en rigueur, bien plus vite que dans un cadre confortable.",
        "Au fil des mois, j'ai contribué à plusieurs fonctionnalités à fort impact business : un comparateur de produits cross-catégories, un système de promotions automatiques avec paliers et protection des marges, des flux produits automatisés vers quatre marketplaces (Pinterest, Meta, Awin, Google Shopping), un système anti-fraude par empreinte de navigateur, et la synchronisation des promotions vendeurs sur la marketplace Mirakl. MacWay a été racheté par un concurrent en 2025, et plusieurs de mes contributions tournent encore aujourd'hui sur le site. Ces 3 années restent pour moi le socle de tout ce que je sais aujourd'hui sur le e-commerce et le travail en équipe."
      ],
      objectives: [
        "Monter en compétence sur Symfony et MySQL en production, sur un projet legacy et avec du vrai trafic",
        "Livrer des fonctionnalités à fort impact business (comparateur, promos automatiques, flux marketplaces)",
        "Sécuriser le site contre la fraude et protéger les transactions financières",
        "Automatiser des tâches répétitives pour libérer du temps aux équipes produit et marketing",
        "Apprendre à travailler en équipe : revues de code, branches Git, communication avec les non-tech",
        "Comprendre comment fonctionne un business en ligne de l'intérieur. Marges, conversions, stock, marketplaces"
      ],
      context: {
        period: "Novembre 2022 à Mars 2025 (près de 3 ans, en alternance)",
        framework: "Alternance développeur web, dans le cadre de mon cursus en informatique",
        mode: "Présentiel, au siège de MacWay à Illkirch-Graffenstaden",
        team: [
          { role: "Moi", description: "Alternant développeur web. C'était ma première expérience en entreprise. J'arrivais avec les bases de l'école et je suis monté en autonomie au fil des mois." },
          { role: "Chef de projet (mon maître d'apprentissage)", description: "Mon encadrant au quotidien. Il pilotait les priorités, prenait les décisions sur les fonctionnalités à développer et me transmettait les besoins à traiter. C'est lui qui m'a appris à cadrer une demande avant de coder et à m'inscrire dans un cadre professionnel structuré." },
          { role: "Développeur collègue", description: "Un développeur back-end, dont les choix d'architecture m'ont beaucoup appris sur les sujets plus complexes (intégrations API, scripts automatisés)." }
        ],
        organization: [
          "Sprints courts avec priorisation hebdomadaire selon les urgences business",
          "Tickets gérés sur outil interne, avec validation métier avant développement sur les sujets sensibles (promos, prix)",
          "Branches Git par fonctionnalité et pull requests obligatoires. Une discipline que mon maître d'apprentissage m'a inculquée dès mes premiers jours",
          "Revues de code systématiques entre développeurs avant tout merge",
          "Déploiements progressifs avec recette manuelle, surtout sur les modules sensibles (paiements, promos)",
          "Communication régulière avec le chef de projet et les équipes marketing et produit pour cadrer les besoins"
        ],
        stack: [
          { label: "Backend", value: "Symfony en PHP, base de données MySQL, scripts automatisés (cron jobs)" },
          { label: "Frontend", value: "Twig pour les templates, SCSS pour le style, jQuery pour les interactions" },
          { label: "Intégrations externes", value: "APIs Pinterest, Meta, Awin, Google Shopping (flux produits) et Mirakl (marketplace vendeurs)" },
          { label: "Paiements", value: "contrôle de fraude avec empreinte de navigateur" },
          { label: "Outils internes", value: "Outil interne de gestion du catalogue et des promotions, tableaux de bord pour les équipes métier" },
          { label: "Versionnage", value: "Git avec branches par fonctionnalité, pull requests et revues de code obligatoires avant tout merge" }
        ],
        stakes: [
          "Un site en production réel, avec du vrai trafic et de vrais paiements. Chaque bug a un impact direct sur le chiffre",
          "Des règles métier complexes (paliers de promotion, marges, éligibilité) qui doivent être implémentées avec exactitude",
          "Une visibilité indispensable sur les marketplaces : un flux rejeté, et c'est tout un canal de ventes qui s'éteint",
          "Une protection contre la fraude au paiement, avec des conséquences financières directes en cas de défaillance",
          "Mon premier vrai contexte professionnel. Passage du code « école » au code « production »"
        ],
        risks: [
          "Bugs en production impactant les ventes ou les prix affichés. Risque permanent qui exige une rigueur constante avant chaque mise en ligne",
          "Erreurs de calcul de marge sur les promotions automatiques pouvant entraîner des ventes à perte",
          "Flux marketplaces rejetés par les plateformes pour cause de format invalide ou de champs manquants",
          "Fraudes au paiement non détectées entraînant des pertes financières directes",
        ]
      },
      steps: [
        {
          title: "Premiers mois : prise en main et passage du « code école » au « code prod »",
          description: "Découverte de la stack, du code existant et du quotidien d'une équipe en production",
          bullets: [
            "Découverte du code Symfony existant et de la structure de la base de données. Beaucoup à lire avant d'écrire",
            "Premières contributions sur des sujets simples (corrections de bugs, petits écrans) pour comprendre le code et le quotidien de l'équipe",
            "Prise en main du workflow Git de l'équipe dès les premiers jours (branches par fonctionnalité, pull requests, revues de code)",
            "Pair programming avec le chef de projet sur les sujets nouveaux pour combler les zones d'ombre",
            "Découverte des règles métier (marges, paliers de promotion, gestion du stock) à travers les échanges avec le chef de projet et l'équipe marketing"
          ]
        },
        {
          title: "Comparateur de produits cross-catégories",
          description: "Permettre aux clients de comparer jusqu'à 4 produits. Y compris entre catégories différentes. Sur mobile comme sur desktop",
          bullets: [
            "Conception de la fonctionnalité avec le chef de projet, en partant des besoins exprimés par l'équipe marketing",
            "Développement de la logique côté Symfony pour croiser les caractéristiques communes et spécifiques entre catégories",
            "Persistance de la sélection en session, pour que l'utilisateur ne perde pas ses choix en naviguant",
            "Mise en avant automatique des différences entre produits, sans surcharger l'interface",
            "Optimisation mobile (la majorité du trafic) avec scroll horizontal et accordéons pour les caractéristiques"
          ]
        },
        {
          title: "Promotions automatiques avec paliers et protection des marges",
          description: "Automatiser le déstockage des produits dormants, avec des réductions graduelles tout en garantissant une marge minimum",
          bullets: [
            "Définition des règles métier avec le chef de projet et l'équipe marketing (ancienneté du produit, ventes, catégorie, marge minimum)",
            "Développement d'un script automatisé qui tourne chaque nuit pour appliquer les paliers (20 %, 40 %, 60 %)",
            "Vérification systématique de la marge minimum (5 %) avant toute baisse de prix. Un garde-fou essentiel",
          ]
        },
        {
          title: "Flux produits vers 4 marketplaces",
          description: "Diffuser automatiquement le catalogue vers Pinterest, Meta, Awin et Google Shopping, chacun avec ses propres exigences",
          bullets: [
            "Étude des spécifications de chaque plateforme. Souvent mal documentées, qui changent sans prévenir",
            "Développement d'un script automatisé qui génère un flux conforme pour chaque plateforme",
            "Filtrage des produits éligibles (stock disponible, prix renseigné, images valides, catégorie autorisée)",
            "Suivi régulier avec l'équipe marketing pour réagir vite aux retours des plateformes"
          ]
        },
        {
          title: "Anti-fraude par empreinte de navigateur",
          description: "Détecter automatiquement les commandes suspectes pour soulager la vérification manuelle et limiter les pertes",
          bullets: [
            "Collecte d'une empreinte unique du navigateur pour identifier des comportements suspects",
            "Croisement de l'empreinte avec l'historique des commandes (même empreinte avec plusieurs cartes, empreintes liées à des litiges passés, incohérence fuseau horaire / adresse de livraison)",
            "Calcul d'un score de risque sur chaque commande",
            "Alertes automatiques pour les commandes suspectes, avec le détail du score pour aider à la décision",
          ]
        },
        {
          title: "Synchronisation des promotions Mirakl",
          description: "Aligner les promotions du catalogue MacWay avec celles des vendeurs tiers de la marketplace",
          bullets: [
            "Étude de l'API Mirakl et de ses points d'accès liés aux promotions",
            "Développement d'un service de synchronisation des promotions catalogue ↔ Mirakl, avec règles de priorité",
            "Gestion des cas complexes : promotions concurrentes, promotions expirées, cumul possible ou non selon les vendeurs",
            "Gestion des erreurs et tentatives multiples pour les appels API instables",
            "Validation finale avec le chef de projet des règles de priorité et de cumul des promotions"
          ]
        }
      ],
      actors: [
        {
          role: "Chef de projet (mon maître d'apprentissage)",
          description: "C'est lui qui m'encadrait au quotidien. Il pilotait les priorités, prenait les décisions sur les fonctionnalités à développer et me transmettait les besoins à traiter. Travailler avec lui m'a appris à cadrer une demande avant de coder, et à évoluer dans un cadre professionnel structuré."
        },
        {
          role: "Développeur collègue",
          description: "Un développeur back-end qui m'a aidé à mes débuts à prendre en main l'application, et qui développait lui aussi des fonctionnalités sur le site. Nos échanges et nos revues de code croisées m'ont fait progresser au quotidien sur les sujets plus techniques."
        },
        {
          role: "Équipe marketing",
          description: "C'est avec elle que j'étais le plus souvent en relation. Elle pilotait notamment la diffusion des produits sur les marketplaces (Pinterest, Meta, Awin, Google Shopping) et nous remontait régulièrement des besoins fonctionnels. J'ai appris à mesurer la qualité de mon travail par son impact concret, pas par son élégance technique."
        },
        {
          role: "Équipe produit",
          description: "En charge de tout ce qui concerne les produits du catalogue (références, fiches, descriptions, classification). Nos échanges m'ont fait comprendre que coder, c'est aussi servir une vision produit cohérente, pas seulement implémenter une spec."
        },
        {
          role: "Designer interne",
          description: "En charge du design du site et de l'identité visuelle. C'est lui qui produisait les maquettes des nouvelles pages et qui veillait à la cohérence visuelle de l'ensemble. Travailler avec lui m'a appris à respecter une intention de design dans l'implémentation, et à dialoguer côté front sur ce qui était réalisable ou pas."
        }
      ],
      results: {
        personal: {
          technical: [
            "Symfony et MySQL en production : du backend solide sur du vrai trafic, pas du code de TP",
            "Scripts automatisés robustes (promotions, flux marketplaces) avec gestion d'erreurs et notifications",
            "Intégrations d'APIs externes variées (4 marketplaces + Mirakl + prestataire de paiement) avec leurs spécificités",
            "Compréhension des enjeux de sécurité côté paiement et anti-fraude, pas en théorie mais en pratique",
          ],
          organizational: [
            "Travail en équipe sur du long terme : revues de code, branches Git, communication continue avec les non-tech",
            "Discipline et rigueur : tester deux fois plutôt qu'une, pour livrer du code qui tient en production sans incident",
            "Communication avec les équipes marketing et produit. Vulgariser le technique, traduire un besoin business en spec",
            "Tenue d'un projet sur la durée (3 ans) en parallèle de l'école, avec la discipline que ça demande",
            "Habitude de valider les règles métier en amont avec les équipes concernées, plutôt que de coder une spec ambiguë"
          ],
          conclusion: "Ce que MacWay m'a appris de plus précieux, c'est qu'on ne code pas en entreprise comme on code à l'école. L'exigence de fiabilité y est d'un autre ordre, et elle s'apprend à force d'attention portée à chaque livraison. J'ai aussi appris que le code n'est qu'une partie du métier : la moitié du temps, c'était comprendre des règles métier, échanger avec le chef de projet et les équipes marketing et produit, traduire un besoin flou en spec exécutable. MacWay m'a donné cette base de confiance : je sais que je peux livrer du code qui tient en production, parce que je l'ai déjà fait pendant 3 ans."
        },
        business: {
          achievements: [
            "Comparateur de produits cross-catégories en production, utilisé sur les pages catégories pour aider à la décision d'achat",
            "Système de promotions automatiques actif en continu, sans intervention manuelle des équipes métier",
            "Catalogue MacWay diffusé sur 4 marketplaces majeures avec des flux mis à jour chaque nuit",
            "Réduction significative des commandes frauduleuses validées grâce au scoring automatique",
            "Promotions cohérentes entre le catalogue MacWay et les offres Mirakl"
          ],
          satisfaction: [
            "Les équipes marketing et produit ont gagné plusieurs heures par semaine sur les tâches manuelles de promotion",
            "L'équipe marketing voyait ses produits remonter dans les marketplaces sans avoir à intervenir",
            "Confiance progressive du chef de projet sur des sujets de plus en plus structurants au fil des mois",
            "Pas de bug majeur sur les modules sensibles (promotions, anti-fraude, flux marketplaces) après la mise en production",
            "Continuité de mes contributions : ce que j'ai livré tourne encore après le rachat de l'entreprise par un concurrent"
          ],
          conclusion: "Mes contributions ont rendu plusieurs aspects du site plus automatisés (promotions, flux marketplaces, anti-fraude) et plus utiles aux clients (comparateur). Les équipes marketing et produit ont gagné en autonomie sur leurs tâches du quotidien. L'entreprise a été rachetée par un concurrent en 2025, et plusieurs des fonctionnalités auxquelles j'ai contribué tournent encore aujourd'hui sur le site. C'est le meilleur retour qu'on puisse avoir sur un travail livré il y a 3 ans."
        }
      },
      aftermath: {
        immediate: [
          "Documentation des modules les plus structurants (promotions automatiques, flux marketplaces, anti-fraude)",
          "Passage de relais aux collègues développeurs sur les chantiers en cours, avec briefs détaillés",
          "Sauvegarde de mes notes personnelles et du contexte des décisions prises (ce qui ne se voit pas dans le code)",
          "Bilan personnel sur les 3 années. Ce que j'ai appris, ce que je veux pousser ailleurs"
        ],
        distant: [
          "Le site a continué à tourner avec mes contributions jusqu'au rachat de l'entreprise en 2025, et plusieurs d'entre elles sont toujours en place sur le site repris par le nouveau propriétaire",
          "Pas de retour de bugs majeurs sur les modules que j'avais livrés. Un bon signe sur la robustesse",
          "Validation métier en amont, scripts automatisés notifiés, garde-fous sur les calculs sensibles : ces façons de faire sont restées des automatismes pour moi",
          "Quelques échanges ponctuels avec d'anciens collègues, qui me servent de réseau aujourd'hui"
        ],
        today: [
          "MacWay a été racheté par un concurrent en 2025, et certaines de mes contributions tournent encore sur le site repris. Le bagage e-commerce que j'en ai retiré me sert au quotidien sur tous mes nouveaux projets",
          "Ma compréhension des enjeux business (marges, conversions, stock, marketplaces) influence toujours la manière dont je conçois une feature",
          "Je garde de cette alternance une conviction forte : tant qu'on n'a pas vu son propre code partir en prod sur du vrai trafic, certaines exigences de fiabilité restent abstraites"
        ]
      },
      critique: [
        {
          type: 'lesson',
          title: "Reprendre un code existant pour une première expérience, c'est une école en soi",
          body: "Pour mes débuts en entreprise, je suis tombé sur un projet existant depuis longtemps, avec son historique, ses conventions et son code hérité. Le défi des premiers mois n'a pas été d'écrire du code, mais de comprendre celui déjà en place. Apprendre à lire avant d'écrire, à respecter les choix faits avant moi, à m'intégrer dans une équipe technique structurée. C'est une compétence qu'on n'apprend pas à l'école et qui m'a beaucoup servi par la suite."
        },
        {
          type: 'lesson',
          title: "Consolider la théorie de l'école par la pratique en entreprise",
          body: "À l'école, on apprend des concepts dans un cadre clair, avec des projets bien délimités. En entreprise, les besoins sont moins formels, les contraintes plus nombreuses, les enjeux concrets. Cette alternance m'a permis de consolider ce que j'avais vu en cours en l'appliquant sur des cas réels. Symfony, MySQL, Git, le travail en équipe : tout a pris une autre dimension dès qu'il y a eu de vrais clients et un vrai site derrière."
        },
        {
          type: 'lesson',
          title: "L'autonomie est née d'une contrainte",
          body: "L'entreprise traversait des difficultés et mon maître d'apprentissage n'avait pas toujours le temps de tout relire. Ça m'a obligé très tôt à produire un code propre, directement prêt à être déployé, qui ne demande pas un aller-retour. Au lieu d'attendre les validations pour avancer, j'ai dû apprendre à valider mon propre travail. Cette contrainte m'a forgé en discipline et en rigueur, et c'est sans doute ce que je garde de plus précieux de ces 3 années."
        },
        {
          type: 'lesson',
          title: "Concevoir des systèmes adaptables, pas figés",
          body: "Sur les promotions automatiques, j'ai très tôt choisi de coder de façon à ce que les règles métier puissent évoluer sans repasser par le code. Les paliers, les seuils, les conditions d'éligibilité étaient configurables. Quand un ajustement était nécessaire, on pouvait le faire sans nouvelle mise en production. Cette approche m'a évité beaucoup de retravail, et je l'applique aujourd'hui à toutes les fonctionnalités où les règles risquent de bouger."
        },
        {
          type: 'lesson',
          title: "La rigueur, pour ne pas casser ce qui marche",
          body: "Sur un site e-commerce en production, chaque modification est un risque. J'ai pris l'habitude de tester systématiquement, de vérifier deux fois, de relire mon propre code avant de pousser. C'est cette discipline qui a fait que je n'ai pas eu de bug majeur en prod sur les modules sensibles (promotions, anti-fraude, flux marketplaces). Ce n'est pas une question de chance, c'est une attention soutenue portée à chaque détail."
        },
        {
          type: 'takeaway',
          title: "Coder pour la prod, c'est une autre exigence",
          body: "Avant MacWay, je codais surtout pour rendre des projets d'école, avec des tests et un cadre clair. En entreprise, l'exigence est différente : il faut anticiper les cas tordus, poser des garde-fous, prévoir ce qui se passe quand un service externe ne répond pas. C'est dans cette différence que se joue le vrai passage du code « école » au code « production », et c'est précisément ce que mon alternance m'a permis de franchir."
        },
        {
          type: 'takeaway',
          title: "Comprendre le business change la manière de coder",
          body: "Trois ans au contact des équipes marketing et produit m'ont appris à voir le code autrement. Comprendre comment un e-commerce fonctionne à grande échelle, avec un large catalogue, des marges à protéger, des canaux de vente multiples, change la manière dont on conçoit chaque fonctionnalité. Une feature qui fait gagner du temps aux équipes vaut souvent plus qu'une feature techniquement brillante mais peu utilisée. Je cherche désormais le pourquoi avant le comment."
        }
      ]
    }
  },

  'wedriv': {
    title: 'WeDriv - Réservation VTC',
    description: "Site de réservation VTC avec calcul du prix en temps réel, paiement sécurisé et back-office.",
    tags: ['React', 'TypeScript', 'Symfony', 'PHP', 'MySQL', 'Stripe', 'Google Maps API'],
    year: '2025-2026',
    logo: 'assets/logos/wedriv.png',
    url: 'https://wedriv.com/',
    presentation: "WeDriv est un site de réservation VTC que j'ai développé seul de A à Z. Le site permet aux clients de réserver une course facilement : saisie des adresses avec autocomplete Google Places, visualisation du trajet sur une carte interactive, calcul du prix en temps réel via l'API Distance Matrix, choix du véhicule et paiement sécurisé par carte bancaire via Stripe.\n\nLe frontend est développé en React avec TypeScript pour une interface fluide et réactive. Le backend repose sur Symfony avec API Platform pour une API REST robuste et documentée. Google Maps est utilisé pour l'autocomplete d'adresses, le calcul de distances et l'affichage cartographique. Stripe gère les paiements avec vérification par webhook et traitement asynchrone via Symfony Messenger.\n\nUn back-office complet permet de gérer les réservations, les chauffeurs, les véhicules et les paiements. Le site est en production et déployé automatiquement.",
    objectives: {
      context: "Projet personnel mené pour mon père, chauffeur VTC, qui souhaitait disposer d'un site moderne pour gérer ses courses et ses clients en ligne. Il a défini les besoins essentiels du métier, je me suis chargé de tout le reste, de la conception à la mise en ligne. Le site est aujourd'hui en ligne et opérationnel avec de vraies réservations et de vrais paiements.",
      goals: "Permettre aux clients de réserver une course en moins de 2 minutes avec un prix transparent et un paiement sécurisé. Fournir un back-office complet pour la gestion de l'activité. Démontrer ma capacité à créer une application fullstack complète from scratch.",
      challenges: "Intégrer Google Maps (autocomplete, distance, affichage) avec une UX fluide malgré les latences API. Sécuriser les paiements Stripe de bout en bout (montants serveur, webhooks signés, idempotence). Concevoir une API robuste pour les réservations avec gestion des états (créée, confirmée, payée, terminée). Offrir une expérience temps réel sans perception d'attente.",
      risks: "Erreurs d'adresses ou distances incorrectes impactant le prix. Doubles débits ou paiements non traités. Latences API dégradant l'expérience utilisateur. Failles de sécurité sur les flux financiers."
    },
    steps: [
      "Conception de l'architecture (Symfony API Platform + React TypeScript)",
      "Développement du backend : entités, API REST, validation, sécurité JWT",
      "Intégration Google Maps : autocomplete, Distance Matrix, affichage cartographique",
      "Implémentation du calcul de prix temps réel côté serveur",
      "Intégration Stripe : Payment Intents, webhooks signés, traitement asynchrone",
      "Développement du frontend React : formulaire, carte, états progressifs",
      "Création du back-office d'administration",
      "Mise en production et déploiement automatique"
    ],
    actors: "Projet réalisé intégralement seul côté technique : conception, développement frontend et backend, intégrations, tests et mise en ligne. Le cahier des charges fonctionnel a été défini avec mon père, chauffeur VTC, qui a validé chaque étape pour s'assurer de l'adéquation métier.",
    results: {
      personal: "WeDriv m'a prouvé que je pouvais créer une application fullstack complète tout seul, de la conception au déploiement. J'ai appris à intégrer des APIs complexes (Google Maps, Stripe) et à sécuriser des flux financiers. Le plus formateur : gérer l'UX d'un parcours de réservation où chaque seconde d'attente compte.",
      business: "Le site est en production avec un parcours de réservation complet : saisie d'adresses, calcul de prix en temps réel via Google Maps, paiement sécurisé Stripe avec webhooks. Le back-office gère les réservations, chauffeurs et véhicules. L'interface est responsive et fonctionne sur mobile, tablette et desktop."
    },
    future: "Le projet peut évoluer avec des fonctionnalités supplémentaires : abonnements pour les entreprises, programme de fidélité, notifications push pour les chauffeurs, chat en temps réel entre client et chauffeur, et intégration d'un système de notation. L'architecture modulaire facilite ces extensions.",
    critique: "J'aurais dû ajouter des tests automatisés (unitaires et d'intégration) bien plus tôt dans le projet. L'absence de tests a ralenti les itérations sur le calcul de prix et l'intégration Stripe, car chaque modification nécessitait des tests manuels approfondis. L'intégration Stripe a été plus complexe que prévu, notamment la gestion des webhooks et des cas d'erreur (paiement refusé, timeout, double traitement) : une étude plus approfondie de la documentation Stripe en amont aurait économisé du temps. La gestion du multilangue aurait dû être architecturée dès le départ plutôt qu'ajoutée après coup.",
    relatedSkills: ['symfony', 'react-nextjs', 'optimisation-ux', 'autonomie-resolution'],
    majorTasks: [
      {
        title: "1. API backend Symfony avec API Platform",
        context: "Créer un backend robuste capable de gérer l'ensemble du cycle de réservation VTC : création, calcul de prix, paiement, confirmation et suivi. L'API doit être sécurisée, documentée et extensible.",
        steps: [
          "Modélisation des entités Doctrine (Reservation, Driver, Vehicle, Payment, User)",
          "Configuration d'API Platform avec des ressources RESTful et documentation Swagger",
          "Implémentation de la sécurité JWT avec rôles différenciés (client, admin, chauffeur)",
          "Développement des services métier (calcul de prix, gestion des états de réservation)",
          "Validation stricte des données entrantes via les groupes de validation Symfony",
          "Tests manuels sur l'ensemble des endpoints avec Postman"
        ],
        result: "API stable et documentée gérant l'ensemble du cycle de réservation. Sécurité JWT fonctionnelle avec séparation des rôles. Documentation Swagger générée automatiquement.",
        learning: "API Platform fait gagner un temps énorme sur les APIs REST Symfony. La sécurité JWT, il faut la penser dès le départ avec des rôles bien définis. Et la validation côté serveur est non-négociable, même si le frontend valide aussi."
      },
      {
        title: "2. Intégration Google Maps (autocomplete, distance, carte)",
        context: "Offrir une expérience de saisie d'adresses fluide avec autocomplete, afficher le trajet sur une carte interactive et calculer la distance réelle pour le prix.",
        steps: [
          "Intégration de l'API Google Places pour l'autocomplete d'adresses avec debounce 300ms",
          "Connexion à l'API Distance Matrix pour le calcul de distance et durée estimée",
          "Affichage interactif de la carte avec @react-google-maps/api et tracé du trajet",
          "Implémentation des états de chargement progressifs (skeleton, shimmer) pendant les appels API",
          "Gestion des erreurs non-bloquantes (adresse introuvable, API indisponible)",
          "Mise en cache des résultats de distance pour les trajets populaires"
        ],
        result: "Autocomplete fluide et précis. Trajet affiché instantanément sur la carte. Distance calculée en temps réel. Gestion gracieuse des erreurs sans réinitialisation du formulaire.",
        learning: "Le debounce est indispensable pour limiter les appels API (et les coûts). Les états de chargement progressifs transforment la perception de latence en perception de fluidité. La mise en cache évite les appels redondants."
      },
      {
        title: "3. Paiement sécurisé Stripe (Payment Intents + webhooks)",
        context: "Permettre le paiement sécurisé par carte bancaire avec Stripe, en garantissant l'intégrité de chaque transaction de bout en bout.",
        steps: [
          "Intégration Stripe Payment Intents côté backend Symfony (montant calculé serveur uniquement)",
          "Configuration des webhooks Stripe avec vérification par signature cryptographique",
          "Implémentation du traitement asynchrone des webhooks via Symfony Messenger",
          "Mise en place de l'idempotence (chaque webhook traité une seule fois)",
          "Gestion des cas d'erreur (paiement refusé, timeout, double traitement)",
          "Logging détaillé de chaque étape du paiement pour la traçabilité"
        ],
        result: "Paiements sécurisés et fiables en production. Zéro incident de sécurité. Traçabilité complète de chaque transaction. Les réservations sont automatiquement mises à jour après confirmation de paiement.",
        learning: "Toujours calculer les montants côté serveur pour empêcher la manipulation. Les webhooks Stripe nécessitent beaucoup de tests : paiement réussi, refusé, timeout, double envoi. L'idempotence est indispensable pour éviter les doubles traitements."
      },
      {
        title: "4. Back-office d'administration",
        context: "Fournir un outil complet et simple aux administrateurs pour gérer les réservations, les chauffeurs, les véhicules et suivre les paiements.",
        steps: [
          "Développement des pages d'administration React avec tableaux de données paginés",
          "Gestion CRUD des réservations (liste, détail, modification de statut, annulation)",
          "Gestion des chauffeurs et véhicules (ajout, modification, disponibilité)",
          "Dashboard de suivi des paiements avec statuts (confirmé, en attente, remboursé)",
          "Sécurisation des accès avec vérification du rôle ADMIN via JWT"
        ],
        result: "Back-office complet et fonctionnel utilisé au quotidien. L'administrateur peut gérer l'ensemble de l'activité depuis une interface claire et responsive.",
        learning: "Un back-office doit être simple et rapide avant d'être complet : les fonctionnalités les plus utilisées doivent être accessibles en un clic. La pagination est indispensable dès qu'il y a plus d'une dizaine d'enregistrements."
      }
    ],

    // === RICH CONTENT (v2 layout). Projet solo VTC, thème gold ===
    rich: {
      theme: 'gold',
      tagline: "Un site de réservation VTC complet, conçu et développé seul pour mon père chauffeur, avec de vraies courses, de vrais paiements et de vrais clients.",
      presentation: [
        "WeDriv est un site de réservation VTC que j'ai imaginé, développé et mis en ligne seul. Le projet est parti d'une demande concrète de mon père, chauffeur VTC depuis plusieurs années. C'est lui qui m'a expliqué ce dont un site de ce type avait vraiment besoin pour être utile au métier : un parcours rapide côté client, des adresses fiables, un prix transparent, un paiement en ligne sécurisé, et un back-office capable de tout suivre au quotidien.",
        "Concrètement, le client saisit son adresse de départ et d'arrivée avec une suggestion automatique, voit son trajet apparaître sur une carte, découvre le prix calculé en direct selon la distance, choisit son véhicule et paie en ligne. Il reçoit ensuite sa confirmation par mail, et tout est piloté depuis un back-office dédié.",
        "Aucune brique prise séparément n'est exceptionnelle. Ce qui rend ce projet exigeant, c'est leur addition. Plusieurs services externes à brancher proprement sans qu'on en voie la latence. De l'argent réel à ne jamais perdre. Une interface qui doit rester fluide pendant que tout se joue en coulisses. Et une cohérence visuelle à tenir d'un bout à l'autre, sans designer pour rattraper.",
        "C'est surtout le projet qui m'a appris ce que veut dire être responsable d'un site en ligne tout seul. Quand quelque chose casse un dimanche soir, il n'y a personne d'autre que moi au bout du fil. Cette responsabilité a changé ma manière de coder, durablement."
      ],
      objectives: [
        "Permettre à un client de réserver une course en quelques minutes, avec un prix transparent et un paiement sécurisé",
        "Garder un parcours fluide alors que plusieurs services externes sont sollicités en coulisses",
        "Sécuriser les paiements de bout en bout, sans la moindre zone d'ombre sur le montant ou la transaction",
        "Mettre à disposition un back-office complet pour piloter les réservations, les chauffeurs et les véhicules au quotidien",
        "Me prouver que je peux concevoir, développer et mettre en ligne une application complète, seul"
      ],
      context: {
        period: "Septembre 2025 à Avril 2026 (environ 7 mois en parallèle de l'école)",
        framework: "Projet personnel mené pour mon père, chauffeur VTC, en dehors de tout cadre scolaire ou client extérieur",
        mode: "100 % remote, en parallèle de mon alternance et de l'école",
        team: [
          { role: "Moi", description: "Toutes les casquettes : conception du parcours utilisateur, architecture technique, développement frontend et backend, intégration de Google Maps et Stripe, sécurisation des paiements, mise en production et déploiement automatique. Aucun rôle délégué. C'est ce qui rend le projet exigeant et formateur." }
        ],
        organization: [
          "Plan de travail défini en amont avec les fonctionnalités nécessaires à la première version utilisable",
          "Suivi régulier des tâches faites, à faire et des points bloquants pour ne pas perdre le fil sur la durée",
          "Sessions de travail libres : soirs, week-ends, certains jours dédiés",
          "Tests manuels approfondis sur chaque parcours sensible (saisie adresse, calcul prix, paiement, confirmation)",
          "Mises en ligne progressives par fonctionnalité plutôt qu'en gros lots, pour repérer vite ce qui casse"
        ],
        stack: [
          { label: "Frontend", value: "React et TypeScript, composants découpés et formulaires progressifs pour rester lisible sur la durée" },
          { label: "Backend", value: "Symfony, qui expose une API propre et documentée pour le site et le back-office" },
          { label: "Base de données", value: "MySQL, avec un historique des modifications pour garder une trace de chaque évolution" },
          { label: "Cartographie", value: "Google Maps pour la suggestion d'adresses, le calcul de distance et l'affichage du trajet" },
          { label: "Paiements", value: "Stripe, avec confirmation des paiements vérifiée automatiquement en arrière-plan" },
          { label: "Sécurité", value: "Connexions signées et trois rôles distincts : client, chauffeur, administrateur" },
          { label: "Mise en ligne", value: "Déploiement automatisé à chaque mise à jour validée, sans manipulation manuelle" }
        ],
        stakes: [
          "Démontrer ma capacité à concevoir et livrer une application complète en autonomie",
          "Gérer un parcours sensible (paiement réel par carte) sans aucune possibilité d'erreur",
          "Brancher plusieurs services externes en gardant une expérience fluide pour l'utilisateur",
          "Tenir une cohérence visuelle et un niveau de finition suffisant en solo, sans designer",
          "Apprendre à mettre en production tout seul, ce qui est une compétence à part entière"
        ]
      },
      steps: [
        {
          title: "Cadrage, choix techniques et fondations",
          description: "Premières semaines : définir le parcours, choisir la stack et poser des bases propres",
          bullets: [
            "Étude des sites VTC existants, puis définition du parcours client minimal : saisie des adresses, prix transparent, paiement, confirmation",
            "Choix de Symfony côté serveur et React côté client, pour une base solide qui supporte l'évolution du projet",
            "Modélisation des grandes entités (utilisateurs, réservations, chauffeurs, véhicules, paiements) avant d'écrire la première ligne",
            "Mise en place d'une authentification avec trois rôles distincts : client, chauffeur, administrateur",
            "Validation systématique des données côté serveur, et états de réservation balisés pour éviter les transitions incohérentes",
            "Tests manuels approfondis sur chaque point d'entrée du site avant de connecter l'interface"
          ]
        },
        {
          title: "Intégration de la cartographie",
          description: "Offrir une saisie d'adresses et un affichage de trajet rapides, malgré la latence des appels Google",
          bullets: [
            "Suggestion automatique d'adresses pendant la frappe, avec un petit délai pour limiter le nombre d'appels et les coûts",
            "Récupération de la distance et de la durée estimée avant l'affichage du prix",
            "Tracé interactif du trajet sur une carte intégrée au formulaire, visible de A à B",
            "Indicateurs visuels de progression pendant les appels en cours, pour que l'utilisateur sente que ça avance",
            "Gestion propre des erreurs (adresse introuvable, service indisponible) sans réinitialiser la saisie déjà faite",
            "Mémorisation des trajets fréquents pour éviter de refaire le même calcul plusieurs fois"
          ]
        },
        {
          title: "Paiement sécurisé",
          description: "Le morceau le plus sensible : gérer de vraies transactions par carte sans aucune faille",
          bullets: [
            "Calcul du montant uniquement côté serveur, jamais côté navigateur, pour qu'aucune manipulation ne soit possible",
            "Mise en place de notifications automatiques signées par le prestataire de paiement et vérifiées avant traitement",
            "Traitement de ces notifications en arrière-plan, pour ne jamais bloquer le client ni le prestataire",
            "Garde-fou pour qu'une même notification ne soit jamais traitée deux fois, évitant les doubles confirmations",
            "Gestion explicite de tous les cas problématiques : paiement refusé, expiration, double envoi, coupure réseau",
            "Journal détaillé de chaque étape, pour pouvoir reconstituer une transaction plusieurs mois après les faits"
          ]
        },
        {
          title: "Parcours de réservation côté client",
          description: "Construire l'interface en gardant la fluidité comme priorité absolue",
          bullets: [
            "Formulaire de réservation progressif : chaque étape ne révèle que ce dont l'utilisateur a besoin sur le moment",
            "Affichage du prix en temps réel dès que les adresses sont saisies, sans avoir à cliquer pour calculer",
            "Carte interactive intégrée au formulaire, qui se met à jour pendant la saisie",
            "Choix du véhicule avec récapitulatif clair et confirmation visuelle de la sélection",
            "Page de paiement sobre, avec récapitulatif de la course et bouton « Payer » bien visible",
            "Confirmation finale avec un récapitulatif complet (trajet, véhicule, prix, mode de paiement) et envoi par mail"
          ]
        },
        {
          title: "Back-office d'administration et mise en ligne",
          description: "Outiller la gestion du quotidien et basculer sur un site réellement utilisable",
          bullets: [
            "Tableau de bord listant les réservations, avec filtres et pagination",
            "Gestion complète des chauffeurs et des véhicules (ajout, modification, disponibilité)",
            "Suivi des paiements avec leur statut (confirmé, en attente, remboursé) et accès direct au détail chez le prestataire",
            "Accès au back-office strictement réservé au rôle administrateur, sans porte dérobée possible",
            "Mise en ligne avec déploiement automatisé à chaque mise à jour validée, pour pouvoir corriger un bug rapidement",
            "Tests utilisateurs avec quelques personnes du métier (chauffeurs, professionnels du VTC) pour valider l'ergonomie"
          ]
        }
      ],
      actors: [
        {
          role: "Moi (porteur unique)",
          description: "Toutes les casquettes : conception du parcours, architecture technique, développement frontend et backend, intégration de Google Maps et Stripe, mise en production. Aucun rôle délégué. La seule contrepartie : pas de relecteur de code, pas de regard extérieur sur les choix d'architecture, pas de duo pour débugger un cas tordu. Ce qui m'a forcé à être plus rigoureux dans la validation manuelle."
        },
        {
          role: "Mon père, chauffeur VTC (à l'origine du besoin)",
          description: "C'est lui qui m'a expliqué ce qu'un site de réservation VTC devait absolument couvrir pour être utile au quotidien : la simplicité du parcours client, la fiabilité des adresses, la clarté du prix, la robustesse du paiement et la lisibilité du back-office. Il a relu les écrans à plusieurs étapes, validé la cohérence métier, et signalé tout ce qui ne ressemblait pas au vrai quotidien d'un chauffeur. Plusieurs simplifications du back-office viennent directement de ses remarques, en particulier sur les premiers écrans qui étaient trop chargés."
        }
      ],
      results: {
        personal: {
          technical: [
            "Une application complète conçue, développée et mise en ligne seul, de la première maquette à la production",
            "Intégration propre de plusieurs services externes, avec une attention particulière à la latence et aux erreurs possibles",
            "Sécurisation de paiements réels de bout en bout, avec gestion explicite de tous les cas problématiques",
            "Une interface qui reste fluide pour l'utilisateur, même quand beaucoup de choses se jouent en coulisses",
            "Compréhension concrète de ce que coûte chaque seconde d'attente sur un parcours sensible comme un paiement"
          ],
          organizational: [
            "Capacité à structurer un projet long en solo et à le mener jusqu'à la mise en ligne",
            "Discipline pour avancer régulièrement en parallèle de l'école et de l'alternance, même quand la motivation baisse",
            "Validation manuelle approfondie des parcours sensibles avant chaque mise en ligne",
            "Capacité à diagnostiquer et corriger un bug en production seul, ce qui demande une vraie discipline mentale",
            "Auto-formation continue sur les sujets que je découvrais en chemin"
          ],
          conclusion: "WeDriv m'a appris ce que veut dire être responsable d'un site en production tout seul. Quand un bug tombe en pleine soirée, il n'y a pas d'astreinte à appeler. Cette responsabilité change la manière de coder. On anticipe davantage, on met plus de garde-fous, on garde une trace de tout. C'est aussi le projet qui m'a confirmé que je peux livrer une application complète sans équipe. Pas parce que c'est confortable, mais parce que je sais désormais que c'est faisable."
        },
        business: {
          achievements: [
            "Site en ligne avec un parcours de réservation complet, fonctionnel sur téléphone, tablette et ordinateur",
            "Aucun incident de sécurité ni de paiement depuis la mise en ligne",
            "Back-office complet permettant de piloter réservations, chauffeurs, véhicules et paiements depuis une seule interface",
            "Architecture modulaire qui facilite l'ajout de nouvelles fonctionnalités sans tout réécrire",
            "Documentation automatique de l'API, ce qui rendrait simple l'intégration d'un partenaire ou d'un outil tiers plus tard"
          ],
          satisfaction: [
            "Validation positive du parcours par les testeurs, en particulier sur la fluidité ressentie",
            "Retour favorable des professionnels du VTC sur l'ergonomie du back-office après plusieurs simplifications",
            "Aucune remontée client sur une incohérence de prix ou un problème de paiement depuis la mise en ligne",
            "Un site suffisamment crédible pour être présenté comme un projet professionnel à des recruteurs"
          ],
          conclusion: "WeDriv tourne, prend de vrais paiements sans incident, et pourrait devenir une activité réelle si je décidais de pousser plus loin. Pour l'instant, c'est surtout une preuve solide : je sais emmener une application complète d'une page blanche jusqu'à un site qui encaisse de l'argent. C'est exactement ce que je voulais démontrer avec ce projet, et c'est fait."
        }
      },
      aftermath: {
        immediate: [
          "Mise en ligne du site avec un nom de domaine dédié et certificat sécurisé",
          "Mise en place des emails automatiques (confirmation de réservation, reçu de paiement)",
          "Activation des paiements réels, en sortie du mode test",
          "Déploiement automatisé en place, pour pouvoir corriger un bug rapidement sans manipulation manuelle"
        ],
        distant: [
          "Ajout d'une couche de tests automatisés sur les parties les plus critiques (calcul de prix, paiement, transitions de réservation)",
          "Internationalisation du site, prévue dès la conception mais ajoutée plus tard",
          "Système de notation des chauffeurs et de fidélisation des clients",
          "Notifications mobiles pour les chauffeurs (acceptation de course, suivi en temps réel)",
          "Discussions avec des professionnels du VTC pour évaluer un usage commercial réel"
        ],
        today: [
          "Le site est en ligne et continue de fonctionner sans accroc",
          "Sur les flux d'argent, je ne code plus pareil depuis. Montant calculé côté serveur, traçabilité de chaque étape, gestion explicite de tous les cas d'erreur. C'est devenu non négociable pour moi",
          "Je garde de ce projet la conviction qu'on apprend dix fois plus vite quand on doit gérer toute la chaîne soi-même, plutôt qu'en restant sur une seule couche"
        ]
      },
      critique: [
        {
          type: 'lesson',
          title: "Le paiement est plus compliqué qu'il n'y paraît",
          body: "L'intégration de base se fait vite. Ce qui prend du temps, c'est tout le reste. Paiement refusé, double envoi, expiration, coupure réseau. J'ai découvert ces cas un par un, souvent en production, alors que la documentation du prestataire les couvrait. J'aurais gagné plusieurs jours à la lire en profondeur avant de me lancer, plutôt qu'à courir derrière les surprises."
        },
        {
          type: 'lesson',
          title: "Le multilangue se pense dès le démarrage",
          body: "J'ai tout écrit en français en me disant que je traduirais plus tard. Quand j'ai voulu une seconde langue, j'ai dû reprendre des textes éparpillés un peu partout. Si on pense avoir besoin du multilangue un jour, on l'architecture dès le début, même si on ne livre qu'une langue au lancement. C'est presque gratuit à poser au départ, coûteux à rattraper après coup."
        },
        {
          type: 'lesson',
          title: "La rapidité ressentie compte autant que la vraie",
          body: "Au début, aucun retour visuel pendant les appels à la cartographie. Les gens croyaient que la page avait planté et rechargeaient. Des indicateurs de progression ont changé la perception du site alors que le temps d'attente réel, lui, n'avait pas bougé d'une milliseconde. Depuis, je traite l'attente comme une partie de l'interface, pas comme un détail technique à ignorer."
        },
        {
          type: 'takeaway',
          title: "Mettre en ligne seul, c'est un cap",
          body: "Avant WeDriv, mes mises en ligne étaient des projets d'école faits pour être notés. Là, il a fallu un domaine, un certificat, des emails automatiques, de vrais paiements, du suivi, et personne pour rattraper une erreur. C'est un cap mental autant que technique. Une fois franchi, la mise en ligne cesse d'être l'étape qui fait peur pour devenir la suite normale du développement. C'est ce passage que je retiens vraiment de ce projet."
        }
      ]
    }
  },

  'followdeen': {
    title: 'FollowDeen - Marketplace de Cession de Business',
    description: "Marketplace francophone pour acheter, vendre et s'associer autour de business en ligne (sites, boutiques, applications), avec un paiement sécurisé bloqué jusqu'à la validation de la vente.",
    tags: ['Java', 'Spring Boot', 'Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Docker'],
    year: '2025-2026',
    logo: 'assets/logos/followdeen.svg',
    previewImages: [
      'assets/previews/followdeen/01.png',
      'assets/previews/followdeen/02.png',
      'assets/previews/followdeen/03.png',
      'assets/previews/followdeen/04.png',
      'assets/previews/followdeen/05.png',
      'assets/previews/followdeen/06.png'
    ],
    presentation: "FollowDeen est une marketplace que je développe seul pour permettre l'achat, la vente et la mise en relation autour de business en ligne (e-commerce, SaaS, applications, projets entrepreneuriaux). L'idée est de proposer une alternative aux plateformes existantes (Flippa, Acquire.com, Dotmarket) avec un cadre de confiance fort : vérification humaine des annonces, escrow Stripe réel et grille tarifaire dégressive (8 % en dessous de 5 k€, 5 % entre 5 et 50 k€, 3 % au-delà), sans abonnement.\n\nLa stack repose sur Spring Boot 3.3 et PostgreSQL 16 côté backend, Next.js 15 (App Router, RSC) et Tailwind CSS v4 côté frontend, le tout orchestré par Docker Compose en local. La logique financière est portée par Stripe Connect en mode Separate Charges & Transfers : les fonds restent bloqués sur le compte plateforme jusqu'à validation de la transaction, avant d'être libérés vers le vendeur. Au-delà de la marketplace, le projet intègre une brique « réseau professionnel » pour mettre en relation porteurs de projets et associés.\n\nLe MVP est livré à environ 98 % avec un flow transaction validé de bout en bout sur 9 scénarios différents (happy path, refus d'intérêt, refus d'offre, paiement échoué, annulations pré et post-paiement, signalement de manquement, demande d'annulation post-livraison, changement d'avis acheteur). La mise en production est volontairement repoussée pour finir le polish design et écrire la couverture de tests automatisés.",
    objectives: {
      context: "Projet personnel mené en solo avec l'ambition de livrer une marketplace complète prête pour la production : moteur de recherche full-text, transactions avec escrow, messagerie contextuelle, notifications, back-office d'administration et de finances. Le défi principal est de tenir une exigence d'industrialisation (sécurité, observabilité, robustesse Stripe) sans équipe.",
      goals: "Concevoir et développer une marketplace fullstack avec un vrai escrow Stripe (pas un simple Checkout). Modéliser proprement une state machine de transaction non triviale (9 états, transitions conditionnelles selon le rôle, refunds partiels). Maintenir la cohérence visuelle et UX sur ~24 pages frontend en solo. Préparer un déploiement VPS auto-hébergé (Hetzner + Docker + Nginx + Let's Encrypt).",
      challenges: "Maîtriser Stripe Connect en mode Separate Charges & Transfers pour gérer un escrow réel. La documentation et les tutoriels couvrent surtout les destination charges, beaucoup moins ce mode. Sécuriser le flow de paiement contre les race conditions (clic « annuler » au moment où Stripe confirme). Gérer une incompatibilité entre le SDK Java de Stripe et l'API récente. Tenir le rythme et la qualité sur la durée, sans relecteur de code.",
      risks: "Surcharge de scope au MVP qui repousse la mise en marché. Erreurs sur les calculs de refund partiels (frais Stripe, montant offert, cas post-livraison) avec impact financier direct. Bugs Stripe en production. Perte de cohérence visuelle entre les ~24 pages développées en solo sans designer."
    },
    steps: [
      "Modélisation complète de la state machine transaction (9 états, sous-types d'annulation, transitions conditionnelles selon le rôle)",
      "Intégration Stripe Connect Express (onboarding, PaymentIntent, transfers avec source_transaction, refunds partiels)",
      "Développement backend Spring Boot : Listings, Projets, Transactions, Messagerie, Notifications, Favoris, Admin, Finances",
      "Développement frontend Next.js 15 : ~24 pages publiques et privées, dashboard, page transaction avec stepper, paiement Stripe Elements",
      "Auth complète : JWT signé, refresh rotatif, confirmation email, mot de passe oublié, BCrypt",
      "Validation E2E manuelle de 9 scénarios transaction (T1 happy path à T9 changement d'avis acheteur) en mode test Stripe",
      "Refonte landing page itérative (3 passes) pour atteindre un design propre et cohérent",
      "SEO et performance : metadata dynamiques, JSON-LD (Organization, Product, FAQPage), sitemap, robots.txt, Open Graph",
      "Hardening sécurité : URL admin obfusquée, garde-fou race condition refund, banner cookies CNIL"
    ],
    actors: "Projet réalisé intégralement seul : architecture, backend, frontend, design, intégrations tierces, tests E2E manuels et infrastructure. Quelques retours utilisateurs externes pour valider l'ergonomie de la landing et du flow transaction.",
    results: {
      personal: "FollowDeen m'a fait progresser sur tout ce qui est dur quand on construit une marketplace : Stripe Connect en mode escrow, state machine non triviale, race conditions, hydratation SSR avec Zustand. J'ai aussi appris à tenir une discipline de suivi sur la durée. Un fichier SUIVI.md mis à jour à chaque session, qui m'a évité de perdre le fil sur un projet de cette taille en solo. Et surtout, j'ai compris ce que veut dire « comprehensive vs MVP » : ces deux mots se tirent dessus.",
      business: "MVP à ~98 % : 13 migrations Flyway versionnées, ~24 pages frontend, 9 scénarios transaction validés E2E, escrow Stripe fonctionnel, back-office d'administration et page Finances avec liens directs vers Stripe. La plateforme est prête à passer en production une fois le polish design terminé et les tests automatisés écrits."
    },
    future: "Bascule en production sur VPS Hetzner CAX21 (Docker + Nginx + Let's Encrypt) avec Stripe en mode live. Refonte de la section Projets en vraie plateforme de mise en relation entre porteurs et associés. Couverture de tests automatisés (services backend critiques + composants frontend critiques). Au-delà : alertes de recherche par email, vérification d'identité, badges « vendeur vérifié », système de notation, NDA pré-partage et data room sécurisée pour la due diligence.",
    critique: "Trop de scope au MVP : j'ai voulu Listings + Projets + Messagerie + Notifications + Admin Finances dès le départ, alors qu'une v1 commercialisable aurait pu se contenter de Listings + Transactions. J'ai gagné en complétude, perdu plusieurs semaines de mise en marché. Les tests automatisés ont été écrits trop tard. J'ai validé les flows à la main, ce qui veut dire qu'aujourd'hui le filet de sécurité est dans ma tête, pas dans une CI. La refonte landing s'est faite en pure intuition (3 passes) alors qu'un moodboard et des maquettes Figma en amont auraient économisé une itération. Et côté Stripe, j'aurais probablement dû déporter cette brique sur un microservice Node ou Python : l'écosystème JS/Python pour Stripe est plus à jour que le SDK Java, j'ai perdu du temps sur des incompatibilités d'API.",
    relatedSkills: ['spring-boot', 'nextjs', 'react-nextjs', 'docker', 'optimisation-ux', 'autonomie-resolution', 'vision-produit'],
    majorTasks: [
      {
        title: "1. Stripe Connect en mode escrow réel (Separate Charges & Transfers)",
        context: "Pour avoir un vrai escrow. Fonds bloqués sur le compte plateforme et libérés seulement au statut COMPLETED. Il fallait sortir du mode destination charges (couvert par la majorité des tutos) et passer en Separate Charges & Transfers. Beaucoup d'apprentissage par le code et la doc API plutôt que par les tutoriels.",
        steps: [
          "Onboarding Stripe Connect Express avec collecte des informations vendeur",
          "Création d'un PaymentIntent avec montant calculé serveur uniquement (jamais le client)",
          "Stockage des fonds sur le compte plateforme jusqu'à validation acheteur",
          "Transfer vers le vendeur avec source_transaction au COMPLETED, pour pouvoir transférer des fonds encore pending",
          "Refunds partiels (offeredPrice uniquement, frais Stripe absorbés par l'acheteur en cas d'annulation post-escrow)",
          "Webhook handler avec fallback JSON parsing manuel pour gérer l'incompatibilité SDK Java / API récente 2026-02-25.clover",
          "Filet de sécurité auto-refund si un webhook succeeded arrive sur une transaction déjà CANCELLED"
        ],
        result: "Escrow réel fonctionnel : 9 scénarios transaction validés E2E en mode test, refunds partiels et totaux corrects selon le moment de l'annulation, transfer Stripe au COMPLETED avec source_transaction. Zéro incident de sécurité financière sur le flow de test.",
        learning: "La doc Stripe est excellente sur les destination charges, beaucoup moins sur Separate Charges & Transfers. Il faut lire le SDK et tester chaque cas. Calculer les montants côté serveur est une règle d'or, jamais à confier au client. Et l'incompatibilité SDK / API récente m'a appris à toujours prévoir un parsing JSON manuel en plan B sur les intégrations critiques."
      },
      {
        title: "2. State machine transaction (9 états, transitions conditionnelles)",
        context: "Une transaction de marketplace n'est pas un simple paiement : elle traverse INTEREST_EXPRESSED, OFFER_MADE, OFFER_ACCEPTED, PAYMENT_PENDING, PAYMENT_IN_ESCROW, DELIVERY_PENDING, COMPLETED ou CANCELLED, avec deux sous-types d'annulation (MISSING_DATA pour signalement de manquement vs FULL_CANCELLATION pour annulation pure). Les transitions dépendent du rôle (acheteur / vendeur) et déclenchent des effets de bord différents (refund partiel ou total, transfer, notifications, emails).",
        steps: [
          "Modélisation des 9 états et des transitions autorisées par rôle",
          "Implémentation des sous-types d'annulation (MISSING_DATA = vendeur peut corriger, FULL_CANCELLATION = annulation pure avec récupération des accès)",
          "Effets de bord par transition (refund Stripe, transfer, notifications in-app + email, mises à jour listing)",
          "Définition explicite de 9 scénarios E2E (T1 happy path à T9 changement d'avis acheteur) listés dans le SUIVI",
          "Rejouer manuellement T1 à T9 à chaque changement structurel pour rattraper les régressions silencieuses",
          "Page transaction avec stepper horizontal responsive et bannière action / attente par état"
        ],
        result: "9 scénarios transaction fonctionnels et rejoués E2E : happy path, refus d'intérêt, refus d'offre, paiement échoué, annulations pré-paiement, annulation en escrow par l'acheteur, signalement manquement → correction → validation, demande d'annulation post-livraison avec récupération des accès, changement d'avis acheteur. Le stepper rend la machine compréhensible côté utilisateur.",
        learning: "Le plus dur n'est pas de coder la state machine, c'est de valider chaque chemin sans en oublier. Lister explicitement T1 à T9 dans le SUIVI a rattrapé plusieurs régressions invisibles. Et un stepper visuel rend la machine compréhensible côté utilisateur. Ce qui réduit les questions support."
      },
      {
        title: "3. Race condition sur le paiement (et son filet de sécurité)",
        context: "Le bug invisible classique : l'utilisateur clique « Annuler » à la milliseconde où Stripe confirme le paiement. Sans garde-fou, on se retrouve avec une transaction CANCELLED côté plateforme mais une carte débitée côté Stripe. C'est un trou financier béant.",
        steps: [
          "Côté backend : cancelTransaction explicitement bloqué en PAYMENT_PENDING (renvoie un 409)",
          "Côté frontend : polling 5 secondes du statut transaction sur la page paiement, écran « paiement non disponible » si le statut a changé entre-temps",
          "Filet de sécurité auto-refund si un webhook Stripe succeeded arrive sur une transaction déjà CANCELLED",
          "Logging détaillé de chaque étape du paiement pour traçabilité a posteriori",
          "Tests manuels en simulant le clic concurrent (annuler pendant que Stripe traite)"
        ],
        result: "Trois couches de protection en défense en profondeur. Aucun cas de double débit ou de paiement non remboursé sur les 9 scénarios E2E. Le filet de sécurité auto-refund a déjà rattrapé une transaction de test qui aurait sinon été un trou.",
        learning: "Quand ça marche, la race condition est invisible. C'est précisément ce qui la rend dangereuse. Toujours penser aux flows financiers en défense en profondeur : un blocage côté serveur, un comportement défensif côté client et un filet de sécurité automatique sont trois choses différentes, et il faut les trois."
      },
      {
        title: "4. Hydratation SSR avec Next.js 15 + Zustand",
        context: "Erreurs d'hydratation à répétition au début du projet, parce que Zustand restaurait l'état persisté côté client avant que React ait fini son hydratation, et parce que des SVG décoratifs utilisaient Math.cos / sin avec une précision différente côté serveur et côté client.",
        steps: [
          "Mise en place d'un flag hasHydrated dans le store Zustand",
          "Garde-fou empêchant tout rendu conditionnel basé sur le store tant que l'hydratation n'est pas terminée",
          "Arrondi à 2 décimales sur tous les calculs de positionnement SVG pour stabiliser le rendu serveur / client",
          "Audit des composants utilisant Date.now() ou Math.random() côté SSR pour les remplacer par des valeurs stables"
        ],
        result: "Zéro erreur d'hydratation en console sur l'ensemble des ~24 pages. La landing avec ses animations SVG (motifs en filigrane, dessin au scroll, float infini) tourne proprement en RSC + client components mixtes.",
        learning: "L'hydratation SSR est un piège systématique avec les stores persistés et les calculs flottants. Un flag hasHydrated, c'est trois lignes de code qui évitent une journée de debug. Et arrondir les SVG à 2 décimales est devenu un réflexe."
      },
      {
        title: "5. Back-office et page Finances",
        context: "Une marketplace en production a besoin d'outils de modération (annonces, projets, utilisateurs), de logs filtrables et d'une vue financière pour suivre les transactions et les transferts Stripe sans devoir aller chercher dans le dashboard externe à chaque opération.",
        steps: [
          "URL admin volontairement non standard pour limiter le scan automatisé, avec disallow SEO",
          "Modération des annonces et projets (PENDING, approve, reject, archive, featured)",
          "Gestion des utilisateurs avec recherche, ban / unban, change role, export CSV",
          "CRUD des catégories interdites avec vérification automatique sur mots entiers",
          "Page Finances : KPIs (volume, commissions, refunds) + liste des transactions filtrables avec liens directs vers le dashboard Stripe pour drill-down"
        ],
        result: "Back-office utilisable au quotidien dès la mise en production. Page Finances qui évite les allers-retours vers Stripe pour la majorité des cas. Sécurité par obscurité (URL non standard) en complément du contrôle d'accès JWT.",
        learning: "Un back-office doit être pensé pour les usages quotidiens : actions fréquentes en un clic, filtres tout en haut de page, liens externes vers les dashboards spécialisés (Stripe) pour ne pas réinventer ce qui existe déjà. La sécurité par obscurité ne remplace pas l'auth, elle la complète."
      }
    ],

    // === RICH CONTENT (v2 layout). Projet 100 % autodidacte, thème emerald ===
    rich: {
      theme: 'emerald',
      tagline: "Mon projet personnel le plus ambitieux. Une marketplace pour acheter et revendre des business en ligne, conçue et développée seul, avec l'idée d'en vivre à terme.",
      keyMetrics: [
        { value: '~98 %', label: 'MVP livré' },
        { value: '13', label: 'migrations base' },
        { value: '~24', label: 'pages frontend' },
        { value: '9', label: 'scénarios validés' },
        { value: '1', label: 'développeur (moi)' }
      ],
      presentation: [
        "FollowDeen part d'un constat simple. Beaucoup de gens cherchent à revendre leur site, leur boutique en ligne, leur application ou leur projet entrepreneurial, mais les plateformes qui existent aujourd'hui (Flippa, Acquire.com, Dotmarket) sont peu accessibles, souvent anglophones, et n'inspirent pas toujours confiance. Je veux proposer une alternative francophone, plus simple à prendre en main et plus rassurante : vérification humaine des annonces, paiement bloqué jusqu'à la validation de la vente (le vendeur n'est payé qu'une fois l'acheteur satisfait), et commission dégressive accessible (8 % en dessous de 5 k€, 5 % entre 5 et 50 k€, 3 % au-delà), sans abonnement.",
        "C'est un projet personnel que je mène à long terme, en parallèle de ma vie pro et scolaire. L'ambition, à terme, c'est de le mettre en ligne, d'attirer mes premiers utilisateurs et d'en tirer un revenu via les commissions. Le projet est mené 100 % en autodidacte. Pas d'équipe, pas de designer, pas de relecteur de code. Tout repose sur ma propre organisation : planification en amont, suivi structuré sur toute la durée, scénarios rejoués manuellement à chaque grand changement. C'est cette rigueur qui m'a permis de tenir un projet de cette ampleur sur plusieurs mois sans flotter.",
        "FollowDeen est aussi mon terrain pour pousser des sujets que je n'aurais pas forcément touchés ailleurs : un vrai paiement séquestré (les fonds restent bloqués sur la plateforme avant d'être versés au vendeur), une logique de transaction à plusieurs étapes (selon que l'acheteur paie, valide ou annule), et une vraie attention portée au référencement. C'est aussi le projet qui m'a le plus appris sur ma propre tendance à vouloir tout faire au lieu de livrer."
      ],
      objectives: [
        "Concevoir et développer une marketplace complète avec un vrai escrow sur le paiement",
        "Modéliser une logique de transaction à plusieurs étapes, robuste face aux annulations et aux remboursements",
        "Tenir une cohérence visuelle et UX sur une vingtaine de pages, en solo et sans designer",
        "Préparer une mise en production sur un serveur dédié",
        "Mettre en place une organisation structurée pour ne pas perdre le fil sur la durée",
        "Apprendre à arbitrer seul entre exigence produit et réalité de mise en marché"
      ],
      context: {
        period: "septembre 2025 à aujourd'hui (MVP à ~98 % en mai 2026)",
        framework: "Projet personnel autodidacte, hors cadre scolaire ou professionnel",
        mode: "100 % remote, en parallèle de ma vie pro et scolaire (soirs, week-ends, jours dédiés)",
        team: [
          { role: "Moi", description: "Toutes les casquettes : conception produit, architecture technique, développement backend et frontend, design, intégration des paiements, sécurité, SEO, mise en production, rédaction des conditions générales. Toutes les décisions sont les miennes. C'est exigeant mais c'est aussi ce qui m'a fait grandir le plus rapidement." }
        ],
        organization: [
          "Planification en amont des fonctionnalités à livrer pour le MVP",
          "Suivi structuré du projet mis à jour à chaque session de travail (tâches faites, à faire, points bloquants)",
          "Sessions de travail libres : soirs, week-ends, certains jours dédiés",
          "9 scénarios de transaction formalisés (du parcours nominal au cas du remboursement post-livraison), rejoués à chaque changement structurel",
          "Décisions techniques argumentées par écrit pour me forcer à articuler le pourquoi avant de coder"
        ],
        stack: [
          { label: "Backend", value: "Java, Spring Boot, base de données relationnelle PostgreSQL" },
          { label: "Frontend", value: "Next.js, React, TypeScript, Tailwind CSS" },
          { label: "Paiements", value: "Stripe en mode escrow (les fonds sont bloqués sur la plateforme avant d'être versés au vendeur)" },
          { label: "Authentification", value: "JWT avec confirmation par email et reset de mot de passe" },
          { label: "Infra dev", value: "Docker pour faire tourner l'environnement local" },
          { label: "Infra prod (prévu)", value: "Serveur dédié avec certificat sécurisé et service d'envoi d'emails" },
          { label: "SEO", value: "Méta-données dynamiques, sitemap, données structurées pour les moteurs de recherche" }
        ],
        stakes: [
          "Démontrer ma capacité à mener un projet ambitieux en autonomie complète, de l'idée à la mise en ligne",
          "Me confronter à des sujets que je n'aurais pas forcément touchés ailleurs (paiement séquestré, transaction en plusieurs étapes, sécurité)",
          "Construire un actif personnel sur le long terme. Si la mise en ligne fonctionne, c'est aussi une source de revenu potentielle",
          "Crédibiliser mon profil pour mes futures candidatures avec un projet réel et complet"
        ],
        risks: [
          "Surcharge de scope qui repousse la mise en marché. Déjà arrivé, plusieurs semaines perdues",
          "Bugs sur le paiement avec impact financier direct sur de vrais utilisateurs. L'organisation rigoureuse et les scénarios joués manuellement sont aujourd'hui mon principal filet",
          "Mixer le travail, l'école et un projet personnel ambitieux. Le vrai défi sur la durée, qui se gère à coup de discipline et de sessions structurées",
          "Décalage entre ce que je sais bien faire et ce que demande la mise en marché (marketing, communauté, communication). Un vrai inconnu pour moi"
        ]
      },
      steps: [
        {
          title: "Cadrage produit et planification du MVP",
          description: "Premières semaines : étudier le marché, choisir un positionnement, structurer le projet",
          bullets: [
            "Étude des plateformes concurrentes pour cadrer le positionnement et la grille tarifaire",
            "Définition de la promesse : escrow réel sur le paiement, vérification humaine des annonces, commission dégressive sans abonnement",
            "Choix de la stack technique en autonomie selon les contraintes du projet",
            "Modélisation des entités principales (utilisateurs, annonces, projets, transactions, messages) sur papier puis dans le code",
            "Plan de travail structuré : liste des fonctionnalités nécessaires au MVP, priorisation, suivi régulier des tâches"
          ]
        },
        {
          title: "Fondations backend : authentification, annonces, projets",
          description: "Premier gros chantier : poser les fondations métier sécurisées",
          bullets: [
            "Authentification complète : inscription, connexion, confirmation par email, mot de passe oublié",
            "Gestion des annonces avec recherche full-text, filtres multi-critères, pagination, tri et URL adaptées au SEO",
            "Gestion des projets avec catégories interdites et modération en attente / approuvé / rejeté",
            "Base de données structurée et versionnée dès le départ pour pouvoir évoluer sans casser",
            "Tests manuels sur l'ensemble des points d'entrée API à chaque étape"
          ]
        },
        {
          title: "Paiement en mode escrow",
          description: "Le morceau le plus technique : intégrer un vrai escrow, pas un simple paiement direct",
          bullets: [
            "Inscription du vendeur côté Stripe pour pouvoir recevoir les paiements",
            "Calcul du montant côté serveur uniquement, jamais côté navigateur, pour empêcher toute manipulation",
            "Les fonds sont bloqués sur la plateforme jusqu'à validation finale, puis libérés vers le vendeur",
            "Remboursements partiels en cas d'annulation post-paiement (frais absorbés par celui qui annule)",
            "Filet de sécurité automatique : si un paiement est confirmé après une annulation, le remboursement est déclenché tout seul"
          ]
        },
        {
          title: "Logique de transaction et validation manuelle",
          description: "Modélisation des 9 étapes possibles et formalisation des scénarios à rejouer",
          bullets: [
            "9 états selon le déroulé de la transaction (intérêt exprimé, offre faite, paiement en attente, en escrow, livraison, terminé, annulé)",
            "Transitions différentes selon que c'est l'acheteur ou le vendeur qui agit, avec leurs effets (remboursement, notification, email)",
            "9 scénarios formalisés : parcours nominal, refus, paiement échoué, annulations à différents moments, signalement, changement d'avis",
            "Rejouage manuel de tous les scénarios à chaque changement structurel pour rattraper les régressions silencieuses",
            "Page de transaction avec un stepper visuel et une bannière qui guide l'utilisateur sur l'étape en cours"
          ]
        },
        {
          title: "Frontend : une vingtaine de pages cohérentes",
          description: "Construire une application complète et propre en solo, sans designer",
          bullets: [
            "Mix entre rendu côté serveur pour le SEO et la rapidité et rendu côté client pour l'interactivité",
            "Landing page refondue trois fois pour atteindre une UX juste. La première version était trop chargée",
            "Marketplace avec recherche, filtres, pagination, tri, page détail à deux colonnes, partage et favoris",
            "Espace utilisateur : profil, mes annonces, mes ventes et achats, transactions actives, messages, favoris",
            "Page de transaction avec étapes visuelles et rafraîchissement automatique du statut",
            "Couche SEO complète intégrée dès la conception (méta-données, sitemap, données structurées)"
          ]
        },
        {
          title: "Sécurisation et anticipation des cas limites",
          description: "Anticiper ce qui peut mal tourner sur les flux financiers",
          bullets: [
            "URL d'administration cachée pour limiter le scan automatisé, en complément du contrôle d'accès",
            "Trois couches de protection contre les annulations concurrentes au moment du paiement",
            "Évitement des erreurs de rendu serveur / navigateur sur les composants interactifs",
            "Bannière de consentement aux cookies conforme aux recommandations CNIL",
            "Journalisation détaillée des étapes de paiement pour pouvoir tracer un litige a posteriori"
          ]
        }
      ],
      actors: [
        {
          role: "Moi (porteur unique)",
          description: "Toutes les casquettes : conception produit, architecture, développement, design, intégration des paiements, sécurité, SEO, mise en production, rédaction des conditions générales. Aucun rôle délégué. C'est ce qui rend le projet exigeant et formateur. La seule contre-partie : pas de contre-pouvoir pour me freiner quand le scope glisse, ce qui est arrivé plusieurs fois."
        },
        {
          role: "Beta-testeurs (amis développeurs et entrepreneurs)",
          description: "Sollicités à des moments-clés pour tester la landing et le parcours d'achat / vente. Leurs retours ont déclenché les deux dernières refontes de la landing. C'est eux qui ont mis le doigt sur le fait que la première version sentait trop le template marketing et qu'il fallait simplifier."
        }
      ],
      results: {
        personal: {
          technical: [
            "Intégration d'un vrai escrow sur le paiement",
            "Modélisation et validation manuelle d'une logique de transaction non triviale",
            "Architecture en plusieurs couches de défense sur le paiement",
            "Couche SEO complète intégrée dès la conception",
            "Maîtrise complète d'une stack moderne en autonomie"
          ],
          organizational: [
            "Capacité à planifier et structurer un projet ambitieux sur plusieurs mois sans encadrement",
            "Validation manuelle structurée des parcours utilisateur",
            "Auto-formation continue sur les sujets techniques que je découvrais",
            "Capacité à arbitrer seul entre l'envie de tout perfectionner et la nécessité de livrer (mal joué la première fois, leçon retenue)",
            "Discipline pour avancer sur la durée même quand la motivation baisse. Particulièrement difficile en solo"
          ],
          conclusion: "FollowDeen m'a mis face à une tension que je ne connaissais pas vraiment : « tout vouloir bien faire » contre « livrer une première version ». je penche systématiquement vers le perfectionnisme. Une première version qui sort vaut mieux qu'une version parfaite qui dort dans un dépôt, c'est le vrai apprentissage de ce projet."
        },
        business: {
          achievements: [
            "MVP livré à environ 98 %, prêt à passer en production une fois le polish design terminé",
            "Une vingtaine de pages frontend, une logique de paiement complète, un back-office de modération et une page de suivi des finances",
            "9 scénarios de transaction validés de bout en bout",
            "Architecture prête pour la mise en production",
            "Couche SEO et accessibilité intégrées dès la conception, plutôt que rajoutées en bout de course"
          ],
          satisfaction: [
            "Validation positive de la landing par les beta-testeurs après les trois refontes",
            "Concept et grille tarifaire validés par les communautés en ligne",
            "Aucun incident sur les flux financiers lors des scénarios joués en mode test",
            "Le projet est crédible techniquement aux yeux de autres développeurs"
          ],
          conclusion: "FollowDeen est prêt à passer en production une fois le polish design terminé et quelques tests automatisés écrits. La vraie question n'est plus « est-ce que ça tient techniquement ». J'ai la réponse. Mais « est-ce que je sais faire le marketing ». C'est un changement complet d'orientation qui sera ma prochaine étape, et c'est une compétence que je vais devoir apprendre."
        }
      },
      aftermath: {
        immediate: [
          "Achat du domaine followdeen.fr et configuration des adresses",
          "Mise en ligne sur un serveur dédié avec un certificat sécurisé",
          "Activation des paiements réels (sortie du mode test)",
          "Mise en place d'un service d'envoi d'emails fiable",
          "Installation d'un outil de statistiques respectueux de la vie privée"
        ],
        distant: [
          "Écriture de tests automatisés sur les parties les plus critiques (paiements, transactions)",
          "Refonte de la section Projets en vraie plateforme de mise en relation entre porteurs et associés",
          "Ajout d'alertes de recherche par email, vérification d'identité, badges « vendeur vérifié » et système de notation",
          "Stratégie de lancement (communautés, réseaux, bouche-à-oreille). La partie la plus inconnue pour moi",
          "Traduction du site en anglais à terme, si la traction se confirme"
        ],
        today: [
          "MVP à environ 98 %, encore en local en mode test",
          "Polish design en cours sur quelques pages secondaires",
          "Préparation des visuels pour la landing",
        ]
      },
      critique: [
        {
          type: 'lesson',
          title: "Vouloir tout faire au lieu de livrer",
          body: "J'ai voulu intégrer trop de fonctionnalités dès le départ. Annonces, projets, messagerie, notifications, administration, suivi financier. Alors qu'une première version commercialisable aurait pu se contenter de la marketplace de base. J'ai gagné en complétude, perdu plusieurs semaines de mise en marché. Sur mes prochains projets, je m'imposerai une date de mise en ligne avant même de coder la première ligne."
        },
        {
          type: 'lesson',
          title: "Les tests automatisés ne sont pas un luxe",
          body: "J'ai validé tous les scénarios à la main, ce qui est plus rapide à court terme. Mais aujourd'hui, le filet de sécurité est dans ma tête, pas dans une suite de tests qui tourne automatiquement. Sur un projet solo et long, c'est ce qui permet de revenir au code trois mois plus tard sans tout casser."
        },
        {
          type: 'lesson',
          title: "Le simple gagne, presque toujours",
          body: "La landing a été refondue trois fois. À chaque passage, je partais d'un design trop chargé pour finir sur quelque chose de plus posé. Les designs vraiment propres sont ceux qu'on enlève, pas ceux qu'on remplit. La prochaine fois, je poserai des maquettes simples au crayon avant de toucher au code, ça m'aurait épargné deux des trois refontes."
        },
        {
          type: 'lesson',
          title: "Le bon outil pour le bon problème",
          body: "L'écosystème de Stripe est plus à jour côté JavaScript et Python que côté Java. J'ai perdu plusieurs jours sur des incompatibilités. À refaire, je garderais Spring Boot pour la logique métier et j'utiliserais un petit service séparé pour la partie paiement."
        },
        {
          type: 'lesson',
          title: "Solo sans contre-pouvoir, c'est un piège",
          body: "Travailler seul sans personne pour me challenger m'a appris ma propre tendance à élargir le scope, à privilégier l'élégance technique au pragmatisme, à reporter le moment de mise en ligne. Sur mes prochains projets, je veux soit travailler avec quelqu'un, soit m'imposer des deadlines externes."
        },
        {
          type: 'takeaway',
          title: "L'autonomie est prouvée, et elle a montré ses limites",
          body: "Ce projet a confirmé que je peux mener une marketplace fullstack complète seul, du modèle de données au déploiement, sécurité et SEO compris. Mais il m'a aussi appris à voir ce qu'une équipe apporte et qu'on ne mesure qu'en son absence : un regard qui rattrape l'angle mort, une discussion qui débloque une décision, une énergie collective qui tient la motivation. Pour la suite, surtout pour la mise en marché qui sera mon vrai terrain d'apprentissage, je sais que je ne veux plus avancer totalement seul."
        }
      ]
    }
  },

  'klaridoc': {
    title: 'Klaridoc - Simplification Administrative',
    description: "Application web pour simplifier les documents administratifs grâce à l'IA.",
    tags: ['Python', 'React', 'TypeScript', 'AI', 'PostgreSQL', 'UX Design', 'Product Design'],
    year: '2025-2026',
    logo: 'assets/logos/klaridoc.png',
    presentation: "Klaridoc est un projet personnel en phase de conception dont l'objectif est de transformer des documents administratifs complexes (impôts, assurances, courriers officiels) en explications simples et claires grâce à l'intelligence artificielle.\n\nCe projet est pensé produit avant code. J'ai mené l'intégralité de la démarche en autonomie : recherche utilisateur (interviews, personas, parcours), conception UX (wireframes, maquettes Figma, tests utilisateurs), choix d'architecture technique (Python pour le traitement IA, React pour le frontend, PostgreSQL pour la base), définition du modèle économique (freemium) et planification de la roadmap.\n\nLa recherche utilisateur a révélé que le problème va au-delà de la complexité du langage : les utilisateurs ressentent de l'angoisse face à ces documents et craignent de manquer une information importante. L'interface est conçue pour être rassurante et guidante, pas seulement informative. Le prototype technique utilise des modèles de langage pour analyser et reformuler les documents en identifiant les points clés et les actions requises.",
    objectives: {
      context: "Projet personnel en phase de conception. Le problème adressé est concret : des millions de personnes peinent à comprendre leurs documents administratifs, ce qui crée du stress, des erreurs et parfois des conséquences financières. Le projet vise à résoudre ce problème avec une solution simple et accessible.",
      goals: "Valider le besoin par la recherche utilisateur. Concevoir une expérience utilisateur rassurante et intuitive. Définir l'architecture technique capable de traiter et reformuler des documents complexes. Établir un modèle économique viable. Préparer le développement du MVP.",
      challenges: "Simplifier le contenu sans altérer le sens juridique des documents. Concevoir une interface adaptée à des utilisateurs stressés et peu familiers avec le numérique. Garantir la fiabilité de l'analyse IA sur des documents variés (impôts, assurances, courriers). Trouver le bon positionnement entre simplicité radicale et fonctionnalités attendues.",
      risks: "Erreurs d'interprétation de l'IA pouvant avoir des conséquences pour l'utilisateur. Complexité technique du traitement de documents PDF variés. Difficulté à toucher le public cible (personnes peu à l'aise avec le numérique). Marché concurrentiel avec des acteurs établis."
    },
    steps: [
      "Recherche utilisateur : interviews semi-directives, questionnaires, analyse des retours",
      "Synthèse : personas, parcours utilisateur, identification des points de douleur",
      "Conception UX : wireframes, maquettes Figma, tests utilisateurs itératifs",
      "Choix d'architecture : Python (IA), React (frontend), PostgreSQL (base), API REST",
      "Prototype technique : analyse et reformulation de documents avec modèles de langage",
      "Modèle économique : freemium (3 documents gratuits/mois, premium pour usage illimité)",
      "Cartographie concurrentielle et positionnement différenciant (simplicité radicale)",
      "Roadmap de développement avec priorisation des fonctionnalités MVP"
    ],
    actors: "Projet réalisé intégralement en autonomie. Interviews de particuliers aux profils variés (étudiants, personnes âgées, travailleurs sociaux). Échanges avec des professionnels de l'accompagnement social pour valider le besoin et les cas d'usage.",
    results: {
      personal: "Klaridoc m'a fait sortir du code pur. J'ai appris à faire de la vraie recherche utilisateur, à concevoir des interfaces en pensant aux émotions des gens (pas juste à l'ergonomie), et à définir un modèle économique. C'est le projet qui m'a le plus appris sur la vision produit. Comprendre le problème avant de coder.",
      business: "Le besoin est validé par la recherche utilisateur : les gens galèrent vraiment avec les documents administratifs, et c'est l'angoisse qui domine, pas juste la complexité. Les maquettes sont testées et validées. L'architecture technique est prête. Le modèle freemium est défini (3 docs gratuits/mois). La roadmap est priorisée. Le projet est prêt pour le développement du MVP."
    },
    future: "Le projet passera en phase de développement avec un MVP simple : import du document (PDF ou photo), analyse par IA, reformulation en langage clair avec identification des points clés et des actions requises. Les fonctionnalités ultérieures incluront l'historique des documents, les alertes sur les dates limites, et un assistant conversationnel pour poser des questions sur le document.",
    critique: "J'ai appris qu'il est essentiel de ne pas se précipiter dans le code. La tentation de commencer à développer immédiatement était forte, mais la phase de recherche utilisateur a révélé des insights que je n'aurais pas découverts autrement (l'angoisse prime sur la complexité du langage). La définition du MVP a été difficile : j'ai dû résister à l'envie d'intégrer trop de fonctionnalités. Le choix du nom et du domaine a pris plus de temps que prévu, une leçon sur l'importance du branding même pour un MVP. La fiabilité de l'IA reste un défi : les reformulations ne sont pas toujours justes, ce qui nécessitera des mécanismes de vérification humaine.",
    relatedSkills: ['autonomie-resolution', 'vision-produit', 'optimisation-ux'],
    majorTasks: [
      {
        title: "1. Recherche utilisateur approfondie",
        context: "Comprendre en profondeur les difficultés liées aux documents administratifs avant de concevoir quoi que ce soit. Identifier les vrais points de douleur plutôt que de supposer les besoins.",
        steps: [
          "Préparation de guides d'interview semi-directifs avec questions ouvertes",
          "Interviews de 12 particuliers aux profils variés (étudiants, retraités, travailleurs sociaux)",
          "Questionnaire en ligne pour valider les hypothèses à plus grande échelle",
          "Analyse thématique des retours : identification des patterns récurrents",
          "Création de 3 personas représentant les profils types d'utilisateurs",
          "Cartographie des parcours utilisateurs actuels (sans solution numérique)"
        ],
        result: "Insight majeur : le problème n'est pas seulement la complexité du langage mais l'angoisse de manquer une information importante. Les utilisateurs veulent être rassurés autant qu'informés. Les personas ont guidé toutes les décisions de conception.",
        learning: "La recherche utilisateur est le meilleur investissement en début de projet. Elle évite de construire une solution au mauvais problème. Les questions ouvertes révèlent des insights inattendus que les questionnaires fermés ne capturent pas."
      },
      {
        title: "2. Conception UX et tests utilisateurs",
        context: "Créer une interface qui soit non seulement claire et simple, mais surtout rassurante pour des utilisateurs souvent stressés par les documents administratifs.",
        steps: [
          "Création de wireframes low-fidelity pour tester les flux principaux",
          "Design system rassurante : couleurs douces, typographie lisible, espaces généreux",
          "Maquettes haute fidélité sur Figma avec composants réutilisables",
          "Tests utilisateurs itératifs (3 rounds de tests avec 4 utilisateurs à chaque fois)",
          "Itérations sur les retours : simplification du parcours d'import de document",
          "Validation finale de l'interface avec les personas identifiés"
        ],
        result: "Interface validée comme simple, compréhensible et rassurante par les utilisateurs testés. Le parcours d'import de document a été simplifié de 5 étapes à 2 après les tests. Le ton de l'interface a été ajusté pour être plus rassurant (vocabulaire, couleurs).",
        learning: "Tester l'UX avant de coder fait gagner énormément de temps. Les utilisateurs stressés ont besoin de feedback constant (progression, confirmation). La simplicité apparente nécessite beaucoup de travail de conception en amont."
      },
      {
        title: "3. Architecture technique et prototype IA",
        context: "Définir une stack technique capable de traiter des documents PDF variés et de les reformuler avec l'IA, tout en restant simple et maintenable pour un MVP.",
        steps: [
          "Évaluation des options de stack technique (Python vs Node.js pour l'IA, React vs Vue pour le frontend)",
          "Choix : Python (richesse de l'écosystème IA), React (maîtrise et écosystème), PostgreSQL (robustesse)",
          "Prototype de pipeline IA : extraction du texte PDF, analyse structurelle, reformulation par LLM",
          "Tests sur des documents réels variés (avis d'imposition, relevés de comptes, courriers Sécu)",
          "Évaluation de la qualité des reformulations et identification des limites"
        ],
        result: "Architecture technique définie et documentée. Prototype IA fonctionnel capable d'analyser et reformuler des documents courants. Identification des cas limites où l'IA manque de fiabilité.",
        learning: "La qualité de la reformulation IA dépend fortement de la structuration du prompt et du contexte fourni. Les documents administratifs ont des formats très variés, ce qui complique l'extraction automatique. Un mécanisme de vérification humaine sera nécessaire pour les cas critiques."
      },
      {
        title: "4. Modèle économique et positionnement",
        context: "Rendre le projet viable sur le long terme en définissant un modèle économique réaliste et un positionnement différenciant sur un marché concurrentiel.",
        steps: [
          "Cartographie de la concurrence (LegalStart, HelloDoc, services publics)",
          "Identification du positionnement différenciant : simplicité radicale pour le grand public",
          "Définition du modèle freemium : 3 documents gratuits/mois, premium pour usage illimité",
          "Estimation des coûts (hébergement, API IA, stockage) et du seuil de rentabilité",
          "Définition du MVP minimal : import, analyse, reformulation, 3 types de documents",
          "Création de la roadmap de développement avec priorisation MoSCoW"
        ],
        result: "Vision produit claire avec un positionnement différenciant (simplicité pour le grand public vs outils experts). Modèle économique freemium défini. Roadmap de développement priorisée. Budget prévisionnel estimé.",
        learning: "Un projet doit être utile mais aussi viable. Le positionnement est aussi important que le produit : mieux vaut être excellent sur un créneau simple que moyen sur un créneau large. Le MVP doit être impitoyablement minimal."
      },
      {
        title: "5. Planification du développement MVP",
        context: "Préparer la phase de développement en définissant clairement le périmètre, les priorités et les critères de succès du MVP.",
        steps: [
          "Définition des user stories du MVP avec critères d'acceptation",
          "Priorisation MoSCoW : Must (import, analyse, reformulation), Should (historique), Could (alertes), Won't (assistant)",
          "Estimation des charges de développement par fonctionnalité",
          "Définition des critères de qualité IA (précision, fiabilité, temps de traitement)",
          "Plan de tests utilisateurs post-MVP",
          "Critères de succès du MVP (taux de reformulation correcte, satisfaction utilisateur)"
        ],
        result: "Plan de développement complet et réaliste. Périmètre MVP clairement défini et validé. Critères de succès mesurables. Le projet est prêt pour le développement.",
        learning: "La planification rigoureuse d'un MVP évite le feature creep qui tue les projets. Les critères de succès doivent être définis avant le développement, pas après. Chaque fonctionnalité ajoutée au MVP doit justifier sa présence."
      }
    ]
  },

};

// Ordre d'affichage des projets dans le panneau latéral.
// Reflète l'ordre de la page commune des réalisations.
const PROJECTS_ORDER: string[] = ['venalabs', 'macway', 'followdeen', 'wedriv', 'portfolio'];

// Couleur d'accent par projet (cohérent avec leur identité).
const PROJECT_COLORS: Record<string, string> = {
  'venalabs': '#8b5cf6',
  'macway': '#0ea5e9',
  'followdeen': '#10b981',
  'wedriv': '#f59e0b',
  'portfolio': '#6366f1',
};

type SidebarProject = {
  id: string;
  title: string;
  year: string;
  logo?: string;
  color: string;
};

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, NgClass, LucideAngularModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss'
})
export class ProjectDetailComponent {
  private route = inject(ActivatedRoute);
  id = '';
  project: Project | null = null;

  // Liste pré-calculée pour le panneau latéral.
  readonly sidebarProjects: SidebarProject[] = PROJECTS_ORDER
    .filter(k => projectsData[k])
    .map(k => ({
      id: k,
      title: this.shortenTitle(projectsData[k].title),
      year: projectsData[k].year,
      logo: projectsData[k].logo,
      color: PROJECT_COLORS[k] ?? '#6366f1',
    }));

  constructor() {
    // On réagit aux changements de paramètre pour que la navigation depuis
    // le panneau latéral mette bien à jour la réalisation affichée.
    this.route.paramMap
      .pipe(takeUntilDestroyed())
      .subscribe(p => {
        this.id = p.get('id') ?? '';
        this.project = projectsData[this.id] ?? null;
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }

  private shortenTitle(title: string): string {
    // Format "VenaLabs - Crypto Learning" -> "VenaLabs"
    const dash = title.indexOf(' - ');
    return dash > 0 ? title.slice(0, dash) : title;
  }

  private skillsInfo: Record<string, { name: string; logo?: string; icon?: string }> = {
    'symfony':              { name: 'Symfony',                                    logo: 'assets/logos/symfony.png' },
    'angular':              { name: 'Angular',                                    logo: 'assets/logos/angular.png' },
    'react-nextjs':         { name: 'React',                                      logo: 'assets/logos/react.png' },
    'nextjs':               { name: 'Next.js',                                    logo: 'assets/logos/nextjs.png' },
    'spring-boot':          { name: 'Spring Boot',                                logo: 'assets/logos/spring-boot.png' },
    'docker':               { name: 'Docker',                                     logo: 'assets/logos/docker.png' },
    'optimisation-ux':      { name: 'UX & Performance',                           logo: 'assets/logos/ux-ui.png' },
    'collaboration-agile':  { name: 'Méthode agile Scrum',                        logo: 'assets/logos/agile.png' },
    'autonomie-resolution': { name: 'Autonomie',                                  logo: 'assets/logos/autonomie.png' },
    'vision-produit':       { name: 'Esprit produit',                             logo: 'assets/logos/product-design.png' },
  };

  tags(p: Project) { return p.tags ?? []; }

  getSkillName(skillId: string): string {
    return this.skillsInfo[skillId]?.name ?? skillId;
  }

  getSkillLogo(skillId: string): string | undefined {
    return this.skillsInfo[skillId]?.logo;
  }

  // Galerie preview (projets pas encore en ligne)
  lightboxImage = signal<string | null>(null);

  scrollToPreview(): void {
    document.getElementById('preview-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToAnnexes(): void {
    document.getElementById('annexes-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openLightbox(src: string): void {
    this.lightboxImage.set(src);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxImage.set(null);
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.lightboxImage()) this.closeLightbox();
  }
}
