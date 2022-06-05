import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../asignaturas/models/asignatura';
import {Practica} from '../asignaturas/models/practica';
import {AsignaturaService} from '../asignaturas/services/asignatura.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PracticaService} from '../asignaturas/services/practica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-practicas',
  templateUrl: './form-practicas.component.html',
})
export class FormPracticasComponent implements OnInit {

  public asignatura : Asignatura;
  public practica: Practica = new Practica();
  public errores: string[];

  constructor(private asignaturaService: AsignaturaService,
  private activatedRoute: ActivatedRoute, private practicaService: PracticaService,
  private router:Router) { }

  ngOnInit(): void {
    this.cargarAsignatura();
  }

  cargarAsignatura(): void {
    this.activatedRoute.params.subscribe(
      params => {let id = params['asignaturaId']
      if (id){
        this.asignaturaService.getAsignatura(id).subscribe(
          (asignatura) => this.asignatura = asignatura)
        }
      })
  }

  create(): void {
    console.log(this.asignatura);
    this.practicaService.create(this.asignatura.idAsignatura, this.practica)
    .subscribe(json => {
      this.router.navigate(['/asignaturas'])
      Swal.fire('Nueva Practica', `Practica ${json.titulo} creada con éxito!`, 'success')
      },//Segundo atributo de subscribe, si sale mal
      err=>{
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.asignatura);
  }
}
