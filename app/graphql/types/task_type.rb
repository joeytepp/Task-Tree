# frozen_string_literal: true

module Types
  class TaskType < BaseObject
    field :id, type: String, null: false, description: "The identifier of the task."
    field :name, type: String, null: false, description: "The name of the task."
    field :completed, type: Boolean, null: false, description: "The completion status of the task."
    field :created_at, type: String, null: false, description: "The time at which the task was created."
    field :updated_at, type: String, null: false, description: "The time at which the task was last updated."
  end
end
