import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RolApi } from '../../services/usuario-api.service';

export interface UsuarioFormulario {
    usuarioId?: number;
    nombre: string;
    email: string;
    rolId: number | null;
    password?: string;
}

@Component({
    selector: 'app-dialog-usuario',
    imports: [FormsModule],
    templateUrl: './dialog-usuario.html',
    styleUrl: './dialog-usuario.css'
})
export class DialogUsuarioComponent {

    @Input() usuario: UsuarioFormulario | null = null;
    @Input() roles: RolApi[] = [];
    @Input() modo: 'crear' | 'editar' = 'editar';
<<<<<<< HEAD
    @Input() roles: any[] = [];
    @Output() guardar = new EventEmitter<any>();
=======
    @Output() guardar = new EventEmitter<UsuarioFormulario>();
>>>>>>> e5c6b9959dae109045cd674672f73784a15d0b25
    @Output() cerrar = new EventEmitter<void>();

    guardarCambios() {
        if (this.usuario) {
            this.guardar.emit(this.usuario);
        }
    }

    tienePassword(): boolean {
        return this.modo === 'crear';
    }

    cerrarDialog() {
        this.cerrar.emit();
    }
}
