import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './app-footer.html'
})
export class AppFooterComponent {
  year = new Date().getFullYear();
}