import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogActividadComponent } from '../../components/dialog-actividad/dialog-actividad';
import { DialogUsuarioComponent } from '../../components/dialog-usuario/dialog-usuario';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, DialogActividadComponent, DialogUsuarioComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {

  // Actividades
  filtro: string = '';
  mostrarDialog: boolean = false;
  actividadSeleccionada: any = null;
  indiceSeleccionado: number = -1;
  seccionActiva: string = 'actividades';

  // Usuarios
  filtroUsuarios: string = '';
  mostrarDialogUsuario: boolean = false;
  usuarioSeleccionado: any = null;
  indiceUsuarioSeleccionado: number = -1;
  modoUsuario: 'crear' | 'editar' = 'crear';

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

  usuarios = [
    {
      nombre: 'María García',
      email: 'maria.garcia@email.com',
      rol: 'Padre',
      estado: 'Activo',
      fecha: '2026-03-15'
    },
    {
      nombre: 'Carlos López',
      email: 'carlos.lopez@email.com',
      rol: 'Docente',
      estado: 'Activo',
      fecha: '2026-03-18'
    },
    {
      nombre: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      rol: 'Docente',
      estado: 'Activo',
      fecha: '2026-03-20'
    },
    {
      nombre: 'Juan Rodríguez',
      email: 'juan.rodriguez@email.com',
      rol: 'Padre',
      estado: 'Activo',
      fecha: '2026-03-22'
    },
    {
      nombre: 'Laura Pérez',
      email: 'laura.perez@email.com',
      rol: 'Padre',
      estado: 'Pendiente',
      fecha: '2026-04-01'
    },
    {
      nombre: 'Bryan Admin',
      email: 'bryan.admin@email.com',
      rol: 'Admin',
      estado: 'Activo',
      fecha: '2026-02-10'
    }
  ];

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
      item.rol.toLowerCase().includes(texto) ||
      item.estado.toLowerCase().includes(texto) ||
      item.fecha.includes(texto)
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
      nombre: '',
      email: '',
      rol: 'Padre',
      estado: 'Pendiente',
      fecha: new Date().toISOString().split('T')[0]
    };
    this.mostrarDialogUsuario = true;
  }

  modificarUsuario(usuario: any) {
    this.modoUsuario = 'editar';
    this.indiceUsuarioSeleccionado = this.usuarios.indexOf(usuario);
    this.usuarioSeleccionado = { ...usuario };
    this.mostrarDialogUsuario = true;
  }

  guardarCambiosUsuario(usuarioEditado: any) {
    if (this.modoUsuario === 'crear') {
      // Agregar nuevo usuario a la lista
      this.usuarios.push(usuarioEditado);
    } else {
      // Actualizar usuario existente
      this.usuarios[this.indiceUsuarioSeleccionado] = usuarioEditado;
    }
    this.mostrarDialogUsuario = false;
  }

  cerrarDialogUsuario() {
    this.mostrarDialogUsuario = false;
  }

  eliminarUsuario(usuario: any) {
    this.usuarios = this.usuarios.filter(item => item !== usuario);
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

  getColorEstado(estado: string): string {
    const estadoLimpio = estado?.trim().toLowerCase();

    switch (estadoLimpio) {
      case 'activo':
        return 'bg-success';
      case 'pendiente':
        return 'bg-warning';
      case 'inactivo':
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  }
}