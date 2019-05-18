# frozen_string_literal: true

module Objects
  class SubscriptionType < BaseObject
    field :task_created, TaskType, null: false, description: "A new task was created." do
      argument :parent_id, String, required: true
    end

    def task_created(parent_id:)
    end
  end
end
