import { Component, OnInit } from '@angular/core';
//Importamos clase usuario
import {Asignatura} from './asignatura';
import {AsignaturaService} from './asignaturas.service';
//Clase que contiene rutas para redirigir con cada insercion al menu
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './asignaturas.component.html',
})
export class FormComponentAsignatura implements OnInit {
//Ceamos atributo usuario en la clase componente
  public asignatura: Asignatura = new Asignatura()
  public titulo:string = "Crear Asignatura"
  //Atributo que contenga lista de los errores
  public errores: string[];

  constructor(private asignaturaService: AsignaturaService,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarAsignaturas()
  }

  cargarAsignaturas(): void{
    this.activatedRoute.params.subscribe(
      params => {let id = params['id']
      if (id){
        this.asignaturaService.getAsignatura(id).subscribe(
          (asignatura) => this.asignatura = asignatura)
        }
      })
  }

    create(): void{
    this.asignaturaService.create(this.asignatura)
    .subscribe(json => {
      this.router.navigate(['/asignaturas'])
      Swal.fire('Nueva Asignatura', `Asignatura ${json.asignatura.nombre} creado con éxito!`, 'success')
    },//Segundo atributo de subscribe, si sale mal
      err=>{
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void{
    this.asignaturaService.update(this.asignatura)
    .subscribe(json => {
      this.router.navigate(['/asignaturas'])
      Swal.fire('Actualizar Asignatura', `Asignatura ${json.asignatura.nombre} actualizada con éxito!`, 'success')
    },//Segundo atributo de subscribe, si sale mal
      err=>{
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

}
