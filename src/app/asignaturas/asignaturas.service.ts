import { Injectable } from '@angular/core';
import {Asignatura} from './asignatura';
import {Observable, throwError} from 'rxjs'; //Observable para notificar lectura o carga de datos
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AsignaturaService {
  private urlEndPoint: string = "http://localhost:8080/api/asignaturas";

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient, private router: Router) { }

  getAsignaturas(): Observable<any>{
    return this.http.get<Asignatura[]>(this.urlEndPoint).pipe ()
      };

  create(asignatura: Asignatura) : Observable<any>{
    return this.http.post<any>(this.urlEndPoint, asignatura, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status==400){
          return throwError(e);
        }
        console.error(e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    );
  }

  getAsignatura(id): Observable<Asignatura>{
    return this.http.get<Asignatura>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/asignaturas']);
      console.error(e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
      return throwError(e);
    })
  );
  }

  update(asignatura: Asignatura): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${asignatura.idAsignatura}`, asignatura, {headers: this.httpHeaders}).pipe(
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

  delete(id:number): Observable<Asignatura>{
    return this.http.delete<Asignatura>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }
}
