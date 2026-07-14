import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Actividad {
  actividadId: number;
  nombre: string;
  tipo: string;
  nivel: string;
  estado: string;
  fecha: string;
  responsableUsuarioId?: number | null;
  responsableNombre?: string | null;
}

export interface ActividadCreate {
  nombre: string;
  tipo: string;
  nivel: string;
  fecha: string;
  responsableUsuarioId?: number | null;
}

export interface ActividadUpdate {
  nombre?: string;
  tipo?: string;
  nivel?: string;
  estado?: string;
  fecha?: string;
  responsableUsuarioId?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private readonly apiUrl = `${environment.apiUrl}/Actividad`;

  constructor(private http: HttpClient) {}

  obtenerActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.apiUrl);
  }

  crearActividad(actividad: ActividadCreate): Observable<Actividad> {
    return this.http.post<Actividad>(this.apiUrl, actividad);
  }

  actualizarActividad(id: number, actividad: ActividadUpdate): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, actividad);
  }

  eliminarActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
