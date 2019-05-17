# frozen_string_literal: true

module Payloads
  class TaskUpdatePayloadType < BasePayload
    field :task, type: Objects::TaskType, null: true, description: "The updated task."
  end
end
