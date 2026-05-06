import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Charger les données d'authentification depuis localStorage si disponibles
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  /**
   * Accepte n'importe quelle combinaison email/mot de passe pour les tests
   */
  login(credentials: AuthCredentials): Observable<AuthUser> {
    return new Observable(observer => {
      // Simuler un délai de requête
      setTimeout(() => {
        const user: AuthUser = {
          email: credentials.email,
          token: `token_${Date.now()}`
        };
        
        // Sauvegarder l'utilisateur
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        observer.next(user);
        observer.complete();
      }, 500);
    });
  }

  /**
   * Récupérer l'utilisateur actuellement connecté
   */
  getCurrentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /**
   * Déconnecter l'utilisateur
   */
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth']);
  }
}
