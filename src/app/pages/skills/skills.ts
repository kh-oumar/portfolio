import { Component, computed, signal } from '@angular/core';
import { SkillCardComponent, Skill } from '../../shared/skill-card/skill-card';


type SkillCategory = 'all' | 'tech' | 'human';

@Component({
  selector: 'app-skills',
  imports: [SkillCardComponent],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent  {
  filter = signal<SkillCategory>('all');

  // Ordre d'affichage défini manuellement (techniques puis humaines).
  skills = signal<Skill[]>([
    // COMPÉTENCES TECHNIQUES (6)
    { id: 'symfony',              name: 'Symfony',                                 category: 'tech',  level: 8, logo: 'assets/logos/symfony.png',     summary: "Mon framework PHP principal depuis 3 ans, du legacy e-commerce à l'API REST." },
    { id: 'angular',              name: 'Angular',                                 category: 'tech',  level: 7, logo: 'assets/logos/angular.png',     summary: "Le framework TypeScript que je préfère pour les apps structurées. Signals, standalone." },
    { id: 'spring-boot',          name: 'Spring Boot',                             category: 'tech',  level: 7, logo: 'assets/logos/spring-boot.png', summary: "Le backend Java que j'utilise au quotidien chez VenaLabs. APIs sécurisées, JPA." },
    { id: 'nextjs',               name: 'Next.js',                                 category: 'tech',  level: 6, logo: 'assets/logos/nextjs.png',      summary: "Mon réflexe pour un frontend rapide, indexable et bien typé. App Router, RSC, SEO." },
    { id: 'react-nextjs',         name: 'React',                                   category: 'tech',  level: 6, logo: 'assets/logos/react.png',       summary: "Ma librairie frontend hors Angular. Composants, hooks, intégrations Web3." },
    { id: 'docker',               name: 'Docker',                                  category: 'tech',  level: 6, logo: 'assets/logos/docker.png',      summary: "Le même environnement en dev et en prod. Mis en place seul sur FollowDeen, encore à approfondir." },

    // COMPÉTENCES HUMAINES (4)
    { id: 'collaboration-agile',  name: 'Méthode agile Scrum',  category: 'human', level: 8, logo: 'assets/logos/agile.png',          summary: "L'agile au quotidien, de la startup à l'équipe structurée." },
    { id: 'optimisation-ux',      name: 'UX & Performance',     category: 'human', level: 9, logo: 'assets/logos/ux-ui.png',          summary: "UX et performance traitées ensemble, du design aux Core Web Vitals." },
    { id: 'autonomie-resolution', name: 'Autonomie',            category: 'human', level: 9, logo: 'assets/logos/autonomie.png',      summary: "Des projets menés seul de A à Z et des bugs critiques résolus sans supervision." },
    { id: 'vision-produit',       name: 'Esprit produit',       category: 'human', level: 7, logo: 'assets/logos/product-design.png', summary: "Comprendre pourquoi je code. Marges, conversions, positionnement, arbitrages MVP." },
  ]);

  total = computed(() => this.skills().length);
  techCount = computed(() => this.skills().filter(s => s.category === 'tech').length);
  humanCount = computed(() => this.skills().filter(s => s.category === 'human').length);

  // On conserve l'ordre d'affichage défini dans le tableau ci-dessus
  // (techniques puis humaines). La note sur 10 reste visible sur chaque
  // carte pour situer le niveau de chaque compétence par rapport aux autres.
  filtered = computed(() => {
    const f = this.filter();
    return this.skills().filter(s => f === 'all' || s.category === f);
  });

  setFilter(f: SkillCategory) { this.filter.set(f); }
}
