import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UsuarioApi {
    usuarioId: number;
    nombre: string;
    email: string;
    rolId: number;
    rolNombre: string;
    estado: string;
}

export interface RolApi {
    rolId: number;
    nombre: string;
    descripcion: string;
    estado: string;
}

export interface UsuarioPayload {
    nombre: string;
    email: string;
    rolId: number;
    password?: string;
    estado: string;
}

export interface UsuarioCreatePayload {
    nombre: string;
    email: string;
    rolId: number;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class UsuarioApiService {

    private readonly usuariosUrl = `${environment.apiBaseUrl}${environment.apiUsuarioPath}`;
    private readonly rolesUrl = `${environment.apiBaseUrl}${environment.apiRolPath}`;

    constructor(private http: HttpClient) { }

    getUsuarios(): Promise<UsuarioApi[]> {
        return firstValueFrom(this.http.get<UsuarioApi[]>(this.usuariosUrl));
    }

    getRoles(): Promise<RolApi[]> {
        return firstValueFrom(this.http.get<RolApi[]>(this.rolesUrl));
    }

    createUsuario(payload: UsuarioCreatePayload): Promise<UsuarioApi> {
        return firstValueFrom(this.http.post<UsuarioApi>(this.usuariosUrl, payload));
    }

    updateUsuario(usuarioId: number, patch: Partial<UsuarioPayload>): Promise<UsuarioApi> {
        return firstValueFrom(this.http.patch<UsuarioApi>(`${this.usuariosUrl}/${usuarioId}`, patch));
    }

    deleteUsuario(usuarioId: number): Promise<void> {
        return firstValueFrom(this.http.delete<void>(`${this.usuariosUrl}/${usuarioId}`));
    }

    isHttpError(error: unknown): error is HttpErrorResponse {
        return error instanceof HttpErrorResponse;
    }
}