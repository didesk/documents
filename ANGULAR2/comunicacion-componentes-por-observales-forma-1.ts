// SERVICIO QUE COMUNICARÁ LOS 2 COMPONENTES ------------------------------------------------

import { Injectable } from '@angular/core';
// 1- inyectamos subject de la rxjs
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DatasharedService {
  //2- Propiedad para que sea new Subject()
  private addData = new Subject<number> ();
  //3- propiedad a la que se subscribe el componente receptor EL COMPONENTE 2
  addDataToLogin$ = this.addData.asObservable();

  constructor() {}

  // funcion que es llamada desde el componente emisor pasandole los datos  actualizar EN EL RECEPTOR CON LA PROPIEDAD NEXT()
  addItemToLogin( item: any ) {
    this.addData.next( item );
  }

}



// COMPONTE 1 - EMISOR DEL DATO ----------------------------------------------

// import { Component } from '@angular/core';

//IMPORTACION NECESARIA DSERVICIO
import { DatasharedService } from './../../services/datashared.service';


// @Component({
//   selector: 'app-body',
//   template: `
//     <p>
//       body Works!
//     </p>
     <input type="text" [(ngModel)]="valor">
     <h2>{{valor}}</h2>
     <button tipe="button" (click)="cambiarValor()">Añadir valor a login</button>
//   `,
//   styles: []
// })

export class BodyComponent {

  valor: number = 15;

  constructor( private datashared: DatasharedService ) { }



  // NECESITAMOS UNA FUNCION QUE LLAME A SERVICIO PARA COMUNICAR EL VALOR QUE QUEREMOS PASAR
  cambiarValor(){
    // 4- Llamando a la funcion emisora gracias al next()
    this.datashared.addItemToLogin( this.valor );
    console.log('has cambiado el valor', this.valor);
  }
}





// COMPONENTE 2 EL RECEPTOR DEL VALOR -------------------------------------------------------
import { Component } from '@angular/core';
import { DatasharedService } from './../../services/datashared.service';
//ESTAS IMPORTACIONES NO SON NECESARIAS PARA QUE FUNCIONE SOLO SI SI EL VALOR VA A TENER UN TIPO DE DATO DE ESTE ESTILO
// import { Subscription } from 'rxjs/Subscription';
// import { Observable } from 'rxjs/Rx';

// @Component({
//   selector: 'app-login',
//   template: `
//     <p>
      login Works! : tengo el valor del body que es {{valorRecibido }}
//     </p>

//   `,
//   styles: []
// })
export class LoginComponent  {

  valorRecibido: number;
 

  constructor( private datashared: DatasharedService) { 
      //  this.subscription = this.datashared.addDataToLogin$.subscribe( item => item );
      this.datashared.addDataToLogin$.subscribe(item=> {
        this.valorRecibido = item;
      }
    
  }
 
}
