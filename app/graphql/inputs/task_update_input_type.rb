# frozen_string_literal: true

module Inputs
  class TaskUpdateInputType < BaseInputObject
    argument :name, String, "The name of the project.", required: false
  end
end
