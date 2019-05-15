# frozen_string_literal: true

module Inputs
  class TaskCreateInputType < BaseInputObject
    argument :id, String, required: false, description: "The identifier of the new task."
    argument :name, String, required: true, description: "The name of the task."
    argument :project_id, String, required: false, description: "The identifier of the project for the task."
    argument :parent_id, String, required: false, description: "The identifier of the parent of the task."
    argument :root_id, String, required: false, description: "The identifier of the root of the task."
  end
end
