import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../../asignaturas/models/asignatura';
import {Usuario} from '../../usuarios/usuario';
import {UsuarioService} from '../../usuarios/usuario.service';
import {AsignaturaService} from '../../asignaturas/services/asignatura.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'root',
  templateUrl: './formulario-asignatura.component.html',
})
export class FormularioAsignaturaComponent implements OnInit {

  public asignatura: Asignatura = new Asignatura();
  public profesores: Usuario[];
  public profesor: Usuario;

  public errores: string[];
  private urlEndPoint: string = "http://localhost:8080/api/asignaturas";

  constructor(private  usuarioService : UsuarioService,
  private http: HttpClient, private asignaturaService: AsignaturaService,
  private router:Router,
  private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    //Obtenemos Asignatura por id
    this.cargarAsignatura();
    //Con el + convertimos a un tipo number
    this.usuarioService.getProfesores().subscribe(
      usuarios => this.profesores = usuarios
    );
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
    this.asignaturaService.create(this.asignatura)
    .subscribe(json => {
      this.router.navigate(['/asignaturas'])
      Swal.fire('Nueva Asignatura', `Asignatura ${json.nombre} creada con éxito!`, 'success')
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
      Swal.fire('Actualizar Asignatura', `Asignatura ${json.nombre} actualizada con éxito!`, 'success')
    },//Segundo atributo de subscribe, si sale mal
      err=>{
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
  compararProfesor(o1: Asignatura, o2: Asignatura): boolean{
    if (o1=== undefined && o2=== undefined){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.nombre === o2.nombre;
  }
}
