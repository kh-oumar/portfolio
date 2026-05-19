import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, MenuIcon, XIcon } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './app-header.html'
})
export class AppHeaderComponent {
  mobileOpen = false;

  readonly Menu = MenuIcon;
  readonly X = XIcon;

  nav = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/about' },
    { name: 'Réalisations', href: '/projects' },
    { name: 'Compétences', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];
}
