# frozen_string_literal: true

module Inputs
  class TaskUpdateInputType < BaseInputObject
    argument :name, String, required: false, description: "The name of the project."
    argument :completed, Boolean, required: false, description: "The completion status of the project."
  end
end
