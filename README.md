# Asincronismo en Javascript

> Dentro de JavaScript han habido varias formas de hacer asincronismo, a lo largo de la historia del lenguaje se han ido añadiendo nuevas características que han resuelto problemas de legibilidad y sobre todo de flexibilidad a la hora de implementarlo y es aquí donde vemos dintintos ejemplos de como implementarlo en sus distintas formas.

## Instalación

### Clonar

- Clona el repositorio en tu máquina `https://github.com/ismaeldevmw/asincronismo`

### Configuración

> Instala los librerías con npm o yarn 

```shell
$ npm install
$ yarn install
```

> Ejecuta los scripts

```shell
$ npm run callback
$ npm run callback:challenge
$ npm run promise
$ npm run promise:challenge
$ npm run async
$ npm run async:challenge
```

## Callbacks

### [Definición](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
Una función de devolución de llamada(callback) es una función que se pasa a otra función como argumento, que luego se invoca dentro de la función externa para completar algún tipo de rutina o acción.

### Ejemplos
```javascript
function sum(num1, num2) {
  return num1 + num2
}

function calc(num1, num2, callback) {
  return callback(num1, num2)
}

console.log(calc(6, 2, sum))

function date(callback) {
  console.log(new Date)
  setTimeout(function () {
      let date = new Date
      callback(date)
  }, 3000)
}

function printDate(dateNow) {
  console.log(dateNow)
}

date(printDate)
```

### Reto 1
```javascript
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

let API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
  let xhttp = new XMLHttpRequest();
  xhttp.open('GET', url_api, true);
  xhttp.onreadystatechange = function (event) {
    if(xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        callback(null, JSON.parse(xhttp.responseText))
      } else {
        const error = new Error('Error ' + url_api)
        return callback(error, null)
      }
    }
  }
  xhttp.send();
}

fetchData(API, function (error1, data1) {
  if (error1) console.log(error1);
  fetchData(API + data1.results[0].id, function (error2, data2) {
    if (error2) console.log(error2)
    fetchData(data2.origin.url, function (error3, data3) {
      if (error3) console.log(error3);
      console.log(data1.info.count);
      console.log(data2.name);
      console.log(data3.dimension);
    });
  });
});
```

## Promises

### [Definición](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
El objeto Promise representa la finalización (o falla) eventual de una operación asincrónica y su valor resultante.

### Ejemplos

```javascript
const somethingWillHappen = () => {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve('Hey!');
    } else {
      reject('Whoops!');
    }  
  });
};

somethingWillHappen()
  .then(response => console.log(response))
  .catch(err => console.log(err));

const somethingWillHappen2 = () => {
  return new Promise((resolve, reject) => {
    if(true) {
      setTimeout(() => {
        resolve('True');
      }, 2000)
    } else {
      const error = new Error('Whoop!');
      reject(error);
    }
  });
}

somethingWillHappen2()
  .then(response => console.log(response))
  .catch(err => console.log(err))

  Promise.all([somethingWillHappen(), somethingWillHappen2()])
    .then(response => {
      console.log('Array of results', response);      
    })
    .catch(err => {
      console.log(err);      
    });
```

### Reto 2
```javascript
const fetchData = require('../utlils/fetchData');
const API = 'https://rickandmortyapi.com/api/character/';

fetchData(API)
  .then(data => {
    console.log(data.info.count);
    return fetchData(`${API}${data.results[0].id}`)
  })
  .then(data => {
    console.log(data.name);
    return fetchData(data.origin.url)
  })
  .then(data => {
    console.log(data.dimension);    
  })
  .catch(err => console.log(err))
```

## Async/Await

### [Definición](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
Una función asincrónica es una función declarada con la palabra clave __async__. Las funciones asíncronas son instancias del constructor AsyncFunction, y la palabra clave  __await__  está permitida dentro de ellas. Las palabras clave __async__ y __await__ permiten que el comportamiento asíncrono basado en promesas se escriba en un estilo más limpio, evitando la necesidad de configurar explícitamente las cadenas de promesas.

### Ejemplos
```javascript
const doSomethingAsync = () => {
  return new Promise((resolve, reject) => {
    (true)
      ? setTimeout(() => resolve('Do something'), 3000)
      : reject(new Error('Test Error'))
  });
}

const doSomething = async () => {
  const something = await doSomethingAsync();
  console.log(something);
}

console.log('Before 1');
doSomething();
console.log('After 1');

const anotherFunction = async () => {
  try {
    const something = await doSomethingAsync();
    console.log(something);
  } catch(error) {
    console.log(error);    
  }
}

console.log('Before 2');
anotherFunction();
console.log('After 2');
```

### Reto 3
```javascript
const fetchData = require('../utlils/fetchData');
const API = 'https://rickandmortyapi.com/api/character/';

const anotherFunction = async (url_api) => {
  try {
    const data = await fetchData(url_api);
    console.log(data.info.count);
    const character = await fetchData(`${url_api}${data.results[0].id}`);
    console.log(character.name);
    const origin = await fetchData(character.origin.url);
    console.log(origin.dimension);
  } catch(error) {
    console.log(error);
  }
}

console.log('Before');
anotherFunction(API);
console.log('After');
```
