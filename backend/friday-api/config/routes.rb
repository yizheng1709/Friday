Rails.application.routes.draw do
  resources :projects, only: [:create, :show, :index, :destroy] do 
    resources :tasks, only: [:index, :show]
  end 
  resources :tasks, only: [:update]
  get '/search', to: 'projects#search'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
