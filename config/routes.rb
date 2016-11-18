# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do

  get '/about', to: 'about#index'
  get '/countries(/:id)', to: 'countries#show', as: 'countries_show'
  get '/dashboards(/:mode)(/:id)', to: 'dashboards#show', as: 'dashboards_show'

  root 'welcome#index'
end





