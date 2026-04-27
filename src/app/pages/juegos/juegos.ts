import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
 
interface Juego {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  color: string;
  nivel: string;
  jugadores: string;
  ruta: string;
}
 
@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './juegos.html',
  styleUrl: './juegos.css'
})
export class JuegosComponent {
 
  juegos: Juego[] = [
    {
      id: 'memoria',
      titulo: 'Memoria',
      descripcion: 'Encuentra las parejas de tarjetas y entrena tu memoria.',
      icono: '🧠',
      color: 'morado',
      nivel: 'Fácil',
      jugadores: '1-2 jugadores',
      ruta: '/juegos/memoria'
    },
    {
      id: 'colores',
      titulo: 'Colores',
      descripcion: 'Aprende y reconoce los colores con ejercicios divertidos.',
      icono: '🎨',
      color: 'azul',
      nivel: 'Fácil',
      jugadores: '1 jugador',
      ruta: '/juegos/colores'
    },
    {
      id: 'rompecabezas',
      titulo: 'Rompecabezas',
      descripcion: 'Arma figuras y desarrolla tu pensamiento espacial.',
      icono: '🧩',
      color: 'verde',
      nivel: 'Medio',
      jugadores: '1-4 jugadores',
      ruta: '/juegos/rompecabezas'
    },
    {
      id: 'asociacion',
      titulo: 'Asociación',
      descripcion: 'Relaciona conceptos y refuerza tu aprendizaje.',
      icono: '🔗',
      color: 'naranja',
      nivel: 'Medio',
      jugadores: '1-2 jugadores',
      ruta: '/juegos/asociacion'
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
 
  trackById(index: number, juego: Juego): string {
    return juego.id;
  }
}