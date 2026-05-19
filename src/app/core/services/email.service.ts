import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

/**
 * Service pour envoyer des emails via EmailJS
 * EmailJS permet d'envoyer des emails directement depuis le frontend
 * sans avoir besoin d'un backend
 */
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  /**
   * Initialise EmailJS avec la clé publique
   */
  constructor() {
    if (environment.emailjs.publicKey) {
      emailjs.init(environment.emailjs.publicKey);
    }
  }

  /**
   * Envoie un email de contact via EmailJS
   *
   * @param data Données du formulaire de contact
   * @returns Promise qui se résout quand l'email est envoyé
   */
  async sendContactEmail(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    try {
      // Préparer les paramètres du template EmailJS
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject || 'Nouveau message de contact',
        message: data.message,
        to_name: 'Portfolio', // Votre nom
        reply_to: data.email
      };

      // Envoyer l'email via EmailJS
      const response = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams
      );

      if (response.status !== 200) {
        throw new Error('Échec de l\'envoi de l\'email');
      }
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      throw new Error('Impossible d\'envoyer le message. Veuillez réessayer.');
    }
  }
}
