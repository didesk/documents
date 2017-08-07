# Novedades en Es6:

## 1. Arrow functions

```
let foo = () => 'Hola mundo';
```

## 2. Varialbes let y const (ambito y escritura respectivamente).

## 3. Clases.
```
class Rectangle extends Shape {
    constructor (id, x, y, width, height) {
        super(id, x, y)
        this.width  = width
        this.height = height
    }
}
class Circle extends Shape {
    constructor (id, x, y, radius) {
        super(id, x, y)
        this.radius = radius
    }
}
```

## 4. Modulos ES6 ( Import, Export)`
```
//  lib/math.js
export function sum (x, y) { return x + y }
export var pi = 3.141593

//  someApp.js
import * as math from "lib/math"
console.log("2π = " + math.sum(math.pi, math.pi))

//  otherApp.js
import { sum, pi } from "lib/math"
console.log("2π = " + sum(pi, pi))
```

## 5. Promesas
objeto Promise (Promesa) es usado para computaciones asíncronas. Una promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca.

 ```
 let d = new Promise((resolve,reject) =>{
   setTimeout(()=>{
      if(true){
         resolve('hello world');
      } else{
         reject('no bueno')
      }
   },2000)
})

// d.then((datos) => console.log('success: ', datos));
// d.then((datos) => console.log('success: ', datos));
d.then((datos) => console.log('success :', datos),(error)=>{
   console.error('new error msg: ', error);
});
 ```

## 6. paso de parametros por defecto a los argumentos de las funciones.


## 7. Spread Operator (...) los Tres puntos.

### Uso en funciones:
```
function sum(...args){
   let res = 0;
   for(let i=0; i < args.length; i++){
      res +=  args[i];
      console.log('dentro del bucle: ', res);
   }
   console.log(res);
}
sum(2,2)
```
### uso en arrays:
```
console.log([1, 2, 3]);
let ar = console.log(...[1, 2, 3]); //---> 1 2 3

let first = [1, 2, 3];

let second = [4, 5, 6]
first.push(second);
first.push(...second);
console.log(first);

let prim = [1, 2, 3,4,5];
let seg = [4, 5, 6];

```

## 8. Template Strings
 ```
 var salutation = 'Hello';
var greeting = 'world';
let place = 'pigg';

var hello = `Hola esto devuelve: ${salutation}, ${greeting}`;

let crazyCode = `${salutation},
  You
    Crazy        ${place}

    How
  Are
      You


`;

```
## 9. Desectructuracion de valores en variables

```
let {color, position } = {
   color: 'blue',
   name: 'jhon',
   state: 'New York',
   position: 'Forward'
}
// console.log(color); //==> BLue
// console.log(position); // ==> Forward

```
```
function generateObj() {
   return {
      color: 'blue',
      name: 'jhon',
      state: 'New York',
      position: 'Forward'

   }
}

let {name, state } = generateObj();
```
```
function generateObj() {
   return {
      color: 'blue',
      name: 'jhon',
      state: 'New York',
      position: 'Forward'

   }
}

let {name: firstname, state: location } = generateObj();

// console.log(firstname);
// console.log(location);
```

## 10. Propiedades computadas (interpolación de propiedades) (SHORTHANDS PROPERTIES)

```
let firstName= 'Jhon';
let lastName = 'Linkist';

let person = { firstName, lastName}
console.log(person); //==> jhon, Linkin 

let mascot = 'Moose';

let team = { person, mascot }
console.log(team);
```

 ### Mejoran la operatividad en los objetos.
 ```
var color = 'red';
var speed = 10;
// function go(){
//    console.log('vroom');
// }
var drive = 'go';

var car = {
   color,
   speed,
   // go: function (){
   //    console.log('broom');
   // } tambies se puede abrebiar aun mas

   // go(){
   //    console.log('boooom');
   // }

   //propiedades computadas
   // ['go']: function(){
   [drive]: function(){
      console.log('bluuuum');
   }
};

console.log(car.color);
console.log(car.speed);
car.go()
```

 ## 11. Generators (funciones generadoras) 
 Las funciones generadoras (son funciones iteradoreas como una especie de bucle)  que producen corrutinas controladas en un contexto de ejecución encapsulado y controlado a través de sus valores de control (yield, next, value)

 ```
 function* greet(){
    console.log(`YOu called 'next()'`);
    yield 'hello';
}
let greeter = greet();
console.log(greeter);

let next = greeter.next()
console.log(next);

==> 
{}
{ value: 'HOw', done: false }
HOw
The heckare
silly ol you?
 ```
 ```
 function* graph(){
   let x = 0;
   let y = 0;
   while(true){
      yield {x:x, y:y}
      x += 2;
      y +=1;
   }
}
var graphGenerator = graph();
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);
console.log(graphGenerator.next().value);

==>
{ x: 0, y: 0 }
{ x: 2, y: 1 }
{ x: 4, y: 2 }
{ x: 6, y: 3 }
{ x: 8, y: 4 }
{ x: 10, y: 5 }
{ x: 12, y: 6 }
{ x: 14, y: 7 }
  ```

## 12. Maps 
El objeto Map es un sencillo mapa clave/valor. Cualquier valor (tanto objetos como valores primitivos) pueden ser usados como clave o valor.
```
var myMap = new Map();

//API
/**
 * set()
 * get()
 * size
 * clear()
 * has()
 */

myMap.set('foo', 'bar');
myMap.set('Hello', 'World');
console.log(myMap.get('foo'))

// myMap.clear()
console.log(myMap.size)
console.log(myMap.has('foo'))

//Iterators
/**
 * keys()
 * entries()
 * values
 */

for(var key of myMap.keys()){
   console.log(key);
}

for(var value of myMap.values()){
   console.log(value);
}

for(var [key, value] of myMap.entries()){
   console.log(key + ' = ' + value);
}


var myObject = {};
var myFunc = function(){};

myMap.set(myObject, 'bar');

myMap.set(myFunc, 'world')

myMap.set('string', 2);

for(var [key, value] of myMap.entries()){
   console.log(key + ' = ' + value);
}
```
