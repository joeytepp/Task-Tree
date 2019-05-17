# frozen_string_literal: true

module Payloads
  class TaskDeletePayload < BasePayload
    field :deleted_task_id, String, null: true, description: "The identifier of the deleted deleted."
    field :num_tasks_deleted, Integer, null: true, description: "The total number of tasks deleted."
  end
end
