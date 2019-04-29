# frozen_string_literal: true

module Payloads
  class TaskUpdatePayloadType < BasePayload
    field :task, type: Types::TaskType, null: true, description: "The updated task."
  end
end
