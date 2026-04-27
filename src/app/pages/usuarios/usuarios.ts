import { Component } from '@angular/core';

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: 'padre' | 'docente';
  estado: 'activo' | 'pendiente' | 'inactivo';
  avatar: string;
}

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class UsuariosComponent {
  usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Carlos García',
      correo: 'carlos.garcia@mail.com',
      rol: 'padre',
      estado: 'activo',
      avatar: '👨'
    },
    {
      id: 2,
      nombre: 'María López',
      correo: 'maria.lopez@mail.com',
      rol: 'docente',
      estado: 'activo',
      avatar: '👩'
    },
    {
      id: 3,
      nombre: 'Juan Martínez',
      correo: 'juan.martinez@mail.com',
      rol: 'padre',
      estado: 'activo',
      avatar: '👨'
    },
    {
      id: 4,
      nombre: 'Ana Rodríguez',
      correo: 'ana.rodriguez@mail.com',
      rol: 'docente',
      estado: 'pendiente',
      avatar: '👩'
    },
    {
      id: 5,
      nombre: 'Pedro Sánchez',
      correo: 'pedro.sanchez@mail.com',
      rol: 'padre',
      estado: 'activo',
      avatar: '👨'
    },
    {
      id: 6,
      nombre: 'Laura Fernández',
      correo: 'laura.fernandez@mail.com',
      rol: 'docente',
      estado: 'activo',
      avatar: '👩'
    },
    {
      id: 7,
      nombre: 'Roberto González',
      correo: 'roberto.gonzalez@mail.com',
      rol: 'padre',
      estado: 'inactivo',
      avatar: '👨'
    },
    {
      id: 8,
      nombre: 'Sofía Torres',
      correo: 'sofia.torres@mail.com',
      rol: 'docente',
      estado: 'activo',
      avatar: '👩'
    }
  ];
}