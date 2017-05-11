Rails.application.routes.draw do

	namespace :api do 
		namespace :v1 do 
			get 'users/find', to: 'users#find'
		  resources :users, only: [:index, :show, :create]
		  resources :plays, only: [:index, :show, :create]
		  get 'paragraphs/rand', to: 'paragraphs#rand'
		  resources :paragraphs, only: [:index, :show, :create]
		  get 'statistics/topplays', to: 'statistics#top_plays'
		  get 'statistics/mostaccurateusers', to: 'statistics#most_accurate_users'
		end
	end
end
