# frozen_string_literal: true

module Queries
  class Tasks < BaseQuery
    include GraphqlHelper

    description "All tasks belonging to a user"

    type [Objects::TaskType], null: false

    # TODO: Add arguments to narrow down querying

    def resolve
      must_be_authenticated!
      ::Task.joins(project: :users).where(users: { id: context[:user_id] }).where(completed: false).order(created_at: :desc)
    end
  end
end
