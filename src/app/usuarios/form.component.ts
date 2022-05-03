import { Component, OnInit } from '@angular/core';
//Importamos clase usuario
import {Usuario} from './usuario'
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

  constructor(private usuarioService: UsuarioService,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario()
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
    .subscribe( usuario => {
      this.router.navigate(['/usuarios'])
      Swal.fire('Usuario Actualizado', `Usuario ${usuario.nombre} modificado con éxito!`, 'success')
    },
      err=>{
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      })
  }
}
