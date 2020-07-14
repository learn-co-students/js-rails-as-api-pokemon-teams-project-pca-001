const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
  fetchTrainers()
})

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => appendTrainers(json.data))
}

function appendTrainers(trainers) {
  const main = document.querySelector("main")

  for (const trainer of trainers) {
    const div = document.createElement("div")
    div.classList = "card"
    div.setAttribute("data-id" , trainer.id)

    div.innerHTML = `
      <p>${trainer.attributes.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    `

    const ul = document.createElement("ul")
    for (const pokemon of trainer.attributes.pokemons) {
      const li = document.createElement("li")

      li.innerHTML = `
        ${pokemon.nickname}(${pokemon.species})
        <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
      `
      ul.appendChild(li)

      const releaseBtn = li.querySelector("button")
      listenToReleaseButton(releaseBtn)
    }
    div.appendChild(ul)

    main.appendChild(div)

    const addBtn = document.querySelector(`[data-id="${trainer.id}"]`).querySelector("button")
    listenToAddButton(addBtn)
  }
}

function listenToAddButton(addBtn) {
  addBtn.addEventListener("click", function() {
    const trainerId = addBtn.getAttribute("data-trainer-id")

    fetch(`http://localhost:3000/trainers/${trainerId}`)
    .then(resp => resp.json())
    .then(json => {
      i = json.data.attributes.pokemons.length

      if (i < 6) {
        addNewPokemon(trainerId)
      }
    })
  })
}

function listenToReleaseButton(releaseBtn) {
    releaseBtn.addEventListener("click", function() {
      const pokemonId = releaseBtn.getAttribute("data-pokemon-id")
      deletePokemon(pokemonId)
    })
}

function addNewPokemon(trainerId) {
  fetch(`http://localhost:3000/trainers/${trainerId}/pokemons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  }).then(resp => resp.json())
    .then(json => appendPokemon(json.data, trainerId))
}

function appendPokemon(pokemon, trainerId) {
  const ul = document.querySelector(`[data-id="${trainerId}"]`).querySelector("ul")
  const li = document.createElement("li")

  li.innerHTML = `
    ${pokemon.attributes.nickname}(${pokemon.attributes.species})
    <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
  `
  ul.appendChild(li)

  const releaseBtn = li.querySelector("button")
  listenToReleaseButton(releaseBtn)
}

function deletePokemon(pokemonId) {
  fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(function() {
    const releaseBtn = document.querySelector(`[data-pokemon-id="${pokemonId}"]`)
    releaseBtn.parentElement.remove()
  })
}