import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {

  actividades = [
    { nombre: 'Reconocer vocales', tipo: 'Letras', estado: 'Activo', fecha: '2026-04-26' },
    { nombre: 'Contar del 1 al 10', tipo: 'Números', estado: 'Activo', fecha: '2026-04-26' },
    { nombre: 'Identificar colores', tipo: 'Colores', estado: 'Pendiente', fecha: '2026-04-26' },
    { nombre: 'Juego de memoria', tipo: 'Juego', estado: 'Activo', fecha: '2026-04-26' }
  ];

}