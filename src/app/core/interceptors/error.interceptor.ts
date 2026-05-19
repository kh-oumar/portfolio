import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggerService } from '../services/logger.service';

/**
 * Global HTTP error interceptor
 * Logs all HTTP errors and provides consistent error handling
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(LoggerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Network error: ${error.error.message}`;
      } else {
        // Backend returned an unsuccessful response code
        errorMessage = `Server error: ${error.status} - ${error.message}`;

        // Log additional details from backend error response
        if (error.error?.message) {
          errorMessage += ` | ${error.error.message}`;
        }
      }

      // Log the error
      logger.error(errorMessage, {
        url: req.url,
        method: req.method,
        status: error.status,
        statusText: error.statusText,
        error: error.error
      });

      // Re-throw the error so components can handle it
      return throwError(() => error);
    })
  );
};
