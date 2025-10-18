import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { EventListComponent } from './components/event-list.component';
import { EventFormComponent } from './components/event-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/new', component: EventFormComponent },
  { path: 'events/edit/:id', component: EventFormComponent },
  { path: '**', redirectTo: '' }
];