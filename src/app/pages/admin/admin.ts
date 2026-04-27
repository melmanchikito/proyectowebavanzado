import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {

  actividades = [
    { nombre: 'Reconocer vocales', tipo: 'Letras', estado: 'Activo' },
    { nombre: 'Contar números del 1 al 10', tipo: 'Números', estado: 'Activo' },
    { nombre: 'Identificar colores', tipo: 'Colores', estado: 'Pendiente' },
    { nombre: 'Juego de memoria', tipo: 'Juego', estado: 'Activo' }
  ];

}