# frozen_string_literal: true

module Types
  class ProjectCreatePayloadType < Types::BaseObject
    field :project, type: Types::ProjectType, null: true, description: 'The project that was created.'
  end
end
