import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Asignatura} from '../models/asignatura';
import Swal from 'sweetalert2';
import {map, catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private urlEndPoint: string = "http://localhost:8080/api/asignaturas";
  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getAsignatura(id: number): Observable<Asignatura>{
    return this.http.get<Asignatura>(`${this.urlEndPoint}/${id}`);
  }

  getAsignaturas(): Observable<any>{
    return this.http.get<Asignatura[]>(this.urlEndPoint).pipe ()
  };

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  create(asignatura: Asignatura): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, asignatura, {headers: this.httpHeaders}).pipe(
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
}
