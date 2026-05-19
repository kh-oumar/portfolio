import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

type ItemType = 'experience' | 'education' | 'certification';

interface TimelineItem {
  type: ItemType;
  date: string;
  title: string;
  organization: string;
  logo?: string;
  description: string;
  tags?: string[];
  // Détails pour la modal (2ème niveau)
  details?: {
    responsibility?: string; // Pour expériences
    status?: string; // Stagiaire, Alternant, etc.
    missions?: string[]; // Liste détaillée des missions
    relatedProjects?: Array<{ id: string; name: string }>; // Liens vers projets
    relatedSkills?: Array<{ id: string; name: string }>; // Liens vers compétences
    institutionDescription?: string; // Pour formations
    pedagogyVision?: string; // Pour formations
    websiteUrl?: string; // Lien vers site institutionnel
  };
}

interface CoreValue {
  title: string;
  description: string;
}

interface CollaborativeQuality {
  icon: string;
  title: string;
  description: string;
}

interface PersonalInterest {
  icon: string;
  title: string;
  description: string;
}

interface PhilosophyPillar {
  title: string;
  description: string;
}

interface CurrentRole {
  position: string;
  company: string;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-about',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  private cdr = inject(ChangeDetectorRef);

  heroTitle = 'Développeur Full Stack Passionné';
  heroTagline = "Je crée des expériences web performantes, accessibles et centrées sur l'utilisateur";

  // Modal state
  selectedItem: TimelineItem | null = null;
  isModalOpen = false;

  openModal(item: TimelineItem) {
    // Reset first
    this.selectedItem = null;
    this.isModalOpen = false;

    // Then set new values
    setTimeout(() => {
      this.selectedItem = item;
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden';
      this.cdr.markForCheck();
    }, 0);
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedItem = null;
    // Restore body scroll
    document.body.style.overflow = '';
  }

  // Core Values
  coreValues: CoreValue[] = [
    {
      title: 'Excellence Technique',
      description: "La qualité du code n'est pas une option, c'est une responsabilité. Je m'engage à écrire du code propre, maintenable et testé. L'excellence technique passe par la maîtrise des standards web, l'attention aux détails et la recherche constante de solutions optimales. Chaque ligne de code doit avoir un but, chaque composant doit être pensé pour durer."
    },
    {
      title: 'Apprentissage Continu',
      description: "Le développement web évolue rapidement, et rester pertinent nécessite une curiosité insatiable. Je consacre du temps chaque semaine à explorer de nouvelles technologies, à approfondir mes connaissances et à remettre en question mes pratiques. L'apprentissage n'est jamais terminé c'est un voyage permanent qui permet de maintenir l'innovation."
    },
    {
      title: 'Collaboration & Partage',
      description: "Les meilleurs projets naissent de la collaboration. Je crois en la force des équipes où chacun partage ses connaissances, apprend des autres et contribue à une vision commune. Le partage des connaissances, que ce soit par la documentation, le mentorat ou les revues de code, élève l'équipe entière et crée une culture d'excellence."
    }
  ];

  // Current Role & Professional Vision
  currentRole: CurrentRole = {
    position: 'Développeur Full Stack',
    company: 'Alternant / VenaLabs',
    description: "Je participe au développement et à l’évolution d’une plateforme web orientée produits numériques, en intervenant aussi bien sur les aspects front-end que back-end. Mon travail s’inscrit dans une logique d’amélioration continue, avec une attention particulière portée à la qualité du code, aux performances et à la robustesse des fonctionnalités.",
    technologies: ['Java', 'Spring Boot', 'Next.js', 'React','TypeScript', 'Tailwind CSS', 'NoSql', 'Docker']
  };

  careerGoals: string[] = [
    "Renforcer ma maîtrise des architectures logicielles et des bonnes pratiques de développement",
    "Contribuer à des projets techniques à fort impact et à forte valeur ajoutée",
    "Développer une expertise en performance, qualité logicielle et sécurité",
    "Participer à la conception de solutions évolutives et maintenables",
    "Collaborer efficacement au sein d’équipes techniques et participer au partage de bonnes pratiques",
    "Évoluer progressivement vers un rôle de Lead Developer ou Tech Lead",
 ];

  // Collaborative Qualities
  qualities: CollaborativeQuality[] = [
    {
      icon: 'ear',
      title: 'Écoute Active',
      description: "Comprendre avant de proposer. J'écoute attentivement les besoins des utilisateurs et les retours de l'équipe."
    },
    {
      icon: 'refresh-cw',
      title: 'Adaptabilité',
      description: "Flexible face au changement. Je m'adapte rapidement aux nouvelles technologies et aux pivots de projet."
    },
    {
      icon: 'square-check',
      title: 'Rigueur',
      description: "Attention aux détails. Je veille à la qualité du code, aux tests et à la documentation complète."
    },
    {
      icon: 'message-square',
      title: 'Communication Claire',
      description: "Transparent et précis. Je communique les problèmes rapidement et explique les solutions techniques simplement."
    },
    {
      icon: 'search',
      title: 'Curiosité',
      description: "Toujours apprendre. Je cherche à comprendre le pourquoi derrière chaque décision technique."
    },
    {
      icon: 'target',
      title: 'Orienté Solutions',
      description: "Orienté résultats, je propose des solutions adaptées aux besoins réels"
    }
  ];

  // Personal Interests
  interests: PersonalInterest[] = [
    {
      icon: 'mountain',
      title: 'Randonnée',
      description: "L'exploration de la nature en montagne offre une déconnexion essentielle et renouvelle la créativité. Chaque sentier est une opportunité de se ressourcer et de cultiver la persévérance."
    },
    {
      icon: 'cpu',
      title: 'Sciences et Innovation',
      description: "Passionné par les nouvelles technologies, la robotique et l'électronique embarquée. L'innovation technologique façonne notre futur et inspire mes solutions de développement."
    },
    {
      icon: 'brain',
      title: 'Jeux de Stratégie',
      description: "Les échecs et jeux de plateau stratégiques développent l'anticipation, la planification et la prise de décision - des compétences essentielles en architecture logicielle."
    },
    {
      icon: 'lightbulb',
      title: 'Apprentissage Continu',
      description: "Explorer de nouvelles méthodologies, approches et techniques est une source constante d'enrichissement. L'apprentissage permanent permet de rester pertinent et innovant dans un domaine en constante évolution."
    }
  ];

  // Philosophy Pillars 
  philosophyPillars: PhilosophyPillar[] = [
    {
      title: 'Qualité Avant Vitesse',
      description: "Un code bien écrit aujourd'hui évite des heures de débogage demain. Je privilégie les solutions robustes et maintenables plutôt que les raccourcis rapides qui créent de la dette technique."
    },
    {
      title: 'Utilisateur Au Centre',
      description: "Chaque décision technique doit servir l'expérience utilisateur. Performance, accessibilité et intuitivité ne sont pas des options, ce sont des exigences fondamentales pour tout projet web."
    },
    {
      title: 'Amélioration Continue',
      description: "Il n'y a pas de perfection, seulement des itérations. Chaque projet est une opportunité d'apprendre, d'améliorer mes pratiques et de repousser mes limites techniques."
    }
  ];

  // Timeline Items (Professional Journey)
  timelineItems: TimelineItem[] = [
    {
      type: 'experience',
      date: 'Juillet 2025 - Présent',
      title: 'Développeur Full Stack',
      organization: 'VenaLabs',
      logo: 'assets/logos/venalabs.png',
      description: "Développement et maintenance d'une plateforme Web3 dédiée à l'apprentissage et à l'optimisation des airdrops crypto.",
      tags: ['Java', 'Spring Boot', 'Next.js', 'React','TypeScript', 'Tailwind CSS', 'NoSql', 'Docker'],
      details: {
        responsibility: 'Développeur Full Stack',
        status: 'Alternant',
        missions: [
          "Développement d'interfaces utilisateur modernes et réactives avec React et Next.js",
          "Conception et implémentation d'APIs RESTful robustes avec Java/Spring Boot",
          "Mise en place de parcours pédagogiques interactifs pour l'apprentissage Web3",
          "Optimisation des performances front-end et back-end",
          "Participation aux décisions d'architecture technique",
          "Déploiement et maintenance des applications avec Docker"
        ],
        relatedProjects: [{ id: 'venalabs', name: 'VenaLabs Platform' }],
        relatedSkills: [
          { id: 'spring-boot', name: 'Spring Boot' },
          { id: 'react-nextjs', name: 'React / Next.js' },
          { id: 'collaboration-agile', name: 'Collaboration agile' },
          { id: 'autonomie-resolution', name: 'Autonomie' }
        ]
      }
    },
    {
      type: 'experience',
      date: '2022 - 2025',
      title: 'Développeur Web',
      organization: 'MacWay',
      logo: 'assets/logos/macway.png',
      description: "Développement et maintenance d'un site e-commerce à fort trafic spécialisé dans les produits Apple et high-tech.",
      tags: ['Symfony', 'PHP', 'HTML/Twig', 'SCSS', 'jQuery', 'MySQL', 'Google Ads'],
      details: {
        responsibility: 'Développeur Web Full Stack',
        status: 'Alternant',
        missions: [
          "Développement de fonctionnalités front-end et back-end avec Symfony",
          "Refonte complète des pages produit pour améliorer l'UX",
          "Optimisation des performances web et du référencement SEO",
          "Intégration de flux externes (Google Ads, comparateurs de prix)",
          "Automatisation de tâches répétitives pour gagner en productivité",
          "Maintenance corrective et évolutive du site e-commerce",
          "Gestion de base de données MySQL complexe",
          "Contribution au projet jusqu'à la fermeture de l'entreprise en 2025"
        ],
        relatedProjects: [{ id: 'macway', name: 'MacWay E-commerce' }],
        relatedSkills: [
          { id: 'symfony', name: 'Symfony' },
          { id: 'vision-produit', name: 'Vision produit' },
          { id: 'autonomie-resolution', name: 'Autonomie & Résolution de problèmes' },
          { id: 'collaboration-agile', name: 'Collaboration agile' }
        ]
      }
    },
    {
      type: 'certification',
      date: '2022 - 2023',
      title: "Concepteur Développeur d'Applications (CDA)",
      organization: 'ISCOD - Niveau 6 (Bac+3/4)',
      description: "Titre professionnel reconnu par le Ministère du Travail, équivalent Bac+3/4.",
      details: {
        missions: [
          "Analyse des besoins et modélisation de solutions logicielles",
          "Conception d'architectures applicatives évolutives",
          "Développement d'applications web et mobile",
          "Gestion de bases de données relationnelles et NoSQL",
          "Mise en place de tests unitaires et d'intégration",
          "Intégration de pratiques DevOps et déploiement continu",
          "Sécurisation des applications"
        ]
      }
    },
    {
      type: 'experience',
      date: 'Janvier 2022 - Février 2022',
      title: 'Développeur Web',
      organization: 'La Perle Bleue',
      description: "Développement d'un site vitrine pour restaurant avec système de réservation en ligne.",
      tags: ['PHP', 'JavaScript', 'HTML', 'CSS'],
      details: {
        responsibility: 'Développeur Web',
        status: 'Stagiaire (2 mois)',
        missions: [
          "Création d'un site vitrine responsive pour restaurant",
          "Développement d'un module de réservation en ligne",
          "Conception d'un back-office de gestion des menus",
          "Mise en place d'un système de gestion du planning",
          "Intégration responsive en HTML, CSS et JavaScript",
          "Développement back-end en PHP natif"
        ],
        relatedSkills: [
          { id: 'symfony', name: 'Symfony' }
        ]
      }
    },
    {
      type: 'certification',
      date: '2021 - 2022',
      title: 'Développeur Web & Web Mobile',
      organization: 'Élan Formation - Niveau 5 (Bac+2)',
      description: "Titre professionnel axé sur la conception et le développement d'applications web.",
      details: {
        missions: [
          "Développement front-end (HTML, CSS, JavaScript)",
          "Développement back-end (PHP, bases de données)",
          "Conception et consommation d'API REST",
          "Intégration responsive et mobile-first",
          "Gestion de bases de données relationnelles",
          "Méthodes agiles et gestion de projet",
          "Déploiement et maintenance d'applications web"
        ]
      }
    },
    {
      type: 'education',
      date: '2020 - 2021',
      title: 'DUT Informatique',
      organization: 'IUT Robert Schuman',
      description: "Acquisition des fondamentaux de l'informatique à l'Université de Strasbourg.",
      details: {
        institutionDescription: "L'IUT Robert Schuman, rattaché à l'Université de Strasbourg, est un établissement reconnu pour la qualité de sa formation en informatique, alliant théorie et pratique à travers des projets concrets.",
        pedagogyVision: "Une pédagogie équilibrée entre cours magistraux et travaux pratiques, favorisant l'apprentissage par la pratique avec de nombreux mini-projets. L'accent est mis sur les fondamentaux solides de l'informatique, essentiels pour toute carrière de développeur.",
        missions: [
          "Algorithmique et structures de données",
          "Programmation orientée objet (Java, C++)",
          "Bases de données relationnelles et SQL",
          "Développement web (HTML, CSS, JavaScript, PHP)",
          "Réseaux et systèmes d'exploitation",
          "Gestion de projet et méthodologies agiles",
          "Mini-projets pratiques encadrés"
        ],
        websiteUrl: "https://iutrs.unistra.fr"
      }
    },
    {
      type: 'education',
      date: '2016 - 2019',
      title: 'Bac S - Spécialité ISN',
      organization: 'Lycée Pasteur',
      description: "Baccalauréat Scientifique avec spécialité Informatique et Sciences du Numérique.",
      details: {
        pedagogyVision: "La spécialité ISN (Informatique et Sciences du Numérique) m'a offert une première approche concrète de la programmation et du développement web. C'est durant cette période que ma passion pour le code s'est révélée, à travers la création de mini-projets et la découverte du potentiel créatif de l'informatique.",
        missions: [
          "Initiation à la programmation (Python, JavaScript)",
          "Développement web (HTML, CSS, JavaScript)",
          "Création de mini-projets informatiques",
          "Algorithmique de base",
          "Découverte des sciences du numérique"
        ]
      }
    }
  ];

  iconName(t: ItemType): string {
    switch (t) {
      case 'experience':
        return 'briefcase';
      case 'education':
        return 'graduation-cap';
      case 'certification':
        return 'award';
      default:
        return 'circle';
    }
  }

  typeLabel(t: ItemType): string {
    switch (t) {
      case 'experience':
        return 'Expérience';
      case 'education':
        return 'Formation';
      case 'certification':
        return 'Certification';
      default:
        return '';
    }
  }

  // Liste des compétences qui ont une page dédiée
  private availableSkills = [
    'symfony', 'angular', 'react-nextjs', 'nextjs', 'spring-boot', 'docker',
    'optimisation-ux', 'collaboration-agile', 'autonomie-resolution', 'vision-produit'
  ];

  // Convertit le nom d'une technologie en ID de skill
  getSkillId(techName: string): string | null {
    const mapping: Record<string, string> = {
      'Java': 'spring-boot',
      'Spring Boot': 'spring-boot',
      'Next.js': 'react-nextjs',
      'React': 'react-nextjs',
      'TypeScript': 'angular',
      'Tailwind CSS': 'angular',
      'Docker': 'docker',
      'Symfony': 'symfony',
      'PHP': 'symfony',
      'MySQL': 'symfony',
      'Python': 'autonomie-resolution',
      'PostgreSQL': 'spring-boot',
      'NoSql': 'spring-boot',
      'MongoDB': 'spring-boot'
    };

    const skillId = mapping[techName];
    if (skillId && this.availableSkills.includes(skillId)) {
      return skillId;
    }
    return null;
  }

  // Vérifie si une compétence technique a une page dédiée
  hasSkillPage(techName: string): boolean {
    return this.getSkillId(techName) !== null;
  }
}
