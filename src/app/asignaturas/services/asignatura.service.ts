import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Asignatura} from '../models/asignatura';
import Swal from 'sweetalert2';
import {map, catchError, tap} from 'rxjs/operators';
import { UsuarioService } from '../../usuarios/usuario.service';
import {Router } from '@angular/router';
import {Usuario} from '../../usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private urlEndPoint: string = "http://localhost:8080/api/asignaturas";
  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private usuarioService: UsuarioService,
  private router: Router) { }

  getAsignatura(id: number): Observable<Asignatura>{
    return this.http.get<Asignatura>(`${this.urlEndPoint}/${id}`, {headers: this.usuarioService.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.usuarioService.isNoAutorizado(e)){
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

  getAsignaturas(): Observable<any>{
    return this.http.get<Asignatura[]>(this.urlEndPoint).pipe ()
  };

  delete(id: number): Observable<Asignatura>{
    return this.http.delete<Asignatura>(`${this.urlEndPoint}/${id}`, {headers: this.usuarioService.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.usuarioService.isNoAutorizado(e)){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }

  create(asignatura: Asignatura): Observable<any>{
    console.log(asignatura.profesor)
    return this.http.post<any>(this.urlEndPoint, asignatura, {headers: this.usuarioService.agregarAuthorizationHeader()}).pipe(
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
  update(asignatura: Asignatura): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${asignatura.idAsignatura}`, asignatura, {headers: this.usuarioService.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.usuarioService.isNoAutorizado(e)){
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
}
