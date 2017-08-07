// import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  template: `
    <p [ngStyle]="{ 'font-size': '15px' }">
      Hola mundo.... esto es una etiqueta
    </p>
    <p [ngStyle]="{ 'font-size': tamano + 'px' }">
      Hola mundo.... esto es otra etiqueta
    </p>
    <p [style.fontSize]="'40px'">
      Hola mundo.... esto es otra etiqueta
    </p>
    <p [style.fontSize.px]="tamano">
      control dinámico
    </p>
    <button class="btn btn-primary" (click)="tamano = tamano + 5" >
      <i class="fa fa-plus"></i>
    </button>
    <button class="btn btn-primary" (click)="tamano = tamano - 5" >
      <i class="fa fa-minus"></i>
    </button>
  `,
  styles: []
})
export class NgStyleComponent implements OnInit {
 
  tamano:number = 30;

  constructor() { }

  ngOnInit() {
  }

}