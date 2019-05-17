# frozen_string_literal: true

module Payloads
  class ProjectCreatePayloadType < BasePayload
    field :project, type: Objects::ProjectType, null: true, description: "The project that was created."
  end
end
