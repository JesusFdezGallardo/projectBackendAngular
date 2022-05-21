import {Rol} from './rol';
//Cada punto es para volver atras en un directorio
import {Asignatura} from "../asignaturas/models/asignatura";

export class Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  usuario: string;
  pass: string;
  correoElectronico: string;
  roles: Array<Rol> = [];
  asignaturas : Array<Asignatura> = [];
  asignaturasProfesor: Array<Asignatura> = []
}
