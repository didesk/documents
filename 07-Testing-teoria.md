# Teoria de testing con jasmine

cada test se denomina suite y analiza una parte concreta del código, como un objeto o una clase. Las suites agrupan una o más funciones llamadas describe, en las que se definen distintos expects, es decir, funciones en las que se evalúa si algo tiene el valor esperado.

## MATChERS
```
toEqual: es igual a algo.
toBe: es y es como algo
toBeTruthy: es verdadero (truthy)
toBeFalsy: es falso (falsy)
toContain: contiene algo
toBeDefined: está definido
toBeUndefined: es undefined
toBeNul: es nulo
toBeNaN: no es un número
toBeGreaterThan: es mayor que algo
toBeLessThan: es menor que algo
toBeCloseTo: un número se aproxima a algo cuando se redondea
toMatch: se encuentra la expresión regular
toThrow: se espera que dé una excepción
Y, además, con el not, se puede negar todo lo anterior.
```

## Spies, stubs y mocks

### ESPIES

Los spies no alteran el original, sino que se limitan a observar cosas, como el número de veces que se pasa por un método o la cantidad de argumentos que recibe.

### STUBS
Los stubs se comportan como los spies, pero además reemplazan alguna funcionalidad original, como el resultado que se devuelve después de un proceso. Por ejemplo, puede interesarnos stubear todo lo que tenga que ver con la persistencia de datos y reemplazar las llamadas rest con estos métodos fake.

### MOCKS
Los mocks, en cambio, sustituyen por completo al original.

### Ejemplo de Testing con Jasmine y uso de espias

#### Codigo
```
var AddBook = function() {
/* Recogemos el libro */
this.getBook = function(title, author, year) {
/* Ponemos el autor en minúscula */
author = this.prepareAuthor(author);
/* Comprobamos que están todos los campos y que el año es un número */
if ( !this.checkBook(title, author, year) ) {
return false;
}
/* Enviamos el libro a la bbdd */
this.sendBook(title, author, year);
return true;
};
this.checkBook = function(title, author, year) {
var isValid = true;
if ( !title || !author || !year || isNaN(year) ) {
isValid = false;
}
return isValid;
};
this.prepareAuthor = function(author) {
author = author.toLowerCase();
return author;
};
this.sendBook = function(title, author, year) {
// ajax request...
};
};
```

#### Test
Para construir un spy en jasmine la manera mas sencilla es:
```
spyOn(objeto, 'miMetodo').
```

Además, podemos usar alguno de los dos métodos que tiene jasmine para comprobar si se lanza un método del objeto espiado:
```
toHaveBeenCalled: que devuelve true si se ha lanzado
toHaveBeenCalledTimes: true si se ha lanzado n veces.
toHaveBeenCalledWith: da true si se han enviado los argumentos indicados.
```
```
describe('add book to library', function() {
var testBook;
/* Antes de cada expect, instanciamos el objeto que estamos testando */
beforeEach(function() {
   testBook = new AddBook();
   /* Creamos el espía */
   spyOn(testBook, "getBook");
   /* llamamos al método */
   testBook.prepareAuthor();
});
   it('should be possible called getBook method', function() {
      expect(testBook.getBook).toHaveBeenCalled();
   });
});
```
Ahora nos falta comprobar si ese método es capaz de recibir los tres parámetros que nos piden y para eso tenemos el método toHaveBeenCalledWith, que da true si se han enviado los argumentos indicados.

```
describe('add book to library', function() {
var testBook;
beforeEach(function() {
testBook = new AddBook();
spyOn(testBook, 'getBook');
testBook.getBook('La diosa blanca', 'Robert Graves', 1948);
});
it('should be possible called getBook method with 3 params', function() {
expect(testBook.getBook).toHaveBeenCalledWith('La diosa blanca', 'Robert Graves', 1948);
});
});
```
## añadiendo sofisticacion al spy con metodos

### and.callThrough() 
```
...
spyOn(testBook, 'checkBook').and.callThrough();
...
```


Copia el método, lo que permite saber cuál cuál es el resultado del proceso que realiza. Por ejemplo, así podríamos comprobar si funciona el método original para validar los parámetros, que recordemos devuelve true si están bien y false en caso contrario.

```
...
it('should be possible check params are valid', function() {
var result;
spyOn(testBook, 'checkBook').and.callThrough();
result = testBook.checkBook('La diosa blanca', 'Robert Graves', 1948);
expect(result).toBeTruthy();
});
it('should be possible check year is not a number', function() {
var result;
spyOn(testBook, 'checkBook').and.callThrough();
result = testBook.checkBook('La diosa blanca', 'Robert Graves', 'sin fecha');
expect(result).toBeFalsy();
});
...
```

### and.returnValue()
Copia la función, pero fuerza a que devuelva determinados(s) resultado(s)
```
spyOn(testBook, 'sendBook').and.returnValue(true);
```
