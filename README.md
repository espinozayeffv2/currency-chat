
# Currency chat
Chat abierto que permite conversión de monedas (COP a USD) en tiempo real a través de un simple comando.

## Instalación

1. Clonar el repositorio
 ```sh
https://github.com/espinozayeffv2/currency-chat.git
```

2. Instalar NPM packages (ambos proyectos)
```sh
$ npm install
```
3. Iniciar ambos proyectos.

Cliente:
```
$ npm run start
```

Servidor:

```
$ nodemon
```
## ¿Cómo usarlo?
Sólo ingresa tu nombre en la ventana de diálogo inicial, acepta y envía tantos mensajes desees.

Para convertir cualquier cantidad de pesos colombianos a dólares, sólo debes escribir el siguiente comando:
```sh
/convertir [cantidad deseada]
```

**Importante**: a pesar de que existe toda la funcionalidad para la conversión de monedas, los servicios gratuitos ofrecidos por https://currencylayer.com, sólo permiten llamados tipo HTTP, por lo que cualquier hosting HTTPS bloquea dicha petición y ocurre un error. Este problema se solventará próximamente.
## Demo
https://espinozayeffv2.github.io/currency-chat/

## Roadmap

Esta es la lista de mejoras necesarias, para llevar el proyecto a un estado óptimo: 

### Servidor
 - [ ] Aplicación arquitectura hexagonal
 - [ ] Manejar llamados a API externa.
### Cliente
 - [ ] Migración a micro componentes, aplicando componentes compuestos y de estilos.
 - [ ] Aplicación de arquitectura limpia.
 - [ ] Controlar manejo de hooks, para evitar llamados innecesarios a la API.
 - [ ] Mejora de UI y UX.
