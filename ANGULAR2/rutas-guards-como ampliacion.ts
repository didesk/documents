// import { ProtegidaComponent } from './components/protegida/protegida.component';
// import { PreciosComponent } from './components/precios/precios.component';
// import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';

// inyectamos el servio en el archivo de rutas
import { AuthGuardService } from './services/auth-guard.service';



// const routes: Routes = [
//   { path: 'home', component: HomeComponent },
//   { path: 'precios', component: PreciosComponent },
  { 
    path: 'protegida',
    component: ProtegidaComponent,

//     //PARA ESTABLECER UNA GUARDIA EL SERVICIO ESTA DEBAJO
    canActivate: [ AuthGuardService]
  },
//   { path: '**', pathMatch: 'full', redirectTo: 'home' }
// ];

// export const APP_ROUTING = RouterModule.forRoot(routes);



// ------------------------------------------------------------------------------------------------------------------------------

// CONFIGURACION DEL SERVICIO PARA QUE FUNCIONE EL GUARD
// app/auth.service.ts

// import { Injectable } from '@angular/core';
// import { tokenNotExpired } from 'angular2-jwt';

// Tambien se puede añadir lo siguiente  el servicio dl router
import { CanActivate, ActivatedRouteSnapShot, RouterStateSnapshot } from '@angualar/router';


import { Router } from '@angular/router';

// Avoid name not found warnings
// declare var Auth0Lock: any;


// @Injectable()
// export class Auth {

//   // Perfil del Usuario
//   userProfile: Object;

//   opciones: Object = {
//     allowedConnections: ['Username-Password-Authentication'],
//     rememberLastLogin: false,
//     socialButtonStyle: 'small',
//     theme: { 'primaryColor': '#3A99D8' },
//     languageDictionary: { 'title': 'AuthApp' },
//     language: 'es',
//     redirect: false,
//     popupOptions: { width: 500, height: 400, left: 200, top: 300 },
//     additionalSignUpFields: [{
//       name: "direccion",
//       placeholder: "Introduzca su dirección",
//       // The following properties are optional
//       icon: "",
//       prefill: "",
//       validator: function (direccion) {
//         return {
//           valid: direccion.length >= 10,
//           hint: "La dirección tiene que tener más de 10 caractéres" // optional
//         };
//       }
//     },
//     {
//       name: "nombre_completo",
//       placeholder: "Introduzca su nombre completo"
//     }]
//   };
  // Configure Auth0
  // lock = new Auth0Lock('EF44qnm8Asu3vc4zU7Lt6aH0vlhhNAqp', 'iddiaz.eu.auth0.com', this.opciones);


  // constructor(private router: Router) {
  //   // Add callback for lock `authenticated` event
  //   this.lock.on('authenticated', (authResult) => {
  //     localStorage.setItem('id_token', authResult.idToken);

  //     // Fetch profile information
  //     this.lock.getProfile(authResult.idToken, (error, profile) => {
  //       if (error) {
  //         // Handle error
  //         alert(error);
  //         return;
  //       }

  //       localStorage.setItem('profile', JSON.stringify(profile));
  //       this.userProfile = profile;
  //     });

  //   });
  // }

  // public getProfile() {
  //   if (this.authenticated) {
  //     return JSON.parse(localStorage.getItem('profile'));
  //   } else {
  //     return {};
  //   }
  // }

  // public login() {
  //   // Call the show method to display the widget.
  //   this.lock.show();
//   // }

//   public authenticated() {
//     // Check if there's an unexpired JWT
//     // This searches for an item in localStorage with key == 'id_token'
//     return tokenNotExpired();
//   }

//   public logout() {
//     // Remove token from localStorage
//     this.router.navigate(['home']);
//     localStorage.removeItem('id_token');
//     localStorage.removeItem('profile');

//   }
// }