// COMPONENTE NAVBAR.HTML -----------------------------------------------------------------------------

// <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
//   <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>
//   <a class="navbar-brand" href="#">Navbar</a>

//   <div class="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul class="navbar-nav mr-auto">
//       <li class="nav-item active" routerLinkActive="active">
//         <a class="nav-link" [routerLink]="['']" >Home</a>
//       </li>
//       <li class="nav-item active" routerLinkActive="active">
//         <a class="nav-link" [routerLink]="['formularios']" >formularios</a>
//       </li>
//       <li class="nav-item active" routerLinkActive="active">
//         <a class="nav-link" [routerLink]="['lazy']" >Lazy Loading</a>
//       </li>
      <li class="nav-item active" routerLinkActive="active" *ngIf="authGuardService.isAutenticated">
        <a class="nav-link" [routerLink]="['seguridad']" >seguridad</a>
      </li>
    // </ul>
//     <form class="form-inline my-2 my-lg-0">
//       <input class="form-control mr-sm-2" type="text" placeholder="Search" (keyup)="buscar(terminoBusqueda.value)" #terminoBusqueda >
//       <button class="btn btn-outline-success my-2 my-sm-0" type="button" (click)="buscar(terminoBusqueda.value)">Buscar</button>
//     </form>
//   </div>
// </nav>



//SERVICIO DE GUARDIA EN LAS RUTAS---------------------------------------------------------------------
// import { Injectable } from '@angular/core';
// import { User } from './../models/user.model';
// import { UserService } from './user.service';

// Lo básico el ruter y el canActivate que se implenta como interfaz en llcase del servicio.
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthServiceService implements CanActivate {

  // userSession: User;
  // isAutenticated: boolean = false;

  constructor( private userService: UserService, private router: Router ) {

    // this.userSession = this.userService.getStoredUSer();

    // console.log('servicio de guardia activo el userstored es ', this.userSession);
    // console.log('servicio de guardia activo');
   }
  

  // SImepre tiene que devolver algo.
  canActivate(){
    if(this.isAutenticated){
      // console.log('estas logueado en la aplicación');
      return true;
    }
    else {
      // console.log('Bloqueado por el guard');
      this.router.navigate(['']);
      return false;
    }

  }  

}

// ARCHIVO DE RUTAS------------------------------------------------------------------------------------------
// import { FrmEditarComponent } from './components/formularios/frm-editar/frm-editar.component';
// import { FrmNuevoComponent } from './components/formularios/frm-nuevo/frm-nuevo.component';
import { RouterModule, Routes } from '@angular/router';

//componentes
// import { HomeComponent } from './components/home/home.component';
// import { FormularioComponent } from './components/formulario/formulario.component';
// import { SeguridadComponent } from './components/seguridad/seguridad.component';
// import { MovimientoComponent } from './components/rutas/movimiento/movimiento.component';
// import { BuscadorComponent } from './components/rutas/buscador/buscador.component';

// import { MOVIMIENTOS_ROUTES } from './components/rutas/movimiento/movimiento.routes';

// Importamos el servicio que controla la seguridad en las rutas o ruta
import { AuthGuardService } from './services/auth-guard.service';


// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'formularios', component: FormularioComponent },
//   // ruta por parametro
//   { 
//     path: 'formularios/:idFormulario',
//     component: MovimientoComponent,
//     children: MOVIMIENTOS_ROUTES
//   },
//   { path: 'buscador/:termino', component: BuscadorComponent },
//   { path: 'lazy', loadChildren: './lazy-loading/lazy-loading.module' },
//   // Impelementamos el canActivate para que lo controle
  { path: 'seguridad', component: SeguridadComponent, canActivate: [AuthGuardService] },
//   { path: '**', pathMatch: 'full', redirectTo: '' }
// ];

// export const APP_ROPUTING = RouterModule.forRoot(routes);
