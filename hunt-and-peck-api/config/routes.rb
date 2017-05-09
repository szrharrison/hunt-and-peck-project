Rails.application.routes.draw do

  resources :users, only: [:index, :show, :create]
  resources :plays, only: [:index, :show, :create]
  resources :paragraphs, only: [:index, :show, :create]
end
