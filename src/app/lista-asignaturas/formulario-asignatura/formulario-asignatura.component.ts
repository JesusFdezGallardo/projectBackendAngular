import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../../asignaturas/models/asignatura';
import {Usuario} from '../../usuarios/usuario';
import {UsuarioService} from '../../usuarios/usuario.service';
import {AsignaturaService} from '../../asignaturas/services/asignatura.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../usuarios/login/auth.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'root',
  templateUrl: './formulario-asignatura.component.html',
})
export class FormularioAsignaturaComponent implements OnInit {

  public asignatura: Asignatura = new Asignatura();
  public profesores: Usuario[];
  public profesor: Usuario;
  //Prueba
  public alumnos: Usuario[];
  //Caracteristicas del autocomplete
  autocompleteControl = new FormControl();
  usuariosFiltrados: Observable<Usuario[]>;

  public errores: string[];

  constructor(private  usuarioService : UsuarioService,
  private http: HttpClient, private asignaturaService: AsignaturaService,
  private router:Router,
  private activatedRoute: ActivatedRoute,
  public authService: AuthService) {
  }
  //COnfiguracion del autocomplete
  private _filter(value: string): Observable<Usuario[]> {
    const filterValue = value.toLowerCase();
    return this.usuarioService.filtrarUsuarios(filterValue);
  }

  ngOnInit(): void {
    //Obtenemos Asignatura por id
    this.cargarAsignatura();
    //Con el + convertimos a un tipo number
    this.usuarioService.getProfesores().subscribe(
      usuarios => this.profesores = usuarios
    );

    this.usuarioService.getAlumnos().subscribe(
      usuarios => this.alumnos = usuarios
    );

    this.usuariosFiltrados = this.autocompleteControl.valueChanges
    .pipe(
      map(value => typeof value === 'string'? value: value.nombre), //Convertimos los datos de tipo string en un array de Observable
      flatMap(value => value ? this._filter(value): []) //Si el valor es vario, devuelve un array vacio
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
      Swal.fire('Actualizar Asignatura', `Asignatura actualizada con éxito!`, 'success')
    },//Segundo atributo de subscribe, si sale mal
      err=>{
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
  //Metodo para que me cargue el rol o el profesor que ya existe al editar
  compararProfesor(o1: Asignatura, o2: Asignatura): boolean{
    if (o1=== undefined && o2=== undefined){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.nombre === o2.nombre;
  }
  //? Indica que es un parámetro opcional
  mostrarNombre(usuario?: Usuario): string | undefined{
    return usuario? usuario.nombre: undefined;
  }

  seleccionarAlumno(event: MatAutocompleteSelectedEvent): void {
    let usuario = event.option.value as Usuario;
    //console.log(usuario);
    if (this.existeAlumno(usuario.idUsuario)){

    } else {
      this.asignatura.alumnos.push(usuario);
    }
    //Vaciamos el autocomplete y quitamos el foco
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }
  //Comprobamos si el usuario ha sido seleccionado ya
  existeAlumno(id: number): boolean {
    let existe = false;
    //Foreach para comprobar si existe el usuarios
    this.asignatura.alumnos.forEach((item: Usuario) =>{
      if(id === item.idUsuario){
        existe = true;
      }
    })
    return existe;
  }

  eliminarUsuario(id: number): void {
    this.asignatura.alumnos = this.asignatura.alumnos.filter((item: Usuario) => id !== item.idUsuario);
  }
}
