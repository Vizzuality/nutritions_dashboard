# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do

  resources :about,      only: [:index]

  get '/dashboards(/:mode)(/:id)', to: 'dashboards#show'

  root 'welcome#index'
end





