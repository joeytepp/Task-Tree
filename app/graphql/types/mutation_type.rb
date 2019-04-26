# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :project_create, resolver: Mutations::ProjectCreate
  end
end
