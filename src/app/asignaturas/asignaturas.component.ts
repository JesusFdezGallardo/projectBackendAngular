import { Component, OnInit } from '@angular/core';
import {Asignatura} from './asignatura';
import {AsignaturaService} from './asignaturas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './asignaturas.component.html',

})
export class AsignaturasComponent {

  asignaturas: Asignatura[];

  constructor(private  asignaturaService : AsignaturaService) { }

  sethabilitar(): void{

    this.asignaturaService.getAsignaturas().subscribe(
      asignaturas => this.asignaturas= asignaturas
    );
  }

  delete(asignatura: Asignatura): void{
    Swal.fire({
  title: '¿Estás seguro?',
  text: `Borrarás a ${asignatura.nombre}`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, ¡Bórralo!'
  }).then((result) => {
  if (result.isConfirmed) {
  this.asignaturaService.delete(asignatura.idAsignatura).subscribe(
    response => {         //El método filtrer de Array para no mostrar asignatura eliminada
      this.asignaturas = this.asignaturas.filter(asignatura => asignatura !== asignatura)
      Swal.fire(
        'Eliminado!',
        'La Asignatura ha sido eliminada con éxito',
        'success'
      )
    }
  )
  }

  })
  }

}
