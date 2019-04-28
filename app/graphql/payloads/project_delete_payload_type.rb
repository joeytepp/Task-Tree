# frozen_string_literal: true

module Payloads
  class ProjectDeletePayloadType < BasePayload
    field :deleted_project_id, type: String, null: false, description: "The identifier of the deleted project."
  end
end
