# frozen_string_literal: true

Rails.application.routes.draw do
  root 'landing#index'

  get '/login', to: 'login#index'

  post '/graphql', to: 'graphql#execute'

  if Rails.env.development?
    mount GraphqlPlayground::Rails::Engine, at: '/playground', graphql_path: '/graphql'
    get '*path', to: redirect('/playground')
  end
end
