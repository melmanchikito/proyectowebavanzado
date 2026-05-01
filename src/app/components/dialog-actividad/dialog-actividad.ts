import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-actividad',
  imports: [FormsModule],
  templateUrl: './dialog-actividad.html',
  styleUrl: './dialog-actividad.css'
})
export class DialogActividadComponent {

  @Input() actividad: any = null;
  @Output() guardar = new EventEmitter<any>();
  @Output() cerrar = new EventEmitter<void>();

  guardarCambios() {
    this.guardar.emit(this.actividad);
  }

  cerrarDialog() {
    this.cerrar.emit();
  }
}