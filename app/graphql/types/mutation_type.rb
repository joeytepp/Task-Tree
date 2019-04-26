# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :project_create, resolver: Mutations::ProjectCreate
    field :project_update, resolver: Mutations::ProjectUpdate
  end
end
