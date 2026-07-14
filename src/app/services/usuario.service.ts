import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Usuario {
  usuarioId: number;
  nombre: string;
  email: string;
  rolId: number;
  rolNombre: string;
  estado: string;
  fechaRegistro: string;
}

export interface UsuarioCreate {
  nombre: string;
  email: string;
  password: string;
  rolId: number;
}

export interface UsuarioUpdate {
  nombre?: string;
  email?: string;
  password?: string;
  rolId?: number;
  estado?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiUrl = `${environment.apiUrl}/Usuario`;

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  crearUsuario(usuario: UsuarioCreate): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  actualizarUsuario(id: number, usuario: UsuarioUpdate): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
