# frozen_string_literal: true

module Inputs
  class ProjectUpdateInputType < BaseInputObject
    argument :name, required: false, type: String, description: "The name of the project."
    argument :color, required: false, type: Enums::ProjectColors, description: "The color of the project."
    argument :position, required: false, type: Integer, description: "The position of the project."
  end
end
