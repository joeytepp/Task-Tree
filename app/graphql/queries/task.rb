# frozen_string_literal: true

module Queries
  class Task < BaseQuery
    include GraphqlHelper

    description "Returns a task by identifier."

    type Types::TaskType, null: false

    argument :id, String, required: true, description: "The identifier of the project."

    def resolve(id:)
      must_be_authenticated!
      ::Task.joins(project: :users).where(users: { id: context[:user_id] }).find_by!(id: id)
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the task with identifier #{id}"
    end
  end
end
