import { Component, OnInit } from '@angular/core';
import { UsuarioApi, UsuarioApiService } from '../../services/usuario-api.service';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioApi[] = [];
  cargando = true;
  mensaje = '';
  tipoMensaje: 'success' | 'error' | '' = '';

  constructor(private usuarioApiService: UsuarioApiService) { }

  ngOnInit(): void {
    void this.cargarUsuarios();
  }

  async cargarUsuarios(): Promise<void> {
    this.cargando = true;
    this.mensaje = '';

    try {
      this.usuarios = await this.usuarioApiService.getUsuarios();
    } catch {
      this.usuarios = [];
      this.mensaje = 'No se pudieron cargar los usuarios desde la API.';
      this.tipoMensaje = 'error';
    } finally {
      this.cargando = false;
    }
  }

  get totalUsuarios(): number {
    return this.usuarios.length;
  }

  get padresRegistrados(): number {
    return this.usuarios.filter(usuario => this.normalizarRol(usuario.rolNombre) === 'padre').length;
  }

  get docentesRegistrados(): number {
    return this.usuarios.filter(usuario => this.normalizarRol(usuario.rolNombre) === 'docente').length;
  }

  get usuariosActivos(): number {
    return this.usuarios.filter(usuario => this.normalizarEstado(usuario.estado) === 'A').length;
  }

  getAvatar(usuario: UsuarioApi): string {
    const rol = this.normalizarRol(usuario.rolNombre);

    if (rol === 'padre') {
      return '👨';
    }

    if (rol === 'docente') {
      return '👩';
    }

    if (rol === 'admin') {
      return '🛡️';
    }

    return usuario.nombre?.charAt(0).toUpperCase() || '👤';
  }

  getRolClass(rolNombre: string): string {
    switch (this.normalizarRol(rolNombre)) {
      case 'padre':
        return 'badge badge--padre';
      case 'docente':
        return 'badge badge--docente';
      case 'admin':
        return 'badge badge--admin';
      default:
        return 'badge badge--generic';
    }
  }

  getEstadoClass(estado: string): string {
    switch (this.normalizarEstado(estado)) {
      case 'A':
        return 'status status--activo';
      case 'I':
        return 'status status--inactivo';
      case 'N':
        return 'status status--no-disponible';
      default:
        return 'status status--no-disponible';
    }
  }

  getEstadoLabel(estado: string): string {
    switch (this.normalizarEstado(estado)) {
      case 'A':
        return 'Activo';
      case 'I':
        return 'Inactivo';
      case 'N':
        return 'No disponible';
      default:
        return 'No disponible';
    }
  }

  private normalizarRol(rolNombre: string): string {
    return (rolNombre ?? '').trim().toLowerCase();
  }

  private normalizarEstado(estado: string): string {
    return (estado ?? '').trim().toUpperCase();
  }
}