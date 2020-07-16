Rails.application.routes.draw do
  resources :pokemons, only: [:create]
  resources :trainers, only: [:index]
end
