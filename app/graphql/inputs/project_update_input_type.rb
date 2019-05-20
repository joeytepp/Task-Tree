# frozen_string_literal: true

module Inputs
  class ProjectUpdateInputType < BaseInputObject
    argument :name, String, "The name of the project.", required: false
    argument :color, Enums::ProjectColors, "The color of the project.", required: false
    argument :position, Integer, "The position of the project.", required: false
  end
end
