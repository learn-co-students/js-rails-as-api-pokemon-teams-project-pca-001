class PokemonsController < ApplicationController
  def show
    pokemon = Pokemon.find(params[:id])
    render json: PokemonSerializer.new(pokemon)
  end

  def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new(pokemons)
  end

  def create
    trainer = Trainer.find(params[:trainer_id])
    if trainer.pokemons.length < 6
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
      render json: pokemon
    else
      render json: {message: "Each team can only have 6 pokemon, release a pokemon from your team first before adding another."}
    end
  end

  def destroy
    render json: Pokemon.find(params[:id]).destroy
  end
end
