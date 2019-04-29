# frozen_string_literal: true

module Payloads
  class TaskDeletePayload < BasePayload
    field :deleted_task_id, String, null: true, description: "The identifier of the deleted project."
  end
end
