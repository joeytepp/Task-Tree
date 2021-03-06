# frozen_string_literal: true

module Objects
  class ProjectType < BaseObject
    field :id, String, null: false, description: "The identifier of the project."
    field :name, String, null: false, description: "The name of the project."
    field :position, Integer, null: false, description: "The menu position of the project."
    field :color, Enums::ProjectColors, null: false, description: "The color of the project."
    field :created_at, String, null: false, description: "The time at which the project was created."
    field :updated_at, String, null: false, description: "The time at which the project was last updated."

    field :tasks, [TaskType], null: false, description: "The tasks in the project."

    # TODO: Make this a relay connection
    def tasks
      object.tasks
    end
  end
end
