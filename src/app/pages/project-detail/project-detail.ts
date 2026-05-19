import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  theme?: 'default' | 'emerald' | 'amber' | 'violet' | 'sky' | 'gold';
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
};

type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  logo?: string;
  url?: string;            // lien vers le projet en ligne (affiché dans le header)
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
        "Ce portfolio est le projet que tu es en train de lire. C'est à la fois la vitrine de mon parcours, cinq projets et dix compétences détaillés, et un projet technique à part entière, conçu pour valider des notions de mon cursus tout en servant à mes candidatures professionnelles.",
        "C'est aussi mon premier vrai projet Angular. Avant ça, je faisais surtout du React (côté startup et freelance) et du Symfony / Twig (côté alternance). Angular, je l'avais croisé pendant mes études mais jamais sur un projet ambitieux, jamais avec ses dernières fonctionnalités. Repartir sur ce framework m'a obligé à réapprendre des automatismes : on n'écrit pas un composant Angular comme un composant React, on n'organise pas la navigation pareil, et le système de réactivité (les signals) demande de désapprendre certains réflexes pris ailleurs. C'est inconfortable au début, et c'est précisément pour ça que j'ai voulu y passer du temps : ça force à reprendre les choses depuis le début, pas en mode automatique.",
        "Le travail le plus dur n'a pas été le code, mais la rédaction. Reprendre chacun de mes projets un par un (MacWay, VenaLabs, FollowDeen, WeDriv) pour les raconter avec la même structure (présentation, objectifs, contexte, étapes, acteurs, résultats, lendemains, regard critique) m'a forcé à prendre du recul sur tout mon parcours. C'est en réécrivant chaque projet que j'ai vu des fils rouges que je n'avais pas conscientisés : le passage du « code école » au « code prod » à MacWay, la rigueur de validation manuelle qui revient sur mes projets solo, des réflexes techniques qui se répondent d'un projet au suivant. Ce portfolio est donc autant un exercice technique qu'un exercice d'introspection. Et c'est cette double dimension qui en fait le projet le plus formateur de la liste, contre toute attente."
      ],
      objectives: [
        "Construire un portfolio qui dépasse le simple site vitrine, pour devenir une démonstration technique de ce que je sais faire en frontend",
        "M'approprier sérieusement Angular avec ses dernières fonctionnalités, plutôt que d'en rester à des connaissances scolaires",
        "Concevoir une architecture extensible : ajouter une compétence ou un projet doit être une question de données, pas de code",
        "Reprendre chaque projet en profondeur pour le raconter avec une structure cohérente couvrant les sept notions exigées par mon cursus",
        "Tirer un fil de cohérence sur tout mon parcours : ce que j'ai appris où, comment ça se transpose, ce que j'en garde aujourd'hui",
        "Livrer un site rapide, accessible et lisible sur tous les écrans, qui me serve sur la durée pour mes candidatures"
      ],
      context: {
        period: "Mars 2026 à Mai 2026 (en parallèle de l'école et de mon alternance)",
        framework: "Projet personnel autodidacte, en lien avec mon cursus pour la validation des compétences",
        mode: "100 % remote, sur soirs et week-ends",
        team: [
          { role: "Moi", description: "Toutes les casquettes : conception du parcours, architecture Angular, design system, rédaction du contenu (cinq projets et dix compétences), accessibilité, déploiement. Surtout, c'est moi qui ai dû me confronter à la rédaction. La partie la plus longue et la plus formatrice du projet." }
        ],
        organization: [
          "Plan de travail défini en amont : structure du site, liste des compétences à présenter, projets à reprendre, sept notions à couvrir par projet",
          "Itérations courtes : une compétence ou un projet à fond avant de passer au suivant, pour ne jamais avoir un site à moitié fini",
          "Mises en ligne progressives à chaque jalon validé, plutôt qu'en gros lots",
          "Auto-relecture systématique à 24h d'intervalle pour rattraper ce que j'écris « dans le rush »",
          "Recherche d'inspiration sur d'autres portfolios professionnels pour valider les choix de structure et de ton"
        ],
        stack: [
          { label: "Framework principal", value: "Angular avec composants autonomes (sans NgModules), réactivité par signals et chargement à la demande des pages" },
          { label: "Langage", value: "TypeScript en mode strict, avec des types discriminés pour gérer plusieurs versions de contenu (legacy / enrichi)" },
          { label: "Style", value: "Tailwind CSS pour l'utilitaire, SCSS pour les composants spécifiques et les variables de thème" },
          { label: "Système de thèmes", value: "Variables CSS surchargées localement par projet. Chaque réalisation a sa propre couleur sans dupliquer le style" },
          { label: "Routing", value: "Routes paresseuses pour ne charger que ce qui est utile à l'utilisateur, et navigation typée" },
          { label: "Hébergement", value: "GitHub Pages avec déploiement automatique à chaque mise à jour validée" },
        ],
        stakes: [
          "Valider les compétences attendues par mon cursus avec un projet réel, pas une démo de TP",
          "Crédibiliser mon profil pour mes candidatures futures. Un portfolio bien fait pèse plus que dix lignes de CV",
          "M'approprier Angular en profondeur sur un projet où j'ai le temps de bien faire les choses",
          "Obtenir un actif personnel durable, qui me servira pendant des années et que je pourrai faire évoluer",
          "Tirer du sens de mon parcours en le racontant avec recul, plutôt que d'aligner des projets sans fil conducteur"
        ],
        risks: [
          "Passer trop de temps sur le design ou la technique au détriment du contenu. Le contenu reste le cœur du portfolio",
          "Sur-architecturer pour un projet qui n'en a pas besoin (un portfolio n'est pas une marketplace)",
          "Sous-estimer le temps de rédaction. C'est arrivé, et c'est ce qui a pris le plus de temps au final",
          "Perdre la cohérence visuelle entre les pages projets et compétences en multipliant les variations",
          "Mettre en ligne un site avec des incohérences (typos, dates, liens cassés) qui décrédibiliseraient le reste"
        ]
      },
      steps: [
        {
          title: "Cadrage et choix techniques",
          description: "Premières semaines : poser les fondations du site et le périmètre du contenu",
          bullets: [
            "Définition du périmètre : dix compétences à présenter, cinq projets à reprendre, sept notions par projet",
            "Choix d'Angular comme framework principal. Premier vrai projet Angular pour moi, l'occasion de l'apprendre proprement",
            "Choix de Tailwind pour gagner du temps sur le style utilitaire, complété par SCSS pour les composants spécifiques",
            "Modélisation initiale des types TypeScript pour les compétences et les projets",
            "Décision dès le départ d'une architecture pilotée par les données, pour pouvoir ajouter du contenu sans toucher à la structure"
          ]
        },
        {
          title: "Apprentissage d'Angular et premières pages",
          description: "La courbe d'apprentissage : se réapproprier un framework qu'on connaît mal sur un projet ambitieux",
          bullets: [
            "Lecture de la documentation officielle d'Angular sur les composants autonomes, les signals et le routing à la demande",
            "Petits exercices pour me familiariser avec les nouvelles syntaxes (boucles, conditions, switch dans les templates)",
            "Construction de la première page (l'accueil) en partant des fondamentaux, pour valider ma compréhension avant de produire en série",
            "Mise en place du routing avec chargement à la demande pour que chaque page n'apporte que ce dont elle a besoin",
            "Premier piège évité de justesse : appeler les signals comme des variables au lieu de fonctions. Le compilateur TypeScript m'a sauvé plusieurs fois"
          ]
        },
        {
          title: "Composants partagés et système de thèmes",
          description: "Construire les briques de base et le moteur visuel qui rend chaque projet unique",
          bullets: [
            "Conception du composant carte projet : logo, titre, description, tags avec dépassement géré (« +N » si plus de cinq)",
            "Conception du composant carte compétence : logo ou icône, nom, catégorie, état d'expertise",
            "Système de thèmes par variables CSS : chaque projet peut surcharger les couleurs de la page sans dupliquer le style",
            "Cinq thèmes définis (par défaut, emerald, sky, gold, violet) pour différencier visuellement les projets sans casser la cohérence",
            "Composants accessibles dès la conception (rôles ARIA, navigation clavier, contraste validé)"
          ]
        },
        {
          title: "Pages détaillées des compétences",
          description: "Dix fiches compétences avec une identité visuelle propre à chacune",
          bullets: [
            "Définition d'une structure commune (présentation, anecdotes au format STAR, autocritique, évolution, projets associés)",
            "Implémentation d'un système qui route chaque compétence vers un en-tête visuel unique selon son identité",
            "Couleurs et accents spécifiques par compétence (Symfony violet, Angular rouge, Spring Boot vert, etc.) sans dupliquer la logique",
            "Intégration d'icônes Lucide pour les compétences sans logo (sécurisation, données, UX, agile, autonomie, vision)",
            "Rédaction des dix fiches au format STAR, avec une vraie autocritique sur chacune. Pas de la fausse modestie"
          ]
        },
        {
          title: "Pages détaillées des projets et reprise du contenu",
          description: "La partie qui a pris le plus de temps : reprendre chaque projet en profondeur, avec une structure unifiée",
          bullets: [
            "Conception d'un système à deux versions : un format hérité et un format enrichi avec sept sections détaillées (présentation, objectifs, contexte, étapes, acteurs, résultats, lendemains, regard critique)",
            "Migration progressive de chaque projet vers le format enrichi, avec une vraie réflexion personnelle sur chacun",
            "Cartes individuelles pour le regard critique avec distinction entre leçons apprises et acquis durables",
            "Bandeaux de chiffres-clés pour donner immédiatement les ordres de grandeur du projet",
            "Cohérence du ton sur tous les projets : personnel, lucide, sans jargon inutile"
          ]
        },
        {
          title: "Polish, accessibilité et mise en ligne",
          description: "Finitions et passage en ligne avec un déploiement automatisé",
          bullets: [
            "Optimisations SEO : balises meta, structure HTML sémantique, hiérarchie des titres",
            "Accessibilité validée : rôles ARIA, navigation clavier, contraste de couleurs respectant les standards",
            "Performances : routes chargées à la demande, optimisation des images, suppression du code mort",
            "Configuration de GitHub Pages avec déploiement automatique à chaque mise à jour",
            "Tests manuels sur mobile, tablette et desktop pour valider l'affichage et les interactions"
          ]
        }
      ],
      actors: [
        {
          role: "Moi (porteur unique)",
          description: "Toutes les casquettes : conception, architecture, design, développement, rédaction, accessibilité, déploiement. La spécificité de ce projet, c'est que j'étais à la fois le développeur ET le sujet. Chaque ligne de contenu parle d'expériences que j'ai vécues, ce qui rend la rédaction plus exigeante : impossible de bluffer."
        },
        {
          role: "Famille et amis (premiers lecteurs)",
          description: "Sollicités à différents moments pour relire les pages compétences et projets. Leurs retours étaient précieux quand ils ne comprenaient pas une phrase ou un terme technique. C'était le signe que je devais simplifier. C'est grâce à eux que j'ai banni plusieurs jargons et reformulé certains paragraphes. Un portfolio doit être lisible par un recruteur non-tech."
        },
        {
          role: "Recruteurs et professionnels (relectures ponctuelles)",
          description: "Quelques échanges avec des recruteurs et des développeurs plus expérimentés que moi pour valider la profondeur du contenu et la qualité technique perçue. Leurs retours m'ont confirmé deux choses : la richesse du contenu fait la différence (la majorité des portfolios sont superficiels), et la lucidité sur ses propres limites (l'autocritique honnête) est plus crédible que l'auto-promotion."
        }
      ],
      results: {
        personal: {
          technical: [
            "Première vraie maîtrise d'Angular avec ses fonctionnalités modernes (composants autonomes, signals, chargement à la demande)",
            "Architecture pilotée par les données qui rend l'ajout de contenu trivial (une compétence ou un projet en plus = quelques lignes de TypeScript)",
            "Système de thèmes par variables CSS qui permet de personnaliser chaque projet sans dupliquer le style",
            "Système à deux versions de contenu (hérité / enrichi) sans casser la rétrocompatibilité. Un bon exercice de typage discriminé en TypeScript",
            "Site rapide, accessible, responsive, déployé automatiquement"
          ],
          organizational: [
            "Capacité à mener un projet long en parallèle de l'école et de l'alternance, en restant focus sur le contenu plus que sur la technique",
            "Discipline d'écriture : reprendre cinq projets un par un avec la même exigence, sans bâcler les derniers",
            "Capacité à tenir une cohérence de ton sur un gros volume de contenu sans tomber dans le copier-coller d'un projet à l'autre",
            "Auto-relecture systématique pour rattraper les phrases écrites trop vite",
            "Validation par des relecteurs externes (proches, pros) pour rattraper ce que je ne voyais plus"
          ],
          conclusion: "Le code de ce portfolio m'a appris Angular. Sa rédaction m'a appris autre chose, de moins attendu. Reprendre chaque réalisation, chercher les fils rouges, séparer ce que j'avais compris en route de ce que je sais désormais faire, ça m'a sorti de la posture du développeur qui livre du code pour celle du professionnel qui sait dire ce qu'il vaut. Articuler son propre travail est une compétence à part entière. Personne ne me l'avait jamais demandée aussi frontalement, et c'est ce que je garde de ce projet."
        },
        business: {
          achievements: [
            "Dix fiches compétences détaillées au format STAR, chacune avec sa propre identité visuelle",
            "Cinq projets approfondis avec une structure unifiée couvrant les sept notions exigées par le cursus",
            "Site déployé en production avec déploiement automatique à chaque mise à jour",
            "Architecture extensible qui rend l'ajout d'un nouveau projet ou d'une nouvelle compétence trivial",
            "Cohérence visuelle et tonale sur l'ensemble du site, malgré la diversité des contenus"
          ],
          satisfaction: [
            "Validation positive du contenu par des proches non-tech (preuve de lisibilité)",
            "Validation positive de la qualité technique par des développeurs plus expérimentés",
            "Site utilisable comme support pour mes candidatures dès maintenant, sans avoir à le retoucher pour chaque opportunité",
            "Le site lui-même est la meilleure preuve de ce qu'il décrit. Il n'y a pas d'écart entre la promesse et la livraison"
          ],
          conclusion: "Ce portfolio est un actif personnel construit pour durer. Il me servira pour mes candidatures, mais aussi de base pour les versions futures que j'aurai envie de faire évoluer dans les prochaines années. L'architecture est faite pour ça. Chaque nouveau projet ou nouvelle compétence est une question de contenu, pas de refonte technique. C'est ce qui m'aurait le plus manqué si j'avais bâclé les fondations."
        }
      },
      aftermath: {
        immediate: [
          "Mise en ligne définitive sur le nom de domaine et déploiement automatique en place",
          "Diffusion auprès de mon réseau (LinkedIn, anciens collègues, recruteurs avec qui j'avais des échanges en cours)",
          "Relecture finale par quelques personnes de confiance pour rattraper les dernières typos",
          "Sauvegarde du repository et configuration des sauvegardes automatiques"
        ],
        distant: [
          "Séparation des données du code (passage à des fichiers JSON externes ou à un système de gestion de contenu) pour faciliter les mises à jour",
          "Ajout d'un mode sombre travaillé, avec des thèmes de projets adaptés aux deux modes",
          "Animations de transition entre les pages pour une sensation de fluidité plus marquée",
          "Section blog ou journal pour publier de courts retours d'expérience entre deux projets",
          "Versions internationales (anglais) si je vise des opportunités à l'étranger"
        ],
        today: [
          "Le portfolio est en ligne et utilisé activement pour mes candidatures",
          "Je continue à enrichir le contenu au fil des nouveaux projets et des nouvelles compétences acquises",
          "L'architecture mise en place me permet d'ajouter rapidement un nouveau projet : il m'a fallu environ une heure pour intégrer FollowDeen une fois la structure stabilisée",
          "Le site reste vivant : je le retouche dès qu'un projet avance ou qu'une compétence se précise, sans jamais repartir de zéro"
        ]
      },
      critique: [
        {
          type: 'lesson',
          title: "J'ai sous-estimé le temps de rédaction",
          body: "J'ai initialement budgété ce projet comme un projet technique, en sous-estimant complètement le temps de rédaction. Reprendre cinq projets en profondeur, écrire dix fiches compétences au format STAR, formuler une autocritique honnête sur chaque sujet. C'est ce qui a pris le plus de temps, et de loin. À refaire, je donnerais autant de poids à la rédaction qu'à la technique dans le planning."
        },
        {
          type: 'lesson',
          title: "Séparer les données du code, j'aurais dû y penser plus tôt",
          body: "J'ai mis tout le contenu (compétences, projets, sections) directement dans des fichiers TypeScript. Ça marche, mais chaque correction de texte demande de toucher au code et de relancer un build. Sur la prochaine itération, je passerai les données dans des fichiers externes ou un service dédié. Un site qui est d'abord de l'éditorial gagne toujours à séparer le contenu de la présentation."
        },
        {
          type: 'lesson',
          title: "Auto-relire à 24h d'intervalle change tout",
          body: "Plusieurs paragraphes que je trouvais clairs le soir me paraissaient confus le lendemain. Ce décalage d'une journée me rapproche du regard d'un lecteur qui découvre le texte. Je ne mets plus rien en ligne sans cette relecture à froid. C'est le filtre le plus simple et le plus efficace que j'aie trouvé contre les phrases bâclées."
        },
        {
          type: 'takeaway',
          title: "Le vrai apprentissage, c'était le recul sur tout le parcours",
          body: "En racontant chaque projet avec la même grille, j'ai vu apparaître des fils rouges que je n'avais jamais formulés : le passage du code d'école au code de prod chez MacWay, la rigueur de validation qui revient sur mes projets solo, les réflexes que je traîne d'un projet au suivant. Ce regard d'ensemble sur mon propre parcours, aucun projet pris isolément ne me l'avait donné. C'est précisément ce que cet exercice de portfolio m'a apporté."
        },
      ]
    }
  },

  'venalabs': {
    title: 'VenaLabs - Plateforme Crypto Learning',
    description: "Plateforme pour apprendre le Web3 et suivre des airdrops crypto avec un système de gamification.",
    tags: ['Java', 'Spring Boot', 'React', 'Next.js', 'PostgreSQL', 'REST API', 'Amplitude', 'Web3'],
    year: '2025-2026',
    logo: 'assets/logos/venalabs.png',
    url: 'https://venalabs.com',
    presentation: "VenaLabs est une startup Web3 spécialisée dans l'apprentissage de la crypto et l'optimisation des airdrops. Pendant mon alternance d'un an en 2025, j'ai travaillé comme développeur fullstack au sein d'une équipe de 3 développeurs. Le backend repose sur Spring Boot avec une architecture hexagonale, le frontend sur React et Next.js, et la base de données sur PostgreSQL.\n\nJ'ai développé des fonctionnalités clés : le système de Custom Airdrop (création et suivi d'airdrops personnalisés), le leaderboard avec gamification, la Course Map (carte interactive de parcours d'apprentissage), des composants du back-office pour l'équipe marketing, et l'intégration analytics avec Amplitude pour le suivi comportemental des utilisateurs.\n\nLe Web3 et la blockchain, je n'y connaissais rien en arrivant. J'ai dû apprendre les fondamentaux (blockchain, wallets, transactions, smart contracts, tokenomics) en même temps que je livrais du code. En quelques semaines j'étais autonome sur les sujets crypto. C'est la preuve que je sais monter en compétence vite quand le contexte l'exige.",
    objectives: {
      context: "Alternance dans une startup Web3 avec une petite équipe de 2 à 3 développeurs. La plateforme s'adresse aux débutants qui veulent apprendre la crypto et participer à des airdrops. L'équipe travaille en sprints de 2 semaines avec des priorités qui évoluent fréquemment selon les retours utilisateurs et la stratégie produit.",
      goals: "Développer des fonctionnalités fullstack complexes : système de Custom Airdrop, gamification avec leaderboard, Course Map interactive, back-office et analytics. Contribuer à l'architecture technique et à la qualité du code. Monter en compétence sur le Web3 rapidement.",
      challenges: "Apprendre le domaine Web3 (blockchain, wallets, airdrops) tout en étant productif. Concevoir des interfaces React complexes avec gestion d'état avancée. Développer un backend Spring Boot sécurisé avec authentification JWT. Intégrer des analytics server-side avec Amplitude. Gérer la complexité d'un système de gamification performant.",
      risks: "Courbe d'apprentissage du Web3 impactant la productivité. Complexité de la sécurisation des données sensibles (wallets crypto). Performance du leaderboard avec un nombre croissant d'utilisateurs. Adoption de la plateforme par les utilisateurs débutants."
    },
    steps: [
      "Apprentissage des fondamentaux Web3 et blockchain (wallets, transactions, airdrops)",
      "Développement du système de Custom Airdrop (wizard multi-étapes, API, validation)",
      "Création de composants back-office pour la gestion des cours et airdrops",
      "Intégration des analytics Amplitude (tracking serveur, événements structurés, dashboards)",
      "Développement du leaderboard et du système de gamification (points, niveaux, classement)",
      "Création de la Course Map interactive (visualisation des parcours, prérequis, progression)"
    ],
    actors: "Équipe de 3 développeurs fullstack et une équipe marketing. Travail en sprints de 2 semaines avec daily standups, sprint reviews et rétrospectives. Revues de code systématiques et pair programming sur les sujets complexes. Démos régulières à l'équipe marketing.",
    results: {
      personal: "J'ai vraiment progressé en Java et Spring Boot sur ce projet. Passer du PHP/Symfony au Java en production, ça m'a forcé à être rigoureux. J'ai aussi découvert le Web3 en partant de zéro et j'ai fini par être à l'aise sur les sujets blockchain. Le travail en petite équipe agile m'a appris à communiquer clairement et à défendre mes choix techniques en sprint review.",
      business: "Le Custom Airdrop est en production et c'est devenu LA feature qui différencie VenaLabs des concurrents. Le leaderboard a boosté l'engagement : les utilisateurs reviennent pour monter dans le classement. La Course Map a amélioré le taux de complétion des parcours. Le back-office a rendu l'équipe marketing autonome. Ils n'ont plus besoin de nous pour publier du contenu. Et Amplitude leur donne les données pour piloter le produit."
    },
    future: "Tout ce que j'ai développé est en production et utilisé au quotidien. L'architecture hexagonale fait que l'équipe peut ajouter des features sans tout casser. Pour moi, cette alternance m'a donné une vraie base fullstack Java/React et une compréhension du Web3 que je peux réutiliser ailleurs.",
    critique: "La courbe d'apprentissage du Web3 a été plus raide que prévu : j'aurais gagné du temps en structurant mieux mon apprentissage initial plutôt que d'apprendre au fil de l'eau. Certains choix UX du Custom Airdrop étaient trop complexes et ont dû être simplifiés après des tests utilisateurs : une validation UX en amont aurait évité ce travail de refonte. J'aurais aussi dû insister davantage sur l'ajout de tests automatisés dès le départ. Le tracking Amplitude a montré des incohérences dans les premières semaines car le catalogue d'événements n'était pas assez formalisé.",
    relatedSkills: ['spring-boot', 'react-nextjs', 'nextjs', 'docker', 'collaboration-agile', 'autonomie-resolution'],
    majorTasks: [
      {
        title: "1. Système de Custom Airdrop",
        context: "Fonctionnalité clé permettant aux utilisateurs de créer, configurer et suivre leurs propres airdrops personnalisés. Le système implique un wizard multi-étapes côté frontend React et des endpoints Spring Boot sécurisés côté backend.",
        steps: [
          "Conception du modèle de données (entités JPA : Airdrop, Step, Reward, Progress)",
          "Développement des endpoints REST avec validation et sécurité JWT",
          "Création du wizard multi-étapes React avec hooks personnalisés et React Query",
          "Implémentation de la validation automatique de progression",
          "Simplification de l'UX après retours des tests utilisateurs",
          "Gestion de l'optimistic update pour une UX fluide"
        ],
        result: "Fonctionnalité en production utilisée quotidiennement. Le Custom Airdrop est devenu une feature différenciante de VenaLabs. L'UX simplifiée a amélioré le taux de complétion des airdrops.",
        learning: "Tester l'UX avec de vrais utilisateurs avant de finaliser le code évite de refaire le travail deux fois. Et l'optimistic update, ça change tout pour la fluidité perçue."
      },
      {
        title: "2. Back-Office d'administration",
        context: "Donner plus d'autonomie aux équipes marketing et produit pour gérer les cours, les airdrops et les contenus sans intervention des développeurs.",
        steps: [
          "Analyse des besoins avec l'équipe marketing (CRUD cours, airdrops, utilisateurs)",
          "Développement des composants d'administration React avec formulaires dynamiques",
          "Implémentation des endpoints d'administration Spring Boot avec autorisation ADMIN",
          "Sécurisation des accès avec rôles et permissions JWT",
          "Formation de l'équipe marketing à l'utilisation du back-office"
        ],
        result: "L'équipe marketing gère les contenus en autonomie. On n'a plus de tickets pour publier un cours ou un airdrop. Les temps de publication sont passés de plusieurs jours à quelques minutes.",
        learning: "Former les utilisateurs du back-office est aussi important que le développer. Un outil mal compris sera sous-utilisé."
      },
      {
        title: "3. Analytics avec Amplitude (tracking serveur)",
        context: "Comprendre comment les utilisateurs interagissent avec la plateforme pour prendre des décisions produit basées sur des données concrètes plutôt que sur l'intuition.",
        steps: [
          "Définition d'un catalogue d'événements structuré avec propriétés standardisées",
          "Intégration du SDK Amplitude côté backend Spring Boot (tracking serveur)",
          "Envoi asynchrone des événements pour ne pas impacter les performances",
          "Création de dashboards Amplitude pour l'équipe produit et marketing",
          "Itération sur le catalogue d'événements après les premières analyses"
        ],
        result: "Décisions produit basées sur les données réelles d'utilisation. Identification de parcours utilisateurs à optimiser. L'équipe marketing peut suivre l'impact de ses campagnes directement.",
        learning: "Le tracking doit être formalisé dès le début (catalogue d'événements) pour éviter les incohérences. Le tracking serveur est plus fiable que le tracking client (pas bloqué par les adblockers)."
      },
      {
        title: "4. Leaderboard et gamification",
        context: "Stimuler l'engagement des utilisateurs grâce à un système de points, niveaux et classement. Le défi technique est de maintenir des performances acceptables avec un nombre croissant d'utilisateurs.",
        steps: [
          "Conception du système de scoring avec règles pondérées (type d'action, difficulté, régularité)",
          "Développement du service Spring Boot de calcul de scores et classement",
          "Optimisation des requêtes SQL avec pagination et cache pour le classement",
          "Mise en place d'un scheduled task de recalcul horaire",
          "Développement de l'interface React avec animations de progression"
        ],
        result: "Augmentation de l'engagement et de la rétention des utilisateurs. Le temps passé sur la plateforme et le taux de complétion des cours ont augmenté. Le classement reste performant avec la pagination et le cache.",
        learning: "La gamification doit rester motivante pour tous les niveaux : les nouveaux utilisateurs ne doivent pas être découragés par un écart trop grand avec les leaders."
      },
      {
        title: "5. Course Map interactive",
        context: "Visualiser le parcours d'apprentissage sous forme de carte interactive où chaque cours est un nœud avec des prérequis, un état de progression et des connexions visuelles.",
        steps: [
          "Conception de la structure de données des parcours (nœuds, arêtes, prérequis)",
          "Développement des composants React interconnectés avec gestion des dépendances",
          "Implémentation de la progression visuelle (cours débloqués, en cours, complétés)",
          "Édition via le back-office (ajout/modification de cours et prérequis)",
          "Animations de transition et feedback visuel sur la complétion"
        ],
        result: "Meilleur taux de complétion des parcours grâce à la visualisation claire de la progression. Les utilisateurs comprennent mieux l'ordre d'apprentissage et les prérequis.",
        learning: "Les dépendances entre contenus doivent être bien contrôlées : un prérequis mal configuré peut bloquer tout un parcours. La visualisation de la progression est un puissant motivateur."
      }
    ],

    // === RICH CONTENT (v2 layout). Alternance startup, thème violet, projet texte d'abord (pas de bandeau chiffres) ===
    rich: {
      theme: 'violet',
      tagline: "Un an d'alternance en startup Web3. J'y suis arrivé sans rien connaître à la crypto, j'en suis sorti à l'aise sur le sujet et sur le métier d'équipe.",
      presentation: [
        "J'ai effectué mon alternance d'un an chez VenaLabs en 2025, une startup Web3 qui aide les débutants à apprendre la crypto et à participer à des airdrops. J'y ai été développeur fullstack au sein d'une petite équipe de 3 développeurs, en lien direct avec le lead technique, le PM et l'équipe marketing produit.",
        "Côté technique, le backend tourne sous Spring Boot 3 avec une architecture hexagonale, le frontend sous React et Next.js, et la persistance sur PostgreSQL. J'ai pris en charge des fonctionnalités à fort impact métier : le système de Custom Airdrop (création et suivi d'airdrops personnalisés), le leaderboard avec gamification, la Course Map (visualisation interactive des parcours d'apprentissage), plusieurs écrans du back-office pour l'équipe marketing, et l'intégration de l'analytics serveur avec Amplitude.",
        "Avant d'arriver, je n'avais aucune notion concrète de Web3. Wallets, transactions on-chain, smart contracts, airdrops, tokenomics. J'ai tout appris en livrant. Le vrai défi des premières semaines n'était pas la technique mais ça : comprendre assez le contexte business pour livrer des features qui ont du sens, pas juste qui compilent. Ça m'a forcé à structurer mon apprentissage et à demander de l'aide intelligemment, parce qu'attendre de tout comprendre avant de coder n'était pas une option."
      ],
      objectives: [
        "Développer des fonctionnalités fullstack à fort impact métier (Custom Airdrop, leaderboard, Course Map)",
        "Contribuer à l'architecture hexagonale du backend Spring Boot et à sa robustesse",
        "Construire et faire évoluer le back-office pour donner de l'autonomie à l'équipe marketing",
        "Mettre en place le tracking serveur Amplitude pour piloter le produit par la donnée",
        "Monter en compétence sur l'écosystème Web3 (blockchain, wallets, airdrops) sans bloquer la livraison",
        "M'intégrer dans un fonctionnement Scrum réel (pas théorique) avec sprints, démos et rétrospectives"
      ],
      context: {
        period: "Janvier à Décembre 2025 (12 mois)",
        framework: "Alternance développeur fullstack",
        mode: "Hybride (présentiel / remote selon les sprints)",
        team: [
          { role: "Moi", description: "Développeur fullstack alternant. Java / Spring Boot, React / Next.js, intégration Web3, analytics, écrans back-office." },
          { role: "Lead développeur", description: "Référent technique sur l'architecture, code reviews critiques et pair programming sur les sujets nouveaux. C'est de lui que j'ai le plus appris au quotidien." },
          { role: "Développeur fullstack collègue", description: "Collaboration au quotidien sur les sprints, revues de code croisées, répartition front / back sur les features partagées." },
          { role: "Product Manager", description: "Priorisation du backlog, animation des sprints (planning, review, rétro), arbitrage des demandes marketing." },
          { role: "Équipe marketing produit (2-3 personnes)", description: "Validation des écrans back-office, demandes d'évolution sur les dashboards Amplitude, démos hebdo." },
          { role: "Designer (freelance ponctuel)", description: "Maquettes Figma sur les features critiques. Sa présence a fait la différence. Quand il n'était pas là, on a payé en refactor (V1 du Custom Airdrop)." }
        ],
        organization: [
          "Sprints Scrum de 2 semaines",
          "Daily standups quotidiens de 15 minutes",
          "Sprint planning, sprint review et rétrospective à chaque cycle",
          "Code reviews systématiques avant tout merge",
          "Pair programming sur les sujets nouveaux (blockchain, scoring, intégrations critiques)",
          "Démos hebdo à l'équipe marketing pour valider les fonctionnalités en cours",
          "Jira pour le suivi des tickets et l'estimation en story points"
        ],
        stack: [
          { label: "Backend", value: "Java 21, Spring Boot 3, Spring Data JPA, Spring Security, architecture hexagonale" },
          { label: "Frontend", value: "React 18, Next.js, TypeScript, React Query, hooks personnalisés" },
          { label: "Base de données", value: "PostgreSQL avec migrations versionnées" },
          { label: "Auth", value: "JWT signé (rôles USER / ADMIN / MODERATOR)" },
          { label: "Analytics", value: "Amplitude en tracking serveur (non bloqué par les adblockers)" },
          { label: "DevOps", value: "Docker, CI/CD" },
          { label: "Gestion projet", value: "Jira" }
        ],
        stakes: [
          "Plateforme à mission éducative. Chaque friction freine l'apprentissage des utilisateurs débutants en crypto",
          "Différenciation produit dans un marché concurrentiel par des features uniques (Custom Airdrop) et un produit fluide",
          "Première vraie expérience fullstack pour moi avec responsabilité sur des features livrées en production",
          "Crédibilité technique de la startup auprès de partenaires Web3 pour des intégrations futures"
        ],
        risks: [
          "Courbe d'apprentissage Web3 raide impactant la productivité initiale",
          "Sécurité des données utilisateurs (wallets crypto = sujet sensible, même sans gestion de fonds directe)",
          "Performance du leaderboard avec un nombre croissant d'utilisateurs (calculs fréquents)",
          "Adoption par des utilisateurs débutants. UX critique sur les flows complexes (airdrops, parcours)",
          "Pivots fréquents en startup, scope qui change parfois en cours de sprint",
          "Manque initial de tests automatisés sur les services backend critiques (scoring, calculs financiers)"
        ]
      },
      steps: [
        {
          title: "Onboarding et apprentissage Web3",
          description: "Premières semaines : prise en main du code et apprentissage du domaine en parallèle, sans bloquer la livraison",
          bullets: [
            "Découverte de la stack et de la base de code existante (architecture hexagonale, conventions internes)",
            "Apprentissage des fondamentaux crypto via la documentation Ethereum et les ressources internes",
            "Création d'un wallet personnel et tests de transactions sur testnets pour comprendre l'expérience utilisateur de l'intérieur",
            "Premières contributions sur des sujets non-Web3 (composants UI, écrans back-office) pour être productif rapidement",
            "Pair programming avec le lead développeur sur les sujets blockchain pour combler les zones d'ombre"
          ]
        },
        {
          title: "Custom Airdrop. Feature différenciante",
          description: "Conception et livraison du système qui permet à un utilisateur de créer et de suivre ses propres airdrops personnalisés",
          bullets: [
            "Modélisation des entités JPA (Airdrop, Step, Reward, Progress) avec relations Doctrine claires",
            "Endpoints REST sécurisés JWT côté Spring Boot, avec validation et gestion d'erreurs structurée",
            "Wizard multi-étapes côté React avec hooks personnalisés et React Query pour la synchro",
            "Implémentation de l'optimistic update pour une UX fluide malgré la latence backend",
            "Tests utilisateurs internes : la V1 du wizard avait 6 étapes, on est descendu à 3 après retours"
          ]
        },
        {
          title: "Back-office d'administration",
          description: "Donner de l'autonomie à l'équipe marketing pour gérer le contenu sans solliciter les développeurs",
          bullets: [
            "Analyse des besoins en réunion avec le marketing (qui faisait quoi, quels frictions actuelles)",
            "Développement des écrans CRUD (cours, airdrops, utilisateurs) avec formulaires React dynamiques",
            "Sécurisation des endpoints d'administration avec rôles ADMIN et MODERATOR via Spring Security",
            "Formation de l'équipe marketing à l'outil. Sinon il aurait été sous-utilisé, peu importe sa qualité"
          ]
        },
        {
          title: "Analytics serveur avec Amplitude",
          description: "Mettre en place un tracking fiable pour piloter le produit par la donnée plutôt que par l'intuition",
          bullets: [
            "Définition d'un catalogue d'événements structuré dans un Google Doc partagé (avant le code). Démarche acquise après une première reprise",
            "Intégration du SDK Amplitude côté backend Spring Boot. Tracking serveur, non bloqué par les adblockers",
            "Envoi asynchrone des événements pour ne pas impacter les latences API",
            "Dashboards Amplitude créés avec l'équipe produit et marketing pour des KPIs lisibles",
            "Reprise complète du catalogue après 3 mois suite à des incohérences détectées dans les analyses"
          ]
        },
        {
          title: "Leaderboard et gamification",
          description: "Stimuler la rétention par un système de points, niveaux et classement, sans dégrader les performances",
          bullets: [
            "Conception du système de scoring avec règles pondérées (type d'action, difficulté, régularité)",
            "Service Spring Boot de calcul de scores et de classement avec requêtes SQL optimisées",
            "Pagination et cache pour que le leaderboard tienne la charge avec un nombre croissant d'utilisateurs",
            "Scheduled task de recalcul horaire pour intégrer les nouvelles actions sans recalcul à chaque appel",
            "Frontend React avec animations de progression pour rendre la gamification motivante visuellement"
          ]
        },
        {
          title: "Course Map interactive",
          description: "Visualiser le parcours d'apprentissage pour augmenter le taux de complétion des cours",
          bullets: [
            "Modélisation des parcours en graphe (nœuds = cours, arêtes = prérequis)",
            "Composants React interconnectés gérant les dépendances entre cours côté client",
            "Édition via le back-office (ajout / modification de cours et de prérequis)",
            "Animations de transition pour rendre la progression visible et motivante",
            "Tests d'usage avec de vrais utilisateurs internes. Ajustements après observation directe"
          ]
        }
      ],
      actors: [
        {
          role: "Lead développeur",
          description: "Référent technique sur l'architecture hexagonale et les choix de stack. Validait mes décisions importantes en code review et m'accompagnait en pair programming sur les sujets nouveaux (blockchain, scoring). C'est de lui que j'ai le plus appris sur le quotidien d'un dev senior. Comment il découpe un problème, comment il argue ses choix."
        },
        {
          role: "Développeur fullstack collègue",
          description: "Collaboration au quotidien sur les sprints, revues de code croisées, échanges de bonnes pratiques. Sur les features partagées comme le back-office, on s'est réparti le travail front / back avec une coordination étroite et beaucoup de déblocages mutuels."
        },
        {
          role: "Product Manager",
          description: "Pilote la priorisation du backlog et l'animation des sprints. C'est avec lui que j'ai appris à estimer en story points, à découper une feature en tickets actionnables et à challenger les besoins quand ils étaient flous, plutôt que de coder une spec ambiguë."
        },
        {
          role: "Équipe marketing produit",
          description: "Validait les écrans back-office et formulait les besoins d'analytics. C'est avec eux que j'ai appris à vulgariser le technique : passer de « POST /api/airdrops » à « le bouton créer un airdrop » a été un vrai changement de posture, et c'est devenu un réflexe."
        },
        {
          role: "Designer (freelance ponctuel)",
          description: "Intervenait sur les features critiques avec des maquettes Figma. Quand il était présent, l'UX était validée avant le code et tout allait plus vite. Quand il n'était pas là, on improvisait. Et on l'a payé en refactor de la V1 du Custom Airdrop. Une vraie leçon sur la valeur du design en amont."
        },
        {
          role: "Utilisateurs internes (testeurs)",
          description: "Quelques membres de l'équipe non-tech testaient les features avant le push en prod. Leurs retours, surtout celui sur le wizard du Custom Airdrop trop complexe, ont été parmi les plus précieux du projet."
        }
      ],
      results: {
        personal: {
          technical: [
            "Spring Boot en production : architecture hexagonale, JPA, Security, traitements asynchrones, scheduled tasks",
            "React et Next.js avec gestion d'état avancée (React Query, hooks personnalisés, optimistic update)",
            "Tracking serveur avec Amplitude et catalogue d'événements structuré",
            "Web3 fondamentaux (wallets, transactions, airdrops, smart contracts) appris from scratch",
            "Performance backend : optimisation SQL, pagination, cache, recalcul asynchrone"
          ],
          organizational: [
            "Scrum réel pratiqué au quotidien (sprints, dailies, planning, review, rétro)",
            "Communication avec équipes non-techniques. Vulgarisation du discours technique",
            "Pair programming et demande d'aide structurée (savoir poser le bon contexte avant de demander)",
            "Estimation en story points et découpage de features en tickets actionnables",
            "Présentation de features en sprint review et démos hebdo, en adaptant le discours à l'audience"
          ],
          conclusion: "Ce qui m'a le plus appris, c'est l'écart entre la théorie (architecture hexagonale propre, 100 % de tests, séparation parfaite des couches) et la réalité d'une startup qui doit livrer. J'ai compris que les compromis sont la norme, pas l'exception, et que l'art consiste à savoir lesquels accepter consciemment et lesquels refuser. Cette alternance m'a fait passer du dev qui livre des specs au dev qui comprend le contexte business et qui ose proposer des changements."
        },
        business: {
          achievements: [
            "Custom Airdrop en production, devenu une feature différenciante de VenaLabs",
            "Back-office utilisé au quotidien par l'équipe marketing. Autonomie sur la création de contenu",
            "Leaderboard contribuant à la rétention et au temps passé sur la plateforme",
            "Course Map améliorant le taux de complétion des parcours d'apprentissage",
            "Tracking Amplitude pilotant les décisions produit sur des données réelles plutôt que sur l'intuition"
          ],
          satisfaction: [
            "Confiance progressive de l'équipe marketing : passage de « demandez aux devs » à « je gère »",
            "Reviews positives en sprint review sur la qualité des livrables",
            "Continuité du projet : ce que j'ai construit tourne toujours en production aujourd'hui",
            "Réduction du temps de publication de contenu de plusieurs jours à quelques minutes"
          ],
          conclusion: "Mes contributions ont rendu la plateforme à la fois plus différenciante (Custom Airdrop, Course Map) et plus pilotable (back-office, Amplitude). Surtout, l'équipe marketing peut désormais avancer sans goulot technique, ce qui était un vrai blocage à mon arrivée."
        }
      },
      aftermath: {
        immediate: [
          "Passation des features en cours à un collègue dev (3-4h dédiées)",
          "Documentation technique des modules Custom Airdrop et leaderboard",
          "Brief sur l'organisation Amplitude (catalogue d'événements, dashboards créés)",
          "Transmission des points en suspens et des choix d'architecture à conserver"
        ],
        distant: [
          "L'équipe a continué à itérer sur le Custom Airdrop suite à mes recommandations de simplification",
          "Le tracking Amplitude a été enrichi avec des événements supplémentaires sur les nouvelles features",
          "Pas de retour de bugs majeurs sur ce que j'ai livré. Plutôt bon signe sur la robustesse",
          "Quelques messages ponctuels sur des questions d'organisation du code que j'ai introduit"
        ],
        today: [
          "Toujours en lien occasionnel avec l'équipe (questions ponctuelles, retours de news)",
          "Les features développées sont en production et continuent d'être utilisées au quotidien",
          "Ce que j'ai construit est devenu la base de fonctionnalités plus avancées (extensions du leaderboard, nouveaux types d'airdrops)"
        ]
      },
      critique: [
        {
          type: 'lesson',
          title: "Apprendre un domaine en livrant du code",
          body: "Pendant les premières semaines, j'avais l'impression de faire semblant : je codais des features qui marchaient, mais je ne comprenais pas vraiment leur sens métier. Coder « j'implémente un airdrop » sans comprendre ce qu'est un airdrop côté utilisateur, c'est livrer du code sans valeur. Il a fallu structurer mon apprentissage en parallèle des sprints, ce qui a été épuisant les premiers mois."
        },
        {
          type: 'lesson',
          title: "La pureté technique n'est pas l'objectif",
          body: "L'architecture hexagonale du backend était propre sur le papier, mais on a accepté plusieurs raccourcis quand les sprints serraient le calendrier. J'ai parfois passé du temps à respecter des principes alors qu'un raccourci pragmatique aurait été plus utile. La pureté est un moyen, pas un objectif. Il faut savoir la trahir consciemment."
        },
        {
          type: 'lesson',
          title: "On mesure la valeur du designer quand il n'est plus là",
          body: "La V1 du wizard du Custom Airdrop avait six étapes. Il en fallait trois. Ce n'est pas un hasard si cette V1 est sortie pendant une période où le designer freelance n'intervenait pas : sans son regard en amont, on a improvisé, et on a payé la facture en refonte. Le designer n'était pas un confort, c'était ce qui nous évitait de coder deux fois la même feature."
        },
        {
          type: 'lesson',
          title: "Convaincre en parlant business, pas en parlant technique",
          body: "J'ai défendu plusieurs fois l'ajout de tests sur les services critiques, et plusieurs fois la décision a été de prioriser les nouvelles features. Ce qui a fini par marcher, c'est de reformuler le risque en langage métier : « si on touche au scoring sans filet, voilà ce qu'on risque sur la rétention ». Le même argument, présenté côté business plutôt que côté bonne pratique, ne reçoit pas la même réponse."
        },
        {
          type: 'takeaway',
          title: "Toucher à tout, c'est ne rien approfondir",
          body: "VenaLabs a confirmé mon goût pour les contextes startup où on touche à tout, mais m'en a aussi montré la limite. Pour la suite, je veux pouvoir choisir un terrain (backend distribué, performance, architecture orientée événements) et y aller en profondeur, au lieu d'un fullstack dilué où on effleure tout. C'est la direction que je donne à mes prochaines expériences."
        }
      ]
    }
  },

  'macway': {
    title: 'MacWay - Site E-commerce',
    description: "Site e-commerce Apple et high-tech avec comparateur produits, promotions automatiques, anti-fraude et marketplaces.",
    tags: ['Symfony', 'PHP', 'Twig', 'MySQL', 'SCSS', 'jQuery', 'API REST', 'Cron Jobs'],
    year: '2022-2025',
    logo: 'assets/logos/macway.png',
    url: 'https://www.macway.com/',
    presentation: "MacWay était un site e-commerce spécialisé dans les produits Apple et high-tech, avec un catalogue de plusieurs milliers de références et un trafic significatif. Pendant mon alternance de près de 3 ans (2022-2025), j'ai travaillé comme développeur web au sein d'une équipe de 2-3 développeurs, en lien direct avec le chef de projet et les équipes commerciales et marketing.\n\nLe site fonctionnait sous Symfony avec Twig pour le templating, jQuery pour les interactions frontend, MySQL pour la base de données et une architecture de cron jobs pour les tâches automatisées. J'ai développé de nombreuses fonctionnalités à fort impact business : un comparateur de produits cross-catégories, un système de promotions automatiques (UpdateDestockPromoTask) avec paliers graduels et protection des marges, des flux produits automatisés vers 4 marketplaces (Pinterest, Meta, Awin, Google Shopping), un système anti-fraude par fingerprinting navigateur (getBrowserFingerprint()), et la gestion des promotions vendeurs Mirakl.\n\nCette expérience m'a donné une compréhension profonde du e-commerce en production : logique métier complexe (marges, promotions, stock), contraintes de performance (trafic, temps de chargement), sécurité (fraude, paiements), et collaboration avec des équipes non-techniques.",
    objectives: {
      context: "Alternance de près de 3 ans dans une équipe de 2-3 développeurs sur un site e-commerce en production avec un trafic significatif. Le site vendait des produits Apple et high-tech avec des enjeux de conversion, de gestion de stock et de visibilité marketplace. L'entreprise a fermé ses portes en 2025.",
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
      business: "Le comparateur de produits a généré 638 résultats de comparaison par mois. Le système de promos automatiques (UpdateDestockPromoTask) a réduit le stock dormant sans que l'équipe commerciale n'ait à intervenir. Les produits MacWay étaient visibles sur 4 marketplaces avec des flux mis à jour chaque nuit. La fraude a chuté grâce au fingerprinting navigateur. L'équipe commerciale a gagné plusieurs heures par semaine en tâches manuelles."
    },
    future: "MacWay a fermé en 2025, mais ce que j'ai appris là-bas me sert tous les jours. Le e-commerce en production. Symfony, MySQL, marketplaces, anti-fraude. C'est un bagage que je réutilise sur chaque projet. Et avoir compris les enjeux business (marges, conversions, stock) me donne une vision produit que beaucoup de développeurs n'ont pas.",
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
        result: "Comparateur en production avec une moyenne de 638 résultats de comparaison par mois. L'expérience mobile est fluide. La fonctionnalité est mise en avant sur les pages catégories et contribue à la conversion.",
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
      tagline: "Près de 3 ans d'alternance sur un vrai site e-commerce en production. La première fois que j'ai vu le code que j'écris faire bouger des chiffres business.",
      keyMetrics: [
        { value: '~3 ans', label: 'd\'alternance' },
        { value: '2-3', label: 'développeurs' },
        { value: '4', label: 'marketplaces alimentées' },
        { value: '638', label: 'comparaisons / mois' },
        { value: '1', label: 'site, plusieurs milliers de produits' }
      ],
      presentation: [
        "MacWay était un site e-commerce spécialisé dans les produits Apple et la high-tech, avec un catalogue de plusieurs milliers de références et un trafic significatif. C'est là que j'ai fait mon alternance pendant près de 3 ans (2022-2025), comme développeur web dans une équipe de deux à trois développeurs, en lien direct avec le chef de projet et les équipes commerciales et marketing.",
        "C'était mon premier vrai site en production. Avant MacWay, j'avais surtout codé pour l'école. Des projets propres mais sans véritable enjeu : pas de vrais clients, pas de stock, pas de paiements. Là, c'était l'inverse. Un bug pouvait faire afficher un mauvais prix, un script qui plante pouvait couper les ventes, une promotion mal configurée pouvait grignoter les marges. Ça m'a forcé à coder différemment : tester davantage, valider les règles métier avec les équipes commerciales avant d'écrire la moindre ligne, et réfléchir à ce qui se passe quand quelque chose casse.",
        "J'ai contribué à plusieurs fonctionnalités à fort impact business : un comparateur de produits cross-catégories, un système de promotions automatiques avec paliers et protection des marges, des flux produits automatisés vers quatre marketplaces (Pinterest, Meta, Awin, Google Shopping), un système anti-fraude par empreinte de navigateur, et la synchronisation des promotions vendeurs sur la marketplace Mirakl. MacWay a fermé ses portes en 2025, mais ces 3 années m'ont donné un bagage e-commerce que je réutilise sur tous mes projets depuis."
      ],
      objectives: [
        "Monter en compétence sur Symfony et MySQL en production, sur un projet legacy et avec du vrai trafic",
        "Livrer des fonctionnalités à fort impact business (comparateur, promos automatiques, flux marketplaces)",
        "Sécuriser le site contre la fraude et protéger les transactions financières",
        "Automatiser des tâches répétitives pour libérer du temps aux équipes commerciales et marketing",
        "Apprendre à travailler en équipe : revues de code, branches Git, communication avec les non-tech",
        "Comprendre comment fonctionne un business en ligne de l'intérieur. Marges, conversions, stock, marketplaces"
      ],
      context: {
        period: "Septembre 2022 à Juin 2025 (près de 3 ans, en alternance)",
        framework: "Alternance développeur web, dans le cadre de mon cursus en informatique",
        mode: "Présentiel principalement, avec quelques jours en remote selon les périodes",
        team: [
          { role: "Moi", description: "Alternant développeur web. Features fullstack côté Symfony / Twig / SCSS / jQuery, scripts automatisés (cron jobs), intégrations marketplaces et anti-fraude. Ma première expérience longue en équipe sur un site en production." },
          { role: "Chef de projet technique", description: "Référent technique sur l'architecture Symfony et la base de données, validateur des choix structurants. C'est lui qui m'a appris à travailler proprement avec Git (branches, pull requests, revues de code) après mes premiers mois où j'utilisais une seule branche pour tout." },
          { role: "Développeurs collègues (1 à 2)", description: "Collaboration au quotidien sur le backlog, revues de code croisées, partage des incidents en production. C'est avec eux que j'ai appris à débugger sereinement quand un bug tombe en prod, plutôt que de paniquer." },
          { role: "Équipe commerciale", description: "Validait les règles métier des promotions (paliers, marges, éligibilité), signalait les bugs vus côté terrain et formulait les besoins de fonctionnalités. C'est avec eux que j'ai appris à traduire un besoin business en spec technique exécutable." },
          { role: "Équipe marketing", description: "Pilotait la diffusion des produits sur les marketplaces (Pinterest, Meta, Awin, Google Shopping) et validait les flux générés. M'ont fait comprendre que la qualité d'un flux se juge sur la visibilité des produits, pas sur la propreté du XML." }
        ],
        organization: [
          "Sprints courts avec priorisation hebdomadaire selon les urgences business",
          "Tickets gérés sur outil interne, avec validation métier avant développement sur les sujets sensibles (promos, prix)",
          "Branches Git par fonctionnalité et pull requests obligatoires. Au début je travaillais directement sur la branche principale, j'ai vite appris pourquoi c'était une mauvaise idée",
          "Revues de code systématiques entre développeurs avant tout merge",
          "Déploiements progressifs avec recette manuelle, surtout sur les modules sensibles (paiements, promos)",
          "Communication régulière avec les équipes commerciales et marketing pour cadrer les besoins"
        ],
        stack: [
          { label: "Backend", value: "Symfony en PHP, base de données MySQL, scripts automatisés (cron jobs)" },
          { label: "Frontend", value: "Twig pour les templates, SCSS pour le style, jQuery pour les interactions" },
          { label: "Intégrations externes", value: "APIs Pinterest, Meta, Awin, Google Shopping (flux produits) et Mirakl (marketplace vendeurs)" },
          { label: "Paiements", value: "Intégration prestataire de paiement, contrôle de fraude avec empreinte de navigateur" },
          { label: "Outils internes", value: "Outil interne de gestion du catalogue et des promotions, tableaux de bord pour les équipes commerciales" },
          { label: "Versionnage", value: "Git. Branches par fonctionnalité après mes premiers mois, revues de code obligatoires" }
        ],
        stakes: [
          "Un site en production réel, avec du vrai trafic et de vrais paiements. Chaque bug a un impact direct sur le chiffre",
          "Des règles métier complexes (paliers de promotion, marges, éligibilité) qui doivent être implémentées avec exactitude",
          "Une visibilité indispensable sur les marketplaces : un flux rejeté, et c'est tout un canal de ventes qui s'éteint",
          "Une protection contre la fraude au paiement, avec des conséquences financières directes en cas de défaillance",
          "Mon premier vrai contexte professionnel. Passage du code « école » au code « production »"
        ],
        risks: [
          "Bugs en production impactant les ventes ou les prix affichés, déjà arrivé sur les premiers mois et c'est une bonne école",
          "Erreurs de calcul de marge sur les promotions automatiques pouvant entraîner des ventes à perte",
          "Flux marketplaces rejetés par les plateformes pour cause de format invalide ou de champs manquants",
          "Fraudes au paiement non détectées entraînant des pertes financières directes (chargebacks)",
          "Régressions sur du code legacy peu testé : modifier un module existant pouvait casser une fonctionnalité voisine sans qu'on s'en rende compte tout de suite",
          "Travailler sur un projet long (3 ans) tout en tenant le rythme de l'école. La fatigue arrive vite si on ne s'organise pas"
        ]
      },
      steps: [
        {
          title: "Premiers mois : prise en main et passage du « code école » au « code prod »",
          description: "Découverte de la stack, du code existant et du quotidien d'une équipe en production",
          bullets: [
            "Découverte du code Symfony existant et de la structure de la base de données. Beaucoup à lire avant d'écrire",
            "Premières contributions sur des sujets simples (corrections de bugs, petits écrans) pour comprendre le code et le quotidien de l'équipe",
            "Travail initialement sur une seule branche Git, jusqu'à ce qu'un conflit me coûte une demi-journée. Leçon retenue, passage aux branches par fonctionnalité",
            "Pair programming avec le chef de projet sur les sujets nouveaux pour combler les zones d'ombre",
            "Découverte des règles métier (marges, paliers de promotion, gestion du stock) à travers les discussions avec l'équipe commerciale"
          ]
        },
        {
          title: "Comparateur de produits cross-catégories",
          description: "Permettre aux clients de comparer jusqu'à 4 produits. Y compris entre catégories différentes. Sur mobile comme sur desktop",
          bullets: [
            "Conception de la fonctionnalité avec le chef de projet, en partant des besoins exprimés par l'équipe commerciale",
            "Développement de la logique côté Symfony pour croiser les caractéristiques communes et spécifiques entre catégories",
            "Persistance de la sélection en session, pour que l'utilisateur ne perde pas ses choix en naviguant",
            "Mise en avant automatique des différences entre produits, sans surcharger l'interface",
            "Optimisation mobile (la majorité du trafic) avec scroll horizontal et accordéons pour les caractéristiques",
            "Mise en production progressive et suivi des métriques d'utilisation"
          ]
        },
        {
          title: "Promotions automatiques avec paliers et protection des marges",
          description: "Automatiser le déstockage des produits dormants, avec des réductions graduelles tout en garantissant une marge minimum",
          bullets: [
            "Définition des règles métier avec l'équipe commerciale (ancienneté du produit, ventes, catégorie, marge minimum)",
            "Développement d'un script automatisé qui tourne chaque nuit pour appliquer les paliers (20 %, 40 %, 60 %)",
            "Vérification systématique de la marge minimum (5 %) avant toute baisse de prix. Un garde-fou essentiel",
            "Notifications automatiques à l'équipe commerciale à chaque changement de palier, pour qu'elle reste dans la boucle",
            "Reporting hebdomadaire (produits en promotion, marges, évolution du stock dormant)",
            "Tests unitaires sur les calculs de prix et de marge, pour éviter une erreur qui se solderait par des ventes à perte"
          ]
        },
        {
          title: "Flux produits vers 4 marketplaces",
          description: "Diffuser automatiquement le catalogue vers Pinterest, Meta, Awin et Google Shopping, chacun avec ses propres exigences",
          bullets: [
            "Étude des spécifications de chaque plateforme. Souvent mal documentées, qui changent sans prévenir",
            "Développement d'un script automatisé qui génère un flux conforme pour chaque plateforme, chaque nuit",
            "Filtrage des produits éligibles (stock disponible, prix renseigné, images valides, catégorie autorisée)",
            "Mise en place d'alertes automatiques en cas d'anomalie (chute du nombre de produits, champs manquants)",
            "Hébergement des flux sur des points d'accès dédiés, consultés par les plateformes",
            "Suivi régulier avec l'équipe marketing pour réagir vite aux retours des plateformes"
          ]
        },
        {
          title: "Anti-fraude par empreinte de navigateur",
          description: "Détecter automatiquement les commandes suspectes pour soulager la vérification manuelle et limiter les pertes",
          bullets: [
            "Collecte d'une empreinte unique du navigateur (résolution, fuseau horaire, plugins, rendu graphique) pour identifier des comportements suspects",
            "Croisement de l'empreinte avec l'historique des commandes (même empreinte avec plusieurs cartes, empreintes liées à des litiges passés, incohérence fuseau horaire / adresse de livraison)",
            "Calcul d'un score de risque sur chaque commande, avec des seuils ajustables",
            "Alertes automatiques pour les commandes suspectes, avec le détail du score pour aider à la décision",
            "Blocage automatique pour les cas les plus flagrants",
            "Validation continue avec l'équipe commerciale pour ajuster les seuils sans bloquer des commandes légitimes"
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
            "Validation finale avec l'équipe commerciale des règles de priorité et de cumul des promotions"
          ]
        }
      ],
      actors: [
        {
          role: "Chef de projet technique",
          description: "Mon référent direct sur les choix d'architecture et le code. C'est lui qui m'a fait passer du « code école » au « code prod » : revues de code détaillées, exigence sur les conventions, et surtout cette phrase qu'il m'a dite tôt et qui m'a marqué. « écris ton code comme si quelqu'un d'autre allait le maintenir dans deux ans, parce que ce sera probablement le cas ». Je l'ai prise au sérieux."
        },
        {
          role: "Développeurs collègues",
          description: "Des camarades de tranchée plus que des supérieurs. Revues de code croisées, débuggage à plusieurs quand un bug tombait en prod, échanges de bonnes pratiques. C'est avec eux que j'ai appris à demander de l'aide intelligemment (poser le contexte, montrer ce qu'on a déjà essayé) et à offrir de l'aide en retour sans condescendance."
        },
        {
          role: "Équipe commerciale",
          description: "Les vraies clientes de mes développements. Leurs retours étaient la vérité du terrain : ce qui marchait, ce qui agaçait, ce qui leur faisait perdre du temps. C'est avec eux que j'ai appris à traduire un besoin flou (« il faudrait pouvoir.. ») en spec technique exécutable, et à valider les règles métier avant de coder, pas après."
        },
        {
          role: "Équipe marketing",
          description: "Pilotait la diffusion des produits sur les marketplaces. M'ont appris que la qualité d'un flux ne se juge pas à la propreté du XML, mais à la visibilité réelle des produits sur la plateforme. Une vraie leçon de pragmatisme : j'ai appris à mesurer mon travail par son impact, pas par son élégance."
        },
        {
          role: "Service client (interactions ponctuelles)",
          description: "Première ligne sur les bugs vus par les vrais clients. Quand ils nous signalaient un problème de panier ou un prix incorrect, c'était souvent plus précis qu'un ticket interne. Leurs remontées m'ont appris à prendre les retours utilisateurs très au sérieux, même quand ils sont mal formulés."
        }
      ],
      results: {
        personal: {
          technical: [
            "Symfony et MySQL en production : du backend solide sur du vrai trafic, pas du code de TP",
            "Scripts automatisés robustes (promotions, flux marketplaces) avec gestion d'erreurs et notifications",
            "Intégrations d'APIs externes variées (4 marketplaces + Mirakl + prestataire de paiement) avec leurs spécificités",
            "Compréhension des enjeux de sécurité côté paiement et anti-fraude, pas en théorie mais en pratique",
            "Capacité à intervenir sur du code legacy peu testé sans casser ce qui marche"
          ],
          organizational: [
            "Travail en équipe sur du long terme : revues de code, branches Git, communication continue avec les non-tech",
            "Capacité à débugger sereinement en production, sans paniquer quand un truc casse",
            "Communication avec les équipes commerciales et marketing. Vulgariser le technique, traduire un besoin business en spec",
            "Tenue d'un projet sur la durée (3 ans) en parallèle de l'école, avec la discipline que ça demande",
            "Habitude de valider les règles métier en amont avec les équipes concernées, plutôt que de coder une spec ambiguë"
          ],
          conclusion: "Ce que MacWay m'a appris de plus précieux, c'est que coder pour la production, ce n'est pas la même chose que coder à l'école. Il y a une exigence de fiabilité qu'on ne mesure pas tant qu'on n'a pas vu une de ses propres erreurs partir en prod. J'ai aussi appris que le code n'est qu'une partie du métier. La moitié du temps, c'était comprendre des règles métier, valider avec les équipes commerciales, traduire un besoin flou. Et surtout, MacWay m'a donné cette base de confiance : je sais que je peux livrer du code qui tient en production, parce que je l'ai déjà fait pendant 3 ans."
        },
        business: {
          achievements: [
            "Comparateur de produits en production avec environ 638 utilisations par mois",
            "Système de promotions automatiques actif en continu, sans intervention manuelle de l'équipe commerciale",
            "Catalogue MacWay diffusé sur 4 marketplaces majeures avec des flux mis à jour chaque nuit",
            "Réduction significative des commandes frauduleuses validées grâce au scoring automatique",
            "Promotions cohérentes entre le catalogue MacWay et les offres Mirakl"
          ],
          satisfaction: [
            "L'équipe commerciale a gagné plusieurs heures par semaine sur les tâches manuelles de promotion",
            "L'équipe marketing voyait ses produits remonter dans les marketplaces sans avoir à intervenir",
            "Confiance progressive du chef de projet sur des sujets de plus en plus structurants au fil des mois",
            "Pas de bug majeur sur les modules sensibles (promotions, anti-fraude, flux marketplaces) après la mise en production",
            "Continuité de mes contributions : ce que j'ai livré a tourné jusqu'à la fermeture du site en 2025"
          ],
          conclusion: "Mes contributions ont rendu plusieurs aspects du site plus automatisés (promotions, flux marketplaces, anti-fraude) et plus utiles aux clients (comparateur). L'équipe commerciale et l'équipe marketing ont gagné en autonomie sur leurs tâches du quotidien. Pour une entreprise qui a fini par fermer en 2025, ce n'était pas suffisant pour la sauver. Mais c'est un constat qui dépasse largement le périmètre de la technique."
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
          "Le site a continué à tourner avec mes contributions jusqu'à la fermeture de l'entreprise en 2025",
          "Pas de retour de bugs majeurs sur les modules que j'avais livrés. Un bon signe sur la robustesse",
          "Validation métier en amont, scripts automatisés notifiés, garde-fous sur les calculs sensibles : ces façons de faire sont restées des automatismes pour moi",
          "Quelques échanges ponctuels avec d'anciens collègues, qui me servent de réseau aujourd'hui"
        ],
        today: [
          "MacWay a fermé en 2025, mais le bagage e-commerce que j'en ai retiré me sert encore",
          "Ma compréhension des enjeux business (marges, conversions, stock, marketplaces) influence toujours la manière dont je conçois une feature",
          "Je garde de cette alternance une conviction forte : tant qu'on n'a pas vu son propre code partir en prod sur du vrai trafic, certaines exigences de fiabilité restent abstraites"
        ]
      },
      critique: [
        {
          type: 'lesson',
          title: "Une seule branche Git, c'était une mauvaise idée",
          body: "Pendant mes premiers mois, je travaillais sur une seule branche pour tout. Fonctionnalités, corrections, expérimentations. Le jour où j'ai dû revenir en arrière sur un changement, j'ai compris à quel point c'était fragile. Le passage aux branches par fonctionnalité et aux pull requests m'a coûté quelques heures de friction au début, mais m'a fait gagner un confort de travail que je ne pourrais plus quitter."
        },
        {
          type: 'lesson',
          title: "Intervenir sur du legacy non testé, ça s'apprend",
          body: "Beaucoup de modules existants n'avaient aucun test. Modifier un calcul de promotion ou le panier, c'était marcher sur des œufs : un changement anodin pouvait casser une fonctionnalité voisine sans bruit. J'ai appris une discipline particulière pour ça. Lire le code et ses usages avant d'y toucher, faire des changements petits et réversibles, et rejouer à la main les parcours adjacents. Ce n'est pas glorieux, mais c'est ce qui permet de livrer sur du legacy sans tout faire sauter."
        },
        {
          type: 'lesson',
          title: "Valider les règles métier avant de coder, pas après",
          body: "Les premières versions du système de promotions automatiques ont nécessité plusieurs allers-retours avec l'équipe commerciale parce que les règles métier n'étaient pas assez précises au démarrage. Aujourd'hui, je commence systématiquement par formaliser les règles avec les équipes concernées avant d'écrire du code. Ça évite de jeter du travail."
        },
        {
          type: 'lesson',
          title: "Débugger en prod sans paniquer",
          body: "Les premières fois où un bug est tombé en production, j'étais tétanisé. Avec le temps, j'ai appris à respirer, à lire les logs avec méthode, à isoler le problème avant de toucher au code. C'est moins une compétence technique qu'une discipline mentale, et c'est sans doute le réflexe le plus utile que MacWay m'a laissé au quotidien."
        },
        {
          type: 'takeaway',
          title: "Coder pour la prod, c'est une autre exigence",
          body: "Avant MacWay, je codais pour rendre des projets d'école. Après, je code en pensant à ce qui se passe quand ça casse : anticiper les cas tordus, poser des garde-fous, prévoir les alertes. Voir une de mes propres erreurs partir en prod m'a appris cette exigence de fiabilité bien mieux qu'un cours ne l'aurait fait."
        },
        {
          type: 'takeaway',
          title: "Comprendre le business change la manière de coder",
          body: "Trois ans aux côtés d'une équipe commerciale et d'une équipe marketing m'ont fait voir le code autrement. Une feature qui fait gagner du temps aux équipes vaut souvent plus qu'une feature techniquement brillante mais peu utilisée. Je me suis mis à chercher le pourquoi avant le comment, et c'est cette habitude que je garde le plus nettement de cette alternance."
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
      context: "Projet personnel réalisé intégralement seul pour créer une solution de réservation VTC moderne et fonctionnelle. Le site est en ligne et opérationnel avec de vraies réservations et de vrais paiements.",
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
    actors: "Projet réalisé intégralement seul : conception, développement frontend et backend, intégration des APIs tierces, tests et déploiement. Validation des fonctionnalités avec des professionnels du VTC pour s'assurer de l'adéquation métier.",
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
      tagline: "Un site de réservation VTC complet, conçu et développé seul, avec de vraies courses, de vrais paiements et de vrais clients.",
      keyMetrics: [
        { value: '< 2 min', label: 'pour réserver une course' },
        { value: '2', label: 'APIs externes intégrées' },
        { value: '0', label: 'incident de paiement' }
      ],
      presentation: [
        "WeDriv est un site de réservation VTC que j'ai conçu, développé et mis en production seul, de A à Z. Le client saisit son adresse de départ et d'arrivée avec une autocomplétion Google, visualise son trajet sur une carte, voit le prix calculé en temps réel selon la distance, choisit son véhicule, puis paie par carte. La réservation est ensuite confirmée et suivie depuis un back-office. Côté technique, c'est du React et TypeScript en frontal, du Symfony avec API Platform derrière, Google Maps pour la cartographie et Stripe pour les paiements de bout en bout.",
        "L'intérêt du projet n'est pas dans une brique prise isolément, chacune est abordable, mais dans leur addition : deux APIs externes à apprivoiser, de l'argent réel à ne jamais perdre, une UX qui doit rester fluide malgré la latence réseau, et une cohérence visuelle à tenir seul. C'est surtout le projet qui m'a fait comprendre ce que veut dire être responsable d'un site en prod tout seul. Quand quelque chose casse un dimanche soir, il n'y a personne d'autre que moi au bout du fil."
      ],
      objectives: [
        "Permettre à un client de réserver une course en moins de deux minutes, avec un prix transparent et un paiement sécurisé",
        "Intégrer proprement Google Maps (autocomplétion d'adresses, distance, affichage cartographique) malgré la latence des appels",
        "Sécuriser les paiements de bout en bout, sans aucune possibilité de manipulation côté client",
        "Fournir un back-office complet pour gérer les réservations, les chauffeurs et les véhicules",
        "Démontrer que je sais concevoir, développer et mettre en production une application fullstack complète seul"
      ],
      context: {
        period: "Septembre 2025 à Avril 2026 (environ 7 mois en parallèle de l'école)",
        framework: "Projet personnel autodidacte, hors cadre scolaire ou professionnel",
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
          { label: "Frontend", value: "React avec TypeScript pour le typage strict, composants découpés et formulaires progressifs" },
          { label: "Backend", value: "Symfony avec API Platform pour exposer une API REST propre et documentée" },
          { label: "Base de données", value: "MySQL avec migrations versionnées" },
          { label: "Cartographie", value: "Google Maps (autocomplétion d'adresses, calcul de distance, affichage du trajet)" },
          { label: "Paiements", value: "Stripe avec vérification automatique des paiements et traitement asynchrone" },
          { label: "Authentification", value: "JWT signé, rôles client / chauffeur / administrateur" },
          { label: "Déploiement", value: "Mise en ligne automatisée à chaque mise à jour validée" }
        ],
        stakes: [
          "Démontrer ma capacité à concevoir et livrer une application fullstack complète en autonomie",
          "Gérer un parcours sensible (paiement réel par carte) sans aucune possibilité d'erreur",
          "Intégrer deux APIs externes complexes (Google Maps et Stripe) avec une UX qui reste fluide malgré leurs latences",
          "Tenir une cohérence visuelle et un niveau de polish suffisant en solo, sans designer",
          "Apprendre à mettre en production tout seul, ce qui est une compétence à part entière"
        ]
      },
      steps: [
        {
          title: "Cadrage, choix techniques et API backend",
          description: "Premières semaines : définir le parcours, choisir la stack et poser des fondations propres",
          bullets: [
            "Étude des sites VTC existants, puis définition du parcours client minimal : adresses, prix transparent, paiement, confirmation",
            "Choix de Symfony avec API Platform côté serveur (API REST documentée quasi sans code) et React + TypeScript côté client",
            "Modélisation des entités principales (utilisateurs, réservations, chauffeurs, véhicules, paiements) avant d'écrire le code",
            "Authentification par JWT avec trois rôles distincts : client, chauffeur, administrateur",
            "Validation stricte des données côté serveur, jamais de confiance aveugle au client, et états de réservation à transitions contrôlées",
            "Tests manuels exhaustifs sur chaque point d'entrée API avant de développer le frontend"
          ]
        },
        {
          title: "Intégration Google Maps avec UX fluide",
          description: "Offrir une saisie d'adresses et un affichage de trajet rapides, malgré la latence des appels Google",
          bullets: [
            "Autocomplétion d'adresses avec un délai entre les frappes pour limiter les appels et les coûts",
            "Calcul de la distance et de la durée estimée via l'API Google avant l'affichage du prix",
            "Affichage interactif du trajet sur une carte intégrée, avec tracé visible de A à B",
            "Indicateurs visuels de chargement progressifs pendant les appels API, pour que l'utilisateur sente que ça avance",
            "Gestion gracieuse des erreurs (adresse introuvable, API indisponible) sans réinitialiser la saisie",
            "Mise en cache des trajets fréquents pour éviter les appels redondants"
          ]
        },
        {
          title: "Paiement sécurisé Stripe",
          description: "Le morceau le plus sensible : gérer de vraies transactions par carte bancaire sans aucune faille",
          bullets: [
            "Calcul du montant uniquement côté serveur, jamais côté navigateur, pour empêcher toute manipulation",
            "Mise en place de notifications automatiques (webhooks) signées par Stripe et vérifiées avant traitement",
            "Traitement asynchrone des notifications pour ne jamais bloquer l'utilisateur ni Stripe",
            "Garde-fou pour qu'une même notification ne soit jamais traitée deux fois (ce qui éviterait des doubles confirmations)",
            "Gestion explicite de tous les cas problématiques : paiement refusé, expiration, double envoi, timeout",
            "Journalisation détaillée de chaque étape du paiement pour pouvoir tracer un litige a posteriori"
          ]
        },
        {
          title: "Frontend React et parcours de réservation",
          description: "Construire l'interface client en gardant la fluidité comme priorité absolue",
          bullets: [
            "Formulaire de réservation progressif : chaque étape ne révèle que ce dont l'utilisateur a besoin",
            "Affichage du prix en temps réel dès que les adresses sont saisies, sans avoir à cliquer pour calculer",
            "Carte interactive intégrée au formulaire, qui se met à jour pendant la saisie",
            "Choix du véhicule avec récap clair et confirmation visuelle de la sélection",
            "Page de paiement sobre, avec récap de la course et bouton « Payer » bien visible",
            "Confirmation visuelle de la réservation avec un récap complet (trajet, véhicule, prix, mode de paiement)"
          ]
        },
        {
          title: "Back-office d'administration et mise en production",
          description: "Outiller la gestion du quotidien et basculer sur un site réellement utilisable",
          bullets: [
            "Tableau de bord listant les réservations avec filtres et pagination",
            "Gestion CRUD des chauffeurs et des véhicules (ajout, modification, disponibilité)",
            "Suivi des paiements avec leur statut (confirmé, en attente, remboursé) et lien vers Stripe pour drill-down",
            "Sécurisation de l'accès au back-office avec vérification stricte du rôle administrateur",
            "Mise en production avec déploiement automatisé à chaque mise à jour validée",
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
          role: "Professionnels du VTC (testeurs externes)",
          description: "Quelques chauffeurs et personnes du métier ont testé le parcours de réservation et le back-office. Leurs retours ont été précieux sur la partie métier (ce qui leur faciliterait vraiment la vie au quotidien) et sur l'ergonomie du back-office (ce qu'ils auraient besoin de voir en un coup d'œil). C'est grâce à eux que j'ai simplifié plusieurs écrans qui étaient trop chargés dans la première version."
        },
        {
          role: "Testeurs ponctuels (amis, proches)",
          description: "Sollicités à différents moments pour parcourir la réservation comme de vrais clients. Leurs retours ont surtout porté sur la fluidité perçue (« je n'ai pas compris à quoi servait ce bouton », « j'ai cru que la page avait planté »). Des feedbacks que je n'aurais jamais formulés moi-même puisque je connaissais déjà le parcours par cœur."
        }
      ],
      results: {
        personal: {
          technical: [
            "Application fullstack complète conçue, développée et mise en production en autonomie",
            "Intégration propre de deux APIs externes complexes (Google Maps et Stripe) avec gestion fine des latences et des erreurs",
            "Sécurisation de paiements réels de bout en bout, avec validation côté serveur et gestion explicite des cas problématiques",
            "Génération automatique d'une API REST documentée grâce à API Platform, ce qui m'a fait gagner un temps considérable",
            "Compréhension concrète des enjeux d'UX sur un parcours sensible : chaque seconde d'attente compte"
          ],
          organizational: [
            "Capacité à structurer un projet long en solo et à le mener jusqu'en production",
            "Discipline pour avancer régulièrement en parallèle de l'école et de l'alternance, même quand la motivation baisse",
            "Validation manuelle approfondie des parcours sensibles avant chaque mise en ligne",
            "Capacité à déboguer seul en production, ce qui demande une vraie discipline mentale",
            "Auto-formation continue sur les sujets que je découvrais (Stripe, API Platform, intégration cartographique)"
          ],
          conclusion: "WeDriv m'a appris ce que veut dire « être responsable d'un site en production tout seul ». Quand un bug tombe en pleine soirée, il n'y a pas d'astreinte à appeler. Cette responsabilité change la manière de coder : on anticipe davantage, on met plus de garde-fous, on journalise tout. C'est aussi le projet qui m'a confirmé que je peux livrer une application complète sans équipe. Pas parce que c'est confortable, mais parce que je sais maintenant que c'est faisable."
        },
        business: {
          achievements: [
            "Site en production avec un parcours de réservation complet, fonctionnel sur mobile et desktop",
            "Aucun incident de sécurité ou de paiement depuis la mise en ligne",
            "Back-office complet permettant de gérer réservations, chauffeurs, véhicules et paiements",
            "Architecture modulaire qui facilite l'ajout de nouvelles fonctionnalités sans tout réécrire",
            "Documentation automatique de l'API, ce qui rendrait facile l'intégration de partenaires futurs"
          ],
          satisfaction: [
            "Validation positive du parcours par les testeurs, en particulier sur la fluidité perçue",
            "Retour favorable des professionnels du VTC sur l'ergonomie du back-office après simplification",
            "Aucune remontée client sur des incohérences de prix ou des problèmes de paiement depuis la mise en production",
            "Le site est suffisamment crédible pour être présenté comme un projet professionnel à des recruteurs"
          ],
          conclusion: "WeDriv tourne, prend de vrais paiements sans incident, et pourrait devenir une activité réelle si je décidais de le pousser. Pour l'instant, c'est surtout une preuve solide : je sais emmener une application fullstack du croquis jusqu'au site en ligne qui encaisse de l'argent. C'est exactement ce que je voulais démontrer avec ce projet, et c'est fait."
        }
      },
      aftermath: {
        immediate: [
          "Mise en ligne du site avec un nom de domaine dédié et certificat sécurisé",
          "Configuration des emails transactionnels (confirmation de réservation, reçu de paiement)",
          "Activation des paiements réels (sortie du mode test Stripe)",
          "Mise en place du déploiement automatique pour pouvoir corriger un bug rapidement"
        ],
        distant: [
          "Ajout d'une couche de tests automatisés sur les parties critiques (calcul de prix, paiement, transitions de réservation)",
          "Internationalisation du site (multilangue) prévue dès la conception mais ajoutée plus tard",
          "Système de notation des chauffeurs et fidélisation des clients",
          "Notifications mobiles pour les chauffeurs (acceptation de course, suivi en temps réel)",
          "Discussion avec des professionnels du VTC pour évaluer un usage commercial réel"
        ],
        today: [
          "Le site est en production et continue de fonctionner",
          "Sur les flux d'argent, je ne code plus pareil depuis : montant calculé côté serveur, journalisation de chaque étape, gestion explicite de tous les cas d'erreur. C'est devenu non négociable pour moi",
          "Je garde de ce projet la conviction qu'on apprend dix fois plus vite quand on doit gérer toute la chaîne soi-même, plutôt qu'en restant sur une seule couche"
        ]
      },
      critique: [
        {
          type: 'lesson',
          title: "Stripe est plus compliqué qu'il n'y paraît",
          body: "L'intégration de base se fait vite. Ce qui prend du temps, c'est tout le reste : paiement refusé, double envoi, expiration, timeout réseau. J'ai découvert ces cas un par un, souvent en production, alors que la documentation Stripe les couvre. J'aurais gagné plusieurs jours à la lire en profondeur avant de me lancer plutôt qu'en pompier."
        },
        {
          type: 'lesson',
          title: "Le multilangue, ça se pense au démarrage",
          body: "J'ai tout écrit en français en me disant que je traduirais plus tard. Quand j'ai voulu une seconde langue, j'ai dû repasser sur des textes éparpillés dans tout le code. Si on pense avoir besoin du multilangue un jour, on l'architecture dès le début, même si on ne livre qu'une langue au lancement. C'est presque gratuit à poser au départ, coûteux à rattraper après."
        },
        {
          type: 'lesson',
          title: "La rapidité ressentie compte autant que la vraie",
          body: "Au début, aucun retour visuel pendant les appels Google Maps. Les gens croyaient que la page avait planté et rechargeaient. Des indicateurs de chargement progressifs ont changé la perception du site alors que la latence réelle, elle, n'avait pas bougé d'une milliseconde. Depuis, je traite l'attente comme une partie de l'interface, pas comme un détail technique."
        },
        {
          type: 'takeaway',
          title: "Mettre en production seul, c'est un cap",
          body: "Avant WeDriv, mes mises en ligne étaient des projets d'école faits pour être notés. Là, il a fallu un domaine, un certificat, des emails transactionnels, Stripe en mode live, du monitoring, et personne pour rattraper une erreur. C'est un cap mental autant que technique. Une fois franchi, la mise en production cesse d'être l'étape qui fait peur pour devenir la suite normale du développement. C'est ce passage que je retiens vraiment de ce projet."
        }
      ]
    }
  },

  'followdeen': {
    title: 'FollowDeen - Marketplace de Cession de Business',
    description: "Marketplace francophone pour acheter, vendre et s'associer autour de business en ligne, avec escrow Stripe réel.",
    tags: ['Java', 'Spring Boot', 'Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Docker'],
    year: '2025-2026',
    logo: 'assets/logos/followdeen.svg',
    presentation: "FollowDeen est une marketplace que je développe seul pour permettre l'achat, la vente et la mise en relation autour de business en ligne (e-commerce, SaaS, applications, projets entrepreneuriaux). L'idée est de proposer une alternative aux plateformes existantes (Flippa, Acquire.com, Dotmarket, Empire Flippers) avec un cadre de confiance fort : vérification humaine des annonces, escrow Stripe réel et grille tarifaire dégressive (8 % en dessous de 5 k€, 5 % entre 5 et 50 k€, 3 % au-delà), sans abonnement.\n\nLa stack repose sur Spring Boot 3.3 et PostgreSQL 16 côté backend, Next.js 15 (App Router, RSC) et Tailwind CSS v4 côté frontend, le tout orchestré par Docker Compose en local. La logique financière est portée par Stripe Connect en mode Separate Charges & Transfers : les fonds restent bloqués sur le compte plateforme jusqu'à validation de la transaction, avant d'être libérés vers le vendeur. Au-delà de la marketplace, le projet intègre une brique « réseau professionnel » pour mettre en relation porteurs de projets et associés.\n\nLe MVP est livré à environ 98 % avec un flow transaction validé de bout en bout sur 9 scénarios différents (happy path, refus d'intérêt, refus d'offre, paiement échoué, annulations pré et post-paiement, signalement de manquement, demande d'annulation post-livraison, changement d'avis acheteur). La mise en production est volontairement repoussée pour finir le polish design et écrire la couverture de tests automatisés.",
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
      tagline: "Marketplace fullstack menée en solo. De l'idée à la mise en production, sans équipe ni designer.",
      keyMetrics: [
        { value: '~98 %', label: 'MVP livré' },
        { value: '13', label: 'migrations base' },
        { value: '~24', label: 'pages frontend' },
        { value: '9', label: 'scénarios validés' },
        { value: '1', label: 'développeur (moi)' }
      ],
      presentation: [
        "FollowDeen est une marketplace que je conçois et développe seul, pour permettre l'achat, la vente et la mise en relation autour de business en ligne (e-commerce, SaaS, applications, projets entrepreneuriaux). Je positionne le produit comme une alternative aux plateformes existantes (Flippa, Acquire.com, Dotmarket, Empire Flippers) avec un cadre de confiance plus fort : vérification humaine des annonces, escrow réel sur le paiement, et grille tarifaire dégressive plus accessible (8 % en dessous de 5 k€, 5 % entre 5 et 50 k€, 3 % au-delà), sans abonnement.",
        "Le projet est mené 100 % en autodidacte, en parallèle de ma vie pro et scolaire. Pas d'équipe, pas de designer, pas de relecteur de code. Tout repose sur ma propre organisation : j'ai planifié les tâches en amont, défini ce qu'il fallait pour livrer un MVP, et tenu un suivi structuré sur toute la durée pour ne pas perdre le fil. C'est cette rigueur qui m'a permis de tenir un projet de cette ampleur sur plusieurs mois sans flotter.",
        "FollowDeen est aussi mon laboratoire pour pousser des sujets techniques que je n'aurais pas forcément touchés ailleurs : un vrai escrow sur le paiement (les fonds sont bloqués sur la plateforme jusqu'à validation, pas un simple paiement direct), une logique de transaction à plusieurs étapes (9 états selon que l'acheteur paie, valide ou annule), et une couche SEO complète. C'est aussi le projet où j'ai le plus appris sur ma propre tendance à vouloir tout faire au lieu de livrer."
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
        period: "Janvier 2025 à aujourd'hui (MVP à ~98 % en mai 2026)",
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
          "Démontrer ma capacité à mener un projet ambitieux en autonomie complète, de l'idée à la mise en production",
          "Pousser des sujets techniques que je n'aurais pas forcément touchés en alternance (escrow, machine à états, conditions de course)",
          "Construire un actif personnel : si la mise en marché réussit, c'est un revenu potentiel",
          "Crédibiliser mon profil pour les futures candidatures avec un projet réel en production"
        ],
        risks: [
          "Surcharge de scope qui repousse la mise en marché. Déjà arrivé, plusieurs semaines perdues",
          "Bugs sur le paiement avec impact financier direct sur de vrais utilisateurs. L'organisation rigoureuse et les scénarios joués manuellement sont aujourd'hui mon principal filet",
          "Mixer le travail, l'école et un projet personnel ambitieux. Le vrai défi sur la durée, qui se gère à coup de discipline et de sessions structurées",
          "Décalage entre ce que je sais bien faire (technique) et ce que demande la mise en marché (marketing, communauté, communication). Un vrai inconnu pour moi"
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
            "Mix entre rendu côté serveur (pour le SEO et la rapidité) et rendu côté client (pour l'interactivité)",
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
        },
        {
          role: "Communautés en ligne",
          description: "Échanges sur le concept, le positionnement et la grille tarifaire. M'ont confirmé que la promesse (escrow réel + vérification humaine + commission dégressive) était lisible et alignée avec les attentes. Sans ces retours externes, je serais resté enfermé dans ma propre vision du projet."
        }
      ],
      results: {
        personal: {
          technical: [
            "Intégration d'un vrai escrow sur le paiement (les fonds sont bloqués sur la plateforme jusqu'à validation, puis libérés vers le vendeur)",
            "Modélisation et validation manuelle d'une logique de transaction non triviale (9 états, selon que l'acheteur paie, valide, annule ou signale)",
            "Architecture en plusieurs couches de défense sur le paiement (pour anticiper les conditions de course et les remboursements automatiques)",
            "Couche SEO complète (méta-données dynamiques, sitemap, données structurées) intégrée dès la conception",
            "Maîtrise complète d'une stack moderne en autonomie : backend Java / Spring Boot, frontend Next.js / React, base PostgreSQL"
          ],
          organizational: [
            "Capacité à planifier et structurer un projet ambitieux sur plusieurs mois sans encadrement",
            "Validation manuelle structurée des parcours utilisateur (9 scénarios formalisés rejoués à chaque changement)",
            "Auto-formation continue sur les sujets techniques que je découvrais (paiements, rendu côté serveur, animations)",
            "Capacité à arbitrer seul entre l'envie de tout perfectionner et la nécessité de livrer (mal joué la première fois, leçon retenue)",
            "Discipline pour avancer sur la durée même quand la motivation baisse. Particulièrement difficile en solo"
          ],
          conclusion: "FollowDeen m'a mis face à une tension que je ne connaissais pas vraiment : « tout vouloir bien faire » contre « livrer une première version ». Les deux se tirent dessus en permanence, et seul, sans personne pour me freiner, je penche systématiquement vers le perfectionnisme. Une première version qui sort vaut mieux qu'une version parfaite qui dort dans un dépôt. Apprendre ça dans ma propre chair, en voyant mon scope déraper, c'est le vrai apprentissage de ce projet."
        },
        business: {
          achievements: [
            "MVP livré à environ 98 %, prêt à passer en production une fois le polish design terminé",
            "Une vingtaine de pages frontend, une logique de paiement complète, un back-office de modération et une page de suivi des finances",
            "9 scénarios de transaction validés de bout en bout (parcours nominal, refus, paiement échoué, annulations, signalement, remboursement post-livraison)",
            "Architecture prête pour la mise en production (environnement local fonctionnel, mise en ligne planifiée)",
            "Couche SEO et accessibilité intégrées dès la conception, plutôt que rajoutées en bout de course"
          ],
          satisfaction: [
            "Validation positive de la landing par les beta-testeurs après les trois refontes",
            "Concept et grille tarifaire validés par les communautés en ligne",
            "Aucun incident sur les flux financiers lors des scénarios joués en mode test",
            "Le projet est crédible techniquement aux yeux de mes pairs développeurs"
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
          "Relecture juridique des conditions générales par un avocat avant l'ouverture au grand public"
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

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, NgClass, LucideAngularModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss'
})
export class ProjectDetailComponent {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id') ?? '';
  project: Project | null = projectsData[this.id] ?? null;

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
}
