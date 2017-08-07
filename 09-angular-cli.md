# ANGULAR-CLI

## COMANDOS DE CREACION

* ng new app => crea la app
* ng serve => levanta el server por defecto en 4200
* ng build => construye la app
* ng build -prod -aot => contruye la app optimizada
* ng generate => genera partes en la aplicacion
   Componente	ng generate component mi-componente

   ### OPCIONES:

   1. --flat: Genera un componente plano dentro de la estructura donde se encuentre, y no lo envuelve en ninguna carpeta

   2. --inline-template (-it) especifica que la plantilla esta en linea (template string dentro del componete).

   3. --inline-style (-is) especifica los estilos estan en linea

   4. --prefix specifies whether to use the prefix

   5. --spec specifies if a spec file is generated

   6.  --view-encapsulation (-ve) specifies the view encapsulation strategy

   7.   --change-detection (-cd) specifies the change detection strategy

   8. --skip-import allows for skipping the module import

   9.  --module (-m) allows specification of the declaring module

   10. --export specifies if declaring module exports the component

   #



   Directiva	ng generate directive mi-directiva

   Pipe	ng generate pipe mi-pipe

   Servicio	ng generate service mi-servicio

   Clase	ng generate class mi-clase

   Ruta	ng generate route mi-ruta

* ng lint => ejecuta el linter para comprovar la sintaxis

* ng test => Ejecuta los test

* ng e2e => Ejecuta las pruebas end to end.
