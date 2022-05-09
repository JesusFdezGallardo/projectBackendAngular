import {Rol} from './rol';
//Cada punto es para volver atras en un directorio
import {Asignatura} from "../asignaturas/models/asignatura";

export class Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  pass: string;
  correoElectronico: string;
  rol: Rol;
  asignaturas : Array<Asignatura> = [];
}
