# frozen_string_literal: true

module Queries
  class Projects < BaseQuery
    include GraphqlHelper
    description 'Returns all project resources for a user.'

    type [Types::ProjectType], null: false

    def resolve
      must_be_authenticated!
      User.find_by(id: context[:user_id]).projects.order(created_at: :desc)
    end
  end
end
