# SASS (scss)

## Si el codigo tiene un error no compilará el archivo. 

## Sintaxis anidada al escribir
```
header {
   ...
   ...
   h1 {
      ....
   }

   h2 {
      ....
      span {
         .....
      }
   }
}
```
## comentarios
```
/* .... */ ==> Comentario multilinea

// ==> comentario de una multilinea no se trasladan al css compilado
```

## Encadenamiento de variantes por referencia.
```
a{
   ....
   ....
   &:hover{
      ....
   }
   &-ok{
      ....
   }
   &-error{
      .....
   }
}
```

## Variables

```
$div-name: valor
$variable: valor
$color-rojo: valor
```
## Mapas para trabajar on funciones
```
$miMapa: (rojo: #red, azul:blue, verde: green )
```
## Asignacion de valores siempre que no tenga otro vlaor
```
$div-name: un-valor !default;
```
## Interpolacion de Variables para poder crear nombres de propiedades, selectores etc. 
```
##{$div-name}{
   ....
   #{$fsize}: 24px;
   #{$font}:....
}
// estamos creando un id con el valor de esta variable

##{$div-name}-2{
   .....
}
``` 

## Operaciones y funciones predefinidas

```
.columna-1{
   .....
   .....
   width: $ancho/2
   ....
}
.columna-2{
   ....
   ....
   width: $ancho/4
   color: invert(saturate($bg-alternativo, 40%))
}

.special {
   border-width: $border-base + $border-extra
}
```

## Extension de selectores (herencia) permite extension multiple tambien como less
para aprovechar todas las funcionalidades que ya tenia otro selector la sintaxis coincide con less.
```
.selectorA{
   ....
   ....
}
.selectorB {
   @extend .selectorA;
   font-size: 24px;
}

.selectorC{
   @extend .selectorA
   @extend .selectorB
   border: 1px;
}
```
## Imports y Partials
Los partial _partial no genera un fichero css equivalente por que sass los interpreta que son para importar en otro fichero
```
@import "base_sass.css";
@import "base_sass.scss";  @import "base_sass", "_parcial" cuando pasamos un fichero sass lo incluye en linea sin interprtarlo

//Tambien podemos importar diractamente a un selector
.main {
   @import "base_sass"
}

```

## Exctructuras de Control

```
//si se cumple la condicion...
@if($partial-color == red){
   .....
}
@if(2 > 5){
   ...
} @ else if(...){

}@ else {
   ....
}

@for $i from 1 through 3 {
   ....
}

$i: 1;
@while $i<=3 {
   ....

   $i+1;
}

//recorre los valores de un elemento muy util con los mapas
$baseImgPath: '../img'
@each $item in 0k, error, alert {
   ....
   .mensaje-#{$item}{
      background-image: .....
   }
}

@each $key, $value in (h1:3em, h2:2em, h3:3em){
   #{$key}{
      font-size: $value;
   }
}

```

## mixins
se usan para aprovechar una serie de reglas en un elemento o en otro sin tener que repetir el codigo contantemente.

```
@mixin miMixin {
   ....
   reglas que se van a exportar a otros selectores
   ....

   &:hover => recordar que así se hace el acceso al antecesor
}

.miselector {
   @include miMixin;
   @include otromixin...
   etc...
   color : red;
}
```

## Mixins con argumentos

```
@mixin special ($color){
   color: $color
}

@mixin otromixin($color){
   @include special($color) //par aue le llegue el argumento hay que inyectarlo tambien en el otro mixin
   ...
}

@mixin rounded ($radius, $size, $args...){
   -webkit-border-radius: $radius;
   ....

   border-size: $size;
   &:after{
      content: $args; // se ponen en donde se incluya este mixin que sean after
   }
}

.aviso-error {
   @include rounded(5px, 2px, "mas", "argumentos");
   @include otroR($radius:5px, $size:2px); //puede asignar valores a los argumentos directamente

}
```

## Pasando Bloques a mixins`
```
@mixin viejos.navegadores{
   html.old & {
      @content;
   }
   
}

header {
   ...
   //solo para los que tengan la clase old
   @include viejos-namvegadores{
      background-color: red;
   }
}

```






