const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
  loadTeams()
})

function loadTeams() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(function(teams){
    teams.data.forEach(trainer => addCard(trainer))
    teams.included.forEach(pokemon => listPokemon(pokemon))
    console.log(teams) //go and look at this in the concole and you see all the data you need
  })
}

function addCard(trainer) {
  const card = document.createElement('div');
  const body = document.querySelector('body');
  const pokemonList = document.createElement('ul');
  const addButton = document.createElement('button');

  card.setAttribute("data-id", trainer.id)
  pokemonList.id = `pokemon-list-${trainer.id}`
  pokemonList.className = "pokemon-list"
  addButton.id = 'add-button'
  addButton.innerText = 'Add Pokemon'
  card.classList.add("card")

  trainerName = document.createElement('h1')
  trainerName.innerHTML = trainer.attributes.name

  body.appendChild(card)
  card.appendChild(trainerName)
  card.appendChild(addButton)
  card.appendChild(pokemonList)

  document.getElementById("add-button").addEventListener("click", function(event){
    addPokemon(event)
  })
}

function listPokemon(pokemon) {
  let pokemonList = document.querySelector(`#pokemon-list-${pokemon.relationships.trainer.data.id}`);
  let listItem = document.createElement('li');
  let releaseButton = document.createElement('button');
  releaseButton.classList.add('release')
  releaseButton.innerText = 'Release';
  listItem.id = `pokemon-${pokemon.id}`

  listItem.innerHTML = pokemon.attributes.nickname + ' (' + pokemon.attributes.species + ')'

  listItem.appendChild(releaseButton)

  pokemonList.appendChild(listItem)

  releaseButton.addEventListener("click", releasePokemon);
}

function addPokemon(event) {
  const configObj = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    method: "POST",
    body: JSON.stringify(
      {
          "trainer_id": event.target.getAttribute('data-trainer-id')
      })
  }

  fetch(TRAINERS_URL + `/${trainerId}/pokemons`, configObj)
  .then(resp => resp.json())
  .then(pkmn => {
    listPokemon(pkmn)
    // pokemonList = document.querySelector(`.card[data-id='${trainerId}'] .pokemon-list`)
    // pokemonList.appendChild(listPokemon(pkmn))
  })
}


function releasePokemon(e, id) {
  let cardToRemove = document.getElementById(`pokemon-${id}`)
  fetch(POKEMONS_URL+`/${e.target.dataset.pokemonId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(resp => resp.json()).then(resp => cardToRemove.remove())
}


