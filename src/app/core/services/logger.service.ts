import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Production-ready logging service
 * In production, logs can be sent to a remote logging service
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private get isProduction(): boolean {
    return environment.production;
  }

  /**
   * Log informational messages
   */
  info(message: string, ...args: unknown[]): void {
    if (!this.isProduction) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  /**
   * Log warning messages
   */
  warn(message: string, ...args: unknown[]): void {
    if (!this.isProduction) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  /**
   * Log error messages
   * In production, this could send errors to a monitoring service (Sentry, LogRocket, etc.)
   */
  error(message: string, error?: unknown): void {
    if (this.isProduction) {
      // In production, send to monitoring service
      // Example: Sentry.captureException(error);
      // For now, we silently fail in production to avoid console pollution
      this.sendToMonitoringService(message, error);
    } else {
      console.error(`[ERROR] ${message}`, error);
    }
  }

  /**
   * Log debug messages (only in development)
   */
  debug(message: string, ...args: unknown[]): void {
    if (!this.isProduction) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Send errors to remote monitoring service
   * This is a placeholder - implement with your monitoring service
   */
  private sendToMonitoringService(message: string, error: unknown): void {
    // TODO: Integrate with monitoring service like Sentry, LogRocket, etc.
    // Example:
    // Sentry.captureException(error, { extra: { message } });
  }
}
