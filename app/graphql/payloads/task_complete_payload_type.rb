# frozen_string_literal: true

module Payloads
  class TaskCompletePayloadType < BasePayload
    field :num_tasks_completed, Integer, null: true, description: "The number of tasks completed by the operation."
  end
end
