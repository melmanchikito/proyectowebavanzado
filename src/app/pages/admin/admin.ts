import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogActividadComponent } from '../../components/dialog-actividad/dialog-actividad';
import { DialogUsuarioComponent } from '../../components/dialog-usuario/dialog-usuario';
import { Actividad, ActividadCreate, ActividadService, ActividadUpdate } from '../../services/actividad.service';
import { Rol, RoleService } from '../../services/role.service';
import { Usuario, UsuarioCreate, UsuarioService, UsuarioUpdate } from '../../services/usuario.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, DialogActividadComponent, DialogUsuarioComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  filtro = '';
  filtroUsuarios = '';
  mostrarDialog = false;
  mostrarDialogUsuario = false;
  actividadSeleccionada: any = null;
  usuarioSeleccionado: any = null;
  seccionActiva: 'actividades' | 'usuarios' = 'actividades';
  modoUsuario: 'crear' | 'editar' = 'crear';
  modoActividad: 'crear' | 'editar' = 'crear';
  cargando = false;
  mensaje = '';
  error = '';

  actividades: Actividad[] = [];
  usuarios: Usuario[] = [];
  roles: Rol[] = [];

  constructor(
    private actividadService: ActividadService,
    private usuarioService: UsuarioService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargarActividades();
    this.cargarUsuarios();
    this.roleService.obtenerRoles().subscribe({
      next: roles => this.roles = roles.filter(rol => rol.estado === 'A'),
      error: () => this.error = 'No se pudieron cargar los roles.'
    });
  }

  cargarActividades(): void {
    this.cargando = true;
    this.actividadService.obtenerActividades().subscribe({
      next: actividades => {
        this.actividades = actividades;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las actividades.';
        this.cargando = false;
      }
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: usuarios => this.usuarios = usuarios,
      error: () => this.error = 'No se pudieron cargar los usuarios.'
    });
  }

  get actividadesFiltradas(): Actividad[] {
    const texto = this.filtro.toLowerCase();
    return this.actividades.filter(item =>
      item.nombre.toLowerCase().includes(texto) ||
      item.tipo.toLowerCase().includes(texto) ||
      (item.responsableNombre ?? '').toLowerCase().includes(texto) ||
      this.estadoTexto(item.estado).toLowerCase().includes(texto) ||
      item.fecha.includes(texto) ||
      item.nivel.toLowerCase().includes(texto)
    );
  }

  get usuariosFiltrados(): Usuario[] {
    const texto = this.filtroUsuarios.toLowerCase();
    return this.usuarios.filter(item =>
      item.nombre.toLowerCase().includes(texto) ||
      item.email.toLowerCase().includes(texto) ||
      item.rolNombre.toLowerCase().includes(texto) ||
      this.estadoTexto(item.estado).toLowerCase().includes(texto) ||
      item.fechaRegistro.includes(texto)
    );
  }

  get totalPadres(): number {
    return this.usuarios.filter(u => u.rolNombre === 'Padre').length;
  }

  get totalDocentes(): number {
    return this.usuarios.filter(u => u.rolNombre === 'Docente').length;
  }

  get totalActivos(): number {
    return this.usuarios.filter(u => u.estado === 'A').length;
  }

  get totalJuegos(): number {
    return this.actividades.filter(a => a.tipo === 'Juego educativo').length;
  }

  crearNuevaActividad(): void {
    this.modoActividad = 'crear';
    this.actividadSeleccionada = {
      nombre: '',
      tipo: 'Letras',
      nivel: 'Inicial',
      estado: 'A',
      fecha: new Date().toISOString().slice(0, 10),
      responsableUsuarioId: null
    };
    this.mostrarDialog = true;
  }

  modificarActividad(actividad: Actividad): void {
    this.modoActividad = 'editar';
    this.actividadSeleccionada = {
      ...actividad,
      fecha: actividad.fecha.slice(0, 10)
    };
    this.mostrarDialog = true;
  }

  guardarCambios(actividadEditada: any): void {
    this.error = '';
    const payload: ActividadCreate | ActividadUpdate = {
      nombre: actividadEditada.nombre,
      tipo: actividadEditada.tipo,
      nivel: actividadEditada.nivel,
      estado: actividadEditada.estado,
      fecha: actividadEditada.fecha,
      responsableUsuarioId: actividadEditada.responsableUsuarioId ?? null
    };

    if (this.modoActividad === 'crear') {
      this.actividadService.crearActividad(payload as ActividadCreate).subscribe({
        next: () => {
          this.mostrarDialog = false;
          this.cargarActividades();
        },
        error: (error: any) => this.error = this.mensajeError(error, 'No se pudo guardar la actividad.')
      });
      return;
    }

    this.actividadService.actualizarActividad(actividadEditada.actividadId, payload as ActividadUpdate).subscribe({
      next: () => {
        this.mostrarDialog = false;
        this.cargarActividades();
      },
      error: (error: any) => this.error = this.mensajeError(error, 'No se pudo guardar la actividad.')
    });
  }

  cerrarDialog(): void {
    this.mostrarDialog = false;
  }

  eliminarActividad(actividad: Actividad): void {
    if (!confirm(`¿Eliminar la actividad "${actividad.nombre}"?`)) {
      return;
    }

    this.actividadService.eliminarActividad(actividad.actividadId).subscribe({
      next: () => this.cargarActividades(),
      error: error => this.error = this.mensajeError(error, 'No se pudo eliminar la actividad.')
    });
  }

  crearNuevoUsuario(): void {
    this.modoUsuario = 'crear';
    this.usuarioSeleccionado = {
      nombre: '',
      email: '',
      password: '',
      rolId: this.roles[0]?.rolId,
      estado: 'A'
    };
    this.mostrarDialogUsuario = true;
  }

  modificarUsuario(usuario: Usuario): void {
    this.modoUsuario = 'editar';
    this.usuarioSeleccionado = {
      ...usuario,
      password: ''
    };
    this.mostrarDialogUsuario = true;
  }

  guardarCambiosUsuario(usuarioEditado: any): void {
    this.error = '';

    if (this.modoUsuario === 'crear') {
      const payload: UsuarioCreate = {
        nombre: usuarioEditado.nombre,
        email: usuarioEditado.email,
        password: usuarioEditado.password,
        rolId: usuarioEditado.rolId
      };

      this.usuarioService.crearUsuario(payload).subscribe({
        next: () => {
          this.mostrarDialogUsuario = false;
          this.cargarUsuarios();
        },
        error: error => this.error = this.mensajeError(error, 'No se pudo crear el usuario.')
      });
      return;
    }

    const payload: UsuarioUpdate = {
      nombre: usuarioEditado.nombre,
      email: usuarioEditado.email,
      rolId: usuarioEditado.rolId,
      estado: usuarioEditado.estado
    };

    if (usuarioEditado.password) {
      payload.password = usuarioEditado.password;
    }

    this.usuarioService.actualizarUsuario(usuarioEditado.usuarioId, payload).subscribe({
      next: () => {
        this.mostrarDialogUsuario = false;
        this.cargarUsuarios();
      },
      error: error => this.error = this.mensajeError(error, 'No se pudo actualizar el usuario.')
    });
  }

  cerrarDialogUsuario(): void {
    this.mostrarDialogUsuario = false;
  }

  eliminarUsuario(usuario: Usuario): void {
    if (!confirm(`¿Eliminar el usuario "${usuario.nombre}"?`)) {
      return;
    }

    this.usuarioService.eliminarUsuario(usuario.usuarioId).subscribe({
      next: () => this.cargarUsuarios(),
      error: error => this.error = this.mensajeError(error, 'No se pudo eliminar el usuario.')
    });
  }

  getColorRol(rol: string): string {
    switch (rol?.trim().toLowerCase()) {
      case 'admin': return 'bg-danger';
      case 'docente': return 'bg-info';
      case 'padre': return 'bg-success';
      default: return 'bg-secondary';
    }
  }

  getColorEstado(estado: string): string {
    switch (estado) {
      case 'A': return 'bg-success';
      case 'N': return 'bg-warning';
      case 'I': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  estadoTexto(estado: string): string {
    if (estado === 'A') return 'Activo';
    if (estado === 'I') return 'Inactivo';
    return 'Pendiente';
  }

  private mensajeError(error: any, fallback: string): string {
    return error?.error?.title ?? error?.error?.mensaje ?? fallback;
  }
}
