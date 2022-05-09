import { Injectable } from '@angular/core';
import {Usuario} from './usuario';
import {Rol} from './rol';
import {Observable, throwError} from 'rxjs'; //Observable para notificar lectura o carga de datos
import {HttpClient, HttpHeaders} from '@angular/common/http';
//Detecta errores
import {map, catchError, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint: string = "http://localhost:8080/api/usuarios";

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient, private router: Router) { }

  getUsuarios(): Observable<any>{
    //Convertimos flujo Observable a partir de los objetos Usuario
    //return this.http.get<Usuario[]>(this.urlEndPoint); //Una forma de hacerlo
    return this.http.get<Usuario[]>(this.urlEndPoint).pipe ()
      //Operador tap para tomar los datos y usarlos pero sin modificarlos
      /*tap(response => {
        let usuarios = response as Usuario[];
        response.forEach(usuario =>{
          console.log(usuario.nombre)
        })
      }),*/
      /* Modificar usuario para que aparezca nombre con mayusculas
      map(response => {
        let usuarios = response as Usuario[];
        return usuarios.map(usuario => {
          usuario.nombre = usuario.nombre.toUpperCase();
          return usuario
        });})) //Cambiar a mayusculas todo el nombre */
      };

  create(usuario: Usuario) : Observable<any>{
    return this.http.post<any>(this.urlEndPoint, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        //Comprobar errores que manda el api rest. Pueden ser una cadena de errores
        if (e.status==400){
          return throwError(e);
        }

        console.error(e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    );
  }

  getUsuario(idUsuario): Observable<Usuario>{
    //Para interpolar string se usan `` invertidas
    return this.http.get<Usuario>(`${this.urlEndPoint}/${idUsuario}`).pipe(
    catchError(e => {
      //redirigimos si da error a la lista de usuarios
      this.router.navigate(['/usuarios']);
      //Detecta error a través del status de la respuesta que usamos en Spring
      console.error(e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
      //Devolvemos respuesta en un tipo Observable
      return throwError(e);
    })
  );
  }

  update(usuario: Usuario): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.idUsuario}`, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }

  delete(id:number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }

  getRol(): Observable<Rol[]>{
    return this.http.get<Rol[]>(this.urlEndPoint+ '/roles');
  }

}
