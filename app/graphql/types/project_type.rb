# frozen_string_literal: true

module Types
  class ProjectType < Types::BaseObject
    field :id, String, null: false, description: 'The identifier of the project.'
    field :name, String, null: false, description: 'The name of the project.'
    field :position, Integer, null: false, description: 'The menu position of the project.'
    field :color, Enums::ProjectColors, null: false, description: 'The color of the project.'
    field :created_at, String, null: false, description: 'The time at which the project was created.'
    field :updated_at, String, null: false, description: 'The time at which the project was last updated.'
  end
end
