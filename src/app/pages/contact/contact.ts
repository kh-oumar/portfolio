import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { LoggerService } from '../../core/services/logger.service';
import { EmailService } from '../../core/services/email.service';

// Validateur personnalisé pour vérifier les espaces vides
function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null; // Si vide, laissez 'required' gérer
  }
  const isWhitespace = value.trim().length === 0;
  return isWhitespace ? { whitespace: true } : null;
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private logger = inject(LoggerService);
  private emailService = inject(EmailService);

  pending = signal(false);
  success = signal<string | null>(null);
  error = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, noWhitespaceValidator, Validators.minLength(5)]],
    email: ['', [Validators.required, noWhitespaceValidator, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, noWhitespaceValidator, Validators.minLength(5)]],
  });

  async submit() {
    this.success.set(null);
    this.error.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Veuillez corriger les champs requis.');
      return;
    }

    this.pending.set(true);

    try {
      // Récupérer et nettoyer les valeurs (trim)
      const formData = this.form.getRawValue();
      const cleanedData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      };

      // Envoyer l'email via EmailJS
      await this.emailService.sendContactEmail(cleanedData);

      this.success.set("Message envoyé ! Merci, je vous répondrai rapidement.");
      this.form.reset({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      this.logger.error('Failed to send contact form via EmailJS', err);
      this.error.set("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      this.pending.set(false);
    }
  }

  hasError(ctrl: string, type: string) {
    const c = this.form.controls[ctrl as keyof typeof this.form.controls];
    return c.touched && c.hasError(type);
  }
}
