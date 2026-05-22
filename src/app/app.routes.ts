import { Routes } from '@angular/router';
import { AuthPageComponent } from './features/auth/auth-page/auth-page.component';
import { ProfilePageComponent } from './features/profile/profile-page/profile-page.component';
import { CoursesPageComponent } from './features/courses/courses-page/courses-page.component';

export const routes: Routes = [
    { path: '', component: AuthPageComponent },
    { path: 'courses', component: CoursesPageComponent },
    { path: 'profile', component: ProfilePageComponent },
  // Redirection par défaut vers accueil
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
