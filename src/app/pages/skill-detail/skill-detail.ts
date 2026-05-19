import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

type SkillAnecdote = {
  title: string;
  situation: string;
  description: string;
  result: string;
  valueAdded: string;
  projectId: string;
};

type SkillCritique = {
  mastery: string;
  importance: string;
  acquisition: string;
  advice: string;
};

type SkillEvolution = {
  goals: string;
  training: string;
};

type SkillDetail = {
  name: string;
  category: 'tech' | 'human';
  level: number;
  logo?: string;
  icon?: string;

  definition: string;
  context: string;
  actuality: string;

  anecdotes: SkillAnecdote[];

  critique: SkillCritique;

  evolution: SkillEvolution;

  relatedProjects: string[];
};

const skillsData: Record<string, SkillDetail> = {

  // ═══════════════════════════════════════════════════════════════
  // 1. SYMFONY. Technique. Niveau 8
  // ═══════════════════════════════════════════════════════════════
  symfony: {
    name: 'Symfony',
    category: 'tech',
    level: 8,
    logo: 'assets/logos/symfony.png',

    definition: "Symfony est un framework PHP utilisé pour construire des applications web et des API solides et durables. C'est la technologie backend sur laquelle j'ai le plus d'expérience. J'ai commencé par de petits projets personnels pour apprendre, puis je l'ai pratiqué pendant trois ans en entreprise chez MacWay, sur un site e-commerce en production. C'est aujourd'hui le framework backend avec lequel je me sens le plus à l'aise, aussi bien pour reprendre un projet existant que pour en démarrer un de zéro.",

    context: "J'ai connu deux contextes très différents avec Symfony, et c'est ce qui m'a fait progresser. Chez MacWay, j'ai travaillé trois ans sur un site e-commerce déjà en place, avec un vrai trafic et des milliers de produits, ce qui m'a appris la rigueur et la prudence sur un projet vivant. Après cette expérience, j'ai construit WeDriv entièrement seul, ma plateforme de réservation de chauffeurs, pour continuer à approfondir Symfony et garder cette compétence bien à jour. Ce projet personnel m'a appris à décider seul de toute l'architecture et à l'assumer de bout en bout.",

    actuality: "Symfony reste la référence du développement web en PHP, particulièrement en entreprise et en France. La version 8, sortie fin 2025, met l'accent sur la performance et sur un cadre plus léger et plus moderne, en s'appuyant sur les dernières évolutions du langage PHP. Concrètement, ce que l'on me demande sur une mission, ce n'est presque jamais du PHP isolé, mais bien du Symfony avec une base de données et une API à faire vivre dans le temps. C'est exactement le type de projet sur lequel je suis le plus utile.",

    anecdotes: [
      {
        title: "MacWay - Comparateur de produits entre catégories",
        situation: "Le catalogue MacWay mélangeait des univers très différents comme les Mac, les iPad, le stockage ou les accessoires. Les clients voulaient pouvoir mettre deux produits côte à côte pour décider, y compris des produits qui n'avaient rien à voir entre eux. Cette possibilité n'existait pas sur le site. On m'a confié la fonctionnalité de bout en bout, de la conception au déploiement.",
        description: "La difficulté principale, c'était de comparer des produits qui n'ont pas les mêmes caractéristiques. Un ordinateur portable et un disque dur ne se décrivent pas de la même façon. J'ai construit une partie dédiée qui va chercher à la fois les caractéristiques communes et celles propres à chaque catégorie, en limitant volontairement à quatre produits pour que le tableau reste lisible. Les colonnes se construisent automatiquement et les différences sont mises en évidence. J'ai aussi conservé la sélection en cours pour que le client puisse continuer à naviguer sans perdre sa comparaison.",
        result: "La fonctionnalité est partie en production et a été mise en avant sur les pages catégories. Sur les premiers mois, elle tournait autour de 638 comparaisons générées par mois. C'est devenu un véritable outil d'aide à la décision, réellement utilisé par les clients.",
        valueAdded: "J'ai mené cette fonctionnalité seul, de la modélisation des données jusqu'à l'écran final. J'ai su garder un code propre et clair malgré des données très hétérogènes, ce qui rend la fonctionnalité simple à maintenir et à faire évoluer aujourd'hui.",
        projectId: "macway"
      },
      {
        title: "MacWay - Des tâches automatisées qui tournent chaque nuit",
        situation: "MacWay devait faire deux choses sans mobiliser quelqu'un tous les jours : diffuser son catalogue sur des plateformes externes pour gagner en visibilité, et écouler le stock dormant sans casser les marges. Les deux étaient faites à la main, avec le risque d'erreur que cela implique.",
        description: "J'ai mis en place des traitements automatiques planifiés qui s'exécutent chaque nuit. Le premier parcourt le catalogue actif, sélectionne les produits réellement diffusables selon leur stock, leur prix et leurs images, puis génère pour chaque plateforme (Pinterest, Meta, Google Shopping et Awin) un fichier conforme à ses propres exigences. Le second applique des réductions progressives selon l'ancienneté du stock et l'historique de ventes. J'ai ajouté un système de surveillance qui prévient l'équipe par mail dès qu'un seuil est franchi ou qu'un flux présente une anomalie.",
        result: "Le temps passé chaque semaine sur ces tâches manuelles est tombé à zéro. Les produits étaient présents sur les quatre plateformes avec des fichiers régénérés chaque nuit, et les anomalies étaient repérées avant que les plateformes ne rejettent les flux.",
        valueAdded: "J'ai automatisé entièrement un travail récurrent et source d'erreurs, tout en le rendant fiable dans la durée. La surveillance proactive que j'ai ajoutée permet de détecter une coupure de diffusion immédiatement plutôt qu'une semaine trop tard, ce qui protège directement le chiffre d'affaires.",
        projectId: "macway"
      },
      {
        title: "WeDriv - Une API complète conçue seul",
        situation: "WeDriv est ma plateforme de réservation de chauffeurs, construite entièrement seul. Il me fallait un backend capable de gérer les réservations, de calculer un prix réel à partir du trajet, d'encaisser les paiements et de proposer un espace d'administration. J'ai bâti cette API sur Symfony pour sa solidité et sa fiabilité dans le temps.",
        description: "J'ai défini toutes les opérations nécessaires pour les réservations, les chauffeurs, les véhicules et les paiements, chaque accès étant protégé selon le rôle de la personne, qu'elle soit client, chauffeur ou administrateur. La confirmation des paiements est traitée en arrière-plan, pour qu'elle aboutisse même si le réseau est lent. Le prix n'est jamais calculé du côté du client : il est recalculé côté serveur à partir de la distance réelle, ce qui empêche toute manipulation du montant. Les données reçues sont systématiquement contrôlées avant d'être enregistrées.",
        result: "L'API est en production et couvre tout le parcours, de la création de la course au paiement, à la confirmation et au suivi. L'espace d'administration permet de piloter l'activité. Aucun incident de paiement depuis la mise en ligne.",
        valueAdded: "Chaque choix d'architecture était le mien, je devais donc être capable de le justifier. C'est le projet qui m'a fait réellement maîtriser le traitement en arrière-plan, en autonomie complète. J'en retiens une règle que je garde : dès qu'il s'agit d'argent, c'est toujours le serveur qui a le dernier mot sur le montant.",
        projectId: "wedriv"
      }
    ],

    critique: {
      mastery: "Je me considère solide sur Symfony : trois ans en production chez MacWay, après avoir débuté sur de petits projets personnels, puis WeDriv construit entièrement seul. Je suis à l'aise sur tout le cœur du framework, aussi bien pour reprendre un projet existant que pour en démarrer un de zéro. Ce qu'il me reste à approfondir, ce sont certains scénarios avancés que je n'ai pas encore eu l'occasion de traiter en conditions réelles.",
      importance: "Symfony est mon socle backend principal. Associé à Spring Boot côté Java, il me couvre les deux grands environnements backend réellement demandés en entreprise. C'est aussi la technologie sur laquelle j'ai le plus de recul en contexte professionnel réel, et pas seulement en projet d'école.",
      acquisition: "Je l'ai appris progressivement : d'abord sur de petits projets personnels, puis intensément au quotidien sur le code de MacWay pendant trois ans, et enfin avec WeDriv où je devais tout décider seul. Cette progression par étapes m'a permis de construire une base solide et durable.",
      advice: "Bien comprendre d'abord comment Symfony organise et relie ses composants, car c'est le socle de tout le reste. Et soigner très tôt la qualité des requêtes vers la base de données, car c'est souvent ce qui dégrade les performances sans que l'on s'en aperçoive."
    },

    evolution: {
      goals: "Approfondir les architectures orientées événements et le traitement en arrière-plan, l'angle que je souhaite le plus consolider. Et progresser sur la performance et la mise en cache pour des API à plus fort trafic que celles que j'ai eu à gérer jusqu'ici.",
      training: "Je teste les nouveautés sur mes projets personnels, qui me servent de terrain d'expérimentation."
    },

    relatedProjects: ['macway', 'wedriv']
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. ANGULAR. Technique. Niveau 6
  // ═══════════════════════════════════════════════════════════════
  angular: {
    name: 'Angular',
    category: 'tech',
    level: 6,
    logo: 'assets/logos/angular.png',

    definition: "Angular est un framework TypeScript développé par Google pour construire des applications web complètes et bien structurées. Je l'ai découvert pendant ma formation à l'ISCOD, alors que je travaillais surtout avec React de mon côté. En l'explorant, j'ai compris l'intérêt de son approche. Il impose un cadre clair et une vraie séparation des responsabilités, ce qui rend les projets plus lisibles et plus faciles à maintenir dans le temps.",

    context: "Après l'avoir découvert en formation, j'ai voulu le pratiquer sur un vrai projet à moi : ce portfolio. Je l'ai construit entièrement seul, de l'architecture jusqu'à la mise en ligne, en m'appuyant sur la version la plus récente du framework et ses bonnes pratiques actuelles. L'objectif n'était pas seulement d'avoir un site en ligne, mais de prendre toutes les décisions techniques moi-même et de progresser en autonomie, comme sur un projet professionnel.",

    actuality: "Angular se modernise beaucoup en ce moment. À chaque nouvelle version, l'équipe qui le développe le rend plus simple et plus léger à utiliser, et la différence se ressent vraiment au quotidien. Il reste une valeur sûre pour les applications d'entreprise exigeantes, là où l'on a surtout besoin d'un cadre solide et fiable plutôt que d'une liberté totale. C'est typiquement dans ce type de projet que je le recommanderais.",

    anecdotes: [
      {
        title: "Portfolio - Une architecture pensée pour évoluer",
        situation: "Pour ce portfolio, je voulais une base solide que je puisse enrichir au fil du temps sans devoir tout reprendre à chaque ajout. Le piège classique d'un portfolio, c'est de coder vite et de devoir tout réorganiser quelques mois plus tard. Je voulais éviter cela dès le départ.",
        description: "J'ai construit l'application avec l'approche la plus récente d'Angular, en découpant chaque page de façon autonome et en ne chargeant le code d'une page qu'au moment où l'on s'y rend, pour garder un démarrage rapide. Le contenu du site, comme les compétences et les projets, est géré sous forme de données structurées : les pages se contentent de les afficher, donc ajouter une fiche revient simplement à compléter ces données plutôt qu'à réécrire des écrans. J'ai aussi séparé clairement les différentes parties du projet pour m'y retrouver facilement.",
        result: "Concrètement, ajouter un projet ou une compétence me prend quelques minutes au lieu d'une demi-journée, et le site reste rapide à charger.",
        valueAdded: "Cette organisation règle un vrai problème de maintenance et me fait gagner du temps à chaque évolution du site. Le portfolio en est la démonstration directe : sa qualité se vérifie simplement à l'usage.",
        projectId: "portfolio"
      },
      {
        title: "Portfolio - Une interface qui réagit en direct",
        situation: "La page des compétences devait pouvoir filtrer une liste instantanément, sans rechargement ni clignotement, et plusieurs pages réutilisaient les mêmes éléments d'affichage. Sans une bonne organisation, j'allais dupliquer le même code à plusieurs endroits.",
        description: "J'ai utilisé le système de réactivité moderne d'Angular pour que la liste affichée se mette à jour toute seule dès que l'on change de filtre, sans que j'aie à le gérer manuellement. J'ai aussi transformé les éléments répétés, comme la carte de compétence ou la carte de projet, en composants réutilisables avec des règles claires, ce qui évite les copier-coller et limite les erreurs.",
        result: "Le filtrage est immédiat et l'affichage reste cohérent d'une page à l'autre. Quand je modifie la structure d'une donnée, l'outil me signale tout de suite les endroits à corriger.",
        valueAdded: "J'ai su identifier la fonctionnalité qui répondait exactement à mon besoin et la mettre en place proprement. C'est ce pragmatisme que je cherche à garder quand je choisis une solution technique.",
        projectId: "portfolio"
      }
    ],

    critique: {
      mastery: "Je suis à l'aise avec les bases solides d'Angular et son approche moderne, apprises pendant ma formation à l'ISCOD puis approfondies seul sur ce portfolio. Comme mon expérience repose surtout sur un projet personnel que je maîtrise de bout en bout, je n'ai pas encore éprouvé le framework sur une très grande application en équipe. Je le dis honnêtement, même si les bonnes pratiques que j'applique restent transposables à des projets plus ambitieux.",
      importance: "Angular complète React dans mon profil de développeur front. Selon le contexte, je peux proposer l'un ou l'autre. Angular quand un projet a besoin d'un cadre strict et durable, React quand il faut plus de souplesse. Avoir les deux me permet d'adapter ma proposition au besoin réel.",
      acquisition: "Je l'ai abordé directement par sa version moderne, sans passer par l'ancienne façon de faire, ce qui m'a rendu opérationnel rapidement. Mon expérience préalable en TypeScript et en React a beaucoup facilité cette prise en main.",
      advice: "Bien comprendre l'architecture d'Angular avant de se lancer, car c'est ce qui fait toute sa force. Et soigner l'organisation du projet dès le premier jour, car reprendre une application Angular mal structurée demande beaucoup de travail."
    },

    evolution: {
      goals: "Continuer à pratiquer Angular sur des projets plus complexes que mon portfolio, pour gagner en expérience sur des applications de plus grande taille. À moyen terme, j'aimerais approfondir la gestion d'état réactive et progresser sur la qualité et les performances des interfaces.",
      training: "La documentation officielle d'Angular, les cours suivis pendant ma formation à l'ISCOD, et surtout la pratique régulière sur mes propres projets pour ne pas me limiter au seul portfolio."
    },

    relatedProjects: ['portfolio']
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. REACT. Technique. Niveau 7
  // ═══════════════════════════════════════════════════════════════
  'react-nextjs': {
    name: 'React',
    category: 'tech',
    level: 7,
    logo: 'assets/logos/react.png',

    definition: "React est l'une des technologies les plus utilisées pour construire des interfaces web modernes. C'est mon outil front principal quand je ne suis pas sur Angular. Je l'ai surtout pratiqué sur des interfaces où la donnée change beaucoup et où il faut garder un code clair malgré la complexité. C'est une technologie très répandue, dans laquelle je me déplace avec aisance.",

    context: "J'ai utilisé React dans deux contextes très différents. Chez VenaLabs, une plateforme autour de la crypto, sur la partie cours et sa carte interactive du parcours d'apprentissage. Sur WeDriv, sur le parcours de réservation qui combine la saisie assistée d'adresses et le calcul du prix en dynamique. Dans les deux cas, le vrai défi n'était pas l'affichage mais la bonne organisation des données.",

    actuality: "React reste l'une des technologies front les plus demandées sur le marché. Sa version récente, React 19, automatise une grande partie des optimisations de performance et simplifie la gestion des formulaires et des échanges avec le serveur, ce qui permet d'écrire moins de code pour un résultat plus fluide. Dans mon usage au quotidien, ce qui fait surtout la différence, c'est de l'associer à un typage strict pour fiabiliser le code.",

    anecdotes: [
      {
        title: "VenaLabs - La carte interactive du parcours de cours",
        situation: "VenaLabs permet d'apprendre la crypto. On m'a confié la partie cours, et notamment la carte interactive du parcours d'apprentissage. En plus du défi technique, la crypto était un domaine totalement nouveau pour moi à ce moment-là.",
        description: "Sur cette carte, chaque cours apparaît comme une étape cliquable, avec ses prérequis et son avancement, et les parcours se débloquent automatiquement selon ce que l'utilisateur a déjà terminé. J'ai synchronisé l'interface avec le serveur pour qu'elle ne donne jamais l'impression d'attendre, et fait en sorte que tout reste fluide et fiable même quand la progression évolue.",
        result: "La carte est passée en production et utilisée tous les jours. Rendre la progression visible a aidé les utilisateurs à aller au bout de leurs parcours.",
        valueAdded: "J'ai monté en compétence sur la crypto en même temps que je livrais cet écran, ce qui m'a appris à bien séparer la logique métier de l'affichage pour rester efficace sur un sujet nouveau. C'est ce qui a permis de garder un code clair et fiable malgré la complexité du domaine.",
        projectId: "venalabs"
      },
      {
        title: "WeDriv - Parcours de réservation et prix dynamique",
        situation: "Sur WeDriv, le client saisit deux adresses et obtient un prix. Derrière cet écran simple s'enchaînent plusieurs traitements, la saisie assistée des adresses, le calcul de la distance puis du prix. Le défi était que tout cela reste fluide et résiste aux cas d'erreur, comme une adresse introuvable ou un service qui ne répond pas.",
        description: "J'ai construit l'interface en React avec un typage strict. La saisie des adresses est assistée, le calcul de la distance se déclenche dès que les deux adresses sont validées, et le prix est fourni par le serveur puis mis à jour dynamiquement à l'écran. Le formulaire applique des règles de saisie claires et contrôlées, et les erreurs réseau sont traitées sans bloquer ni effacer ce que le client a déjà rempli.",
        result: "L'interface est en production et le prix s'affiche rapidement après la saisie des adresses, sans temps d'attente perceptible. Le parcours reste court et clair pour le client.",
        valueAdded: "Mon apport ici, c'est d'avoir intégré trois services externes dans un seul écran cohérent, sans que le client perçoive la mécanique derrière. Le contrôle strict des données m'a évité toute une catégorie d'erreurs sur les adresses.",
        projectId: "wedriv"
      }
    ],

    critique: {
      mastery: "Je suis à l'aise avec React moderne : composants, gestion d'état, formulaires complexes et intégration de services externes. Ce qu'il me reste à approfondir honnêtement, ce sont les fonctionnalités côté serveur les plus récentes, que je n'ai pas encore mises en œuvre en conditions réelles. C'est justement pour cela que j'ai isolé Next.js en compétence séparée, afin d'y aller plus en profondeur.",
      importance: "React est l'une des technologies front les plus demandées sur le marché. En entretien, c'est presque toujours la première que l'on évoque. La maîtriser solidement, avec Angular en complément, me permet d'adapter ma proposition selon le type de mission.",
      acquisition: "Je l'ai appris en livrant de vrais projets, VenaLabs m'a appris à structurer une interface dans un domaine inconnu, WeDriv à gérer la lenteur de services externes. Ma base en typage strict a beaucoup facilité cette progression.",
      advice: "Bien maîtriser les bases de React avant d'aller chercher des librairies, car une grande partie des besoins se règle déjà avec les outils natifs bien compris."
    },

    evolution: {
      goals: "Mettre réellement en pratique les fonctionnalités côté serveur les plus récentes, et approfondir la gestion du cache sur des applications qui manipulent beaucoup de données liées entre elles.",
      training: "C'est principalement par la documentation que je me tiens à jour et que j'approfondis, en mettant ensuite en pratique ce que j'apprends."
    },

    relatedProjects: ['venalabs', 'wedriv']
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. NEXT.JS. Technique. Niveau 7
  // ═══════════════════════════════════════════════════════════════
  nextjs: {
    name: 'Next.js',
    category: 'tech',
    level: 6,
    logo: 'assets/logos/nextjs.png',

    definition: "Next.js est un framework qui s'appuie sur React pour construire des sites et des applications web rapides à charger et bien visibles sur les moteurs de recherche. C'est mon réflexe dès qu'un projet doit être à la fois performant et bien référencé, et pas seulement fonctionnel. Je l'utilise sur les projets où la visibilité compte vraiment.",

    context: "Mon vrai terrain Next.js, c'est FollowDeen, ma place de marché, dont j'ai construit seul l'intégralité de l'interface. À côté, chez VenaLabs, Next.js servait surtout à afficher rapidement et de façon bien référencée les pages publiques du site. Ces deux usages se complètent, une expérimentation maîtrisée en entreprise et une application complète menée seul de bout en bout.",

    actuality: "Next.js reste l'écosystème le plus mûr pour faire du React en production avec une vraie exigence de référencement. La version 16, sortie en 2026, met l'accent sur la rapidité, avec des temps de construction et de démarrage nettement plus courts et une gestion de la mise en cache simplifiée. C'est exactement le type de besoin produit sur lequel je m'appuie avec cette compétence.",

    anecdotes: [
      {
        title: "FollowDeen - L'interface complète construite seul",
        situation: "Sur FollowDeen, je devais construire seul toute l'interface : une page d'accueil animée, une place de marché avec filtres et pagination, un tableau de bord utilisateur, une page de transaction par étapes, le paiement, un espace d'administration et les pages légales. Sans designer ni renfort, et avec l'exigence que tout soit bien référencé et rapide.",
        description: "J'ai organisé l'application avec une séparation nette entre tout ce qui est contenu et lecture, préparé directement côté serveur pour s'afficher vite, et ce qui est réellement interactif comme le paiement ou le tableau de bord. Pour le référencement, j'ai ajouté des informations adaptées à chaque page, des données structurées pour les produits et la FAQ, un plan du site automatique et des règles qui excluent clairement les espaces privés des moteurs de recherche. J'ai aussi soigné la cohérence de l'affichage pour éviter tout décalage entre ce qui est préparé côté serveur et ce qui s'affiche ensuite.",
        result: "Une vingtaine de pages livrées, aucune erreur d'affichage et des données structurées valides. Le découpage entre contenu et parties interactives garde l'application légère là où l'interactivité n'est pas nécessaire, et le référencement est pensé dès le départ plutôt qu'ajouté à la fin.",
        valueAdded: "Tenir autant de pages cohérentes seul m'a obligé à me construire une vraie méthode de travail, avec une base commune, des éléments réutilisables et une organisation stricte. C'est cette rigueur qui m'a permis de rester productif sur la durée et de livrer un produit complet sans renfort.",
        projectId: "followdeen"
      },
      {
        title: "VenaLabs - Affichage rapide et référencé des pages publiques",
        situation: "Chez VenaLabs, les pages publiques comme la page d'accueil et la présentation des cours devaient être bien référencées et s'afficher vite, alors que les pages réservées aux membres connectés étaient surtout très interactives. Il fallait un cadre qui gère proprement cette double nature, sans solution de contournement.",
        description: "J'ai utilisé Next.js pour préparer les pages publiques directement côté serveur, déjà remplies avec leurs données, afin qu'elles soient lues correctement par les moteurs de recherche. Les pages réservées aux membres sont restées affichées côté navigateur pour rester réactives. La cohabitation entre les deux fonctionnements a été organisée proprement, sans mélanger les responsabilités.",
        result: "Les pages publiques étaient rapides et bien référencées, le parcours connecté restait réactif, et le passage de l'un à l'autre était invisible pour l'utilisateur.",
        valueAdded: "C'est sur ce projet que j'ai vraiment compris quand préparer une page côté serveur et quand la laisser réagir côté navigateur, le serveur pour ce qui doit être référencé et chargé vite, le navigateur pour ce qui demande de l'interactivité. Cette grille de lecture me sert sur tous mes projets Next.js depuis.",
        projectId: "venalabs"
      }
    ],

    critique: {
      mastery: "Je suis à l'aise sur l'organisation d'une application Next.js, la séparation entre contenu et parties interactives, le référencement et l'intégration d'un paiement. Ce qu'il me reste à approfondir honnêtement, ce sont les fonctionnalités les plus récentes autour des actions serveur et de la mise en cache, que je n'ai pas encore poussées à fond en conditions réelles.",
      importance: "Next.js est mon réflexe dès qu'une interface doit être bien référencée. Avec Angular pour les applications internes et React pur pour les interfaces sans contrainte de référencement, Je dispose d’un ensemble cohérent à proposer. Sur le marché des projets produit, c'est une compétence très demandée.",
      acquisition: "Je l'ai appris en livrant de vrais projets : d'abord l'affichage côté serveur des pages publiques chez VenaLabs, puis une application complète construite seul sur FollowDeen. C'est cette progression du cadre simple vers le projet complet qui m'a fait réellement comprendre le framework.",
      advice: "Décider très tôt ce qui doit être préparé côté serveur et ce qui doit rester interactif côté navigateur, car c'est ce qui garde l'application légère et rapide. Et bien comprendre le fonctionnement de la mise en cache, qui peut réserver des surprises si on ne la maîtrise pas."
    },

    evolution: {
      goals: "Approfondir les fonctionnalités récentes autour des actions serveur et de la mise en cache, et tester un déploiement sur un projet à trafic réel pour en comprendre les contraintes en pratique.",
      training: "Avec FollowDeen, je compte expérimenter concrètement les actions serveur et la mise en cache, tout en découvrant les contraintes réelles d’un déploiement."
    },

    relatedProjects: ['followdeen', 'venalabs']
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. SPRING BOOT. Technique. Niveau 7
  // ═══════════════════════════════════════════════════════════════
  'spring-boot': {
    name: 'Spring Boot',
    category: 'tech',
    level: 7,
    logo: 'assets/logos/spring-boot.png',

    definition: "Spring Boot est un framework Java utilisé pour construire des applications web et des API robustes, pensées pour la production. C'est mon environnement backend de référence côté Java. Je l'ai pratiqué dans deux cadres complémentaires, en équipe sur une plateforme déjà en place et seul sur un projet que j'ai construit de bout en bout. Ce que j'apprécie, c'est qu'il permet d'avancer vite tout en restant fiable, ce qui est exactement ce que l'on attend sur des projets où une erreur coûte cher.",

    context: "J'utilise Spring Boot dans deux contextes complémentaires. Chez VenaLabs, j'ai fait évoluer le backend d'une plateforme déjà en place, au sein d'une équipe de développeurs, ce qui m'a appris à travailler proprement sur une base existante et partagée. Sur FollowDeen, j'ai au contraire tout construit moi-même, jusqu'à une intégration de paiement complexe, ce qui m'a forcé à justifier chacun de mes choix. Ces deux expériences se complètent : l'une m'a appris les bonnes pratiques en équipe, l'autre l'autonomie complète.",

    actuality: "Spring Boot reste largement dominant dans le monde Java en entreprise, en particulier sur les projets où la fiabilité prime sur la rapidité de prototypage. La version 4, sortie début 2026, modernise nettement le framework, avec un cœur plus modulaire et plus léger, de meilleures performances. C'est exactement cette catégorie de projets exigeants que je vise avec cette compétence.",

    anecdotes: [
      {
        title: "VenaLabs - Backend et système de gamification",
        situation: "VenaLabs devait gérer des utilisateurs, des cours, des airdrops, des classements et des interactions blockchain, avec une sécurité renforcée vu la sensibilité des données. J'ai contribué au backend au sein d'une équipe de trois développeurs, sur une architecture déjà en place.",
        description: "Le projet sépare clairement la logique métier des aspects techniques comme la base de données ou les services externes, ce qui rend l'ensemble plus simple à faire évoluer. L'accès aux données est protégé selon le rôle de chaque utilisateur. J'ai surtout développé le système de gamification autour d'un Battle Pass. Les utilisateurs débloquent des récompenses en s'exerçant et en apprenant sur la plateforme, ce qui les fait revenir et maintient leur engagement dans la durée. J'ai conçu ce Battle Pass pour qu'il soit entièrement éditable depuis le back-office. L'équipe peut créer ou ajuster les récompenses et les différentes saisons directement, sans qu'on ait besoin de recoder quoi que ce soit à chaque évolution. À cela s'ajoutent les points attribués selon le type d'action et un classement recalculé régulièrement, optimisé pour rester rapide.",
        result: "Le backend est en production et porte l'ensemble des fonctionnalités. Le Battle Pass est piloté de façon autonome par l'équipe depuis le back-office, et l'organisation du projet a permis d'ajouter de nouvelles fonctionnalités sans fragiliser l'existant.",
        valueAdded: "Sur la gamification, j'ai traduit un objectif d'engagement en une logique concrète : un Battle Pass qui fidélise les utilisateurs par les récompenses et reste pilotable sans intervention de développeur, doublé d'un classement performant qui reste rapide même quand le nombre d'utilisateurs augmente.",
        projectId: "venalabs"
      },
      {
        title: "FollowDeen - Paiement sécurisé sous séquestre",
        situation: "FollowDeen est une place de marché d'achat et de vente de business en ligne. Le défi backend, c'était de tenir un vrai niveau de qualité tout seul, avec une authentification complète et sécurisée, un suivi rigoureux des différentes étapes d'une transaction, et un véritable paiement sous séquestre, et non un simple encaissement.",
        description: "J'ai construit le backend avec une version récente de Spring Boot et de Java, sur une base de données dont la structure est versionnée et maîtrisée à chaque évolution. Le paiement fonctionne en séquestre : les fonds restent bloqués sur le compte de la plateforme jusqu'à ce que la transaction soit terminée, puis sont transférés au vendeur. J'ai aussi dû résoudre un décalage entre l'outil de paiement et une version récente de son service, en mettant en place une solution de secours pour traiter les notifications de paiement de façon fiable. Côté qualité, j'ai formalisé neuf scénarios de transaction de bout en bout que je rejouais à chaque changement important.",
        result: "Backend du MVP livré à environ 98%, avec les neuf scénarios validés de bout en bout en mode test, du parcours normal jusqu'aux annulations avant et après paiement. Aucun incident de sécurité financière sur ces tests.",
        valueAdded: "J'ai mis en place un paiement sous séquestre réellement sécurisé, en autonomie complète, là où une simple solution d'encaissement aurait été insuffisante pour ce besoin. Cette exigence m'a fait gagner un vrai niveau de maîtrise sur les paiements en ligne et sur Spring Boot, en comprenant précisément chaque mécanisme mis en place.",
        projectId: "followdeen"
      }
    ],

    critique: {
      mastery: "Je suis à l'aise sur le cœur de Spring Boot, la gestion des données et la sécurité, ainsi que sur l'intégration de services externes. FollowDeen m'a poussé à tenir seul un vrai niveau de qualité sur une place de marché complète. Ce qu'il me reste à approfondir, c'est l'expérience de Spring sous très forte charge, car ni VenaLabs ni FollowDeen, à leur échelle, ne me l'ont demandé.",
      importance: "C'est mon environnement backend Java de référence. Associé à Symfony côté PHP, il me couvre les deux principaux environnements backend du marché. En entreprise, Spring Boot est très présent sur les projets exigeants en fiabilité.",
      acquisition: "Je l'ai appris en livrant de vrais projets : en équipe chez VenaLabs sur une base existante et avec des revues de code, puis seul sur FollowDeen où chaque choix devait être justifié. C'est la combinaison des deux qui m'a fait progresser, l'équipe pour les bonnes pratiques, le solo pour vraiment comprendre en profondeur.",
      advice: "Bien comprendre d'abord comment Spring Boot s'auto-configure et relie ses composants, car c'est le socle de tout le reste. Et lorsqu'on intègre un service de paiement, prévoir dès le départ une solution de secours pour traiter ses notifications, car ces outils évoluent souvent plus vite que leurs bibliothèques."
    },

    evolution: {
      goals: "Approfondir les approches qui améliorent les performances et réduisent les temps de démarrage des applications, et renforcer FollowDeen avec une vraie couverture de tests automatisés.",
      training: "Je progresse surtout en continuant à faire évoluer FollowDeen. C'est en le poussant plus loin, sur la couverture de tests et les performances, que je tombe concrètement sur les sujets que je veux creuser, comme le traitement en arrière-plan et les architectures orientées événements."
    },

    relatedProjects: ['venalabs', 'followdeen']
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. DOCKER. Technique. Niveau 6
  // ═══════════════════════════════════════════════════════════════
  docker: {
    name: 'Docker',
    category: 'tech',
    level: 6,
    logo: 'assets/logos/docker.png',

    definition: "Docker permet de faire fonctionner une application de la même manière partout : sur ma machine, sur celle d'un collègue ou en production. Il sert à empaqueter une application et tout ce dont elle a besoin pour qu'elle démarre de façon identique en une seule commande. Je l'utilise sur mes projets, mais je le considère encore comme une compétence en cours de consolidation plutôt qu'un acquis solide.",

    context: "Je l'ai rencontré dans deux contextes très différents. Chez VenaLabs, Docker était déjà en place avant mon arrivée : je n'ai pas construit la configuration, je l'ai surtout utilisée et observée pour comprendre comment elle était pensée, avec une séparation nette entre le front-end et le back-end, des fichiers de configuration distincts, et toute la mise en production sur les serveurs. C'était une vraie découverte côté usage et organisation. Sur FollowDeen, c'est moi qui ai tout mis en place côté Docker, jusqu'à une configuration conteneurisée prête à partir. C'est mon terrain d'entraînement : le projet n'est pas encore en ligne, et la mise en production réelle est l'étape qu'il me reste à franchir. C'est là que j'apprends le plus, et aussi là que je mesure ce qu'il me reste à approfondir.",

    actuality: "La conteneurisation est aujourd'hui le standard pour livrer une application : la question n'est plus de savoir si on l'utilise, mais comment. Sur les très grandes échelles, des outils d'orchestration comme Kubernetes prennent le relais, un terrain que je n'ai pas encore pratiqué. Mon usage reste centré sur la préparation de l'application et sa configuration conteneurisée, la mise en production réelle étant justement l'étape sur laquelle je m'entraîne encore.",

    anecdotes: [
      {
        title: "VenaLabs - Découvrir Docker dans un vrai contexte de production",
        situation: "Chez VenaLabs, Docker était déjà intégré au projet avant mon arrivée. Le but n'était pas pour moi de le mettre en place, mais de comprendre une configuration existante, plus complète que tout ce que j'avais vu : une séparation entre le front-end et le back-end, des fichiers de configuration distincts, et une vraie mise en production sur les serveurs.",
        description: "J'ai surtout travaillé avec cette configuration au quotidien et cherché à comprendre comment elle était organisée : pourquoi le front et le back étaient séparés, à quoi servait chaque fichier, et comment l'environnement local se reliait à ce qui tournait en production. J'étais davantage en position d'observation et d'utilisation que de conception.",
        result: "J'ai gagné une vision concrète de ce à quoi ressemble une mise en place Docker sérieuse sur un projet d'équipe, au-delà d'un simple usage en local. Cela m'a donné un point de comparaison utile pour mes propres projets.",
        valueAdded: "Cette expérience m'a surtout montré l'écart entre savoir lancer un projet conteneurisé et savoir en concevoir l'architecture complète. C'est une étape de découverte honnête, qui m'a fait prendre conscience de ce qu'il me reste à apprendre.",
        projectId: "venalabs"
      },
      {
        title: "FollowDeen - Mon terrain d'entraînement Docker",
        situation: "Sur FollowDeen, je voulais passer d'un code qui tourne sur mon poste à une application réellement prête à être mise en ligne, accessible et sécurisée, sans équipe technique pour m'épauler. C'est le projet que j'utilise comme terrain d'entraînement sur Docker.",
        description: "J'ai préparé l'application pour qu'elle se construise toujours de la même manière et qu'elle tourne de façon conteneurisée, avec une couche en façade pour gérer les connexions et l'aiguillage des requêtes. La version que je fais tourner en local est exactement celle qui partira en production. Je m'entraîne sur toute cette chaîne, l'étape qu'il me reste à franchir étant le vrai déploiement en production.",
        result: "FollowDeen est prêt côté Docker : la configuration est en place et reproductible sans improviser. Le projet n'est pas encore en ligne, et c'est précisément cette dernière étape, la mise en production réelle, qui constitue mon prochain objectif concret sur cette compétence.",
        valueAdded: "Avoir construit cette chaîne seul m'a obligé à comprendre chaque étape plutôt qu'à la déléguer. FollowDeen me sert de terrain pour m'entraîner en conditions réelles, et il me montre clairement la limite actuelle de mon niveau : je suis à l'aise sur la préparation et l'usage en local, il me reste à éprouver la mise en production de bout en bout.",
        projectId: "followdeen"
      }
    ],

    critique: {
      mastery: "Je suis à l'aise sur l'essentiel : préparer une application, la faire tourner avec sa base de données en une commande et organiser sa configuration conteneurisée. Mais je l'ai surtout pratiqué en local sur un projet personnel mené seul, et découvert sur un projet d'équipe sans en construire la configuration. Il me reste l'étape la plus exigeante : mener une vraie mise en production de bout en bout. C'est clairement une compétence que je dois continuer à approfondir.",
      importance: "Docker est le maillon entre écrire du code et le mettre réellement entre les mains des utilisateurs. Sans cette compétence, je dépends de quelqu'un d'autre pour la mise en production. La consolider est donc une priorité pour gagner en autonomie sur tout le cycle d'un projet.",
      acquisition: "Je l'ai appris par la pratique et par nécessité : pour que FollowDeen puisse un jour fonctionner ailleurs que sur mon poste, j'ai construit sa configuration conteneurisée et je continue de m'entraîner dessus à chaque itération. VenaLabs m'a surtout permis de découvrir une configuration déjà en place, plus aboutie, qui me sert aujourd'hui de référence.",
      advice: "Commencer simple, car une configuration claire et qui fonctionne vaut mieux qu'un montage sophistiqué que l'on ne maîtrise pas. Et garder l'environnement de production le plus proche possible de celui de développement, car l'écart entre les deux est exactement là où surviennent les mauvaises surprises."
    },

    evolution: {
      goals: "Aller jusqu'au bout de la mise en production réelle de FollowDeen, puis approfondir Docker au-delà de l'usage de base : des configurations plus propres et plus complètes construites par moi-même, et l'orchestration à grande échelle comme Kubernetes, que je n'ai pas encore pratiquée.",
      training: "Je consolide mes acquis à chaque itération de mes projets personnels, FollowDeen en tête, en cherchant à chaque fois à améliorer la configuration plutôt qu'à la reproduire à l'identique, jusqu'à la faire passer en production réelle."
    },

    relatedProjects: ['followdeen', 'venalabs']
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. OPTIMISATION UX & PERFORMANCE. Humaine. Niveau 9
  // ═══════════════════════════════════════════════════════════════
  'optimisation-ux': {
    name: 'UX & Performance',
    category: 'human',
    level: 9,
    logo: 'assets/logos/ux-ui.png',

    definition: "Pour moi, l'expérience utilisateur et la performance sont indissociables. Une interface esthétique mais lente finit par être abandonnée, et un site rapide mais confus aussi. Ce que je travaille, c'est la sensation finale ressentie par l'utilisateur, qui ne doit jamais avoir à attendre, à chercher où cliquer, ni à penser à la technique. Tout le reste n'est qu'un moyen au service de cet objectif.",

    context: "J'ai travaillé cette sensibilité sur plusieurs terrains très différents. Sur WeDriv et FollowDeen, que j'ai conçus seul de bout en bout, j'ai pensé l'expérience et la rapidité ensemble dès le départ, et amélioré les performances en continu. Chez VenaLabs, j'ai participé à la refonte complète de la plateforme, de sa version 2 à sa version 3, avec un changement de design majeur et des gains de performance sur l'ensemble du produit. À côté, ce portfolio est lui-même une démonstration de rendu rapide et d'accessibilité.",

    actuality: "Google a intégré la performance perçue dans son classement, ce qui fait que la lenteur rime désormais directement avec invisibilité. En parallèle, les normes d'accessibilité deviennent des obligations légales dans de plus en plus de pays. Autrement dit, ce que je considérais comme du soin est devenu une véritable exigence, à la fois commerciale et réglementaire, et non un simple confort.",

    anecdotes: [
      {
        title: "VenaLabs - Refonte complète et gains de performance",
        situation: "VenaLabs devait passer de sa version 2 à une version 3 entièrement repensée. L'interface avait besoin d'un vrai renouvellement, et l'ensemble du produit souffrait de lenteurs qui pénalisaient l'expérience au quotidien. L'objectif était une refonte complète, à la fois visuelle et technique.",
        description: "J'ai participé à la refonte entière de la plateforme, de sa version 2 à sa version 3. Le design a été repensé de fond en comble, pour une interface plus claire, plus moderne et plus cohérente d'un écran à l'autre. En parallèle, j'ai travaillé l'amélioration des performances sur l'ensemble du produit, en allégeant les écrans, en réduisant les temps d'affichage et en fluidifiant les parcours les plus utilisés.",
        result: "La version 3 est en production, avec une interface nettement plus moderne et une navigation plus rapide et plus agréable sur tout le produit. Le changement a été visible immédiatement pour les utilisateurs.",
        valueAdded: "Mon apport a été de traiter le design et la performance comme un seul et même chantier, et non deux sujets séparés. C'est ce qui a permis à la version 3 d'être à la fois plus aboutie visuellement et réellement plus rapide à l'usage.",
        projectId: "venalabs"
      },
      {
        title: "MacWay - Comparateur fluide jusque sur mobile",
        situation: "Le comparateur de produits MacWay devait rester utilisable sur un petit écran alors qu'il affiche plusieurs produits côte à côte avec beaucoup de caractéristiques. Sur mobile, l'espace est très réduit et la tentation de tout entasser est forte. C'est exactement là que l'expérience se gagne ou se perd.",
        description: "J'ai conçu l'écran en pensant d'abord au mobile. Sur petit écran, les produits défilent horizontalement avec des colonnes compactes et des sections repliables pour les familles de caractéristiques, tandis que sur grand écran on passe en tableau complet. J'ai ajouté une mise en évidence automatique des différences pour guider le regard plutôt que de laisser l'utilisateur tout comparer ligne par ligne. Côté rapidité, les images sont dans un format moderne et léger et se chargent progressivement pour ne pas bloquer l'affichage.",
        result: "Le comparateur reste fluide sur mobile et la page se charge en moins de 2 secondes même avec plusieurs produits détaillés. L'équipe l'a validé sans retour négatif sur l'ergonomie.",
        valueAdded: "Mon apport, c'est d'avoir pensé l'usage et la rapidité ensemble plutôt que l'un après l'autre. La mise en évidence des différences n'est pas un effet visuel, mais une réponse concrète à une vraie difficulté de lecture sur petit écran.",
        projectId: "macway"
      },
      {
        title: "WeDriv - Donner l'impression que rien n'attend",
        situation: "Sur WeDriv, que j'ai conçu seul, le parcours de réservation enchaîne plusieurs traitements entre la saisie d'adresse et l'affichage du prix. Techniquement, il y a forcément un temps de calcul. Le défi n'était pas de le supprimer, mais de faire en sorte que l'utilisateur ne le ressente pas, car une attente perçue à ce moment-là se traduit par une réservation abandonnée.",
        description: "J'ai découpé le parcours en étapes visuelles qui progressent. La saisie d'adresse réagit immédiatement, puis le trajet se dessine, puis le prix apparaît, chaque étape ayant son propre indicateur d'avancement plutôt qu'une attente figée. Je commence à tracer le trajet sans attendre la réponse finale, en m'appuyant sur les informations déjà connues. Les erreurs ne bloquent pas le parcours : une adresse introuvable est signalée sur le champ concerné sans effacer ce que l'utilisateur a déjà saisi.",
        result: "Le prix s'affiche vite, mais surtout l'utilisateur perçoit un mouvement continu plutôt qu'une attente. Les retours sont positifs sur la simplicité et la réactivité, et le formulaire est peu abandonné.",
        valueAdded: "Mon choix d'investir dans des transitions soignées et des étapes progressives est précisément ce qui transforme un temps de calcul technique en un parcours fluide. C'est ce niveau de détail qui fait la différence sur ce type d'écran.",
        projectId: "wedriv"
      },
      {
        title: "Portfolio - Une preuve d'accessibilité et de rapidité",
        situation: "Ce portfolio devait être sa propre démonstration. Si je parle de performance et d'accessibilité, le site doit les incarner, sinon le discours perd toute valeur. L'enjeu était de tenir un affichage rapide et un site réellement accessible sur tous les appareils.",
        description: "J'ai bâti un système visuel cohérent, avec des couleurs, une typographie et des espacements normalisés, déclinés en éléments réutilisables. Chaque élément est accessible, navigable au clavier et avec des contrastes conformes aux normes d'accessibilité. Côté rapidité, le contenu n'est chargé qu'au moment où il est nécessaire, les images sont dans des formats modernes, et je privilégie des animations légères pour des transitions fluides sans ralentir l'affichage.",
        result: "Le site obtient de très bons résultats aux audits de performance et garde un rendu homogène et accessible partout. Ajouter du contenu ne dégrade pas la cohérence, grâce au système visuel commun.",
        valueAdded: "Je n'ai pas traité l'accessibilité comme une option de fin de projet, mais comme une contrainte dès le départ. C'est ce qui fait que le site tient réellement la promesse qu'il décrit.",
        projectId: "portfolio"
      }
    ],

    critique: {
      mastery: "J'ai une vraie sensibilité à ce sujet, et pas seulement sur le plan technique. Je couvre des contextes très différents, de l'e-commerce sous trafic au temps réel, en passant par la refonte complète d'une plateforme et un système visuel accessible construit de zéro. Ce qu'il me manque honnêtement, c'est davantage de mesure formelle, comme des tests utilisateurs cadrés et des comparaisons en production pour valider une hypothèse plutôt que de me fier à mon ressenti.",
      importance: "L'expérience utilisateur et la performance touchent directement le résultat de l'entreprise, qu'il s'agisse de conversion, d'engagement ou de fidélisation. Un site lent ou confus fait fuir les utilisateurs. C'est une compétence humaine, car l'essentiel est de se mettre à la place de l'utilisateur, et non d'aligner des optimisations techniques.",
      acquisition: "Je l'ai construite progressivement, par des lectures sur la performance et l'accessibilité, puis par la pratique sur de vrais projets, et enfin par l'observation de ce que font réellement les utilisateurs. MacWay m'a montré l'impact commercial, WeDriv m'a poussé sur le temps réel, et VenaLabs sur une refonte d'ampleur.",
      advice: "Mesurer avant d'optimiser, car on corrige presque toujours le mauvais endroit en se fiant à son intuition. Penser au mobile en priorité par défaut. Et tester avec de vrais utilisateurs plutôt qu'entre développeurs, car nous ne sommes pas représentatifs du public final."
    },

    evolution: {
      goals: "Développer une vraie compétence dans la mesure du comportement des utilisateurs, pour évaluer concrètement l'impact de mes choix plutôt que de l'estimer au ressenti, et automatiser les contrôles d'accessibilité.",
      training: "Je suis les publications de référence sur la performance web, je me forme sur les normes d'accessibilité et je réalise des audits réguliers sur mes projets."
    },

    relatedProjects: ['venalabs', 'wedriv', 'followdeen', 'macway', 'portfolio']
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. COLLABORATION AGILE & TRAVAIL EN ÉQUIPE. Humaine. Niveau 8
  // ═══════════════════════════════════════════════════════════════
  'collaboration-agile': {
    name: 'Méthode agile Scrum',
    category: 'human',
    level: 8,
    logo: 'assets/logos/agile.png',

    definition: "Travailler en méthode agile, pour moi, ce n'est pas appliquer des rituels par habitude. C'est une façon de rester synchronisé avec les autres, de dire clairement où j'en suis, de signaler tôt un blocage plutôt que de le laisser traîner, et d'accepter que les priorités évoluent. Les outils ne sont qu'un support. Ce qui compte vraiment, c'est que personne ne découvre un problème trop tard.",

    context: "J'ai surtout pris mes vraies habitudes de travail en équipe chez VenaLabs, dans une petite équipe en télétravail où une organisation rigoureuse était indispensable : un point quotidien le matin pour se synchroniser et un suivi partagé sur Airtable où vivait chaque tâche. MacWay, ma toute première expérience en entreprise, m'avait fait découvrir une autre façon de s'organiser, par sprints hebdomadaires autour d'un tableau physique, dans un contexte où mon maître d'apprentissage avait peu de temps à m'accorder à cause des difficultés de l'entreprise.",

    actuality: "Les méthodes agiles continuent d'évoluer avec le travail à distance et hybride. Les équipes sont plus petites, plus autonomes et plus proches du produit, et les outils de suivi se perfectionnent. Ce que je retiens, c'est que la tendance va vers moins de rituels formels et plus de transparence réelle sur l'avancement, ce qui correspond bien à ma façon de fonctionner.",

    anecdotes: [
      {
        title: "VenaLabs - Le point quotidien et le suivi partagé sur Airtable",
        situation: "Chez VenaLabs, nous travaillions à distance, en petite équipe et avec des priorités qui pouvaient changer vite. Dans ce contexte, une bonne organisation n'était pas un confort mais une nécessité : sans cadre commun, nous aurions perdu en coordination et personne n'aurait eu de vision claire de l'avancement.",
        description: "Chaque matin, nous faisions un point ensemble pour dire où nous en étions, ce que nous prenions dans la journée et ce qui posait problème. Tout était centralisé sur un Airtable partagé, avec différents statuts pour suivre chaque étape : ce qui restait à faire, ce qui était en cours, ce qui était prêt avant la mise en test, ce qui attendait la mise en production, et ce qui était terminé. Une grande liste de tâches y était partagée, ce qui permettait à chacun de prendre ce sur quoi il travaillait et de voir immédiatement qui était sur quoi.",
        result: "Même à distance, les livraisons sont restées régulières et lisibles. On repérait tout de suite un point de blocage, car une tâche immobile entre deux statuts se voyait immédiatement. Le point du matin permettait de régler les blocages dans la journée plutôt que de les laisser traîner une semaine.",
        valueAdded: "Je ne me limitais pas à mes propres tâches. Je faisais aussi avancer le suivi pour l'équipe, en signalant tôt ce qui risquait de bloquer plus loin et en gardant les statuts toujours à jour. Quand on travaille à distance, un suivi fiable est ce qui remplace le fait de se voir, et je veillais à ce que l'Airtable reflète toujours la réalité.",
        projectId: "venalabs"
      },
      {
        title: "MacWay - Découvrir le travail en entreprise au rythme des sprints",
        situation: "MacWay a été ma toute première expérience en entreprise. C'est là que j'ai découvert comment s'organise concrètement une équipe, dans un contexte particulier : l'entreprise traversait des difficultés et mon maître d'apprentissage, qui était aussi mon chef, avait peu de temps à m'accorder.",
        description: "Il n'y avait pas vraiment d'outil de suivi numérique, mais un tableau physique. C'est lui qui distribuait les tâches, et nous fonctionnions par sprints : chaque semaine, un objectif à réaliser, puis un point en fin de semaine pour vérifier où chacun en était. J'ai dû prendre mes tâches et avancer sans attendre, car il n'y avait pas toujours quelqu'un de disponible pour me relancer.",
        result: "Même sans outil sophistiqué, j'ai intégré la cadence d'un cycle court et l'idée de rendre un travail dans un délai fixe. C'est cette expérience qui m'a fait découvrir, en conditions réelles, ce qu'est travailler en équipe et tenir un engagement à la semaine.",
        valueAdded: "Mon apport a été de m'adapter à un cadre léger et peu encadré sans en faire un prétexte : je prenais mes tâches, j'avançais et je rendais à l'heure. C'est précisément parce que mon maître d'apprentissage avait peu de temps que cette autonomie dans le rythme comptait pour l'équipe.",
        projectId: "macway"
      }
    ],

    critique: {
      mastery: "Je suis à l'aise dans le rythme agile : le point quotidien, les statuts toujours à jour et la discipline du suivi partagé, y compris à distance. J'ai connu deux cadres complémentaires, la découverte du travail en sprints chez MacWay et un suivi rigoureux en équipe à distance chez VenaLabs. Ce que je souhaite faire progresser, c'est animer moi-même un rituel ou un atelier plutôt que d'y participer.",
      importance: "La collaboration démultiplie l'effet de toutes les compétences techniques. Un bon développeur qui ne communique pas fait moins avancer l'équipe qu'un développeur moyen qui sait la débloquer.",
      acquisition: "Je l'ai apprise directement sur le terrain, en la pratiquant au quotidien. MacWay, ma première expérience en entreprise, m'a fait découvrir le rythme des sprints et le travail organisé en équipe. VenaLabs m'a ensuite donné la cadence et la discipline d'un suivi partagé fiable, à distance. Chaque point quotidien et chaque mise à jour des statuts m'ont fait progresser.",
      advice: "Adapter la méthode au contexte, et jamais l'inverse. Communiquer un blocage tôt, car un blocage partagé se résout bien plus vite qu'un blocage caché. Et tenir le suivi fiable, car un statut faux coûte plus cher qu'un retard assumé."
    },

    evolution: {
      goals: "Apprendre à faciliter un atelier ou une rétrospective, et évoluer vers un rôle où la coordination d'équipe prend plus de place que ma seule contribution.",
      training: "Je lis sur la facilitation d'équipe et le leadership technique, et j'écoute des retours d'expérience de personnes qui ont ce rôle."
    },

    relatedProjects: ['venalabs', 'macway']
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. AUTONOMIE & RÉSOLUTION DE PROBLÈMES. Humaine. Niveau 9
  // ═══════════════════════════════════════════════════════════════
  'autonomie-resolution': {
    name: 'Autonomie',
    category: 'human',
    level: 9,
    logo: 'assets/logos/autonomie.png',

    definition: "Être autonome, pour moi, ne signifie pas travailler seul dans son coin. Cela veut dire qu'on peut me confier une responsabilité en toute confiance, parce que j'avance, je débloque ce qui doit l'être, je sais reconnaître le moment où demander de l'aide et je rends un travail fiable. C'est la compétence dans laquelle je me reconnais le plus, parce que mon parcours m'a réellement obligé à la construire.",

    context: "L'autonomie est le fil rouge de mon alternance, et je l'ai construite progressivement, au fil des expériences et souvent dans des conditions exigeantes. Chez MacWay, ma première expérience en entreprise, mon maître d'apprentissage avait peu de temps à m'accorder, ce qui m'a appris très tôt à apprendre par moi-même et à livrer un travail fiable dès le départ pour ne pas lui faire perdre de temps. Chez VenaLabs, j'ai d'abord travaillé aux côtés de mon maître d'apprentissage, puis il a quitté l'entreprise au bout d'un an. C'est moi qui ai repris l'ensemble du projet, car j'avais déjà démontré, tout au long de la collaboration, que je savais travailler de façon fiable par moi-même.",

    actuality: "Le travail à distance et les équipes distribuées rendent l'autonomie plus décisive que jamais. On recherche des personnes capables de prendre des initiatives, de se débloquer seules et de communiquer de façon proactive, plutôt que d'attendre des consignes. C'est précisément le profil que mon parcours m'a amené à devenir, et c'est un terrain où je me sens pleinement légitime.",

    anecdotes: [
      {
        title: "VenaLabs - Monter seul en compétence sur un domaine inconnu",
        situation: "En arrivant chez VenaLabs, je ne connaissais rien à la crypto, ni à son fonctionnement ni à ses usages. Or toute la plateforme reposait dessus. Je devais monter en compétence très vite sur un domaine complexe, tout en étant utile sur le code dès les premières semaines.",
        description: "J'ai structuré mon apprentissage par étapes plutôt que de tout vouloir comprendre d'un coup, en commençant par les concepts de base via la documentation officielle, puis par les spécificités propres à VenaLabs en lisant la documentation interne et en posant des questions ciblées. En parallèle, j'ai commencé à contribuer immédiatement sur des parties qui ne demandaient pas une connaissance approfondie du domaine, pour être productif tout de suite plutôt que d'attendre de tout maîtriser.",
        result: "En quelques semaines, j'étais capable de développer des fonctionnalités directement liées à la crypto en comprenant leur contexte métier, et pas seulement en reproduisant des modèles existants. Ma montée en compétence a été reconnue comme rapide par l'équipe.",
        valueAdded: "Ce que je retiens, c'est la méthode : combiner l'apprentissage et la production plutôt que de les séparer. Attendre de tout comprendre avant de contribuer fait perdre du temps, alors que cibler ce qui est utile immédiatement permet d'avancer réellement.",
        projectId: "venalabs"
      },
      {
        title: "MacWay - Apprendre par moi-même pour livrer juste du premier coup",
        situation: "MacWay était ma première expérience en entreprise, dans un contexte difficile pour la société. Mon maître d'apprentissage, qui était aussi mon chef, avait très peu de temps à m'accorder. Je ne pouvais pas compter sur un accompagnement rapproché ni sur des explications détaillées à chaque étape.",
        description: "J'ai dû beaucoup apprendre par moi-même : chercher la réponse, lire le code existant et tester mes hypothèses avant de solliciter mon maître d'apprentissage. Je me suis surtout fixé une exigence simple : ce que je rendais devait être correct dès le départ, pour qu'il ait le moins de reprises possible à faire dessus. Concrètement, je prenais le temps de bien comprendre la demande, je testais sérieusement mon travail et je le relisais avant de le soumettre.",
        result: "Mon maître d'apprentissage avait peu de corrections à repasser sur ce que je livrais, ce qui lui faisait gagner un temps précieux dans une période où il en manquait. De mon côté, j'ai gagné très tôt en fiabilité et en confiance, sans dépendre d'un accompagnement permanent.",
        valueAdded: "J'ai transformé une contrainte, le peu de disponibilité de mon encadrant, en moteur d'autonomie : apprendre vite seul et viser juste du premier coup. C'est cette habitude de rendre un travail fiable sans avoir à être repassé derrière qui définit, pour moi, l'autonomie réellement utile à une équipe.",
        projectId: "macway"
      },
      {
        title: "VenaLabs - Reprise complète du projet après le départ de mon maître d'apprentissage",
        situation: "Vers la fin de mon apprentissage chez VenaLabs, mon maître d'apprentissage a quitté l'entreprise. Du jour au lendemain, il n'y avait plus personne au-dessus de moi sur l'application, et c'est à moi qu'il revenait de la faire vivre. Il m'avait déjà confié tôt les accès sensibles et la possibilité de déployer moi-même, car j'avais montré que je travaillais de façon fiable en autonomie.",
        description: "J'ai pris l'application en main de bout en bout, en gérant les évolutions, les mises à jour de la base de données, les déploiements en production et la relecture de ce qui était livré. Avant ce départ, ces responsabilités étaient partagées ou supervisées. Ensuite, je devais décider seul de ce qui pouvait partir, dans quel ordre, et en assumer les conséquences. J'ai maintenu une rigueur stricte sur les mises en production, car sur une base de données réelle il n'existe pas de retour en arrière simple. Le responsable de l'entreprise m'a accordé sa confiance pour cela, parce que j'avais démontré cette fiabilité tout au long de la collaboration.",
        result: "L'application a continué à fonctionner et à évoluer sans rupture malgré le départ de mon maître d'apprentissage. Personne n'a eu à reprendre le projet dans l'urgence, parce que je le tenais déjà solidement en main.",
        valueAdded: "C'est le moment où mon autonomie a vraiment franchi un cap. Passer d'un travail accompagné à la responsabilité complète d'une application en production change la nature même de l'engagement, et c'est ce qui m'a le plus fait monter en compétence. J'ai transformé la confiance accordée tôt en une capacité à tenir l'ensemble du projet quand il l'a fallu.",
        projectId: "venalabs"
      },
      {
        title: "FollowDeen - Mener un projet personnel par moi-même sur mon temps libre",
        situation: "En parallèle de mon alternance, j'ai voulu un projet à moi, que je développe sur mon temps libre, pour prendre de l'expérience sans aucun cadre imposé et faire aboutir une idée qui me tient personnellement à cœur. Personne ne me confiait de tâche, ne fixait de délai ni ne relisait mon travail : tout reposait sur ma seule volonté d'avancer.",
        description: "Je porte FollowDeen par moi-même, en décidant seul de tout : l'idée, les fonctionnalités, les choix techniques, la conception et le développement. J'ai dû m'imposer ma propre discipline pour continuer à progresser régulièrement malgré l'alternance à côté, prioriser ce qui comptait vraiment et accepter d'apprendre seul tout ce qui me manquait pour avancer.",
        result: "FollowDeen est un projet réel que je fais avancer sur la durée par mes seuls moyens. Au-delà du projet lui-même, il me sert de terrain d'expérience permanent, où j'éprouve mes choix sans personne pour rattraper mes erreurs.",
        valueAdded: "C'est la preuve la plus directe que je suis capable de conduire un projet par moi-même en totale autonomie, de l'idée jusqu'à un produit qui fonctionne. Le faire sans contrainte extérieure, juste par envie de le mener à bout, montre que mon autonomie ne dépend pas d'un cadre imposé mais d'une vraie capacité à m'organiser et à tenir dans la durée.",
        projectId: "followdeen"
      }
    ],

    critique: {
      mastery: "C'est ma compétence la plus forte, et elle vient d'une vraie contrainte vécue sur le terrain. Un maître d'apprentissage peu disponible chez MacWay m'a obligé à me débrouiller seul dès le début, et la reprise complète du projet VenaLabs après son départ m'a fait passer au niveau supérieur, celui où l'on porte seul une application en production. J'y ajoute la conduite en solo d'un projet long comme FollowDeen, qui prouve que je tiens la distance sans relecteur.",
      importance: "Sans autonomie, mes compétences techniques auraient bien moins d'impact. C'est elle qui me rend fiable, en startup comme à distance, car on peut compter sur un développeur autonome sans avoir à le surveiller. Dans les contextes où j'ai évolué, c'était une exigence de base et non un simple atout supplémentaire.",
      acquisition: "Je l'ai construite par nécessité, projet après projet. Apprendre par moi-même chez MacWay faute de temps pour m'accompagner et livrer juste du premier coup, monter seul en compétence sur un domaine inconnu chez VenaLabs, puis assumer entièrement le projet lorsqu'il n'y avait plus personne au-dessus de moi. Chaque situation sans filet a renforcé ma méthode.",
      advice: "L'autonomie n'est pas l'isolement. Savoir demander de l'aide au bon moment compte autant que savoir avancer seul. Il faut structurer son approche, de l'analyse à la validation en passant par l'hypothèse et le test, et documenter ses décisions, car lorsqu'on est seul à porter un projet, la trace écrite est le seul filet de sécurité."
    },

    evolution: {
      goals: "Transmettre cette autonomie à d'autres par le mentorat, et renforcer mon leadership technique pour associer ma capacité à avancer seul à celle de guider une équipe.",
      training: "Je me forme sur le mentorat et le leadership technique, je poursuis mes projets personnels et je vise des contributions open source pour pratiquer dans des contextes que je ne maîtrise pas entièrement."
    },

    relatedProjects: ['venalabs', 'macway', 'followdeen']
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. VISION PRODUIT & COMPRÉHENSION BUSINESS. Humaine. Niveau 7
  // ═══════════════════════════════════════════════════════════════
  'vision-produit': {
    name: 'Esprit produit',
    category: 'human',
    level: 7,
    logo: 'assets/logos/product-design.png',

    definition: "Comprendre le besoin réel, c'est ce qui distingue le fait d'exécuter une demande de celui de construire quelque chose de réellement utile. Je ne veux pas me limiter à livrer ce qu'on me dicte sans en connaître la raison. Je cherche à comprendre l'objectif derrière chaque demande, car c'est à ce moment-là que l'on peut proposer mieux que ce qui était initialement prévu.",

    context: "Deux expériences ont forgé cette vision. Chez VenaLabs, je suis arrivé dans un univers que je ne connaissais pas du tout, la crypto, où j'ai dû apprendre le vocabulaire et les usages, mais surtout comprendre les utilisateurs et leurs besoins avant même de penser au code. Sur FollowDeen, j'ai mené moi-même toute la réflexion produit, en concevant le service pour un type d'utilisateur précis et en arbitrant seul entre l'ambition et ce qui était réellement utile. L'une m'a appris à comprendre un domaine et son public, l'autre à concevoir un produit de bout en bout.",

    actuality: "Les entreprises recherchent de plus en plus des développeurs qui pensent produit, et pas seulement code. Les postes orientés produit intègrent désormais explicitement la dimension métier, et les équipes plus autonomes attendent des développeurs qu'ils comprennent les enjeux. C'est une direction qui me correspond, car c'est déjà ainsi que j'aborde un projet.",

    anecdotes: [
      {
        title: "VenaLabs - Comprendre un univers inconnu et ses utilisateurs avant de coder",
        situation: "En arrivant chez VenaLabs, je découvrais un univers que je ne connaissais pas du tout : la crypto. Toute la plateforme reposait dessus et s'adressait à un public crypto avec ses propres usages. Je ne pouvais pas concevoir de fonctionnalités réellement utiles sans d'abord comprendre ce monde et les attentes de ceux à qui il s'adressait.",
        description: "Je me suis approprié le vocabulaire et les concepts du domaine : ce qu'est un airdrop, les différents types de connexion de wallet, les termes techniques propres à la crypto et aux airdrops. Mais je ne me suis pas arrêté au technique. J'ai cherché à comprendre l'univers des utilisateurs crypto, leurs habitudes, ce qu'ils attendaient d'une plateforme comme celle-ci et le besoin réel derrière chaque fonctionnalité.",
        result: "J'ai pu développer des fonctionnalités en comprenant à qui elles s'adressaient et pourquoi, et pas seulement comment les coder. Mes contributions tenaient compte du contexte métier et des attentes des utilisateurs crypto, ce qui les rendait réellement pertinentes.",
        valueAdded: "Mon apport, c'est de ne pas avoir traité la crypto comme une simple contrainte technique à reproduire, mais comme un domaine et un public à comprendre. C'est ce réflexe de partir de l'utilisateur et de son besoin, même sur un terrain totalement inconnu, qui distingue l'exécution d'une demande de la construction de quelque chose d'utile.",
        projectId: "venalabs"
      },
      {
        title: "FollowDeen - Penser tout le produit pour un type d'utilisateur précis",
        situation: "FollowDeen est né d'un constat sur le marché de la cession de business en ligne, où les plateformes existantes sont opaques sur leurs tarifs et offrent un cadre de confiance limité. Je l'ai pensé pour un utilisateur précis : une personne qui veut vendre ou reprendre un business en ligne en confiance, sans abonnement ni grille tarifaire obscure. Tout le produit, je devais le concevoir moi-même.",
        description: "J'ai d'abord étudié les concurrents en détail, leur positionnement, leurs tarifs, leur modèle de revenus et leurs garanties de confiance, pour repérer leurs points faibles du point de vue de cet utilisateur. J'en ai tiré trois différenciateurs clairs : un paiement sous séquestre où les fonds sont bloqués jusqu'à validation, une vérification humaine des annonces et une grille de commission dégressive sans abonnement, de 8 puis 5 puis 3 pour cent selon le montant. Ensuite, j'ai listé toutes les fonctionnalités envisagées, puis je les ai triées en distinguant ce qui était indispensable à une première version réellement utile de ce qui pouvait venir plus tard.",
        result: "Le positionnement et la grille tarifaire ont été construits à partir des points faibles identifiés chez les concurrents, ce qui a donné un produit cohérent et bien équilibré : des différenciateurs clairs et un périmètre de première version tenable. Le projet n'est pas encore en ligne, il n'y a donc pas de validation commerciale, mais la réflexion produit en amont est solide, et j'ai pris conscience que sa suite relèvera autant du commercial que de la technique, ce qui est en soi un enseignement.",
        valueAdded: "J'ai mené seul toute la chaîne produit, de l'étude concurrentielle au modèle économique, en gardant en tête l'utilisateur visé et ses difficultés à chaque décision. Surtout, j'ai su renoncer à en faire trop d'emblée pour concevoir un produit cohérent et réellement utile pour ce public précis, plutôt que de me disperser.",
        projectId: "followdeen"
      }
    ],

    critique: {
      mastery: "Je sais partir du besoin réel et de l'utilisateur visé plutôt que d'une demande appliquée à l'aveugle. VenaLabs m'a appris à m'approprier un domaine inconnu et à comprendre son public, FollowDeen m'a fait concevoir un produit complet pour un utilisateur précis, de l'étude de marché au périmètre. Ce qu'il me manque encore, c'est d'avoir mené cette démarche au sein d'une équipe produit structurée, et non en solo.",
      importance: "Comprendre la raison de chaque fonctionnalité change tout. On propose de meilleures solutions, on priorise mieux et on est crédible face aux équipes métier. C'est la compétence qui transforme un bon développeur en développeur à fort impact.",
      acquisition: "Construite chez VenaLabs en devant comprendre un univers et ses utilisateurs avant de coder, puis approfondie sur FollowDeen avec une vraie démarche d'étude, de priorisation et de validation où je devais arbitrer seul entre l'ambition et l'utilité réelle. C'est la combinaison des deux qui m'a fait progresser.",
      advice: "Poser systématiquement la question du pourquoi avant de coder le comment. S'intéresser aux indicateurs métier, et pas seulement techniques. Et garder en tête que le code est un moyen et non une fin, car un produit qui sort vaut mieux qu'une version parfaite qui n'aboutit jamais."
    },

    evolution: {
      goals: "Pratiquer la découverte produit dans un cadre d'équipe, et apprendre à mesurer l'impact produit avec de vrais outils plutôt qu'au ressenti.",
      training: "Je me forme sur les méthodes de discovery et de validation produit, et je pratique sur FollowDeen et mes projets à venir."
    },

    relatedProjects: ['venalabs', 'followdeen']
  },

};

@Component({
  selector: 'app-skill-detail',
  imports: [RouterLink, NgClass, LucideAngularModule],
  templateUrl: './skill-detail.html',
  styleUrl: './skill-detail.scss'
})
export class SkillDetailComponent {
  private readonly route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get('id') ?? '';
  skill: SkillDetail | null = skillsData[this.id] ?? null;

  private projectsInfo: Record<string, { name: string; logo?: string }> = {
    'portfolio': { name: 'Portfolio', logo: 'assets/logos/portfolio.png' },
    'venalabs': { name: 'VenaLabs', logo: 'assets/logos/venalabs.png' },
    'macway': { name: 'MacWay', logo: 'assets/logos/macway.png' },
    'wedriv': { name: 'WeDriv', logo: 'assets/logos/wedriv.png' },
    'klaridoc': { name: 'Klaridoc', logo: 'assets/logos/klaridoc.png' },
    'followdeen': { name: 'FollowDeen', logo: 'assets/logos/followdeen.svg' }
  };

  badgeClass = (cat: 'tech' | 'human') =>
    cat === 'tech' ? 'bg-accent/10 text-accent border-accent/20'
      : 'bg-secondary text-secondary-foreground border-border';

  // Couleur d'accent par compétence (hex)
  getAccentColor(): string {
    const colors: Record<string, string> = {
      'symfony': '#a855f7',
      'angular': '#ef4444',
      'react-nextjs': '#06b6d4',
      'nextjs': '#0f172a',
      'spring-boot': '#22c55e',
      'docker': '#2496ed',
      'optimisation-ux': '#ec4899',
      'collaboration-agile': '#14b8a6',
      'autonomie-resolution': '#f97316',
      'vision-produit': '#8b5cf6',
    };
    return colors[this.id] ?? '#6366f1';
  }

  getProjectName(projectId: string): string {
    return this.projectsInfo[projectId]?.name ?? projectId;
  }

  getProjectLogo(projectId: string): string | undefined {
    return this.projectsInfo[projectId]?.logo;
  }
}
