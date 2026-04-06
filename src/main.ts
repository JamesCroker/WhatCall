import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app/app.config';
import { App } from './app/app/app';
import 'zone.js';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
