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

  usuario: string = '';
  clave: string = '';
  mensaje: string = '';
  tipoMensaje: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ingresar(): void {
    const acceso = this.authService.login(this.usuario, this.clave);

    if (acceso) {
      this.mensaje = 'Acceso concedido';
      this.tipoMensaje = 'success';

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 700);
    } else {
      this.mensaje = 'Error en credenciales';
      this.tipoMensaje = 'error';
    }
  }
}