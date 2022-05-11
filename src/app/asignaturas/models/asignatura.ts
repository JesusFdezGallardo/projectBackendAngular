import {Usuario} from '../../usuarios/usuario';
import {Practica} from '../models/practica'; 

export class Asignatura {
idAsignatura: number;
nombre: string;
profesor: Usuario;
alumnos: Array<Usuario> = [];
practicas: Array<Practica> = [];
}
