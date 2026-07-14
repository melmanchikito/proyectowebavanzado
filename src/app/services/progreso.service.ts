import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProgresoCategoria {
  categoria: string;
  avance: number;
}

export interface ProgresoEstudiante {
  nombre: string;
  avance: number;
  nivel: string;
}

export interface ProgresoResumen {
  usuariosRegistrados: number;
  actividadesRealizadas: number;
  promedioGeneral: number;
  nivelesCompletados: number;
  categorias: ProgresoCategoria[];
  estudiantes: ProgresoEstudiante[];
}

@Injectable({
  providedIn: 'root'
})
export class ProgresoService {
  private readonly apiUrl = `${environment.apiUrl}/Progreso`;

  constructor(private http: HttpClient) {}

  obtenerResumen(): Observable<ProgresoResumen> {
    return this.http.get<ProgresoResumen>(`${this.apiUrl}/resumen`);
  }
}
