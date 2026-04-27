import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LetraItem { letra: string; palabra: string; emoji: string; }
interface Pregunta { enunciado: string; icono: string; opciones: string[]; correcta: number; }

@Component({
  selector: 'app-aprendizaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aprendizaje.html',
  styleUrl: './aprendizaje.css'
})
export class AprendizajeComponent {

  constructor(private cdr: ChangeDetectorRef) {}

  tabActiva: 'letras' | 'numeros' | 'quiz' = 'letras';

  letras: LetraItem[] = [
    { letra: 'A', palabra: 'Árbol', emoji: '🌳' },
    { letra: 'B', palabra: 'Barco', emoji: '⛵' },
    { letra: 'C', palabra: 'Casa', emoji: '🏠' },
    { letra: 'D', palabra: 'Dado', emoji: '🎲' },
    { letra: 'E', palabra: 'Estrella', emoji: '⭐' },
    { letra: 'F', palabra: 'Foca', emoji: '🦭' },
    { letra: 'G', palabra: 'Gato', emoji: '🐱' },
    { letra: 'H', palabra: 'Hoja', emoji: '🍃' },
    { letra: 'I', palabra: 'Iglú', emoji: '🏔️' },
    { letra: 'J', palabra: 'Jirafa', emoji: '🦒' },
    { letra: 'K', palabra: 'Kiwi', emoji: '🥝' },
    { letra: 'L', palabra: 'Luna', emoji: '🌙' },
    { letra: 'M', palabra: 'Mariposa', emoji: '🦋' },
    { letra: 'N', palabra: 'Nube', emoji: '☁️' },
    { letra: 'O', palabra: 'Oso', emoji: '🐻' },
    { letra: 'P', palabra: 'Pato', emoji: '🦆' },
    { letra: 'Q', palabra: 'Queso', emoji: '🧀' },
    { letra: 'R', palabra: 'Ratón', emoji: '🐭' },
    { letra: 'S', palabra: 'Sol', emoji: '☀️' },
    { letra: 'T', palabra: 'Tren', emoji: '🚂' },
    { letra: 'U', palabra: 'Uva', emoji: '🍇' },
    { letra: 'V', palabra: 'Vaca', emoji: '🐄' },
    { letra: 'W', palabra: 'Waffle', emoji: '🧇' },
    { letra: 'X', palabra: 'Xilófono', emoji: '🎵' },
    { letra: 'Y', palabra: 'Yogur', emoji: '🥛' },
    { letra: 'Z', palabra: 'Zapato', emoji: '👟' },
  ];

  numeros: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  letraSeleccionada: LetraItem | null = null;
  numeroSeleccionado: number | null = null;

  seleccionarLetra(item: LetraItem): void {
    this.letraSeleccionada = item;
  }

  seleccionarNumero(n: number): void {
    this.numeroSeleccionado = n;
  }

  estrellas(n: number): number[] {
    return Array(n).fill(0);
  }

  preguntas: Pregunta[] = [
    { enunciado: '¿Cuál es la primera letra del abecedario?', icono: '🔤', opciones: ['A', 'B', 'C', 'D'], correcta: 0 },
    { enunciado: '¿Cuántos dedos tiene una mano?', icono: '🖐️', opciones: ['4', '5', '6', '3'], correcta: 1 },
    { enunciado: '¿Cuál es la letra de "Sol"?', icono: '☀️', opciones: ['M', 'S', 'T', 'P'], correcta: 1 },
    { enunciado: '¿Qué número va después del 4?', icono: '🔢', opciones: ['3', '6', '5', '7'], correcta: 2 },
    { enunciado: '¿Cuál es la letra de "Mariposa"?', icono: '🦋', opciones: ['N', 'M', 'R', 'L'], correcta: 1 },
  ];

  quizIdx = 0;
  quizAciertos = 0;
  opcionElegida: number | null = null;
  quizFin = false;
  permitirClick = true;

  get preguntaActual(): Pregunta {
    return this.preguntas[this.quizIdx];
  }

  get progreso(): number {
    return Math.round((this.quizIdx / this.preguntas.length) * 100);
  }

  elegir(i: number): void {
    if (!this.permitirClick || this.quizFin) return;
    
    this.permitirClick = false;
    this.opcionElegida = i;
    
    if (i === this.preguntaActual.correcta) {
      this.quizAciertos++;
    }
    
    setTimeout(() => {
      this.quizIdx++;
      this.opcionElegida = null;
      this.permitirClick = true;
      
      if (this.quizIdx >= this.preguntas.length) {
        this.quizFin = true;
      }
      
      this.cdr.detectChanges();
    }, 850);
  }

  estadoOpcion(i: number): string {
    if (this.opcionElegida === null) return '';
    if (i === this.preguntaActual.correcta) return 'ok';
    if (i === this.opcionElegida) return 'no';
    return '';
  }

  reiniciarQuiz(): void {
    this.quizIdx = 0;
    this.quizAciertos = 0;
    this.opcionElegida = null;
    this.quizFin = false;
    this.permitirClick = true;
  }

  cambiarTab(tab: typeof this.tabActiva): void {
    this.tabActiva = tab;
  }
}