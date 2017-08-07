//our root app component
// import {Component, NgModule, VERSION} from '@angular/core'
import { EventEmitter, Output, Input} from '@angular/core'
// import {BrowserModule} from '@angular/platform-browser'


// COMPONENTE APP ------------------------------------------------------------------------------------------------------------------------------
// @Component({
//   selector: 'my-app',
//   template: `
//     <h1>Enviar parametros entre componentes ( {{ numero }} )</h1>
//     <hr>
    
    <componente-1 (enviarParametro)="recibirParametro($event)"></componente-1>
    
    <componente-2 [recibirNumero]="numero"></componente-2>
//   `,
// })
export class App {
  constructor() {}
  numero:number;
  
  recibirParametro( numero:number ){
    this.numero = numero;
  }
  
}


//COMPONENTE 1--------------------------------------------------------------------------------------------------------------------------------------
 @Component({
//   selector: 'componente-1',
//   template: `
//     <h3>Componente 1</h3>
    <button (click)="enviarNumero()">
     // Enviar valor:  {{ numero  }}
    // </button>
  `,
})
export class Componente1 {
  
  @Output() enviarParametro = new EventEmitter();
  
  // numero:number = 1;
  
  enviarNumero(){
    // this.numero += 1;
    this.enviarParametro.emit( this.numero );
  }
}

//COMPONENTE 2----------------------------------------------------------------------------------------------------------------------------------
@Component({
  selector: 'componente-2',
  template: `
     <h3>Componente 2</h3>
     Recibiendo del componente 1:  {{ recibirNumero }}
  `,
})
export class Componente2 {
  
  @Input() recibirNumero:number;
  
  numero:number = 1;
  
  enviarNumero(){
    this.numero += 1;
  }
}



// MODULO ------------------------------------------------------------------------------------------------------------------------
// @NgModule({
//   imports: [ BrowserModule ],
//   declarations: [ App, Componente1, Componente2 ],
//   bootstrap: [ App ]
// })
// export class AppModule {}