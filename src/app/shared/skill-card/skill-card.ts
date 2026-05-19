import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';


export interface Skill {
  id: string;
  name: string;
  category: 'tech' | 'human';
  level: number;
  summary: string;
  logo?: string;
  icon?: string;
}

@Component({
  selector: 'app-skill-card',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.scss'
})
export class SkillCardComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) category!: 'tech' | 'human';
  @Input({ required: true }) level!: number;
  @Input({ required: true }) summary!: string;
  @Input() logo?: string;
  @Input() icon?: string;

  get isHuman(): boolean {
    return this.category === 'human';
  }

  get categoryLabel(): string {
    return this.isHuman ? 'Humaine' : 'Technique';
  }
}
