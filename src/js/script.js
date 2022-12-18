// Use module node
import node from './node.js'

// Pokemon Container
const pokemonBody = document.querySelector('.pokemon-body');
const pokemonDetail = document.querySelector('.pokemon-detail');
var fetchPokemon = (id) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      createPokemon(data);
    });
}

function fetchPokemons(offset, limit) {
  for (let i = offset; i <= limit; i++) {
    fetchPokemon(i);
  }
}
var createPokemon = (pokemon) => {

  // Pokemon Card = [img, id, name, type]; 
  const pokemonCard = node.createNode('div', 'pokemon-card');

  // Create node(img, id, name, type)
  const imgContainer = node.createNode('div', 'img-container');
  const img = node.createNode('img', 'pokemon-img');
  img.src = pokemon.sprites.front_default;
  node.addDom(imgContainer, img);
  const pokemonId = node.createNode('p', 'pokemon-id', `#${pokemon.id.toString().padStart(3, 0)}`);
  const pokemonName = node.createNode('h2', 'pokemon-name', pokemon.name);
  const typeContainer = node.createNode('div', 'type-container');
  pokemon.types.forEach((item, index) => {
    const typeItem = node.createNode('p', `type-item type-item--${item.type.name}`, item.type.name);
    node.addDom(typeContainer, typeItem);
  })

  // Add dom
  node.addDom(pokemonCard, imgContainer);
  node.addDom(pokemonCard, pokemonId);
  node.addDom(pokemonCard, pokemonName);
  node.addDom(pokemonCard, typeContainer);
  node.addDom(pokemonBody, pokemonCard);

  // Event Click
  pokemonCard.addEventListener('click', (e) => {
    const detailNode = document.querySelector('.pokemon-detail');
    const overlayNode = document.querySelector('.overlay');
    overlayNode.addEventListener('click', () => {
      overlayNode.classList.add('hide');
      detailNode.style = 'transform: translateX(100%);opacity: 0;';
    })
    overlayNode.classList.remove('hide');
    detailNode.style = 'transform: translateX(0);opacity: 1;';


    fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`)
      .then((res) => res.url)
      .then((data) => {
        pokemonDetail.innerHTML = `
        <section class="pokemon-card-detail">
            <div class="img-container-detail">
              <img src=${data} alt="" class="img-detail">
            </div>
            <p class="pokemon-id-detail">#${pokemon.id.toString().padStart(3, 0)}</p>
            <h1 class="pokemon-name-detail">${pokemon.name}</h1>
            <div class="type-container-detail">
              
            </div>
            <div class="appearence">
              <div class="appearence__height">
                  <p>Height</p>
                  <p class="height">${pokemon.height/10} m</p>
              </div>
              <div class="appearence__weight">
                  <p>Weight</p>
                  <p class="weight">${pokemon.weight/10} kg</p>
              </div>
            </div>
            <ul class="stats-list">
            </ul>
          </section> 
      `;
        const typeContainerDetail = document.querySelector('.type-container-detail');
        pokemon.types.forEach((item, index) => {
          const typeItemDetail = node.createNode('p', `type-item type-item--${item.type.name}`, item.type.name);
          node.addDom(typeContainerDetail, typeItemDetail);
        })
        const statsList = document.querySelector('.stats-list');
        const arrSrcImg = [
          "./src/assets/stats/hp.png",
          "./src/assets/stats/attack.png",
          "./src/assets/stats/defense.png", 
          "./src/assets/stats/special-attack.png",
          "./src/assets/stats/special-defense.png", 
          "./src/assets/stats/speed.png"
        ];
        statsList.innerHTML = '';
        pokemon.stats.forEach((item, index) => {
          statsList.innerHTML += `
            <li class="stats-item">
              <div class="stats-head">
                <img src=${arrSrcImg[index]} alt="" class="img-detail">
              </div>
              <div class="stats-body">
                <p class="stats-body__content">${item.stat.name}: ${item.base_stat}</p>
                <progress max="100" value=${String(item.base_stat)} class="stats-body__progress"></progress>
              </div>
            </li>
        `;
          // console.log(item);
        });
      });

  });
}

var offset = 1;
var limit = 20;
fetchPokemons(offset, limit);

const loadNode = document.querySelector('.loading');

loadNode.addEventListener('click', () => {
  var index = limit + 10;
  offset = limit + 1;
  limit = index;
  fetchPokemons(offset, limit);
})

