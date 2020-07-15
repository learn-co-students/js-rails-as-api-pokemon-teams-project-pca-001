const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const addPokemon = (pokemon) => {
  const li = document.createElement('li');
  return li;
}

const addCard = (team) => {
  const team_id = team.team.team_id;
  const name = team.team.name;
  const { pokemon }  = team;
  const card = document.createElement('div');
  const p = document.createElement('p');
  const button = document.createElement('button');

  console.log(team_id, name, pokemon)

  card.id = `team-id-${team_id}`;
  card.className = 'card';
  p.innerHTML = name;

  card.appendChild(p);
  card.appendChild(button);
  return card;
}

const addPokemonTeams = () => {
  const container = document.getElementById('container');

  fetch(`http://localhost:3000/pokemon_teams`)
    .then( res => res.json())
    .then( arr => arr.forEach( team => container.appendChild(addCard(team))) )
    .catch( err => console.log(err) );
}

document.addEventListener('DOMContentLoaded', () => {
  addPokemonTeams();
});