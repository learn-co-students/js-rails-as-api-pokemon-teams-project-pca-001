Rails.application.routes.draw do
  resources :trainers, only: [:index] do
    resources :pokemons, only: [:create, :show]
  end

  resources :pokemons, only: [:destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
