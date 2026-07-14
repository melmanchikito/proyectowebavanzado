import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario, UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class UsuariosComponent implements OnInit {
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
