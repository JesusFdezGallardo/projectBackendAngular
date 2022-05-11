import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Asignatura} from '../models/asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private urlEndPoint: string = "http://localhost:8080/api/asignaturas";

  constructor(private http: HttpClient) { }

  getAsignatura(id: number): Observable<Asignatura>{
    return this.http.get<Asignatura>(`${this.urlEndPoint}/${id}`);
  }
}
