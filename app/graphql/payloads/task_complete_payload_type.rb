# frozen_string_literal: true

module Payloads
  class TaskCompletePayloadType < BasePayload
    field :task, Objects::TaskType, null: true, description: "The task that has been completed"
    field :num_tasks_completed, Integer, null: true, description: "The number of tasks completed by the operation."
  end
end
