Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  get 'hello_world', to: 'hello_world#index'

  if Rails.env.development?
    mount GraphqlPlayground::Rails::Engine, at: "/playground", graphql_path: "/graphql"
    get "*path", to: redirect("/playground")
  end

end
