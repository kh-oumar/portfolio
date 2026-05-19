import { Component } from '@angular/core';
import { ProjectCardComponent } from '../../shared/project-card/project-card';

type ProjectListItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  logo?: string;
};

@Component({
  selector: 'app-projects',
  imports: [ProjectCardComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent {
  get technologyCount(): number {
    const tags = new Set<string>();
    for (const project of this.projects) {
      for (const tag of project.tags) {
        tags.add(tag.toLowerCase());
      }
    }
    return tags.size;
  }

  projects: ProjectListItem[] = [
    {
      id: 'venalabs',
      title: 'VenaLabs - Crypto Learning',
      description: "Plateforme d'apprentissage Web3 et optimisation d'airdrops crypto.",
      tags: ['Java', 'Spring Boot', 'Next.js', 'React','TypeScript', 'NoSql', 'Docker'],
      year: '2025-2026',
      logo: 'assets/logos/venalabs.png'
    },
    {
      id: 'macway',
      title: 'MacWay - Site E-commerce',
      description: "Site e-commerce spécialisé Apple & high-tech avec gestion complète.",
      tags: ['Symfony', 'PHP', 'Twig', 'MySQL', 'SCSS', 'Jquery'],
      year: '2022-2025',
      logo: 'assets/logos/macway.png'
    },
    {
      id: 'followdeen',
      title: 'FollowDeen - Marketplace de Cession',
      description: "Marketplace pour acheter et vendre des business en ligne (e-commerce, SaaS, apps) avec escrow Stripe réel.",
      tags: ['Java', 'Spring Boot', 'Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Stripe', 'Docker'],
      year: '2025-2026',
      logo: 'assets/logos/followdeen.svg'
    },
    {
      id: 'wedriv',
      title: 'WeDriv - Réservation VTC',
      description: "Plateforme de réservation de chauffeurs VTC en ligne.",
      tags: ['Symfony', 'PHP', 'React', 'MySql', 'Google Maps API'],
      year: '2025-2026',
      logo: 'assets/logos/wedriv.png'
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      description: "Mon portfolio personnel pour présenter mes projets et compétences.",
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'SCSS'],
      year: '2026',
      logo: 'assets/logos/portfolio.png'
    },
  ];
}
