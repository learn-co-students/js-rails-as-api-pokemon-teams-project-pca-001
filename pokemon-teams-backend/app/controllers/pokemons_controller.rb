class PokemonsController < ApplicationController
  def create
    pokemon = Pokemon.new(pokemon_params)
    pokemon.nickname = Faker::Name.first_name
    pokemon.species = Faker::Games::Pokemon.name
    if pokemon.save
      render json: pokemon.to_json(
        except: [:created_at, :udpated_at]
      )
      # things went right
    else
      # things didn't go correctly.
    end
  end

private

  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end
end
