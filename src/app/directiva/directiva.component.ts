import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',

})
export class DirectivaComponent {

  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java Se']

  habilitar: boolean = true;

  constructor() { }

  sethabilitar(): void{
    this.habilitar = (this.habilitar==true)? false: true;
  }
}
