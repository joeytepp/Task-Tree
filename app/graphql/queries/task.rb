# frozen_string_literal: true

module Queries
  class Task < BaseQuery
    include GraphqlHelper

    description "Returns a task by identifier."

    type Types::TaskType, null: false

    argument :id, String, required: true, description: "The identifier of the project."

    def resolve(id:)
      must_be_authenticated!
      user = User.find_by(id: context[:user_id])
      ::Task.find_by!(id: id, project: [user.projects])
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the task with identifier #{id}"
    end
  end
end
