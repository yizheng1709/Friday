Rails.application.routes.draw do
  resources :projects, only: [:create, :show, :index] do 
    resources :tasks, only: [:create, :index, :update]
  end 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
