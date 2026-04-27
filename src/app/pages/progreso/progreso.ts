import { Component } from '@angular/core';

@Component({
  selector: 'app-progreso',
  imports: [],
  templateUrl: './progreso.html',
  styleUrl: './progreso.css'
})
export class ProgresoComponent {

  estudiantes = [
    { nombre: 'Mateo', avance: 85, nivel: 'Avanzado' },
    { nombre: 'Sofía', avance: 72, nivel: 'Intermedio' },
    { nombre: 'Valentina', avance: 94, nivel: 'Excelente' },
    { nombre: 'Thiago', avance: 58, nivel: 'Inicial' }
  ];

}