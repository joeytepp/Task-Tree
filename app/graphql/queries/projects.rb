# frozen_string_literal: true

module Queries
  class Projects < BaseQuery
    include GraphqlHelper
    description "Returns all project resources for a user."

    type [Objects::ProjectType], null: false

    def resolve
      must_be_authenticated!
      ::Project.joins(:users).where(users: { id: context[:user_id] }).order(created_at: :desc)
    end
  end
end
