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