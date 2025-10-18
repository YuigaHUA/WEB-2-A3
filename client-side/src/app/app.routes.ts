import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list.component';
import { EventDetailComponent } from './components/event-detail.component';
import { RegistrationComponent } from './components/registration.component';

export const routes: Routes = [
  { path: '', component: EventListComponent, pathMatch: 'full' },
  { path: 'events', component: EventListComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'register/:eventId', component: RegistrationComponent },
  { path: '**', redirectTo: '' }
];