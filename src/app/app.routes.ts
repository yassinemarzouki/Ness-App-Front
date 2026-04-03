import { Routes } from '@angular/router';
import { AuthPageComponent } from './features/auth/auth-page/auth-page.component';
import { ProfilePageComponent } from './features/profile/profile-page/profile-page.component';

export const routes: Routes = [
    { path: 'auth', component: AuthPageComponent },
    { path: 'profile', component: ProfilePageComponent },
  // Redirection par défaut vers auth ou home
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];
