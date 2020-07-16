Rails.application.routes.draw do
  resources :pokemons, only: []
  resources :trainers, only: [:index, :create]
end
