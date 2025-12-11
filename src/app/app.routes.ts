import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ContactComponent } from './views/contact/contact.component';
import { ServicesComponent } from './views/services/services.component';
import { AboutComponent } from './views/about/about.component';
import { LegalComponent } from './views/legal/legal.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'mentions-legales', component: LegalComponent },
];
