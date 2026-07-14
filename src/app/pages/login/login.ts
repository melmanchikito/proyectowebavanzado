import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  usuario: string = 'admin@proyecto.local';
  clave: string = '';
  mensaje: string = '';
  tipoMensaje: string = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ingresar(): void {
    if (!this.usuario || !this.clave || this.cargando) {
      this.mensaje = 'Ingrese correo y clave';
      this.tipoMensaje = 'error';
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    this.authService.login(this.usuario.trim(), this.clave).subscribe({
      next: () => {
        this.mensaje = 'Acceso concedido';
        this.tipoMensaje = 'success';
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.mensaje = error.status === 0
          ? 'No se pudo conectar con el backend'
          : 'Correo o clave incorrectos';
        this.tipoMensaje = 'error';
        this.cargando = false;
      }
    });
  }
}
