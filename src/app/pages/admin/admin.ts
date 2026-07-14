<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogActividadComponent } from '../../components/dialog-actividad/dialog-actividad';
<<<<<<< HEAD
import { DialogUsuarioComponent } from '../../components/dialog-usuario/dialog-usuario';
import { Actividad, ActividadCreate, ActividadService, ActividadUpdate } from '../../services/actividad.service';
import { Rol, RoleService } from '../../services/role.service';
import { Usuario, UsuarioCreate, UsuarioService, UsuarioUpdate } from '../../services/usuario.service';
=======
import { DialogUsuarioComponent, UsuarioFormulario } from '../../components/dialog-usuario/dialog-usuario';
import { RolApi, UsuarioApi, UsuarioApiService, UsuarioCreatePayload, UsuarioPayload } from '../../services/usuario-api.service';
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, DialogActividadComponent, DialogUsuarioComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
<<<<<<< HEAD
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
=======

  // Actividades
  filtro: string = '';
  mostrarDialog: boolean = false;
  actividadSeleccionada: any = null;
  indiceSeleccionado: number = -1;
  seccionActiva: string = 'actividades';

  // Usuarios
  filtroUsuarios: string = '';
  mostrarDialogUsuario: boolean = false;
  usuarioSeleccionado: UsuarioFormulario | null = null;
  usuarioOriginalSeleccionado: UsuarioFormulario | null = null;
  modoUsuario: 'crear' | 'editar' = 'crear';
  usuarios: UsuarioApi[] = [];
  roles: RolApi[] = [];
  cargandoUsuarios: boolean = true;
  cargandoRoles: boolean = true;
  mensajeUsuario: string = '';
  tipoMensajeUsuario: 'success' | 'error' | '' = '';
  mostrarToastUsuario: boolean = false;
  mostrarConfirmacionEliminar: boolean = false;
  usuarioAEliminar: UsuarioApi | null = null;
  private notificacionTimer: number | null = null;
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25

  actividades: Actividad[] = [];
  usuarios: Usuario[] = [];
  roles: Rol[] = [];

<<<<<<< HEAD
  constructor(
    private actividadService: ActividadService,
    private usuarioService: UsuarioService,
    private roleService: RoleService
  ) {}
=======
  constructor(private usuarioApiService: UsuarioApiService) { }

  ngOnInit(): void {
    void this.cargarUsuarios();
    void this.cargarRoles();
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

  async cargarUsuarios(): Promise<void> {
    this.cargandoUsuarios = true;

    try {
      this.usuarios = await this.usuarioApiService.getUsuarios();
    } catch {
      this.usuarios = [];
      this.mostrarMensajeUsuario('No se pudieron cargar los usuarios desde la API.', 'error');
    } finally {
      this.cargandoUsuarios = false;
    }
  }

  async cargarRoles(): Promise<void> {
    this.cargandoRoles = true;

    try {
      this.roles = await this.usuarioApiService.getRoles();
    } catch {
      this.roles = [];
      this.mostrarMensajeUsuario('No se pudieron cargar los roles desde la API.', 'error');
    } finally {
      this.cargandoRoles = false;
    }
  }
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25

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
<<<<<<< HEAD
      this.estadoTexto(item.estado).toLowerCase().includes(texto) ||
      item.fechaRegistro.includes(texto)
=======
      this.getEstadoLabel(item.estado).toLowerCase().includes(texto)
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
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
      usuarioId: undefined,
      nombre: '',
      email: '',
<<<<<<< HEAD
      password: '',
      rolId: this.roles[0]?.rolId,
      estado: 'A'
=======
      rolId: this.roles[0]?.rolId ?? null,
      password: ''
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
    };
    this.usuarioOriginalSeleccionado = null;
    this.mostrarDialogUsuario = true;
  }

<<<<<<< HEAD
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
=======
  modificarUsuario(usuario: UsuarioApi) {
    this.modoUsuario = 'editar';
    this.usuarioSeleccionado = {
      usuarioId: usuario.usuarioId,
      nombre: usuario.nombre,
      email: usuario.email,
      rolId: usuario.rolId
    };
    this.usuarioOriginalSeleccionado = { ...this.usuarioSeleccionado };
    this.mostrarDialogUsuario = true;
  }

  async guardarCambiosUsuario(usuarioEditado: UsuarioFormulario) {
    try {
      if (this.modoUsuario === 'crear') {
        await this.usuarioApiService.createUsuario(this.crearPayloadUsuario(usuarioEditado));
        this.cerrarModalYNotificar('Usuario creado correctamente.', 'success');
      } else {
        if (!this.usuarioOriginalSeleccionado?.usuarioId || !usuarioEditado.usuarioId) {
          this.mostrarMensajeUsuario('No se pudo identificar el usuario a actualizar.', 'error');
          return;
        }

        const patch = this.crearPatchUsuario(this.usuarioOriginalSeleccionado, usuarioEditado);

        if (Object.keys(patch).length === 0) {
          this.mostrarMensajeUsuario('No hay cambios para guardar.', 'error');
          return;
        }

        await this.usuarioApiService.updateUsuario(usuarioEditado.usuarioId, patch);
        this.cerrarModalYNotificar('Usuario actualizado correctamente.', 'success');
      }

      await this.cargarUsuarios();
    } catch (error) {
      this.mostrarMensajeUsuario(this.obtenerMensajeError(error, 'No fue posible guardar el usuario.'), 'error');
    }
  }

  cerrarDialogUsuario() {
    this.mostrarDialogUsuario = false;
    this.usuarioSeleccionado = null;
    this.usuarioOriginalSeleccionado = null;
  }

  solicitarEliminarUsuario(usuario: UsuarioApi) {
    this.usuarioAEliminar = usuario;
    this.mostrarConfirmacionEliminar = true;
  }

  cancelarEliminarUsuario() {
    this.mostrarConfirmacionEliminar = false;
    this.usuarioAEliminar = null;
  }

  async confirmarEliminarUsuario() {
    if (!this.usuarioAEliminar) {
      return;
    }

    const usuario = this.usuarioAEliminar;
    this.mostrarConfirmacionEliminar = false;
    this.usuarioAEliminar = null;

    try {
      await this.usuarioApiService.deleteUsuario(usuario.usuarioId);
      this.mostrarMensajeUsuario('Usuario eliminado correctamente.', 'success');
      await this.cargarUsuarios();
    } catch (error) {
      this.mostrarMensajeUsuario(this.obtenerMensajeError(error, 'No fue posible eliminar el usuario.'), 'error');
    }
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
  }

  getColorRol(rol: string): string {
    switch (rol?.trim().toLowerCase()) {
      case 'admin': return 'bg-danger';
      case 'docente': return 'bg-info';
      case 'padre': return 'bg-success';
      default: return 'bg-secondary';
    }
  }

<<<<<<< HEAD
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
=======
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

  getAvatar(usuario: UsuarioApi): string {
    const rol = this.normalizarRol(usuario.rolNombre);

    if (rol === 'padre') {
      return '👨';
    }

    if (rol === 'docente') {
      return '👩‍🏫';
    }

    if (rol === 'admin') {
      return '🛡️';
    }

    return usuario.nombre?.charAt(0).toUpperCase() || '👤';
  }

  private crearPayloadUsuario(usuario: UsuarioFormulario): UsuarioCreatePayload {
    return {
      nombre: usuario.nombre.trim(),
      email: usuario.email.trim(),
      rolId: Number(usuario.rolId),
      password: usuario.password?.trim() ?? ''
    };
  }

  private crearPatchUsuario(original: UsuarioFormulario, actual: UsuarioFormulario): Partial<UsuarioPayload> {
    const patch: Partial<UsuarioPayload> = {};

    if (original.nombre !== actual.nombre) {
      patch.nombre = actual.nombre.trim();
    }

    if (original.email !== actual.email) {
      patch.email = actual.email.trim();
    }

    if (original.rolId !== actual.rolId && actual.rolId !== null) {
      patch.rolId = Number(actual.rolId);
    }

    return patch;
  }

  private mostrarMensajeUsuario(mensaje: string, tipoMensaje: 'success' | 'error'): void {
    if (this.notificacionTimer !== null) {
      window.clearTimeout(this.notificacionTimer);
    }

    this.mensajeUsuario = mensaje;
    this.tipoMensajeUsuario = tipoMensaje;
    this.mostrarToastUsuario = true;

    this.notificacionTimer = window.setTimeout(() => {
      this.mostrarToastUsuario = false;
      this.mensajeUsuario = '';
      this.tipoMensajeUsuario = '';
      this.notificacionTimer = null;
    }, 2400);
  }

  private cerrarModalYNotificar(mensaje: string, tipoMensaje: 'success' | 'error'): void {
    this.mostrarDialogUsuario = false;
    this.usuarioSeleccionado = null;
    this.usuarioOriginalSeleccionado = null;
    this.mostrarMensajeUsuario(mensaje, tipoMensaje);
  }

  private obtenerMensajeError(error: unknown, mensajePorDefecto: string): string {
    if (this.usuarioApiService.isHttpError(error)) {
      switch (error.status) {
        case 0:
          return 'No se pudo conectar con la API de usuarios.';
        case 400:
          return error.error?.message ?? 'La solicitud es inválida.';
        case 401:
          return 'No tienes permisos para ejecutar esta acción.';
        case 404:
          return 'El usuario solicitado no existe.';
        case 409:
          return error.error?.message ?? 'Ya existe un registro con esos datos.';
        case 500:
          return 'La API devolvió un error interno.';
        default:
          return error.error?.message ?? mensajePorDefecto;
      }
    }

    return mensajePorDefecto;
  }

  private normalizarRol(rolNombre: string): string {
    return (rolNombre ?? '').trim().toLowerCase();
  }

  private normalizarEstado(estado: string): 'A' | 'I' | 'N' {
    const valor = (estado ?? '').trim().toUpperCase();

    if (valor === 'A' || valor === 'I' || valor === 'N') {
      return valor;
    }

    return 'N';
  }
}
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
