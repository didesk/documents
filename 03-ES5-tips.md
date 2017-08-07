# JAVASCRIPT ES5

## Manipulando el DOM dinámicamente desde js

```
var div = document.createELement('div');
div.innerHTML = '<h2>lo ue sea...</h2>'
div.style.margin ="10px"
...

document.body.appendchild(div)
```
```
var lista = document.getElementById('lista');
lista.inerhtml = 'hola'
```
Moviendo un elemento a otro sitio
```
div.appenchild(docuemnt.getElementByTagName('img')[0])
```
Moviendo un elemento y cambiandol por otro
```
var enlace = document.getElementByTagName('a')[0];
div.replaceChild(enlace, texto);
```


## Cookies

```
function setCookie(cname, cvalue, exdays){
   var d = new Date();
   d.setTime (d.getTime()+ (exdays*24*60*1000));
   var expires = 'expires=' + d.toUTCSTRING();
   document.cookie = cname + '=' + cValue + '=' + expires;
}
```

```
function getCookie(cname){
   var name = cname + '=';
   var ca = document.cookie.split(';');
   for (var i=0; i<ca.length; i++){
      var c = ca[i];
      while (c.charAt(0)== ' ' c.subString(1);
      if( c.indexOf(name) != -1) return c.subString(name.lenght.c.lenght)
      return ''
   }
}
```
```
//Eliminando una coockie
function deleteCookie(cnmae){
   document.cookie = cname + "=;expires=-1"
}
```
