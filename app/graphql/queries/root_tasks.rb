# frozen_string_literal: true

module Queries
  class RootTasks < BaseQuery
    include GraphqlHelper

    description "Returns all root tasks for a project"

    type [Types::TaskType], null: false

    argument :project_id, String, required: false, description: "The identifier of the project."

    def resolve(args = {})
      must_be_authenticated!

      user = User.find_by(id: context[:user_id])
      return Task.where(project: [user.projects], parent_id: nil)

      user.projects.find_by!(id: args[:project_id]).tasks.where(parent_id: nil)
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the project with identifier #{args[:project_id]}"
    end
  end
end
