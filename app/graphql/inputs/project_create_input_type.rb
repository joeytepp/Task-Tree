# frozen_string_literal: true

module Inputs
  class ProjectCreateInputType < BaseInputObject
    description "An input for creating a new project"

    argument :id, String, "The identifier of the project.", required: false
    argument :name, String, "The name of the project.", required: true
    argument :color, Enums::ProjectColors, "The color of the project.", required: false
    argument :position, Integer, "The position of the project.", required: false
  end
end
