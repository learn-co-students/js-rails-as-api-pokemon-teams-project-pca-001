class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate :no_more_than_six_on_trainer

private

  def no_more_than_six_on_trainer
    if trainer.pokemons.length >= 6
      self.errors.add(:length, "Whoops!")
      false
    end
  end
end
