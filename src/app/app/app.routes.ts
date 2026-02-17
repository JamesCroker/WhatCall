import { Routes } from '@angular/router';
import { App } from './app';
import { HomeComponent } from '../home/home';
import { ScenarioComponent } from '../scenario/scenario';

export const routes: Routes = [
  {
    'path': 'scenario/:id',
    'component': ScenarioComponent 
  },
  { path: '**', component: HomeComponent },
];



