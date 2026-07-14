import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Usuario, UsuarioService } from '../../services/usuario.service';
=======
import { UsuarioApi, UsuarioApiService } from '../../services/usuario-api.service';
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class UsuariosComponent implements OnInit {
<<<<<<< HEAD
  usuarios: Usuario[] = [];
  cargando = false;
  error = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.error = '';

    this.usuarioService.obtenerUsuarios().subscribe({
      next: usuarios => {
        this.usuarios = usuarios;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los usuarios.';
        this.cargando = false;
      }
    });
  }

  get totalPadres(): number {
    return this.usuarios.filter(usuario => usuario.rolNombre === 'Padre').length;
  }

  get totalDocentes(): number {
    return this.usuarios.filter(usuario => usuario.rolNombre === 'Docente').length;
  }

  get totalPendientes(): number {
    return this.usuarios.filter(usuario => usuario.estado === 'N').length;
  }

  estadoTexto(estado: string): string {
    if (estado === 'A') return 'activo';
    if (estado === 'I') return 'inactivo';
    return 'pendiente';
  }

  rolTexto(rol: string): string {
    return rol.toLowerCase();
  }

  avatar(rol: string): string {
    return rol === 'Docente' ? '👩' : '👨';
  }
}
=======

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
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
