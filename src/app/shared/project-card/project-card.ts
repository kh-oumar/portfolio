import { Component, Input, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

const MAX_VISIBLE_TAGS = 5;

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss'
})
export class ProjectCardComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) set tags(value: string[]) { this._tags.set(value ?? []); }
  @Input({ required: true }) year!: string;
  @Input() logo?: string;

  private _tags = signal<string[]>([]);

  visibleTags = computed(() => this._tags().slice(0, MAX_VISIBLE_TAGS));
  hiddenTagCount = computed(() => Math.max(0, this._tags().length - MAX_VISIBLE_TAGS));
  hiddenTagsTitle = computed(() => this._tags().slice(MAX_VISIBLE_TAGS).join(', '));
}
