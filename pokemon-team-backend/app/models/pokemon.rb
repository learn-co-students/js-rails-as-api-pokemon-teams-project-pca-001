require 'faker'

class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.create_random_by_trainer_id(trainer_id)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    create(nickname: name, species: species, trainer_id: trainer_id)
  end
end
