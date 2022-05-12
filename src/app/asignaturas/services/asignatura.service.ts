import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Asignatura} from '../models/asignatura';

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
}
