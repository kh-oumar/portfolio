import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { SkillsComponent } from './pages/skills/skills';
import { SkillDetailComponent } from './pages/skill-detail/skill-detail';
import { ProjectsComponent } from './pages/projects/projects';
import { ProjectDetailComponent } from './pages/project-detail/project-detail';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Accueil' },
    { path: 'about', component: AboutComponent, title: 'À Propos' },
    { path: 'skills', component: SkillsComponent, title: 'Compétences' },
    { path: 'skills/:id', component: SkillDetailComponent, title: 'Compétence' },
    { path: 'projects', component: ProjectsComponent, title: 'Réalisations' },
    { path: 'projects/:id', component: ProjectDetailComponent, title: 'Réalisation' },
    { path: 'contact', component: ContactComponent, title: 'Contact' },
];
