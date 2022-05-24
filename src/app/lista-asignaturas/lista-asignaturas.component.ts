import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../asignaturas/models/asignatura';
import {AsignaturaService} from '../asignaturas/services/asignatura.service';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {UsuarioService} from '../usuarios/usuario.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lista-asignaturas',
  templateUrl: './lista-asignaturas.component.html'
})
export class ListaAsignaturasComponent implements OnInit {

  listaAsignaturas: Asignatura[];
  //Instancia de una asignatura para poder crearla
  asignatura: Asignatura = new Asignatura();

  constructor(private  asignaturaService : AsignaturaService, private usuarioService: UsuarioService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.asignaturaService.getAsignaturas().subscribe(
      asignaturas => this.listaAsignaturas = asignaturas
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
        response => {         //El método filtrer de Array para no mostrar usuario eliminado
          this.listaAsignaturas = this.listaAsignaturas.filter(asig => asig !== asignatura)
          Swal.fire(
            'Eliminado!',
            'La asignatura ha sido eliminada con éxito',
            'success'
          )
        }
      )}})}

}
