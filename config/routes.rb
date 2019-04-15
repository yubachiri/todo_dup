Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  root to: 'tasks#index'
  devise_for :users
  resources :tasks do
    collection do
      get :graph, to: 'tasks#graph_index'
    end
  end
end
