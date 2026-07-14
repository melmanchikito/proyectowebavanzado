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
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/Auth`;
  private readonly storageKey = 'sesionAprendeJugando';

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
  }

  logout(): void {
    this.usuarioLogueado = '';
    this.rolActual = '';
    this.usuarioId = null;
    this.estaLogueado.set(false);
    localStorage.removeItem(this.storageKey);
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
