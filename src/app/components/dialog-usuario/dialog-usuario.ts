import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-dialog-usuario',
    imports: [FormsModule],
    templateUrl: './dialog-usuario.html',
    styleUrl: './dialog-usuario.css'
})
export class DialogUsuarioComponent {

    @Input() usuario: any = null;
    @Input() modo: 'crear' | 'editar' = 'editar';
    @Output() guardar = new EventEmitter<any>();
    @Output() cerrar = new EventEmitter<void>();

    guardarCambios() {
        this.guardar.emit(this.usuario);
    }

    cerrarDialog() {
        this.cerrar.emit();
    }
}
