import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../usuarios/usuario';
import {Asignatura} from '../../asignaturas/models/asignatura';
import {UsuarioService} from '../../usuarios/usuario.service';
import {AsignaturaService} from '../../asignaturas/services/asignatura.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html'
})
export class DetalleAsignaturaComponent implements OnInit {

  alumnos: Usuario[];
  asignatura: Asignatura;


  constructor(private  asignaturaService : AsignaturaService, private usuarioService: UsuarioService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(
    params=>{
        let id = +params.get('id');
        this.asignaturaService.getAsignatura(id).subscribe(
          asignatura => this.asignatura = asignatura);
        });
    }
  }
