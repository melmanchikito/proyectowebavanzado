import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogActividadComponent } from '../../components/dialog-actividad/dialog-actividad';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, DialogActividadComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {

  filtro: string = '';
  mostrarDialog: boolean = false;
  actividadSeleccionada: any = null;
  indiceSeleccionado: number = -1;

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
}