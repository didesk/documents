# HTML5 ETIQUETAS

```
<header> 	Define la cabecera de una página o sección. Usualmente contiene un logotipo, el título del sitio Web y una tabla de navegación de contenidos.

<footer> Define el pie de una página o sección. Usualmente contiene un mensaje de derechos de autoría, algunos enlaces a información legal o direcciones para dar información de retroalimentación.

<main>	Define el contenido principal o importante en el documento. Solamente existe un elemento <main> en el documento.

<section>	Define una sección en un documento.
<nav>	Define una sección que solamente contiene enlaces de navegación
<article> 	Define contenido autónomo que podría existir independientemente del resto del contenido.

<aside> 	Define algunos contenidos vagamente relacionados con el resto del contenido de la página. Si es removido, el contenido restante seguirá teniendo sentido

<mark>	Representa texto resaltado con propósitos de referencia, es decir por su relevancia en otro contexto.

<embed> Representa un punto de integración para una aplicación o contenido interactivo externo que por lo general no es HTML

<video> 	Representa un video , y sus archivos de audio y capciones asociadas, con la interfaz necesaria para reproducirlos. 

<audio> 	Representa un sonido o stream de audio.

<source> 	Permite a autores especificar recursos multimedia alternativos para los elementos multimedia como  <video> o <audio>.

<track> 5	Permite a autores especificar una pista de texto temporizado para elementos multimedia como <video> o  <audio>.

<canvas> Representa un área de mapa de bits  en el que se pueden utilizar scripts para renderizar gráficos como gráficas, gráficas de juegos o cualquier imagen visual al vuelo.

<svg> 	Define una imagen vectorial embebida.
<math>This element has been added in HTML5	Define una fórmula matemática.

<summary> Representa un resumen, título o leyenda para un elemento  <details> dado.
```
# APIS DE HTML5

## localStorage y sesionStorage (el objeto esta disponoible una sola vez en la sesion)

localStorage y sessionStorage sirve para guardar datos sin tener que utilizar cookies. Es una base de datos en el navegador

En localStorage, los datos que se guardan son de tipo/valor (key/value), así que si se desea guardar datos más complejos, podemos hacerlo guardando JSON en forma de string (JSON.stringify(obj)) que luego parsearemos con JSON.parse(str), luego de obtener el registro guardado. Tampoco hay forma de saber (en los distintos navegadores) si se ha excedido la capacidad, así que conviene envolver nuestro código entre try/catch. Es seguro usar hasta 2.5 MB.

```
localstorage.setItem('nombre',nombre );
localstorage.getItem(...)
localstorage.removeItem()



```

## Geolocalizacion

```
function init_map(){
   //Si el navegador es competible 
   if(navigator.geolocation){
      //la localizacion ha sido encotrada
      function sucees(pos){
         drawMap( new google.map.LatLng(pos.coords.latitude, pos.coords.longiude ))
         navigator.geolocation.getCurrentPosition()
      }
   }
   //La localizacion no ha sido encontrada
   function fail(error){
      drawMap(defaultLatLng)
   }

 ```

 ## AUDIO Y VIDEO 

addTextTrack()	Adds a new text track to the audio/video

canPlayType()	Checks if the browser can play the specified audio/video type

load()	Re-loads the audio/video element

play()	Starts playing the audio/video

pause()	Pauses the currently playing audio/video

```
audio.volume()
audio.pause()
audio.play()

```



## DRAG AND DROP
```
<div draggable="true"></div>

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

```


## CANVAS

Es un elemento HTML incorporado en HTML5 que permite la generación de gráficos dinámicamente por medio del javascript 

## WebGL

es una especificación estándar que está siendo desarrollada para mostrar gráficos en 3D en navegadores web. El WebGL permite mostrar gráficos en 3D acelerados por hardware (GPU) 



## Web Workers

Sirve para que el contenido web ejecute secuencias de comandos, en subprocesos en segundo plano.

 Una vez creado, un worker puede enviar mensajes a la tarea de generación mediante la publicación de mensajes en un controlador de eventos especificado por el creador.

El subproceso del worker puede realizar tareas sin interferir con la interfaz de usuario.

```
var myWorker = new Worker('my_worker.js');
myWorker.mensaje = function(event) {
  print("Llamado de nuevo por el worker\n");
};
De forma alternativa, podemos usar addEventListener():

var worker = new Worker('my_worker.js');
worker.addEventListener('message', function(event) {
 console.log("Called back by the worker!\n");
}, false);

worker.postMessage(""); // Iniciar el worker.


```