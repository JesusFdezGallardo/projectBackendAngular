import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../usuarios/usuario';
import {UsuarioService} from '../../usuarios/usuario.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../usuarios/login/auth.service';
import {Asignatura} from '../../asignaturas/models/asignatura';
import {AsignaturaService} from '../../asignaturas/services/asignatura.service';
import {Practica} from '../../asignaturas/models/practica';
import {PracticaService} from '../../asignaturas/services/practica.service';

@Component({
  selector: 'app-practicas',
  templateUrl: './practicas.component.html',
})
export class PracticasComponent implements OnInit {

  public usuario: Usuario;
  public asignatura: Asignatura;
  public listaPracticas: Practica[];

  constructor(private usuarioService: UsuarioService,
  public authService: AuthService,
  private activatedRoute: ActivatedRoute,
  private asignaturaService: AsignaturaService,
  private practicaService: PracticaService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioByNombre(this.authService.usuario.usuario).subscribe(
      usuario => this.usuario = usuario
    );

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('idAsignatura');
      this.asignaturaService.getAsignatura(id).subscribe(asignatura =>{
        this.asignatura = asignatura;
      })

      this.cargarPracticas();
    });
  }

  cargarPracticas(): void {
        this.practicaService.getPracticas(1).subscribe(
          usuarios => this.listaPracticas = usuarios
        );
  }
}
