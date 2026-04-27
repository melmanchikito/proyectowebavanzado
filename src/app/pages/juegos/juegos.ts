import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Juego {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  color: string;
  nivel: string;
  jugadores: string;
}

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juegos.html',
  styleUrl: './juegos.css'
})
export class JuegosComponent {

  juegoActivo: string | null = null;

  juegos: Juego[] = [
    {
      id: 'memoria',
      titulo: 'Memoria',
      descripcion: 'Encuentra las parejas de tarjetas y entrena tu memoria.',
      icono: '🧠',
      color: 'morado',
      nivel: 'Fácil',
      jugadores: '1-2 jugadores'
    },
    {
      id: 'colores',
      titulo: 'Colores',
      descripcion: 'Aprende y reconoce los colores con ejercicios divertidos.',
      icono: '🎨',
      color: 'azul',
      nivel: 'Fácil',
      jugadores: '1 jugador'
    },
    {
      id: 'rompecabezas',
      titulo: 'Rompecabezas',
      descripcion: 'Arma figuras y desarrolla tu pensamiento espacial.',
      icono: '🧩',
      color: 'verde',
      nivel: 'Medio',
      jugadores: '1-4 jugadores'
    },
    {
      id: 'asociacion',
      titulo: 'Asociación',
      descripcion: 'Relaciona conceptos y refuerza tu aprendizaje.',
      icono: '🔗',
      color: 'naranja',
      nivel: 'Medio',
      jugadores: '1-2 jugadores'
    }
  ];

  filtroActivo: string = 'todos';

  get juegosFiltrados(): Juego[] {
    if (this.filtroActivo === 'todos') return this.juegos;
    return this.juegos.filter(j => j.nivel.toLowerCase() === this.filtroActivo);
  }

  setFiltro(filtro: string): void {
    this.filtroActivo = filtro;
  }

  abrirJuego(id: string): void {
    this.juegoActivo = id;
  }

  cerrarJuego(): void {
    this.juegoActivo = null;
  }

  trackById(index: number, juego: Juego): string {
    return juego.id;
  }
}
