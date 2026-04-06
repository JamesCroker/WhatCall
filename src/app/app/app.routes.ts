import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home';

export const routes: Routes = [
  {
    'path': 'scenario/:id',
    loadComponent: () => import('../scenario/scenario').then(m =>
      m.ScenarioComponent)
  },
  {
    'path': 'scenario',
    loadComponent: () => import('../scenario/scenario').then(m =>
      m.ScenarioComponent)
  },
  {
    'path': 'auth',
    loadComponent: () => import('../auth-screen/auth-screen').then(m => m.AuthScreenComponent)
  },
  { path: '**', component: HomeComponent },
];



