Rails.application.routes.draw do

	namespace :api do 
		namespace :v1 do 
		  resources :users, only: [:index, :show, :create]
		  resources :plays, only: [:index, :show, :create]
		  get 'paragraphs/rand', to: 'paragraphs#rand'
		  resources :paragraphs, only: [:index, :show, :create]
		end
	end
end
