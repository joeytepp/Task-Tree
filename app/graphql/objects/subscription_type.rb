# frozen_string_literal: true

module Objects
  class SubscriptionType < BaseObject
    field :task_updated, TaskType, null: false, description: "A task was updated." do
      argument :id, String, required: true
    end
  end
end
