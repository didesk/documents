// SERVICIO QUE COMUNICARÁ LOS 2 COMPONENTES ------------------------------------------------

import { Injectable } from '@angular/core';

// 1- inyectamos subject de la rxjs
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DatasharedService {
  //2- Propiedad para que sea new Subject()
  private dato$ = new Subject<number> ();



  // constructor() {}

  // funcion que es llamada desde el componente emisor pasandole los datos  actualizar EN EL RECEPTOR CON LA PROPIEDAD NEXT()
  addItemToLogin( item: any ) {
    this.dato$.next( item );
  }

}




// COMPONTE 1 - EMISOR DEL DATO ----------------------------------------------
// import { Component, OnInit } from '@angular/core';

//Importamos el servicio
import { DatasharedService } from './../../services/datashared.service';


// @Component({
//   selector: 'app-body',
//   template: `
//     <p>
//       body Works!
//     </p>
//     <input type="text" [(ngModel)]="dato">
//     <h2>{{valor}}</h2>
//     <button tipe="button" (click)="cambiarValor()">Añadir valor a login</button>
//   `,
//   styles: []
// })
export class BodyComponent implements OnInit {

  // dato: number = 15;

  constructor( private datashared: DatasharedService ) { }

  // ngOnInit() {
  // }

  // NECESITAMOS UNA FUNCION QUE LLAME A SERVICIO PARA COMUNICAR EL VALOR QUE QUEREMOS PASAR
  cambiarValor(){

    // 4- Llamando a la funcion emisora que controla el parametro
    this.datashared.addItemToLogin( this.dato );
    // console.log('has cambiado el valor', this.dato);
  }
}



// COMPONENTE 2 EL RECEPTOR DEL VALOR -------------------------------------------------------
// import { Component, OnInit } from '@angular/core';
import { DatasharedService } from './../../services/datashared.service';
;

// @Component({
//   selector: 'app-login',
//   template: `
//     <p>
      login Works! : tengo el valor del body que es {{valorRecibido }}
//     </p>

//   `,
//   styles: []
// })
export class LoginComponent implements OnInit {

  valorRecibido: number;
 

  constructor( private datashared: DatasharedService) { }

  ngOnInit() {
  //  this.subscription = this.datashared.addDataToLogin$.subscribe( item => item );
  this.datashared.dato$.subscribe(item=> {
    this.valorRecibido = item;
  } )
  }
 
}
