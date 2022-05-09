import { Component, OnInit } from '@angular/core';
//Importamos clase usuario
import {Usuario} from './usuario'
import {Rol} from './rol'
import {UsuarioService} from './usuario.service'
//Clase que contiene rutas para redirigir con cada insercion al menu
import {Router, ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
//Ceamos atributo usuario en la clase componente
  public usuario: Usuario = new Usuario()
  public titulo:string = "Crear Usuario"
  //Atributo que contenga lista de los errores
  public errores: string[];
  public roles: Rol[];

  constructor(private usuarioService: UsuarioService,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario()
    this.usuarioService.getRol().subscribe(rol => this.roles = rol);
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(
      params => {let id = params['id']
      if (id){
        this.usuarioService.getUsuario(id).subscribe(
          (usuario) => this.usuario = usuario)
        }
      })
  }

    create(): void{
    this.usuarioService.create(this.usuario)
    .subscribe(json => {
      this.router.navigate(['/usuarios'])
      Swal.fire('Nuevo Usuario', `Usuario ${json.usuario.nombre} creado con éxito!`, 'success')
    },//Segundo atributo de subscribe, si sale mal
      err=>{
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void{
    this.usuarioService.update(this.usuario)
    .subscribe(json => {
      this.router.navigate(['/usuarios'])
      Swal.fire('Actualizar Usuario', `Usuario ${json.usuario.nombre} actualizado con éxito!`, 'success')
    },//Segundo atributo de subscribe, si sale mal
      err=>{
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
  //Metodo para modificar rol al editar usuario
  compararRol(o1: Rol, o2: Rol): boolean {
    //Primero revisamos que no hay un rol vacío
    if (o1=== undefined && o2=== undefined){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.nombre === o2.nombre;
  }

}
