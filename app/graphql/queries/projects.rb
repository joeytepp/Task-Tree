# frozen_string_literal: true

module Queries
  class Projects < Queries::BaseQuery
    include GraphqlHelper
    description 'Returns all project resources for a user.'

    type [Types::ProjectType], null: false

    def resolve
      must_be_authenticated!
      Project.all
    end
  end
end
