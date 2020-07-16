class Trainer < ApplicationRecord
has_many :pokemons
validates :pokemons, length: { maximum: 6 }
end
