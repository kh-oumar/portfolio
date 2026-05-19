import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  // Technologies principales (liens vers les pages compétences)
  mainTechnologies = [
    { id: 'symfony', name: 'Symfony', logo: 'assets/logos/symfony.png' },
    { id: 'angular', name: 'Angular', logo: 'assets/logos/angular.png' },
    { id: 'react-nextjs', name: 'React', logo: 'assets/logos/react.png' },
    { id: 'spring-boot', name: 'Spring Boot', logo: 'assets/logos/spring-boot.png' },
    { id: 'nextjs', name: 'Next.js', logo: 'assets/logos/nextjs.png' },
    { id: 'docker', name: 'Docker', logo: 'assets/logos/docker.png' },
  ];

  // Projets en vedette
  featuredProjects = [
    {
      id: 'venalabs',
      title: 'VenaLabs',
      description: 'Plateforme d\'apprentissage Web3 et optimisation d\'airdrops crypto',
      tags: ['Java', 'Spring Boot', 'Next.js', 'React', 'MongoDB'],
      logo: 'assets/logos/venalabs.png'
    },
    {
      id: 'macway',
      title: 'MacWay',
      description: 'Site e-commerce spécialisé Apple & high-tech avec gestion complète',
      tags: ['Symfony', 'PHP', 'MySQL', 'SCSS'],
      logo: 'assets/logos/macway.png'
    },
    {
      id: 'wedriv',
      title: 'WeDriv',
      description: 'Plateforme de réservation de chauffeurs VTC en ligne',
      tags: ['Symfony', 'PHP', 'React', 'Google Maps API'],
      logo: 'assets/logos/wedriv.png'
    }
  ];

  // Statistiques
  stats = [
    { value: '10', label: 'Compétences', icon: 'target' },
    { value: '5', label: 'Projets réalisés', icon: 'briefcase' },
    { value: '3+', label: 'Ans d\'expérience', icon: 'calendar' }
  ];
}
