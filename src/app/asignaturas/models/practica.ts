import {Asignatura} from './asignatura';
import {Usuario} from '../../usuarios/usuario';

export class Practica{
idPractica: number;
titulo: string;
comentario: string;
asignatura: Asignatura;
practicasAlumnos: Array<Usuario> = []

}
