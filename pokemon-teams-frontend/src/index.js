const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function pokemonList(pokemons) {
  const list = document.createElement("ul")
  for (const pokemon of pokemons) {
    const listItem = document.createElement("li")
    const pokemonTemplate = `
      ${pokemon.nickname} (${pokemon.species})
      <button class="release" data-pokemon-id="${pokemon.id}">
        Release
      </button>
    `
    listItem.innerHTML = pokemonTemplate
    list.append(listItem)
  }
  return list
}

function trainerCard(trainer) {
  const trainerCard = document.createElement("div")
  trainerCard.classList.add("card")
  trainerCard.setAttribute("data-id", trainer.id)
  trainerCard.id = trainer.id
  trainerCard.innerHTML = `
    <p>${trainer.name}</p>
    <button class="add-pokemon-button" data-trainer-id="${trainer.id}">Add Pokemon</button>
  `
  trainerCard.appendChild(pokemonList(trainer.pokemons))
  return trainerCard
}

const addTrainers = function(trainers) {
  const mainSection = document.querySelector("main")
  for (const trainer of trainers) {
    mainSection.append(trainerCard(trainer))
  }
  listenForNewPokemon()
}

function listenForNewPokemon() {
  const pokemonButtons = document.querySelectorAll(".add-pokemon-button")
  for (const button of pokemonButtons) {
    button.addEventListener("click", event => {
      const trainerId = button.getAttribute("data-trainer-id")
      addNewPokemon(trainerId)
    })
  }
}

function addNewPokemon(trainerId) {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  }).then(resp => resp.json()).then(function(pokemon) {
    console.log(pokemon)
  })
}

fetch(TRAINERS_URL).then(resp => {
  return resp.json()
}).then(addTrainers)

