const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function pokemonList(pokemons) {
  const list = document.createElement("ul")
  for (const pokemon of pokemons) {
    appendPokemon(list, pokemon)
  }
  return list
}

function appendPokemon(list, pokemon) {
  const listItem = document.createElement("li")
  listItem.innerHTML = pokemonTemplate(pokemon)
  list.append(listItem)
  const releaseButton = listItem.querySelector(`button[data-pokemon-id='${pokemon.id}']`)
  releaseButton.addEventListener("click", function(event) {
    deletePokemon(pokemon)
  })
}

function deletePokemon(pokemon) {
  fetch(`${POKEMONS_URL}/${pokemon.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(resp => resp.json()).then(function(pokemon) {
    const releaseButton = document.querySelector(`button[data-pokemon-id='${pokemon.id}']`)
    releaseButton.parentElement.remove()
  })
}

function pokemonTemplate(pokemon) {
  return `
    ${pokemon.nickname} (${pokemon.species})
    <button class="release" data-pokemon-id="${pokemon.id}">
      Release
    </button>
  `
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
      const pokemonCard = document.getElementById(trainerId)
      const pokemonList = pokemonCard.children[2]
      const numOfPokemons = pokemonList.children.length
      if (numOfPokemons < 6) {
        addNewPokemon(trainerId)
      }
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
      pokemon: {
        trainer_id: trainerId
      }
    })
  }).then(resp => resp.json()).then(function(pokemon) {
    showPokemon(pokemon)
  })
}

function showPokemon(pokemon) {
  const pokemonCard = document.getElementById(pokemon.trainer_id)
  const pokemonList = pokemonCard.children[2]
  appendPokemon(pokemonList, pokemon)
}

fetch(TRAINERS_URL).then(resp => {
  return resp.json()
}).then(addTrainers)