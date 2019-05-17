# frozen_string_literal: true

module Payloads
  class TaskCreatePayload < BasePayload
    field :task, type: Objects::TaskType, null: true, description: "The task that has been created"
  end
end
