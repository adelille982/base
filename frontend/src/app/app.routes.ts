import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guards/auth.guard'; // 🔁 adapte selon l'emplacement du guard

export const routes: Routes = [
  { path: 'connexion', component: LoginComponent },
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: '**', redirectTo: 'connexion' }
];
