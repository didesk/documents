// SERVICIO ----------------------------------------------------------------------------

import { Injectable } from '@angular/core';

// importaciones necesarias.
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataShared2Service {

  dato: number;
  dato$: Subject<number> = new Subject<number>();

  // constructor() { }

  // gestiona el valor recivido del componente emisor del dato
  gestionarParametro( item: number ){
    // si queremos podemos guardarlo antes y si no emitimos el parametro de la funcion y fuera.
    this.dato = item;
    // genera un nuevo valor en el observable
    this.dato$.next( this.dato );
  }

  // devuelve un observable que notifica cambios en el almacen de dato
  resolverGestionParametro$ (): Observable<number>  {
    // se comporta como un observable.
    return this.dato$.asObservable();
  }

}


// COMPONENTE 1 - EMISOR DEL DATO.
// import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// servicio
import { DataShared2Service } from './../../services/dataShared2.service';

// @Component({
//   selector: 'app-body',
//   template: `
//     <p>
//       body Works!
//     </p>
     <input type="text" [(ngModel)]="dato" (ngModelChange)="cambiarValorDato()">
     <button tipe="button" (click)="cambiarValor()">Añadir valor a login</button>
//   `,
//   styles: []
// })
export class BodyComponent {

  dato: number;

  constructor( private dataShared2: DataShared2Service ) { }



  // Pasamos el valor al servicio
  cambiarValorDato() {
    this.dataShared2.gestionarParametro (this.dato );
  }

}





// COMPONENTE 2 RECEPTOR DEL PARAMETRO -------------------------------------------------------

// import { Component } from '@angular/core';
// Importacion del servicio
import { DataShared2Service } from './../../services/dataShared2.service';
// Importacion del observable si queremos indicarle en el parametro que es del tipo observable, no es necesario importarlo ni usarlo
import { Observable } from 'rxjs/Rx';


// @Component({
//   selector: 'app-login',
//   template: `
//     <p>
      // IMPORTANT:E ES NECESARIO USAR EL PIPE ASYNC
       Reciviendo parametro! : tengo el valor del body que es {{ dato$ | async }}
//     </p>

//   `,
//   styles: []
// })
export class LoginComponent implements OnInit {

  dato$: Observable<number>;
 

  constructor( private dataShared2: DataShared2Service ) { }

  ngOnInit() {

  this.dato$ = this.dataShared2.resolverGestionParametro$();
  // Y si se desea se puede subscribir pero no es necesario para establecer una lógica.
  // this.dato$.subscribe( result => console.log('El valor que llega es: ',result));


  }

}

