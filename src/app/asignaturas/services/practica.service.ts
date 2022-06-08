import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router } from '@angular/router';
import { UsuarioService } from '../../usuarios/usuario.service';
import Swal from 'sweetalert2';
import {Observable, throwError} from 'rxjs';
import {Practica} from '../models/practica';
import {map, catchError, tap} from 'rxjs/operators';
import {AuthService} from '../../usuarios/login/auth.service';
import {Usuario} from '../../usuarios/usuario';
import {URL_BACKEND} from '../../rutas/rutas';

@Injectable({
  providedIn: 'root'
})
export class PracticaService {

  private urlEndPoint: string = URL_BACKEND + '/api/practicas';
  private urlEndPointPracticas: string = URL_BACKEND + '/api/usuarios/practicas';
  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  private usuarioLogeado: Usuario;

  constructor(private http: HttpClient, private usuarioService: UsuarioService,
  private router: Router, public authService: AuthService,) {

   }

   create(id: number, practica: Practica): Observable<any> {
    console.log(practica)
    return this.http.post<any>(`${this.urlEndPoint}/${id}`, practica, {headers: this.usuarioService.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        //Comprobar errores que manda el api rest. Pueden ser una cadena de errores
        if(this.usuarioService.isNoAutorizado(e)){
          return throwError(e);
        }
        if (e.status==400){
          return throwError(e);
        }
        console.error(e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    );
   }

   getPracticas(): Observable<any>{
     this.usuarioService.getUsuarioByNombre(this.authService.usuario.usuario).subscribe(
       usuario => this.usuarioLogeado = usuario
     );

     return this.http.get<Practica[]>(`${this.urlEndPointPracticas}/${this.usuarioLogeado.idUsuario}`,  {headers: this.usuarioService.agregarAuthorizationHeader()}).pipe();
    }
}
