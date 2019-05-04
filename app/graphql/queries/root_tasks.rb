# frozen_string_literal: true

module Queries
  class RootTasks < BaseQuery
    include GraphqlHelper

    description "Returns all root tasks for a project"

    type [Types::TaskType], null: false

    argument :project_id, String, required: false, description: "The identifier of the project."

    def resolve(args = {})
      must_be_authenticated!

      return ::Task.joins(project: :users).where(parent_id: nil, users: { id: context[:user_id] }) unless args[:project_id]

      ::Task.joins(project: :users).where(project_id: args[:project_id], parent_id: nil, users: { id: context[:user_id] })
    end
  end
end
