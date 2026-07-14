import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgresoCategoria, ProgresoEstudiante, ProgresoResumen, ProgresoService } from '../../services/progreso.service';

@Component({
  selector: 'app-progreso',
  imports: [CommonModule],
  templateUrl: './progreso.html',
  styleUrl: './progreso.css'
})
export class ProgresoComponent implements OnInit {
  resumen: ProgresoResumen | null = null;
  cargando = false;
  error = '';

  constructor(private progresoService: ProgresoService) {}

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.cargando = true;
    this.progresoService.obtenerResumen().subscribe({
      next: resumen => {
        this.resumen = resumen;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el progreso.';
        this.cargando = false;
      }
    });
  }

  get categorias(): ProgresoCategoria[] {
    return this.resumen?.categorias ?? [];
  }

  get estudiantes(): ProgresoEstudiante[] {
    return this.resumen?.estudiantes ?? [];
  }
}
