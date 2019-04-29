# frozen_string_literal: true

module Queries
  class Tasks < BaseQuery
    description "All tasks belonging to a user"

    type [Types::TaskType], null: false

    # TODO: Add arguments to narrow down querying

    def resolve
      must_be_authenticated!
      user = User.find_by(id: context[:user_id])
      ::Tasks.where(project: [user.projects])
    end
  end
end
