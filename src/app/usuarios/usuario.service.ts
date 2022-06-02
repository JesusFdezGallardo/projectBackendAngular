import { Injectable } from '@angular/core';
import {Usuario} from './usuario';
import {Rol} from './rol';
import {Observable, throwError} from 'rxjs'; //Observable para notificar lectura o carga de datos
import {HttpClient, HttpHeaders} from '@angular/common/http';
//Detecta errores
import {map, catchError, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router } from '@angular/router';
import {AuthService} from '../usuarios/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint: string = "http://localhost:8080/api/usuarios";
  private urlEndPointProfes: string = "http://localhost:8080/api/usuarios/profesores";
  private urlEndpointAlumnos: string = "http://localhost:8080/api/usuarios/alumnos";
  private urlEndPointFiltrar: string = "http://localhost:8080/api/usuarios/filtrar-usuarios";
  private urlEndPointUser: string = "http://localhost:8080/api/user";
  private urlEndPointBorrar: string ='http://localhost:8080/api/usuarios/delete';

  public isNoAutorizado(e): boolean{
    if(e.status==401){
      this.router.navigate(['/login'])
      return true;
    }
    if(e.status==403){
      Swal.fire('Acceso denegado', `${this.autheService.usuario.usuario} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/usuarios'])
      return true;
    }
    return false;
  }

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient, private router: Router
            , private autheService: AuthService) { }

  //Metodo para autorizar acciones
  public agregarAuthorizationHeader(){
    let token = this.autheService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' +  token);
    }
    return this.httpHeaders;
  };

  getUsuarios(): Observable<any>{
    //Convertimos flujo Observable a partir de los objetos Usuario
    return this.http.get<Usuario[]>(this.urlEndPoint).pipe()
      };

  create(usuario: Usuario) : Observable<any>{
    return this.http.post<any>(this.urlEndPoint, usuario, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        //Comprobar errores que manda el api rest. Pueden ser una cadena de errores
        if(this.isNoAutorizado(e)){
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

  getUsuario(idUsuario): Observable<Usuario>{
    //Para interpolar string se usan `` invertidas
    return this.http.get<Usuario>(`${this.urlEndPoint}/${idUsuario}`, {headers: this.agregarAuthorizationHeader()}).pipe(
    catchError(e => {
      if(this.isNoAutorizado(e)){
        return throwError(e);
      }
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
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.idUsuario}`, usuario, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if (e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    );
  }

  delete(id:number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }

  desactivar(id:number): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPointBorrar}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }

  getRol(): Observable<Rol[]>{
    return this.http.get<Rol[]>(this.urlEndPoint+ '/roles', {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }

  getProfesores(): Observable<any>{
    return this.http.get<Usuario[]>(this.urlEndPointProfes, {headers: this.agregarAuthorizationHeader()}).pipe();
  }

  getAlumnos(): Observable<any>{
    return this.http.get<Usuario[]>(this.urlEndpointAlumnos, {headers: this.agregarAuthorizationHeader()}).pipe();
  }

  filtrarUsuarios(nombre: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlEndPointFiltrar}/${nombre}`,  {headers: this.agregarAuthorizationHeader()}).pipe();
  }

  getUsuarioByNombre(usuario): Observable<Usuario>{
    //Para interpolar string se usan `` invertidas
    return this.http.get<Usuario>(`${this.urlEndPointUser}/${usuario}`, {headers: this.agregarAuthorizationHeader()}).pipe(
    catchError(e => {
      if(this.isNoAutorizado(e)){
        return throwError(e);
      }
      //redirigimos si da error a la lista de usuarios
      this.router.navigate(['/asignaturas']);
      //Detecta error a través del status de la respuesta que usamos en Spring
      console.error(e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
      //Devolvemos respuesta en un tipo Observable
      return throwError(e);
    })
  );
  }
}
