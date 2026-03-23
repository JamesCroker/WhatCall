import { Routes } from '@angular/router';
import { App } from './app';
import { HomeComponent } from '../home/home';
import { ScenarioComponent } from '../scenario/scenario';
import { ScenarioUploadComponent } from '../scenario-upload/scenario-upload';

export const routes: Routes = [
  {
    'path': 'scenario/:id',
    'component': ScenarioComponent
  },
  {
    'path': 'scenario',
    'component': ScenarioComponent
  },
  {
    'path': 'scenario-upload/:id',
    'component': ScenarioUploadComponent
  },
  { path: '**', component: HomeComponent },
];



