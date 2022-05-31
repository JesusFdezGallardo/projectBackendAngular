import { Component, OnInit } from '@angular/core';
import {AsignaturaService} from '../asignaturas/services/asignatura.service';
import {Asignatura} from '../asignaturas/models/asignatura';
import {ActivatedRoute} from '@angular/router';

import {HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
})
export class AsignaturaComponent implements OnInit {

  asignatura: Asignatura;
  titulo: string= "Asignatura";

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private asignaturaService: AsignaturaService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.asignaturaService.getAsignatura(id).subscribe(asignatura =>{
        this.asignatura = asignatura;
      })
    })
  }
}
