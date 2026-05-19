import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

type Variant = 'default' | 'tech' | 'human' | 'outline';

@Component({
  selector: 'app-badge-chip',
  standalone: true,
  imports: [NgClass],
  template: `
    <span
      class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors"
      [ngClass]="cls"
    >
      <ng-content></ng-content>
    </span>
  `,
  styleUrl: './badge-chip.scss'
})
export class BadgeChipComponent  {
  @Input() variant: Variant = 'default';

  get cls() {
    switch (this.variant) {
      case 'tech': return 'bg-accent/10 text-accent border-accent/20';
      case 'human': return 'bg-secondary text-secondary-foreground border-border';
      case 'outline': return 'bg-transparent text-foreground border-border';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  }
}
