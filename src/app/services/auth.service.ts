import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuarioValido: string = 'admin';
  public claveValida: string = '12345';

  public usuarioLogueado: string = '';
  public estaLogueado = signal(false);

  constructor() {
    // Al iniciar el servicio, restaurar sesión desde localStorage
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      this.usuarioLogueado = usuarioGuardado;
      this.estaLogueado.set(true);
    }
  }

  login(usuario: string, clave: string): boolean {
    if (usuario === this.usuarioValido && clave === this.claveValida) {
      this.usuarioLogueado = usuario;
      this.estaLogueado.set(true);
      localStorage.setItem('usuarioLogueado', usuario); // Persistir
      return true;
    }

    this.usuarioLogueado = '';
    this.estaLogueado.set(false);
    localStorage.removeItem('usuarioLogueado');
    return false;
  }

  logout(): void {
    this.usuarioLogueado = '';
    this.estaLogueado.set(false);
    localStorage.removeItem('usuarioLogueado'); // Limpiar al salir
  }
}