Rails.application.routes.draw do

	# namespace :API do 
	# 	namespace :v1 do 
		  resources :users, only: [:index, :show, :create]
		  resources :plays, only: [:index, :show, :create]
		  resources :paragraphs, only: [:index, :show, :create]
	# 	end
	# end
end
