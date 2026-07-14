import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
  usuarioNombre: string;
  rolNombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiLoginUrl = `${environment.apiBaseUrl}${environment.apiAuthLoginPath}`;
  private readonly storageKeys = {
    token: 'authToken',
    usuarioNombre: 'authUsuarioNombre',
    rolNombre: 'authRolNombre',
    email: 'authEmail'
  } as const;

  public usuarioLogueado: string = '';
  public rolLogueado: string = '';
  public token = '';
  public estaLogueado = signal(false);

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(this.apiLoginUrl, { email, password })
      );

      this.setSession(email, response);
      return true;
    } catch (error) {
      this.clearSession();

      if (error instanceof HttpErrorResponse) {
        throw new Error(error.error?.message ?? 'No fue posible iniciar sesión con la API.');
      }

      throw new Error('No fue posible iniciar sesión.');
    }
  }

  logout(): void {
    this.clearSession();
  }

  private restoreSession(): void {
    const token = localStorage.getItem(this.storageKeys.token);
    const usuarioNombre = localStorage.getItem(this.storageKeys.usuarioNombre);
    const rolNombre = localStorage.getItem(this.storageKeys.rolNombre);

    if (!token || !usuarioNombre) {
      this.clearState();
      return;
    }

    this.token = token;
    this.usuarioLogueado = usuarioNombre;
    this.rolLogueado = rolNombre ?? '';
    this.estaLogueado.set(true);
  }

  private setSession(email: string, response: LoginResponse): void {
    this.token = response.token;
    this.usuarioLogueado = response.usuarioNombre;
    this.rolLogueado = response.rolNombre;
    this.estaLogueado.set(true);

    localStorage.setItem(this.storageKeys.token, response.token);
    localStorage.setItem(this.storageKeys.usuarioNombre, response.usuarioNombre);
    localStorage.setItem(this.storageKeys.rolNombre, response.rolNombre);
    localStorage.setItem(this.storageKeys.email, email);
  }

  private clearSession(): void {
    this.clearState();
    localStorage.removeItem(this.storageKeys.token);
    localStorage.removeItem(this.storageKeys.usuarioNombre);
    localStorage.removeItem(this.storageKeys.rolNombre);
    localStorage.removeItem(this.storageKeys.email);
  }

  private clearState(): void {
    this.usuarioLogueado = '';
    this.rolLogueado = '';
    this.token = '';
    this.estaLogueado.set(false);
  }
}