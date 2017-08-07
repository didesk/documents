# GIT

## CONFIGURACION
* **git config --global user.name "Ivan Diaz"** Configura el usuario
* **git config --global user.email "<correo@ivandiazdiaz.com>"** Configura el e-mail
* **git config --list** Muestra un resumen del estado de la configuracion global

* **git init** Inicializa el repositorio.
* **git clone** crea una copia del repositorio en local.

## COMANDOS DE TRABAJO CON ARCHIVOS

* **git add nombre_archivo_a_añadir** añade el archivo al stagin area.
* **git add .** añade todos los archivos pendiendtes de confirmación al stagin area.
* **git status** proporciona informacion del estado del directorio de trabajo, con los archivos pendientes de añadir al siguiente comit.
* **git diff** proporciona informacion del estado con los cambios realizados en el archivo.
```
git diff fr35498737 bg374849  //Muestra las diferencias entre esos dos commits 
 ```
* **git diff HEAD~1** indica que queremos ver las diferencias entre el commit actual y un commit anterior
```
git diff HEAD~1  //Muestra las diferencias entre el aactual y el anterior
 ```

* **git commit -m "mensaje"** envia el commit con un mensaje.
* **git reset codigocommit** Elimina un Commit y el archivo de trabajo lo saca del working area.
```
git reset fe465432552 // resetea ese commit
```
* **git reset --hard codigocommit** Eliminamos un Commit y vuelve al estado anterior y borra directamente los cambios del workingarea no hay forma de recuperar nada.

* **git reset --soft codigocommit** elimina los comits y mantiene el archivo con los cambios ya en el working area.

* **git reset --soft codigocommit** elimina los comits y mantiene el archivo con los cambios ya en el working area.

### RESETANDO CAMBIOS A UN MOMENTO ANTERIOR CUANDO HAY MAS GENTE TRABAJANDO EN EL REPOSITORIO

Con reset existiria el problema que al estar trabajando mas gente los cambios que haga yo van a afectar al resto del equipo. Para evitar eso usamos [revert]. Basicamente lo que hace revert es eliminar las lineas que estan en verde y vuelve a poner las lineas que estan en rojo
```
git diff gh335333 kj344555544

--salen las linas difentes entre un commit y el otro

git revert HEAD gh335333 o git revert HEAD
```
podemos haer los revert que necesitemos

* **git revert HEAD** revierte los ultimos cambios.
* **git revert --no-commit HEAD** con esto tengo el cambio en el stage desecho, pero si ahora decimos que desagamos el cambio que hay en el commit anterior por ejemplo seria asi:
```
git revert --no-commit HEAD~1
```
cuando haya terminado de revertir todo lo que necesie, tengo que indacrselo con git revert continue
* **git revert continue** termina de hacer la reversion


* **git rm nombreArchivo** Marca un archivo que será eliminado en el próximo commit.

* **git reset HEAD nombreArchivo** Elimina un archivo del steaginarea (commitarea)  par aue no se tenga en cuenta en el  siguiente commit.
```
git reset HEAD archivo.js // eliminad los cambios de ese archivo en el ultimo commit y lo resetea al estado anterior.
```

* **git checkout -- nombreArchivo** borra los cambios de un archivo y lo deja como estaba anteriormente.
```
git checkout -- ejemplo.html
```

## MOSTRANDO INFORMACION
* **git log** Muestra el historial de cambios y commits.
* **git log --all** Muestra de un vistazo todos los commits.
* **q** quita los commits de la consola.
* **git log --oneline** se muestra la vista resumen de cada commit.
* **git log --oneline --decorate** se muestra la vista resumen de cada commit con los cambios pendientes en cada rama.
* **git log --oneline --graph** muestra un grafo de los commits cuya finalidad es mostrar el commit y su sucesor...
* **git log --oneline --decorate --all --graph** muestra un grafo de todos los commits y sus respectivas ramas...




## TRABAJANDO CON RAMAS

La idea de las ramas trabajando en equipo es que cada mienbro del equipo trabaje en una rama distinta y que estas ramas se encuentren al final del proyecto.

* **git brach** Muestra las ramas que hay en un proyecto.
* **git brach nombreRama** crea una rama.
* **git checkout nombreRama** Se cambia a la rama indicada.
* **git checkout -b nombreAntiguoRama nombreNuevoRama** Crea y se cambia a la rama indicada.
* **git branch -m nuevoNombreNuevaRama** Cambia el nombre de una rama existente.
* **git branch -d nombreRama** Borra una rama existente.
* **git branch -h** Nos indica todas las cosas que podemos hacer con las rmas.

El flujo de trabajo de git va a estar en ir añadiendo ramas segun se va trabajando y una vez que hayamos terminado de trabajar en esa rama, fusionarla con otra rama que ya exista, normalmente con la rama padre de esta.

### CASOS DE USO EN FLUJO DE TRABAJO

En git podemos crear y mantener tantas ramas como necesitemos, podemos crear y mantener una rama por ejemplo con codigo estable y otra de desarrollo e ir trabajando en la de desarrollo y ramificandola segun se va a vanzando a su vez, o para hacer experimentos, corregir bugs etc...

### FUSIONANDO RAMAS

Cuando fusionamos los cambios de una rama con otra, A --> B, esto es algo que puede salir bien o no, segun si se forman o no conflictos.La forma mas sencilla seria:

* Posicionarse a la rama donde se va a fusionar antes y luego:
* **git merge nombreRamaAFusionar** Fusiona una rama existente con la rama en la que estamos.

* **git merge --abort** Aborta la fusión que estamos haciendo en caso de que estemos liados y no sepamos resolver los conflictos.

* **git log --oneline --decorate** se muestra la vista resumen de cada commit con los cambios pendientes en cada rama, esto es util hacerlo par aver los cambios que están pendientes antes de hacer un merge.

**Si hacemos un merge de una rama en otra sin haber tocado los mismos archivos, los cambios funcionarán bien.

** Si se ha tocado el mismo archivo en ambas ramas pero editando partes distintas del archivo, GIT detectará que no as tocado la misma región y los cambios se suelen integrar bien.

** Si se ha tocado el mismo archivo en ambas ramas y además en la misma parte del archivo, GIT generará un conflicto porque no sabe cual será el cambio válido, en este caso hay que indicarselo de forma manual.

Entonces git añade las siguientes marcas:

```
<<<<<<< HEAD
  codigo modificado
========
  mismo codigo modificado en la otra rama
>>>>>>>>>> 
```
Para resolver el conflicto se eliminan las marcas especiales que ha puesto GIT y eliminar tambien el código que queramos descartar. Y lo volvemos a subir.

```
git add . ==> Automaticamante al ejecutar add, git detecta que los conflictos han sido corregidos y cierra automaticamnte el commit y no hay que hacer nada mas.
```



## EXAMINANDO COMMITS PREVIOS

Si conocemos el código de un commit, podemos examinar los archivos del mismo.

Por ejemplo conocemos este código y queremos ver los cambios que se hicieron:

```
e9b0eda Validate Data with Every Method

git checkout e9b0eda 

``` 
Con esto nos lleva a un commit que estaba a trás en el tiempo y podremos hacer cosas como por ejemplo crear una nueva rama a partir de esta situación o añadir un tag.

Si examinamos el codigo veremos que esta tal cual estaba en ese momento.

Una vez que hayamos terminado de revisar, podemomos hacer un checkout a una rama y seguir trabajando






## TAGS
Los tags sirven para crear alias a commits concretos, de este modo en vez de recordar el commit con su codigo, podemos crear un tag para referirnos a el con una palabra que podamos identificar mas facilmente.

Esto nos permite volver a trás por ejemplo simplemente escribiendo el nombre del tag, en lugar del codigo del commit por ejemplo.

* **git tag nombreEtiqueta** Crea una etiqueta al commit en el que estemos en ese momento.

* **git tag nobreTagNuevo codigoCommitAntiguo** Crea una etiqueta a un commit antiguo.

```
git tag v.1.0 f6789dk
```
* **git tag** Muestra la lista de tags.
* **git tag -h** Muestra la ayuda de los tags.
* **git tag -d nombreTag** Delete tags.
* **git deleted tag nombreTag** Delete tags tambien.
* **git tag -l** lista los tags.
* **git tag -l "2.*"** lista y filtra y solo mustra los tags a partir de la 2 etc.
* **git checkout nombreTag** Nos lleva a ese punto concreto y podrémos ver el código tal como estaba en ese momento.

### USOS DE LOS TAGS:
* Para marcar versiones, por ejemplo así podriamos volver a ese punto en concreto.

```
git checkout 2.0
```
* Podemos marcar snapshot especificas o lo que necesitemos.

### TAGS ANOTADOS

* **git tag -a nombreTag** Crea un tag anotado que es una version mas descriptiva de los tags.
* **git show nombreTag** muestra la informacion extendida sobrre ese tag anotado.

SHOW sirve tambien para mostrar otras informaciones de otras cosas







## CONTRUIR ALIAS DE COMANDOS

Los alias son comandos que nos permiten crear atajos a otros comandos mas largos. Los atajos se guardan en la configuracion de git, por lo que tenemos que tocar el git config.

#### CREANDO ALIAS

**git log --oneline --decorate --all --graph**  => git lodag
```
git config --global alias.lodag 'log --oneline --decorate --all --graph'

```
Para ver todos los alias que tenemos creados
```
git config --global --get-regexp alias
```
Para eliminar un alias existente
```
git config --global --unset alias.lodag //por ejemplo
```






## ESCONDER CAMBIOS EN GIT (stash)

Guerdamos cambios y mantenemos el directorio de trabajo limpio. Es decir sirve para por ejemplo tengo que cambiar de rama pero en la rama que estoy aun no he terminado de trabajar y no tengo listos los archivos para que sean commiteados.

Para esto usamos el stash

* **git stash**: guarda cambios pero no se ven en el directorio de trabajo.
* **git stash list**: para ver todas las cosas que tengo en el stash.
* **git stash apply**: git aplica los cambios que haya en el ultimo stash en mi directoriod e trabajo.
* **git stash drop**: Elimina el stash.
* **git stash save mensajeDescriptivoaguardarEnStash**: El save es opcional pero no esta d mas.
* **git stash pop**: Saca el ultimo stash de la pila que haya metido.








## PUSH A REPOSITORIOS REMOTOS

Cuando un repositorio recive cambios de muchas personas, lo normal es que esos cambios se envien a un repositorio centralizado.

Si hemos hecho un clon de un repositorio, automáticamente ese repositorio se establece como remoto. En cualquier caso podemos añadir en cualquier momento nuevos repositorios remotos usando el comendo [remote].

* **git remote add nombreDeEseRemoto direccion_para_acceder_a_ese_repositorio** Establece un repositorio remoto nuevo.

ejemplo: origin es el nombre mas comun
```
git remote add origin ~/Dropbox/repositorio.git

git push origin nombre_rama_que_queremos_enviar
```
esto enviara al repositorio con nombre origin los cambios de la rama que queremos enviar como por ejemplo master.

* **git remote remove origin** elimina el enlace original del repo en local para poder asignarlo a otro sitio.

* **git remote -v** muestra la direccion del repo remoto.

* **git push nombreRepoOrigen ramaASubir** sube la rama al repositorio.
* **git push nombreRepoOrigen --all** sube todas las ramas al repositorio en la nube.




## ACTUALIZANDO REPOSITORIOS DESDE EL REMOTO CON EL COMANDO PULL
Sirva para decirle a git que nos entregue código desde el remoto

Desde el punto de vista de git, los repositorios remotos contienen otras ramas nuevas, que son las remotas.

Por ejemplo si tenemos en nuestro ordenador una rama llamada Master, en nuestro repositorio remoto de nombre Origin, tendremos una rama que se llama Origin/Master.

Podremos ver todas las ramas incluidas las remotas, usando el comando:
```
git branch -all // muestra todas las ramas incluidas las remotas
```

* **git pull repositorioDesdeDondeQuieroObtenerCodigo ramaQueQuieroActualizar** Sincronizamos cambios con el repositorio origen.
* **git pull --rebase** Para cuando tenemos cambios que no queremos perder al hacer el pull.

Por ejemplo supongamos que queremos descargar los commits que han hecho nuestros compañeros en el repositorio global a nuestro propio repositorio local, pero no tenemos guardado nuestro trabjajo, al hacer un git pull --rebase, git descargará los archivos y sincronizará todo de los mas viejo a lo mas nuevo de modo que no se rompa el historial y no hara ningun comit por lo que ningun compañero se enterará de que se ha hecho un pull ya que no hace ningun commit que no aporte nada y que realmente no sirve para nada dicho commit

```
git pull origin master // descargamos los cambios en el remoto a local. Es conveniente hacer un pull de vez en cuando
```
Es conveniete hacer un pull de vez en cuando, y es que el problema de no hacerlo es que si trabajamos con una copia bastante vieja del repositorio y hacemos commits en ella, mientras que el resto de personas han pusheado cambios al repositorio origen, tendremos problemas si intentamos pushear los cambios posteriormente, esto es porque nuestro repositorio local estará en un estado distinto que nuestro repositorio origen, por lo tanto tendremos problemas parecidos a cuando fusionabamos ramas en las que habia cambios en el mismo archivo y en la misma parte del codigo.







## FETCH Y PULL (haciendo cosas raras en git )

Pull en realidad es una combinacion de dos comandos FETCH y MERGE

* Fetch: sirve para preguntar a un remoto si tiene novedades y descargarlas

* **git fetch origin**: comprueba las actualizaciones y si o esta al dia se las descarga a local (sincroniza)


## USANDO REBASE PARA LIMPIAR Y MERGEAR NOESTRO REPO

OJO NO HACER NADA DE REBASE EN CODIGO PUSEADO EN EL ORIGEN ES DECIR EN EL REPO COMUN

En lugare de hacer un merge entre dos ramas, podemos hacer un git rebase situado en la rama que va a ser mergeada 

```
desde ramadesarrollo
git rebase master -> aplana todos los commits eliminando las rayitas entre commits yluego hacemos

desde rama master 

git merge desarrollo -> Mergea la rama de desarrollo y esta mas limpio porque no tiene los graphos ni las lineas del historico
```

## REBASE INTERACTIVO

El rebase interactivo permite hacer cualquier tipo de cosa con el repositorio, cambiar el orden de los commits, modificar el mensaje de un commit previo, aplastar  commits en un unico commit, etc...

Lo único a tener en cuenta es que si cambiamos el historial del repositorio, cambiaremos sus hashes y si hacemos esto alteramos el grapho, por lo que no hay que hae esto sobre código pusheado, siempre con cosas locales, por ejemplo antes de pushear una rama para eliminar algun tipo de mensaje que no queramos que se quede ahi, o reducir el número de commits

Uniendo Commits:
desde Master:
```
git rebase -i HEAD~4 // Une los 4 ultimos commits en uno solo
```
Automaticamente aparece una interfaz con un editor de texto, para decirle a git lo que queremos hacer.

Normalmente querremos editar algo por lo que lo ponemos en edit



