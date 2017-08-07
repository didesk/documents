// ESTE SERIAL EL ARCHIVO APP.ROUTES:TS

//rutas imports
import { RouterModule, Routes } from '@angular/router';
// antiguamente se importaba tambien este, pero sin el me ha estado funcionando perfectamente
import { ModuleWithPoviders } from '@angular/core';


//ARCHIVO DE CONFIGURACION DE RUTAS HIJAS DE USUARIO
import { USUARIO_ROUTES } from './components/usuario/usuario.routes';
// import { UsuarioDetalleComponent } from './components/usuario/usuario-detalle.component';
// import { UsuarioEditarComponent } from './components/usuario/usuario-editar.component';
// import { UsuarioNuevoComponent } from './components/usuario/usuario-nuevo.component';
// import { UsuarioComponent } from './components/usuario/usuario.component';
// import { HomeComponent } from './components/home/home.component';


// para rutas hijas imaginemos que estamos usando... usuario/10/nuevo

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'usuario/:id', // imaginemos que enviamos el parámetro 10
    component: UsuarioComponent,
    children: USUARIO_ROUTES },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);


// COMPONENTE --------------------------------------------------------------------------------------------------------

// EN EL COMPONENTE PARA RECOGER LOS PARAMETROS DA RUTA ACTIVADA
// import { Component, OnInit } from '@angular/core';

// ESTO ES LO IMPORTANTE
import { ActivatedRoute } from '@angular/router';
// import { HeroesService } from '../../services/heroes.service';


// @Component({
//   selector: 'app-busqueda',
//   templateUrl: './busqueda.component.html',
//   styleUrls: ['./busqueda.component.css']
// })
export class BusquedaComponent implements OnInit {
  heroes: any[] = [];
  termino: string;

  constructor (
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.termino = params['termino'];
      this.heroes = this.heroesService.buscarHeroes( params['termino'] );
      console.log(this.heroes);
    })
  }

}



//EN EL MODULO ---------------------------------------------------------------------------

import { APP_ROUTING } from './app.routes';

//services
ç
//components
// import { AppComponent } from './app.component';
// import { NavbarComponent } from './components/shared/navbar/navbar.component';
// import { HomeComponent } from './components/home/home.component';
// import { AboutComponent } from './components/about/about.component';
// import { HeroesComponent } from './components/heroes/heroes.component';
// import { HeroeComponent } from './components/heroe/heroe.component';
// import { BusquedaComponent } from './components/busqueda/busqueda.component';



// @NgModule({
//   declarations: [
//     AppComponent,
//     NavbarComponent,
//     HomeComponent,
//     AboutComponent,
//     HeroesComponent,
//     HeroeComponent,
//     BusquedaComponent
//   ],
  imports: [
    // BrowserModule,
    // FormsModule,
    // HttpModule,
    APP_ROUTING
