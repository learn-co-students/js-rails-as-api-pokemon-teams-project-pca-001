const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const MAX_TEAM_SIZE = 6
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayTrainers)

function fetchAndDisplayTrainers(e) {
  const configObj = {
    headers,
    method: "GET"
  }

  fetch(TRAINERS_URL, configObj)
  .then(resp => resp.json())
  .then(trainers => displayTrainers(trainers))
}

function displayTrainers(trainers) {
  trainers.forEach(trainer => displayTrainer(trainer))
}

function displayTrainer(trainer) {
  const trainerDiv = document.createElement("div")
  trainerDiv.className = "card"

  trainerDiv.setAttribute("data-id", trainer.id)
  trainerDiv.appendChild(buildNamePara(trainer))
  trainerDiv.appendChild(buildAddPokemonButton(trainer.id))

  const pokemonList = document.createElement("ul")
  pokemonList.className = "pokemon-list"

  trainer.pokemons.forEach(pokemon => {
    pokemonList.appendChild(buildPokemonDisplay(pokemon))
  })

  trainerDiv.appendChild(pokemonList)
  document.querySelector("main").appendChild(trainerDiv)

  handleMaxPokemon(pokemonList, trainer.id)
}

function buildNamePara(trainer) {
  const para = document.createElement("p")
  para.innerText = trainer.name
  return para
}

function buildAddPokemonButton(trainerId) {
  const btn = document.createElement("button")
  btn.innerText = "Add Pokemon"
  btn.className = "add-pokemon-btn"
  btn.addEventListener("click", e => addPokemon(trainerId))
  return btn
}

function buildPokemonDisplay(pokemon) {
  const li = document.createElement("li")
  li.innerText = `${pokemon.nickname} (${pokemon.species})`

  const btn = document.createElement("button")
  btn.innerText = "Release"
  btn.className = "release"

  btn.setAttribute("data-pokemon-id", pokemon.id)
  btn.addEventListener("click", releasePokemon)
  li.appendChild(btn)

  return li
}

function releasePokemon(e) {
  const pokemon_id = e.target.getAttribute("data-pokemon-id")
  const configObj = {
    headers,
    method: "DELETE"
  }

  fetch(`${POKEMONS_URL}\\${pokemon_id}`, configObj)
  .then((resp) => resp.json())
  .then(json => {
    console.log(`Pokemon deleted from trainer # ${json.trainer_id}`)

    handleMaxPokemon(e.target.parentNode.parentNode, json.trainer_id)

    e.target.parentNode.remove()
  })
  .catch(err => console.log(err))
}

function addPokemon(trainerId) {
  configObj = {
    headers,
    method: "POST"
  }

  fetch(TRAINERS_URL + `/${trainerId}/pokemons`, configObj)
  .then(resp => resp.json())
  .then(pkmn => {
    pokemonList = document.querySelector(`.card[data-id='${trainerId}'] .pokemon-list`)
    pokemonList.appendChild(buildPokemonDisplay(pkmn))

    handleMaxPokemon(pokemonList, trainerId)
  })
  .catch(err => console.log(err))
}

function checkMaxPokemon(pokemonList) {
  return pokemonList.children.length >= MAX_TEAM_SIZE
}

function disableAddPokemon(trainerId){
  const btn = document.querySelector(`.card[data-id='${trainerId}'] .add-pokemon-btn`)
  btn.disabled = true
}

function enableAddPokemon(trainerId){
  const btn = document.querySelector(`.card[data-id='${trainerId}'] .add-pokemon-btn`)
  btn.disabled = false
}

function handleMaxPokemon(pokemonList, trainerId) {
  if(checkMaxPokemon(pokemonList))
    disableAddPokemon(trainerId)
  else {
    enableAddPokemon(trainerId)
  }
}