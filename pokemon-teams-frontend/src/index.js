const BASE_URL = "http://localhost:3000"
const TRAINER_URL = `${BASE_URL}/trainer`
const POKEMON_URL = `${BASE_URL}/pokemon`

document.addEventListener('DOMContentLoaded', function() {
    loadTeams();
});

function loadTeams() {
  const teamData = TRAINER_URL
  fetch(teamData)
    .then(res => res.json())
    .then(results => {
        results.data.forEach(trainer => addCard(trainer))
        results.included.forEach(pokemon => listPokemon(pokemon))
        console.log(results)
    });
}


function addCard(trainer) {
  const card = document.createElement('div');
  const body = document.querySelector('body');
  const pokemonList = document.createElement('ul');
  const addButton = document.createElement('button');

  pokemonList.id = 'pokemon-list-' + trainer.id;
  addButton.id = 'add-button';
  addButton.innerText = 'Add Pokemon'
  card.className = "card";

  trainerName = document.createElement('h1');
  trainerName.innerHTML = trainer.attributes.name;

  body.appendChild(card)
  card.appendChild(trainerName)
  card.appendChild(addButton)
  card.appendChild(pokemonList)



  document.getElementById("add-button").addEventListener("click", addPokemon);
}

function listPokemon(pokemon) {
    const pokemonList = document.querySelector(`#pokemon-list-${pokemon.relationships.trainer.data.id}`);
    const listItem = document.createElement('li');
    const releaseButton = document.createElement('button');
    releaseButton.className = 'release';
    releaseButton.innerText = 'Release';

    listItem.innerHTML = pokemon.attributes.nickname + ' (' + pokemon.attributes.species + ')'

    listItem.appendChild(releaseButton)

    pokemonList.appendChild(listItem)

    releaseButton.addEventListener("click", releasePokemon);

}

function addPokemon(event) {
  event.preventDefault()
  const trainerId = parseInt(event.target.parentElement.dataset.id)
  const ul = event.target.parentElement.querySelector("ul")

  if (ul.childElementCount < 6) {
    let requiredBody = {
      trainer_id : trainerId
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(requiredBody)
    };

    fetch(POKEMONS_URL, configObj)
    .then(response => response.json())
    .then(object => {
      renderPokemon(object, ul)
    })
    .catch((reason) => {
      console.log(reason)
    });
  } else {
    alert("Team is full")
  }
}


function releasePokemon(event) {
  event.preventDefault(event)
  const pokemonId = parseInt(event.target.dataset.pokemonId)

  fetch(`${POKEMONS_URL}/${pokemonId}`, { method: "DELETE" })

  event.target.parentElement.remove()
}