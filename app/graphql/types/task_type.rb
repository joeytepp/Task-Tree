# frozen_string_literal: true

module Types
  class TaskType < BaseObject
    field :id, type: String, null: false, description: "The identifier of the task."
    field :name, type: String, null: false, description: "The name of the task."
    field :project, type: ProjectType, null: false, description: "The project that the task is in."
    field :children, type: [TaskType], null: false, description: "The children of the task."
    field :parent, type: TaskType, null: true, description: "The parent of the task."
    field :root, type: TaskType, null: true, description: "The root of the task."
    field :completed, type: Boolean, null: false, description: "The completion status of the task."
    field :created_at, type: String, null: false, description: "The time at which the task was created."
    field :updated_at, type: String, null: false, description: "The time at which the task was last updated."

    def project
      object.project
    end

    def children
      object.children
    end

    def parent
      object.parent
    end

    def root
      object.root
    end
  end
end
