# frozen_string_literal: true

module Inputs
  class ProjectCreateInputType < BaseInputObject
    description 'An input for creating a new project'

    argument :name, String, required: true, description: 'The name of the project.'
    argument :color, Enums::ProjectColors, required: false, description: 'The color of the project.'
    argument :position, Integer, required: false, description: 'The position of the project.'
  end
end
