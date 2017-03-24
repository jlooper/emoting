import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RainComponent } from './rain/rain.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rain', component: RainComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
