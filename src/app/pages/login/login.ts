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

<<<<<<< HEAD
  usuario: string = 'admin@proyecto.local';
  clave: string = '';
=======
  email: string = '';
  password: string = '';
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
  mensaje: string = '';
  tipoMensaje: string = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

<<<<<<< HEAD
  ingresar(): void {
    if (!this.usuario || !this.clave || this.cargando) {
      this.mensaje = 'Ingrese correo y clave';
=======
  async ingresar(): Promise<void> {
    try {
      const acceso = await this.authService.login(this.email, this.password);

      if (!acceso) {
        this.mensaje = 'No fue posible iniciar sesión';
        this.tipoMensaje = 'error';
        return;
      }

      this.mensaje = 'Acceso concedido';
      this.tipoMensaje = 'success';

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 700);
    } catch {
      this.mensaje = 'Error en credenciales o conexión con la API';
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
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
