<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  usuarioId: number;
  usuarioNombre: string;
  rolNombre: string;
  expiraEn: string;
=======
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
  usuarioNombre: string;
  rolNombre: string;
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/Auth`;
  private readonly storageKey = 'sesionAprendeJugando';

<<<<<<< HEAD
  public usuarioLogueado = '';
  public rolActual = '';
  public usuarioId: number | null = null;
  public estaLogueado = signal(false);

  constructor(private http: HttpClient) {
    this.restaurarSesion();
  }

  get token(): string | null {
    return this.sesion?.token ?? null;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => this.guardarSesion(response))
    );
=======
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
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
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
<<<<<<< HEAD
    this.rolActual = '';
    this.usuarioId = null;
    this.estaLogueado.set(false);
    localStorage.removeItem(this.storageKey);
=======
    this.rolLogueado = '';
    this.token = '';
    this.estaLogueado.set(false);
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
  }

  isAuthenticated(): boolean {
    const sesion = this.sesion;
    if (!sesion) {
      return false;
    }

    if (new Date(sesion.expiraEn).getTime() <= Date.now()) {
      this.logout();
      return false;
    }

    return true;
  }

  private get sesion(): AuthResponse | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AuthResponse;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }

  private guardarSesion(response: AuthResponse): void {
    localStorage.setItem(this.storageKey, JSON.stringify(response));
    this.usuarioLogueado = response.usuarioNombre;
    this.rolActual = response.rolNombre;
    this.usuarioId = response.usuarioId;
    this.estaLogueado.set(true);
  }

  private restaurarSesion(): void {
    const sesion = this.sesion;
    if (!sesion) {
      return;
    }

    this.usuarioLogueado = sesion.usuarioNombre;
    this.rolActual = sesion.rolNombre;
    this.usuarioId = sesion.usuarioId;
    this.estaLogueado.set(this.isAuthenticated());
  }
}
