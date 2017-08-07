//ciclos de vida de los componentes
import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked,OnDestroy } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   template: `
//      <app-ng-style></app-ng-style>
//      <app-css></app-css>
//      <app-clases></app-clases>

//     <p appResaltado>Hola mundo desde app.component</p>

//     <p [appResaltado]="'orange'">Hola mundo desde app.component</p>

//     <app-ng-switch></app-ng-switch>

//   `,
//   styles: []
// })
export class HomeComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  // constructor() { 
  //   console.log('constructor');
  // }

  ngOnInit() {
    // console.log('ngOnInit');
  }

  ngOnChanges() {
    // console.log('ngOnChanges');
  }

  ngDoCheck() {
    // console.log('ngDoCheck');
  }

  ngAfterContentInit() {
    // console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    // console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    // console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    // console.log('ngAfterViewChecked');
  }

  ngOnDestroy() {
    // console.log('ngOnDestroy');
  }

}
