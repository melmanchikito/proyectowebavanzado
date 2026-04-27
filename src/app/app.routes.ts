import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { AprendizajeComponent } from './pages/aprendizaje/aprendizaje';
import { JuegosComponent } from './pages/juegos/juegos';
import { ProgresoComponent } from './pages/progreso/progreso';
import { AdminComponent } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'aprendizaje', component: AprendizajeComponent },
  { path: 'juegos', component: JuegosComponent },
  { path: 'progreso', component: ProgresoComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];