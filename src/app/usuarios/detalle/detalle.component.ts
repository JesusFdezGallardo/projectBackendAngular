import { Component, OnInit } from '@angular/core';
//Primero importamos las clases usuario y usuarioService
import {Usuario} from '../usuario';
import {UsuarioService} from '../usuario.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  //Cambiamos referencia del selector
  selector: 'detalle-usuario',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {
  //Creamos clase Usuario
  titulo: string = "Detalle del Usuario";
  usuarios: Usuario;
  //Inyectamos las clases usuarioservice y activatedRoute para las rutas y poder modificar los datos del usuario
  constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute) {

   }
   //Cargamos los datos cuando se inicializa el componente
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let id: number = +params.get('id');
      if(id){
        this.usuarioService.getUsuario(id).subscribe(usuario =>{ //Obtenemos usuario
          this.usuarios = usuario; //Se lo pasamos al atributo
        })
      }
    }

    );
  }

}
