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

  email: string = '';
  password: string = '';
  mensaje: string = '';
  tipoMensaje: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

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
      this.tipoMensaje = 'error';
    }
  }
}