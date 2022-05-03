import { Component } from '@angular/core';

//compronente principal o raiz. Se deja como viene y desde aqui se formula el programa
@Component({
  selector: 'app-root', //Etiqueta HTML contiene logica del programa
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] //Hojas de estilo
})
export class AppComponent {
  title = 'Bienvenido a Angular';

  //Tipado de las variables. Es opcional
  curso: string = 'Curso Spring 5 con Angular ';
  profesor: string = 'Jesús Fdez-Gallardo Zaragoza';

}
