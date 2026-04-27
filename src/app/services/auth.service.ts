import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuarioValido: string = 'admin';
  public claveValida: string = '12345';

  public usuarioLogueado: string = '';
  public estaLogueado: boolean = false;

  login(usuario: string, clave: string): boolean {
    if (usuario === this.usuarioValido && clave === this.claveValida) {
      this.usuarioLogueado = usuario;
      this.estaLogueado = true;
      return true;
    }

    this.usuarioLogueado = '';
    this.estaLogueado = false;
    return false;
  }

  logout(): void {
    this.usuarioLogueado = '';
    this.estaLogueado = false;
  }
}