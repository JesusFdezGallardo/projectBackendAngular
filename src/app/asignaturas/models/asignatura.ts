import {Usuario} from '../../usuarios/usuario';

export class Asignatura {
id: number;
nombre: string;
profesor: Usuario;
alumnos: Array<Usuario> = [];

}
