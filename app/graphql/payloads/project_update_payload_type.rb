# frozen_string_literal: true

module Payloads
  class ProjectUpdatePayloadType < BasePayload
    field :project, type: Objects::ProjectType, null: true, description: "The project that was updated."
  end
end
