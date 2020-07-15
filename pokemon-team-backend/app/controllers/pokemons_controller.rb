class PokemonsController < ApplicationController
  def create
    render json: Pokemon.create_random_by_trainer_id(params[:trainer_id])
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: { trainer_id: pokemon.trainer_id }
  end
end
