class PokemonsController < ApplicationController
  def create
    pokemon = Pokemon.new(pokemon_params)
    pokemon.nickname = Faker::Name.first_name
    pokemon.species = Faker::Games::Pokemon.name
    if pokemon.save
      render json: pokemon.to_json(
        except: [:created_at, :updated_at]
      )
    else
      render json: { errors: "Too many pokemon" }
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: pokemon.to_json(
      except: [:created_at, :updated_at]
    )
  end

private

  def pokemon_params
    params.require(:pokemon).permit(:trainer_id)
  end
end