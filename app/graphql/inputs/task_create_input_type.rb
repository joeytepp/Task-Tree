# frozen_string_literal: true

module Inputs
  # TODO: make different inputs for root tasks
  class TaskCreateInputType < BaseInputObject
    argument :id, String, "The identifier of the new task.", required: false
    argument :name, String, "The name of the task.", required: true
    argument :project_id, String, "The identifier of the project for the task.", required: false
    argument :parent_id, String, "The identifier of the parent of the task.", required: false
    argument :root_id, String, "The identifier of the root of the task.", required: false
  end
end
