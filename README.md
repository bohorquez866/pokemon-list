# pokemon-list

## Logica de la Pokedex:

###Primero la app necesita pasar del home a la sección de listados, por lo que sería útil pasar allí usando Router, con un path para las listas.

###Apenas cargue la página, esta confirmara que la página esté lista y mientras esté cargando la data, se mostrará una animación, pero como los datos cargan muy rápido, lo que hace visualmente incomodo la carga, se le puso temporizador de 2s. Una vez cargada, renderizara todos los listados (pokemones) traídos de la BD y los almacenará en un array. 

###En las listas, hay dos secciones, y usando un booleano, volverá el booleano de la página general true por defecto, y la de favoritos false, al darle click a la sección favoritos, esta invertirá los valores, y en caso de querer volver, restablece los valores al default.

###Una vez almacenado el Array, con la barra de búsqueda unida a una propiedad dinámica, revisará si en el array, el nombre del valor, coincide con el valor del array, y si coincide, los renderizara.

###Con favorites ocurre algo similar, con la diferencia de que se crean 2 arrays más, uno para marcar favoritos, y el otro para filtrar los favoritos, ahora, si los pokemon.name de ambos coinciden, los renderiza.

###Para el modal, ocurrirá algo similar, si el id del objeto pokemon traído de las bases de datos tenue n id igual al index, este volverá la propiedad modalView true haciendo que este sea visible, y renderiza la info del pokemon. Una vez allí, si se le da click a la X, volverá la propiedad falsa y este se cerrará. 

###Por ultimo, al darle click al boton, este llamara un método que vuelve toda la data del contenido una variable (o propiedad data), y de allí, los copia al portapapeles. Una vez copiado, se mostrará una notificación diciéndole al usuario que los datos han sido copiados.
 






## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
