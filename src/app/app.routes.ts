import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { AprendizajeComponent } from './pages/aprendizaje/aprendizaje';
import { JuegosComponent } from './pages/juegos/juegos';
import { ProgresoComponent } from './pages/progreso/progreso';
import { AdminComponent } from './pages/admin/admin';
import { authGuard } from './core/auth.guard';
import { roleGuard } from './core/role.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } },
  { path: 'aprendizaje', component: AprendizajeComponent, canActivate: [authGuard] },
  { path: 'juegos', component: JuegosComponent, canActivate: [authGuard] },
  { path: 'progreso', component: ProgresoComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [roleGuard], data: { roles: ['Admin'] } },
  { path: '**', redirectTo: '' }
];
