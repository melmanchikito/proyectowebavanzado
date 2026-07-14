import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogActividadComponent } from '../../components/dialog-actividad/dialog-actividad';
import { DialogUsuarioComponent, UsuarioFormulario } from '../../components/dialog-usuario/dialog-usuario';
import { RolApi, UsuarioApi, UsuarioApiService, UsuarioCreatePayload, UsuarioPayload } from '../../services/usuario-api.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, DialogActividadComponent, DialogUsuarioComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {

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

  actividades = [
    {
      nombre: 'Reconocer vocales',
      tipo: 'Letras',
      responsable: 'Docente Ana',
      estado: 'Activo',
      fecha: '2026-04-26',
      nivel: 'Inicial'
    },
    {
      nombre: 'Contar del 1 al 10',
      tipo: 'Números',
      responsable: 'Docente Luis',
      estado: 'Activo',
      fecha: '2026-04-27',
      nivel: 'Inicial'
    },
    {
      nombre: 'Identificar colores',
      tipo: 'Colores',
      responsable: 'Docente María',
      estado: 'Pendiente',
      fecha: '2026-04-28',
      nivel: 'Básico'
    },
    {
      nombre: 'Juego de memoria visual',
      tipo: 'Juego educativo',
      responsable: 'Admin Bryan',
      estado: 'Activo',
      fecha: '2026-04-29',
      nivel: 'Intermedio'
    },
    {
      nombre: 'Lectura de palabras básicas',
      tipo: 'Lectura',
      responsable: 'Docente Carla',
      estado: 'Inactivo',
      fecha: '2026-04-30',
      nivel: 'Básico'
    }
  ];

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

  get actividadesFiltradas() {
    const texto = this.filtro.toLowerCase();

    return this.actividades.filter(item =>
      item.nombre.toLowerCase().includes(texto) ||
      item.tipo.toLowerCase().includes(texto) ||
      item.responsable.toLowerCase().includes(texto) ||
      item.estado.toLowerCase().includes(texto) ||
      item.fecha.includes(texto) ||
      item.nivel.toLowerCase().includes(texto)
    );
  }

  get usuariosFiltrados() {
    const texto = this.filtroUsuarios.toLowerCase();

    return this.usuarios.filter(item =>
      item.nombre.toLowerCase().includes(texto) ||
      item.email.toLowerCase().includes(texto) ||
      item.rolNombre.toLowerCase().includes(texto) ||
      this.getEstadoLabel(item.estado).toLowerCase().includes(texto)
    );
  }

  modificarActividad(actividad: any) {
    this.indiceSeleccionado = this.actividades.indexOf(actividad);
    this.actividadSeleccionada = { ...actividad };
    this.mostrarDialog = true;
  }

  guardarCambios(actividadEditada: any) {
    this.actividades[this.indiceSeleccionado] = actividadEditada;
    this.mostrarDialog = false;
  }

  cerrarDialog() {
    this.mostrarDialog = false;
  }

  eliminarActividad(actividad: any) {
    this.actividades = this.actividades.filter(item => item !== actividad);
  }

  // ===== MÉTODOS USUARIOS =====

  crearNuevoUsuario() {
    this.modoUsuario = 'crear';
    this.usuarioSeleccionado = {
      usuarioId: undefined,
      nombre: '',
      email: '',
      rolId: this.roles[0]?.rolId ?? null,
      password: ''
    };
    this.usuarioOriginalSeleccionado = null;
    this.mostrarDialogUsuario = true;
  }

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
  }

  // ===== MÉTODOS AUXILIARES =====

  getColorRol(rol: string): string {
    const rolLimpio = rol?.trim().toLowerCase();

    switch (rolLimpio) {
      case 'admin':
        return 'bg-danger';
      case 'docente':
        return 'bg-info';
      case 'padre':
        return 'bg-success';
      default:
        return 'bg-secondary';
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